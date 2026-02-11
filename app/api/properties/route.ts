import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Edge Runtime 配置以獲得更快的響應
export const runtime = 'nodejs' // Supabase需要Node.js runtime
export const dynamic = 'force-dynamic' // 始終動態生成

// GET /api/properties - 物件一覧取得・検索
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const rooms = searchParams.get('rooms')
    const status = searchParams.get('status') || 'available'
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // クエリビルダー
    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .eq('status', status)

    // フィルター適用
    if (type) {
      query = query.eq('type', type)
    }
    if (minPrice) {
      query = query.gte('price', parseFloat(minPrice))
    }
    if (maxPrice) {
      query = query.lte('price', parseFloat(maxPrice))
    }
    if (rooms) {
      query = query.eq('rooms', rooms)
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,address.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // ソート
    const ascending = order === 'asc'
    query = query.order(sort, { ascending })

    // ページネーション
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch properties', details: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      properties: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/properties - 物件新規登録
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // バリデーション
    if (!body.title || !body.price || !body.type || !body.address) {
      return NextResponse.json(
        { error: 'Missing required fields: title, price, type, address' },
        { status: 400 }
      )
    }

    // タイプのバリデーション
    if (!['rent', 'sale', 'minpaku'].includes(body.type)) {
      return NextResponse.json({ error: 'Invalid type. Must be rent, sale, or minpaku' }, { status: 400 })
    }

    // データ挿入
    const { data, error } = await supabase
      .from('properties')
      .insert({
        title: body.title,
        type: body.type,
        price: body.price,
        monthly_rent: body.monthly_rent,
        initial_cost: body.initial_cost,
        address: body.address,
        area: body.area,
        rooms: body.rooms,
        image_urls: body.image_urls || [],
        description: body.description,
        status: body.status || 'available',
        features: body.features || [],
        nearest_station: body.nearest_station,
        walking_minutes: body.walking_minutes,
        floor: body.floor,
        building_age: body.building_age
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to create property', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, property: data }, { status: 201 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
