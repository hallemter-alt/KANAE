#!/bin/bash

# Supabase セットアップ確認スクリプト
# Usage: ./verify-supabase-setup.sh

# カラーコード
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

URL="https://www.rut-tokyo.com"

echo "🔍 Supabase セットアップ確認スクリプト"
echo "========================================"
echo "対象: $URL"
echo ""

# 1. 顧客 API の確認
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "📊 1. 顧客 API の確認"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -n "GET /api/crm/customers を確認中... "
customers_response=$(curl -s "$URL/api/crm/customers")
customers_status=$(curl -s -o /dev/null -w "%{http_code}" "$URL/api/crm/customers")

if [ "$customers_status" = "200" ]; then
    echo -e "${GREEN}✓ 200 OK${NC}"
    
    # JSON からデータを抽出
    total=$(echo "$customers_response" | grep -o '"total":[0-9]*' | grep -o '[0-9]*')
    
    if [ -n "$total" ] && [ "$total" -gt 0 ]; then
        echo -e "  ${GREEN}✓ サンプルデータが存在します（$total 件）${NC}"
        echo "  → Supabase 接続成功！"
    else
        echo -e "  ${YELLOW}⚠ データが 0 件です${NC}"
        echo "  → Supabase のテーブルにデータがありません"
        echo "  → supabase/schema.sql を再実行してください"
    fi
else
    echo -e "${RED}✗ $customers_status${NC}"
    echo "  → Supabase 接続エラー"
    echo "  → 環境変数を確認してください"
fi
echo ""

# 2. 物件 API の確認
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "🏠 2. 物件 API の確認"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -n "GET /api/properties を確認中... "
properties_response=$(curl -s "$URL/api/properties")
properties_status=$(curl -s -o /dev/null -w "%{http_code}" "$URL/api/properties")

if [ "$properties_status" = "200" ]; then
    echo -e "${GREEN}✓ 200 OK${NC}"
    
    # JSON からデータを抽出
    total=$(echo "$properties_response" | grep -o '"total":[0-9]*' | grep -o '[0-9]*')
    
    if [ -n "$total" ] && [ "$total" -gt 0 ]; then
        echo -e "  ${GREEN}✓ サンプルデータが存在します（$total 件）${NC}"
        echo "  → Supabase 接続成功！"
    else
        echo -e "  ${YELLOW}⚠ データが 0 件です${NC}"
        echo "  → Supabase のテーブルにデータがありません"
    fi
else
    echo -e "${RED}✗ $properties_status${NC}"
    echo "  → Supabase 接続エラー"
fi
echo ""

# 3. 問合せ API の確認
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "📧 3. 問合せ API の確認"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -n "GET /api/inquiries を確認中... "
inquiries_response=$(curl -s "$URL/api/inquiries")
inquiries_status=$(curl -s -o /dev/null -w "%{http_code}" "$URL/api/inquiries")

if [ "$inquiries_status" = "200" ]; then
    echo -e "${GREEN}✓ 200 OK${NC}"
    
    # JSON からデータを抽出
    total=$(echo "$inquiries_response" | grep -o '"total":[0-9]*' | grep -o '[0-9]*')
    
    if [ -n "$total" ] && [ "$total" -ge 0 ]; then
        echo -e "  ${GREEN}✓ API が正常に動作しています（$total 件）${NC}"
    fi
else
    echo -e "${RED}✗ $inquiries_status${NC}"
fi
echo ""

# 4. 問合せ送信テスト
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "✉️  4. 問合せ送信テスト"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -n "POST /api/contact でテスト送信中... "
contact_response=$(curl -s -X POST "$URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "テスト太郎",
    "email": "test@example.com",
    "phone": "090-1234-5678",
    "type": "inquiry",
    "message": "Supabase セットアップ確認テスト"
  }')
contact_status=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "テスト太郎",
    "email": "test@example.com",
    "phone": "090-1234-5678",
    "type": "inquiry",
    "message": "Supabase セットアップ確認テスト"
  }')

if [ "$contact_status" = "201" ]; then
    echo -e "${GREEN}✓ 201 Created${NC}"
    echo "  → 問合せがデータベースに保存されました"
    
    # success フィールドを確認
    if echo "$contact_response" | grep -q '"success":true'; then
        echo -e "  ${GREEN}✓ レスポンスが正常です${NC}"
    fi
else
    echo -e "${RED}✗ $contact_status${NC}"
    echo "  → 問合せの送信に失敗しました"
fi
echo ""

# 5. サマリー
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "📊 サマリー"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 結果判定
if [ "$customers_status" = "200" ] && [ "$properties_status" = "200" ] && [ "$inquiries_status" = "200" ]; then
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎉 Supabase セットアップ完了！${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "✅ すべての API が正常に動作しています"
    echo ""
    echo "次のステップ:"
    echo "1. Supabase ダッシュボードでデータを確認"
    echo "2. UI 実装を開始（物件検索・詳細ページ）"
    echo "3. メール送信機能を設定（オプション）"
else
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}⚠️  セットアップが未完了です${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    if [ "$customers_status" != "200" ] || [ "$properties_status" != "200" ]; then
        echo "❌ API 接続エラー"
        echo "   → Vercel の環境変数を確認してください"
        echo "   → NEXT_PUBLIC_SUPABASE_URL"
        echo "   → NEXT_PUBLIC_SUPABASE_ANON_KEY"
        echo ""
    fi
    
    echo "詳細は SUPABASE_SETUP_STEP_BY_STEP.md を参照してください"
fi
echo ""

# 6. 確認用 URL
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔗 確認用 URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "顧客一覧:"
echo "  $URL/api/crm/customers"
echo ""
echo "物件一覧:"
echo "  $URL/api/properties"
echo ""
echo "問合せ一覧:"
echo "  $URL/api/inquiries"
echo ""
echo "Supabase ダッシュボード:"
echo "  https://app.supabase.com"
echo ""
