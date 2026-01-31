/**
 * Premium Property Types
 * High-end investment properties with advanced features
 */

export type StructureType = 'RC' | '鉄骨' | 'SRC' | '木造';
export type PropertyStatus = 'available' | 'reserved' | 'sold' | 'coming_soon';
export type PropertyType = 'investment' | 'minpaku' | 'commercial';
export type FeatureCategory = 'technology' | 'structure' | 'business' | 'location';
export type BadgeColor = 'blue' | 'gold' | 'green' | 'purple' | 'red';

export interface AccessStation {
  line: string;
  station: string;
  walk_minutes: number;
}

export interface PropertySpecialFeature {
  id: string;
  code: string;
  name_ja: string;
  name_en: string;
  name_zh: string;
  category: FeatureCategory;
  description_ja?: string;
  description_en?: string;
  description_zh?: string;
  icon?: string;
  badge_color: BadgeColor;
  created_at: string;
}

export interface InvestmentCategory {
  id: string;
  code: string;
  name_ja: string;
  name_en: string;
  name_zh: string;
  description_ja?: string;
  description_en?: string;
  description_zh?: string;
  created_at: string;
}

export interface PremiumProperty {
  id: string; // Format: KN-001, KN-002, etc.
  
  // Basic Information
  name: string;
  name_en?: string;
  name_zh?: string;
  property_type: PropertyType;
  
  // Pricing (JPY)
  price_jpy: number;
  price_per_tsubo?: number;
  
  // Date Information
  completion_date: string;
  completion_year?: number;
  
  // Structure Information
  structure: string;
  structure_type: StructureType;
  floors_above: number;
  floors_below: number;
  total_floors?: number;
  
  // Location
  location: string;
  prefecture: string;
  city: string;
  detailed_address?: string;
  latitude?: number;
  longitude?: number;
  
  // Access Information
  access_stations: AccessStation[];
  
  // Investment Metrics
  yield_expected?: number;
  yield_surface?: number;
  yield_actual?: number;
  annual_rent?: number;
  monthly_rent?: number;
  occupancy_rate: number;
  
  // Special Features (for filtering)
  has_iot: boolean;
  has_face_recognition: boolean;
  has_soundproof: boolean;
  soundproof_level?: string;
  soundproof_patent: boolean;
  is_minpaku_operating: boolean;
  has_rental_guarantee: boolean;
  rental_guarantee_until?: string;
  has_smart_home: boolean;
  has_automation: boolean;
  
  // Infrastructure Benefits
  near_park: boolean;
  multi_line_access: boolean;
  urban_planning_benefit: boolean;
  urban_planning_details?: string;
  
  // Building Details
  total_units?: number;
  parking_spaces?: number;
  elevator: boolean;
  auto_lock: boolean;
  delivery_box: boolean;
  
  // Features (array for badges)
  features: string[];
  features_ja: string[];
  features_en: string[];
  features_zh: string[];
  
  // Descriptions (multilingual)
  description?: string;
  description_ja?: string;
  description_en?: string;
  description_zh?: string;
  
  // Marketing Copy
  headline_ja?: string;
  headline_en?: string;
  headline_zh?: string;
  selling_points: string[];
  
  // Media
  image_urls: string[];
  floor_plan_urls: string[];
  video_urls: string[];
  
  // Contract & Legal
  management_company?: string;
  listing_company: string;
  transaction_type?: string;
  rental_contract_type?: string;
  
  // Status
  status: PropertyStatus;
  is_featured: boolean;
  is_premium: boolean;
  priority_order: number;
  
  // Analytics
  view_count: number;
  inquiry_count: number;
  favorite_count: number;
  
  // SEO
  seo_keywords: string[];
  seo_description?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  published_at?: string;
  deleted_at?: string;
  
  // Relations (populated via joins)
  special_features?: PropertySpecialFeature[];
  categories?: InvestmentCategory[];
}

export interface PropertyFilterParams {
  // Price range
  price_min?: number;
  price_max?: number;
  
  // Yield range
  yield_min?: number;
  yield_max?: number;
  
  // Location
  prefecture?: string;
  city?: string;
  
  // Completion date range
  completion_year_min?: number;
  completion_year_max?: number;
  
  // Structure
  structure_types?: StructureType[];
  
  // Special features (boolean filters)
  has_iot?: boolean;
  has_face_recognition?: boolean;
  has_soundproof?: boolean;
  is_minpaku_operating?: boolean;
  has_rental_guarantee?: boolean;
  has_smart_home?: boolean;
  near_park?: boolean;
  multi_line_access?: boolean;
  urban_planning_benefit?: boolean;
  
