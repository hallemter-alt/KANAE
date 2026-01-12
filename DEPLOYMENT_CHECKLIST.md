# Cloudflare Pages デプロイチェックリスト

## 📋 初回セットアップ

### GitHub 準備
- [ ] リポジトリを GitHub にプッシュ済み
- [ ] `main` ブランチが存在
- [ ] すべての変更がコミット済み

```bash
git status  # 確認
git push origin main
```

### Cloudflare アカウント
- [ ] Cloudflare アカウント作成済み
- [ ] Dashboard にログイン可能: https://dash.cloudflare.com

### プロジェクト作成
- [ ] Workers & Pages セクションに移動
- [ ] "Create application" → "Pages" → "Connect to Git"
- [ ] GitHub 連携完了
- [ ] リポジトリ選択: `webapp`

---

## ⚙️ ビルド設定確認

### 必須設定
- [ ] **Project name**: `kanae-real-estate`
- [ ] **Production branch**: `main`
- [ ] **Framework preset**: `Next.js` ✅ 重要！
- [ ] **Build command**: `npm run build`
- [ ] **Build output directory**: `.next` ✅ 重要！

### 環境変数
- [ ] `NODE_VERSION` = `20`
- [ ] `NEXT_TELEMETRY_DISABLED` = `1`

### 確認方法
```
設定画面で以下を確認：
┌────────────────────────────────┐
│ Framework preset: Next.js   ✓  │
│ Build command: npm run build✓  │
│ Output directory: .next      ✓  │
└────────────────────────────────┘
```

---

## 🚀 初回デプロイ

### デプロイ開始
- [ ] "Save and Deploy" ボタンをクリック
- [ ] ビルドが開始される（黄色のインジケーター）

### ビルド進行状況
- [ ] 依存関係インストール中（~1分）
- [ ] ビルド実行中（~2-3分）
- [ ] デプロイ中（~15秒）

### 成功確認
- [ ] ✅ "Deployment successful" と表示
- [ ] URL が表示される: `https://kanae-real-estate.pages.dev`
- [ ] "View deployment" リンクが表示

---

## ✅ デプロイ確認

### URL アクセス
- [ ] `https://kanae-real-estate.pages.dev` にアクセス
- [ ] ページが正常に表示される

### 機能確認
- [ ] ✅ ホームページが表示される
- [ ] ✅ ナビゲーションが動作する
- [ ] ✅ 言語切替（日/中/英）が機能する
- [ ] ✅ 画像が表示される
- [ ] ✅ モバイル表示が正しい
- [ ] ✅ タブレット表示が正しい
- [ ] ✅ デスクトップ表示が正しい

### ログ確認
- [ ] Dashboard → Deployments タブを開く
- [ ] 最新のデプロイをクリック
- [ ] "View build logs" をクリック
- [ ] ログに ✓ マークが多数表示されている
- [ ] エラーがない

---

## 🔄 日常の更新フロー

### ローカル開発
- [ ] コードを修正
- [ ] `npm run dev` で動作確認
- [ ] ブラウザで確認

### Git 操作
- [ ] `git status` で変更確認
- [ ] `git add .` でステージング
- [ ] `git commit -m "type: description"` でコミット
- [ ] `git push origin main` でプッシュ

### 自動デプロイ確認
- [ ] プッシュ後、Dashboard を確認
- [ ] "Building..." ステータスが表示
- [ ] 2-5分待つ
- [ ] ✅ "Success" ステータスになる
- [ ] URL で更新を確認

---

## 🐛 トラブルシューティング

### ビルド失敗時
- [ ] Dashboard でエラーログを確認
- [ ] エラーメッセージをコピー

**よくあるエラー**:
- [ ] TypeScript エラー → `npm run lint` で確認
- [ ] 依存関係エラー → `package-lock.json` を再生成
- [ ] タイムアウト → 不要なパッケージを削除

### 修正手順
```bash
# ローカルでビルド確認
npm run build

# エラーがなければ
git add .
git commit -m "fix: Build error"
git push origin main
```

### サイトが表示されない
- [ ] ブラウザキャッシュをクリア（`Ctrl+Shift+R`）
- [ ] Dashboard で "Success" ステータス確認
- [ ] 別のブラウザで試す
- [ ] シークレットモードで試す

### 更新が反映されない
- [ ] Dashboard で最新デプロイの時刻確認
- [ ] ログで正しいコミットか確認
- [ ] "Retry deployment" を試す
- [ ] "Purge build cache" を試す

---

## 📊 デプロイステータスの意味

### アイコンの説明
- 🟡 **Building** - ビルド中（2-5分）
- ✅ **Success** - 成功（サイト公開中）
- ❌ **Failed** - 失敗（ログ確認が必要）
- 🔄 **Queued** - キュー待ち

### Success の条件
```
✓ Dependencies installed
✓ Build completed successfully
✓ Deployment succeeded
✓ Site is live
```

### Failed の場合
```
✗ Build failed
✗ Exit code: 1
→ "View full logs" をクリック
→ エラーメッセージを確認
→ 修正してリトライ
```

---

## 🎯 パフォーマンス確認

### ページ速度
- [ ] PageSpeed Insights で測定
  - https://pagespeed.web.dev/
  - URL: `https://kanae-real-estate.pages.dev`
- [ ] スコア 90+ が理想

### 確認項目
- [ ] ✅ LCP (Largest Contentful Paint) < 2.5s
- [ ] ✅ FID (First Input Delay) < 100ms
- [ ] ✅ CLS (Cumulative Layout Shift) < 0.1

### 改善方法
- 画像最適化
- コード分割
- キャッシュ活用

---

## 📱 モバイルテスト

### テストデバイス
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] タブレット (iPad)

### 確認項目
- [ ] タッチ操作が快適
- [ ] 文字が読みやすい
- [ ] ボタンが押しやすい
- [ ] スクロールが滑らか
- [ ] ナビゲーションが使いやすい

---

## 🔐 セキュリティ確認

### SSL 証明書
- [ ] `https://` で始まる URL
- [ ] ブラウザに 🔒 マークが表示
- [ ] 証明書エラーがない

### ヘッダー確認
```bash
curl -I https://kanae-real-estate.pages.dev
```

確認項目:
- [ ] `Strict-Transport-Security` ヘッダー存在
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`

---

## 📈 分析とモニタリング

### Cloudflare Analytics
- [ ] Dashboard → Analytics タブ
- [ ] アクセス数を確認
- [ ] 地域別アクセスを確認
- [ ] デバイス別アクセスを確認

### エラー監視
- [ ] Functions ログを確認
- [ ] エラー率をチェック
- [ ] レスポンスタイムを確認

---

## 🎉 完了確認

すべてにチェックが入ったら完了です！

### 最終確認
- [ ] ✅ サイトが公開されている
- [ ] ✅ すべての機能が動作する
- [ ] ✅ モバイルでも正常動作
- [ ] ✅ パフォーマンスが良好
- [ ] ✅ セキュリティが適切
- [ ] ✅ 自動デプロイが機能している

### 次のステップ
- [ ] チームメンバーに URL を共有
- [ ] ユーザーテストを実施
- [ ] フィードバックを収集
- [ ] 改善点を特定
- [ ] v0.2.0 の開発を開始

---

## 📞 サポート

問題が解決しない場合:
1. [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) の詳細ガイドを参照
2. Cloudflare Community で質問: https://community.cloudflare.com/
3. GitHub Issues で報告

---

**チェックリスト作成日**: 2026-01-12  
**対象プロジェクト**: KANAE Real Estate Website  
**バージョン**: v0.1.0
