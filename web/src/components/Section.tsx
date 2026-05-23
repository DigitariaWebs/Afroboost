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
}: {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-3 mb-12',
        align === 'center' && 'items-center text-center',
      )}
    >
      {overline ? (
        <span className="text-overline uppercase font-medium text-accent tracking-[0.18em]">
          {overline}
        </span>
      ) : null}
      <h2 className="font-serif text-display text-foreground max-w-3xl">{title}</h2>
      {subtitle ? (
        <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">{subtitle}</p>
      ) : null}
    </div>
  );
}
