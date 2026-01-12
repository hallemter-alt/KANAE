# Phase 1 実装完了ガイド

## ✅ 実装完了内容

### Task 1-1：Supabase + CRM API
- [x] Supabase クライアントのセットアップ
- [x] データベーススキーマの作成（5テーブル）
- [x] 顧客管理 CRUD API 実装
- [x] 物件 CRUD API 実装（Supabase 統合）
- [x] 問合せ API 実装（Supabase 統合 + メール送信対応）

### 実装済み API エンドポイント

#### 🧑‍💼 顧客管理（CRM）
| エンドポイント | メソッド | 機能 |
|--------------|---------|------|
| `/api/crm/customers` | GET | 顧客一覧取得（検索・フィルター・ページネーション対応） |
| `/api/crm/customers` | POST | 顧客新規登録 |
| `/api/crm/customers/:id` | GET | 顧客詳細取得（問合せ・お気に入り物件含む） |
| `/api/crm/customers/:id` | PUT | 顧客情報更新 |
| `/api/crm/customers/:id` | DELETE | 顧客削除 |

#### 🏠 物件管理
| エンドポイント | メソッド | 機能 |
|--------------|---------|------|
| `/api/properties` | GET | 物件一覧取得（検索・フィルター・ソート・ページネーション対応） |
| `/api/properties` | POST | 物件新規登録 |
| `/api/properties/:id` | GET | 物件詳細取得（問合せ・お気に入り含む） |
| `/api/properties/:id` | PUT | 物件情報更新 |
| `/api/properties/:id` | DELETE | 物件削除 |

#### 📧 問合せ管理
| エンドポイント | メソッド | 機能 |
|--------------|---------|------|
| `/api/contact` | POST | 問合せ送信（DB保存 + メール通知） |
| `/api/inquiries` | GET | 問合せ一覧取得（フィルター・ページネーション対応） |
| `/api/inquiries/:id` | GET | 問合せ詳細取得（顧客・物件情報含む） |
| `/api/inquiries/:id` | PUT | 問合せステータス更新 |

---

## 🚀 セットアップ手順

### ステップ 1：Supabase プロジェクトの作成

1. **Supabase にアクセス**
   - https://app.supabase.com にアクセス
   - GitHub でログイン

2. **新規プロジェクトを作成**
   - 「New Project」をクリック
   - プロジェクト名：`kanae-crm`（任意）
   - データベースパスワード：強力なパスワードを設定
   - リージョン：`Tokyo (ap-northeast-1)` を選択
   - 「Create new project」をクリック

3. **プロジェクトの初期化を待機**
   - 通常 2〜3 分で完了

---

### ステップ 2：データベーススキーマの作成

1. **SQL Editor にアクセス**
   - 左サイドバーから「SQL Editor」を選択
   - 「New query」をクリック

2. **スキーマを実行**
   - `supabase/schema.sql` の内容をコピー
   - SQL Editor に貼り付け
   - 「Run」をクリック

3. **実行結果を確認**
   ```
   ✅ データベーススキーマの作成が完了しました！
   次のステップ：
   1. Supabase ダッシュボードで API キーを取得
   2. .env.local に以下を設定：
      NEXT_PUBLIC_SUPABASE_URL=your-project-url
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **テーブルを確認**
   - 左サイドバーから「Table Editor」を選択
   - 以下のテーブルが作成されていることを確認：
     - `customers`（顧客）
     - `properties`（物件）
     - `inquiries`（問合せ）
     - `property_favorites`（お気に入り）
     - `kpis`（KPI データ）

---

### ステップ 3：API キーの取得

1. **Settings → API にアクセス**
   - 左サイドバーから「Settings」→「API」を選択

2. **以下の情報をコピー**
   ```
   Project URL: https://xxxxx.supabase.co
   anon public key: eyJhbGci...（長い文字列）
   ```

---

### ステップ 4：環境変数の設定

1. **ローカル環境変数ファイルを作成**
   ```bash
   cd /home/user/webapp
   cp .env.local.example .env.local
   ```

2. **.env.local を編集**
   ```env
   # Supabase 設定
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

   # メール送信サービス（Resend 推奨）
   # 後で設定する場合はコメントアウトのまま
   # RESEND_API_KEY=your-resend-api-key

   # アプリケーション設定
   NEXT_PUBLIC_APP_URL=https://www.rut-tokyo.com
   ```

3. **Vercel に環境変数を設定**
   - Vercel ダッシュボードにアクセス
   - プロジェクト → Settings → Environment Variables
   - 以下の環境変数を追加：
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
     NEXT_PUBLIC_APP_URL=https://www.rut-tokyo.com
     ```
   - 「Save」をクリック

4. **Vercel で再デプロイ**
   - Deployments → 最新のデプロイ → 「⋮」→「Redeploy」

---

### ステップ 5：動作確認

#### ローカルで確認
```bash
cd /home/user/webapp
npm run dev
```

#### API テスト
```bash
# 顧客一覧取得
curl http://localhost:3000/api/crm/customers

# 物件一覧取得
curl http://localhost:3000/api/properties

# 問合せ一覧取得
curl http://localhost:3000/api/inquiries
```

#### 本番環境で確認
```bash
# 顧客一覧取得
curl https://www.rut-tokyo.com/api/crm/customers

# 物件一覧取得
curl https://www.rut-tokyo.com/api/properties?type=rent

# 問合せ送信
curl -X POST https://www.rut-tokyo.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "テスト太郎",
    "email": "test@example.com",
    "phone": "090-1234-5678",
    "type": "inquiry",
    "message": "テストメッセージです"
  }'
```

