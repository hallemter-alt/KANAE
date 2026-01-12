#!/bin/bash

# www.rut-tokyo.com ドメイン検証スクリプト
# Usage: ./verify-domain.sh

# カラーコード
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

DOMAIN="www.rut-tokyo.com"
URL="https://$DOMAIN"

echo "🌐 www.rut-tokyo.com ドメイン検証スクリプト"
echo "=========================================="
echo "対象ドメイン: $DOMAIN"
echo "URL: $URL"
echo ""

# 1. DNS レコードの確認
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "📡 1. DNS レコードの確認"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -n "CNAME レコードを確認中... "
if command -v dig &> /dev/null; then
    cname=$(dig +short $DOMAIN CNAME)
    if [ -n "$cname" ]; then
        echo -e "${GREEN}✓ FOUND${NC}"
        echo "  → $cname"
        
        # Vercel のドメインかチェック
        if [[ "$cname" == *"vercel-dns.com"* ]] || [[ "$cname" == *"vercel.app"* ]]; then
            echo -e "  ${GREEN}✓ Vercel を指しています${NC}"
        else
            echo -e "  ${YELLOW}⚠ Vercel 以外を指しています${NC}"
        fi
    else
        echo -e "${RED}✗ NOT FOUND${NC}"
        echo "  → CNAME レコードが見つかりません"
    fi
else
    echo -e "${YELLOW}⚠ SKIP${NC} (dig コマンドがインストールされていません)"
fi
echo ""

# 2. HTTP ステータスの確認
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "📄 2. HTTP ステータスの確認"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -n "HTTP ステータスを確認中... "
http_status=$(curl -s -o /dev/null -w "%{http_code}" "$URL/")
if [ "$http_status" = "200" ]; then
    echo -e "${GREEN}✓ 200 OK${NC}"
elif [ "$http_status" = "000" ]; then
    echo -e "${RED}✗ 接続できません${NC} (DNS が解決されていない可能性があります)"
else
    echo -e "${RED}✗ $http_status${NC}"
fi
echo ""

# 3. SSL 証明書の確認
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "🔒 3. SSL 証明書の確認"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -n "SSL 証明書を確認中... "
if command -v openssl &> /dev/null; then
    ssl_info=$(echo | openssl s_client -connect $DOMAIN:443 -servername $DOMAIN 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ 有効${NC}"
        
        # 証明書の発行者を確認
        issuer=$(echo "$ssl_info" | openssl x509 -noout -issuer 2>/dev/null | sed 's/issuer=//')
        echo "  発行者: $issuer"
        
        # 証明書の有効期限を確認
        dates=$(echo "$ssl_info" | openssl x509 -noout -dates 2>/dev/null)
        echo "  $dates"
    else
        echo -e "${RED}✗ 無効または取得できません${NC}"
    fi
else
    echo -e "${YELLOW}⚠ SKIP${NC} (openssl コマンドがインストールされていません)"
fi
echo ""

# 4. 主要ページの確認
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "📄 4. 主要ページの確認"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

pages=("" "rent" "sale" "minpaku" "api-test")
page_names=("ホーム" "賃貸検索" "売買検索" "民泊サービス" "API テスト")

for i in "${!pages[@]}"; do
    page="${pages[$i]}"
    name="${page_names[$i]}"
    
    if [ -z "$page" ]; then
        test_url="$URL/"
    else
        test_url="$URL/$page"
    fi
    
    echo -n "[$name] $test_url ... "
    status=$(curl -s -o /dev/null -w "%{http_code}" "$test_url")
    
    if [ "$status" = "200" ]; then
        echo -e "${GREEN}✓ $status${NC}"
    elif [ "$status" = "000" ]; then
        echo -e "${RED}✗ 接続不可${NC}"
    else
        echo -e "${RED}✗ $status${NC}"
    fi
done
echo ""

# 5. API エンドポイントの確認
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "🔌 5. API エンドポイントの確認"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Hello API
echo -n "[Hello API] $URL/api/hello ... "
hello_response=$(curl -s "$URL/api/hello")
hello_status=$(curl -s -o /dev/null -w "%{http_code}" "$URL/api/hello")

if [ "$hello_status" = "200" ]; then
    echo -e "${GREEN}✓ 200${NC}"
    echo "  → ${hello_response:0:60}..."
else
    echo -e "${RED}✗ $hello_status${NC}"
fi
echo ""

# Properties API
echo -n "[Properties API] $URL/api/properties ... "
properties_status=$(curl -s -o /dev/null -w "%{http_code}" "$URL/api/properties")

if [ "$properties_status" = "200" ]; then
    echo -e "${GREEN}✓ 200${NC}"
else
    echo -e "${RED}✗ $properties_status${NC}"
fi
echo ""

# 6. サマリー
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "📊 サマリー"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# DNS チェック
if [ -n "$cname" ] && [[ "$cname" == *"vercel"* ]]; then
    dns_status="${GREEN}✓ DNS 設定正常${NC}"
else
    dns_status="${RED}✗ DNS 設定未完了${NC}"
fi

# HTTP チェック
if [ "$http_status" = "200" ]; then
    http_check="${GREEN}✓ HTTP 200 OK${NC}"
else
    http_check="${RED}✗ HTTP エラー${NC}"
fi

# SSL チェック
if echo "$ssl_info" | grep -q "Verify return code: 0"; then
    ssl_status="${GREEN}✓ SSL 有効${NC}"
else
    ssl_status="${YELLOW}⚠ SSL 確認推奨${NC}"
fi

echo -e "DNS:  $dns_status"
echo -e "HTTP: $http_check"
echo -e "SSL:  $ssl_status"
echo ""

# 総合判定
if [ "$http_status" = "200" ] && [ -n "$cname" ] && [[ "$cname" == *"vercel"* ]]; then
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎉 ドメイン設定が完了しています！${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "✅ https://www.rut-tokyo.com/ が正常に動作しています"
    echo ""
    echo "次のステップ:"
    echo "1. ブラウザで https://www.rut-tokyo.com/ を開いて視覚的に確認"
    echo "2. すべてのページが正常に表示されることを確認"
    echo "3. 問題なければ、切り替え完了です！"
else
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}⚠️  まだ設定が完了していません${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    if [ -z "$cname" ] || [[ "$cname" != *"vercel"* ]]; then
        echo "❌ DNS 設定が未完了です"
        echo "   → Wix で CNAME レコードを追加してください"
        echo ""
    fi
    
    if [ "$http_status" = "000" ]; then
        echo "❌ ドメインに接続できません"
        echo "   → DNS の伝播を待ってください（5〜15 分）"
        echo "   → または DNS キャッシュをクリアしてください"
        echo ""
    elif [ "$http_status" != "200" ]; then
        echo "❌ HTTP ステータスが異常です"
        echo "   → Vercel のデプロイログを確認してください"
        echo ""
    fi
    
    echo "詳細は DOMAIN_SETUP_GUIDE.md を参照してください"
fi
echo ""

# DNS 伝播チェックツールの案内
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 追加の確認ツール"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "DNS 伝播状況を確認:"
echo "  https://dnschecker.org/#CNAME/www.rut-tokyo.com"
echo ""
echo "SSL 証明書を確認:"
echo "  https://www.ssllabs.com/ssltest/analyze.html?d=www.rut-tokyo.com"
echo ""
