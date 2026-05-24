'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
import { ButtonLink } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { APP_STORE_URL } from '@/components/StoreBadges';
import { Reveal } from '@/components/Reveal';
import { useCounter, useReveal } from '@/lib/motion';

type PlanKey = 'discovery' | 'performance' | 'premium';

function AnimatedPrice({ value, prefix = '$' }: { value: number; prefix?: string }) {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const v = useCounter(value, 1100, visible);
  return (
    <span ref={ref} className="font-display tabular-nums text-[3rem] sm:text-[3.5rem] leading-none text-foreground">
      {prefix}
      {v}
    </span>
  );
}

export function Pricing() {
  const t = useTranslations('pricing');
  const [annual, setAnnual] = useState(true);

  const monthly: Record<PlanKey, number> = {
    discovery: 49,
    performance: 97,
    premium: 197,
  };
  const price = (n: number) => (annual ? Math.round(n * 0.85) : n);
  const period = annual ? t('perYear') : t('perMonth');

  const plans: {
    key: PlanKey;
    features: string[];
    popular?: boolean;
    comingSoon?: boolean;
  }[] = [
    {
      key: 'discovery',
      features: ['f1', 'f2', 'f3', 'f4', 'f5'],
    },
    {
      key: 'performance',
      popular: true,
      features: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'],
    },
    {
      key: 'premium',
      comingSoon: true,
      features: ['f1', 'f2', 'f3', 'f4', 'f5'],
    },
  ];

  return (
    <Section id="pricing" className="relative">
      <Reveal direction="up">
        <SectionHeading
          overline={t('overline')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
        />
      </Reveal>

      <Reveal direction="up" delay={120}>
        <div className="flex justify-center mb-10">
          <div
            role="group"
            aria-label="Billing period"
            className="relative inline-grid grid-cols-2 items-center rounded-full border border-border bg-surface-elevated/70 p-1 backdrop-blur min-w-[260px]"
          >
            <span
              className={clsx(
                'absolute top-1 bottom-1 rounded-full bg-[linear-gradient(120deg,#F2C95C,#E8B84A,#B8842A)] shadow-[0_0_20px_rgba(232,184,74,0.45)] transition-transform duration-500 ease-out',
                annual ? 'translate-x-full' : 'translate-x-0',
              )}
              style={{ width: 'calc(50% - 4px)', left: 4 }}
              aria-hidden
            />
            {[
              { key: 'monthly', label: t('monthly'), active: !annual, onClick: () => setAnnual(false) },
              { key: 'annual', label: t('annual'), active: annual, onClick: () => setAnnual(true) },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={tab.onClick}
                className={clsx(
                  'relative z-10 inline-flex items-center justify-center gap-1.5 px-5 py-2 text-caption font-medium transition-colors',
                  tab.active ? 'text-accent-fg' : 'text-muted hover:text-foreground',
                )}
              >
                {tab.label}
                {tab.key === 'annual' ? (
                  <span
                    className={clsx(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-semibold transition-colors',
                      tab.active
                        ? 'bg-accent-fg/15 text-accent-fg'
                        : 'bg-success/15 text-success',
                    )}
                  >
                    {t('annualBadge')}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3 items-stretch">
        {plans.map((plan, i) => {
          const isPopular = !!plan.popular;
          const isSoon = !!plan.comingSoon;
          return (
            <Reveal key={plan.key} direction="up" delay={i * 140}>
              <div
                className={clsx(
                  'group relative flex flex-col rounded-lg border bg-surface-elevated p-7 transition-all duration-500',
                  isPopular
                    ? 'border-accent shadow-glow-gold scale-[1.02] hover:-translate-y-1'
                    : 'border-border hover:border-accent/40 hover:-translate-y-1',
                  isSoon && 'opacity-75',
                )}
              >
                {isPopular ? (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-px rounded-lg opacity-50 blur-md"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(232,184,74,0.4), transparent 60%, rgba(31,138,85,0.3))',
                      }}
                    />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(120deg,#F2C95C,#E8B84A,#B8842A)] border border-[#15643E]/40 px-3 py-1 text-caption font-bold tracking-wide text-[#15643E] shadow-[0_8px_22px_rgba(232,184,74,0.55)]">
                        <Sparkles className="h-3 w-3" /> {t('popular')}
                      </span>
                    </div>
                  </>
                ) : null}
                {isSoon ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge tone="muted">{t('comingSoon')}</Badge>
                  </div>
                ) : null}

                <div className="relative flex flex-col gap-1.5">
                  <h3 className="font-display text-h1 sm:text-[1.65rem] text-foreground">
                    {t(`plans.${plan.key}.name`)}
                  </h3>
                  <p className="text-body text-muted">{t(`plans.${plan.key}.tagline`)}</p>
                </div>

                <div className="relative flex items-baseline gap-1 mt-6 mb-6">
                  <AnimatedPrice value={price(monthly[plan.key])} />
                  <span className="text-body text-muted-fg">{period}</span>
                </div>

                <ul className="relative flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((fKey) => (
                    <li
                      key={fKey}
                      className="flex items-start gap-3 text-body text-foreground"
                    >
                      <span
                        className={clsx(
                          'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                          isPopular
                            ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
                            : 'bg-primary/15 text-primary ring-1 ring-primary/30',
                        )}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{t(`plans.${plan.key}.${fKey}`)}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href={isSoon ? '#footer' : APP_STORE_URL}
                  target={isSoon ? undefined : '_blank'}
                  rel={isSoon ? undefined : 'noopener noreferrer'}
                  variant={isPopular ? 'gold' : 'outline'}
                  fullWidth
                  className="relative shine-mask"
                >
                  {isSoon ? t('ctaSoon') : t('cta')}
                </ButtonLink>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal direction="up" delay={500}>
        <div className="mt-14 flex items-center justify-center gap-2 text-caption text-muted">
          <ShieldCheck className="h-4 w-4 text-success" />
          <span>{t('guarantee')}</span>
        </div>
      </Reveal>
    </Section>
  );
}
