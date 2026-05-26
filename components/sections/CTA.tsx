import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n';

export default function CTA({ locale }: { locale: Locale }) {
  const t = useTranslations('home.cta');

  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 px-6 py-14 md:px-16 md:py-20 text-white">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-600/30 blur-3xl"
          />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
                {t('title')}
              </h2>
              <p className="mt-3 text-ink-200 text-base md:text-lg max-w-xl">
                {t('subtitle')}
              </p>
            </div>
            <div className="md:text-right">
              <Link
                href={`/${locale}/contact`}
                className="btn bg-white text-ink-900 hover:bg-ink-100"
              >
                {t('button')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
