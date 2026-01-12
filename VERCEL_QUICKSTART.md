# Vercel デプロイメント - クイックスタートガイド

## 🚀 5分でデプロイ

### ステップ 1: Vercel にアクセス
```
https://vercel.com/
```
→ 「Continue with GitHub」でログイン

---

### ステップ 2: 新規プロジェクト作成
```
https://vercel.com/new
```
→ 「KANAE」リポジトリを選択して「Import」

---

### ステップ 3: 設定確認
| 項目 | 値 |
|------|-----|
| Framework Preset | **Next.js** ✅ |
| Build Command | `next build` ✅ |
| Output Directory | `.next` ✅ |
| Install Command | `npm ci` ✅ |

**環境変数**: 今は設定不要 ⏭️

---

### ステップ 4: デプロイ実行
「**Deploy**」ボタンをクリック → 2-5分待つ

---

### ステップ 5: 確認

#### 🌐 ブラウザで確認
デプロイ完了後、以下の URL にアクセス:

```
https://kanae-real-estate.vercel.app/
```

**確認項目**:
- ✅ ホームページが表示される
- ✅ ナビゲーションが動作する
- ✅ すべてのセクションが見える

---

#### 🔌 API を確認

**Hello API**:
```
https://kanae-real-estate.vercel.app/api/hello
```

**期待されるレスポンス**:
```json
{
  "message": "Hello from Next.js API Route",
  "timestamp": "2026-01-12T...",
  "environment": "production"
}
```

**Properties API**:
```
https://kanae-real-estate.vercel.app/api/properties
```

**期待されるレスポンス**:
```json
{
  "success": true,
  "count": 4,
  "properties": [...]
}
```

---

#### 🧪 API テストページ

```
https://kanae-real-estate.vercel.app/api-test
```

このページで全 API をインタラクティブにテストできます！

---

## ✅ チェックリスト

デプロイ後、以下を確認:

- [ ] `https://[your-app].vercel.app/` が開く
- [ ] ホームページが正常に表示される
- [ ] `/api/hello` が JSON を返す
- [ ] `/api/properties` が物件データを返す
- [ ] `/api/contact` に POST できる
- [ ] `/rent`, `/sale`, `/minpaku` が動作する

---

## 🔧 コマンドラインでテスト

### 方法 1: スクリプトを使用
```bash
# Vercel URL を指定してテスト
./verify-deployment.sh https://your-app.vercel.app
```

### 方法 2: 手動で curl
```bash
# Hello API
curl https://your-app.vercel.app/api/hello

# Properties API
curl https://your-app.vercel.app/api/properties

# Contact API
curl -X POST https://your-app.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

---

## 🎯 自動デプロイのテスト

GitHub に変更を Push すると自動デプロイ:

```bash
# 変更を加える
echo "# Test" >> README.md

# コミット & プッシュ
git add README.md
git commit -m "test: Verify auto-deploy"
git push origin main
```

→ Vercel が自動的にデプロイを開始  
→ 数分後、変更が反映される

---

## 📊 Vercel ダッシュボード

デプロイ後、Vercel ダッシュボードで確認:

```
https://vercel.com/dashboard
```

**確認できること**:
- デプロイメント履歴
- ビルドログ
- アクセス統計（Analytics）
- 環境変数設定
- カスタムドメイン設定

---

## 🆘 問題が発生した場合

### ビルドエラー
→ Vercel の「Build Logs」を確認  
→ ローカルで `npm run build` を実行して確認

### 404 エラー
→ URL が正しいか確認（`/rent` または `/rent/`）  
→ ビルドログでページが生成されているか確認

### API が動作しない
→ `/api/hello` を直接ブラウザで開く  
→ Network タブでエラーを確認

### 詳細ガイド
→ `VERCEL_DEPLOYMENT_GUIDE.md` を参照

---

## 🎉 完了！

デプロイが成功すれば、以下が可能になります:

✅ 世界中から高速アクセス（Vercel の CDN）  
✅ 自動 HTTPS  
✅ Git Push で自動デプロイ  
✅ API Routes が動作  
✅ Next.js の画像最適化

---

## 📚 参考資料

- **完全ガイド**: `VERCEL_DEPLOYMENT_GUIDE.md`
- **SSR 移行ガイド**: `SSR_MODE_MIGRATION.md`
- **Vercel ドキュメント**: https://vercel.com/docs
- **Next.js デプロイ**: https://nextjs.org/docs/deployment

---

**準備完了！Vercel にデプロイしましょう！** 🚀
