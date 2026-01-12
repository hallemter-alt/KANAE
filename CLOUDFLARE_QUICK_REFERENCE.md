# Cloudflare Pages クイックリファレンス

## 🚀 初回セットアップ（5分）

### Cloudflare Pages 設定値

```yaml
Project name: kanae-real-estate
Production branch: main
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Node.js version: 20
```

### 環境変数

```
NODE_VERSION=20
NEXT_TELEMETRY_DISABLED=1
```

---

## 🔄 日常の更新（3ステップ）

### Step 1: コミット
```bash
git add .
git commit -m "feat: 新機能追加"
```

### Step 2: プッシュ
```bash
git push origin main
```

### Step 3: 自動デプロイ 🎉
- プッシュ後、自動的にビルド＆デプロイ
- 2-5分で完了

---

## ✅ 確認方法

### URL
```
https://kanae-real-estate.pages.dev
```

### ログ確認
1. https://dash.cloudflare.com
2. Workers & Pages → kanae-real-estate
3. Deployments タブ → View build logs

---

## ❌ トラブルシューティング

### ビルド失敗
```bash
# ローカルで確認
npm run build

# エラー修正後
git add .
git commit -m "fix: ビルドエラー修正"
git push origin main
```

### キャッシュクリア
- Dashboard → Settings → "Purge build cache"
- ブラウザ: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

---

## 📚 詳細ドキュメント

完全なガイドは [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) を参照
