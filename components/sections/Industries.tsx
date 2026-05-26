import { useTranslations } from 'next-intl';
import {
  Monitor,
  Lightbulb,
  Car,
  Factory,
  Tv,
  Cpu,
  HeartPulse,
  Smartphone,
  Radio,
  type LucideIcon,
} from 'lucide-react';
import SectionHeader from './SectionHeader';

const icons: Record<string, LucideIcon> = {
  display: Monitor,
  led: Lightbulb,
  automotive: Car,
  industrial: Factory,
  appliance: Tv,
  iot: Cpu,
  medical: HeartPulse,
  consumer: Smartphone,
  telecom: Radio,
};

export default function Industries() {
  const t = useTranslations('home.industries');
  const items = t.raw('items') as {
    key: string;
    name: string;
    description: string;
  }[];

  return (
    <section className="section bg-ink-50/70 border-y border-ink-100">
      <div className="container">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((item) => {
            const Icon = icons[item.key] ?? Cpu;
            return (
              <div
                key={item.key}
                className="group flex items-start gap-4 rounded-2xl bg-white border border-ink-100 p-5 md:p-6 hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 group-hover:from-brand-600 group-hover:to-brand-800 group-hover:text-white transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-ink-900 leading-tight">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
