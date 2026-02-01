import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

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

// Mock data for development
const MOCK_PROPERTIES = [
  {
    id: '1',
    property_name: 'サンプル物件1',
    property_type: '一棟マンション',
    price: 59800,
    address_prefecture: '東京都',
    address_city: '新宿区',
    address_town: '西早稲田',
    land_area_sqm: 135.3,
    land_area_tsubo: 40.93,
    building_area_sqm: 673,
    building_area_tsubo: 203.6,
    structure: 'RC造',
    construction_date: '1985-02-01',
    building_age_years: 41,
    yield_surface: 4.05,
    annual_rent: 2422,
    status: '販売中',
    property_stations: [
      {
        walk_time: 3,
        is_primary: true,
        station: { id: '1', station_name: '西早稲田', prefecture: '東京都', city: '新宿区' },
        line: { id: '1', line_name: '副都心線', company: '東京メトロ', line_color: '#9c5e31' }
      }
    ]
  },
  {
    id: '2',
    property_name: 'サンプル物件2',
    property_type: '一棟マンション',
    price: 42000,
    address_prefecture: '東京都',
    address_city: '新宿区',
    address_town: '中井２丁目',
    land_area_sqm: 78.52,
    land_area_tsubo: 23.75,
    building_area_sqm: 264.67,
    building_area_tsubo: 80.07,
    structure: 'RC造',
    construction_date: '2005-02-01',
    building_age_years: 21,
    yield_surface: 6.5,
    annual_rent: 2730,
    status: '販売中',
    property_stations: [
      {
        walk_time: 5,
        is_primary: true,
        station: { id: '2', station_name: '中井', prefecture: '東京都', city: '新宿区' },
        line: { id: '2', line_name: '西武新宿線', company: '西武鉄道', line_color: '#ffc20e' }
      }
    ]
  },
  {
    id: '3',
    property_name: 'サンプル物件3',
    property_type: '一棟ビル',
    price: 128000,
    address_prefecture: '東京都',
    address_city: '港区',
    address_town: '赤坂',
    land_area_sqm: 245.8,
    land_area_tsubo: 74.35,
    building_area_sqm: 890.5,
    building_area_tsubo: 269.4,
    structure: 'SRC造',
    construction_date: '1998-06-01',
    building_age_years: 28,
    yield_surface: 5.2,
    annual_rent: 6656,
    status: '販売中',
    property_stations: [
      {
        walk_time: 2,
        is_primary: true,
        station: { id: '3', station_name: '赤坂', prefecture: '東京都', city: '港区' },
        line: { id: '3', line_name: '千代田線', company: '東京メトロ', line_color: '#00bb85' }
      }
    ]
  }
];

export async function GET(request: NextRequest) {
  try {
    // If Supabase not configured, use mock data
    if (!supabase) {
      console.log('Using mock data - Supabase not configured');
      const searchParams = request.nextUrl.searchParams;
      const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20;
      
      return NextResponse.json({
        success: true,
        data: MOCK_PROPERTIES,
        pagination: {
          page,
          limit,
          total: MOCK_PROPERTIES.length,
          totalPages: 1,
        },
        filters: {},
        mock: true,
        message: 'モックデータを表示しています。Supabaseを設定すると実データが表示されます。'
      });
    }
    
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
