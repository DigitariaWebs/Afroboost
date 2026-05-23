import { useTranslations } from 'next-intl';
import { Link2, Sparkles, TrendingUp } from 'lucide-react';
import { Section } from '@/components/Section';
import { PhoneMockup } from '@/components/PhoneMockup';
import { Reveal } from '@/components/Reveal';
import { IconDisc } from '@/components/IconDisc';

export function HowItWorks() {
  const t = useTranslations('how');

  const steps = [
    {
      number: t('steps.s1Number'),
      title: t('steps.s1Title'),
      body: t('steps.s1Body'),
      icon: Link2,
      tone: 'emerald' as const,
      src: '/demo-2.gif',
    },
    {
      number: t('steps.s2Number'),
      title: t('steps.s2Title'),
      body: t('steps.s2Body'),
      icon: Sparkles,
      tone: 'gold' as const,
      src: '/demo-3.gif',
    },
    {
      number: t('steps.s3Number'),
      title: t('steps.s3Title'),
      body: t('steps.s3Body'),
      icon: TrendingUp,
      tone: 'plum' as const,
      src: '/demo-1.gif',
    },
  ];

  return (
    <Section id="how" className="relative">
      <Reveal direction="up">
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="inline-flex items-center gap-2 text-overline uppercase font-medium text-accent tracking-[0.22em]">
            <span className="h-px w-6 bg-accent/60" />
            {t('overline')}
            <span className="h-px w-6 bg-accent/60" />
          </span>
          <h2 className="font-display text-display text-foreground max-w-3xl">{t('title')}</h2>
          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </Reveal>

      <div className="relative grid gap-12 lg:grid-cols-3 lg:gap-8">
        {/* Animated kente connector line */}
        <div
          aria-hidden
          className="hidden lg:block absolute top-[88px] left-[10%] right-[10%] h-[2px] overflow-hidden rounded-full"
        >
          <div
            className="h-full w-[200%] animate-marquee-slow"
            style={{
              background:
                'linear-gradient(90deg, transparent, #1F8A55 12%, #E8B84A 30%, #5B2A4F 50%, #1F8A55 68%, #E8B84A 88%, transparent), linear-gradient(90deg, transparent, #1F8A55 12%, #E8B84A 30%, #5B2A4F 50%, #1F8A55 68%, #E8B84A 88%, transparent)',
              backgroundSize: '50% 100%',
            }}
          />
        </div>
        {/* Connector dots */}
        <div aria-hidden className="hidden lg:block absolute top-[82px] left-[10%] w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(232,184,74,0.7)]" />
        <div aria-hidden className="hidden lg:block absolute top-[82px] right-[10%] w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(232,184,74,0.7)]" />

        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} direction="up" delay={i * 180}>
              <div className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 mb-6">
                  <IconDisc tone={s.tone} size="lg">
                    <Icon className="h-7 w-7" />
                  </IconDisc>
                  <span className="absolute -top-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-background text-[10px] font-mono font-semibold text-accent ring-1 ring-accent/50">
                    0{i + 1}
                  </span>
                </div>
                <p className="font-display text-display text-accent/25 mb-1 tabular-nums">{s.number}</p>
                <h3 className="font-display text-h1 sm:text-[1.6rem] text-foreground mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="max-w-xs text-body text-muted leading-relaxed mb-8">{s.body}</p>
                <div className="transition-transform duration-700 group-hover:-translate-y-1">
                  <PhoneMockup src={s.src} alt={s.title} width={220} height={460} />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
