'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, type Locale } from '@/i18n';
import clsx from 'clsx';

export default function LanguageSwitcher({
  locale,
  variant = 'desktop',
}: {
  locale: Locale;
  variant?: 'desktop' | 'mobile';
}) {
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(ko|en)/, '') || '/';

  if (variant === 'mobile') {
    return (
      <div className="flex items-center gap-1 rounded-lg border border-ink-200 p-1">
        {locales.map((lng) => {
          const active = lng === locale;
          return (
            <Link
              key={lng}
              href={`/${lng}${pathWithoutLocale}`}
              className={clsx(
                'flex-1 px-3 py-1.5 rounded-md text-sm font-semibold text-center transition-colors',
                active
                  ? 'bg-brand-700 text-white'
                  : 'text-ink-600 hover:text-ink-900',
              )}
            >
              {lng.toUpperCase()}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-1 text-sm font-semibold">
      <Globe className="h-4 w-4 text-ink-500 mr-1" />
      {locales.map((lng, i) => {
        const active = lng === locale;
        return (
          <span key={lng} className="flex items-center">
            {i > 0 && <span className="text-ink-300 px-1">/</span>}
            <Link
              href={`/${lng}${pathWithoutLocale}`}
              className={clsx(
                'transition-colors',
                active
                  ? 'text-brand-700'
                  : 'text-ink-500 hover:text-ink-800',
              )}
            >
              {lng.toUpperCase()}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
