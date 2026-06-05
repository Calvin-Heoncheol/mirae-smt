import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import Image from 'next/image';
import type { Locale } from '@/i18n';
import { siteConfig } from '@/config/site';

export default function MapCard({ locale }: { locale: Locale }) {
  const address = siteConfig.contact.address[locale];
  const addressKo = siteConfig.contact.address.ko;
  const { lat, lng } = siteConfig.contact.coordinates;
  const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(addressKo)}`;
  const naverDirectionsUrl = `https://map.naver.com/v5/directions/-/-/${lng},${lat},${encodeURIComponent('미래SMT')},PLACE_POI`;
  const googleUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressKo)}`;

  return (
    <div className="rounded-2xl border border-ink-100 bg-white overflow-hidden shadow-sm">
      <div className="relative h-56 md:h-64 overflow-hidden bg-ink-100">
        <Image
          src="/images/background/map.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/20 to-transparent"
        />
      </div>

      <div className="border-t border-ink-100 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
            <MapPin className="h-5 w-5" />
          </span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              {locale === 'ko' ? '본사 위치' : 'Headquarters'}
            </div>
            <p className="mt-1 text-sm text-ink-800 leading-relaxed">{address}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-ink-100 border-t border-ink-100">
        <a
          href={naverDirectionsUrl}
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
