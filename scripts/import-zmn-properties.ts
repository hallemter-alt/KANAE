/**
 * Import script for ZMN properties data
 * Imports real investment properties from JSON into the database
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface ZMNProperty {
  id: string;
  name: string;
  type: string | null;
  address: {
    full: string;
    prefecture: string | null;
    city_ward: string | null;
    rest: string;
    chiban: string | null;
  };
  transport: string[] | null;
  price_yen: number | null;
  price_display: string | null;
  yield_percent: number | null;
  annual_income_yen: number | null;
  annual_expense_yen: number | null;
  noi_yen: number | null;
  land_area_sqm: number | null;
  building_area_sqm: number | null;
  structure: string;
  floors: number;
  built_date: string | null;
  units: number | null;
  zoning: string;
  coverage_ratio_percent: number | null;
  far_ratio_percent: number | null;
  occupancy_status: string;
  source: {
    document: string;
    pages: number[];
  };
}

/**
 * Parse transport data to extract station information
 */
function parseTransportData(transport: string[] | null): any[] {
  if (!transport || transport.length === 0) return [];
  
  const stations: any[] = [];
  
  for (const line of transport) {
    // Match patterns like: "JR山手線「新大久保」駅 徒歩9分"
    const match = line.match(/(.+?)「(.+?)」駅\s*徒歩\s*(\d+)\s*分/);
    if (match) {
      stations.push({
        line: match[1].trim(),
        station: match[2].trim() + '駅',
        walk_time: parseInt(match[3])
      });
    }
  }
  
  return stations;
}

/**
 * Extract year from built_date string
 */
function extractYear(builtDate: string | null): number | null {
  if (!builtDate) return null;
  
  // Match patterns like: "1991年03月", "平成16年2月", "2025年8月 竣工"
  const westernMatch = builtDate.match(/(\d{4})年/);
  if (westernMatch) {
    return parseInt(westernMatch[1]);
  }
  
  // Heisei era: 平成 = 1989 + year
  const heiseiMatch = builtDate.match(/平成(\d+)年/);
  if (heiseiMatch) {
    return 1988 + parseInt(heiseiMatch[1]);
  }
  
  // Reiwa era: 令和 = 2019 + year
  const reiwaMatch = builtDate.match(/令和(\d+)年/);
  if (reiwaMatch) {
    return 2018 + parseInt(reiwaMatch[1]);
  }
  
  // Showa era: 昭和 = 1926 + year
  const showaMatch = builtDate.match(/昭和(\d+)年/);
  if (showaMatch) {
    return 1925 + parseInt(showaMatch[1]);
  }
  
  return null;
}

/**
 * Extract structure type from structure string
 */
function extractStructureType(structure: string): string {
  if (structure.includes('RC') || structure.includes('鉄筋コンクリート')) {
    return 'RC造';
  }
  if (structure.includes('鉄骨造') || structure.includes('鉄骨')) {
    return '鉄骨造';
  }
  if (structure.includes('SRC')) {
    return 'SRC造';
  }
  if (structure.includes('木造')) {
    return '木造';
  }
  return 'その他';
}

/**
 * Clean up occupancy status text
 */
function cleanOccupancyStatus(status: string): string {
  // Remove common noise text
  const cleaned = status
    .replace(/を優先.*/, '')
    .replace(/が異なる場合.*/, '')
    .replace(/に相違.*/, '')
    .replace(/無断転載禁止.*/, '')
    .trim();
  
  if (cleaned.includes('満室')) return '満室';
  if (cleaned.includes('賃貸中')) return '賃貸中';
  if (cleaned.includes('空室')) return '空室あり';
  if (cleaned.includes('一括賃貸')) return '一括賃貸中';
  
  return cleaned || '情報なし';
}

/**
 * Transform ZMN property to database property format
 */
