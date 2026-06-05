import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Target, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Locale } from '@/i18n';
import PageHero from '@/components/sections/PageHero';
import SectionHeader from '@/components/sections/SectionHeader';
import CTA from '@/components/sections/CTA';
import { siteConfig } from '@/config/site';

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const t = useTranslations('about');

  const historyItems = t.raw('history.items') as { year: string; text: string }[];
  const valueItems = t.raw('vision.values.items') as string[];
  const ceoMessage = t('ceo.message');

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage={siteConfig.backgrounds.about}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <div className="relative max-w-xs mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-ink-100 aspect-[3/4]">
                <Image
                  src={siteConfig.company.ceoPhoto}
                  alt={t('ceo.name')}
                  fill
                  sizes="(max-width: 1024px) 80vw, 320px"
                  className="object-cover object-top"
                />
                <div className="absolute bottom-3 right-3">
                  <div className="bg-white/85 backdrop-blur rounded-lg px-2.5 py-1.5 border border-white/80 shadow-sm">
                    <div className="text-xs font-bold text-ink-900">
                      {t('ceo.name')}
                    </div>
                    <div className="text-[10px] text-ink-600 mt-0.5">
                      {t('ceo.position')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-2xl md:text-3xl font-bold text-ink-900 tracking-tight">
                {t('ceo.title')}
              </h2>
              <div className="mt-6 space-y-4 text-base md:text-lg text-ink-700 leading-[1.85] whitespace-pre-line">
                {ceoMessage}
              </div>
              <div className="mt-8 inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-ink-50 border border-ink-100">
                <span className="text-sm text-ink-500">— {t('ceo.position')}</span>
                <span className="text-sm font-bold text-ink-900">
                  {t('ceo.name')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ink-50/70 border-y border-ink-100">
        <div className="container">
          <SectionHeader title={t('vision.title')} />
          <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <Target className="h-8 w-8 text-brand-700" />
              <div className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
                {t('vision.mission.label')}
              </div>
              <p className="mt-3 text-ink-800 leading-relaxed">
                {t('vision.mission.text')}
              </p>
            </div>
            <div className="card">
              <Eye className="h-8 w-8 text-brand-700" />
              <div className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
                {t('vision.vision.label')}
              </div>
              <p className="mt-3 text-ink-800 leading-relaxed">
                {t('vision.vision.text')}
              </p>
            </div>
            <div className="card">
              <Sparkles className="h-8 w-8 text-brand-700" />
              <div className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
                {t('vision.values.label')}
              </div>
              <ul className="mt-3 space-y-2">
                {valueItems.map((v) => (
                  <li
                    key={v}
                    className="flex items-center gap-2 text-ink-800"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand-600 flex-shrink-0" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader title={t('history.title')} />
          <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
            <ol className="relative border-l-2 border-ink-100 pl-8 space-y-8">
              {historyItems.map((item, i) => {
                const isLatest = i === historyItems.length - 1;
                return (
                  <li key={item.year} className="relative">
                    <span
                      className={`absolute -left-[37px] top-1.5 h-4 w-4 rounded-full ring-4 ${
                        isLatest
                          ? 'bg-brand-500 ring-brand-100 shadow-[0_0_0_6px_rgba(14,144,136,0.18)]'
                          : 'bg-brand-700 ring-brand-100'
                      }`}
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-xl font-bold text-brand-700 tabular-nums">
                          {item.year}
                        </span>
                        {isLatest && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-100 text-brand-800">
                            {t('history.latestBadge')}
                          </span>
                        )}
                      </div>
                      <p
                        className={`leading-relaxed ${
                          isLatest
                            ? 'text-ink-900 font-semibold'
                            : 'text-ink-800'
                        }`}
                      >
                        {item.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <CTA locale={locale} />
    </>
  );
}
