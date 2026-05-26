import type { Locale } from '@/i18n';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Strengths from '@/components/sections/Strengths';
import ProcessPreview from '@/components/sections/ProcessPreview';
import Industries from '@/components/sections/Industries';
import VideoSection from '@/components/sections/VideoSection';
import Clients from '@/components/sections/Clients';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  return (
    <>
      <Hero locale={locale} />
      <Stats />
      <Strengths />
      <ProcessPreview locale={locale} />
      <Industries />
      <VideoSection />
      <Clients />
    </>
  );
}
