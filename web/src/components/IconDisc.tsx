import { ReactNode } from 'react';
import clsx from 'clsx';

type Tone = 'gold' | 'emerald' | 'plum';
type Size = 'sm' | 'md' | 'lg';

const sizes: Record<Size, { box: string; inner: string; ring: string }> = {
  sm: { box: 'h-10 w-10', inner: 'h-7 w-7', ring: 'h-12 w-12' },
  md: { box: 'h-14 w-14', inner: 'h-10 w-10', ring: 'h-16 w-16' },
  lg: { box: 'h-20 w-20', inner: 'h-14 w-14', ring: 'h-24 w-24' },
};

const disc: Record<Tone, string> = {
  gold: 'gold-disc',
  emerald: 'emerald-disc',
  plum: 'plum-disc',
};

export function IconDisc({
  children,
  tone = 'gold',
  size = 'md',
  ring = true,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  ring?: boolean;
  className?: string;
}) {
  const s = sizes[size];
  return (
    <span className={clsx('relative inline-grid place-items-center', s.box, className)}>
      {ring ? (
        <span
          aria-hidden
          className={clsx(
            'absolute rounded-full opacity-60 conic-gold',
            s.ring,
          )}
          style={{
            WebkitMask: 'radial-gradient(circle, transparent 60%, #000 62%)',
            mask: 'radial-gradient(circle, transparent 60%, #000 62%)',
          }}
        />
      ) : null}
      <span
        className={clsx(
          'relative grid place-items-center rounded-full text-[#1A1410]',
          disc[tone],
          s.inner,
        )}
      >
        {children}
      </span>
    </span>
  );
}
