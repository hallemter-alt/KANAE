# 投資収益物件データベース設計

## データベース構造

### 1. properties (物件テーブル)

```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- 基本情報
  property_name VARCHAR(255),
  property_type VARCHAR(100), -- '一棟マンション', '一棟ビル', 'アパート'等
  status VARCHAR(50) DEFAULT '販売中', -- '販売中', '商談中', '成約済み'
  
  -- 所在地情報
  address_prefecture VARCHAR(50), -- 都道府県
  address_city VARCHAR(100), -- 市区町村
  address_town VARCHAR(255), -- 町名
  address_full TEXT, -- 完全な住所
  latitude DECIMAL(10, 8), -- 緯度
  longitude DECIMAL(11, 8), -- 経度
  
  -- アクセス情報 (JSON配列)
  access_info JSONB, -- [{"line": "JR山手線", "station": "新宿駅", "walk_time": 5}]
  
  -- 価格情報
  price BIGINT, -- 販売価格（円）
  price_per_tsubo INT, -- 坪単価
  
  -- 土地情報
  land_area_sqm DECIMAL(10, 2), -- 土地面積（㎡）
  land_area_tsubo DECIMAL(10, 2), -- 土地面積（坪）
  land_rights VARCHAR(50), -- '所有権', '借地権'
  land_category VARCHAR(50), -- '宅地'
  setback_area DECIMAL(10, 2), -- セットバック面積
  private_road_area DECIMAL(10, 2), -- 私道負担面積
  
  -- 建物情報
  building_area_sqm DECIMAL(10, 2), -- 延床面積（㎡）
  building_area_tsubo DECIMAL(10, 2), -- 延床面積（坪）
  building_structure VARCHAR(100), -- 'RC造', '鉄骨造'等
  building_floors VARCHAR(50), -- '地上5階建', '地下1階付き3階建'等
  building_age_years INT, -- 築年数
  construction_date DATE, -- 築年月
  total_units INT, -- 総戸数
  
  -- 法規制情報
  urban_planning VARCHAR(100), -- '市街化区域'
  use_district VARCHAR(100), -- '第一種住居地域', '商業地域'等
  building_coverage_ratio INT, -- 建ぺい率（%）
  floor_area_ratio INT, -- 容積率（%）
  fire_prevention VARCHAR(50), -- '準防火地域', '防火地域'
  height_district VARCHAR(100), -- '第二種高度地区'
  
  -- 接道情報
  road_info TEXT, -- 接道状況の詳細
  
  -- 収益情報
  monthly_rent BIGINT, -- 月額賃料（円）
  annual_rent BIGINT, -- 年間賃料（円）
  annual_income BIGINT, -- 年間想定収入
  annual_expense BIGINT, -- 年間支出
  noi BIGINT, -- 純収益 (Net Operating Income)
  yield_surface DECIMAL(5, 2), -- 表面利回り（%）
  yield_actual DECIMAL(5, 2), -- 実質利回り（%）
  occupancy_status VARCHAR(50), -- '満室', '賃貸中', '一部空室'
  
  -- 設備情報
  facilities JSONB, -- ["エレベーター", "オートロック", "宅配BOX"]
  parking_spaces INT, -- 駐車場台数
  
  -- 物件の特徴
  features TEXT[], -- 物件の特徴・セールスポイント
  remarks TEXT, -- 備考
  
  -- 書類情報
  building_confirmation BOOLEAN DEFAULT false, -- 建築確認済証
  inspection_certificate BOOLEAN DEFAULT false, -- 検査済証
  
  -- 管理情報
  management_company VARCHAR(255), -- 管理会社
  listing_company VARCHAR(255), -- 媒介・代理会社
  listing_agent VARCHAR(100), -- 担当者
  listing_agent_contact VARCHAR(255), -- 連絡先
  transaction_type VARCHAR(50), -- '媒介', '代理', '売主'
  commission_rate DECIMAL(4, 2), -- 手数料率（%）
  
  -- 画像・ファイル
  images TEXT[], -- 画像URL配列
  floor_plans TEXT[], -- 間取り図URL配列
  documents TEXT[], -- 資料URL配列
  
  -- システム情報
  is_featured BOOLEAN DEFAULT false, -- おすすめ物件
  view_count INT DEFAULT 0, -- 閲覧数
  inquiry_count INT DEFAULT 0, -- 問い合わせ数
  ad_allowed BOOLEAN DEFAULT true, -- 広告掲載可否
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP -- ソフトデリート
);

-- インデックス
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_city ON properties(address_city);
CREATE INDEX idx_properties_prefecture ON properties(address_prefecture);
CREATE INDEX idx_properties_yield ON properties(yield_surface);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_access ON properties USING GIN(access_info);
CREATE INDEX idx_properties_created ON properties(created_at DESC);
```

### 2. railway_lines (路線テーブル)

