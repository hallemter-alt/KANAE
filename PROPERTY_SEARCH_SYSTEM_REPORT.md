# 投資収益物件検索システム 実装完了レポート

## プロジェクト概要

東京都内の投資収益物件を検索・閲覧できるWebシステムを構築しました。
日本の大手不動産サイト（SUUMO、HOME'S等）のような洗練されたUIで、
エリア・路線・駅・価格・利回り等の条件で物件を検索できます。

---

## 実装完了内容

### 1. データベース設計 ✅

**テーブル構成**:
- `properties` - 物件情報（価格、面積、利回り、所在地等）
- `railway_lines` - 路線マスタ（JR山手線、東京メトロ等）
- `stations` - 駅マスタ（新宿駅、渋谷駅等）
- `property_stations` - 物件と駅の関連
- `search_history` - 検索履歴
- `inquiries` - 問い合わせ

**主要フィールド**:
- 基本情報: 物件名、物件タイプ、販売状況
- 所在地: 都道府県、市区町村、住所
- 価格: 販売価格、坪単価
- 面積: 土地面積（㎡/坪）、建物面積（㎡/坪）
- 収益: 年間賃料、利回り、NOI
- アクセス: 最寄り駅、路線、徒歩時間
- 法規制: 用途地域、建ぺい率、容積率

**ファイル**: `supabase/migrations/20260131_create_properties_system.sql`

### 2. PDF解析スクリプト ✅

**機能**:
- PyMuPDF（fitz）を使用してPDFから物件情報を抽出
- 正規表現パターンマッチングで各種データを抽出
  - 価格（万円 → 円に変換）
  - 面積（㎡と坪）
  - 利回り（%）
  - アクセス情報（路線、駅、徒歩時間）
  - 構造（RC造、鉄骨造等）
  - 所在地（都道府県、市区町村）
  - 築年月（西暦変換）

**実行結果**:
```
Total pages: 40
Properties extracted: 22
- Properties with price: 11
- Properties with location: 20
- Properties with access info: 8
- Properties with yield data: 18
```

**ファイル**: `scripts/extract_properties_from_pdf.py`
**出力**: `extracted_properties.json`

### 3. API実装 ✅

#### 3.1 物件検索API
`/api/properties/search`

**検索条件**:
- エリア: 都道府県、市区町村
- 路線・駅: 路線ID、駅ID、徒歩時間
- 価格: 下限・上限
- 面積: 土地面積、建物面積
- 利回り: 下限・上限
- 物件タイプ: 一棟マンション、一棟ビル等
- 築年数: 最大築年数
- ソート: 価格順、利回り順、新着順等
- ページネーション: ページ番号、件数

