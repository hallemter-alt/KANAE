import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface PropertySearchParams {
  // エリア検索
  prefecture?: string;
  city?: string;
  
  // 路線・駅検索
  lineId?: string;
  stationId?: string;
  maxWalkTime?: number; // 徒歩時間（分）
  
  // 価格検索
  minPrice?: number;
  maxPrice?: number;
  
  // 面積検索
  minLandArea?: number; // ㎡
  maxLandArea?: number;
  minBuildingArea?: number;
  maxBuildingArea?: number;
  
  // 利回り検索
  minYield?: number; // %
  maxYield?: number;
  
  // 物件タイプ
  propertyType?: string; // '一棟マンション', '一棟ビル'等
  
  // 築年数
  maxBuildingAge?: number; // 年
  
  // ソート
  sortBy?: 'price' | 'yield_surface' | 'land_area_sqm' | 'building_area_sqm' | 'walk_time' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  
  // ページネーション
  page?: number;
  limit?: number;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // パラメータを取得
    const params: PropertySearchParams = {
      prefecture: searchParams.get('prefecture') || undefined,
      city: searchParams.get('city') || undefined,
      lineId: searchParams.get('lineId') || undefined,
      stationId: searchParams.get('stationId') || undefined,
      maxWalkTime: searchParams.get('maxWalkTime') ? parseInt(searchParams.get('maxWalkTime')!) : undefined,
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
      minLandArea: searchParams.get('minLandArea') ? parseFloat(searchParams.get('minLandArea')!) : undefined,
      maxLandArea: searchParams.get('maxLandArea') ? parseFloat(searchParams.get('maxLandArea')!) : undefined,
      minBuildingArea: searchParams.get('minBuildingArea') ? parseFloat(searchParams.get('minBuildingArea')!) : undefined,
      maxBuildingArea: searchParams.get('maxBuildingArea') ? parseFloat(searchParams.get('maxBuildingArea')!) : undefined,
      minYield: searchParams.get('minYield') ? parseFloat(searchParams.get('minYield')!) : undefined,
      maxYield: searchParams.get('maxYield') ? parseFloat(searchParams.get('maxYield')!) : undefined,
      propertyType: searchParams.get('propertyType') || undefined,
      maxBuildingAge: searchParams.get('maxBuildingAge') ? parseInt(searchParams.get('maxBuildingAge')!) : undefined,
      sortBy: (searchParams.get('sortBy') as any) || 'created_at',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc',
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
    };
    
    // クエリを構築
    let query = supabase
      .from('properties')
      .select(`
        *,
        property_stations (
          walk_time,
          distance_meters,
          is_primary,
          station:stations (
            id,
            station_name,
            prefecture,
            city
          ),
          line:railway_lines (
            id,
            line_name,
            company,
            line_color
          )
        )
      `, { count: 'exact' })
      .eq('status', '販売中')
      .is('deleted_at', null);
    
    // エリア検索
    if (params.prefecture) {
      query = query.eq('address_prefecture', params.prefecture);
    }
    if (params.city) {
      query = query.eq('address_city', params.city);
    }
    
    // 価格検索
    if (params.minPrice) {
      query = query.gte('price', params.minPrice);
    }
    if (params.maxPrice) {
      query = query.lte('price', params.maxPrice);
    }
    
    // 面積検索
    if (params.minLandArea) {
      query = query.gte('land_area_sqm', params.minLandArea);
    }
    if (params.maxLandArea) {
      query = query.lte('land_area_sqm', params.maxLandArea);
    }
    if (params.minBuildingArea) {
      query = query.gte('building_area_sqm', params.minBuildingArea);
    }
    if (params.maxBuildingArea) {
      query = query.lte('building_area_sqm', params.maxBuildingArea);
    }
    
    // 利回り検索
    if (params.minYield) {
      query = query.gte('yield_surface', params.minYield);
    }
    if (params.maxYield) {
      query = query.lte('yield_surface', params.maxYield);
    }
    
    // 物件タイプ
    if (params.propertyType) {
      query = query.eq('property_type', params.propertyType);
    }
    
    // 築年数
    if (params.maxBuildingAge) {
      query = query.lte('building_age_years', params.maxBuildingAge);
    }
    
    // ソート
    const ascending = params.sortOrder === 'asc';
    const sortBy = params.sortBy || 'created_at';
    query = query.order(sortBy, { ascending });
    
    // ページネーション
    const from = (params.page! - 1) * params.limit!;
    const to = from + params.limit! - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Search error:', error);
      return NextResponse.json(
        { error: 'データの取得に失敗しました', details: error.message },
        { status: 500 }
      );
    }
    
    // 路線・駅での絞り込み（クライアント側で実施）
    let filteredData = data;
    if (params.stationId || params.lineId || params.maxWalkTime) {
      filteredData = data?.filter((property: any) => {
        const stations = property.property_stations || [];
        
        if (stations.length === 0) return false;
        
        return stations.some((ps: any) => {
          let match = true;
          
          if (params.stationId && ps.station?.id !== params.stationId) {
            match = false;
          }
          if (params.lineId && ps.line?.id !== params.lineId) {
            match = false;
          }
          if (params.maxWalkTime && ps.walk_time > params.maxWalkTime) {
            match = false;
          }
          
          return match;
        });
      });
    }
    
    // 検索履歴を保存（非同期）
    supabase.from('search_history').insert({
      search_params: params,
      results_count: filteredData?.length || 0,
    }).then(() => {});
    
    return NextResponse.json({
      success: true,
      data: filteredData,
      pagination: {
        page: params.page,
        limit: params.limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / params.limit!),
      },
      filters: params,
    });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