  // Feature codes (array filter)
  feature_codes?: string[];
  
  // Category codes (array filter)
  category_codes?: string[];
  
  // Status
  status?: PropertyStatus[];
  
  // Only featured
  featured_only?: boolean;
  
  // Sorting
  sort_by?: 'price_asc' | 'price_desc' | 'yield_desc' | 'completion_desc' | 'priority';
  
  // Pagination
  page?: number;
  limit?: number;
}

export interface PropertySearchResult {
  properties: PremiumProperty[];
  total_count: number;
  page: number;
  limit: number;
  total_pages: number;
  filters_applied: PropertyFilterParams;
}

export interface PropertyDetailView extends PremiumProperty {
  related_properties?: PremiumProperty[];
  similar_properties?: PremiumProperty[];
}

/**
 * Filter preset configurations for quick search
 */
export interface FilterPreset {
  id: string;
  name_ja: string;
  name_en: string;
  name_zh: string;
  description_ja: string;
  description_en: string;
  description_zh: string;
  icon: string;
  filters: Partial<PropertyFilterParams>;
}

export const FILTER_PRESETS: FilterPreset[] = [
  {
    id: 'minpaku_ready',
    name_ja: '民泊可能物件',
    name_en: 'Minpaku Ready',
    name_zh: '民宿可行物件',
    description_ja: '民泊運営が可能または運営中の物件',
    description_en: 'Properties suitable for vacation rental operations',
    description_zh: '可进行或正在进行民宿运营的房产',
    icon: '🏨',
    filters: {
      category_codes: ['minpaku_ready'],
      is_minpaku_operating: true,
    },
  },
  {
    id: 'high_tech',
    name_ja: '最新IoT設備',
    name_en: 'High-Tech IoT',
    name_zh: '最新IoT设备',
    description_ja: 'IoT、顔認証などの最新技術を搭載',
    description_en: 'Equipped with latest IoT and face recognition technology',
    description_zh: '配备IoT、人脸识别等最新技术',
    icon: '🤖',
    filters: {
      category_codes: ['high_tech'],
      has_iot: true,
    },
  },
  {
    id: 'soundproof',
    name_ja: '特殊防音物件',
    name_en: 'Soundproof Specialized',
    name_zh: '特殊隔音房产',
    description_ja: '音楽家や配信者向けの高性能防音構造',
    description_en: 'High-performance soundproofing for musicians and streamers',
    description_zh: '面向音乐家和主播的高性能隔音结构',
    icon: '🔇',
    filters: {
      category_codes: ['soundproof_spec'],
      has_soundproof: true,
    },
  },
  {
    id: 'new_construction',
    name_ja: '新築・準新築',
    name_en: 'New Construction',
    name_zh: '新建筑',
    description_ja: '2023年以降竣工の最新物件',
    description_en: 'Latest properties completed after 2023',
    description_zh: '2023年后竣工的最新房产',
    icon: '✨',
    filters: {
      category_codes: ['new_construction'],
      completion_year_min: 2023,
    },
  },
  {
    id: 'high_yield',
    name_ja: '高利回り物件',
    name_en: 'High Yield',
    name_zh: '高收益房产',
    description_ja: '表面利回り4%以上の高収益物件',
    description_en: 'High-yield properties with 4%+ surface yield',
    description_zh: '表面收益率4%以上的高收益房产',
    icon: '📈',
    filters: {
      yield_min: 4.0,
      sort_by: 'yield_desc',
    },
  },
  {
    id: 'future_potential',
    name_ja: '将来性の高い物件',
    name_en: 'High Potential',
    name_zh: '高成长性房产',
    description_ja: '都市計画などで資産価値向上が見込める',
    description_en: 'High appreciation potential from urban planning',
    description_zh: '因城市规划等因素资产价值有望提升',
    icon: '🏗️',
    filters: {
      category_codes: ['future_potential'],
      urban_planning_benefit: true,
    },
  },
];

/**
 * Property display card configuration
 */
export interface PropertyCardConfig {
  show_price: boolean;
  show_yield: boolean;
  show_location: boolean;
  show_features: boolean;
  show_badges: boolean;
  max_features: number;
  image_aspect_ratio: string;
}

export const DEFAULT_CARD_CONFIG: PropertyCardConfig = {
  show_price: true,
  show_yield: true,
  show_location: true,
  show_features: true,
  show_badges: true,
  max_features: 3,
  image_aspect_ratio: '16/9',
};
