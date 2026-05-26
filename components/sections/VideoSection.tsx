'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Play, X } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { siteConfig } from '@/config/site';

// YouTube 썸네일은 해상도별로 존재 여부가 다릅니다.
// maxresdefault는 모든 영상에 있는 게 아니라서 단계적으로 폴백합니다.
const thumbnailQualities = [
  'maxresdefault', // 1280x720 (16:9) - 가끔 없음
  'sddefault',     // 640x480
  'hqdefault',     // 480x360 - 항상 있음
] as const;

export default function VideoSection() {
  const t = useTranslations('home.video');
  const [open, setOpen] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);
  const { youtubeId, customThumbnail } = siteConfig.video;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const thumbnail =
    customThumbnail ||
    (youtubeId
      ? `https://i.ytimg.com/vi/${youtubeId}/${thumbnailQualities[thumbIndex]}.jpg`
      : '');

  const hasVideo = Boolean(youtubeId);

  const handleThumbError = () => {
    if (thumbIndex < thumbnailQualities.length - 1) {
      setThumbIndex(thumbIndex + 1);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => hasVideo && setOpen(true)}
            disabled={!hasVideo}
            aria-label={t('playLabel')}
            className="group relative block w-full aspect-video rounded-2xl overflow-hidden shadow-xl shadow-ink-900/10 ring-1 ring-ink-100 disabled:cursor-default"
          >
            {thumbnail ? (
              <Image
                key={thumbnail}
                src={thumbnail}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={false}
                unoptimized
                onError={handleThumbError}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '28px 28px',
                  }}
                />
              </div>
            )}

            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent ${
                hasVideo
                  ? 'group-hover:from-black/70'
                  : ''
              } transition-colors`}
            />

            <span
              className={`absolute inset-0 flex items-center justify-center ${
                hasVideo ? '' : 'opacity-60'
              }`}
            >
              <span className="relative inline-flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-white/95 backdrop-blur text-brand-700 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                {hasVideo && (
                  <span className="absolute inset-0 rounded-full bg-white/70 animate-ping opacity-60" />
                )}
                <Play
                  className="relative h-9 w-9 md:h-11 md:w-11 ml-1.5"
                  fill="currentColor"
                />
              </span>
            </span>

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white border border-white/20">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                {hasVideo ? t('duration') : 'Coming Soon'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {open && hasVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title="Mirae SMT"
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
