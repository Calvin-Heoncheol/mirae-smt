import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n';
import { siteConfig } from '@/config/site';

export default function Logo({
  locale,
  variant = 'default',
}: {
  locale: Locale;
  variant?: 'default' | 'light';
}) {
  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-3 group"
      aria-label={siteConfig.name[locale]}
    >
      <Image
        src="/images/logo/logo.png"
        alt={siteConfig.name[locale]}
        width={140}
        height={70}
        priority
        className="h-9 md:h-10 w-auto object-contain"
      />
      <span className="hidden sm:flex flex-col leading-none border-l border-ink-200 pl-3">
        <span
          className={`text-xs font-bold tracking-tight ${
            variant === 'light' ? 'text-white' : 'text-ink-900'
          }`}
        >
          OEM · ODM
        </span>
        <span
          className={`text-[10px] uppercase tracking-[0.18em] mt-1 ${
            variant === 'light' ? 'text-ink-400' : 'text-ink-500'
          }`}
        >
          Manufacturing
        </span>
      </span>
    </Link>
  );
}