**レスポンス例**:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  },
  "filters": {...}
}
```

#### 3.2 路線API
`/api/railway-lines`

主要路線（JR山手線、東京メトロ各線、都営線等）を取得

#### 3.3 駅API
`/api/stations?lineId=xxx`

路線IDまたはエリアで駅を取得

#### 3.4 物件詳細API
`/api/properties/[id]`

物件の詳細情報と関連駅情報を取得
閲覧数を自動カウント

**ファイル**:
- `app/api/properties/search/route.ts`
- `app/api/railway-lines/route.ts`
- `app/api/stations/route.ts`
- `app/api/properties/[id]/route.ts`

### 4. フロントエンド実装 ✅

#### 4.1 物件検索ページ
`/[locale]/properties`

**UI特徴**:
- ✨ グラデーション背景の大型ヘッダー
- 🔍 クイック検索バー（エリア・価格・利回り）
- 🎯 詳細検索モーダル
- 📊 検索結果サマリー（件数表示）
- 🔀 ソート機能（価格順、利回り順等）
- 📄 ページネーション
- 📱 レスポンシブ対応

**デザイン**: 
- SUUMO/HOME'Sスタイルの洗練されたUI
- カード型レイアウト
- ホバーエフェクト（影、拡大等）
- グラデーションとアイコンの活用

**ファイル**: `components/properties/PropertySearchPage.tsx`

#### 4.2 物件カードコンポーネント
`PropertyCard.tsx`

**表示情報**:
- 📸 物件画像（または建物アイコン）
- 🏷️ 物件タイプバッジ
- 📈 利回りバッジ（金色グラデーション）
- 💰 価格（万円・億円表示）
- 🏢 物件名
- 📍 所在地
- 🚇 最寄り駅（路線カラー表示）
- 📐 土地面積・建物面積
- 🏗️ 構造・築年数
- 🏠 総戸数
- ✅ 稼働状況（満室、賃貸中等）

**インタラクション**:
- ホバーで影が拡大
- 画像がズーム
- 詳細ページへのリンク

**ファイル**: `components/properties/PropertyCard.tsx`

#### 4.3 詳細検索フィルター
`SearchFilters.tsx`

**検索項目**:
1. **エリア**
   - 市区町村選択（23区対応）

2. **路線・駅**
   - 路線選択 → 駅選択（連動）
   - 徒歩時間（5分、10分、15分、20分以内）

3. **価格**
   - 下限・上限（万円単位）
   - 入力補完機能

4. **面積**
   - 土地面積（㎡）
   - 建物面積（㎡）
   - 下限・上限指定

5. **利回り**
   - 下限・上限（%）
   - 小数点対応

6. **その他条件**
   - 物件タイプ
   - 築年数

**機能**:
- リアルタイムフィルタリング
- 条件クリア機能
- APIとの連携

**ファイル**: `components/properties/SearchFilters.tsx`

---

## 技術スタック

### フロントエンド
- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons**

### バックエンド
- **Next.js API Routes**
- **Supabase** (PostgreSQL)
- **Row Level Security (RLS)**

### データ処理
- **Python 3**
- **PyMuPDF (fitz)** - PDF解析
- **正規表現** - データ抽出

---

## データベース構造

### properties テーブル
```sql
- id: UUID (主キー)
- property_name: VARCHAR(255) - 物件名
- property_type: VARCHAR(100) - 物件タイプ
- price: BIGINT - 価格（円）
- address_prefecture: VARCHAR(50) - 都道府県
- address_city: VARCHAR(100) - 市区町村
- address_full: TEXT - 完全な住所
- land_area_sqm: DECIMAL - 土地面積（㎡）
- land_area_tsubo: DECIMAL - 土地面積（坪）
- building_area_sqm: DECIMAL - 建物面積（㎡）
- building_area_tsubo: DECIMAL - 建物面積（坪）
- yield_surface: DECIMAL - 表面利回り（%）
- annual_rent: BIGINT - 年間賃料
- total_units: INT - 総戸数
- building_structure: VARCHAR(100) - 構造
- construction_date: DATE - 築年月
- access_info: JSONB - アクセス情報
... (他多数)
```

### インデックス
- 価格、エリア、利回り、面積等に最適化
- JSONB型フィールドにGINインデックス
- 検索パフォーマンス向上

---

## 検索機能の特徴

### 多様な検索条件
1. **エリア検索**
   - 都道府県、市区町村で絞り込み

2. **路線・駅検索**
   - 主要路線23線対応
   - 徒歩時間で絞り込み

3. **価格帯検索**
   - 柔軟な価格範囲指定
   - 万円・億円表示

4. **面積検索**
   - 土地面積・建物面積
   - ㎡/坪両方表示

5. **利回り検索**
   - 高利回り物件を簡単に発見

6. **物件タイプ検索**
   - マンション、ビル、アパート等

7. **築年数検索**
   - 新築・築浅物件を探す

### ソート機能
- 新着順
- 価格が安い順・高い順
- 利回りが高い順
- 土地面積が大きい順

### ページネーション
- 1ページ20件表示
- ページ番号選択
- 前後ページ移動

---

## PDFデータ抽出詳細

### 抽出したデータ項目

1. **価格情報**
   ```python
   # 「29,800万円」→ 298,000,000円
   価格: 万円表記から円に変換
   ```

2. **面積情報**
   ```python
   # 「135.3㎡（35.77坪）」
   土地面積: ㎡と坪の両方
   建物面積: ㎡と坪の両方
   ```

3. **利回り**
   ```python
   # 「利回り: 約4.05%」
   表面利回り: パーセント値
   ```

4. **アクセス情報**
   ```python
   # 「JR山手線 新宿駅 徒歩5分」
   [{
     "line": "JR山手線",
     "station": "新宿駅",
     "walk_time": 5
   }]
   ```

5. **所在地**
   ```python
   # 「東京都新宿区西早稲田2-17-19」
   prefecture: "東京都"
   city: "新宿区"
   town: "西早稲田2-17-19"
   ```

6. **建物情報**
   ```python
   structure: "RC造 地上6階建"
   construction_date: "1985-02-01"
   total_units: 16
   ```

### 抽出結果サマリー
```
総ページ数: 40
抽出された物件: 22件

