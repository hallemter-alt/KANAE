-- ===================================================================
-- データインポート検証スクリプト
-- ===================================================================
-- このスクリプトは ZMN 物件データのインポート後に実行して
-- データ品質と整合性を確認します
-- ===================================================================

-- 1. 基本統計
-- ===================================================================
SELECT 
  '📊 インポート統計' as category,
  COUNT(*) as total_properties,
  COUNT(DISTINCT address_city) as cities,
  MIN(price) as min_price,
  MAX(price) as max_price,
  ROUND(AVG(price)::numeric, 2) as avg_price,
  ROUND(AVG(yield_surface)::numeric, 2) as avg_yield
FROM properties
WHERE remarks LIKE '%zmn_list_%';

-- 2. 区ごとの物件数
-- ===================================================================
SELECT 
  '📍 区別物件数' as category,
  address_city,
  COUNT(*) as property_count,
  ROUND(AVG(price)::numeric, 0) as avg_price,
  ROUND(AVG(yield_surface)::numeric, 2) as avg_yield
FROM properties
WHERE remarks LIKE '%zmn_list_%'
GROUP BY address_city
ORDER BY property_count DESC;

-- 3. 価格帯別の分布
-- ===================================================================
SELECT 
  '💰 価格帯別分布' as category,
  CASE 
    WHEN price < 300000000 THEN '3億円未満'
    WHEN price < 500000000 THEN '3-5億円'
    WHEN price < 700000000 THEN '5-7億円'
    WHEN price < 1000000000 THEN '7-10億円'
    ELSE '10億円以上'
  END as price_range,
  COUNT(*) as property_count,
  ROUND(AVG(yield_surface)::numeric, 2) as avg_yield
FROM properties
WHERE remarks LIKE '%zmn_list_%'
  AND price IS NOT NULL
GROUP BY 
  CASE 
    WHEN price < 300000000 THEN '3億円未満'
    WHEN price < 500000000 THEN '3-5億円'
    WHEN price < 700000000 THEN '5-7億円'
    WHEN price < 1000000000 THEN '7-10億円'
    ELSE '10億円以上'
  END
ORDER BY MIN(price);

-- 4. 利回り別の分布
-- ===================================================================
SELECT 
  '📈 利回り別分布' as category,
  CASE 
    WHEN yield_surface < 3.5 THEN '3.5%未満'
    WHEN yield_surface < 4.0 THEN '3.5-4.0%'
    WHEN yield_surface < 4.5 THEN '4.0-4.5%'
    WHEN yield_surface < 5.0 THEN '4.5-5.0%'
    WHEN yield_surface < 6.0 THEN '5.0-6.0%'
    ELSE '6.0%以上'
  END as yield_range,
  COUNT(*) as property_count,
  ROUND(AVG(price)::numeric, 0) as avg_price
FROM properties
WHERE remarks LIKE '%zmn_list_%'
  AND yield_surface IS NOT NULL
GROUP BY 
  CASE 
    WHEN yield_surface < 3.5 THEN '3.5%未満'
    WHEN yield_surface < 4.0 THEN '3.5-4.0%'
    WHEN yield_surface < 4.5 THEN '4.0-4.5%'
    WHEN yield_surface < 5.0 THEN '4.5-5.0%'
    WHEN yield_surface < 6.0 THEN '5.0-6.0%'
    ELSE '6.0%以上'
  END
ORDER BY MIN(yield_surface);

-- 5. 構造タイプ別の分布
-- ===================================================================
SELECT 
  '🏗️ 構造別分布' as category,
  building_structure,
  COUNT(*) as property_count,
  ROUND(AVG(price)::numeric, 0) as avg_price,
  ROUND(AVG(yield_surface)::numeric, 2) as avg_yield,
  ROUND(AVG(building_age_years)::numeric, 1) as avg_age
FROM properties
WHERE remarks LIKE '%zmn_list_%'
  AND building_structure IS NOT NULL
GROUP BY building_structure
ORDER BY property_count DESC;

-- 6. 築年数別の分布
-- ===================================================================
SELECT 
  '🏢 築年数別分布' as category,
  CASE 
    WHEN building_age_years < 5 THEN '5年未満（新築・準新築）'
    WHEN building_age_years < 10 THEN '5-10年'
    WHEN building_age_years < 20 THEN '10-20年'
    WHEN building_age_years < 30 THEN '20-30年'
    ELSE '30年以上'
  END as age_range,
  COUNT(*) as property_count,
  ROUND(AVG(price)::numeric, 0) as avg_price,
  ROUND(AVG(yield_surface)::numeric, 2) as avg_yield
