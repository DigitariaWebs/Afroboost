import { ReactNode } from 'react';
import clsx from 'clsx';

export function Marquee({
  children,
  speed = 'normal',
  className,
  pauseOnHover = true,
}: {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  pauseOnHover?: boolean;
}) {
  const speedClass =
    speed === 'slow'
      ? 'animate-marquee-slow'
      : speed === 'fast'
        ? 'animate-marquee-fast'
        : 'animate-marquee';
  return (
    <div className={clsx('marquee-mask overflow-hidden', className)}>
      <div
        className={clsx(
          'flex w-max',
          speedClass,
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
