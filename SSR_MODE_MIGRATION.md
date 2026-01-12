# Next.js SSR モード移行完了報告

## 📋 実施概要

Next.js プロジェクトを Static Export から SSR（Server-Side Rendering）モードに変更し、API Routes を有効化しました。

---

## ✅ 実施内容

### 1. next.config.ts の変更

#### 変更前（Static Export モード）
```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, // Required for Cloudflare Pages
  },
  output: 'export',           // ← 削除
  trailingSlash: true,        // ← 削除
};
```

#### 変更後（SSR モード）
```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    // unoptimized を削除 → Next.js Image Optimization を有効化
  },
};
```

**変更点**:
- ✅ `output: 'export'` を削除 → SSR モードに戻す
- ✅ `trailingSlash: true` を削除 → デフォルトの動作に戻す
- ✅ `unoptimized: true` を削除 → Next.js の画像最適化を有効化

---

### 2. API Routes の作成

Next.js 13+ の App Router では、`app/api/` ディレクトリに `route.ts` ファイルを作成して API エンドポイントを定義します。

#### 2.1 Hello API（基本テスト用）
**ファイル**: `app/api/hello/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Hello from Next.js API Route',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
}
```

**機能**:
- シンプルな GET エンドポイント
- メッセージ、タイムスタンプ、環境情報を返す
- API Routes が正常に動作していることを確認するためのテスト用

**テスト**:
```bash
curl http://localhost:3000/api/hello
```

**レスポンス例**:
```json
{
  "message": "Hello from Next.js API Route",
  "timestamp": "2026-01-12T15:21:31.018Z",
  "environment": "development"
}
```

---

#### 2.2 Properties API（物件データ）
**ファイル**: `app/api/properties/route.ts`

**機能**:
- **GET**: 物件リストの取得（フィルタリング対応）
  - クエリパラメータ:
    - `type`: 物件タイプ（rent または sale）
    - `minPrice`: 最低価格
    - `maxPrice`: 最高価格
  - サンプルデータ（4件）を返す
  
- **POST**: 新規物件の登録
  - 必須フィールド: `title`, `price`, `type`
  - バリデーション機能付き

**サンプルデータ**:
```javascript
[
  {
    id: 1,
    type: 'rent',
    title: 'モダンな1LDKマンション',
    price: 85000,
    location: '東京都渋谷区',
    rooms: '1LDK',
    area: 35,
    features: ['駅近', 'ペット可', '南向き'],
  },
  // ... 他3件
]
```

**テスト例**:
```bash
# 賃貸物件のみ取得
curl 'http://localhost:3000/api/properties?type=rent'

# 価格範囲でフィルタリング
curl 'http://localhost:3000/api/properties?minPrice=50000&maxPrice=150000'

# 新規物件を登録
curl -X POST http://localhost:3000/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "新しい物件",
    "price": 100000,
    "type": "rent"
  }'
```

---

#### 2.3 Contact API（お問い合わせフォーム）
**ファイル**: `app/api/contact/route.ts`

**機能**:
- **POST**: お問い合わせフォームの送信
  - 必須フィールド: `name`, `email`, `message`
  - オプション: `phone`, `propertyId`, `type`
  - Email 形式のバリデーション
  - エラーハンドリング
  
- **GET**: 405 Method Not Allowed を返す

**リクエスト例**:
```json
{
  "name": "山田太郎",
  "email": "yamada@example.com",
  "phone": "090-1234-5678",
  "message": "物件について詳しく教えてください。",
  "propertyId": 1,
  "type": "inquiry"
}
```

**レスポンス例（成功）**:
```json
{
  "success": true,
  "message": "お問い合わせありがとうございます。担当者より3営業日以内にご連絡いたします。",
  "submissionId": 1673538091018
}
```

**レスポンス例（エラー）**:
```json
{
  "success": false,
  "error": "Missing required fields",
  "missingFields": ["email"]
}
```

**テスト例**:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "テストユーザー",
    "email": "test@example.com",
    "message": "テストメッセージ"
  }'
