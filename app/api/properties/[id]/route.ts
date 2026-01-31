import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    const { data, error } = await supabase
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
            city,
            latitude,
            longitude
          ),
          line:railway_lines (
            id,
            line_name,
            company,
            line_color
          )
        )
      `)
      .eq('id', id)
      .eq('status', '販売中')
      .is('deleted_at', null)
      .single();
    
    if (error) {
      console.error('Error fetching property:', error);
      return NextResponse.json(
        { error: '物件データの取得に失敗しました' },
        { status: 404 }
      );
    }
    
    // 閲覧数をインクリメント（非同期）
    supabase
      .from('properties')
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('id', id)
      .then(() => {});
    
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
