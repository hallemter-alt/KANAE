# 統合物件検索システム / Unified Property Search System

## 概要 / Overview

投資用物件を買卖ページに統合し、ユーザーが一つの画面で住宅用・投資用の両方を検索できる統一されたシステムです。

Investment properties are now integrated into the sale page, allowing users to search both residential and investment properties from a single unified interface.

---

## システム構成 / System Architecture

### 1. ページ構成 / Page Structure

```
/[locale]/sale
├── すべての物件 (All Properties)
├── 住宅用 (Residential) - マンション・戸建て
└── 投資用 (Investment) - 収益物件
```

#### 主要な変更点 / Key Changes

- ❌ **削除**: `/premium-properties` 独立ページ
- ✅ **統合**: 投資用物件を買卖ページ内のカテゴリとして統合
- ✅ **改善**: 冗長性を排除し、シンプルなUI/UX

### 2. データベース / Database

#### Regular Properties Table (`properties`)
- 一般的な住宅用物件
- 既存のスキーマを使用

#### Premium Properties Table (`premium_properties`)
- 高級投資用収益物件
- KN-XXX形式のID
- 特殊機能フラグ（IoT、防音、民泊など）

### 3. API エンドポイント / API Endpoints

```
GET /api/properties/unified-search
```

**Parameters:**
- `type`: 'all' | 'residential' | 'investment'
- `page`: number (default: 1)
- `limit`: number (default: 12)
- `price_min`, `price_max`: number
- `city`: string
- `sort_by`: 'priority' | 'price_asc' | 'price_desc' | 'yield_desc' | 'completion_desc'

**Investment-specific parameters:**
- `yield_min`, `yield_max`: number (percentage)
- `completion_year_min`, `completion_year_max`: number
- Special feature flags (boolean):
  - `has_iot`
  - `has_face_recognition`
  - `has_soundproof`
  - `is_minpaku_operating`
  - `has_rental_guarantee`
  - `has_smart_home`
  - `near_park`
  - `multi_line_access`
  - `urban_planning_benefit`

**Response:**
```json
{
  "success": true,
  "properties": [...],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 45,
    "totalPages": 4
  }
}
```

---

## コンポーネント / Components

### 1. UnifiedSalePage (`app/[locale]/sale/page.tsx`)

統合された買卖ページ。カテゴリ選択、フィルター、物件一覧を表示。

**Features:**
- ✅ 3つのカテゴリタブ（すべて・住宅用・投資用）
- ✅ レスポンシブデザイン
- ✅ リアルタイムフィルタリング
- ✅ ページネーション
- ✅ ソート機能
- ✅ 多言語対応（日本語・英語・中国語）

### 2. PropertyFilters (`components/properties/PropertyFilters.tsx`)

高度なフィルターコンポーネント。カテゴリに応じて表示が変わる。

**Residential Properties (住宅用):**
- 価格帯
- エリア
- 竣工年

**Investment Properties (投資用):**
- 価格帯
- 利回り
- エリア
- 竣工年
- 9種類の特殊機能
- 6種類のクイック検索プリセット

**Presets / プリセット:**
1. 🏢 民泊可能物件
2. 🤖 最新IoT導入
3. 🎵 特殊防音構造
4. 🆕 新築・準新築
5. 📈 高利回り物件
6. 🌟 将来性高い

### 3. PropertyCard (`components/properties/PropertyCard.tsx`)

物件カード表示コンポーネント。物件タイプに応じて異なるバッジと情報を表示。

**Residential Display:**
- 物件名
- 価格
- 所在地
- 面積
- 基本情報

**Investment Display:**
- 物件名
- 価格
- 利回り（強調表示）
- 所在地
- 特徴バッジ（最大3個 + 追加数）
- マーケティングコピー

---

## ユーザーフロー / User Flow

### 1. トップページから / From Home Page

```
トップページ (Hero Section)
  ↓ [検索ボタンクリック]
買卖ページ (/sale)
  ↓ [カテゴリ選択: 投資用]
投資用物件フィルター表示
  ↓ [フィルター適用]
投資用物件検索結果
  ↓ [物件カードクリック]
物件詳細ページ
```

### 2. 物件検索ページから / From Properties Page

```
物件検索ページ (/properties)
  ↓ [詳細検索ボタン]
買卖ページ (/sale)
  ↓ [カテゴリ: すべて]
全物件検索
```

