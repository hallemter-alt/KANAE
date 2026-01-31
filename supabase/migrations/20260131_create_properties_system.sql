-- 投資収益物件管理システム - データベース作成スクリプト
-- 実行日: 2026-01-31

-- UUID拡張を有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. 路線テーブル
CREATE TABLE IF NOT EXISTS railway_lines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  line_name VARCHAR(100) UNIQUE NOT NULL,
  line_code VARCHAR(50),
  company VARCHAR(100),
  line_color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 駅テーブル
CREATE TABLE IF NOT EXISTS stations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  station_name VARCHAR(100) NOT NULL,
  station_code VARCHAR(50),
  line_id UUID REFERENCES railway_lines(id) ON DELETE CASCADE,
  prefecture VARCHAR(50),
  city VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(station_name, line_id)
);

-- 3. 物件テーブル
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- 基本情報
  property_name VARCHAR(255),
  property_type VARCHAR(100) DEFAULT '一棟収益',
  status VARCHAR(50) DEFAULT '販売中',
  
  -- 所在地情報
  address_prefecture VARCHAR(50),
  address_city VARCHAR(100),
  address_town VARCHAR(255),
  address_full TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- アクセス情報 (JSON配列)
  access_info JSONB,
  
  -- 価格情報
  price BIGINT,
  price_per_tsubo INT,
  
  -- 土地情報
  land_area_sqm DECIMAL(10, 2),
  land_area_tsubo DECIMAL(10, 2),
  land_rights VARCHAR(50) DEFAULT '所有権',
  land_category VARCHAR(50) DEFAULT '宅地',
  setback_area DECIMAL(10, 2),
  private_road_area DECIMAL(10, 2),
  
  -- 建物情報
  building_area_sqm DECIMAL(10, 2),
  building_area_tsubo DECIMAL(10, 2),
  building_structure VARCHAR(100),
  building_floors VARCHAR(50),
  building_age_years INT,
  construction_date DATE,
  total_units INT,
  
  -- 法規制情報
  urban_planning VARCHAR(100) DEFAULT '市街化区域',
  use_district VARCHAR(100),
  building_coverage_ratio INT,
  floor_area_ratio INT,
  fire_prevention VARCHAR(50),
  height_district VARCHAR(100),
  
  -- 接道情報
  road_info TEXT,
  
  -- 収益情報
  monthly_rent BIGINT,
  annual_rent BIGINT,
  annual_income BIGINT,
  annual_expense BIGINT,
  noi BIGINT,
  yield_surface DECIMAL(5, 2),
  yield_actual DECIMAL(5, 2),
  occupancy_status VARCHAR(50) DEFAULT '満室',
  
  -- 設備情報
  facilities JSONB,
  parking_spaces INT DEFAULT 0,
  
  -- 物件の特徴
  features TEXT[],
  remarks TEXT,
  
  -- 書類情報
  building_confirmation BOOLEAN DEFAULT false,
  inspection_certificate BOOLEAN DEFAULT false,
  
  -- 管理情報
  management_company VARCHAR(255),
  listing_company VARCHAR(255),
  listing_agent VARCHAR(100),
  listing_agent_contact VARCHAR(255),
  transaction_type VARCHAR(50),
  commission_rate DECIMAL(4, 2) DEFAULT 3.00,
  
  -- 画像・ファイル
  images TEXT[],
  floor_plans TEXT[],
  documents TEXT[],
  
  -- システム情報
  is_featured BOOLEAN DEFAULT false,
  view_count INT DEFAULT 0,
  inquiry_count INT DEFAULT 0,
  ad_allowed BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- 4. 物件駅関連テーブル
CREATE TABLE IF NOT EXISTS property_stations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  station_id UUID REFERENCES stations(id) ON DELETE CASCADE,
  line_id UUID REFERENCES railway_lines(id) ON DELETE CASCADE,
  walk_time INT,
  distance_meters INT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(property_id, station_id)
);

-- 5. 検索履歴テーブル
CREATE TABLE IF NOT EXISTS search_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  session_id VARCHAR(255),
  search_params JSONB,
  results_count INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. 問い合わせテーブル
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(50),
  message TEXT,
  inquiry_type VARCHAR(50) DEFAULT '一般問い合わせ',
  status VARCHAR(50) DEFAULT '未対応',
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックス作成
-- properties テーブル
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(address_city) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_properties_prefecture ON properties(address_prefecture) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_properties_yield ON properties(yield_surface) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_properties_access ON properties USING GIN(access_info);
CREATE INDEX IF NOT EXISTS idx_properties_created ON properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_land_area ON properties(land_area_sqm) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_properties_building_area ON properties(building_area_sqm) WHERE deleted_at IS NULL;

