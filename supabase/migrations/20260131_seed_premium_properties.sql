-- Seed Data for Premium Shinjuku RC Properties
-- High-end investment properties with advanced features

-- Insert the 4 premium properties
INSERT INTO premium_properties (
  id, name, name_en, name_zh,
  price_jpy, completion_date, structure, structure_type, 
  floors_above, floors_below, location, city,
  yield_expected, features, features_ja, features_en, features_zh,
  description, description_ja, description_en, description_zh,
  headline_ja, headline_en, headline_zh,
  access_stations, selling_points,
  has_iot, has_face_recognition, has_soundproof, soundproof_patent,
  is_minpaku_operating, has_rental_guarantee, has_smart_home, has_automation,
  near_park, multi_line_access, urban_planning_benefit, urban_planning_details,
  status, is_featured, priority_order
) VALUES
  -- KN-001: aLATO 新宿御苑
  (
    'KN-001',
    'aLATO 新宿御苑',
    'aLATO Shinjuku Gyoen',
    'aLATO 新宿御苑',
    900000000,
    '2024-02-01',
    'RC 4層',
    'RC',
    4, 0,
    '東京都新宿区富久町',
    '新宿区',
    3.97,
    ARRAY['RC造', '近公園', '多路線利用', '都市計画紅利'],
    ARRAY['RC造4階建', '新宿御苑徒歩圏', '4路線4駅利用可', '環状4号線計画'],
    ARRAY['RC 4-story', 'Near Shinjuku Gyoen', '4 Lines Access', 'Ring Road Plan'],
    ARRAY['RC造4层', '近新宿御苑', '4路线4站', '环状4号线规划'],
    '步行可达新宿御苑的稀缺地段，支持4路线4站出行',
    '新宿御苑徒歩圏内という稀少立地。4路線4駅利用可能で、利便性抜群。2027年環状4号線開通で更なる資産価値向上が期待できます。',
    'Rare location within walking distance to Shinjuku Gyoen. Access to 4 train lines and 4 stations. Property value expected to increase with the 2027 Ring Road No.4 completion.',
    '步行即可到达新宿御苑的稀缺地段。可利用4条路线4个车站，交通便利性极佳。2027年环状4号线开通后资产价值有望进一步提升。',
    '新宿御苑稀缺地段を抑える',
    'Secure Rare Shinjuku Gyoen Location',
    '抢占新宿御苑稀缺地段',
    '[
      {"line": "東京メトロ丸ノ内線", "station": "新宿御苑前駅", "walk_minutes": 6},
      {"line": "都営新宿線", "station": "曙橋駅", "walk_minutes": 8},
      {"line": "都営大江戸線", "station": "若松河田駅", "walk_minutes": 10},
      {"line": "JR中央総武線", "station": "四ツ谷駅", "walk_minutes": 12}
    ]'::jsonb,
    ARRAY[
      '新宿御苑至近の希少性',
      '4路線4駅のアクセス利便性',
      '2027年環状4号線開通による資産価値向上',
      '都心一等地の立地優位性',
      'RC造による高い資産保全性'
    ],
    false, false, false, false,
    false, false, false, false,
    true, true, true, '2027年環状4号線開通予定',
    'available', true, 1
  ),
  
  -- KN-002: belle ville 神楽坂
  (
    'KN-002',
    'belle ville 神楽坂',
    'belle ville Kagurazaka',
    'belle ville 神乐坂',
    888000000,
    '2023-04-01',
    'RC 地下1層付地上4層',
    'RC',
    4, 1,
    '東京都新宿区横寺町',
    '新宿区',
    6.24,
    ARRAY['IoT系統', '人臉識別', '民宿運營中', 'RC造'],
    ARRAY['IoT連動システム', '顔認証完備', '民泊運営中', '駅徒歩2分'],
    ARRAY['IoT System', 'Face Recognition', 'Minpaku Operating', 'Station 2min'],
    ARRAY['IoT联动系统', '人脸识别', '民宿运营中', '车站2分钟'],
    '神乐坂黄金地段，距车站仅2分钟。导入最新IoT与人脸识别系统，收益率高达6.24%',
    '神楽坂の黄金立地、駅徒歩2分。最新IoTシステムと顔認証を完備し、民泊運営中。実績利回り6.24%の高収益物件。',
    'Prime Kagurazaka location, 2 minutes from station. Equipped with latest IoT and face recognition systems. Minpaku operating with 6.24% yield.',
    '神乐坂黄金地段，距车站仅步行2分钟。配备最新IoT系统和人脸识别系统，民宿运营中。实际收益率6.24%的高收益房产。',
    '神楽坂プレミアム×次世代IoT',
    'Kagurazaka Premium × Next-Gen IoT',
    '神乐坂高端×下一代IoT',
    '[
      {"line": "東京メトロ東西線", "station": "神楽坂駅", "walk_minutes": 2},
      {"line": "都営大江戸線", "station": "牛込神楽坂駅", "walk_minutes": 5},
      {"line": "JR中央総武線", "station": "飯田橋駅", "walk_minutes": 8}
    ]'::jsonb,
    ARRAY[
      '神楽坂駅徒歩2分の最高立地',
      '最新IoT・顔認証システム完備',
      '民泊運営実績あり',
      '実績利回り6.24%',
      '次世代スマート物件'
    ],
    true, true, false, false,
    true, false, true, false,
    false, true, false, NULL,
    'available', true, 2
  ),
  
  -- KN-003: Sound Proof Pro 北新宿
  (
    'KN-003',
    'Sound Proof Pro 北新宿',
    'Sound Proof Pro Kita-Shinjuku',
    'Sound Proof Pro 北新宿',
    844800000,
    '2025-08-01',
    'RC 8層',
    'RC',
    8, 0,
    '東京都新宿区北新宿4丁目',
    '新宿区',
    3.80,
    ARRAY['三重防音', '専利工法', '音樂家需求', 'RC造'],
    ARRAY['特許三重防音構造', 'Dr-80～Dr-95', '音楽家・配信者向け', '2025年竣工'],
    ARRAY['Patent Soundproof', 'Dr-80~Dr-95', 'For Musicians', '2025 Completion'],
    ARRAY['专利三重隔音', 'Dr-80至Dr-95', '音乐家专用', '2025年竣工'],
    '全住户专利三重防音结构（Dr-80至Dr-95），针对乐器演奏与直播主等特殊高需求群体',
    '全住戸に特許取得済みの三重防音構造（Dr-80～Dr-95）を採用。音楽家や配信者など、特殊な防音ニーズを持つ高所得層をターゲットとした差別化物件。',
    'Patent-pending triple soundproof structure (Dr-80 to Dr-95) in all units. Targets high-income tenants such as musicians and streamers with special soundproofing needs.',
    '全住户采用已获专利的三重隔音结构（Dr-80至Dr-95）。针对音乐家和主播等有特殊隔音需求的高收入群体的差异化房产。',
    '絶対防音で新市場を創造',
    'Create New Market with Ultimate Soundproofing',
    '绝对隔音创造新市场',
    '[
      {"line": "JR中央総武線", "station": "大久保駅", "walk_minutes": 7},
      {"line": "都営大江戸線", "station": "中井駅", "walk_minutes": 9},
      {"line": "西武新宿線", "station": "下落合駅", "walk_minutes": 10}
    ]'::jsonb,
    ARRAY[
      '特許取得済み三重防音構造',
      'Dr-80～Dr-95の圧倒的遮音性能',
      '音楽家・配信者特化で高賃料獲得',
      '競合物件が存在しないニッチ市場',
      '2025年竣工の最新設備'
    ],
    false, false, true, true,
    false, false, false, false,
    false, false, false, NULL,
    'available', true, 3
  ),
  
  -- KN-005: TASUKI smart 中井
  (
    'KN-005',
    'TASUKI smart 中井',
    'TASUKI smart Nakai',
    'TASUKI smart 中井',
    670000000,
    '2026-02-01',
    'RC 4層',
    'RC',
    4, 0,
    '東京都新宿区中落合1丁目',
    '新宿区',
    3.90,
    ARRAY['2026新筑', '全自動化管理', 'NATURE Remo', 'RC造'],
    ARRAY['2026年竣工', 'NATURE Remo搭載', 'フル自動化管理', 'スマートホーム'],
    ARRAY['2026 Completion', 'NATURE Remo', 'Full Automation', 'Smart Home'],
    ARRAY['2026年竣工', 'NATURE Remo', '全自动管理', '智能家居'],
    '2026年竣工的最新项目，通过NATURE Remo实现家庭全自动化管理',
    '2026年竣工予定の最新プロジェクト。NATURE Remo導入により家庭内の全自動化管理を実現。次世代型スマート賃貸物件。',
    '2026 new construction project. Achieves full home automation management through NATURE Remo integration. Next-generation smart rental property.',
    '预计2026年竣工的最新项目。通过引入NATURE Remo实现家庭内全自动化管理。下一代智能租赁房产。',
    '2026年最新スマート物件',
    '2026 Latest Smart Property',
    '2026年最新智能房产',
    '[
      {"line": "都営大江戸線", "station": "中井駅", "walk_minutes": 5},
      {"line": "西武新宿線", "station": "中井駅", "walk_minutes": 6},
      {"line": "東京メトロ東西線", "station": "落合駅", "walk_minutes": 8}
    ]'::jsonb,
    ARRAY[
      '2026年竣工の最新物件',
      'NATURE Remo完全装備',
      'フル自動化によるスマート管理',
      '次世代型賃貸の先駆け',
      'テクノロジー志向の入居者獲得'
    ],
    true, false, false, false,
    false, false, true, true,
    false, true, false, NULL,
    'available', true, 4
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price_jpy = EXCLUDED.price_jpy,
  yield_expected = EXCLUDED.yield_expected,
  updated_at = NOW();

