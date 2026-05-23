import { ReactNode } from 'react';
import clsx from 'clsx';
import { KenteOverlay } from './KenteOverlay';

type Tone = 'emerald' | 'gold' | 'plum' | 'subtle';

const tones: Record<Tone, { gradient: string; border: string }> = {
  emerald: {
    gradient:
      'bg-[linear-gradient(135deg,rgba(31,138,85,0.22)_0%,#1A2B22_50%,rgba(232,184,74,0.14)_100%)]',
    border: 'border-border-strong',
  },
  gold: {
    gradient:
      'bg-[linear-gradient(135deg,rgba(242,201,92,0.28)_0%,#1A2B22_50%,rgba(184,132,42,0.2)_100%)]',
    border: 'border-accent-muted/70',
  },
  plum: {
    gradient:
      'bg-[linear-gradient(135deg,rgba(91,42,79,0.4)_0%,#1A2B22_50%,rgba(232,184,74,0.14)_100%)]',
    border: 'border-deep/40',
  },
  subtle: {
    gradient: 'bg-[linear-gradient(135deg,#22372D_0%,#1A2B22_50%,#15221C_100%)]',
    border: 'border-border',
  },
};

export function GlowCard({
  children,
  tone = 'emerald',
  texture = true,
  className,
  padding = 'p-6 sm:p-8',
}: {
  children: ReactNode;
  tone?: Tone;
  texture?: boolean;
  className?: string;
  padding?: string;
}) {
  const t = tones[tone];
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-lg border',
        t.gradient,
        t.border,
        'shadow-elevated',
        className,
      )}
    >
      {texture ? <KenteOverlay opacity={0.05} /> : null}
      <div className={clsx('relative z-10', padding)}>{children}</div>
    </div>
  );
}
