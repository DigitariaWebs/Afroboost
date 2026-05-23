'use client';

import { useReveal, useCounter } from '@/lib/motion';

export function Counter({
  to,
  duration = 1400,
  prefix = '',
  suffix = '',
  className,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const v = useCounter(to, duration, visible);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {v.toLocaleString('fr-FR')}
      {suffix}
    </span>
  );
}
