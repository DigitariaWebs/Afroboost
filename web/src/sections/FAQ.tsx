'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
import { Reveal } from '@/components/Reveal';

export function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    q: t(`items.q${n}`),
    a: t(`items.a${n}`),
  }));

  return (
    <Section id="faq" containerSize="narrow">
      <Reveal direction="up">
        <SectionHeading overline={t('overline')} title={t('title')} align="center" />
      </Reveal>
      <div className="flex flex-col gap-3">
        {items.map((it, i) => {
          const open = openIndex === i;
          return (
            <Reveal key={i} direction="up" delay={i * 70}>
              <div
                className={clsx(
                  'group/q relative overflow-hidden rounded-md border bg-surface-elevated/60 transition-colors',
                  open
                    ? 'border-accent/50 bg-surface-elevated'
                    : 'border-border hover:border-border-strong',
                )}
              >
                {open ? (
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(180deg,#E8B84A,#1F8A55)]"
                  />
                ) : null}
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="flex items-baseline gap-3 font-display text-h3 sm:text-lg text-foreground">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-accent/70">
                      0{i + 1}
                    </span>
                    <span>{it.q}</span>
                  </span>
                  <span
                    className={clsx(
                      'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                      open
                        ? 'border-accent bg-accent text-accent-fg rotate-[135deg]'
                        : 'border-border text-muted group-hover/q:border-accent/50 group-hover/q:text-accent',
                    )}
                    aria-hidden
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </button>
                <div
                  className={clsx(
                    'grid transition-all duration-500 ease-out',
                    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pl-[3.4rem] text-body text-muted leading-relaxed">
                      {it.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
