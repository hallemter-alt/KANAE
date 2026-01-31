import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('railway_lines')
      .select('*')
      .order('company', { ascending: true })
      .order('line_name', { ascending: true });
    
    if (error) {
      console.error('Error fetching railway lines:', error);
      return NextResponse.json(
        { error: '路線データの取得に失敗しました' },
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
