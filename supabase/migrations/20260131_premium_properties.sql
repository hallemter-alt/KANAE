-- Premium Investment Properties Migration
-- For high-end RC structure properties with advanced features

-- 1. Extended properties table for premium features
CREATE TABLE IF NOT EXISTS premium_properties (
  id TEXT PRIMARY KEY, -- Custom ID format: KN-001, KN-002, etc.
  
  -- Basic Information
  name TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  property_type TEXT DEFAULT 'investment', -- 'investment', 'minpaku', 'commercial'
  
  -- Pricing (JPY)
  price_jpy BIGINT NOT NULL,
  price_per_tsubo INTEGER,
  
  -- Date Information
  completion_date DATE NOT NULL,
  completion_year INTEGER GENERATED ALWAYS AS (EXTRACT(YEAR FROM completion_date)) STORED,
  
  -- Structure Information
  structure TEXT NOT NULL, -- 'RC 4層', 'RC 地下1層付地上4層'
  structure_type TEXT NOT NULL CHECK (structure_type IN ('RC', '鉄骨', 'SRC', '木造')),
  floors_above INTEGER,
  floors_below INTEGER DEFAULT 0,
  total_floors INTEGER GENERATED ALWAYS AS (floors_above + floors_below) STORED,
  
  -- Location
  location TEXT NOT NULL,
  prefecture TEXT DEFAULT '東京都',
  city TEXT DEFAULT '新宿区',
  detailed_address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Access Information (JSON array)
  access_stations JSONB DEFAULT '[]'::jsonb, -- [{"line": "JR山手線", "station": "新宿駅", "walk_minutes": 5}]
  
  -- Investment Metrics
  yield_expected DECIMAL(5, 2), -- Expected yield percentage
  yield_surface DECIMAL(5, 2), -- Surface yield
  yield_actual DECIMAL(5, 2), -- Actual yield
  annual_rent BIGINT,
  monthly_rent BIGINT,
  occupancy_rate DECIMAL(5, 2) DEFAULT 100.00,
  
  -- Special Features (for filtering)
  has_iot BOOLEAN DEFAULT false,
  has_face_recognition BOOLEAN DEFAULT false,
  has_soundproof BOOLEAN DEFAULT false,
  soundproof_level TEXT, -- 'Dr-80', 'Dr-95'
  soundproof_patent BOOLEAN DEFAULT false,
  is_minpaku_operating BOOLEAN DEFAULT false,
  has_rental_guarantee BOOLEAN DEFAULT false, -- 一括借上
  rental_guarantee_until DATE,
  has_smart_home BOOLEAN DEFAULT false,
  has_automation BOOLEAN DEFAULT false,
  
  -- Infrastructure Benefits
  near_park BOOLEAN DEFAULT false,
  multi_line_access BOOLEAN DEFAULT false, -- 4路線4駅 etc.
  urban_planning_benefit BOOLEAN DEFAULT false, -- 都市計画道路等
  urban_planning_details TEXT,
  
  -- Building Details
  total_units INTEGER,
  parking_spaces INTEGER,
  elevator BOOLEAN DEFAULT false,
  auto_lock BOOLEAN DEFAULT false,
  delivery_box BOOLEAN DEFAULT false,
  
  -- Features (array for badges)
  features TEXT[] DEFAULT '{}',
  features_ja TEXT[] DEFAULT '{}',
  features_en TEXT[] DEFAULT '{}',
  features_zh TEXT[] DEFAULT '{}',
  
  -- Descriptions (multilingual)
  description TEXT,
  description_ja TEXT,
  description_en TEXT,
  description_zh TEXT,
  
  -- Marketing Copy
  headline_ja TEXT,
  headline_en TEXT,
  headline_zh TEXT,
  selling_points TEXT[] DEFAULT '{}',
  
  -- Media
  image_urls TEXT[] DEFAULT '{}',
  floor_plan_urls TEXT[] DEFAULT '{}',
  video_urls TEXT[] DEFAULT '{}',
  
  -- Contract & Legal
  management_company TEXT,
  listing_company TEXT DEFAULT '株式会社KANAE',
  transaction_type TEXT,
  rental_contract_type TEXT, -- '一括借上', '普通賃貸'
  
  -- Status
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold', 'coming_soon')),
  is_featured BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT true,
  priority_order INTEGER DEFAULT 0,
  
  -- Analytics
  view_count INTEGER DEFAULT 0,
  inquiry_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  
  -- SEO
  seo_keywords TEXT[] DEFAULT '{}',
  seo_description TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

-- 2. Property Special Features Reference Table
CREATE TABLE IF NOT EXISTS property_special_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL, -- 'iot_system', 'soundproof_dr95'
  name_ja TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  category TEXT NOT NULL, -- 'technology', 'structure', 'business', 'location'
  description_ja TEXT,
  description_en TEXT,
  description_zh TEXT,
  icon TEXT, -- Icon name or emoji
  badge_color TEXT DEFAULT 'blue', -- 'blue', 'gold', 'green', 'purple'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Property-Features Junction Table
CREATE TABLE IF NOT EXISTS property_feature_mapping (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id TEXT REFERENCES premium_properties(id) ON DELETE CASCADE,
  feature_code TEXT REFERENCES property_special_features(code) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(property_id, feature_code)
);

-- 4. Investment Category Table (for filtering by investment type)
CREATE TABLE IF NOT EXISTS investment_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL, -- 'minpaku_ready', 'high_yield', 'prime_location'
  name_ja TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  description_ja TEXT,
  description_en TEXT,
  description_zh TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Property-Category Junction
CREATE TABLE IF NOT EXISTS property_category_mapping (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id TEXT REFERENCES premium_properties(id) ON DELETE CASCADE,
  category_code TEXT REFERENCES investment_categories(code) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(property_id, category_code)
);

-- 6. Search History for Premium Properties
CREATE TABLE IF NOT EXISTS premium_property_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT,
  filters JSONB,
  result_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_premium_properties_price ON premium_properties(price_jpy);
CREATE INDEX IF NOT EXISTS idx_premium_properties_city ON premium_properties(city);
CREATE INDEX IF NOT EXISTS idx_premium_properties_status ON premium_properties(status);
CREATE INDEX IF NOT EXISTS idx_premium_properties_yield ON premium_properties(yield_expected DESC);
CREATE INDEX IF NOT EXISTS idx_premium_properties_completion ON premium_properties(completion_date DESC);
CREATE INDEX IF NOT EXISTS idx_premium_properties_priority ON premium_properties(priority_order DESC);
CREATE INDEX IF NOT EXISTS idx_premium_properties_featured ON premium_properties(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_premium_properties_access ON premium_properties USING GIN(access_stations);
CREATE INDEX IF NOT EXISTS idx_premium_properties_features ON premium_properties USING GIN(features);

-- GIN index for full-text search (Japanese support)
CREATE INDEX IF NOT EXISTS idx_premium_properties_search ON premium_properties 
  USING GIN(to_tsvector('japanese', coalesce(name, '') || ' ' || coalesce(description_ja, '') || ' ' || coalesce(location, '')));

-- Updated_at trigger
CREATE TRIGGER update_premium_properties_updated_at 
  BEFORE UPDATE ON premium_properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- View count update function
CREATE OR REPLACE FUNCTION increment_property_view(property_id_param TEXT)
RETURNS void AS $$
BEGIN
  UPDATE premium_properties 
  SET view_count = view_count + 1 
  WHERE id = property_id_param;
END;
$$ LANGUAGE plpgsql;

-- Insert special features reference data
INSERT INTO property_special_features (code, name_ja, name_en, name_zh, category, icon, badge_color) VALUES
  ('iot_system', 'IoT連動システム', 'IoT Integration', 'IoT联动系统', 'technology', '🏠', 'blue'),
  ('face_recognition', '顔認証システム', 'Face Recognition', '人脸识别', 'technology', '🔐', 'blue'),
  ('soundproof_patent', '特許防音構造', 'Patent Soundproof', '专利隔音', 'structure', '🔇', 'purple'),
  ('minpaku_operating', '民泊運営中', 'Minpaku Operating', '民宿运营中', 'business', '🏨', 'gold'),
  ('rental_guarantee', '一括借上契約', 'Bulk Lease Contract', '整租合同', 'business', '📋', 'green'),
  ('smart_home', 'スマートホーム', 'Smart Home', '智能家居', 'technology', '🤖', 'blue'),
  ('near_park', '公園至近', 'Near Park', '近公园', 'location', '🌳', 'green'),
  ('multi_line', '複数路線利用可', 'Multi-Line Access', '多路线', 'location', '🚇', 'blue'),
  ('urban_planning', '都市計画受益', 'Urban Planning Benefit', '都市规划红利', 'location', '🏗️', 'gold'),
  ('nature_remo', 'NATURE Remo搭載', 'NATURE Remo', 'NATURE Remo', 'technology', '📱', 'blue')
ON CONFLICT (code) DO NOTHING;

-- Insert investment categories
INSERT INTO investment_categories (code, name_ja, name_en, name_zh, description_ja, description_en, description_zh) VALUES
  ('minpaku_ready', '民泊可能物件', 'Minpaku Ready', '民宿可行', '民泊運営が可能または運営中の物件', 'Properties suitable for vacation rental', '适合民宿运营的房产'),
  ('high_tech', 'ハイテク設備', 'High-Tech', '高科技设备', 'IoT、顔認証等の最新技術導入物件', 'Properties with cutting-edge technology', '配备最新科技的房产'),
  ('soundproof_spec', '防音特化', 'Soundproof Specialized', '隔音专用', '音楽家や配信者向け防音物件', 'Soundproof properties for musicians', '音乐家和主播专用隔音房产'),
  ('new_construction', '新築・準新築', 'New Construction', '新建筑', '2023年以降竣工の新築物件', 'Newly built properties (2023+)', '2023年后竣工的新建房产'),
  ('future_potential', '将来性高', 'High Potential', '高成长性', '都市計画等で資産価値向上が見込める', 'High appreciation potential', '资产增值潜力大'),
  ('stable_income', '安定収益', 'Stable Income', '稳定收益', '満室または借上契約で安定収入', 'Stable rental income guaranteed', '稳定租金收入')
ON CONFLICT (code) DO NOTHING;

-- RLS Policies (for public viewing)
ALTER TABLE premium_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Premium properties are viewable by everyone"
ON premium_properties FOR SELECT
USING (status = 'available' AND deleted_at IS NULL);

CREATE POLICY "Feature reference is viewable by everyone"
ON property_special_features FOR SELECT
USING (true);

CREATE POLICY "Category reference is viewable by everyone"
ON investment_categories FOR SELECT
USING (true);

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Premium Properties Database Schema Created Successfully!';
  RAISE NOTICE '📊 Tables created:';
  RAISE NOTICE '   - premium_properties (main property data)';
  RAISE NOTICE '   - property_special_features (feature reference)';
  RAISE NOTICE '   - property_feature_mapping (property-feature junction)';
  RAISE NOTICE '   - investment_categories (category reference)';
  RAISE NOTICE '   - property_category_mapping (property-category junction)';
  RAISE NOTICE '   - premium_property_searches (search analytics)';
  RAISE NOTICE '🔍 Indexes created for optimal search performance';
  RAISE NOTICE '🔐 RLS policies enabled for public viewing';
END $$;
