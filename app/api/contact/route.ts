import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { escapeHtml, toSingleLine } from '@/lib/apiUtils'
import {
  businesses,
  CONTACT_EMAIL,
  formatInquiry,
  validateInquiry,
} from '@/lib/contact'

const unavailable = () =>
  NextResponse.json(
    {
      success: false,
      error:
        'Unable to accept inquiry. Please contact info@kanae-tokyo.com or 03-6914-3633.',
    },
    { status: 503 }
  )

export async function POST(request: NextRequest) {
  // Bound the payload before validation; never expose provider errors or customer records.
  if (Number(request.headers.get('content-length')) > 24000) {
    return NextResponse.json(
      { success: false, error: 'Request too large' },
      { status: 413 }
    )
  }
  let body: unknown
  try {
    const raw = await request.text()
    if (new TextEncoder().encode(raw).length > 24000) {
      return NextResponse.json(
        { success: false, error: 'Request too large' },
        { status: 413 }
      )
    }
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON' },
      { status: 400 }
    )
  }
  const validation = validateInquiry(body)
  if (validation.errors) {
    return NextResponse.json(
      { success: false, error: 'Invalid inquiry', fields: validation.errors },
      { status: 400 }
    )
  }
  const input = validation.data
  const message = formatInquiry(input)
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!isSupabaseConfigured && !apiKey) return unavailable()

  let stored = false
  let emailAccepted = false
  if (isSupabaseConfigured) {
    try {
      // No .select(): public inserts must not require permission to read inquiries.
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          type: input.type,
          message,
          ...(input.property_id ? { property_id: input.property_id } : {}),
          status: 'pending',
        })
        .abortSignal(AbortSignal.timeout(8000))
      stored = !error
      if (error)
        console.error('Contact: database insert failed', { code: error.code })
    } catch {
      console.error('Contact: database unavailable')
    }
  }

  if (apiKey) {
    try {
      const business = businesses.find((item) => item.value === input.business)!
      const text = [
        `お名前: ${input.name}`,
        `メールアドレス: ${input.email}`,
        ...(input.phone ? [`電話番号: ${input.phone}`] : []),
        ...(input.property_id ? [`物件ID: ${input.property_id}`] : []),
        '',
        message,
        '',
        `送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })} (JST)`,
      ].join('\n')
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          from:
            process.env.RESEND_FROM_EMAIL?.trim() || 'no-reply@kanae-tokyo.com',
          // All business inquiries go to the single company inbox, not a client-supplied address.
          to: CONTACT_EMAIL,
          reply_to: input.email,
          subject: `【新規問合せ／${business.label.ja}】${toSingleLine(input.name)}様より`,
          text,
          html: `<h2>新規お問い合わせ</h2><p>${escapeHtml(text).replace(/\n/g, '<br>')}</p>`,
        }),
      })
      if (response.ok) {
        const result = await response.json()
        emailAccepted = typeof result?.id === 'string' && result.id.length > 0
        if (!emailAccepted)
          console.error('Contact: email provider returned no message ID')
      } else {
        console.error('Contact: email provider rejected request', {
          status: response.status,
        })
      }
    } catch {
      console.error('Contact: email notification could not be confirmed')
    }
  }

  if (!stored && !emailAccepted) return unavailable()
  // Accepted by the provider is not the same as delivered to the recipient's inbox.
  return NextResponse.json(
    {
      success: true,
      delivery: emailAccepted ? 'email_accepted' : 'stored_only',
    },
    { status: emailAccepted ? 201 : 202 }
  )
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Please use POST.' },
    {
      status: 405,
      headers: { Allow: 'POST' },
    }
  )
}
