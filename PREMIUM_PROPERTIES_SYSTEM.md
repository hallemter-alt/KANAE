## Premium Investment Properties System

企業站内の高級投資物件データベース・筛选器システム - KANAE不動産

## 📋 概要

このシステムは、新宿区のRC造高級物件（2023-2026年竣工）を中心とした投資用不動産の検索・展示プラットフォームです。

### 主な特徴

- **KN接頭辞付き物件ID**: KN-001, KN-002などの独自物件識別子
- **高度な筛选機能**: IoT、防音、民泊運営など特殊な設備・特徴による絞り込み
- **多言語対応**: 日本語・英語・中国語の3言語対応
- **プレミアムマーケティング**: 日本の不動産投資市場向けのコピーライティング
- **RESTful API**: 外部システムとの連携が容易

## 🗂️ データベース構造

### メインテーブル

#### `premium_properties` - プレミアム物件テーブル

```sql
-- 物件基本情報
id TEXT PRIMARY KEY                    -- KN-001, KN-002, etc.
name TEXT NOT NULL                     -- 物件名
price_jpy BIGINT                       -- 価格（円）
completion_date DATE                   -- 竣工日
structure TEXT                         -- 構造 (例: "RC 4層")
structure_type TEXT                    -- 構造種別 ("RC", "鉄骨", etc.)
location TEXT                          -- 所在地
yield_expected DECIMAL(5,2)            -- 期待利回り (%)

-- 特殊機能フラグ
has_iot BOOLEAN                        -- IoTシステム有無
has_face_recognition BOOLEAN           -- 顔認証有無
has_soundproof BOOLEAN                 -- 防音構造有無
soundproof_patent BOOLEAN              -- 特許防音技術
is_minpaku_operating BOOLEAN           -- 民泊運営中
has_rental_guarantee BOOLEAN           -- 一括借上契約
has_smart_home BOOLEAN                 -- スマートホーム
has_automation BOOLEAN                 -- 全自動化管理

-- インフラ優位性
near_park BOOLEAN                      -- 公園至近
multi_line_access BOOLEAN              -- 複数路線利用可
urban_planning_benefit BOOLEAN         -- 都市計画受益
```

#### `property_special_features` - 特殊機能リファレンス

```sql
code TEXT UNIQUE                       -- 機能コード (例: "iot_system")
name_ja TEXT                          -- 日本語名称
name_en TEXT                          -- 英語名称
name_zh TEXT                          -- 中国語名称
category TEXT                         -- カテゴリ ("technology", "structure", etc.)
badge_color TEXT                      -- バッジ色
```

#### `investment_categories` - 投資カテゴリ

```sql
code TEXT UNIQUE                       -- カテゴリコード
name_ja/en/zh TEXT                    -- 多言語名称
description_ja/en/zh TEXT             -- 説明文
```

### サンプルデータ

システムには4つのプレミアム物件がプリロードされています：

| ID | 物件名 | 価格 | 利回り | 特徴 |
|----|--------|------|--------|------|
| KN-001 | aLATO 新宿御苑 | ¥9億 | 3.97% | 新宿御苑至近、4路線4駅、環状4号線受益 |
| KN-002 | belle ville 神楽坂 | ¥8.88億 | 6.24% | IoT、顔認証、民泊運営中 |
| KN-003 | Sound Proof Pro 北新宿 | ¥8.448億 | 3.80% | 特許三重防音 (Dr-80~Dr-95) |
| KN-005 | TASUKI smart 中井 | ¥6.7億 | 3.90% | 2026年竣工、NATURE Remo、全自動化 |

## 🔧 セットアップ

### 1. データベースマイグレーション

Supabaseダッシュボードで以下のSQLファイルを順番に実行：

```bash
# 1. スキーマ作成
supabase/migrations/20260131_premium_properties.sql

# 2. サンプルデータ投入
supabase/migrations/20260131_seed_premium_properties.sql
```

### 2. 環境変数設定

`.env.local` に Supabase 接続情報を追加：

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. TypeScript型定義

