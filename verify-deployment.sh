#!/bin/bash

# Vercel デプロイメント確認スクリプト
# Usage: ./verify-deployment.sh [YOUR_VERCEL_URL]

# カラーコード
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vercel URL を引数から取得（またはデフォルト）
VERCEL_URL="${1:-https://kanae-real-estate.vercel.app}"

echo "🚀 Vercel デプロイメント確認スクリプト"
echo "========================================"
echo "URL: $VERCEL_URL"
echo ""

# 関数: API テスト
test_api() {
    local endpoint=$1
    local method=${2:-GET}
    local data=$3
    local name=$4

    echo -n "Testing $name ($endpoint)... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$VERCEL_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X POST \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$VERCEL_URL$endpoint")
    fi
    
    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$status_code" = "200" ] || [ "$status_code" = "201" ]; then
        echo -e "${GREEN}✓ PASS${NC} (Status: $status_code)"
        echo "  Response: ${body:0:80}..."
    else
        echo -e "${RED}✗ FAIL${NC} (Status: $status_code)"
        echo "  Response: $body"
    fi
    echo ""
}

# 1. ホームページのテスト
echo "📄 1. ホームページのテスト"
echo "------------------------"
home_status=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/")
if [ "$home_status" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC} - ホームページが正常に表示されます (Status: $home_status)"
else
    echo -e "${RED}✗ FAIL${NC} - ホームページが表示されません (Status: $home_status)"
fi
echo ""

# 2. 各ページのテスト
echo "📄 2. 各ページのテスト"
echo "------------------"

pages=("rent" "sale" "minpaku" "api-test")
for page in "${pages[@]}"; do
    echo -n "Testing /$page... "
    status=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/$page")
    if [ "$status" = "200" ]; then
        echo -e "${GREEN}✓ PASS${NC} (Status: $status)"
    else
        echo -e "${RED}✗ FAIL${NC} (Status: $status)"
    fi
done
echo ""

# 3. API Routes のテスト
echo "🔌 3. API Routes のテスト"
echo "---------------------"

# Hello API
test_api "/api/hello" "GET" "" "Hello API"

# Properties API (GET)
test_api "/api/properties" "GET" "" "Properties API (GET All)"

# Properties API (GET with filter)
test_api "/api/properties?type=rent" "GET" "" "Properties API (GET Filtered)"

# Contact API (POST)
contact_data='{"name":"Test User","email":"test@example.com","message":"Test message"}'
test_api "/api/contact" "POST" "$contact_data" "Contact API (POST)"

# 4. サマリー
echo "================================"
echo "🎉 テスト完了！"
echo "================================"
echo ""
echo "次のステップ:"
echo "1. ブラウザで $VERCEL_URL を開いて視覚的に確認"
echo "2. $VERCEL_URL/api-test でインタラクティブな API テストを実行"
echo "3. すべて正常であれば、デプロイ完了です！"
echo ""
