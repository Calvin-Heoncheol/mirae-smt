import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import type { Locale } from '@/i18n';
import PageHero from '@/components/sections/PageHero';
import ContactForm from '@/components/ContactForm';
import MapCard from '@/components/MapCard';
import { siteConfig } from '@/config/site';

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const t = useTranslations('contact');

  const infoItems = [
    {
      icon: MapPin,
      label: t('info.addressLabel'),
      value: siteConfig.contact.address[locale],
    },
    {
      icon: Phone,
      label: t('info.phoneLabel'),
      value: siteConfig.contact.phone[locale],
      href: `tel:${siteConfig.contact.phone.tel}`,
    },
    {
      icon: Mail,
      label: t('info.emailLabel'),
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Clock,
      label: t('info.hoursLabel'),
      value: siteConfig.contact.businessHours[locale],
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        compact
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="space-y-4">
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-ink-100 bg-white p-5 flex gap-4 hover:border-brand-200 transition-colors"
                  >
                    <div className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block text-base font-semibold text-ink-900 hover:text-brand-700 transition-colors break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="mt-1 text-base font-semibold text-ink-900">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <MapCard locale={locale} />
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