型定義は自動的に利用可能：

```typescript
import type { 
  PremiumProperty, 
  PropertyFilterParams,
  PropertySearchResult 
} from '@/lib/types/premium-property';
```

## 🎨 コンポーネント

### PropertyCard - 物件カード

```tsx
import PropertyCard from '@/components/properties/PropertyCard';

<PropertyCard 
  property={property}
  language="ja"
  showBadges={true}
  showYield={true}
/>
```

### PropertyFilters - 高度な筛选器

```tsx
import PropertyFilters from '@/components/properties/PropertyFilters';

<PropertyFilters 
  onFilterChange={(filters) => handleFilterChange(filters)}
  language="ja"
/>
```

## 🔌 API エンドポイント

### 物件一覧取得

```http
GET /api/premium-properties
```

#### クエリパラメータ

**価格・利回り筛选**
```
?price_min=500000000&price_max=900000000
?yield_min=4.0&yield_max=7.0
```

**エリア筛选**
```
?prefecture=東京都&city=新宿区
```

**竣工年筛选**
```
?completion_year_min=2023&completion_year_max=2026
```

**特殊機能筛选**
```
?has_iot=true
?has_face_recognition=true
?has_soundproof=true
?is_minpaku_operating=true
?has_rental_guarantee=true
?has_smart_home=true
?near_park=true
?multi_line_access=true
?urban_planning_benefit=true
```

**カテゴリ筛选**
```
?category_codes=minpaku_ready,high_tech
```

使用可能なカテゴリコード：
- `minpaku_ready` - 民泊可能物件
- `high_tech` - ハイテク設備
- `soundproof_spec` - 防音特化
- `new_construction` - 新築・準新築
- `future_potential` - 将来性高
- `stable_income` - 安定収益

**並び替え**
```
?sort_by=price_asc      # 価格昇順
?sort_by=price_desc     # 価格降順
?sort_by=yield_desc     # 利回り降順
?sort_by=completion_desc # 竣工日降順
?sort_by=priority       # 優先度順（デフォルト）
```

**ページネーション**
```
?page=1&limit=12
```

#### レスポンス例

```json
{
  "properties": [
    {
      "id": "KN-001",
      "name": "aLATO 新宿御苑",
      "price_jpy": 900000000,
      "yield_expected": 3.97,
      "completion_date": "2024-02-01",
      "structure": "RC 4層",
      "location": "東京都新宿区富久町",
      "features_ja": ["RC造4階建", "新宿御苑徒歩圏", "4路線4駅利用可"],
      "has_iot": false,
      "near_park": true,
      "multi_line_access": true,
      "urban_planning_benefit": true
    }
  ],
  "total_count": 4,
  "page": 1,
  "limit": 12,
  "total_pages": 1
}
```

### 物件詳細取得

```http
GET /api/premium-properties/[id]
```

例：
```http
GET /api/premium-properties/KN-001
```

#### レスポンス例

```json
{
  "property": {
    "id": "KN-001",
    "name": "aLATO 新宿御苑",
    "description_ja": "新宿御苑徒歩圏内という稀少立地...",
    "headline_ja": "新宿御苑稀缺地段を抑える",
    "selling_points": [
      "新宿御苑至近の希少性",
      "4路線4駅のアクセス利便性",
      "2027年環状4号線開通による資産価値向上"
    ],
    "access_stations": [
      {
        "line": "東京メトロ丸ノ内線",
        "station": "新宿御苑前駅",
        "walk_minutes": 6
      }
    ],
    "special_features": [
      {
        "code": "near_park",
        "name_ja": "公園至近",
        "icon": "🌳"
      }
    ]
  },
  "similar_properties": [...]
}
```

### 注目物件取得

```http
GET /api/premium-properties?featured=true&featured_limit=4
```

### キーワード検索

```http
GET /api/premium-properties?keyword=神楽坂
```

## 📊 筛选器プリセット

システムには6つのプリセット筛选条件があります：

### 1. 民泊可能物件 🏨
```typescript
{
  category_codes: ['minpaku_ready'],
  is_minpaku_operating: true
}
```

