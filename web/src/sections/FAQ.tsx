'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Plus, Minus } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';

export function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    q: t(`items.q${n}`),
    a: t(`items.a${n}`),
  }));

  return (
    <Section id="faq" containerSize="narrow">
      <SectionHeading
        overline={t('overline')}
        title={t('title')}
        align="center"
      />
      <div className="flex flex-col gap-3">
        {items.map((it, i) => {
          const open = openIndex === i;
          return (
            <div
              key={i}
              className={clsx(
                'rounded-md border bg-surface-elevated/60 transition-colors',
                open ? 'border-accent/40' : 'border-border hover:border-border-strong',
              )}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
              >
                <span className="font-serif text-h3 sm:text-lg text-foreground">{it.q}</span>
                <span
                  className={clsx(
                    'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition',
                    open ? 'border-accent bg-accent text-accent-fg' : 'border-border text-muted',
                  )}
                  aria-hidden
                >
                  {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>
              <div
                className={clsx(
                  'grid transition-all duration-300 ease-out',
                  open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-body text-muted leading-relaxed">{it.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