-- property_stations テーブル
CREATE INDEX IF NOT EXISTS idx_property_stations_property ON property_stations(property_id);
CREATE INDEX IF NOT EXISTS idx_property_stations_station ON property_stations(station_id);
CREATE INDEX IF NOT EXISTS idx_property_stations_line ON property_stations(line_id);
CREATE INDEX IF NOT EXISTS idx_property_stations_walk_time ON property_stations(walk_time);

-- stations テーブル
CREATE INDEX IF NOT EXISTS idx_stations_name ON stations(station_name);
CREATE INDEX IF NOT EXISTS idx_stations_line ON stations(line_id);

-- inquiries テーブル
CREATE INDEX IF NOT EXISTS idx_inquiries_property ON inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC);

-- search_history テーブル
CREATE INDEX IF NOT EXISTS idx_search_history_created ON search_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_history_session ON search_history(session_id);

-- Row Level Security (RLS) 設定
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE railway_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 公開物件は誰でも閲覧可能
CREATE POLICY "Public properties viewable by everyone"
ON properties FOR SELECT
USING (status = '販売中' AND deleted_at IS NULL);

CREATE POLICY "Public railway lines viewable by everyone"
ON railway_lines FOR SELECT
USING (true);

CREATE POLICY "Public stations viewable by everyone"
ON stations FOR SELECT
USING (true);

CREATE POLICY "Public property stations viewable by everyone"
ON property_stations FOR SELECT
USING (true);

-- 検索履歴は誰でも作成可能
CREATE POLICY "Anyone can create search history"
ON search_history FOR INSERT
WITH CHECK (true);

-- 問い合わせは誰でも作成可能
CREATE POLICY "Anyone can create inquiries"
ON inquiries FOR INSERT
WITH CHECK (true);

-- 更新日時を自動更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- properties テーブルに更新トリガーを設定
DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 初期データ: 主要路線を挿入
INSERT INTO railway_lines (line_name, company, line_color) VALUES
('JR山手線', 'JR東日本', '#9ACD32'),
('JR中央線', 'JR東日本', '#F15A22'),
('JR総武線', 'JR東日本', '#FFD400'),
('東京メトロ丸ノ内線', '東京メトロ', '#F62E36'),
('東京メトロ銀座線', '東京メトロ', '#FF9500'),
('東京メトロ日比谷線', '東京メトロ', '#B5B5AC'),
('東京メトロ東西線', '東京メトロ', '#009BBF'),
('東京メトロ千代田線', '東京メトロ', '#00BB85'),
('東京メトロ有楽町線', '東京メトロ', '#C1A470'),
('東京メトロ半蔵門線', '東京メトロ', '#8F76D6'),
('東京メトロ南北線', '東京メトロ', '#00AC9B'),
('東京メトロ副都心線', '東京メトロ', '#9C5E31'),
('都営大江戸線', '東京都交通局', '#B6007A'),
('都営新宿線', '東京都交通局', '#6CBB5A'),
('都営三田線', '東京都交通局', '#0079C2'),
('都営浅草線', '東京都交通局', '#E85298'),
('西武新宿線', '西武鉄道', '#FFD400'),
('西武池袋線', '西武鉄道', '#1E50A2'),
('京王線', '京王電鉄', '#DD0077'),
('小田急線', '小田急電鉄', '#2774AE'),
('東急東横線', '東急電鉄', '#DA0442'),
('東急田園都市線', '東急電鉄', '#00AC9B')
ON CONFLICT (line_name) DO NOTHING;

-- 初期データ: 主要駅を挿入 (新宿区周辺)
INSERT INTO stations (station_name, prefecture, city, line_id) VALUES
('新宿駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = 'JR山手線')),
('新大久保駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = 'JR山手線')),
('高田馬場駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = 'JR山手線')),
('大久保駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = 'JR中央線')),
('東中野駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = 'JR中央線')),
('西早稲田駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = '東京メトロ副都心線')),
('早稲田駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = '東京メトロ東西線')),
('曙橋駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = '都営新宿線')),
('落合南長崎駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = '都営大江戸線')),
('西新宿五丁目駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = '都営大江戸線')),
('中井駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = '都営大江戸線')),
('下落合駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = '西武新宿線')),
('新井薬師前駅', '東京都', '新宿区', (SELECT id FROM railway_lines WHERE line_name = '西武新宿線'))
ON CONFLICT (station_name, line_id) DO NOTHING;

COMMENT ON TABLE properties IS '投資収益物件情報テーブル';
COMMENT ON TABLE railway_lines IS '鉄道路線マスタ';
COMMENT ON TABLE stations IS '駅マスタ';
COMMENT ON TABLE property_stations IS '物件と駅の関連テーブル';
COMMENT ON TABLE search_history IS '検索履歴テーブル';
COMMENT ON TABLE inquiries IS '問い合わせテーブル';
