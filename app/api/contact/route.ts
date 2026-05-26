import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { adminNotificationEmail, autoReplyEmail } from '@/lib/email-templates';

/**
 * 문의 폼 전송 API
 *
 * 환경변수:
 *  - RESEND_API_KEY: Resend API 키 (필수)
 *  - CONTACT_TO_EMAIL: 문의 메일을 받을 관리자 주소 (기본: miraesmtamerica@gmail.com)
 *    여러 명에게 동시 발송하려면 쉼표로 구분: "a@x.com,b@x.com,c@x.com"
 *  - CONTACT_FROM_EMAIL: 발신자 주소 (기본: onboarding@resend.dev)
 *
 * 발송 흐름:
 *  1. 관리자(들)에게 문의 알림 메일 발송 (한 번의 발송으로 모두에게 전달)
 *  2. 문의자에게 자동 응답 메일 발송 (locale에 따라 한/영)
 *
 * 자동 회신 실패는 전체 실패로 간주하지 않습니다 (관리자 메일이 성공하면 OK).
 */

function parseAdminEmails(): string[] {
  const raw = process.env.CONTACT_TO_EMAIL || 'miraesmtamerica@gmail.com';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[contact] RESEND_API_KEY is not configured');
      return NextResponse.json(
        { ok: false, error: 'Email service not configured' },
        { status: 500 },
      );
    }

    const body = await request.json();
    const {
      name,
      company,
      email,
      phone,
      subject,
      message,
      locale,
    } = body ?? {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email address' },
        { status: 400 },
      );
    }

    const inquiry = {
      name: String(name).trim().slice(0, 100),
      company: company ? String(company).trim().slice(0, 200) : undefined,
      email: String(email).trim().slice(0, 200),
      phone: phone ? String(phone).trim().slice(0, 50) : undefined,
      subject: String(subject).trim().slice(0, 200),
      message: String(message).trim().slice(0, 5000),
      locale: locale === 'en' ? ('en' as const) : ('ko' as const),
      submittedAt: new Date(),
    };

    const resend = new Resend(apiKey);
    const adminEmails = parseAdminEmails();

    const adminMail = adminNotificationEmail(inquiry);
    const adminResult = await resend.emails.send({
      from: `Mirae SMT Website <${FROM_EMAIL}>`,
      to: adminEmails,
      replyTo: inquiry.email,
      subject: adminMail.subject,
      html: adminMail.html,
      text: adminMail.text,
    });

    if (adminResult.error) {
      console.error('[contact] Failed to send admin notification:', adminResult.error);
      return NextResponse.json(
        { ok: false, error: 'Failed to send email' },
        { status: 500 },
      );
    }

    const autoMail = autoReplyEmail(inquiry);
    const autoResult = await resend.emails.send({
      from: `Mirae SMT <${FROM_EMAIL}>`,
      to: [inquiry.email],
      subject: autoMail.subject,
      html: autoMail.html,
      text: autoMail.text,
    });

    if (autoResult.error) {
      console.warn(
        '[contact] Auto-reply failed (admin notification succeeded):',
        autoResult.error,
      );
    }

    console.log('[contact] Inquiry sent successfully', {
      from: inquiry.email,
      subject: inquiry.subject,
      adminEmailId: adminResult.data?.id,
      autoReplyEmailId: autoResult.data?.id,
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
