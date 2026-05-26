import clsx from 'clsx';

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title mt-3 whitespace-pre-line text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="section-subtitle text-balance">{subtitle}</p>
      )}
    </div>
  );
}