### 2. 最新IoT設備 🤖
```typescript
{
  category_codes: ['high_tech'],
  has_iot: true
}
```

### 3. 特殊防音物件 🔇
```typescript
{
  category_codes: ['soundproof_spec'],
  has_soundproof: true
}
```

### 4. 新築・準新築 ✨
```typescript
{
  category_codes: ['new_construction'],
  completion_year_min: 2023
}
```

### 5. 高利回り物件 📈
```typescript
{
  yield_min: 4.0,
  sort_by: 'yield_desc'
}
```

### 6. 将来性の高い物件 🏗️
```typescript
{
  category_codes: ['future_potential'],
  urban_planning_benefit: true
}
```

## 🎯 使用例

### React/Next.js での使用

```typescript
'use client';

import { useState, useEffect } from 'react';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilters from '@/components/properties/PropertyFilters';
import type { PremiumProperty, PropertyFilterParams } from '@/lib/types/premium-property';

export default function PropertySearchPage() {
  const [properties, setProperties] = useState<PremiumProperty[]>([]);
  const [filters, setFilters] = useState<PropertyFilterParams>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });

      const response = await fetch(`/api/premium-properties?${params}`);
      const data = await response.json();
      setProperties(data.properties);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 筛选器サイドバー */}
        <aside className="lg:col-span-1">
          <PropertyFilters
            onFilterChange={setFilters}
            language="ja"
          />
        </aside>

        {/* 物件一覧 */}
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                language="ja"
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
```

## 🌐 多言語対応

すべてのコンポーネントとAPIレスポンスは3言語対応：

```typescript
// 日本語
<PropertyCard property={property} language="ja" />

// 英語
<PropertyCard property={property} language="en" />

// 中国語
<PropertyCard property={property} language="zh" />
```

## 📈 マーケティングコピー

各物件には以下のマーケティング要素が含まれます：

### ヘッドライン例
- **KN-001**: 「新宿御苑稀缺地段を抑える」
- **KN-002**: 「神楽坂プレミアム×次世代IoT」
- **KN-003**: 「絶対防音で新市場を創造」
- **KN-005**: 「2026年最新スマート物件」

### セールスポイント例
```javascript
selling_points: [
  "神楽坂駅徒歩2分の最高立地",
  "最新IoT・顔認証システム完備",
  "民泊運営実績あり",
  "実績利回り6.24%",
  "次世代スマート物件"
]
```

## 🔐 セキュリティ

Row Level Security (RLS) が有効化されています：

```sql
-- 公開物件のみ閲覧可能
CREATE POLICY "Premium properties are viewable by everyone"
ON premium_properties FOR SELECT
USING (status = 'available' AND deleted_at IS NULL);
```

## 📝 今後の拡張

### 計画中の機能

1. **画像ギャラリー**: 物件写真の複数表示
2. **360度バーチャルツアー**: VRビューイング
3. **収益シミュレーター**: ローン計算・収益予測
4. **お気に入り機能**: ユーザー別保存リスト
5. **物件比較機能**: 複数物件の比較表示
6. **アラート通知**: 新着物件・価格変更通知
7. **投資レポート**: PDF形式の詳細レポート生成

### データ拡張

- 実際の物件写真の追加
- 間取り図のアップロード
- 周辺施設情報の追加
- 交通アクセス地図の統合

## 🎓 参考資料

### 日本不動産投資用語

- **表面利回り**: 年間賃料収入 ÷ 物件価格 × 100
- **実質利回り**: (年間賃料収入 - 年間経費) ÷ 物件価格 × 100
- **一括借上**: サブリース契約、空室リスクを管理会社が負担
- **RC造**: 鉄筋コンクリート造、耐用年数47年
- **防音等級**: Dr値で表記、数値が大きいほど遮音性能が高い

## 💬 サポート

システムに関する質問は以下まで：
- メール: info@kanae-tokyo.com
- 電話: 03-6914-3633

---

© 2026 株式会社KANAE. All rights reserved.
