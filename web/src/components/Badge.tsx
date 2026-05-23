import { ReactNode } from 'react';
import clsx from 'clsx';

type Tone = 'default' | 'gold' | 'success' | 'muted';

const tones: Record<Tone, string> = {
  default: 'bg-primary/20 text-primary-fg border-primary/30',
  gold: 'bg-accent/15 text-accent border-accent/40',
  success: 'bg-success/15 text-success border-success/30',
  muted: 'bg-surface-elevated text-muted border-border',
};

export function Badge({
  children,
  tone = 'default',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-caption font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
