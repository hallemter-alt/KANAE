import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { requireAdmin, getServiceSupabase } from '@/lib/apiAuth'
import { sanitizeSearch, parsePage, parseLimit } from '@/lib/apiUtils'

export const runtime = 'nodejs' // Supabase需要Node.js runtime
export const dynamic = 'force-dynamic' // 始終動態生成

// 公開向けソート可能カラムのホワイトリスト
const SORTABLE_COLUMNS = ['created_at', 'price', 'monthly_rent', 'area', 'building_age'] as const

// GET /api/properties - 物件一覧取得・検索（公開）
// status パラメータで絞り込み可能（デフォルト available）。物件情報は公開方針。
export async function GET(request: NextRequest) {
  // データベース未設定時は空のリストを返す（グレースフルデグラデーション）
  if (!isSupabaseConfigured) {
    return NextResponse.json({
      success: true,
      properties: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      notice: 'Database is not configured yet.'
    })
  }

  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const rooms = searchParams.get('rooms')
    const status = searchParams.get('status') || 'available'
    const search = sanitizeSearch(searchParams.get('search'))
    const page = parsePage(searchParams.get('page'))
    const limit = parseLimit(searchParams.get('limit'))
    const offset = (page - 1) * limit

    // ソート指定はホワイトリストで検証（任意カラム名の注入防止）
    const sortRaw = searchParams.get('sort') || 'created_at'
    const sort = (SORTABLE_COLUMNS as readonly string[]).includes(sortRaw) ? sortRaw : 'created_at'
    const ascending = searchParams.get('order') === 'asc'

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
      const n = parseFloat(minPrice)
      if (Number.isFinite(n)) query = query.gte('price', n)
    }
    if (maxPrice) {
      const n = parseFloat(maxPrice)
      if (Number.isFinite(n)) query = query.lte('price', n)
    }
    if (rooms) {
      query = query.eq('rooms', rooms)
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,address.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // ソート & ページネーション
    query = query.order(sort, { ascending }).range(offset, offset + limit - 1)

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

// POST /api/properties - 物件新規登録（管理者専用）
export async function POST(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const supabase = getServiceSupabase()
  if (!supabase) {
    return NextResponse.json({ error: 'Database is not configured' }, { status: 503 })
  }

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

    // ステータスのバリデーション
    if (body.status && !['available', 'rented', 'sold', 'hidden'].includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
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