---

## 📊 データベーススキーマ

### customers（顧客テーブル）
```sql
- id: UUID（主キー）
- name: TEXT（氏名）
- name_kana: TEXT（氏名（カナ））
- email: TEXT（メールアドレス、ユニーク）
- phone: TEXT（電話番号）
- address: TEXT（住所）
- notes: TEXT（備考）
- type: TEXT（種別：rent/sale/minpaku）
- status: TEXT（ステータス：active/inactive）
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### properties（物件テーブル）
```sql
- id: UUID（主キー）
- title: TEXT（物件名）
- type: TEXT（種別：rent/sale/minpaku）
- price: NUMERIC（価格）
- monthly_rent: NUMERIC（月額賃料）
- initial_cost: NUMERIC（初期費用）
- address: TEXT（住所）
- area: NUMERIC（面積）
- rooms: TEXT（間取り）
- image_urls: TEXT[]（画像URL配列）
- description: TEXT（説明）
- status: TEXT（ステータス：available/rented/sold/hidden）
- features: TEXT[]（特徴配列）
- nearest_station: TEXT（最寄り駅）
- walking_minutes: INTEGER（徒歩分数）
- floor: INTEGER（階数）
- building_age: INTEGER（築年数）
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### inquiries（問合せテーブル）
```sql
- id: UUID（主キー）
- customer_id: UUID（顧客ID、外部キー）
- property_id: UUID（物件ID、外部キー）
- name: TEXT（氏名）
- email: TEXT（メールアドレス）
- phone: TEXT（電話番号）
- type: TEXT（種別：viewing/inquiry/application）
- message: TEXT（メッセージ）
- status: TEXT（ステータス：pending/processing/completed/cancelled）
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

---

## 🔌 API 使用例

### 顧客一覧取得（検索・フィルター）
```bash
GET /api/crm/customers?type=rent&status=active&search=山田&page=1&limit=20
```

### 顧客新規登録
```bash
POST /api/crm/customers
Content-Type: application/json

{
  "name": "山田太郎",
  "name_kana": "ヤマダタロウ",
  "email": "yamada@example.com",
  "phone": "090-1234-5678",
  "type": "rent",
  "status": "active"
}
```

### 物件検索（複数条件）
```bash
GET /api/properties?type=rent&minPrice=100000&maxPrice=200000&rooms=1LDK&sort=price&order=asc&page=1
```

### 物件新規登録
```bash
POST /api/properties
Content-Type: application/json

{
  "title": "渋谷駅徒歩5分 1LDK",
  "type": "rent",
  "price": 150000,
  "monthly_rent": 150000,
  "address": "東京都渋谷区道玄坂1-1-1",
  "area": 35.5,
  "rooms": "1LDK",
  "description": "渋谷駅から徒歩5分の好立地",
  "features": ["バス・トイレ別", "オートロック"],
  "nearest_station": "渋谷駅",
  "walking_minutes": 5,
  "floor": 3
}
```

### 問合せ送信
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "田中太郎",
  "email": "tanaka@example.com",
  "phone": "090-9876-5432",
  "type": "viewing",
  "message": "内見の予約をしたいです",
  "property_id": "uuid-here"
}
```

---

## 📝 次のステップ

### Phase 1 残りタスク

#### Task 1-2：物件検索・詳細ページ機能
- [ ] 物件検索 UI の実装
- [ ] 物件詳細ページの実装
- [ ] 画像ギャラリーの実装
- [ ] 初期費用計算機能の実装

#### Task 1-3：問合せフォーム + メール送信
- [ ] 問合せフォーム UI の実装
- [ ] Resend API のセットアップ
- [ ] メール送信機能のテスト

---

## 🔍 トラブルシューティング

### Supabase 接続エラー
```
Error: Supabase credentials not found
```
**解決策**:
1. `.env.local` に環境変数が設定されているか確認
2. `NEXT_PUBLIC_` プレフィックスがあるか確認
3. 開発サーバーを再起動: `npm run dev`

### データベースエラー
```
Database error: relation "customers" does not exist
```
**解決策**:
1. Supabase SQL Editor で `supabase/schema.sql` を再実行
2. Table Editor でテーブルが作成されているか確認

### メール送信エラー
```
⚠️ Resend API key not configured
```
**解決策**:
- これは警告です。メール送信は問合せデータの保存後に実行されるため、問合せ自体は正常に保存されます
- Resend API を設定する場合は後述の「Resend セットアップ」を参照

---

## 📧 Resend セットアップ（オプション）

### ステップ 1：Resend アカウント作成
1. https://resend.com にアクセス
2. 「Sign Up」をクリック
3. GitHub でログイン

### ステップ 2：API キー取得
1. 「API Keys」→「Create API Key」
2. 名前：`kanae-production`
3. Permission：`Sending access`
4. 「Create」をクリック
5. API キーをコピー

### ステップ 3：環境変数に追加
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### ステップ 4：ドメイン検証（本番環境）
1. Resend ダッシュボード →「Domains」
2. 「Add Domain」→ `rut-tokyo.com` を入力
3. DNS レコードを追加（Wix DNS 設定）
4. 検証完了後、メール送信可能

---

**作成日**: 2026-01-12  
**Phase**: Phase 1 - Task 1-1 完了  
**次のタスク**: Task 1-2（物件検索・詳細ページ UI）
