# Supabase セットアップ - ステップバイステップガイド

## 🎯 目的
Supabase プロジェクトを作成し、KANAE 不動産 CRM の API を動作させる

**所要時間**: 10〜15 分

---

## 📋 ステップ 1：Supabase プロジェクト作成（5 分）

### 1-1. Supabase にアクセス
1. ブラウザで https://app.supabase.com を開く
2. **「Start your project」** または **「New project」** をクリック
3. GitHub アカウントでログイン（すでにログイン済みの場合はスキップ）

### 1-2. Organization を選択（初回のみ）
- 既存の Organization を選択、または新規作成
- 個人用の場合は自分のアカウント名を選択

### 1-3. プロジェクト情報を入力
```
Name: kanae-crm
Database Password: [強力なパスワードを生成・保存]
  ⚠️ このパスワードは後で必要になるので必ず保存してください
Region: Tokyo (ap-northeast-1)
  ※ 日本のユーザー向けなので Tokyo を選択
Pricing Plan: Free（無料プラン）
```

### 1-4. プロジェクト作成
1. **「Create new project」** ボタンをクリック
2. プロジェクトの初期化を待機（2〜3 分）
3. ダッシュボードが表示されたら完了

---

## 📋 ステップ 2：データベーススキーマ作成（2 分）

### 2-1. SQL Editor を開く
1. 左サイドバーから **「SQL Editor」** をクリック
2. **「New query」** をクリック

### 2-2. スキーマ SQL をコピー
1. ローカルのプロジェクトで `supabase/schema.sql` を開く
2. **すべての内容をコピー**

または、以下の内容をコピー：

```sql
-- ここに supabase/schema.sql の内容を貼り付け
```

### 2-3. SQL を実行
1. SQL Editor にコピーした内容を貼り付け
2. 右下の **「Run」** ボタンをクリック
3. 実行結果を確認：
   ```
   Success. No rows returned
   ```
4. 完了メッセージが表示される：
   ```
   ✅ データベーススキーマの作成が完了しました！
   ```

### 2-4. テーブル作成を確認
1. 左サイドバーから **「Table Editor」** をクリック
2. 以下の 5 テーブルが表示されていることを確認：
   - ✅ `customers`（顧客）
   - ✅ `properties`（物件）
   - ✅ `inquiries`（問合せ）
   - ✅ `property_favorites`（お気に入り）
   - ✅ `kpis`（KPI データ）

### 2-5. サンプルデータを確認
1. `customers` テーブルをクリック
2. 3 件のサンプルデータが表示される（山田太郎、佐藤花子、鈴木一郎）
3. `properties` テーブルをクリック
4. 4 件のサンプルデータが表示される（渋谷、新宿、表参道、浅草）

---

## 📋 ステップ 3：API キー取得（1 分）

### 3-1. Settings → API にアクセス
1. 左サイドバーの **「Settings」**（歯車アイコン）をクリック
2. **「API」** をクリック

### 3-2. API 情報をコピー
以下の 2 つの情報をコピーして保存：

#### ① Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```
**コピー方法**: 「Project URL」の右側にある 📋 アイコンをクリック

