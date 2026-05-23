import { useTranslations } from 'next-intl';
import { Link2, Sparkles, TrendingUp } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
import { PhoneMockup } from '@/components/PhoneMockup';

export function HowItWorks() {
  const t = useTranslations('how');

  const steps = [
    {
      number: t('steps.s1Number'),
      title: t('steps.s1Title'),
      body: t('steps.s1Body'),
      icon: Link2,
      src: '/demo-2.gif',
    },
    {
      number: t('steps.s2Number'),
      title: t('steps.s2Title'),
      body: t('steps.s2Body'),
      icon: Sparkles,
      src: '/demo-3.gif',
    },
    {
      number: t('steps.s3Number'),
      title: t('steps.s3Title'),
      body: t('steps.s3Body'),
      icon: TrendingUp,
      src: '/demo-1.gif',
    },
  ];

  return (
    <Section id="how" className="relative">
      <SectionHeading
        overline={t('overline')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="center"
      />

      <div className="relative grid gap-12 lg:grid-cols-3 lg:gap-8">
        <div
          aria-hidden
          className="hidden lg:block absolute top-[120px] left-[15%] right-[15%] h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #1F8A55 20%, #E8B84A 50%, #5B2A4F 80%, transparent 100%)',
            opacity: 0.4,
          }}
        />
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-surface-elevated">
                <Icon className="h-6 w-6 text-accent" />
                <span className="absolute -top-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-fg">
                  {i + 1}
                </span>
              </div>
              <p className="font-serif text-display text-accent/40 mb-1">{s.number}</p>
              <h3 className="font-serif text-h1 text-foreground mb-3">{s.title}</h3>
              <p className="max-w-xs text-body text-muted leading-relaxed mb-8">{s.body}</p>
              <PhoneMockup src={s.src} alt={s.title} width={220} height={460} />
            </div>
          );
        })}
      </div>
    </Section>
  );
}
