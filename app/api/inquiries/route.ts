import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin, getServiceSupabase } from '@/lib/apiAuth'
import { parsePage, parseLimit } from '@/lib/apiUtils'

// GET /api/inquiries - 問合せ一覧取得（管理者専用：個人情報を含む）
export async function GET(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const supabase = getServiceSupabase()
  if (!supabase) {
    return NextResponse.json({ error: 'Database is not configured' }, { status: 503 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const page = parsePage(searchParams.get('page'))
    const limit = parseLimit(searchParams.get('limit'))
    const offset = (page - 1) * limit

    // クエリビルダー
    let query = supabase
      .from('inquiries')
      .select(`
        *,
        customer:customers (*),
        property:properties (*)
      `, { count: 'exact' })

    // フィルター適用
    if (status) {
      query = query.eq('status', status)
    }
    if (type) {
      query = query.eq('type', type)
    }

    // ページネーション
    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch inquiries', details: error.message }, { status: 500 })
    }

    return NextResponse.json({
      inquiries: data || [],
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
