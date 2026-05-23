import { useTranslations } from 'next-intl';
import { MapPin, Quote } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
import { GlowCard } from '@/components/GlowCard';
import { Reveal } from '@/components/Reveal';

function FounderAvatar({
  initials,
  accent,
}: {
  initials: string;
  accent: 'emerald' | 'gold';
}) {
  return (
    <span className="relative inline-grid h-24 w-24 place-items-center">
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-70 animate-rotate-slow"
        style={{
          background:
            accent === 'gold'
              ? 'conic-gradient(from 0deg, #E8B84A, transparent 40%, #F2C95C 70%, transparent 100%)'
              : 'conic-gradient(from 0deg, #1F8A55, transparent 40%, #3DAA68 70%, transparent 100%)',
          WebkitMask: 'radial-gradient(circle, transparent 64%, #000 66%)',
          mask: 'radial-gradient(circle, transparent 64%, #000 66%)',
        }}
      />
      <span
        className="relative flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-full border-2 font-display text-3xl text-foreground"
        style={{
          background:
            accent === 'gold'
              ? 'radial-gradient(circle at 30% 30%, #F2C95C, #B8842A)'
              : 'radial-gradient(circle at 30% 30%, #3DAA68, #15643E)',
          borderColor: accent === 'gold' ? '#E8B84A' : '#1F8A55',
          boxShadow:
            accent === 'gold'
              ? 'inset 0 1px 0 rgba(255,240,200,0.5), 0 0 30px rgba(232,184,74,0.35)'
              : 'inset 0 1px 0 rgba(200,245,220,0.4), 0 0 30px rgba(31,138,85,0.35)',
        }}
      >
        {initials}
      </span>
    </span>
  );
}

export function Founders() {
  const t = useTranslations('founders');

  return (
    <Section id="founders" className="relative">
      <Reveal direction="up">
        <SectionHeading overline={t('overline')} title={t('title')} align="center" />
      </Reveal>

      <Reveal direction="up" delay={200}>
        <GlowCard tone="subtle" className="max-w-4xl mx-auto">
          <div className="grid gap-10 md:grid-cols-12 items-center">
            <div className="md:col-span-7 space-y-5">
              <Quote className="h-6 w-6 text-accent/70" />
              <p className="font-display italic text-foreground text-xl sm:text-[1.4rem] leading-relaxed">
                {t('body1')}
              </p>
              <p className="text-body text-muted leading-relaxed">{t('body2')}</p>
              <div className="inline-flex items-center gap-2 text-caption text-muted-fg">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {t('location')}
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-3">
                  <FounderAvatar initials="PK" accent="emerald" />
                  <div className="text-center">
                    <p className="font-display text-foreground">{t('p1Name')}</p>
                    <p className="text-caption text-muted-fg uppercase tracking-[0.16em]">
                      {t('p1Role')}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <FounderAvatar initials="D" accent="gold" />
                  <div className="text-center">
                    <p className="font-display text-foreground">{t('p2Name')}</p>
                    <p className="text-caption text-muted-fg uppercase tracking-[0.16em]">
                      {t('p2Role')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlowCard>
      </Reveal>
    </Section>
  );
}
