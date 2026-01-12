import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/crm/customers - 顧客一覧取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // クエリビルダー
    let query = supabase.from('customers').select('*', { count: 'exact' })

    // フィルター適用
    if (type) {
      query = query.eq('type', type)
    }
    if (status) {
      query = query.eq('status', status)
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
    }

    // ページネーション
    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch customers', details: error.message }, { status: 500 })
    }

    return NextResponse.json({
      customers: data || [],
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

// POST /api/crm/customers - 顧客新規登録
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // バリデーション
    if (!body.name || !body.email || !body.type) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, type' },
        { status: 400 }
      )
    }

    // メールアドレスのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // タイプのバリデーション
    if (!['rent', 'sale', 'minpaku'].includes(body.type)) {
      return NextResponse.json({ error: 'Invalid type. Must be rent, sale, or minpaku' }, { status: 400 })
    }

    // データ挿入
    const { data, error } = await supabase
      .from('customers')
      .insert({
        name: body.name,
        name_kana: body.name_kana,
        email: body.email,
        phone: body.phone,
        address: body.address,
        notes: body.notes,
        type: body.type,
        status: body.status || 'active'
      })
      .select()
      .single()

    if (error) {
      // メールアドレス重複エラー
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
      }
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to create customer', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ customer: data }, { status: 201 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
