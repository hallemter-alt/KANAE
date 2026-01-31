# Task 0-2：Vercel デプロイ実施ガイド

## ✅ 事前確認

### 完了済み
- [x] Next.js プロジェクトの SSR 化完了
- [x] API Routes 実装完了（/api/hello, /api/properties, /api/contact）
- [x] GitHub リポジトリに push 完了
- [x] すべてのページが実装済み（/, /rent, /sale, /minpaku, /api-test）

### GitHub リポジトリ情報
- **URL**: https://github.com/hallemter-alt/KANAE
- **ブランチ**: main
- **最新コミット**: 5e74a26

---

## 🚀 Vercel デプロイ手順（5 分で完了）

### ステップ 1：Vercel にアクセス（1 分）

1. ブラウザで https://vercel.com を開く
2. **「Sign Up」** または **「Log In」** をクリック
3. **「Continue with GitHub」** を選択
4. GitHub OAuth 認証画面で **「Authorize Vercel」** をクリック

---

### ステップ 2：新規プロジェクトをインポート（2 分）

1. Vercel ダッシュボードで **「Add New...」** → **「Project」** をクリック
2. **「Import Git Repository」** セクションで検索バーに `KANAE` を入力
3. `hallemter-alt/KANAE` を見つけて **「Import」** をクリック

**⚠️ リポジトリが表示されない場合**:
- **「Adjust GitHub App Permissions」** をクリック
- Vercel に `hallemter-alt/KANAE` へのアクセス権を付与
- 画面を更新して再度 Import

---

### ステップ 3：プロジェクト設定（自動検出）（1 分）

Vercel が自動的に Next.js を検出します。以下の設定を確認：

| 設定項目 | 値 | 備考 |
|---------|-----|------|
| **Project Name** | `kanae` または任意の名前 | URL に使用されます |
| **Framework Preset** | `Next.js` | ✅ 自動検出 |
| **Root Directory** | `./` | ✅ デフォルト |
| **Build Command** | `next build` | ✅ 自動設定 |
| **Output Directory** | `.next` | ✅ 自動設定 |
| **Install Command** | `npm install` | ✅ 自動設定 |
| **Node.js Version** | `18.x` 以上 | ✅ 推奨 |

**📝 変更が必要な場合のみ**:
- **「Build and Output Settings」** を展開
- **「Override」** をクリックして編集

---

### ステップ 4：環境変数（スキップ可能）（0 分）

現時点では環境変数は不要です。そのまま次へ進んでください。

**後で追加する場合**:
- Vercel ダッシュボード → プロジェクト → **Settings** → **Environment Variables**

---

### ステップ 5：デプロイ実行（1 分）

1. 設定を確認したら **「Deploy」** ボタンをクリック
2. デプロイが開始されます（通常 1〜3 分）
3. 進行状況が表示されます：
   ```
   ✓ Cloning repository
   ✓ Installing dependencies
   ✓ Building
   ✓ Uploading
   ✓ Deploying
   ```

---

### ステップ 6：デプロイ完了確認（1 分）

デプロイが完了すると：

1. **🎉 おめでとうございます！** の画面が表示される
2. **デプロイ URL** が表示される（例: `https://kanae-xyz123.vercel.app`）
3. **「Visit」** または **「Go to Dashboard」** ボタンが表示される

---

## ✅ デプロイ後の動作確認

### 🌐 ブラウザで確認

以下のページにアクセスして、すべて正常に表示されることを確認：

```
✓ https://your-project.vercel.app/          → ホームページ
✓ https://your-project.vercel.app/rent      → 賃貸検索
✓ https://your-project.vercel.app/sale      → 売買検索
✓ https://your-project.vercel.app/minpaku   → 民泊サービス
✓ https://your-project.vercel.app/api-test  → API テスト
```

### 🔌 API エンドポイントを確認

```bash
# Hello API
curl https://your-project.vercel.app/api/hello

# Properties API
curl https://your-project.vercel.app/api/properties

# Properties API (フィルタ付き)
curl "https://your-project.vercel.app/api/properties?type=rent"
```

### 🔍 自動検証スクリプトを実行

デプロイ URL を取得したら、以下のコマンドで自動検証：

```bash
cd /home/user/webapp
./verify-deployment.sh https://your-project.vercel.app
```

