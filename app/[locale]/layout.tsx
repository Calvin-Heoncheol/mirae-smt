import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import { siteConfig } from '@/config/site';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const name = siteConfig.name[locale] ?? siteConfig.name.en;
  const description =
    siteConfig.description[locale] ?? siteConfig.description.en;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${name} — ${siteConfig.tagline[locale] ?? siteConfig.tagline.en}`,
      template: `%s · ${name}`,
    },
    description,
    openGraph: {
      title: name,
      description,
      url: siteConfig.url,
      siteName: name,
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
    },
    alternates: {
      languages: {
        ko: '/ko',
        en: '/en',
      },
    },
  };
}

async function loadMessages(locale: Locale) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);

  const messages = await loadMessages(locale as Locale);

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <GoogleAnalytics />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale as Locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
