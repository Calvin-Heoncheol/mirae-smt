'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import type { Locale } from '@/i18n';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { key: 'home', href: '' },
  { key: 'about', href: '/about' },
  { key: 'capabilities', href: '/capabilities' },
  { key: 'facilities', href: '/facilities' },
  { key: 'quality', href: '/quality' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    if (href === '') return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname === full || pathname.startsWith(full + '/');
  };

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-all',
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-ink-100'
          : 'bg-white border-b border-transparent',
      )}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Logo locale={locale} />

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className={clsx(
                'relative px-3.5 py-2 text-sm font-semibold transition-colors',
                isActive(item.href)
                  ? 'text-brand-700'
                  : 'text-ink-700 hover:text-ink-900',
              )}
            >
              {t(item.key)}
              {isActive(item.href) && (
                <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 bg-brand-700 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/contact`}
            className="hidden md:inline-flex btn-primary !py-2 !px-4 text-sm"
          >
            {t('getQuote')}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-50"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-ink-100 bg-white">
          <div className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={clsx(
                  'px-3 py-3 rounded-lg text-base font-semibold',
                  isActive(item.href)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-ink-800 hover:bg-ink-50',
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-ink-100 flex items-center gap-3">
              <div className="flex-1">
                <LanguageSwitcher locale={locale} variant="mobile" />
              </div>
              <Link
                href={`/${locale}/contact`}
                className="btn-primary !py-2.5 text-sm"
              >
                {t('getQuote')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
