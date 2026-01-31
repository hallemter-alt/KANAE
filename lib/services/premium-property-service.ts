/**
 * Premium Property Database Service
 * Handles all database operations for premium investment properties
 */

import { createClient } from '@supabase/supabase-js';
import type {
  PremiumProperty,
  PropertyFilterParams,
  PropertySearchResult,
  PropertySpecialFeature,
  InvestmentCategory,
} from '@/lib/types/premium-property';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if env vars are available
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Get all premium properties with optional filtering and pagination
 */
export async function getPremiumProperties(
  filters: PropertyFilterParams = {}
): Promise<PropertySearchResult> {
  // Return empty result if Supabase is not configured
  if (!supabase) {
    return {
      properties: [],
      total_count: 0,
      page: 1,
      limit: 12,
      total_pages: 0,
      filters_applied: filters,
    };
  }

  const {
    price_min,
    price_max,
    yield_min,
    yield_max,
    prefecture,
    city,
    completion_year_min,
    completion_year_max,
    structure_types,
    has_iot,
    has_face_recognition,
    has_soundproof,
    is_minpaku_operating,
    has_rental_guarantee,
    has_smart_home,
    near_park,
    multi_line_access,
    urban_planning_benefit,
    feature_codes,
    category_codes,
    status,
    featured_only,
    sort_by = 'priority',
    page = 1,
    limit = 12,
  } = filters;

  let query = supabase
    .from('premium_properties')
    .select('*', { count: 'exact' });

  // Apply filters
  if (price_min) query = query.gte('price_jpy', price_min);
  if (price_max) query = query.lte('price_jpy', price_max);
  if (yield_min) query = query.gte('yield_expected', yield_min);
  if (yield_max) query = query.lte('yield_expected', yield_max);
  if (prefecture) query = query.eq('prefecture', prefecture);
  if (city) query = query.eq('city', city);
  if (completion_year_min) query = query.gte('completion_year', completion_year_min);
  if (completion_year_max) query = query.lte('completion_year', completion_year_max);
  if (structure_types && structure_types.length > 0) {
    query = query.in('structure_type', structure_types);
  }

  // Boolean feature filters
  if (has_iot !== undefined) query = query.eq('has_iot', has_iot);
  if (has_face_recognition !== undefined) query = query.eq('has_face_recognition', has_face_recognition);
  if (has_soundproof !== undefined) query = query.eq('has_soundproof', has_soundproof);
  if (is_minpaku_operating !== undefined) query = query.eq('is_minpaku_operating', is_minpaku_operating);
  if (has_rental_guarantee !== undefined) query = query.eq('has_rental_guarantee', has_rental_guarantee);
  if (has_smart_home !== undefined) query = query.eq('has_smart_home', has_smart_home);
  if (near_park !== undefined) query = query.eq('near_park', near_park);
  if (multi_line_access !== undefined) query = query.eq('multi_line_access', multi_line_access);
  if (urban_planning_benefit !== undefined) query = query.eq('urban_planning_benefit', urban_planning_benefit);

  // Status filter
  if (status && status.length > 0) {
    query = query.in('status', status);
  } else {
    query = query.eq('status', 'available');
  }

  // Featured only filter
  if (featured_only) {
    query = query.eq('is_featured', true);
  }

  // Filter by feature codes (requires join or subquery)
  if (feature_codes && feature_codes.length > 0) {
    const { data: propertyIds } = await supabase
      .from('property_feature_mapping')
      .select('property_id')
      .in('feature_code', feature_codes);
    
    if (propertyIds) {
      const ids = [...new Set(propertyIds.map(p => p.property_id))];
      query = query.in('id', ids);
    }
  }

  // Filter by category codes
  if (category_codes && category_codes.length > 0) {
    const { data: propertyIds } = await supabase
      .from('property_category_mapping')
      .select('property_id')
      .in('category_code', category_codes);
    
    if (propertyIds) {
      const ids = [...new Set(propertyIds.map(p => p.property_id))];
      query = query.in('id', ids);
    }
  }

  // Apply sorting
  switch (sort_by) {
    case 'price_asc':
      query = query.order('price_jpy', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price_jpy', { ascending: false });
      break;
    case 'yield_desc':
      query = query.order('yield_expected', { ascending: false });
      break;
    case 'completion_desc':
      query = query.order('completion_date', { ascending: false });
      break;
    case 'priority':
    default:
      query = query.order('priority_order', { ascending: false })
                   .order('is_featured', { ascending: false })
                   .order('created_at', { ascending: false });
      break;
  }

  // Apply pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching premium properties:', error);
    throw error;
  }

  const properties = (data || []) as PremiumProperty[];
  const total_count = count || 0;
  const total_pages = Math.ceil(total_count / limit);

  return {
    properties,
    total_count,
    page,
    limit,
    total_pages,
    filters_applied: filters,
  };
}

