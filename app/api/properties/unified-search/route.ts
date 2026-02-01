/**
 * Unified Property Search API
 * Handles both residential and investment properties
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { PropertyFilterParams } from '@/lib/types/premium-property';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'データベース設定が完了していません。環境変数を確認してください。' },
        { status: 503 }
      );
    }
    
    const searchParams = request.nextUrl.searchParams;
    
    // Get search parameters
    const type = searchParams.get('type'); // 'all', 'residential', 'investment'
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    
    // Price range
    const price_min = searchParams.get('price_min') ? parseInt(searchParams.get('price_min')!) : undefined;
    const price_max = searchParams.get('price_max') ? parseInt(searchParams.get('price_max')!) : undefined;
    
    // Yield range (investment properties only)
    const yield_min = searchParams.get('yield_min') ? parseFloat(searchParams.get('yield_min')!) : undefined;
    const yield_max = searchParams.get('yield_max') ? parseFloat(searchParams.get('yield_max')!) : undefined;
    
    // Location
    const city = searchParams.get('city') || undefined;
    
    // Completion year
    const completion_year_min = searchParams.get('completion_year_min') ? parseInt(searchParams.get('completion_year_min')!) : undefined;
    const completion_year_max = searchParams.get('completion_year_max') ? parseInt(searchParams.get('completion_year_max')!) : undefined;
    
    // Special features (investment properties only)
    const has_iot = searchParams.get('has_iot') === 'true';
    const has_face_recognition = searchParams.get('has_face_recognition') === 'true';
    const has_soundproof = searchParams.get('has_soundproof') === 'true';
    const is_minpaku_operating = searchParams.get('is_minpaku_operating') === 'true';
    const has_rental_guarantee = searchParams.get('has_rental_guarantee') === 'true';
    const has_smart_home = searchParams.get('has_smart_home') === 'true';
    const near_park = searchParams.get('near_park') === 'true';
    const multi_line_access = searchParams.get('multi_line_access') === 'true';
    const urban_planning_benefit = searchParams.get('urban_planning_benefit') === 'true';
    
    // Sort
    const sort_by = searchParams.get('sort_by') || 'priority';
    
    // Build query based on property type
    let query = supabase
      .from(type === 'investment' ? 'premium_properties' : 'properties')
      .select('*', { count: 'exact' })
      .eq('status', type === 'investment' ? '販売中' : '販売中')
      .is('deleted_at', null);
    
    // Apply filters
    if (price_min) {
      query = query.gte('price', price_min);
    }
    if (price_max) {
      query = query.lte('price', price_max);
    }
    
    if (city) {
      query = query.eq(type === 'investment' ? 'address_city' : 'address_city', city);
    }
    
    // Investment-specific filters
    if (type === 'investment') {
      if (yield_min) {
        query = query.gte('yield_surface', yield_min);
      }
      if (yield_max) {
        query = query.lte('yield_surface', yield_max);
      }
      
      if (completion_year_min) {
        query = query.gte('completion_year', completion_year_min);
      }
      if (completion_year_max) {
        query = query.lte('completion_year', completion_year_max);
      }
      
      // Special features
      if (has_iot) query = query.eq('has_iot_system', true);
      if (has_face_recognition) query = query.eq('has_face_recognition', true);
      if (has_soundproof) query = query.eq('has_soundproof_structure', true);
      if (is_minpaku_operating) query = query.eq('is_minpaku_operating', true);
      if (has_rental_guarantee) query = query.eq('has_rental_guarantee_contract', true);
      if (has_smart_home) query = query.eq('has_smart_home', true);
      if (near_park) query = query.eq('near_park', true);
      if (multi_line_access) query = query.eq('multi_line_access', true);
      if (urban_planning_benefit) query = query.eq('urban_planning_benefit', true);
    }
    
    // Sorting
    let ascending = false;
    let orderBy = 'created_at';
    
    switch (sort_by) {
      case 'price_asc':
        orderBy = 'price';
        ascending = true;
        break;
      case 'price_desc':
        orderBy = 'price';
        ascending = false;
        break;
      case 'yield_desc':
        if (type === 'investment') {
          orderBy = 'yield_surface';
          ascending = false;
        }
        break;
      case 'completion_desc':
        orderBy = type === 'investment' ? 'completion_date' : 'construction_date';
        ascending = false;
        break;
      default:
        // Priority order: featured first, then by creation date
        orderBy = 'created_at';
        ascending = false;
    }
    
    query = query.order(orderBy, { ascending });
    
    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Search error:', error);
      return NextResponse.json(
        { error: 'データの取得に失敗しました', details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      properties: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
