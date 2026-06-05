import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import type { Locale } from '@/i18n';
import { siteConfig } from '@/config/site';

export default function MapCard({ locale }: { locale: Locale }) {
  const address = siteConfig.contact.address[locale];
  const addressKo = siteConfig.contact.address.ko;
  const naverUrl = `https://map.naver.com/p/search/${encodeURIComponent(addressKo)}`;
  const naverEmbedUrl = `https://map.naver.com/p/search/${encodeURIComponent(addressKo)}`;
  const googleUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressKo)}`;

  return (
    <div className="rounded-2xl border border-ink-100 bg-white overflow-hidden shadow-sm">
      <div className="relative h-56 md:h-64 overflow-hidden bg-ink-100">
        <iframe
          title={locale === 'ko' ? '미래SMT 본사 네이버 지도' : 'Mirae SMT HQ Naver Map'}
          src={naverEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-ink-950/10 to-transparent"
        />
        <div className="relative h-full flex flex-col justify-end p-6">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur ring-1 ring-white/30">
              <MapPin className="h-5 w-5 text-brand-300" />
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
                {locale === 'ko' ? '본사 위치' : 'Headquarters'}
              </div>
              <p className="mt-1 text-sm md:text-base text-white leading-relaxed">
                {address}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 divide-x divide-ink-100">
        <a
          href={naverUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-ink-800 hover:bg-brand-50 hover:text-brand-800 transition-colors"
        >
          <Navigation className="h-4 w-4" />
          <span>{locale === 'ko' ? '네이버 지도' : 'Naver Map'}</span>
          <ExternalLink className="h-3.5 w-3.5 opacity-60" />
        </a>
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-ink-800 hover:bg-brand-50 hover:text-brand-800 transition-colors"
        >
          <Navigation className="h-4 w-4" />
          <span>Google Maps</span>
          <ExternalLink className="h-3.5 w-3.5 opacity-60" />
        </a>
      </div>
    </div>
  );
}