```

---

### 3. API テストページの作成

**ファイル**: `app/api-test/page.tsx`

**機能**:
- すべての API エンドポイントをブラウザからテストできるインタラクティブなページ
- 各 API に対応するテストボタン
- レスポンスを整形して表示
- ローディング状態の表示
- API ドキュメントを含む

**アクセス方法**:
```
http://localhost:3000/api-test
```

**含まれる機能**:
1. **Hello API テスト**
   - ワンクリックで GET リクエスト
   - レスポンスを JSON 形式で表示

2. **Properties API テスト**
   - フィルタリング付きで GET リクエスト
   - レスポンスに物件リストを表示

3. **Contact API テスト**
   - サンプルデータで POST リクエスト
   - 送信結果を表示

4. **API ドキュメント**
   - 利用可能なエンドポイント一覧
   - クエリパラメータの説明
   - サポートされる HTTP メソッド

---

## 🔧 ディレクトリ構造

```
app/
├── api/                          # API Routes ディレクトリ
│   ├── hello/
│   │   └── route.ts              # Hello API
│   ├── properties/
│   │   └── route.ts              # Properties API
│   └── contact/
│       └── route.ts              # Contact API
├── api-test/
│   └── page.tsx                  # API テストページ
├── rent/
│   └── page.tsx                  # 賃貸ページ
├── sale/
│   └── page.tsx                  # 売買ページ
├── minpaku/
│   └── page.tsx                  # 民泊ページ
├── layout.tsx                    # ルートレイアウト
└── page.tsx                      # ホームページ
```

---

## ✅ 動作確認

### ローカルでの確認方法

```bash
# 開発サーバーを起動
npm run dev

# ブラウザで開く
# - ホームページ: http://localhost:3000
# - API テストページ: http://localhost:3000/api-test

# API を直接テスト
curl http://localhost:3000/api/hello
curl 'http://localhost:3000/api/properties?type=rent'
```

### テスト結果

#### Hello API
```bash
$ curl http://localhost:3000/api/hello
```

✅ **成功**: レスポンスを正常に取得
```json
{
  "message": "Hello from Next.js API Route",
  "timestamp": "2026-01-12T15:21:31.018Z",
  "environment": "development"
}
```

#### Properties API
```bash
$ curl 'http://localhost:3000/api/properties?type=rent'
```

✅ **成功**: フィルタリングされた物件リストを取得

#### Contact API
```bash
$ curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

✅ **成功**: 送信確認レスポンスを取得

---

## 📝 変更ファイル一覧

| ファイル | 変更内容 | 行数 |
|---------|---------|------|
| `next.config.ts` | SSR モードに変更、不要な設定を削除 | -5 行 |
| `app/api/hello/route.ts` | Hello API 新規作成 | 8 行 |
| `app/api/properties/route.ts` | Properties API 新規作成 | 91 行 |
| `app/api/contact/route.ts` | Contact API 新規作成 | 77 行 |
| `app/api-test/page.tsx` | API テストページ新規作成 | 212 行 |
| **合計** | **5 ファイル** | **383 行** |

---

## 🎯 技術的なポイント

### 1. Next.js App Router の API Routes

Next.js 13+ では、`app/api/` ディレクトリに `route.ts` ファイルを作成することで API Routes を定義します。

**基本構造**:
```typescript
import { NextRequest, NextResponse } from 'next/server';

// GET リクエスト
export async function GET(request: NextRequest) {
  return NextResponse.json({ data: 'response' });
}

// POST リクエスト
export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

### 2. NextRequest と NextResponse

- **NextRequest**: リクエストオブジェクト
  - `request.nextUrl.searchParams` でクエリパラメータを取得
  - `request.json()` でリクエストボディを取得
  
- **NextResponse**: レスポンスオブジェクト
  - `NextResponse.json()` で JSON レスポンスを返す
  - ステータスコードやヘッダーをカスタマイズ可能

### 3. SSR モードの利点

- ✅ **サーバーサイド処理**: データベースアクセス、認証などが可能
- ✅ **API Routes**: バックエンド API を同じプロジェクトで実装
- ✅ **動的レンダリング**: ユーザーごとに異なるコンテンツを提供
- ✅ **SEO 最適化**: サーバーサイドでメタタグを動的に生成
- ✅ **画像最適化**: Next.js の自動画像最適化を使用

### 4. Static Export との違い

| 機能 | Static Export | SSR モード |
|------|--------------|-----------|
| API Routes | ❌ 使用不可 | ✅ 使用可能 |
| 動的ルート | 制限あり（generateStaticParams 必要） | ✅ 完全対応 |
| サーバー処理 | ❌ 不可 | ✅ 可能 |
| データベース | ❌ ビルド時のみ | ✅ リアルタイム |
| デプロイ | 静的ホスティング（Cloudflare Pages 等） | Node.js サーバー（Vercel, AWS 等） |
| ビルド | `next build` → `out/` | `next build` → `.next/` |

---

## 🚀 デプロイ方法

### Vercel へのデプロイ（推奨）

Vercel は Next.js の開発元で、SSR モードを完全サポートしています。

```bash
# Vercel CLI をインストール
npm i -g vercel

