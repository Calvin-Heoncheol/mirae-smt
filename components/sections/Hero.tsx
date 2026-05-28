import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/i18n';

export default function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <Image
        src={siteConfig.backgrounds.home}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-ink-950/70 to-ink-950/90"
      />
      <div
        aria-hidden
        className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-brand-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-700/20 blur-3xl"
      />

      <div className="container relative z-10 pt-20 md:pt-28 pb-24 md:pb-32">
        <div className="max-w-3xl animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200 border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('eyebrow')}
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight whitespace-pre-line text-balance leading-[1.1] drop-shadow-sm">
            {t('title')}
          </h1>
          <p className="mt-6 text-base md:text-lg text-ink-100 leading-relaxed max-w-2xl drop-shadow-sm">
            {t('subtitle')}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={`/${locale}/contact`} className="btn-primary">
              {t('ctaPrimary')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/capabilities`}
              className="btn !bg-white/10 !border !border-white/15 text-white hover:!bg-white/15"
            >
              <PlayCircle className="h-4 w-4" />
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
