import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';

export default function Stats() {
  const t = useTranslations('home.stats');

  const items = [
    { label: t('founded'), value: String(siteConfig.company.founded) },
    { label: t('employees'), value: siteConfig.company.employees },
    { label: t('factory'), value: siteConfig.company.factoryArea },
    { label: t('capa'), value: siteConfig.company.monthlyCapa },
  ];

  return (
    <section className="relative -mt-12 md:-mt-16 z-10">
      <div className="container">
        <div className="rounded-2xl bg-white border border-ink-100 shadow-xl shadow-ink-900/5 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-ink-100 overflow-hidden">
          {items.map((item) => (
            <div key={item.label} className="p-6 md:p-8 text-center">
              <div className="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight">
                {item.value}
              </div>
              <div className="mt-1.5 text-xs md:text-sm font-medium text-ink-500 uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