-- Map properties to special features
INSERT INTO property_feature_mapping (property_id, feature_code, display_order) VALUES
  -- KN-001: aLATO 新宿御苑
  ('KN-001', 'near_park', 1),
  ('KN-001', 'multi_line', 2),
  ('KN-001', 'urban_planning', 3),
  
  -- KN-002: belle ville 神楽坂
  ('KN-002', 'iot_system', 1),
  ('KN-002', 'face_recognition', 2),
  ('KN-002', 'minpaku_operating', 3),
  ('KN-002', 'smart_home', 4),
  
  -- KN-003: Sound Proof Pro 北新宿
  ('KN-003', 'soundproof_patent', 1),
  
  -- KN-005: TASUKI smart 中井
  ('KN-005', 'smart_home', 1),
  ('KN-005', 'nature_remo', 2),
  ('KN-005', 'iot_system', 3)
ON CONFLICT (property_id, feature_code) DO NOTHING;

-- Map properties to investment categories
INSERT INTO property_category_mapping (property_id, category_code) VALUES
  -- KN-001: aLATO 新宿御苑
  ('KN-001', 'new_construction'),
  ('KN-001', 'future_potential'),
  
  -- KN-002: belle ville 神楽坂
  ('KN-002', 'minpaku_ready'),
  ('KN-002', 'high_tech'),
  ('KN-002', 'stable_income'),
  ('KN-002', 'new_construction'),
  
  -- KN-003: Sound Proof Pro 北新宿
  ('KN-003', 'soundproof_spec'),
  ('KN-003', 'future_potential'),
  ('KN-003', 'new_construction'),
  
  -- KN-005: TASUKI smart 中井
  ('KN-005', 'high_tech'),
  ('KN-005', 'new_construction'),
  ('KN-005', 'stable_income')
ON CONFLICT (property_id, category_code) DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Premium Shinjuku Properties Seeded Successfully!';
  RAISE NOTICE '📍 Properties added:';
  RAISE NOTICE '   KN-001: aLATO 新宿御苑 (¥900M, 3.97%%)';
  RAISE NOTICE '   KN-002: belle ville 神楽坂 (¥888M, 6.24%%)';
  RAISE NOTICE '   KN-003: Sound Proof Pro 北新宿 (¥844.8M, 3.80%%)';
  RAISE NOTICE '   KN-005: TASUKI smart 中井 (¥670M, 3.90%%)';
  RAISE NOTICE '🏷️  Features and categories mapped';
  RAISE NOTICE '🎯 All properties marked as featured and premium';
END $$;
