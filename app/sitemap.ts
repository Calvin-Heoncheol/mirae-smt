import type { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { siteConfig } from '@/config/site';

const paths = ['', '/about', '/capabilities', '/facilities', '/quality', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const p of paths) {
      entries.push({
        url: `${siteConfig.url}/${locale}${p}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: p === '' ? 1.0 : 0.7,
      });
    }
  }
  return entries;
}