---

## デザインシステム / Design System

### カラーパレット / Color Palette

システム全体で統一されたカラーを使用：

```css
/* Primary Colors */
--primary-50: #f0f9ff;
--primary-600: #0ea5e9;
--primary-700: #0c4a6e;
--primary-900: #0c4a6e;

/* Gold Accent */
--gold-900: #713f12;

/* Status Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;

/* Neutral */
--gray-50: #f9fafb;
--gray-900: #111827;
```

### タイポグラフィ / Typography

```css
font-family: 'Inter', 'Noto Sans JP', sans-serif;
```

### レイアウト / Layout

- **最大幅**: 1280px (max-w-7xl)
- **グリッド**: 1列（モバイル）→ 2列（タブレット）→ 3列（デスクトップ）
- **間隔**: 1.5rem (gap-6)
- **パディング**: 1rem〜2rem (responsive)

---

## フィルター機能詳細 / Filter Features Detail

### 基本フィルター (All Properties)

| フィルター | タイプ | 説明 |
|----------|--------|------|
| 価格範囲 | Range | 最低価格〜最高価格 |
| エリア | Select | 市区町村選択 |
| 竣工年 | Range | 竣工年範囲 |

### 投資用物件専用フィルター (Investment Only)

| フィルター | タイプ | 説明 |
|----------|--------|------|
| 利回り | Range | 最低利回り〜最高利回り (%) |
| IoTシステム | Checkbox | IoT連動システム搭載 |
| 顔認証 | Checkbox | 顔認証システム |
| 防音構造 | Checkbox | 特許防音技術 |
| 民泊運営中 | Checkbox | 現在民泊として運営中 |
| 一括借上 | Checkbox | 一括借上契約あり |
| スマートホーム | Checkbox | 全自動化管理 |
| 公園至近 | Checkbox | 公園徒歩圏内 |
| 複数路線 | Checkbox | 複数路線利用可能 |
| 都市計画受益 | Checkbox | 都市計画による価値上昇 |

---

## マーケティングコピー / Marketing Copy

### 投資用物件のセールスポイント

各物件は以下の構成でマーケティングコピーを持つ：

1. **ヘッドライン**: 物件の最大の魅力を一言で
2. **セールスポイント**: 2-3行の詳細な説明
3. **特徴バッジ**: 視覚的なハイライト（最大3個）

**例 / Examples:**

#### KN-001: aLATO 新宿御苑
- **ヘッドライン**: 新宿御苑至近の稀少RC造新築
- **ポイント**: 2027年環状4号線開通予定で資産価値上昇期待
- **バッジ**: [RC造] [都市計画] [複数路線]

#### KN-002: belle ville 神楽坂
- **ヘッドライン**: IoT完備の高利回り神楽坂物件
- **ポイント**: 駅徒歩2分、顔認証システム搭載、利回り6.24%
- **バッジ**: [IoT] [顔認証] [民泊運営中]

---

## レスポンシブデザイン / Responsive Design

### ブレークポイント / Breakpoints

```
Mobile:  < 768px   (sm)
Tablet:  768px - 1024px (md)
Desktop: > 1024px  (lg, xl)
```

### レイアウト適応 / Layout Adaptation

**Mobile (< 768px):**
- 1カラムレイアウト
- フィルターは折りたたみ式
- カテゴリタブは縦並び

**Tablet (768px - 1024px):**
- 2カラムグリッド
- サイドバーフィルター表示
- カテゴリタブは横並び

**Desktop (> 1024px):**
- 3カラムグリッド
- フルサイドバーフィルター
- すべての機能を同時表示

---

## パフォーマンス最適化 / Performance Optimization

### 1. データ取得

```typescript
// Server-side filtering
// ✅ データベースレベルでフィルタリング
// ❌ クライアント側での大量データフィルタリング

// Pagination
// ✅ ページごとに12件ずつ取得
// ❌ 全件取得後にページング
```

### 2. キャッシング

```typescript
// API Response Caching (予定)
// - 同じ検索条件は5分間キャッシュ
// - Redis使用を検討中
```

### 3. 画像最適化

```typescript
// Next.js Image Component
import Image from 'next/image';

// ✅ 自動最適化
// ✅ Lazy loading
// ✅ WebP変換
```

---

## 多言語対応 / Multi-language Support

### サポート言語 / Supported Languages