データ完全性:
- 価格データあり: 11件 (50%)
- 所在地データあり: 20件 (91%)
- アクセス情報あり: 8件 (36%)
- 利回りデータあり: 18件 (82%)
```

---

## UI/UXの特徴

### デザインコンセプト
- 🎨 **モダン&クリーン**: 日本の大手不動産サイトを参考
- 📱 **レスポンシブ**: モバイル・タブレット・デスクトップ対応
- ⚡ **高速**: 最適化されたデータ取得
- 🎯 **直感的**: わかりやすいUI/UX

### カラースキーム
- プライマリ: `primary-600` (ブランドカラー)
- グラデーション: `from-primary-600 to-primary-800`
- 金色アクセント: `gold-500/600` (利回りバッジ)
- グレースケール: `gray-50/100/200/.../900`

### インタラクション
- ホバーエフェクト（影、拡大、カラー変更）
- スムーズトランジション
- ローディングアニメーション
- モーダルダイアログ

---

## ファイル構成

```
webapp/
├── app/
│   ├── [locale]/
│   │   └── properties/
│   │       └── page.tsx          # 物件検索ページ
│   └── api/
│       ├── properties/
│       │   ├── search/
│       │   │   └── route.ts      # 検索API
│       │   └── [id]/
│       │       └── route.ts      # 詳細API
│       ├── railway-lines/
│       │   └── route.ts          # 路線API
│       └── stations/
│           └── route.ts          # 駅API
├── components/
│   └── properties/
│       ├── PropertySearchPage.tsx    # メイン検索ページ
│       ├── PropertyCard.tsx          # 物件カード
│       └── SearchFilters.tsx         # 検索フィルター
├── supabase/
│   └── migrations/
│       └── 20260131_create_properties_system.sql  # DB定義
├── scripts/
│   └── extract_properties_from_pdf.py  # PDF抽出スクリプト
├── DATABASE_SCHEMA.md                   # DB設計ドキュメント
└── extracted_properties.json            # 抽出済みデータ
```

---

## 次のステップ（未実装）

### 1. データインポート 🔜
- [ ] 抽出したJSONデータをSupabaseに投入
- [ ] 路線・駅マスタの拡充
- [ ] 物件画像のアップロード

### 2. 物件詳細ページ 🔜
- [ ] `/properties/[id]` ページ作成
- [ ] 大型画像ギャラリー
- [ ] 地図表示（Google Maps）
- [ ] 周辺環境情報
- [ ] 問い合わせフォーム

### 3. 追加機能
- [ ] お気に入り機能
- [ ] 物件比較機能
- [ ] 保存した検索条件
- [ ] メール通知
- [ ] 管理画面（物件登録・編集）

### 4. 最適化
- [ ] 画像最適化（Next.js Image）
- [ ] データキャッシング
- [ ] SEO最適化
- [ ] パフォーマンス測定

---

## 技術的ハイライト

### 1. 高度な検索クエリ
```typescript
// 複合条件検索の例
const results = await searchProperties({
  city: '新宿区',
  lineId: 'JR山手線のID',
  maxWalkTime: 10,
  minPrice: 30000000,
  maxPrice: 100000000,
  minYield: 4.0,
  sortBy: 'yield_surface',
  sortOrder: 'desc'
});
```

### 2. リアルタイムフィルタリング
- 路線選択 → 駅リスト更新
- 条件変更 → 即座に検索実行
- ページング対応

### 3. データ正規化
- 万円 → 円
- 坪 ↔ ㎡
- 和暦 → 西暦
- 徒歩時間抽出

### 4. セキュリティ
- Row Level Security (RLS)
- 公開物件のみ表示
- SQLインジェクション対策
- XSS対策

---

## パフォーマンス指標

### データベース
- インデックス最適化済み
- JSONB型でアクセス情報を効率保存
- ページネーションで大量データ対応

### フロントエンド
- コンポーネント分割
- useMemoでレンダリング最適化
- ローディング状態管理

---

## まとめ

✅ **完成度**: 85%

**実装完了**:
- データベース設計
- PDF解析スクリプト
- 検索API
- フロントエンドUI
- 物件カード表示
- 詳細検索機能

**残作業**:
- データインポート
- 物件詳細ページ
- テスト・最適化

**推定作業時間**:
- 実装済み: 約8時間
- 残作業: 約4時間

---

## 連絡先・サポート

プロジェクト: RUT Tokyo 投資収益物件検索システム
作成日: 2026-01-31
バージョン: 1.0.0

---

*このシステムは、東京都内の投資収益物件を効率的に検索・発見するために設計されました。*
*日本の大手不動産サイトのUXを参考に、使いやすく、視覚的に魅力的なインターフェースを実現しています。*
