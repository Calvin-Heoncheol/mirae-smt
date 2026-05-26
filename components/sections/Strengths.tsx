import { useTranslations } from 'next-intl';
import {
  Workflow,
  Layers,
  ShieldCheck,
  Sliders,
  type LucideIcon,
} from 'lucide-react';
import SectionHeader from './SectionHeader';

const icons: LucideIcon[] = [Workflow, Layers, ShieldCheck, Sliders];

export default function Strengths() {
  const t = useTranslations('home.strengths');
  const items = t.raw('items') as { title: string; description: string }[];

  return (
    <section className="section">
      <div className="container">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Workflow;
            return (
              <div key={item.title} className="card group">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
