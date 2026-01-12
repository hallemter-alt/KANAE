# Vercel デプロイ完全ガイド

## 📋 概要

GitHub リポジトリを Vercel に接続し、自動デプロイを設定する手順を説明します。

---

## 🚀 Vercel デプロイ手順

### ステップ 1: Vercel にログイン

1. **Vercel にアクセス**
   - URL: https://vercel.com/
   - 「Sign Up」または「Login」をクリック

2. **GitHub OAuth でログイン**
   - 「Continue with GitHub」を選択
   - GitHub アカウントでログイン
   - Vercel に必要な権限を付与

---

### ステップ 2: 新しいプロジェクトを作成

1. **ダッシュボードから新規プロジェクト作成**
   - Vercel ダッシュボードにアクセス: https://vercel.com/dashboard
   - 「Add New...」→「Project」をクリック
   - または直接: https://vercel.com/new

2. **GitHub リポジトリを選択**
   - 「Import Git Repository」セクションで GitHub を選択
   - リポジトリ検索で「KANAE」または「hallemter-alt/KANAE」を検索
   - 「Import」をクリック

---

### ステップ 3: プロジェクト設定

#### 3.1 基本設定

| 設定項目 | 値 | 備考 |
|---------|-----|------|
| **Project Name** | `kanae-real-estate` | 任意の名前（URL の一部になる） |
| **Framework Preset** | `Next.js` | 自動検出されるはず |
| **Root Directory** | `./` | デフォルトのまま |

#### 3.2 Build and Output Settings

Vercel は自動的に Next.js を検出し、以下の設定を適用します：

| 設定項目 | 値 |
|---------|-----|
| **Build Command** | `next build` |
| **Output Directory** | `.next` |
| **Install Command** | `npm ci` または `npm install` |
| **Development Command** | `next dev` |

**確認ポイント**:
- ✅ Framework Preset が「Next.js」になっていることを確認
- ✅ Build Command が `next build` であることを確認
- ✅ Node.js Version は 18.x 以上を推奨

#### 3.3 Environment Variables

**現時点では設定不要**

将来的に必要な環境変数（例）:
```bash
# データベース接続
DATABASE_URL=postgresql://...

# API キー
API_SECRET_KEY=your_secret_key

# その他
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

### ステップ 4: デプロイ実行

1. **「Deploy」ボタンをクリック**
   - すべての設定を確認後、「Deploy」をクリック

2. **ビルドプロセスを監視**
   - ビルドログがリアルタイムで表示される
   - 以下のステップが実行される:
     1. クローン: GitHub からコードを取得
     2. インストール: `npm ci` で依存関係をインストール
     3. ビルド: `next build` で本番ビルドを実行
     4. デプロイ: Vercel の CDN にデプロイ

3. **デプロイ完了を待つ**
   - 通常 2-5 分で完了
   - 成功すると「🎉 Deployment Successful」と表示される

---

### ステップ 5: デプロイ URL の確認

デプロイが完了すると、Vercel が自動的に URL を生成します：

**URL パターン**:
```
https://kanae-real-estate.vercel.app
https://kanae-real-estate-[hash].vercel.app  # プレビュー URL
```

**確認方法**:
1. Vercel ダッシュボードで「Visit」ボタンをクリック
2. または、表示された URL をブラウザで開く

---

## ✅ デプロイ確認チェックリスト

### 1. ホームページの確認

**URL**: `https://kanae-real-estate.vercel.app/`

**確認項目**:
- [ ] ページが正常に表示される
- [ ] Navbar が表示される
- [ ] Hero セクションが表示される
- [ ] Services セクションが表示される
- [ ] Footer が表示される
- [ ] 画像が正常に表示される
- [ ] レスポンシブデザインが動作する

---

### 2. 各ページの確認

#### 賃貸ページ
- **URL**: `https://kanae-real-estate.vercel.app/rent/`
- [ ] 検索フォームが表示される
- [ ] おすすめ物件が表示される

#### 売買ページ
- **URL**: `https://kanae-real-estate.vercel.app/sale/`
- [ ] 物件種別選択が表示される
- [ ] おすすめ物件が表示される

#### 民泊ページ
- **URL**: `https://kanae-real-estate.vercel.app/minpaku/`
- [ ] サービス紹介が表示される
- [ ] 収支シミュレーターが動作する

---

### 3. API Routes の確認

#### Hello API
```bash
curl https://kanae-real-estate.vercel.app/api/hello
```

