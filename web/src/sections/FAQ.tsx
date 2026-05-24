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
    <Section id="faq" containerSize="narrow" className="bg-white">
      <Reveal direction="up">
        <SectionHeading overline={t('overline')} title={t('title')} align="center" light />
      </Reveal>
      <div className="flex flex-col gap-3">
        {items.map((it, i) => {
          const open = openIndex === i;
          return (
            <Reveal key={i} direction="up" delay={i * 70}>
              <div
                className={clsx(
                  'group/q relative overflow-hidden rounded-xl border bg-white transition-colors shadow-[0_4px_18px_-12px_rgba(15,30,25,0.18)]',
                  open
                    ? 'border-accent-muted/50 bg-[#FAFBFB]'
                    : 'border-[#E5EAE7] hover:border-accent-muted/40',
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
                  <span className="flex items-baseline gap-3 font-display text-h3 sm:text-lg text-[#0E1A14]">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-accent-muted">
                      0{i + 1}
                    </span>
                    <span>{it.q}</span>
                  </span>
                  <span
                    className={clsx(
                      'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                      open
                        ? 'border-accent-muted bg-accent-muted text-white rotate-[135deg]'
                        : 'border-[#E5EAE7] text-[#6B7570] group-hover/q:border-accent-muted/50 group-hover/q:text-accent-muted',
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
                    <p className="px-5 pb-5 pl-[3.4rem] text-[15px] text-[#4A5750] leading-relaxed">
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