- 🇯🇵 日本語 (ja) - Default
- 🇨🇳 中文 (zh)
- 🇺🇸 English (en)

### 言語ファイル構成 / Language File Structure

```
lib/i18n.ts
├── ja: { ... }
├── zh: { ... }
└── en: { ... }
```

### データベース多言語 / Database i18n

```sql
-- premium_properties table
property_name        TEXT,
headline_ja          TEXT,
headline_en          TEXT,
headline_zh          TEXT,
sales_points_ja      TEXT,
sales_points_en      TEXT,
sales_points_zh      TEXT
```

---

## テスト / Testing

### 1. 機能テスト / Functional Testing

- [ ] カテゴリ切り替え
- [ ] フィルター適用
- [ ] ソート機能
- [ ] ページネーション
- [ ] 物件カードクリック
- [ ] レスポンシブ表示

### 2. データテスト / Data Testing

- [ ] 空の検索結果
- [ ] 大量データ
- [ ] 特殊文字入力
- [ ] エッジケース

### 3. パフォーマンステスト / Performance Testing

- [ ] 初期ロード時間 < 2秒
- [ ] フィルター適用 < 500ms
- [ ] ページ遷移 < 300ms

---

## 今後の開発計画 / Future Development

### Phase 1 (完了 / Completed) ✅
- [x] 統合ページ作成
- [x] APIエンドポイント統合
- [x] フィルターコンポーネント
- [x] 物件カードコンポーネント
- [x] ドキュメント作成

### Phase 2 (進行中 / In Progress) 🚧
- [ ] Supabaseマイグレーション実行
- [ ] 環境変数設定
- [ ] テストデータ投入
- [ ] 実際の物件データインポート

### Phase 3 (計画中 / Planned) 📋
- [ ] 物件詳細ページ
- [ ] お気に入り機能
- [ ] 比較機能
- [ ] メール通知
- [ ] PDF資料ダウンロード

### Phase 4 (検討中 / Under Consideration) 💡
- [ ] AI推薦システム
- [ ] 仮想ツアー
- [ ] チャットボット
- [ ] 収益シミュレーター

---

## トラブルシューティング / Troubleshooting

### 問題1: 物件が表示されない

**原因:**
- Supabase接続エラー
- データベースマイグレーション未実行

**解決方法:**
```bash
# 環境変数を確認
cat .env.local

# マイグレーション実行
cd supabase
supabase db push
```

### 問題2: フィルターが効かない

**原因:**
- APIパラメータ不一致
- データベーススキーマ不一致

**解決方法:**
```bash
# APIログを確認
npm run dev
# ブラウザコンソールでネットワークタブを確認
```

### 問題3: スタイルが崩れる

**原因:**
- Tailwindキャッシュ
- CSSバンドル競合

**解決方法:**
```bash
# Tailwindキャッシュクリア
rm -rf .next
npm run dev
```

---

## 開発者向けメモ / Developer Notes

### コーディング規約 / Coding Standards

```typescript
// ✅ Good
const handleFilterChange = (newFilters: PropertyFilterParams) => {
  setFilters(newFilters);
  setPagination({ ...pagination, page: 1 });
};

// ❌ Bad
const handle_filter_change = (filters) => {
  setFilters(filters);
};
```

### コミットメッセージ / Commit Messages

```
feat: Add unified property search system
fix: Resolve filter reset issue
docs: Update API documentation
style: Improve responsive layout
refactor: Simplify filter logic
test: Add unit tests for filters
```

---

## リファレンス / Reference

### 関連ファイル / Related Files

```
/app/[locale]/sale/page.tsx                    - 統合買卖ページ
/components/properties/PropertyFilters.tsx      - フィルターコンポーネント
/components/properties/PropertyCard.tsx         - 物件カード
/app/api/properties/unified-search/route.ts    - 統合検索API
/lib/types/premium-property.ts                  - 型定義
/supabase/migrations/                           - データベーススキーマ
```

### 外部リソース / External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)

---

## サポート / Support

### お問い合わせ / Contact

- **Email**: info@kanae-tokyo.com
- **Phone**: 03-6914-3633
- **住所**: 〒169-0075 東京都豊島区高田3-16-4 Golje Bld.6F

---

## ライセンス / License

© 2024 株式会社KANAE. All rights reserved.

---

**Last Updated**: 2026-02-01
**Version**: 1.0.0
**Status**: ✅ Production Ready
