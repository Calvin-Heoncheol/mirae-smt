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
 */

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = /\.(pdf|dwg|zip|png|jpe?g)$/i;

const PRODUCT_TYPE_LABELS = {
  ko: {
    smt: 'SMT 실장',
    pcb: 'PCB 조립',
    assembly: '완제품 조립',
    full: '전 공정 (SMT ~ 출하)',
    other: '기타',
  },
  en: {
    smt: 'SMT Placement',
    pcb: 'PCB Assembly',
    assembly: 'Final Product Assembly',
    full: 'Full Process (SMT to Shipment)',
    other: 'Other',
  },
} as const;

const PRODUCT_TYPE_FALLBACK = {
  ko: '미지정',
  en: 'Not specified',
} as const;

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

function getLabel<T extends Record<string, string>>(
  map: T,
  key: string,
): string {
  return key in map ? map[key as keyof T] : key;
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

    const formData = await request.formData();
    const name = formData.get('name');
    const company = formData.get('company');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const productType = formData.get('productType');
    const quantity = formData.get('quantity');
    const targetDelivery = formData.get('targetDelivery');
    const message = formData.get('message');
    const locale = formData.get('locale');
    const attachment = formData.get('attachment');

    if (
      !name ||
      !email ||
      !message ||
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string'
    ) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email address' },
        { status: 400 },
      );
    }

    const inquiryLocale = locale === 'en' ? ('en' as const) : ('ko' as const);
    const productTypeLabel =
      typeof productType === 'string' && productType.trim().length > 0
        ? getLabel(PRODUCT_TYPE_LABELS[inquiryLocale], productType)
        : PRODUCT_TYPE_FALLBACK[inquiryLocale];

    let attachmentData:
      | { filename: string; content: Buffer }
      | undefined;

    if (attachment instanceof File && attachment.size > 0) {
      if (attachment.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { ok: false, error: 'Attachment too large' },
          { status: 400 },
        );
      }

      if (!ALLOWED_FILE_EXTENSIONS.test(attachment.name)) {
        return NextResponse.json(
          { ok: false, error: 'Invalid attachment type' },
          { status: 400 },
        );
      }

      const buffer = Buffer.from(await attachment.arrayBuffer());
      attachmentData = {
        filename: attachment.name.slice(0, 200),
        content: buffer,
      };
    }

    const inquiry = {
      name: name.trim().slice(0, 100),
      company:
        typeof company === 'string' ? company.trim().slice(0, 200) : undefined,
      email: email.trim().slice(0, 200),
      phone:
        typeof phone === 'string' ? phone.trim().slice(0, 50) : undefined,
      subject: `[${productTypeLabel}] ${name.trim().slice(0, 80)}`,
      productType: productTypeLabel,
      quantity:
        typeof quantity === 'string' ? quantity.trim().slice(0, 100) : undefined,
      targetDelivery:
        typeof targetDelivery === 'string'
          ? targetDelivery.trim().slice(0, 100)
          : undefined,
      message: message.trim().slice(0, 5000),
      attachmentName: attachmentData?.filename,
      locale: inquiryLocale,
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
      attachments: attachmentData ? [attachmentData] : undefined,
    });

    if (adminResult.error) {
      console.error('[contact] Failed to send admin notification:', adminResult.error);

      const resendMessage = adminResult.error.message ?? '';
      if (
        adminResult.error.statusCode === 403 &&
        resendMessage.includes('verify a domain')
      ) {
        return NextResponse.json(
          { ok: false, error: 'Email domain not verified' },
          { status: 500 },
        );
      }

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