---

## 🔄 自動デプロイの確認

Vercel が GitHub と連携されたので、今後は以下のような自動デプロイが行われます：

### main ブランチへの push → 本番デプロイ
```bash
git add .
git commit -m "feat: Add new feature"
git push origin main
# → Vercel が自動的に本番環境にデプロイ
```

### Pull Request → プレビューデプロイ
```bash
git checkout -b feature/new-feature
git add .
git commit -m "feat: Add new feature"
git push origin feature/new-feature
# → GitHub で PR を作成
# → Vercel が自動的にプレビュー環境を作成
```

---

## 📊 Vercel ダッシュボードの確認

デプロイ完了後、Vercel ダッシュボードで以下を確認できます：

### プロジェクト概要
- **Deployments**: デプロイ履歴
- **Domains**: カスタムドメイン設定
- **Analytics**: アクセス解析（Pro プラン）
- **Settings**: プロジェクト設定

### デプロイ詳細
- **Build Logs**: ビルドログ
- **Function Logs**: API ログ（Edge Functions）
- **Source**: ソースコード
- **Preview**: プレビュー URL

---

## 🎯 次のステップ

### 完了したら

1. **デプロイ URL を記録**
   - 例: `https://kanae-abc123.vercel.app`
   
2. **動作確認を実施**
   - すべてのページが表示されることを確認
   - API が正常に動作することを確認

3. **デプロイ URL を共有**
   - プロジェクトチームに通知
   - ドキュメントに記載

### 次の作業

- **Task 0-3**: ドメイン接続（DNS 設定完了後）
  - `www.kanae-tokyo.com` を Vercel に接続
  - CNAME レコードを設定
  - SSL 証明書の発行

- **基本機能の実装**（並行して進める）
  - CRM 機能
  - KPI ダッシュボード
  - データベース統合
  - 認証機能

---

## 🔍 トラブルシューティング

### ❌ ビルドエラーが発生した場合

1. **Vercel のビルドログを確認**
   - Deployments → 最新のデプロイ → Build Logs

2. **ローカルでビルドテスト**
   ```bash
   cd /home/user/webapp
   npm run build
   ```

3. **よくあるエラー**
   - Node.js バージョンが古い → `package.json` で `"engines"` を指定
   - 依存関係の問題 → `npm ci` を実行して確認
   - 環境変数が不足 → Vercel で環境変数を設定

### ❌ API が動作しない場合

1. **Vercel の Function Logs を確認**
   - Deployments → 最新のデプロイ → Function Logs

2. **API Routes の確認**
   - `app/api/` ディレクトリに `route.ts` ファイルが存在するか確認
   - `GET` や `POST` メソッドが正しくエクスポートされているか確認

3. **ローカルでテスト**
   ```bash
   npm run dev
   curl http://localhost:3000/api/hello
   ```

### ❌ リポジトリが表示されない場合

1. **GitHub App の権限を確認**
   - Vercel → Settings → Git Integration
   - **「Adjust GitHub App Permissions」** をクリック
   - `hallemter-alt/KANAE` にアクセス権を付与

2. **GitHub で Vercel App を確認**
   - GitHub → Settings → Applications → Installed GitHub Apps
   - Vercel App に必要な権限があるか確認

---

## 📝 完了チェックリスト

- [ ] Vercel にログイン完了
- [ ] `hallemter-alt/KANAE` をインポート
- [ ] プロジェクト設定を確認（Next.js 自動検出）
- [ ] デプロイ実行
- [ ] デプロイ成功（🎉 画面が表示される）
- [ ] デプロイ URL を取得
- [ ] ブラウザで全ページを確認
- [ ] API エンドポイントを確認
- [ ] `./verify-deployment.sh` を実行
- [ ] デプロイ URL をドキュメントに記載

---

## 🔗 参考リンク

- **Vercel**: https://vercel.com
- **Vercel ドキュメント**: https://vercel.com/docs
- **Next.js on Vercel**: https://vercel.com/docs/frameworks/nextjs
- **GitHub リポジトリ**: https://github.com/hallemter-alt/KANAE

---

**作成日**: 2026-01-12  
**タスク**: Task 0-2（Vercel デプロイ）  
**所要時間**: 約 5 分  
**前提条件**: Task 0-1（SSR 化）完了 ✅
