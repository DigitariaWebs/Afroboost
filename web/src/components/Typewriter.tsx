'use client';

import clsx from 'clsx';
import { useTypewriter } from '@/lib/motion';

export function Typewriter({
  words,
  className,
  caret = true,
  typeMs,
  deleteMs,
  holdMs,
}: {
  words: string[];
  className?: string;
  caret?: boolean;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
}) {
  const { text } = useTypewriter(words, { typeMs, deleteMs, holdMs });
  return (
    <span className={clsx('inline-block', caret && 'tw-caret', className)}>
      {text || ' '}
    </span>
  );
}
