'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  return (
    <section className="min-h-[60vh] flex items-center">
      <div className="container text-center max-w-xl">
        <div className="text-7xl md:text-9xl font-black text-brand-700/15 tracking-tight">
          404
        </div>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-ink-900">
          {t('title')}
        </h1>
        <p className="mt-3 text-ink-600">{t('subtitle')}</p>
        <Link
          href={`/${locale}`}
          className="mt-8 btn-primary inline-flex"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </Link>
      </div>
    </section>
  );
}
