/**
 * 이메일 HTML 템플릿
 * - adminNotificationEmail: 관리자(미래SMT)에게 발송되는 문의 알림 메일
 * - autoReplyEmail: 문의자에게 발송되는 자동 응답 메일 (locale에 따라 한/영 자동 전환)
 */

import { siteConfig } from '@/config/site';

export type Inquiry = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject: string;
  productType?: string;
  quantity?: string;
  targetDelivery?: string;
  message: string;
  attachmentName?: string;
  locale?: 'ko' | 'en';
  submittedAt: Date;
};

const brand = {
  primary: '#0d9488',
  dark: '#0f172a',
  light: '#f8fafc',
  border: '#e2e8f0',
  muted: '#64748b',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(date: Date, locale: 'ko' | 'en'): string {
  return new Intl.DateTimeFormat(locale === 'ko' ? 'ko-KR' : 'en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Seoul',
  }).format(date);
}

/**
 * 관리자(미래SMT)에게 발송: 문의 알림 메일 (항상 한국어 기반)
 */
export function adminNotificationEmail(inquiry: Inquiry) {
  const safe = {
    name: escapeHtml(inquiry.name),
    company: inquiry.company ? escapeHtml(inquiry.company) : '-',
    email: escapeHtml(inquiry.email),
    phone: inquiry.phone ? escapeHtml(inquiry.phone) : '-',
    subject: escapeHtml(inquiry.subject),
    productType: inquiry.productType ? escapeHtml(inquiry.productType) : '-',
    quantity: inquiry.quantity ? escapeHtml(inquiry.quantity) : '-',
    targetDelivery: inquiry.targetDelivery
      ? escapeHtml(inquiry.targetDelivery)
      : '-',
    attachmentName: inquiry.attachmentName
      ? escapeHtml(inquiry.attachmentName)
      : '-',
    message: escapeHtml(inquiry.message).replace(/\n/g, '<br/>'),
  };

  const subject = `[미래SMT 문의] ${inquiry.name}님 - ${inquiry.subject}`;

  const html = `
<!DOCTYPE html>
<html lang="ko">
  <body style="margin:0;padding:0;background:${brand.light};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;color:${brand.dark};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.light};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${brand.border};">
            <tr>
              <td style="background:${brand.primary};padding:24px 32px;">
                <div style="color:#ffffff;font-size:13px;font-weight:600;letter-spacing:1px;opacity:0.9;">MIRAE SMT</div>
                <div style="color:#ffffff;font-size:22px;font-weight:700;margin-top:4px;">신규 문의 접수</div>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${brand.muted};">
                  웹사이트를 통해 새로운 문의가 도착했습니다. 영업일 기준 2일 이내에 답변해주세요.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:8px;overflow:hidden;">
                  ${row('이름', safe.name)}
                  ${row('회사', safe.company)}
                  ${row('이메일', `<a href="mailto:${safe.email}" style="color:${brand.primary};text-decoration:none;">${safe.email}</a>`)}
                  ${row('전화', safe.phone)}
                  ${row('제품 유형', safe.productType)}
                  ${row('예상 수량', safe.quantity)}
                  ${row('목표 납기', safe.targetDelivery)}
                  ${row('도면 첨부', safe.attachmentName)}
                  ${row('접수 시각', formatDate(inquiry.submittedAt, 'ko'))}
                </table>

                <div style="margin-top:24px;">
                  <div style="font-size:13px;font-weight:600;color:${brand.muted};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">문의 내용</div>
                  <div style="background:${brand.light};border:1px solid ${brand.border};border-radius:8px;padding:16px;font-size:15px;line-height:1.7;color:${brand.dark};white-space:pre-wrap;">${safe.message}</div>
                </div>

                <div style="margin-top:32px;text-align:center;">
                  <a href="mailto:${safe.email}?subject=Re:%20${encodeURIComponent(inquiry.subject)}"
                     style="display:inline-block;background:${brand.primary};color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 28px;border-radius:8px;">
                    답장 보내기
                  </a>
                </div>
              </td>
            </tr>

            <tr>
              <td style="background:${brand.light};padding:20px 32px;border-top:1px solid ${brand.border};">
                <div style="font-size:12px;color:${brand.muted};line-height:1.6;">
                  이 메일은 <a href="https://miraesmt.com" style="color:${brand.primary};text-decoration:none;">miraesmt.com</a> 의 문의 폼을 통해 자동 발송되었습니다.<br/>
                  방문 언어: ${inquiry.locale === 'en' ? 'English' : '한국어'}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `[미래SMT 신규 문의]

이름: ${inquiry.name}
회사: ${inquiry.company || '-'}
이메일: ${inquiry.email}
전화: ${inquiry.phone || '-'}
제품 유형: ${inquiry.productType || '-'}
예상 수량: ${inquiry.quantity || '-'}
목표 납기: ${inquiry.targetDelivery || '-'}
도면 첨부: ${inquiry.attachmentName || '-'}
접수 시각: ${formatDate(inquiry.submittedAt, 'ko')}

[문의 내용]
${inquiry.message}

---
miraesmt.com 에서 자동 발송됨`;

  return { subject, html, text };
}

/**
 * 문의자에게 발송: 자동 응답 메일 (locale에 따라 한/영 자동)
 */
export function autoReplyEmail(inquiry: Inquiry) {
  const isEn = inquiry.locale === 'en';
  const safe = {
    name: escapeHtml(inquiry.name),
    subject: escapeHtml(inquiry.subject),
    productType: inquiry.productType ? escapeHtml(inquiry.productType) : '-',
    quantity: inquiry.quantity ? escapeHtml(inquiry.quantity) : '-',
    targetDelivery: inquiry.targetDelivery
      ? escapeHtml(inquiry.targetDelivery)
      : '-',
    message: escapeHtml(inquiry.message).replace(/\n/g, '<br/>'),
  };

  const subject = isEn
    ? `Your inquiry has been received — Mirae SMT`
    : `미래SMT 문의가 접수되었습니다`;

  const greeting = isEn
    ? `Dear ${safe.name},`
    : `${safe.name} 님, 안녕하세요.`;

  const body = isEn
    ? `Thank you for reaching out to Mirae SMT.<br/><br/>
       We have received your inquiry and will get back to you within <strong>2 business days</strong>.<br/>
       For urgent matters, please feel free to contact us directly at the number below.`
    : `미래SMT에 문의해 주셔서 감사합니다.<br/><br/>
       귀하의 문의 내용을 정상적으로 접수했으며, <strong>영업일 기준 2일 이내</strong>에 답변 드리겠습니다.<br/>
       급한 사항은 아래 연락처로 직접 문의해 주세요.`;

  const inquirySectionTitle = isEn ? 'Your Inquiry' : '문의하신 내용';
  const productTypeLabel = isEn ? 'Product Type' : '제품 유형';
  const quantityLabel = isEn ? 'Estimated Quantity' : '예상 수량';
  const targetDeliveryLabel = isEn ? 'Target Delivery' : '목표 납기';
  const contactSectionTitle = isEn ? 'Contact Information' : '연락처';
  const phoneLabel = isEn ? 'Phone' : '전화';
  const emailLabel = isEn ? 'Email' : '이메일';
  const addressLabel = isEn ? 'Address' : '주소';
  const websiteLabel = isEn ? 'Website' : '웹사이트';
  const footerNote = isEn
    ? 'This is an automated response. Please do not reply directly to this email.'
    : '이 메일은 자동 발송된 메일입니다. 본 메일에 회신하지 마시고, 위 연락처로 문의해 주세요.';

  const phoneDisplay = isEn ? siteConfig.contact.phone.en : siteConfig.contact.phone.ko;
  const addressDisplay = isEn ? siteConfig.contact.address.en : siteConfig.contact.address.ko;
  const companyName = isEn ? siteConfig.name.en : siteConfig.name.ko;

  const html = `
<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'ko'}">
  <body style="margin:0;padding:0;background:${brand.light};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;color:${brand.dark};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.light};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${brand.border};">
            <tr>
              <td style="background:${brand.primary};padding:32px;text-align:center;">
                <div style="color:#ffffff;font-size:13px;font-weight:600;letter-spacing:2px;opacity:0.9;">MIRAE SMT</div>
                <div style="color:#ffffff;font-size:24px;font-weight:700;margin-top:8px;">
                  ${isEn ? 'Inquiry Received' : '문의가 접수되었습니다'}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${brand.dark};">
                  ${greeting}
                </p>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${brand.dark};">
                  ${body}
                </p>

                <div style="margin-top:24px;">
                  <div style="font-size:13px;font-weight:600;color:${brand.muted};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">${inquirySectionTitle}</div>
                  <div style="background:${brand.light};border:1px solid ${brand.border};border-radius:8px;padding:16px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:12px;">
                      <tr><td style="padding:3px 0;font-size:13px;color:${brand.muted};width:110px;">${productTypeLabel}</td><td style="padding:3px 0;font-size:14px;color:${brand.dark};font-weight:500;">${safe.productType}</td></tr>
                      <tr><td style="padding:3px 0;font-size:13px;color:${brand.muted};">${quantityLabel}</td><td style="padding:3px 0;font-size:14px;color:${brand.dark};font-weight:500;">${safe.quantity}</td></tr>
                      <tr><td style="padding:3px 0;font-size:13px;color:${brand.muted};">${targetDeliveryLabel}</td><td style="padding:3px 0;font-size:14px;color:${brand.dark};font-weight:500;">${safe.targetDelivery}</td></tr>
                    </table>
                    <div style="font-size:14px;line-height:1.6;color:${brand.muted};white-space:pre-wrap;">${safe.message}</div>
                  </div>
                </div>

                <div style="margin-top:32px;">
                  <div style="font-size:13px;font-weight:600;color:${brand.muted};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px;">${contactSectionTitle}</div>
                  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
                    <tr><td style="padding:4px 0;font-size:14px;color:${brand.muted};width:80px;">${phoneLabel}</td><td style="padding:4px 0;font-size:14px;color:${brand.dark};font-weight:500;">${phoneDisplay}</td></tr>
                    <tr><td style="padding:4px 0;font-size:14px;color:${brand.muted};">${emailLabel}</td><td style="padding:4px 0;font-size:14px;color:${brand.dark};font-weight:500;">${siteConfig.contact.email}</td></tr>
                    <tr><td style="padding:4px 0;font-size:14px;color:${brand.muted};vertical-align:top;">${addressLabel}</td><td style="padding:4px 0;font-size:14px;color:${brand.dark};font-weight:500;line-height:1.5;">${addressDisplay}</td></tr>
                    <tr><td style="padding:4px 0;font-size:14px;color:${brand.muted};">${websiteLabel}</td><td style="padding:4px 0;font-size:14px;"><a href="https://miraesmt.com" style="color:${brand.primary};text-decoration:none;font-weight:500;">miraesmt.com</a></td></tr>
                  </table>
                </div>
              </td>
            </tr>

            <tr>
              <td style="background:${brand.light};padding:20px 32px;border-top:1px solid ${brand.border};text-align:center;">
                <div style="font-size:14px;font-weight:600;color:${brand.dark};">${companyName}</div>
                <div style="font-size:12px;color:${brand.muted};margin-top:6px;line-height:1.5;">
                  ${footerNote}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = isEn
    ? `Dear ${inquiry.name},

Thank you for reaching out to Mirae SMT.

We have received your inquiry and will get back to you within 2 business days.
For urgent matters, please contact us directly.

[Your Inquiry]
Product Type: ${inquiry.productType || '-'}
Estimated Quantity: ${inquiry.quantity || '-'}
Target Delivery: ${inquiry.targetDelivery || '-'}

${inquiry.message}

[Contact]
Phone: ${phoneDisplay}
Email: ${siteConfig.contact.email}
Address: ${addressDisplay}
Website: https://miraesmt.com

---
This is an automated response. Please do not reply directly to this email.`
    : `${inquiry.name} 님, 안녕하세요.

미래SMT에 문의해 주셔서 감사합니다.

귀하의 문의 내용을 정상적으로 접수했으며, 영업일 기준 2일 이내에 답변 드리겠습니다.
급한 사항은 아래 연락처로 직접 문의해 주세요.

[문의하신 내용]
제품 유형: ${inquiry.productType || '-'}
예상 수량: ${inquiry.quantity || '-'}
목표 납기: ${inquiry.targetDelivery || '-'}

${inquiry.message}

[연락처]
전화: ${phoneDisplay}
이메일: ${siteConfig.contact.email}
주소: ${addressDisplay}
웹사이트: https://miraesmt.com

---
이 메일은 자동 발송된 메일입니다.`;

  return { subject, html, text };
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:12px 16px;font-size:13px;color:${brand.muted};background:${brand.light};border-bottom:1px solid ${brand.border};width:120px;font-weight:600;">${label}</td>
    <td style="padding:12px 16px;font-size:14px;color:${brand.dark};border-bottom:1px solid ${brand.border};">${value}</td>
  </tr>`;
}