/**
 * Get a single premium property by ID
 */
export async function getPremiumPropertyById(id: string): Promise<PremiumProperty | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('premium_properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching property:', error);
    return null;
  }

  // Increment view count
  await incrementPropertyView(id);

  return data as PremiumProperty;
}

/**
 * Get property with related features and categories
 */
export async function getPremiumPropertyWithDetails(id: string) {
  if (!supabase) return null;

  const property = await getPremiumPropertyById(id);
  if (!property) return null;

  // Get associated features
  const { data: featureMappings } = await supabase
    .from('property_feature_mapping')
    .select('feature_code, property_special_features(*)')
    .eq('property_id', id)
    .order('display_order');

  // Get associated categories
  const { data: categoryMappings } = await supabase
    .from('property_category_mapping')
    .select('category_code, investment_categories(*)')
    .eq('property_id', id);

  return {
    ...property,
    special_features: featureMappings?.map(m => m.property_special_features) || [],
    categories: categoryMappings?.map(m => m.investment_categories) || [],
  };
}

/**
 * Get all special features reference data
 */
export async function getSpecialFeatures(): Promise<PropertySpecialFeature[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('property_special_features')
    .select('*')
    .order('category')
    .order('code');

  if (error) {
    console.error('Error fetching special features:', error);
    return [];
  }

  return data as PropertySpecialFeature[];
}

/**
 * Get all investment categories reference data
 */
export async function getInvestmentCategories(): Promise<InvestmentCategory[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('investment_categories')
    .select('*')
    .order('code');

  if (error) {
    console.error('Error fetching investment categories:', error);
    return [];
  }

  return data as InvestmentCategory[];
}

/**
 * Increment property view count
 */
export async function incrementPropertyView(propertyId: string): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase.rpc('increment_property_view', {
    property_id_param: propertyId,
  });

  if (error) {
    console.error('Error incrementing view count:', error);
  }
}

/**
 * Get featured properties
 */
export async function getFeaturedProperties(limit: number = 4): Promise<PremiumProperty[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('premium_properties')
    .select('*')
    .eq('is_featured', true)
    .eq('status', 'available')
    .order('priority_order', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }

  return data as PremiumProperty[];
}

/**
 * Get similar properties based on price range and location
 */
export async function getSimilarProperties(
  propertyId: string,
  limit: number = 3
): Promise<PremiumProperty[]> {
  if (!supabase) return [];

  const property = await getPremiumPropertyById(propertyId);
  if (!property) return [];

  const priceRange = property.price_jpy * 0.2; // 20% range

  const { data, error } = await supabase
    .from('premium_properties')
    .select('*')
    .neq('id', propertyId)
    .eq('city', property.city)
    .gte('price_jpy', property.price_jpy - priceRange)
    .lte('price_jpy', property.price_jpy + priceRange)
    .eq('status', 'available')
    .limit(limit);

  if (error) {
    console.error('Error fetching similar properties:', error);
    return [];
  }

  return data as PremiumProperty[];
}

/**
 * Search properties by keyword (name, location, description)
 */
export async function searchProperties(keyword: string, limit: number = 10): Promise<PremiumProperty[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('premium_properties')
    .select('*')
    .or(`name.ilike.%${keyword}%,location.ilike.%${keyword}%,description_ja.ilike.%${keyword}%`)
    .eq('status', 'available')
    .limit(limit);

  if (error) {
    console.error('Error searching properties:', error);
    return [];
  }

  return data as PremiumProperty[];
}

/**
 * Record property search for analytics
 */
export async function recordPropertySearch(
  sessionId: string,
  filters: PropertyFilterParams,
  resultCount: number
): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase
    .from('premium_property_searches')
    .insert({
      session_id: sessionId,
      filters,
      result_count: resultCount,
    });

  if (error) {
    console.error('Error recording search:', error);
  }
}
