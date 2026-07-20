import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { escapeHtml, toSingleLine } from '@/lib/apiUtils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'email', 'message']
    const missingFields = requiredFields.filter(field => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          missingFields,
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        { status: 400 }
      )
    }

    // Validate inquiry type
    const validTypes = ['viewing', 'inquiry', 'application', 'other']
    const inquiryType = body.type || 'inquiry'
    // 'other' はDBのENUM型に合わせて 'inquiry' として保存するが、バリデーションは通す
    const dbInquiryType = inquiryType === 'other' ? 'inquiry' : inquiryType
    if (!validTypes.includes(inquiryType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid inquiry type' },
        { status: 400 }
      )
    }

    // DB・メールのいずれのチャネルも利用できない場合、問合せは保存されない。
    // 成功を装わず 503 を返し、ユーザーに電話・メールでの代替連絡を促す。
    if (!isSupabaseConfigured && !process.env.RESEND_API_KEY) {
      console.error('Contact form: neither Supabase nor Resend is configured. Inquiry cannot be persisted.')
      return NextResponse.json(
        {
          success: false,
          error: '現在お問い合わせフォームはご利用いただけません。お手数ですが、お電話（03-6914-3633）またはメール（info@kanae-tokyo.com）にてご連絡ください。',
        },
        { status: 503 }
      )
    }

    // Save to database (if configured)
    let data = null
    if (isSupabaseConfigured) {
      const { data: inserted, error } = await supabase
        .from('inquiries')
        .insert({
          name: body.name,
          email: body.email,
          phone: body.phone,
          type: dbInquiryType,
          message: body.message,
          property_id: body.property_id,
          customer_id: body.customer_id,
          status: 'pending'
        })
        .select()
        .single()

      if (error) {
        console.error('Database error:', error)
        // メール送信が可能なら続行、不可能ならエラー
        if (!process.env.RESEND_API_KEY) {
          return NextResponse.json(
            { success: false, error: 'Failed to save inquiry', details: error.message },
            { status: 500 }
          )
        }
      } else {
        data = inserted
      }
    }

    // Send email notification (optional, requires Resend API key)
    if (process.env.RESEND_API_KEY) {
      // ユーザー入力は全てエスケープしてからテンプレートに埋め込む（HTMLインジェクション対策）
      const safeName = escapeHtml(body.name)
      const safeEmail = escapeHtml(body.email)
      const safePhone = escapeHtml(body.phone)
      const safePropertyId = escapeHtml(body.property_id)
      const safeMessage = escapeHtml(body.message).replace(/\n/g, '<br>')
      const safeSubjectName = toSingleLine(body.name).slice(0, 100)

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'no-reply@kanae-tokyo.com',
            to: process.env.CONTACT_EMAIL || 'info@kanae-tokyo.com',
            subject: `【新規問合せ】${safeSubjectName}様より`,
            html: `
              <h2>新規問合せがありました</h2>
              <p><strong>お名前：</strong>${safeName}</p>
              <p><strong>メールアドレス：</strong>${safeEmail}</p>
              ${safePhone ? `<p><strong>電話番号：</strong>${safePhone}</p>` : ''}
              <p><strong>問合せ種別：</strong>${escapeHtml(inquiryType)}</p>
              ${safePropertyId ? `<p><strong>物件ID：</strong>${safePropertyId}</p>` : ''}
              <p><strong>メッセージ：</strong></p>
              <p>${safeMessage}</p>
              <hr>
              <p><small>送信日時：${new Date().toLocaleString('ja-JP')}</small></p>
            `,
          }),
        })
        console.log('✅ Email notification sent successfully')
      } catch (emailError) {
        console.error('⚠️ Email sending failed:', emailError)
        // メール送信失敗してもエラーにしない（DBには保存済み）
      }
    } else {
      console.log('⚠️ Resend API key not configured. Email notification skipped.')
    }

    return NextResponse.json({
      success: true,
      message: 'お問い合わせありがとうございます。担当者より3営業日以内にご連絡いたします。',
      inquiry: data,
    }, { status: 201 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'サーバーエラーが発生しました。後ほど再度お試しください。',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Please use POST.',
  }, { status: 405 });
}
