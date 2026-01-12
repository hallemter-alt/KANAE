-- Supabase データベーススキーマ
-- このファイルを Supabase の SQL Editor で実行してください

-- 1. 顧客テーブル（customers）
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_kana TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  notes TEXT,
  type TEXT NOT NULL CHECK (type IN ('rent', 'sale', 'minpaku')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 顧客テーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_type ON customers(type);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at DESC);

-- 2. 物件テーブル（properties）
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('rent', 'sale', 'minpaku')),
  price NUMERIC(12, 2) NOT NULL,
  monthly_rent NUMERIC(12, 2),
  initial_cost NUMERIC(12, 2),
  address TEXT NOT NULL,
  area NUMERIC(10, 2),
  rooms TEXT,
  image_urls TEXT[] DEFAULT '{}',
  description TEXT,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'rented', 'sold', 'hidden')),
  features TEXT[] DEFAULT '{}',
  nearest_station TEXT,
  walking_minutes INTEGER,
  floor INTEGER,
  building_age INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 物件テーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);

-- 3. 問合せテーブル（inquiries）
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  type TEXT NOT NULL CHECK (type IN ('viewing', 'inquiry', 'application')),
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 問合せテーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_inquiries_customer_id ON inquiries(customer_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_property_id ON inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- 4. 物件お気に入りテーブル（property_favorites）
CREATE TABLE IF NOT EXISTS property_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(customer_id, property_id)
);

-- お気に入りテーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_favorites_customer_id ON property_favorites(customer_id);
CREATE INDEX IF NOT EXISTS idx_favorites_property_id ON property_favorites(property_id);

-- 5. KPI データテーブル（kpis）
CREATE TABLE IF NOT EXISTS kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('rent', 'sale', 'minpaku')),
  metric TEXT NOT NULL,
  value NUMERIC(12, 2) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KPI テーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_kpis_type ON kpis(type);
CREATE INDEX IF NOT EXISTS idx_kpis_date ON kpis(date DESC);
CREATE INDEX IF NOT EXISTS idx_kpis_type_date ON kpis(type, date DESC);

-- 6. トリガー：updated_at の自動更新
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 各テーブルにトリガーを設定
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. Row Level Security (RLS) の設定
-- 開発中は無効化、本番環境では有効化を推奨

-- ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE property_favorites ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;

-- 8. サンプルデータの挿入（開発・テスト用）
-- 顧客サンプルデータ
INSERT INTO customers (name, name_kana, email, phone, type, status) VALUES
  ('山田太郎', 'ヤマダタロウ', 'yamada@example.com', '090-1234-5678', 'rent', 'active'),
  ('佐藤花子', 'サトウハナコ', 'sato@example.com', '090-2345-6789', 'sale', 'active'),
  ('鈴木一郎', 'スズキイチロウ', 'suzuki@example.com', '090-3456-7890', 'minpaku', 'active')
ON CONFLICT (email) DO NOTHING;

-- 物件サンプルデータ
INSERT INTO properties (
  title, type, price, monthly_rent, address, area, rooms, 
  description, status, features, nearest_station, walking_minutes, floor
) VALUES
  (
    '渋谷駅徒歩5分 1LDK', 'rent', 150000, 150000, 
    '東京都渋谷区道玄坂1-1-1', 35.5, '1LDK',
    '渋谷駅から徒歩5分の好立地。新築マンションで設備も充実。', 
    'available',
    ARRAY['バス・トイレ別', 'オートロック', '宅配ボックス', 'エアコン完備'],
    '渋谷駅', 5, 3
  ),
  (
    '新宿エリア ファミリー向け 3LDK', 'rent', 250000, 250000,
    '東京都新宿区西新宿2-2-2', 75.0, '3LDK',
    'ファミリー向けの広々とした間取り。学校や公園も近く子育てに最適。',
    'available',
    ARRAY['駐車場あり', '南向き', 'ペット可', '床暖房'],
    '新宿駅', 10, 5
  ),
  (
    '表参道 投資用マンション', 'sale', 55000000, NULL,
    '東京都港区南青山3-3-3', 45.0, '1LDK',
    '表参道駅徒歩3分。投資用として人気のエリア。賃貸需要も高い。',
    'available',
    ARRAY['駅近', '高級エリア', '管理体制良好'],
    '表参道駅', 3, 8
  ),
  (
    '浅草エリア 民泊向け物件', 'minpaku', 35000000, NULL,
    '東京都台東区浅草1-1-1', 40.0, '2DK',
    '観光地として人気の浅草エリア。民泊運営に最適な物件。',
    'available',
    ARRAY['観光地近隣', '外国人に人気', 'WiFi完備'],
    '浅草駅', 2, 4
  )
ON CONFLICT DO NOTHING;

-- 問合せサンプルデータ
INSERT INTO inquiries (name, email, phone, type, message, status) VALUES
  ('田中太郎', 'tanaka@example.com', '090-4567-8901', 'inquiry', '渋谷の物件について詳しく教えてください。', 'pending'),
  ('高橋花子', 'takahashi@example.com', '090-5678-9012', 'viewing', '内見の予約をしたいです。', 'processing')
ON CONFLICT DO NOTHING;

-- 完了メッセージ
DO $$
BEGIN
  RAISE NOTICE '✅ データベーススキーマの作成が完了しました！';
  RAISE NOTICE '次のステップ：';
  RAISE NOTICE '1. Supabase ダッシュボードで API キーを取得';
  RAISE NOTICE '2. .env.local に以下を設定：';
  RAISE NOTICE '   NEXT_PUBLIC_SUPABASE_URL=your-project-url';
  RAISE NOTICE '   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key';
END $$;
