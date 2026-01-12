import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          missingFields,
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    // In a real app, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Trigger other workflows

    // Simulate processing
    const contactSubmission = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      message: body.message,
      propertyId: body.propertyId || null,
      type: body.type || 'general', // inquiry, viewing, purchase, etc.
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    // Log to console (in production, use proper logging)
    console.log('Contact form submission:', contactSubmission);

    return NextResponse.json({
      success: true,
      message: 'お問い合わせありがとうございます。担当者より3営業日以内にご連絡いたします。',
      submissionId: contactSubmission.id,
    }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'サーバーエラーが発生しました。後ほど再度お試しください。',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Please use POST.',
  }, { status: 405 });
}
