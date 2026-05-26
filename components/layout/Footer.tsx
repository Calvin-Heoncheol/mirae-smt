import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import type { Locale } from '@/i18n';
import { siteConfig } from '@/config/site';
import Logo from './Logo';

const navItems = [
  { key: 'home', href: '' },
  { key: 'about', href: '/about' },
  { key: 'capabilities', href: '/capabilities' },
  { key: 'facilities', href: '/facilities' },
  { key: 'quality', href: '/quality' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Footer({ locale }: { locale: Locale }) {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const tContact = useTranslations('contact.info');

  const year = new Date().getFullYear();
  const companyName = siteConfig.name[locale];

  return (
    <footer className="bg-ink-950 text-ink-200 mt-auto">
      <div className="container py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5">
            <Logo locale={locale} variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-ink-400 max-w-md">
              {tFooter('tagline')} — {siteConfig.tagline[locale]}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {siteConfig.company.certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-ink-300"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase mb-4">
              {tFooter('navTitle')}
            </h4>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-sm text-ink-400 hover:text-white transition-colors"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase mb-4">
              {tFooter('contactTitle')}
            </h4>
            <ul className="space-y-3 text-sm text-ink-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-brand-400 flex-shrink-0" />
                <span>{siteConfig.contact.address[locale]}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-brand-400 flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone.tel}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.phone[locale]}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-brand-400 flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-brand-400 flex-shrink-0" />
                <span>{siteConfig.contact.businessHours[locale]}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-ink-500">
          <p>{tFooter('copyright', { year, name: companyName })}</p>
          <p className="text-ink-500">Designed & built for global manufacturing partners.</p>
        </div>
      </div>
    </footer>
  );
}
