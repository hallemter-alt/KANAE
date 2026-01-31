# ZMN物件データインポートガイド

## 📋 概要

新宿区の投資収益物件データ（13件）を既存のpropertiesテーブルにインポートするツールです。

## 📊 インポートデータ

**ファイル**: `zmn_properties_merged.json.txt`

**物件数**: 13件

**エリア**: 東京都新宿区

**物件タイプ**:
- 一棟収益マンション
- 一棟収益ビル
- テナントビル
- 集合住宅

## 🔧 データ変換処理

### 自動変換機能

#### 1. 交通アクセス情報の抽出
```typescript
// 変換前:
["JR山手線「新大久保」駅 徒歩9分", "JR中央・総武線「大久保」駅 徒歩12分"]

// 変換後:
[
  {"line": "JR山手線", "station": "新大久保駅", "walk_time": 9},
  {"line": "JR中央・総武線", "station": "大久保駅", "walk_time": 12}
]
```

#### 2. 築年月の西暦変換
```typescript
// 対応パターン:
- "1991年03月" → 1991
- "平成16年2月" → 2004 (1988 + 16)
- "令和6年7月" → 2024 (2018 + 6)
- "昭和58年1月" → 1983 (1925 + 58)
```

#### 3. 構造タイプの抽出
```typescript
// "鉄筋コンクリート造陸屋根地下1階付2階建" → "RC造"
// "鉄骨造2階建" → "鉄骨造"
// "鉄骨鉄筋コンクリート造" → "SRC造"
```

#### 4. 入居状況のクリーンアップ
```typescript
// "賃貸中（満室稼働中）を優先するものとします。無断転載禁止" → "満室"
// "賃貸中" → "賃貸中"
// "空室あり" → "空室あり"
```

### データマッピング

| ZMNフィールド | DBフィールド | 変換処理 |
|--------------|-------------|----------|
| `name` | `property_name` | そのまま |
| `type` | `property_type` | デフォルト: "一棟マンション" |
| `address.full` | `address_full` | そのまま |
| `address.prefecture` | `address_prefecture` | デフォルト: "東京都" |
| `address.city_ward` | `address_city` | デフォルト: "新宿区" |
| `transport` | `access_info` | JSON配列に変換 |
| `price_yen` | `price` | そのまま |
| `land_area_sqm` | `land_area_sqm` | そのまま |
| `building_area_sqm` | `building_area_sqm` | そのまま |
| `yield_percent` | `yield_surface` | そのまま |
| `annual_income_yen` | `annual_rent` | そのまま |
| `built_date` | `construction_date` | 西暦変換 |
| `floors` | `building_floors` | "地上X階建"形式 |
| `structure` | `building_structure` | 構造タイプ抽出 |

## 🚀 インポート手順

### 1. 環境変数の確認

`.env.local` ファイルに以下が設定されていることを確認：

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# または Service Role Key（推奨）
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. インポート実行

```bash
npm run import:zmn
```

### 3. 実行結果の確認

