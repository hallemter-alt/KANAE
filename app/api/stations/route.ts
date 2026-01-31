import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lineId = searchParams.get('lineId');
    const prefecture = searchParams.get('prefecture');
    const city = searchParams.get('city');
    
    let query = supabase
      .from('stations')
      .select(`
        *,
        line:railway_lines (
          id,
          line_name,
          company,
          line_color
        )
      `)
      .order('station_name', { ascending: true });
    
    if (lineId) {
      query = query.eq('line_id', lineId);
    }
    if (prefecture) {
      query = query.eq('prefecture', prefecture);
    }
    if (city) {
      query = query.eq('city', city);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching stations:', error);
      return NextResponse.json(
        { error: '駅データの取得に失敗しました' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
