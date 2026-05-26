import { useTranslations } from 'next-intl';
import SectionHeader from './SectionHeader';

export default function Clients() {
  const t = useTranslations('home.clients');
  const items = t.raw('items') as { name: string }[];

  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((item) => (
            <div
              key={item.name}
              className="group flex items-center justify-center h-20 md:h-24 rounded-xl border border-ink-100 bg-white px-4 py-3 hover:border-brand-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="text-center text-sm md:text-base font-bold tracking-tight text-ink-700 group-hover:text-brand-800 transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
