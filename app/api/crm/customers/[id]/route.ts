import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/crm/customers/:id - 顧客詳細取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select(`
        *,
        inquiries (*),
        property_favorites (
          *,
          property:properties (*)
        )
      `)
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
      }
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch customer', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ customer: data })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/crm/customers/:id - 顧客更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // メールアドレスのバリデーション
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
      }
    }

    // タイプのバリデーション
    if (body.type && !['rent', 'sale', 'minpaku'].includes(body.type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    // ステータスのバリデーション
    if (body.status && !['active', 'inactive'].includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    // データ更新
    const { data, error } = await supabase
      .from('customers')
      .update({
        name: body.name,
        name_kana: body.name_kana,
        email: body.email,
        phone: body.phone,
        address: body.address,
        notes: body.notes,
        type: body.type,
        status: body.status
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
      }
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
      }
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to update customer', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ customer: data })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/crm/customers/:id - 顧客削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase.from('customers').delete().eq('id', params.id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to delete customer', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Customer deleted successfully' })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
