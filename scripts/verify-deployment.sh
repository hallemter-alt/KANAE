#!/bin/bash

# デプロイ確認スクリプト / Deployment Verification Script

echo "======================================"
echo "KANAE 不動産 - デプロイ確認"
echo "======================================"
echo ""

# Git情報を確認
echo "📦 Git情報 / Git Information:"
echo "-----------------------------------"
echo "Current Branch: $(git branch --show-current)"
echo "Latest Commit: $(git log --oneline -1)"
echo "Remote Status: $(git status -sb)"
echo ""

# ファイル構成を確認
echo "📁 重要ファイルの確認 / Important Files Check:"
echo "-----------------------------------"

files=(
  "app/[locale]/sale/page.tsx"
  "app/api/properties/unified-search/route.ts"
  "components/properties/PropertyFilters.tsx"
  "components/properties/PropertyCard.tsx"
  "components/Hero.tsx"
  "UNIFIED_PROPERTY_SYSTEM.md"
  "UNIFIED_SALE_SYSTEM.md"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file (Missing)"
  fi
done
echo ""

# 削除されたファイルを確認
echo "🗑️  削除されたファイルの確認 / Removed Files Check:"
echo "-----------------------------------"

removed_files=(
  "app/[locale]/premium-properties/page.tsx"
  "app/api/premium-properties/route.ts"
  "app/api/premium-properties/[id]/route.ts"
)

for file in "${removed_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "✅ $file (正しく削除されています)"
  else
    echo "⚠️  $file (まだ存在しています - 削除が必要)"
  fi
done
echo ""

# package.jsonを確認
echo "📦 依存関係の確認 / Dependencies Check:"
echo "-----------------------------------"
if [ -f "package.json" ]; then
  echo "Next.js version: $(grep '"next"' package.json | head -1)"
  echo "React version: $(grep '"react"' package.json | head -1)"
  echo "Supabase: $(grep '@supabase/supabase-js' package.json | head -1)"
else
  echo "❌ package.json not found"
fi
echo ""

# 環境変数を確認（値は表示しない）
echo "🔐 環境変数の確認 / Environment Variables Check:"
echo "-----------------------------------"
if [ -f ".env.local" ]; then
  if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
    echo "✅ NEXT_PUBLIC_SUPABASE_URL is set"
  else
    echo "❌ NEXT_PUBLIC_SUPABASE_URL is NOT set"
  fi
  
  if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
    echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is set"
  else
    echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is NOT set"
  fi
else
  echo "⚠️  .env.local file not found (Vercel環境変数を使用している可能性があります)"
fi
echo ""

# ビルドテスト（オプション）
echo "🏗️  ビルドチェック / Build Check:"
echo "-----------------------------------"
echo "ローカルビルドをテストする場合は以下を実行してください:"
echo "  npm run build"
echo ""

# デプロイURL（手動で更新が必要）
echo "🌐 デプロイURL / Deployment URLs:"
echo "-----------------------------------"
echo "Production: https://your-domain.vercel.app"
echo "Preview (genspark_ai_developer): https://kanae-git-genspark-ai-developer-your-team.vercel.app"
echo ""
echo "⚠️  実際のURLは Vercel ダッシュボードで確認してください"
echo ""

# 確認すべきページ
echo "✅ 確認すべきページ / Pages to Verify:"
echo "-----------------------------------"
echo "1. トップページ: /ja"
echo "2. 買卖ページ (統合版): /ja/sale"
echo "3. 物件検索ページ: /ja/properties"
echo "4. 削除されたページ (404期待): /ja/premium-properties"
echo ""

# 完了メッセージ
echo "======================================"
echo "✅ チェック完了 / Check Complete"
echo "======================================"
echo ""
echo "詳細な確認手順については以下のドキュメントを参照してください:"
echo "  📄 DEPLOYMENT_VERIFICATION.md"
echo "  📄 UNIFIED_PROPERTY_SYSTEM.md"
echo "  📄 UNIFIED_SALE_SYSTEM.md"
echo ""