**期待されるレスポンス**:
```json
{
  "message": "Hello from Next.js API Route",
  "timestamp": "2026-01-12T...",
  "environment": "production"
}
```

**確認項目**:
- [ ] JSON レスポンスが返る
- [ ] `environment` が "production" になっている
- [ ] ステータスコード 200

#### Properties API
```bash
curl 'https://kanae-real-estate.vercel.app/api/properties?type=rent'
```

**期待されるレスポンス**:
```json
{
  "success": true,
  "count": 2,
  "properties": [...]
}
```

**確認項目**:
- [ ] JSON レスポンスが返る
- [ ] `success: true`
- [ ] 物件データが含まれる

#### Contact API
```bash
curl -X POST https://kanae-real-estate.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

**期待されるレスポンス**:
```json
{
  "success": true,
  "message": "お問い合わせありがとうございます...",
  "submissionId": 1234567890
}
```

**確認項目**:
- [ ] JSON レスポンスが返る
- [ ] `success: true`
- [ ] `submissionId` が含まれる

---

### 4. API テストページの確認

**URL**: `https://kanae-real-estate.vercel.app/api-test`

**確認項目**:
- [ ] ページが表示される
- [ ] 各 API テストボタンが動作する
- [ ] レスポンスが正しく表示される

---

## 🔧 ブラウザでの確認手順

### 1. ホームページを開く

```
https://kanae-real-estate.vercel.app/
```

**確認内容**:
1. ページが素早く読み込まれる（< 3秒）
2. すべてのセクションが表示される
3. ナビゲーションが動作する
4. レスポンシブデザインが動作する（ブラウザのウィンドウをリサイズ）

---

### 2. API をブラウザで直接確認

#### Hello API
```
https://kanae-real-estate.vercel.app/api/hello
```

ブラウザで開くと、JSON が表示されます：
```json
{
  "message": "Hello from Next.js API Route",
  "timestamp": "...",
  "environment": "production"
}
```

#### Properties API
```
https://kanae-real-estate.vercel.app/api/properties
```

すべての物件データが表示されます。

```
https://kanae-real-estate.vercel.app/api/properties?type=rent
```

賃貸物件のみが表示されます。

---

### 3. API テストページを使用

```
https://kanae-real-estate.vercel.app/api-test
```

このページで：
1. 各 API の「テスト実行」ボタンをクリック
2. レスポンスが正しく表示されることを確認
3. すべての API が動作していることを確認

---

## 🎯 自動デプロイの動作確認

### Git Push でのデプロイ

1. **ローカルで変更を加える**
   ```bash
   # 例: README.md を編集
   echo "# Updated" >> README.md
   git add README.md
   git commit -m "test: Verify auto-deploy"
   git push origin main
   ```

2. **Vercel ダッシュボードで確認**
   - 自動的に新しいデプロイが開始される
   - ビルドログを確認
   - 数分後、変更が反映される

3. **URL で確認**
   - 変更が本番環境に反映されているか確認

---

## 📊 Vercel ダッシュボードの機能

### デプロイメント履歴
- すべてのデプロイメントを表示
- 各デプロイメントのビルドログを確認
- ロールバック機能（前のバージョンに戻す）

### Analytics（オプション）
- ページビュー数
- リクエスト数
- レスポンス時間
- エラー率

### Settings
- Environment Variables の設定
- Custom Domains の追加
- Build & Development Settings の変更

---

## 🔍 トラブルシューティング

### ビルドが失敗する場合

#### 1. ビルドログを確認
Vercel ダッシュボードの「Deployments」→ 失敗したデプロイメント → 「View Build Logs」

#### 2. よくある原因

**依存関係のエラー**
```bash
# エラー例
npm ERR! Could not resolve dependency
```

**解決策**:
- `package-lock.json` が最新か確認
- ローカルで `npm install` を実行して問題がないか確認

**TypeScript エラー**
```bash
# エラー例
Type error: Cannot find module...
```

**解決策**:
- ローカルで `npm run build` を実行してエラーを確認
- 型定義を修正

**環境変数の不足**
```bash
# エラー例
Error: Missing environment variable
```

**解決策**:
- Vercel ダッシュボードで必要な環境変数を追加

---

### API が動作しない場合

#### 1. API エンドポイントを直接確認
```bash
curl https://your-app.vercel.app/api/hello
```

