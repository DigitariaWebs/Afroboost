import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
import { GlowCard } from '@/components/GlowCard';

function FounderAvatar({ initials, accent }: { initials: string; accent: 'emerald' | 'gold' }) {
  return (
    <div
      className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 font-serif text-3xl text-foreground"
      style={{
        background:
          accent === 'gold'
            ? 'radial-gradient(circle at 30% 30%, #F2C95C, #B8842A)'
            : 'radial-gradient(circle at 30% 30%, #3DAA68, #15643E)',
        borderColor: accent === 'gold' ? '#E8B84A' : '#1F8A55',
        boxShadow:
          accent === 'gold'
            ? '0 0 30px rgba(232,184,74,0.35)'
            : '0 0 30px rgba(31,138,85,0.35)',
      }}
    >
      {initials}
    </div>
  );
}

export function Founders() {
  const t = useTranslations('founders');

  return (
    <Section id="founders">
      <SectionHeading overline={t('overline')} title={t('title')} align="center" />

      <GlowCard tone="subtle" className="max-w-4xl mx-auto">
        <div className="grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7 space-y-5">
            <p className="font-serif italic text-foreground text-xl leading-relaxed">
              &ldquo;{t('body1')}&rdquo;
            </p>
            <p className="text-body text-muted leading-relaxed">{t('body2')}</p>
            <div className="inline-flex items-center gap-2 text-caption text-muted-fg">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {t('location')}
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-center gap-2">
                <FounderAvatar initials="PK" accent="emerald" />
                <div className="text-center">
                  <p className="font-serif text-foreground">{t('p1Name')}</p>
                  <p className="text-caption text-muted-fg">{t('p1Role')}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FounderAvatar initials="D" accent="gold" />
                <div className="text-center">
                  <p className="font-serif text-foreground">{t('p2Name')}</p>
                  <p className="text-caption text-muted-fg">{t('p2Role')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlowCard>
    </Section>
  );
}
