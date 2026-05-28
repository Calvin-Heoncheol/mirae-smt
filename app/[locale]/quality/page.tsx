import { useTranslations } from 'next-intl';
import { Award, ShieldCheck } from 'lucide-react';
import QualityHero from '@/components/sections/QualityHero';
import SectionHeader from '@/components/sections/SectionHeader';
import { siteConfig } from '@/config/site';

export default function QualityPage() {
  const t = useTranslations('quality');

  const steps = t.raw('process.steps') as {
    step: string;
    title: string;
    text: string;
  }[];

  return (
    <>
      <QualityHero />

      <section className="section">
        <div className="container">
          <SectionHeader title={t('certifications.title')} />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
            {siteConfig.company.certifications.map((cert) => (
              <div
                key={cert}
                className="rounded-2xl border border-ink-100 bg-white p-6 md:p-8 flex items-center gap-5 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white">
                  <Award className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-700">
                    Certification
                  </div>
                  <div className="mt-1 text-base font-bold text-ink-900">
                    {cert}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink-50/70 border-y border-ink-100">
        <div className="container">
          <SectionHeader title={t('process.title')} />

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl bg-white border border-ink-100 p-6 md:p-7 hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div className="text-4xl font-black text-brand-100 leading-none">
                  {s.step}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-brand-700" />
                  <h3 className="text-lg font-bold text-ink-900">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-ink-900 to-ink-950 text-white p-8 md:p-12 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl"
            />
            <div className="relative">
              <span className="eyebrow !text-brand-300">
                {t('policy.title')}
              </span>
              <p className="mt-5 text-xl md:text-2xl font-medium text-balance leading-relaxed">
                &ldquo;{t('policy.text')}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