#### 2. ブラウザの開発者ツールで確認
- F12 を押して開発者ツールを開く
- Network タブで API リクエストを確認
- エラーメッセージを確認

#### 3. Vercel Function Logs を確認
Vercel ダッシュボード → Deployments → Functions タブ

---

### ページが 404 になる場合

#### 1. URL を確認
- Next.js 13+ では `/rent/` ではなく `/rent` でアクセス可能
- 両方試してみる

#### 2. ビルドログで静的生成を確認
ビルドログに以下のような出力があるか確認：
```
Route (app)                          Size
┌ ○ /                             ...
├ ○ /rent                         ...
├ ○ /sale                         ...
└ ○ /minpaku                      ...
```

---

## 🌐 カスタムドメインの設定（オプション）

### 独自ドメインを接続する場合

1. **Vercel ダッシュボードで設定**
   - Project Settings → Domains
   - 「Add Domain」をクリック
   - 独自ドメイン（例：`kanae-realestate.com`）を入力

2. **DNS 設定**
   - A レコードまたは CNAME レコードを設定
   - Vercel が提供する値を使用

3. **SSL 証明書**
   - Vercel が自動的に Let's Encrypt 証明書を発行
   - HTTPS が自動的に有効化される

---

## 📈 パフォーマンス最適化

### Vercel の最適化機能

1. **Edge Network**
   - 世界中の CDN から配信
   - 低レイテンシー

2. **Automatic Static Optimization**
   - 静的ページは自動的に最適化
   - 高速な初回読み込み

3. **Image Optimization**
   - Next.js の Image コンポーネントが自動最適化
   - WebP 形式に変換
   - レスポンシブ画像

4. **Edge Functions**
   - API Routes が Edge で実行
   - 高速なレスポンス

---

## 📝 デプロイ確認レポート（記入用）

### デプロイ情報

- **デプロイ日時**: _______________
- **Vercel URL**: https://________________.vercel.app
- **プロジェクト名**: _______________
- **Framework**: Next.js
- **Node.js Version**: _______________

### 確認結果

#### ホームページ
- [ ] 正常に表示
- [ ] レスポンス時間: _____ ms
- [ ] 問題点: _______________

#### API Routes
- [ ] `/api/hello` 動作確認
  - レスポンス: _______________
- [ ] `/api/properties` 動作確認
  - レスポンス: _______________
- [ ] `/api/contact` 動作確認
  - レスポンス: _______________

#### その他のページ
- [ ] `/rent` 動作確認
- [ ] `/sale` 動作確認
- [ ] `/minpaku` 動作確認
- [ ] `/api-test` 動作確認

### 問題点・改善点

_______________________________________________
_______________________________________________
_______________________________________________

---

## 🎉 デプロイ完了後の次のステップ

### 1. 環境変数の設定
データベースや API キーを使用する場合：
- Vercel ダッシュボード → Settings → Environment Variables
- 必要な環境変数を追加
- 再デプロイ（自動）

### 2. カスタムドメインの追加
独自ドメインを使用する場合：
- Vercel ダッシュボード → Settings → Domains
- ドメインを追加して DNS 設定

### 3. Analytics の有効化
アクセス解析を使用する場合：
- Vercel ダッシュボード → Analytics
- プランをアップグレード（必要に応じて）

### 4. 継続的な開発
- GitHub に Push → 自動デプロイ
- プレビューデプロイメント（PR ごと）
- 本番デプロイメント（main ブランチ）

---

## 📚 参考リンク

- **Vercel ドキュメント**: https://vercel.com/docs
- **Next.js デプロイガイド**: https://nextjs.org/docs/deployment
- **Vercel CLI**: https://vercel.com/docs/cli
- **環境変数の設定**: https://vercel.com/docs/concepts/projects/environment-variables

---

## ✅ チェックリスト

### デプロイ前
- [x] GitHub にコードを Push
- [x] ローカルで `npm run build` が成功
- [x] すべての API が動作

### デプロイ中
- [ ] Vercel にログイン
- [ ] GitHub リポジトリを接続
- [ ] プロジェクト設定を確認
- [ ] デプロイを実行

### デプロイ後
- [ ] Vercel URL にアクセス
- [ ] ホームページが表示される
- [ ] `/api/hello` が JSON を返す
- [ ] `/api/properties` が動作
- [ ] `/api/contact` が動作
- [ ] すべてのページが動作

---

**作成日**: 2026-01-12  
**バージョン**: v1.0  
**状態**: デプロイ準備完了