# ログイン
vercel login

# デプロイ
vercel
```

**または**:
1. Vercel ダッシュボードで GitHub リポジトリを接続
2. 自動デプロイが設定される
3. `git push` するたびに自動デプロイ

**設定不要**: Vercel が自動的に Next.js を検出し、適切に設定します。

---

### その他のプラットフォーム

#### AWS (Amplify / EC2)
- Node.js 環境が必要
- `npm run build && npm start` で起動

#### Heroku
```bash
# Procfile を作成
echo "web: npm start" > Procfile

# デプロイ
git push heroku main
```

#### Railway
- GitHub リポジトリを接続
- 自動的に Next.js を検出してデプロイ

---

## ⚠️ 注意事項

### 1. Cloudflare Pages は使用不可

Static Export モードを削除したため、Cloudflare Pages（静的ホスティング）では動作しません。

**理由**:
- Cloudflare Pages は静的ファイルのみをホスティング
- SSR モードは Node.js サーバーが必要
- API Routes は Node.js ランタイムで動作

**解決策**:
- ✅ Vercel を使用（推奨）
- ✅ Cloudflare Workers を使用（@cloudflare/next-on-pages アダプター）
- ✅ 他の Node.js 対応ホスティングを使用

### 2. 環境変数の設定

API で使用する環境変数は `.env.local` に設定:

```bash
# .env.local
DATABASE_URL=your_database_url
API_SECRET_KEY=your_secret_key
```

**重要**: `.env.local` は Git にコミットしない（`.gitignore` に含まれている）

### 3. データベース接続

本番環境で使用する場合は、実際のデータベースに接続:

```typescript
// 例: Prisma を使用
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const properties = await prisma.property.findMany();
  return NextResponse.json({ properties });
}
```

---

## 📚 次のステップ

### 1. データベース統合
- Prisma または他の ORM を導入
- PostgreSQL / MySQL / MongoDB に接続
- 実際の物件データを保存・取得

### 2. 認証機能
- NextAuth.js を導入
- ユーザー認証・認可を実装
- 管理者専用ページを作成

### 3. より多くの API エンドポイント
- `/api/users` - ユーザー管理
- `/api/bookings` - 予約管理
- `/api/images` - 画像アップロード
- `/api/analytics` - アクセス解析

### 4. API ドキュメント
- Swagger / OpenAPI を導入
- 自動生成されたドキュメントを提供

### 5. テスト
- Jest でユニットテスト
- Playwright で E2E テスト

---

## ✅ 完了チェックリスト

- [x] `next.config.ts` から `output: 'export'` を削除
- [x] `next.config.ts` から `trailingSlash: true` を削除
- [x] SSR モードに変更
- [x] `app/api/` ディレクトリを作成
- [x] Hello API を作成（`/api/hello`）
- [x] Properties API を作成（`/api/properties`）
- [x] Contact API を作成（`/api/contact`）
- [x] API テストページを作成（`/api-test`）
- [x] ローカルで `npm run dev` 確認
- [x] すべての API をテスト
- [x] GitHub に commit & push

---

## 🎉 完了

Next.js プロジェクトを SSR モードに移行し、API Routes を有効化しました！

**コミット**: `bbde5a8`  
**GitHub**: https://github.com/hallemter-alt/KANAE

**次のアクション**:
1. ✅ Vercel にデプロイ
2. ✅ `/api-test` ページで全 API をテスト
3. ✅ データベース統合を検討
4. ✅ 認証機能の実装を検討

---

**実装日**: 2026-01-12  
**バージョン**: v0.3.0  
**状態**: ✅ 完了
