import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// 管理系API用の認証ガード（Bearer トークン方式）
// Vercel 環境変数 ADMIN_API_KEY を設定すること。
// 未設定の場合は全ての管理系リクエストを拒否する（フェイルクローズ）。
export function requireAdmin(request: NextRequest): NextResponse | null {
  const adminKey = process.env.ADMIN_API_KEY
  if (!adminKey) {
    return NextResponse.json(
      { error: 'Admin API is not configured' },
      { status: 503 }
    )
  }

  const header = request.headers.get('authorization') ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token || token !== adminKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return null
}

// 管理系API用 Supabase クライアント（service role：RLS をバイパス）
// ※サーバーサイド専用。クライアントバンドルに含めないこと。
let serviceClient: SupabaseClient | null = null

export function getServiceSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    return null
  }
  if (!serviceClient) {
    serviceClient = createClient(url, serviceKey, {
      auth: { persistSession: false },
    })
  }
  return serviceClient
}