#### ② anon public key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...（長い文字列）
```
**コピー方法**: 「Project API keys」セクションの「anon public」の右側にある 📋 アイコンをクリック

⚠️ **重要**: この 2 つの値をメモ帳などに保存してください（次のステップで使用）

---

## 📋 ステップ 4：Vercel 環境変数設定（2 分）

### 4-1. Vercel ダッシュボードにアクセス
1. https://vercel.com にアクセス
2. **KANAE** プロジェクトを選択

### 4-2. Settings → Environment Variables
1. 上部メニューから **「Settings」** をクリック
2. 左サイドバーから **「Environment Variables」** をクリック

### 4-3. 環境変数を追加

#### 変数 1：NEXT_PUBLIC_SUPABASE_URL
1. **「Add New」** をクリック
2. 以下を入力：
   ```
   Key: NEXT_PUBLIC_SUPABASE_URL
   Value: https://xxxxxxxxxxxxx.supabase.co
   ※ ステップ 3 でコピーした Project URL を貼り付け
   ```
3. Environment: **すべて選択**（Production, Preview, Development）
4. **「Save」** をクリック

#### 変数 2：NEXT_PUBLIC_SUPABASE_ANON_KEY
1. **「Add New」** をクリック
2. 以下を入力：
   ```
   Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ※ ステップ 3 でコピーした anon public key を貼り付け
   ```
3. Environment: **すべて選択**（Production, Preview, Development）
4. **「Save」** をクリック

#### 変数 3：NEXT_PUBLIC_APP_URL（既に設定済みかもしれません）
1. **「Add New」** をクリック
2. 以下を入力：
   ```
   Key: NEXT_PUBLIC_APP_URL
   Value: https://www.kanae-tokyo.com
   ```
3. Environment: **すべて選択**
4. **「Save」** をクリック

### 4-4. 環境変数を確認
以下の 3 つの環境変数が表示されていることを確認：
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `NEXT_PUBLIC_APP_URL`

---

## 📋 ステップ 5：Vercel 再デプロイ（1 分）

### 5-1. Deployments ページにアクセス
1. 上部メニューから **「Deployments」** をクリック
2. 最新のデプロイ（一番上）を見つける

### 5-2. 再デプロイ実行
1. 最新デプロイの右側にある **「⋮」**（3 点メニュー）をクリック
2. **「Redeploy」** を選択
3. ポップアップで **「Redeploy」** を再度クリック

### 5-3. デプロイ完了を待機
1. デプロイが開始される（通常 1〜2 分）
2. ステータスが **「Ready」** になるまで待つ
3. 🎉 デプロイ完了！

---

## 📋 ステップ 6：動作確認（1 分）

### 6-1. ブラウザで確認
```
https://www.kanae-tokyo.com/api/crm/customers
```

**期待される結果**:
```json
{
  "customers": [
    {
      "id": "uuid-here",
      "name": "山田太郎",
      "email": "yamada@example.com",
      ...
    },
    {
      "id": "uuid-here",
      "name": "佐藤花子",
      "email": "sato@example.com",
      ...
    },
    {
      "id": "uuid-here",
      "name": "鈴木一郎",
      "email": "suzuki@example.com",
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 3,
    "totalPages": 1
  }
}
```

### 6-2. 物件一覧を確認
```
https://www.kanae-tokyo.com/api/properties
```

**期待される結果**:
```json
{
  "success": true,
  "properties": [
    {
      "id": "uuid-here",
      "title": "渋谷駅徒歩5分 1LDK",
      "type": "rent",
      "price": 150000,
      ...
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 4,
    "totalPages": 1
  }
}
```

### 6-3. コマンドラインで確認（オプション）
```bash
# 顧客一覧取得
curl https://www.kanae-tokyo.com/api/crm/customers | jq

# 物件一覧取得（賃貸のみ）
curl "https://www.kanae-tokyo.com/api/properties?type=rent" | jq

# 問合せ送信テスト
curl -X POST https://www.kanae-tokyo.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "テスト太郎",
    "email": "test@example.com",
    "phone": "090-1234-5678",
    "type": "inquiry",
    "message": "テストメッセージです"
  }' | jq
```

---

## ✅ 完了チェックリスト

- [ ] Supabase プロジェクト作成完了
- [ ] データベーススキーマ作成完了
- [ ] 5 テーブルが Table Editor に表示される
- [ ] サンプルデータが表示される（顧客3件、物件4件）
- [ ] API キー（URL と anon key）を取得
- [ ] Vercel に環境変数を 3 つ追加
- [ ] Vercel で再デプロイ完了
- [ ] `/api/crm/customers` が正常にデータを返す
- [ ] `/api/properties` が正常にデータを返す

---

## 🔍 トラブルシューティング

### エラー 1：API が空の配列を返す
```json
{
  "customers": [],
  "pagination": { "total": 0 }
}
```

**原因**: 環境変数が正しく設定されていない、または Supabase 接続エラー

**解決策**:
1. Vercel の Environment Variables を確認
2. 環境変数が正しいか確認（スペース、改行なし）
3. Vercel で再デプロイ

### エラー 2：500 Internal Server Error
```json
{
  "error": "Failed to fetch customers",
  "details": "..."
}
```

**原因**: Supabase の接続情報が間違っている

**解決策**:
1. Supabase ダッシュボード → Settings → API で URL とキーを再確認
2. Vercel の環境変数を更新
3. 再デプロイ

### エラー 3：テーブルが存在しないエラー
```
relation "customers" does not exist
```

**原因**: データベーススキーマが作成されていない

**解決策**:
1. Supabase SQL Editor で `supabase/schema.sql` を再実行
2. Table Editor でテーブルが作成されているか確認

---

## 📝 次のステップ

### セットアップ完了後にできること

#### 1. API テスト
- 顧客一覧取得・登録・更新・削除
- 物件一覧取得・登録・更新・削除
- 問合せ送信・一覧取得・ステータス更新

#### 2. UI 実装（次のフェーズ）
- 物件検索ページ
- 物件詳細ページ
- 問合せフォーム改善

#### 3. メール送信設定（オプション）
- Resend API キーを取得
- Vercel に `RESEND_API_KEY` を追加
- 問合せ時に自動メール通知

---

## 🎉 完了！

Supabase セットアップが完了しました！

**確認方法**:
```
https://www.kanae-tokyo.com/api/crm/customers
```

上記 URL でサンプルデータが表示されれば成功です 🚀

---

**作成日**: 2026-01-12  
**所要時間**: 10〜15 分  
**次のアクション**: API 動作確認 → UI 実装
