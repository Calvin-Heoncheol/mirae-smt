export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 to-ink-950 text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-brand-500/20 blur-3xl"
      />
      <div className="container relative py-16 md:py-24">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight whitespace-pre-line text-balance leading-[1.15]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-base md:text-lg text-ink-300 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
