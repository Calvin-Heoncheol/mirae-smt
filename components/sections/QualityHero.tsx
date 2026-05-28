import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ShieldCheck, ScanSearch, TrendingUp } from 'lucide-react';
import { siteConfig } from '@/config/site';

const pillarIcons = [ShieldCheck, ScanSearch, TrendingUp] as const;

export default function QualityHero() {
  const t = useTranslations('quality.hero');
  const pillars = t.raw('pillars') as { title: string }[];

  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <Image
        src={siteConfig.backgrounds.quality}
        alt=""
        fill
        priority
        className="object-cover object-center scale-[0.92] origin-center"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-950/85 via-ink-950/75 to-ink-950/90"
      />

      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug tracking-tight text-balance drop-shadow-sm">
            {t('title')}
          </h1>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-ink-200 max-w-3xl drop-shadow-sm">
            {t('subtitle')}
          </p>
        </div>

        <hr className="mt-10 md:mt-12 w-full max-w-2xl border-0 border-t border-white/20" />

        <ul className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 max-w-4xl">
          {pillars.map((pillar, i) => {
            const Icon = pillarIcons[i] ?? ShieldCheck;
            return (
              <li key={pillar.title} className="flex items-center gap-3 md:gap-4">
                <span className="flex-shrink-0 text-brand-300">
                  <Icon className="h-9 w-9 md:h-10 md:w-10" strokeWidth={1.5} />
                </span>
                <span className="text-base md:text-lg font-semibold text-white leading-snug">
                  {pillar.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
