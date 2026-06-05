'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';

function loadNaverMapScript(clientId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.naver?.maps) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-naver-map]',
    );

    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
    script.async = true;
    script.dataset.naverMap = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Naver Maps script failed'));
    document.head.appendChild(script);
  });
}

export default function NaverMap({
  fallbackLabel,
}: {
  fallbackLabel: string;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  const { lat, lng } = siteConfig.contact.coordinates;

  useEffect(() => {
    if (!clientId || !mapRef.current) {
      setFailed(true);
      return;
    }

    let cancelled = false;

    loadNaverMapScript(clientId)
      .then(() => {
        if (cancelled || !mapRef.current || !window.naver?.maps) return;

        const center = new naver.maps.LatLng(lat, lng);
        const map = new naver.maps.Map(mapRef.current, {
          center,
          zoom: 16,
          zoomControl: true,
          zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT,
          },
        });

        new naver.maps.Marker({
          position: center,
          map,
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [clientId, lat, lng]);

  if (failed || !clientId) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-ink-100 to-ink-50 px-4 text-center">
        <MapPin className="h-8 w-8 text-brand-600" />
        <p className="text-sm text-ink-600">{fallbackLabel}</p>
      </div>
    );
  }

  return <div ref={mapRef} className="h-full w-full" />;
}
