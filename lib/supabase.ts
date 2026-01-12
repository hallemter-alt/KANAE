import { createClient } from '@supabase/supabase-js'

// Supabase の URL と anon キーは環境変数から取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (Supabase で自動生成可能)
export type Customer = {
  id: string
  name: string
  name_kana?: string
  email: string
  phone?: string
  address?: string
  notes?: string
  type: 'rent' | 'sale' | 'minpaku'
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export type Property = {
  id: string
  title: string
  type: 'rent' | 'sale' | 'minpaku'
  price: number
  monthly_rent?: number
  initial_cost?: number
  address: string
  area?: number
  rooms?: string
  image_urls: string[]
  description?: string
  status: 'available' | 'rented' | 'sold' | 'hidden'
  features?: string[]
  nearest_station?: string
  walking_minutes?: number
  floor?: number
  building_age?: number
  created_at: string
  updated_at: string
}

export type Inquiry = {
  id: string
  customer_id?: string
  property_id?: string
  name: string
  email: string
  phone?: string
  type: 'viewing' | 'inquiry' | 'application'
  message: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}