```sql
CREATE TABLE railway_lines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  line_name VARCHAR(100) UNIQUE NOT NULL, -- 'JR山手線', '東京メトロ丸ノ内線'
  line_code VARCHAR(50), -- 路線コード
  company VARCHAR(100), -- 鉄道会社名 'JR東日本', '東京メトロ'
  line_color VARCHAR(7), -- 路線カラー '#00B48D'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. stations (駅テーブル)

```sql
CREATE TABLE stations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  station_name VARCHAR(100) NOT NULL, -- '新宿駅'
  station_code VARCHAR(50), -- 駅コード
  line_id UUID REFERENCES railway_lines(id),
  prefecture VARCHAR(50), -- 都道府県
  city VARCHAR(100), -- 市区町村
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(station_name, line_id)
);
```

### 4. property_stations (物件駅関連テーブル)

```sql
CREATE TABLE property_stations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  station_id UUID REFERENCES stations(id),
  line_id UUID REFERENCES railway_lines(id),
  walk_time INT, -- 徒歩時間（分）
  distance_meters INT, -- 距離（m）
  is_primary BOOLEAN DEFAULT false, -- 主要駅かどうか
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(property_id, station_id)
);

CREATE INDEX idx_property_stations_property ON property_stations(property_id);
CREATE INDEX idx_property_stations_station ON property_stations(station_id);
CREATE INDEX idx_property_stations_walk_time ON property_stations(walk_time);
```

### 5. search_history (検索履歴テーブル)

```sql
CREATE TABLE search_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID, -- ユーザーID（ログイン機能実装時）
  session_id VARCHAR(255), -- セッションID
  search_params JSONB, -- 検索条件
  results_count INT, -- 検索結果数
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_search_history_created ON search_history(created_at DESC);
```

### 6. inquiries (問い合わせテーブル)

```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id),
  name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(50),
  message TEXT,
  inquiry_type VARCHAR(50), -- '資料請求', '内覧希望', '価格問い合わせ'
  status VARCHAR(50) DEFAULT '未対応', -- '未対応', '対応中', '完了'
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inquiries_property ON inquiries(property_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
```

## 検索クエリ例

### 1. エリア・路線・駅で検索

```sql
-- 新宿区の物件を検索
SELECT * FROM properties 
WHERE address_city = '新宿区' 
AND status = '販売中'
ORDER BY price ASC;

-- JR山手線沿線の物件を検索
SELECT DISTINCT p.* 
FROM properties p
JOIN property_stations ps ON p.id = ps.property_id
JOIN railway_lines rl ON ps.line_id = rl.id
WHERE rl.line_name = 'JR山手線'
AND p.status = '販売中'
ORDER BY ps.walk_time ASC;

-- 新宿駅徒歩10分以内の物件を検索
SELECT p.*, ps.walk_time
FROM properties p
JOIN property_stations ps ON p.id = ps.property_id
JOIN stations s ON ps.station_id = s.id
WHERE s.station_name = '新宿駅'
AND ps.walk_time <= 10
AND p.status = '販売中'
ORDER BY ps.walk_time ASC;
```

### 2. 価格範囲で検索

```sql
-- 3億円～5億円の物件を検索
SELECT * FROM properties 
WHERE price BETWEEN 300000000 AND 500000000
AND status = '販売中'
ORDER BY price ASC;
```

### 3. 利回りで検索

```sql
-- 表面利回り4%以上の物件を検索
SELECT * FROM properties 
WHERE yield_surface >= 4.0
AND status = '販売中'
ORDER BY yield_surface DESC;
```

### 4. 複合条件検索

```sql
-- 新宿区、JR山手線、3億円以下、利回り4%以上
SELECT DISTINCT p.*
FROM properties p
LEFT JOIN property_stations ps ON p.id = ps.property_id
LEFT JOIN railway_lines rl ON ps.line_id = rl.id
WHERE p.address_city = '新宿区'
AND (rl.line_name = 'JR山手線' OR rl.line_name IS NULL)
AND p.price <= 300000000
AND p.yield_surface >= 4.0
AND p.status = '販売中'
ORDER BY p.yield_surface DESC, p.price ASC;
```

### 5. 土地面積で検索

```sql
-- 土地面積100㎡以上の物件を検索
SELECT * FROM properties 
WHERE land_area_sqm >= 100
AND status = '販売中'
ORDER BY land_area_sqm DESC;
```

## RLS (Row Level Security) ポリシー

```sql
-- 公開物件は誰でも閲覧可能
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public properties are viewable by everyone"
ON properties FOR SELECT
USING (status = '販売中' AND deleted_at IS NULL);

-- 管理者のみ編集可能
CREATE POLICY "Only admins can modify properties"
ON properties FOR ALL
USING (auth.role() = 'admin');
```

## データ取り込みスクリプト用の型定義

```typescript
interface PropertyData {
  propertyName: string;
  propertyType: string;
  
  // 所在地
  addressFull: string;
  addressPrefecture: string;
  addressCity: string;
  addressTown: string;
  
  // アクセス
  accessInfo: Array<{
    line: string;
    station: string;
    walkTime: number;
  }>;
  
  // 価格
  price: number;
  
  // 土地
  landAreaSqm: number;
  landAreaTsubo: number;
  landRights: string;
  
  // 建物
  buildingAreaSqm: number;
  buildingAreaTsubo: number;
  buildingStructure: string;
  buildingFloors: string;
  constructionDate: string;
  totalUnits: number;
  
  // 法規制
  useDistrict: string;
  buildingCoverageRatio: number;
  floorAreaRatio: number;
  
  // 収益
  annualRent: number;
  yieldSurface: number;
  occupancyStatus: string;
  
  // その他
  facilities: string[];
  remarks: string;
  listingCompany: string;
  listingAgent: string;
}
```
