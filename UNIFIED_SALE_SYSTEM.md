# 統合買卖物件システム（Unified Sale Property System）

## 概要
投資用物件と住宅用物件を統合した買卖ページシステム。投資物件は独立ページではなく、買卖ページ内の1つの分類オプションとして実装。

## 主要な変更点

### 1. ページ構造の統合
- ❌ **削除**: `/[locale]/premium-properties/` ページ
- ✅ **統合**: すべての買卖物件を `/[locale]/sale/` に集約
- ✅ **カテゴリ分類**:
  - すべて (`category=all`)
  - 住宅用 (`category=residential`) - マンション、一戸建て、土地
  - 投資用 (`category=investment`) - 収益物件、プレミアム物件

### 2. API統合
- ✅ **統一エンドポイント**: `/api/properties/unified-search`
- ✅ **動的クエリ**:
  ```typescript
  // 投資用物件
  ?type=investment&yield_min=3.5&has_iot=true
  
  // 住宅用物件
  ?type=residential&price_min=30000000&price_max=100000000
  
  // すべて
  ?price_min=50000000
  ```

### 3. フィルター機能の改善
**PropertyFilters コンポーネント** (`components/properties/PropertyFilters.tsx`)
- ✅ `propertyCategory` prop を追加
- ✅ カテゴリに応じて動的にフィルター表示:
  - **共通フィルター**: 価格帯、エリア、竣工年
  - **投資用専用**: 利回り、IoTシステム、防音構造、民泊運営など
  - **住宅用専用**: 間取り、駐車場、設備など（今後追加可能）

### 4. ナビゲーションフロー

#### ホームページ → 買卖ページ
```
Hero Component (components/Hero.tsx)
  └─ 「検索」ボタン → /sale
```

#### 物件検索ページ → 買卖ページ（詳細検索）
```
PropertySearchPage (components/properties/PropertySearchPage.tsx)
  └─ 「詳細検索」ボタン → /sale?category=investment
```

#### 買卖ページ内のカテゴリ切り替え
```
/sale?category=all         → すべての物件
/sale?category=residential → 住宅用物件
/sale?category=investment  → 投資用物件
```

## ファイル構成

### 削除されたファイル
```
❌ app/[locale]/premium-properties/page.tsx
❌ app/api/premium-properties/route.ts
❌ app/api/premium-properties/[id]/route.ts
```

### 主要ファイル
```
✅ app/[locale]/sale/page.tsx             - 統合買卖ページ
✅ app/api/properties/unified-search/route.ts - 統一検索API
✅ components/properties/PropertyFilters.tsx  - 動的フィルター
✅ components/properties/PropertyCard.tsx     - 物件カード
✅ components/Hero.tsx                        - ホームページヒーロー
✅ components/properties/PropertySearchPage.tsx - 物件検索ページ
```

## データベース構造

### テーブル
1. **premium_properties** - 投資用物件（KN接頭辞）
   - 高級投資物件
   - 特殊機能フラグ（IoT、防音、民泊など）
   - 期待利回り
   - 竣工日

2. **properties** - 一般物件
   - 住宅用物件
   - 基本情報
   - 価格、面積

## 検索機能の実装

### API パラメータ

#### 共通パラメータ
| パラメータ | 説明 | 例 |
|-----------|------|-----|
| `type` | 物件タイプ | `investment`, `residential`, `all` |
| `price_min` | 最低価格 | `50000000` (5千万円) |
| `price_max` | 最高価格 | `500000000` (5億円) |
| `city` | 市区町村 | `新宿区` |
| `sort_by` | ソート順 | `price_asc`, `price_desc`, `yield_desc` |
| `page` | ページ番号 | `1`, `2`, `3` |
| `limit` | 件数 | `12`, `24` |

#### 投資用専用パラメータ
| パラメータ | 説明 | 例 |
|-----------|------|-----|
| `yield_min` | 最低利回り | `3.5` (3.5%) |
| `yield_max` | 最高利回り | `8.0` (8.0%) |
| `has_iot` | IoTシステム | `true` |
| `has_soundproof` | 防音構造 | `true` |
| `is_minpaku_operating` | 民泊運営中 | `true` |
| `has_rental_guarantee` | 一括借上 | `true` |
| `near_park` | 公園至近 | `true` |
| `multi_line_access` | 複数路線 | `true` |

### 使用例

#### 1. すべての物件を表示
```bash
GET /api/properties/unified-search?page=1&limit=12
```

#### 2. 投資用物件で利回り4%以上を検索
```bash
GET /api/properties/unified-search?type=investment&yield_min=4.0&sort_by=yield_desc
```

#### 3. 新宿区の住宅用物件を価格順で表示
```bash
GET /api/properties/unified-search?type=residential&city=新宿区&sort_by=price_asc
```

