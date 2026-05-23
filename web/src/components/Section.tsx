import { ReactNode } from 'react';
import clsx from 'clsx';
import { Container } from './Container';

export function Section({
  children,
  id,
  className,
  containerSize = 'default',
  bare,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  containerSize?: 'default' | 'narrow' | 'wide';
  bare?: boolean;
}) {
  return (
    <section id={id} className={clsx('py-20 sm:py-28', className)}>
      {bare ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}

export function SectionHeading({
  overline,
  title,
  subtitle,
  align = 'left',
  light = false,
}: {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}) {
  const titleColor = light ? 'text-[#0E1A14]' : 'text-foreground';
  const subtitleColor = light ? 'text-[#4A5750]' : 'text-muted';
  const accentColor = light ? 'text-accent-muted' : 'text-accent';
  const accentRule = light ? 'bg-accent-muted/60' : 'bg-accent/60';

  return (
    <div
      className={clsx(
        'flex flex-col gap-3 mb-14',
        align === 'center' && 'items-center text-center',
      )}
    >
      {overline ? (
        <span
          className={clsx(
            'inline-flex items-center gap-2 text-overline uppercase font-medium tracking-[0.22em]',
            accentColor,
          )}
        >
          <span className={clsx('h-px w-6', accentRule)} />
          {overline}
          <span className={clsx('h-px w-6', accentRule)} />
        </span>
      ) : null}
      <h2
        className={clsx(
          'font-display text-[2.5rem] sm:text-[3rem] leading-[1.05] tracking-[-0.035em] max-w-3xl',
          titleColor,
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={clsx('text-base sm:text-lg max-w-2xl leading-relaxed', subtitleColor)}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
