'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Check, ShieldCheck } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
import { ButtonLink } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { APP_STORE_URL } from '@/components/StoreBadges';

type PlanKey = 'discovery' | 'performance' | 'premium';

export function Pricing() {
  const t = useTranslations('pricing');
  const [annual, setAnnual] = useState(false);

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
    <Section id="pricing">
      <SectionHeading
        overline={t('overline')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="center"
      />

      <div className="flex justify-center mb-10">
        <div
          role="group"
          aria-label="Billing period"
          className="relative inline-flex items-center rounded-full border border-border bg-surface-elevated p-1"
        >
          <span
            className={clsx(
              'absolute top-1 bottom-1 w-1/2 rounded-full bg-accent transition-transform duration-300 ease-out',
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
                'relative z-10 inline-flex items-center gap-1.5 px-5 py-2 text-caption font-medium transition-colors',
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

      <div className="grid gap-6 md:grid-cols-3 items-stretch">
        {plans.map((plan) => {
          const isPopular = !!plan.popular;
          const isSoon = !!plan.comingSoon;
          return (
            <div
              key={plan.key}
              className={clsx(
                'relative flex flex-col rounded-lg border bg-surface-elevated p-7 transition',
                isPopular
                  ? 'border-accent shadow-glow-gold scale-[1.02]'
                  : 'border-border hover:border-border-strong',
                isSoon && 'opacity-75',
              )}
            >
              {isPopular ? (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge tone="gold">{t('popular')}</Badge>
                </div>
              ) : null}
              {isSoon ? (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge tone="muted">{t('comingSoon')}</Badge>
                </div>
              ) : null}

              <div className="flex flex-col gap-1.5">
                <h3 className="font-serif text-h1 text-foreground">
                  {t(`plans.${plan.key}.name`)}
                </h3>
                <p className="text-body text-muted">{t(`plans.${plan.key}.tagline`)}</p>
              </div>

              <div className="flex items-baseline gap-1 mt-6 mb-6">
                <span className="font-serif text-metric text-foreground">
                  ${price(monthly[plan.key])}
                </span>
                <span className="text-body text-muted-fg">{period}</span>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((fKey) => (
                  <li key={fKey} className="flex items-start gap-3 text-body text-foreground">
                    <Check
                      className={clsx(
                        'h-4 w-4 mt-1 shrink-0',
                        isPopular ? 'text-accent' : 'text-primary',
                      )}
                    />
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
              >
                {isSoon ? t('ctaSoon') : t('cta')}
              </ButtonLink>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex items-center justify-center gap-2 text-caption text-muted">
        <ShieldCheck className="h-4 w-4 text-success" />
        <span>{t('guarantee')}</span>
      </div>
    </Section>
  );
}
