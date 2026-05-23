import { ReactNode } from 'react';
import clsx from 'clsx';

export function Marquee({
  children,
  speed = 'normal',
  className,
  pauseOnHover = true,
}: {
  children: ReactNode;
  speed?: 'slow' | 'normal';
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={clsx('marquee-mask overflow-hidden', className)}>
      <div
        className={clsx(
          'flex w-max',
          speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee',
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
