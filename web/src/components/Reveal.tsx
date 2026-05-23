'use client';

import { CSSProperties, ElementType, ReactNode } from 'react';
import clsx from 'clsx';
import { useReveal } from '@/lib/motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

export function Reveal({
  children,
  as: As = 'div',
  direction = 'up',
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  direction?: Direction;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const mergedStyle: CSSProperties = {
    transitionDelay: delay ? `${delay}ms` : undefined,
    ...style,
  };
  return (
    <As
      ref={ref}
      style={mergedStyle}
      className={clsx('reveal', `reveal-${direction}`, visible && 'is-visible', className)}
    >
      {children}
    </As>
  );
}

export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 90,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={clsx(visible && 'is-visible', className)}>
      {lines.map((line, i) => (
        <span key={i} className={clsx('mask-line', lineClassName)}>
          <span style={{ transitionDelay: `${delay + i * stagger}ms` }}>{line}</span>
        </span>
      ))}
    </div>
  );
}