成功時の出力例:
```
🚀 Starting ZMN properties import...

📊 Found 13 properties to import

📍 Importing: 西早稲田
   Price: ¥598,074,074
   Yield: 4.05%
   Location: 東京都新宿区西早稲田
   ✅ Success! ID: uuid-here

📍 Importing: ロングウッドヒル中井
   Price: ¥318,000,000
   Yield: 4.26%
   Location: 東京都新宿区中井２丁目29-5
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

## 📋 インポートされる物件一覧

| No | 物件名 | 価格 | 利回り | 所在地 |
|----|--------|------|--------|--------|
| 1 | 西早稲田 | ¥598M | 4.05% | 新宿区西早稲田 |
| 2 | ロングウッドヒル中井 | ¥318M | 4.26% | 新宿区中井２丁目29-5 |
| 3 | 新大久保1棟収益ビル | - | - | 新宿区百人町1丁目 |
| 4 | レイアス西新宿 | ¥588M | - | 新宿区西新宿4-21-5 |
| 5 | 西落合ビラサンテ | ¥208M | 6.34% | 新宿区西落合2-5-11 |
| 6 | 大久保事務所レジ | ¥360M | 3.72% | 新宿区北新宿1-9-10 |
| 7 | JASPER Nishiochiai | - | 4.15% | 新宿区西落合2-15-10 |
| 8 | レグルス下落合 | ¥520M | 4.06% | 新宿区下落合4-4-32 |
| 9 | 東京都新宿区西早稲田2-17-19 | ¥298M | 3.91% | 新宿区西早稲田2-17-19 |
| 10 | 新宿区大久保一丁目PJ | ¥650M | - | 新宿区大久保一丁目7番29号 |
| 11 | ベルヴィル神楽坂 | - | 6.24% | 新宿区横寺町37番45号 |
| 12 | サウンドプルーフプロ北新宿 | ¥844.8M | 3.8% | 新宿区北新宿4丁目16-2 |
| 13 | BABA188ビル | - | - | 新宿区高田馬場1丁目３-12 |

## 🔍 データ検証

### インポート後の確認方法

#### 1. Supabase Dashboardで確認

```sql
SELECT 
  property_name,
  price,
  yield_surface,
  address_full,
  building_structure,
  occupancy_status
FROM properties
WHERE address_city = '新宿区'
ORDER BY created_at DESC
LIMIT 13;
```

#### 2. APIで確認

```bash
# 全件取得
curl http://localhost:3000/api/properties?city=新宿区

# 利回り順
curl http://localhost:3000/api/properties?city=新宿区&sortBy=yield_surface&sortOrder=desc
```

#### 3. Webページで確認

```
http://localhost:3000/ja/properties?city=新宿区
```

## ⚠️ トラブルシューティング

### 問題: 環境変数エラー

```
Error: NEXT_PUBLIC_SUPABASE_URL is not defined
```

**解決方法**:
1. `.env.local` ファイルを確認
2. 環境変数が正しく設定されているか確認
3. ファイルを編集した場合は開発サーバーを再起動

### 問題: 重複エラー

```
⚠️  Already exists, skipping...
```

**説明**: 
同じ物件名が既に存在する場合、スキップされます。これは正常な動作です。

**再インポートする場合**:
1. Supabaseで既存データを削除
2. スクリプトを再実行

### 問題: データ型エラー

```
❌ Error: invalid input syntax for type numeric
```

**原因**: 
数値フィールドに不正な値が含まれている可能性があります。

**解決方法**:
スクリプトの `transformProperty` 関数で該当フィールドの変換ロジックを確認してください。

## 🔧 カスタマイズ

### デフォルト値の変更

`scripts/import-zmn-properties.ts` の `transformProperty` 関数で変更可能:

```typescript
// 例: すべての物件を注目物件にする
return {
  // ...
  is_featured: true,  // ← 変更
  // ...
};
```

### 追加フィールドのマッピング

```typescript
function transformProperty(zmnProp: ZMNProperty): any {
  return {
    // 既存のフィールド...
    
    // カスタムフィールド追加
    custom_field: zmnProp.custom_data,
  };
}
```

## 📝 データ修正

インポート後にデータを修正する場合:

### Supabase Dashboardで直接編集

1. Table Editor → `properties` を開く
2. 該当レコードを見つけて編集
3. Saveをクリック

### SQLで一括更新

```sql
-- 例: 特定物件の情報を更新
UPDATE properties
SET 
  is_featured = true,
  features = ARRAY['駅近', '高利回り']
WHERE property_name = 'サウンドプルーフプロ北新宿';
```

## 🎯 次のステップ

1. ✅ データインポート完了
2. 📸 物件画像の追加
3. 📋 間取り図のアップロード
4. 🏷️ 特徴タグの設定
5. ⭐ 注目物件の選定
6. 🌐 多言語説明文の追加

## 📞 サポート

インポートに関する質問:
- メール: info@kanae-tokyo.com
- 電話: 03-6914-3633

---

**作成日**: 2026-01-31  
**バージョン**: 1.0.0
