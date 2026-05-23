import { useTranslations } from 'next-intl';
import { MessageSquareText, PhoneCall, LineChart, Sparkles, TrendingUp } from 'lucide-react';
import { Section } from '@/components/Section';
import { GlowCard } from '@/components/GlowCard';
import { Reveal } from '@/components/Reveal';
import { IconDisc } from '@/components/IconDisc';

function ContentDemo({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="rounded-md border border-border bg-background/60 p-4 backdrop-blur">
      <div className="flex items-center gap-2 text-caption text-accent">
        <Sparkles className="h-3.5 w-3.5" />
        <span className="uppercase tracking-[0.18em] font-medium">{t('content.demoTone')}</span>
      </div>
      <p className="mt-2 font-serif text-lg text-foreground italic leading-snug">
        &ldquo;{t('content.demoCaption')}&rdquo;
      </p>
      <p className="mt-2 text-caption text-muted-fg">{t('content.demoTime')}</p>
    </div>
  );
}

function AgentDemo({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="rounded-md border border-border bg-background/60 p-4 backdrop-blur space-y-2">
      <div className="flex items-start gap-2">
        <div className="mt-0.5 h-2 w-2 rounded-full bg-accent shrink-0" />
        <p className="text-body text-foreground">{t('agent.demoLine1')}</p>
      </div>
      <div className="flex items-start gap-2 pl-4">
        <div className="mt-0.5 h-2 w-2 rounded-full bg-muted-fg shrink-0" />
        <p className="text-body text-muted">— {t('agent.demoLine2')}</p>
      </div>
      <div className="flex items-start gap-2">
        <div className="mt-0.5 h-2 w-2 rounded-full bg-accent shrink-0" />
        <p className="text-body text-foreground">{t('agent.demoLine3')}</p>
      </div>
      <span className="inline-flex items-center gap-1 text-caption text-success mt-1">
        {t('agent.demoBadge')}
      </span>
    </div>
  );
}

function IntelDemo({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-md border border-border bg-background/60 p-3">
        <p className="text-overline uppercase tracking-[0.18em] text-muted-fg">
          {t('intel.demoKpi1')}
        </p>
        <p className="mt-1 font-serif text-2xl text-foreground">$8,420</p>
        <p className="mt-1 inline-flex items-center gap-1 text-caption text-success">
          <TrendingUp className="h-3 w-3" /> +18%
        </p>
      </div>
      <div className="rounded-md border border-border bg-background/60 p-3">
        <p className="text-overline uppercase tracking-[0.18em] text-muted-fg">
          {t('intel.demoKpi2')}
        </p>
        <p className="mt-1 font-serif text-2xl text-foreground">142</p>
        <p className="mt-1 text-caption text-muted-fg">{t('intel.demoTrend')}</p>
      </div>
    </div>
  );
}

export function Pillars() {
  const t = useTranslations('pillars');

  const pillars = [
    {
      tone: 'emerald' as const,
      disc: 'emerald' as const,
      icon: MessageSquareText,
      label: t('content.label'),
      title: t('content.title'),
      body: t('content.body'),
      demo: <ContentDemo t={t} />,
    },
    {
      tone: 'gold' as const,
      disc: 'gold' as const,
      icon: PhoneCall,
      label: t('agent.label'),
      title: t('agent.title'),
      body: t('agent.body'),
      demo: <AgentDemo t={t} />,
    },
    {
      tone: 'plum' as const,
      disc: 'plum' as const,
      icon: LineChart,
      label: t('intel.label'),
      title: t('intel.title'),
      body: t('intel.body'),
      demo: <IntelDemo t={t} />,
    },
  ];

  return (
    <Section id="features" className="relative bg-white">
      {/* Soft topo decorative lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-30"
        style={{
          background:
            'linear-gradient(180deg, rgba(232,184,74,0.12) 0%, transparent 100%)',
          maskImage: 'linear-gradient(180deg, #000, transparent)',
          WebkitMaskImage: 'linear-gradient(180deg, #000, transparent)',
        }}
      />

      <Reveal direction="up">
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <span className="inline-flex items-center gap-2 text-overline uppercase font-medium text-accent-muted tracking-[0.22em]">
            <span className="h-px w-6 bg-accent-muted/60" />
            {t('overline')}
            <span className="h-px w-6 bg-accent-muted/60" />
          </span>
          <h2 className="font-display text-[2.5rem] sm:text-[3rem] leading-[1.05] tracking-[-0.03em] text-[#0E1A14] max-w-3xl">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-[#4A5750] max-w-2xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} direction="up" delay={i * 140}>
              <GlowCard tone={p.tone} className="group h-full transition-transform duration-500 hover:-translate-y-1">
                <div className="flex flex-col h-full gap-5">
                  <div className="flex items-center justify-between">
                    <IconDisc tone={p.disc} size="md">
                      <Icon className="h-5 w-5" />
                    </IconDisc>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg">
                      0{i + 1} / 03
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-overline uppercase tracking-[0.18em] text-accent">
                      {p.label}
                    </p>
                    <h3 className="font-display text-h1 sm:text-[1.6rem] leading-tight text-foreground">
                      {p.title}
                    </h3>
                    <p className="text-body text-muted leading-relaxed">{p.body}</p>
                  </div>
                  <div className="mt-auto pt-2">{p.demo}</div>
                </div>
              </GlowCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
