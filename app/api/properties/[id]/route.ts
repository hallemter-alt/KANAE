import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { requireAdmin, getServiceSupabase } from '@/lib/apiAuth'

// GET /api/properties/:id - 物件詳細取得（公開）
// ※物件情報は公開方針のため status に関係なく返す。
//   ただし問合せ・お気に入り・顧客情報（個人情報）は含めない。
//   それらを含む詳細は管理系エンドポイント（/api/crm/customers/:id 等）で取得すること。
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 })
  }

  try {
    const { id } = await params
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 })
      }
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch property', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ property: data })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/properties/:id - 物件更新（管理者専用）
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const supabase = getServiceSupabase()
  if (!supabase) {
    return NextResponse.json({ error: 'Database is not configured' }, { status: 503 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    // タイプのバリデーション
    if (body.type && !['rent', 'sale', 'minpaku'].includes(body.type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    // ステータスのバリデーション
    if (body.status && !['available', 'rented', 'sold', 'hidden'].includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    // データ更新
    const { data, error } = await supabase
      .from('properties')
      .update({
        title: body.title,
        type: body.type,
        price: body.price,
        monthly_rent: body.monthly_rent,
        initial_cost: body.initial_cost,
        address: body.address,
        area: body.area,
        rooms: body.rooms,
        image_urls: body.image_urls,
        description: body.description,
        status: body.status,
        features: body.features,
        nearest_station: body.nearest_station,
        walking_minutes: body.walking_minutes,
        floor: body.floor,
        building_age: body.building_age
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 })
      }
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to update property', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ property: data })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/properties/:id - 物件削除（管理者専用）
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const supabase = getServiceSupabase()
  if (!supabase) {
    return NextResponse.json({ error: 'Database is not configured' }, { status: 503 })
  }

  try {
    const { id } = await params
    const { error } = await supabase.from('properties').delete().eq('id', id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to delete property', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Property deleted successfully' })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
