# 📊 データインポート完全ガイド

## 概要

ZMN物件データを投資収益物件データベースにインポートするための完全なガイドです。

## 前提条件

### 1. Supabase プロジェクトのセットアップ

1. [Supabase](https://app.supabase.com) にログイン
2. 新しいプロジェクトを作成（または既存のプロジェクトを選択）
3. プロジェクトの設定から以下を取得：
   - Project URL
   - Anon/Public Key
   - Service Role Key (管理者権限が必要な場合)

### 2. 環境変数の設定

`.env.local` ファイルを作成：

```bash
cd /home/user/webapp
cp .env.local.example .env.local
```

`.env.local` を編集して、Supabase の認証情報を設定：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 3. データベーススキーマの適用

```bash
# Supabase CLI を使用する場合
cd /home/user/webapp
npx supabase db push

# または Supabase ダッシュボードで手動実行
# SQL Editor で以下のファイルを順番に実行：
# 1. supabase/schema.sql
# 2. supabase/migrations/20260131_premium_properties.sql
```

## データインポート手順

### ステップ1: データファイルの確認

インポートするデータファイル: `zmn_properties_merged.json.txt`

```bash
cd /home/user/webapp
cat zmn_properties_merged.json.txt | jq '.' | head -50
```

**含まれる物件数**: 13件

**物件データの例**:
- KN-001: 西早稲田 (¥598,000,000, 4.05%)
- KN-002: ロングウッドヒル中井 (¥318,000,000, 4.26%)
- KN-003: サウンドプルーフプロ北新宿 (¥844,800,000, 3.8%)
- KN-004: ベルヴィル神楽坂 (6.24% 高利回り)

### ステップ2: インポートスクリプトの実行

```bash
cd /home/user/webapp
npm run import:zmn
```

**スクリプトが実行する処理**:
1. JSON データの読み込み
2. データの変換・クリーンアップ
3. 重複チェック
4. データベースへの挿入
5. エラーハンドリング

### ステップ3: インポート結果の確認

成功した場合の出力例:

```
🚀 Starting ZMN properties import...

📊 Found 13 properties to import

📍 Importing: 西早稲田
   Price: ¥598,000,000
   Yield: 4.05%
   Location: 東京都新宿区西早稲田3-31-4
   ✅ Success! ID: uuid-here

📍 Importing: ロングウッドヒル中井
   Price: ¥318,000,000
   Yield: 4.26%
   Location: 東京都新宿区中井2-22-11
   ✅ Success! ID: uuid-here

...

============================================================
📊 Import Summary:
   ✅ Successful: 13
   ❌ Failed: 0
   📝 Total: 13
============================================================

✨ Import completed!
```

## データ変換の詳細

### 1. 交通アクセスの構造化

**元データ**:
```json
"transport": [
  "JR山手線「新大久保」駅 徒歩9分",
  "東京メトロ副都心線「西早稲田」駅 徒歩5分"
]
```

**変換後**:
```json
"access_info": [
  {
    "line": "JR山手線",
    "station": "新大久保駅",
    "walk_time": 9
  },
  {
    "line": "東京メトロ副都心線",
    "station": "西早稲田駅",
    "walk_time": 5
  }
]
```

### 2. 和暦から西暦への変換

| 和暦 | 西暦 |
|------|------|
| 平成3年 | 1991年 |
| 平成16年 | 2004年 |
| 令和7年 | 2025年 |

### 3. 建物構造の標準化

| 元データ | 変換後 |
|---------|--------|
| "RC造地下1階付4階建" | "RC造" |
| "鉄筋コンクリート造" | "RC造" |
| "鉄骨造4階建" | "鉄骨造" |

### 4. 入居状況のクリーンアップ

元データに含まれるノイズを除去：
- "満室を優先します" → "満室"
- "賃貸中 無断転載禁止" → "賃貸中"
- "空室あり ※情報が異なる場合..." → "空室あり"

## トラブルシューティング

### エラー1: Supabase 接続エラー

```
Error: Invalid Supabase URL
```

**解決方法**:
1. `.env.local` ファイルが存在することを確認
2. `NEXT_PUBLIC_SUPABASE_URL` が正しく設定されているか確認
3. URL の形式: `https://your-project-id.supabase.co`

### エラー2: 認証エラー

```
Error: Invalid API key
```

**解決方法**:
1. Supabase ダッシュボードでキーを再確認
2. `.env.local` のキーをコピー&ペーストで再設定
3. スペースや改行が入っていないか確認

### エラー3: テーブルが存在しない

```
Error: relation "properties" does not exist
```

**解決方法**:
1. データベースマイグレーションを実行
2. Supabase SQL Editor で `supabase/schema.sql` を実行
3. テーブルが正しく作成されたか確認

### エラー4: 重複データ

```
⚠️  Already exists, skipping...
```

これはエラーではなく、既に同じ名前の物件が存在する場合のスキップメッセージです。

**確認方法**:
```sql
SELECT property_name, COUNT(*) 
FROM properties 
GROUP BY property_name 
HAVING COUNT(*) > 1;
```

## インポート後の確認

### 1. データベースで確認

Supabase ダッシュボードの Table Editor で `properties` テーブルを開く

### 2. API で確認

```bash
# すべての物件を取得
curl http://localhost:3000/api/properties

# 新宿区の物件のみ取得
curl "http://localhost:3000/api/properties?city=新宿区"

# 高利回り物件を取得
curl "http://localhost:3000/api/properties?min_yield=5.0"
```

### 3. フロントエンドで確認

```bash
npm run dev
```

ブラウザで開く:
- http://localhost:3000/ja/properties
- http://localhost:3000/ja/premium-properties

## データの更新・再インポート

### 重複を避けて再インポート

スクリプトは自動的に重複チェックを行いますが、手動で削除する場合：

```sql
-- 特定の物件を削除
DELETE FROM properties 
WHERE property_name = '西早稲田';

-- ZMN由来のすべての物件を削除
DELETE FROM properties 
WHERE remarks LIKE '%zmn_list_%';
```

### 部分的なデータ更新

```sql
-- 価格を更新
UPDATE properties 
SET price = 600000000 
WHERE property_name = '西早稲田';

-- 利回りを更新
UPDATE properties 
SET yield_surface = 4.1 
WHERE property_name = '西早稲田';
```

## データの検証

### 必須フィールドの確認

```sql
-- NULL チェック
SELECT 
  COUNT(*) as total,
  COUNT(property_name) as has_name,
  COUNT(price) as has_price,
  COUNT(address_full) as has_address
FROM properties;
```

### データ品質の確認

```sql
-- 異常な価格
SELECT property_name, price 
FROM properties 
WHERE price < 1000000 OR price > 10000000000;

-- 異常な利回り
SELECT property_name, yield_surface 
FROM properties 
WHERE yield_surface < 1 OR yield_surface > 20;

-- 築年数の確認
SELECT property_name, building_age_years 
FROM properties 
WHERE building_age_years < 0 OR building_age_years > 100;
```

## まとめ

✅ **完了項目**:
- データベーススキーマの作成
- インポートスクリプトの実装
- データ変換ロジックの実装
- エラーハンドリング
- 重複チェック
- ドキュメント作成

📋 **次のステップ**:
1. Supabase プロジェクトのセットアップ
2. 環境変数の設定
3. マイグレーションの実行
4. データインポートの実行
5. フロントエンドでの確認
6. 本番環境へのデプロイ

## 関連ドキュメント

- [PREMIUM_PROPERTIES_SYSTEM.md](./PREMIUM_PROPERTIES_SYSTEM.md) - システム概要
- [ZMN_IMPORT_GUIDE.md](./ZMN_IMPORT_GUIDE.md) - インポート基本ガイド
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - 実装ガイド
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - データベース設計

## サポート

問題が発生した場合:
1. このガイドのトラブルシューティングセクションを確認
2. Supabase のログを確認
3. コンソールのエラーメッセージを確認
4. GitHub Issues で報告