function transformProperty(zmnProp: ZMNProperty): any {
  const accessStations = parseTransportData(zmnProp.transport);
  const buildingAge = extractYear(zmnProp.built_date);
  const currentYear = new Date().getFullYear();
  const age = buildingAge ? currentYear - buildingAge : null;
  
  return {
    property_name: zmnProp.name,
    property_type: zmnProp.type || '一棟マンション',
    status: '販売中',
    
    // Location
    address_prefecture: zmnProp.address.prefecture || '東京都',
    address_city: zmnProp.address.city_ward || '新宿区',
    address_town: zmnProp.address.rest,
    address_full: zmnProp.address.full,
    
    // Access
    access_info: accessStations,
    
    // Price
    price: zmnProp.price_yen,
    
    // Land
    land_area_sqm: zmnProp.land_area_sqm,
    land_area_tsubo: zmnProp.land_area_sqm ? zmnProp.land_area_sqm / 3.30579 : null,
    land_rights: '所有権',
    land_category: '宅地',
    
    // Building
    building_area_sqm: zmnProp.building_area_sqm,
    building_area_tsubo: zmnProp.building_area_sqm ? zmnProp.building_area_sqm / 3.30579 : null,
    building_structure: extractStructureType(zmnProp.structure),
    building_floors: `地上${zmnProp.floors}階建`,
    building_age_years: age,
    construction_date: buildingAge ? `${buildingAge}-01-01` : null,
    total_units: zmnProp.units,
    
    // Legal
    urban_planning: '市街化区域',
    use_district: zmnProp.zoning,
    building_coverage_ratio: zmnProp.coverage_ratio_percent,
    floor_area_ratio: zmnProp.far_ratio_percent,
    
    // Revenue
    annual_rent: zmnProp.annual_income_yen,
    annual_income: zmnProp.annual_income_yen,
    annual_expense: zmnProp.annual_expense_yen,
    noi: zmnProp.noi_yen,
    yield_surface: zmnProp.yield_percent,
    occupancy_status: cleanOccupancyStatus(zmnProp.occupancy_status),
    
    // Features
    features: [],
    remarks: `出典: ${zmnProp.source.document} (ページ: ${zmnProp.source.pages.join(', ')})`,
    
    // Management
    listing_company: '株式会社KANAE',
    transaction_type: '媒介',
    
    // Images (empty for now)
    images: [],
    floor_plans: [],
    
    // System
    is_featured: false,
    ad_allowed: true,
  };
}

/**
 * Main import function
 */
async function importProperties() {
  try {
    console.log('🚀 Starting ZMN properties import...\n');
    
    // Read JSON file
    const jsonPath = path.join(process.cwd(), 'zmn_properties_merged.json.txt');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const zmnProperties: ZMNProperty[] = JSON.parse(jsonData);
    
    console.log(`📊 Found ${zmnProperties.length} properties to import\n`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const zmnProp of zmnProperties) {
      try {
        const property = transformProperty(zmnProp);
        
        console.log(`📍 Importing: ${property.property_name}`);
        console.log(`   Price: ¥${property.price?.toLocaleString() || 'N/A'}`);
        console.log(`   Yield: ${property.yield_surface || 'N/A'}%`);
        console.log(`   Location: ${property.address_full}`);
        
        // Check if property already exists by name
        const { data: existing } = await supabase
          .from('properties')
          .select('id')
          .eq('property_name', property.property_name)
          .single();
        
        if (existing) {
          console.log(`   ⚠️  Already exists, skipping...\n`);
          continue;
        }
        
        // Insert property
        const { data, error } = await supabase
          .from('properties')
          .insert(property)
          .select()
          .single();
        
        if (error) {
          console.error(`   ❌ Error: ${error.message}\n`);
          errorCount++;
        } else {
          console.log(`   ✅ Success! ID: ${data.id}\n`);
          successCount++;
        }
        
      } catch (err) {
        console.error(`   ❌ Exception:`, err);
        errorCount++;
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Import Summary:');
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${errorCount}`);
    console.log(`   📝 Total: ${zmnProperties.length}`);
    console.log('='.repeat(60) + '\n');
    
  } catch (error) {
    console.error('Fatal error during import:', error);
    process.exit(1);
  }
}

// Run import
if (require.main === module) {
  importProperties()
    .then(() => {
      console.log('✨ Import completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Import failed:', error);
      process.exit(1);
    });
}

export { importProperties, transformProperty };
