import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ImageOff } from 'lucide-react';
import type { Locale } from '@/i18n';
import PageHero from '@/components/sections/PageHero';
import SectionHeader from '@/components/sections/SectionHeader';
import CTA from '@/components/sections/CTA';
import { siteConfig } from '@/config/site';

const equipmentImages: Record<string, string | undefined> = {
  hanwha: '/images/equipment/Hanwha_Decan.png',
  juki: '/images/equipment/Juki_Chip_Mounter.png',
  aoi: '/images/equipment/AOI_Machine.png',
  heller: '/images/equipment/heller_reflow.jpg',
  'solder-mgmt': '/images/equipment/Solder Pater Storage Machine.webp',
  spi: '/images/equipment/SPI Machine.png',
  xray: '/images/equipment/x_ray_inspection.png',
  'pcb-washer': '/images/equipment/pcb_cleaning_machine.jpg',
  'dry-ice': '/images/equipment/Dry_Ice_Cleaner.jpg',
};

export default function FacilitiesPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const t = useTranslations('facilities');

  const stats = t.raw('stats.items') as { label: string; value: string }[];
  const equipment = t.raw('equipment.items') as {
    id: string;
    category: string;
    name: string;
    spec: string;
  }[];

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage={siteConfig.backgrounds.facilities}
      />

      <section className="section">
        <div className="container">
          <SectionHeader title={t('stats.title')} />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-ink-100 bg-gradient-to-br from-white to-brand-50/30 p-5 md:p-6 text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-brand-700 tracking-tight leading-none">
                  {s.value}
                </div>
                <div className="mt-3 text-xs md:text-sm font-semibold text-ink-700 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm font-semibold text-brand-700">
            {t('stats.totalNote')}
          </p>
        </div>
      </section>

      <section className="section bg-ink-50/70 border-y border-ink-100">
        <div className="container">
          <SectionHeader
            title={t('equipment.title')}
            subtitle={t('equipment.subtitle')}
          />

          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {equipment.map((e) => {
              const imgSrc = equipmentImages[e.id];
              return (
                <div
                  key={e.id}
                  className="group rounded-2xl bg-white border border-ink-100 overflow-hidden hover:shadow-lg hover:border-brand-300 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-ink-100 to-ink-50 overflow-hidden">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={e.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center text-ink-300">
                        <ImageOff className="h-10 w-10" />
                        <span className="mt-2 text-xs uppercase tracking-wider">
                          Image coming soon
                        </span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-md bg-white/90 backdrop-blur text-[11px] font-bold text-brand-700 uppercase tracking-wider shadow-sm">
                      {e.category}
                    </span>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg font-bold text-ink-900 leading-tight">
                      {e.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                      {e.spec}
                    </p>
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