FROM properties
WHERE remarks LIKE '%zmn_list_%'
  AND building_age_years IS NOT NULL
GROUP BY 
  CASE 
    WHEN building_age_years < 5 THEN '5年未満（新築・準新築）'
    WHEN building_age_years < 10 THEN '5-10年'
    WHEN building_age_years < 20 THEN '10-20年'
    WHEN building_age_years < 30 THEN '20-30年'
    ELSE '30年以上'
  END
ORDER BY MIN(building_age_years);

-- 7. データ品質チェック
-- ===================================================================
SELECT 
  '✅ データ品質' as category,
  COUNT(*) as total,
  COUNT(property_name) as has_name,
  COUNT(price) as has_price,
  COUNT(yield_surface) as has_yield,
  COUNT(address_full) as has_address,
  COUNT(access_info) as has_access,
  COUNT(building_structure) as has_structure
FROM properties
WHERE remarks LIKE '%zmn_list_%';

-- 8. 欠損データの確認
-- ===================================================================
SELECT 
  '⚠️ 欠損データ' as category,
  property_name,
  CASE WHEN price IS NULL THEN '価格なし' ELSE '' END as price_status,
  CASE WHEN yield_surface IS NULL THEN '利回りなし' ELSE '' END as yield_status,
  CASE WHEN access_info IS NULL OR jsonb_array_length(access_info) = 0 THEN 'アクセスなし' ELSE '' END as access_status,
  CASE WHEN building_age_years IS NULL THEN '築年数なし' ELSE '' END as age_status
FROM properties
WHERE remarks LIKE '%zmn_list_%'
  AND (
    price IS NULL 
    OR yield_surface IS NULL 
    OR access_info IS NULL 
    OR jsonb_array_length(access_info) = 0
    OR building_age_years IS NULL
  );

-- 9. 異常値の確認
-- ===================================================================
SELECT 
  '🚨 異常値チェック' as category,
  property_name,
  price,
  yield_surface,
  building_age_years,
  CASE 
    WHEN price < 10000000 THEN '価格が低すぎる'
    WHEN price > 10000000000 THEN '価格が高すぎる'
    WHEN yield_surface < 1 THEN '利回りが低すぎる'
    WHEN yield_surface > 20 THEN '利回りが高すぎる'
    WHEN building_age_years < 0 THEN '築年数がマイナス'
    WHEN building_age_years > 100 THEN '築年数が100年超'
    ELSE 'その他の異常'
  END as issue
FROM properties
WHERE remarks LIKE '%zmn_list_%'
  AND (
    price < 10000000 
    OR price > 10000000000
    OR yield_surface < 1 
    OR yield_surface > 20
    OR building_age_years < 0 
    OR building_age_years > 100
  );

-- 10. トップ5物件（価格順）
-- ===================================================================
SELECT 
  '💎 最高価格トップ5' as category,
  property_name,
  address_city,
  price,
  yield_surface as yield_pct,
  building_structure,
  building_age_years as age
FROM properties
WHERE remarks LIKE '%zmn_list_%'
  AND price IS NOT NULL
ORDER BY price DESC
LIMIT 5;

-- 11. トップ5物件（利回り順）
-- ===================================================================
SELECT 
  '🎯 最高利回りトップ5' as category,
  property_name,
  address_city,
  price,
  yield_surface as yield_pct,
  building_structure,
  building_age_years as age
FROM properties
WHERE remarks LIKE '%zmn_list_%'
  AND yield_surface IS NOT NULL
ORDER BY yield_surface DESC
LIMIT 5;

-- 12. アクセス情報の確認
-- ===================================================================
SELECT 
  '🚇 アクセス情報' as category,
  property_name,
  jsonb_array_length(access_info) as station_count,
  access_info->0->>'line' as primary_line,
  access_info->0->>'station' as primary_station,
  (access_info->0->>'walk_time')::int as walk_minutes
FROM properties
WHERE remarks LIKE '%zmn_list_%'
  AND access_info IS NOT NULL
  AND jsonb_array_length(access_info) > 0
ORDER BY (access_info->0->>'walk_time')::int;

-- ===================================================================
-- 検証完了
-- ===================================================================
SELECT 
  '✨ 検証完了' as status,
  NOW() as verified_at,
  'データインポートの検証が完了しました' as message;
