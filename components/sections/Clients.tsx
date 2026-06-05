import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import SectionHeader from './SectionHeader';

type ClientItem = {
  id: keyof typeof siteConfig.clientLogos;
  name: string;
};

const logoImageClass: Partial<
  Record<keyof typeof siteConfig.clientLogos, string>
> = {
  txr_robotics:
    'object-contain p-0.5 scale-[1.35] group-hover:scale-[1.4] transition-transform duration-300',
  e_seek:
    'object-contain p-0.5 scale-[1.2] group-hover:scale-[1.25] transition-transform duration-300',
  costimo:
    'object-contain p-0.5 scale-[1.2] group-hover:scale-[1.25] transition-transform duration-300',
};

const defaultLogoClass =
  'object-contain p-2 group-hover:scale-105 transition-transform duration-300';

export default function Clients() {
  const t = useTranslations('home.clients');
  const items = t.raw('items') as ClientItem[];

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
              key={item.id}
              className="group flex items-center justify-center h-20 md:h-24 rounded-xl border border-ink-100 bg-white px-4 py-3 hover:border-brand-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="relative h-full w-full">
                <Image
                  src={siteConfig.clientLogos[item.id]}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className={logoImageClass[item.id] ?? defaultLogoClass}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
