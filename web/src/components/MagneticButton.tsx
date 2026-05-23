'use client';

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  useRef,
  MouseEvent,
} from 'react';
import clsx from 'clsx';

type CommonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

function useMagnet(strength: number) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate3d(0,0,0)';
  };
  return { ref, onMove, onLeave };
}

export function MagneticLink({
  children,
  className,
  strength = 0.22,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { ref, onMove, onLeave } = useMagnet(strength);
  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={clsx('inline-block transition-transform duration-300 ease-out will-change-transform', className)}
      {...rest}
    >
      {children}
    </a>
  );
}

export function MagneticButton({
  children,
  className,
  strength = 0.22,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { ref, onMove, onLeave } = useMagnet(strength);
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={clsx('inline-block transition-transform duration-300 ease-out will-change-transform', className)}
      {...rest}
    >
      {children}
    </button>
  );
}