#### 4. IoTシステム搭載の民泊運営中物件
```bash
GET /api/properties/unified-search?type=investment&has_iot=true&is_minpaku_operating=true
```

## UI/UX 設計

### 買卖ページレイアウト
```
┌─────────────────────────────────────────┐
│          Hero Section                   │
│  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │すべて│  │住宅用│  │投資用│         │
│  └──────┘  └──────┘  └──────┘         │
└─────────────────────────────────────────┘
│                                         │
│  ┌─────────┐  ┌───────────────────┐   │
│  │         │  │  物件カード       │   │
│  │ フィル  │  │  ┌───┐ ┌───┐ ┌───┐  │
│  │ ター   │  │  │   │ │   │ │   │  │
│  │         │  │  └───┘ └───┘ └───┘  │
│  │ - 価格  │  │  ┌───┐ ┌───┐ ┌───┐  │
│  │ - エリア│  │  │   │ │   │ │   │  │
│  │ - 利回り│  │  └───┘ └───┘ └───┘  │
│  │ - 特徴  │  │                     │
│  │         │  │  [ページネーション]  │
│  └─────────┘  └───────────────────┘   │
└─────────────────────────────────────────┘
```

### レスポンシブ対応
- **デスクトップ**: サイドバー + グリッド3列
- **タブレット**: サイドバー + グリッド2列
- **モバイル**: フィルター折りたたみ + グリッド1列

### カラーとスタイル
- **デザインシステム**: KANAE既存スタイルを維持
- **主色**: `from-primary-600 to-primary-700` (青系グラデーション)
- **アクセント**: `from-gold-300 to-gold-500` (金色グラデーション)
- **背景**: `bg-gray-50`, `bg-white`
- **シャドウ**: `shadow-lg`, `shadow-xl`, `shadow-2xl`

## 多言語対応

### サポート言語
- 🇯🇵 日本語 (ja) - デフォルト
- 🇨🇳 中国語 (zh)
- 🇬🇧 英語 (en)

### URL構造
```
/ja/sale?category=investment    - 日本語
/zh/sale?category=investment    - 中国語
/en/sale?category=investment    - 英語
```

## テスト項目

### 機能テスト
- [ ] カテゴリ切り替え（すべて/住宅用/投資用）
- [ ] 価格フィルター適用
- [ ] 利回りフィルター適用（投資用のみ）
- [ ] エリアフィルター適用
- [ ] 特殊機能フィルター適用（投資用のみ）
- [ ] ソート機能（価格順、利回り順など）
- [ ] ページネーション
- [ ] 検索結果0件時の表示
- [ ] ローディング状態の表示

### レスポンシブテスト
- [ ] デスクトップ (1920x1080)
- [ ] タブレット (768x1024)
- [ ] モバイル (375x667)

### ブラウザ互換性
- [ ] Chrome (最新)
- [ ] Firefox (最新)
- [ ] Safari (最新)
- [ ] Edge (最新)

## デプロイ手順

### 1. 環境変数の設定
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. データベース準備
```bash
# Supabase SQLエディタで実行
/supabase/migrations/20260131_premium_properties.sql
/supabase/migrations/20260131_seed_premium_properties.sql
```

### 3. ZMN物件データのインポート
```bash
npm run import:zmn
```

### 4. ビルドとデプロイ
```bash
npm run build
npm start

# または
npm run dev  # 開発環境
```

## パフォーマンス最適化

### データベースインデックス
- `premium_properties.status` - WHERE句で頻繁に使用
- `premium_properties.price_jpy` - ソートとフィルターで使用
- `premium_properties.yield_expected` - ソートとフィルターで使用
- `premium_properties.city` - エリア検索で使用

### APIキャッシング
- 検索結果のクライアントサイドキャッシング
- CDNによる静的アセットのキャッシング

### 画像最適化
- Next.js Image コンポーネントの使用
- WebP フォーマットの活用
- Lazy loading の実装

## 今後の拡張

### フェーズ2
- [ ] 物件詳細ページの実装
- [ ] お気に入り機能
- [ ] 比較機能
- [ ] 地図表示
- [ ] バーチャルツアー

### フェーズ3
- [ ] ユーザー認証
- [ ] 保存検索条件
- [ ] 新着通知
- [ ] AIレコメンデーション
- [ ] チャットサポート

## サポート

### 問い合わせ
- **会社**: 株式会社KANAE
- **住所**: 〒169-0075 東京都豊島区高田3-16-4 Golje Bld.6F
- **電話**: 03-6914-3633
- **メール**: info@kanae-tokyo.com

### ドキュメント
- [README.md](./README.md) - プロジェクト概要
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - データベース設計
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - 実装ガイド
- [ZMN_IMPORT_GUIDE.md](./ZMN_IMPORT_GUIDE.md) - データインポート

---

**最終更新**: 2026-02-01  
**バージョン**: 1.0.0  
**ステータス**: 🟢 Production Ready
