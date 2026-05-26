import { NextResponse } from 'next/server';

/**
 * 문의 폼 전송 API
 *
 * TODO: 실제 운영 환경에서는 아래 중 하나를 연결하세요.
 *  - Resend (https://resend.com) → RESEND_API_KEY 환경변수 설정
 *  - SMTP (nodemailer) → SMTP_HOST, SMTP_USER, SMTP_PASS 환경변수 설정
 *  - Slack / Teams webhook
 *
 * 현재는 콘솔에 로그만 남기고 성공 응답을 반환합니다.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 },
      );
    }

    console.log('[contact] New inquiry received:', {
      name,
      company,
      email,
      phone,
      subject,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] Failed to process inquiry:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}
