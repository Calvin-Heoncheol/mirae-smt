import { useTranslations } from 'next-intl';
import {
  CircuitBoard,
  Cable,
  Wrench,
  ScanSearch,
  PackageCheck,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import type { Locale } from '@/i18n';
import PageHero from '@/components/sections/PageHero';
import SectionHeader from '@/components/sections/SectionHeader';
import CTA from '@/components/sections/CTA';
import { siteConfig } from '@/config/site';

const processKeys = ['smt', 'pcb', 'assembly', 'qc', 'packaging'] as const;
type ProcessKey = (typeof processKeys)[number];

const icons: Record<ProcessKey, LucideIcon> = {
  smt: CircuitBoard,
  pcb: Cable,
  assembly: Wrench,
  qc: ScanSearch,
  packaging: PackageCheck,
};

export default function CapabilitiesPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const t = useTranslations('capabilities');

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage={siteConfig.backgrounds.capabilities}
      />

      <section className="section">
        <div className="container">
          <SectionHeader
            title={t('process.title')}
            subtitle={t('process.subtitle')}
          />

          <div className="mt-12 md:mt-16">
            <div className="hidden lg:grid grid-cols-5 gap-3 mb-8">
              {processKeys.map((key, i) => {
                const Icon = icons[key];
                return (
                  <div key={key} className="relative">
                    <div className="rounded-xl border border-ink-100 bg-white p-4 text-center">
                      <Icon className="h-6 w-6 text-brand-700 mx-auto" />
                      <div className="mt-2 text-xs font-bold text-ink-900">
                        {t(`items.${key}.name`)}
                      </div>
                    </div>
                    {i < processKeys.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 h-4 w-4 text-ink-300 z-10" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6 md:space-y-8 mt-8">
            {processKeys.map((key, i) => {
              const Icon = icons[key];
              const specs = t.raw(`items.${key}.specs`) as string[];
              const reverse = i % 2 === 1;

              return (
                <div
                  key={key}
                  id={key}
                  className="rounded-2xl border border-ink-100 bg-white overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 ${reverse ? 'lg:[&>div:first-child]:order-2' : ''}`}
                  >
                    <div className="lg:col-span-5 relative bg-gradient-to-br from-brand-900 to-ink-950 text-white p-8 md:p-10 min-h-[260px] flex flex-col justify-between">
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                          backgroundSize: '24px 24px',
                        }}
                      />
                      <div className="relative">
                        <div className="text-sm font-mono text-brand-300">
                          {String(i + 1).padStart(2, '0')} / {processKeys.length}
                        </div>
                        <Icon className="mt-6 h-12 w-12 text-brand-300" />
                      </div>
                      <div className="relative">
                        <div className="text-xs uppercase tracking-[0.18em] text-brand-300 font-semibold">
                          {t(`items.${key}.name`)}
                        </div>
                        <h3 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">
                          {t(`items.${key}.headline`)}
                        </h3>
                      </div>
                    </div>
                    <div className="lg:col-span-7 p-8 md:p-10">
                      <p className="text-base md:text-lg text-ink-700 leading-relaxed">
                        {t(`items.${key}.description`)}
                      </p>
                      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                        {specs.map((spec) => (
                          <li
                            key={spec}
                            className="flex items-start gap-2.5 text-sm text-ink-800"
                          >
                            <CheckCircle2 className="h-5 w-5 text-brand-600 flex-shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA locale={locale} />
    </>
  );
}
