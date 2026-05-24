'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { PhoneMockup } from '@/components/PhoneMockup';

export function HowItWorks() {
  const t = useTranslations('how');
  const [index, setIndex] = useState(0);

  const steps = [
    {
      number: t('steps.s1Number'),
      title: t('steps.s1Title'),
      body: t('steps.s1Body'),
      src: '/images/connect.png',
    },
    {
      number: t('steps.s2Number'),
      title: t('steps.s2Title'),
      body: t('steps.s2Body'),
      src: '/images/ai.png',
    },
    {
      number: t('steps.s3Number'),
      title: t('steps.s3Title'),
      body: t('steps.s3Body'),
      src: '/images/insight.png',
    },
  ];

  const total = steps.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <Section id="how" className="relative">
      <Reveal direction="up">
        <div className="flex flex-col items-center text-center gap-3 mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-overline uppercase font-medium text-accent tracking-[0.22em]">
            <span className="h-px w-6 bg-accent/60" />
            {t('overline')}
            <span className="h-px w-6 bg-accent/60" />
          </span>
          <h2 className="font-display text-display text-foreground max-w-3xl">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </Reveal>

      <Reveal direction="up" delay={120}>
        <div className="relative mx-auto max-w-5xl">
          {/* Stage */}
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16 lg:min-h-[560px]">
            {/* Phone */}
            <div className="relative flex justify-center order-2 lg:order-1 h-[580px] lg:h-auto">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className={clsx(
                    'absolute inset-0 flex justify-center transition-all duration-700 ease-out',
                    i === index
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3 pointer-events-none',
                  )}
                  aria-hidden={i !== index}
                >
                  <PhoneMockup
                    src={s.src}
                    alt={s.title}
                    width={300}
                    height={560}
                    fit="contain"
                    imageScale={0.88}
                    screenBg="radial-gradient(circle at 50% 30%, rgba(31,138,85,0.28) 0%, rgba(14,26,20,0.95) 60%, #0E1A14 100%)"
                  />
                </div>
              ))}
            </div>

            {/* Copy */}
            <div className="relative order-1 lg:order-2">
              <div className="relative min-h-[220px] lg:min-h-[260px]">
                {steps.map((s, i) => (
                  <div
                    key={s.title}
                    className={clsx(
                      'absolute inset-0 transition-all duration-700 ease-out',
                      i === index
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4 pointer-events-none',
                    )}
                    aria-hidden={i !== index}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent mb-3">
                      Étape {s.number}
                    </p>
                    <h3 className="font-display text-[2rem] sm:text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-foreground mb-4">
                      {s.title}
                    </h3>
                    <p className="text-base sm:text-lg text-muted leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous step"
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-surface-elevated/70 text-foreground backdrop-blur transition hover:border-accent/60 hover:bg-surface-elevated hover:-translate-x-0.5"
            >
              <ChevronLeft className="h-5 w-5 transition group-hover:text-accent" />
            </button>

            <div className="relative flex items-center gap-3">
              <span className="font-display tabular-nums text-[2.25rem] leading-none text-gold-foil">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-fg">
                / 0{total}
              </span>
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next step"
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-surface-elevated/70 text-foreground backdrop-blur transition hover:border-accent/60 hover:bg-surface-elevated hover:translate-x-0.5"
            >
              <ChevronRight className="h-5 w-5 transition group-hover:text-accent" />
            </button>
          </div>

          {/* Step dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to step ${i + 1}`}
                aria-current={i === index ? 'step' : undefined}
                className={clsx(
                  'h-1.5 rounded-full transition-all duration-500',
                  i === index
                    ? 'w-10 bg-accent shadow-[0_0_10px_rgba(232,184,74,0.5)]'
                    : 'w-1.5 bg-border-strong hover:bg-accent/60',
                )}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
