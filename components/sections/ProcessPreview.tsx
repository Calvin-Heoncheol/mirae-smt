import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  CircuitBoard,
  Cable,
  Wrench,
  ScanSearch,
  PackageCheck,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import SectionHeader from './SectionHeader';
import type { Locale } from '@/i18n';

const processKeys = ['smt', 'pcb', 'assembly', 'qc', 'packaging'] as const;
const icons: Record<(typeof processKeys)[number], LucideIcon> = {
  smt: CircuitBoard,
  pcb: Cable,
  assembly: Wrench,
  qc: ScanSearch,
  packaging: PackageCheck,
};

export default function ProcessPreview({ locale }: { locale: Locale }) {
  const t = useTranslations('home.processPreview');
  const tCap = useTranslations('capabilities.items');

  return (
    <section className="section bg-ink-50/70 border-y border-ink-100">
      <div className="container">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {processKeys.map((key, i) => {
            const Icon = icons[key];
            return (
              <div
                key={key}
                className="relative rounded-xl bg-white border border-ink-100 p-5 hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div className="absolute -top-3 left-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-700 text-white text-[11px] font-bold">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <Icon className="h-7 w-7 text-brand-700" />
                <h3 className="mt-4 text-base font-bold text-ink-900">
                  {tCap(`${key}.name`)}
                </h3>
                <p className="mt-1.5 text-xs text-ink-500 leading-relaxed line-clamp-2">
                  {tCap(`${key}.headline`)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/capabilities`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            {t('ctaText')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
