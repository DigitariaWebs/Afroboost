import { useTranslations } from 'next-intl';
import { MapPin, Quote } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
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
        className="relative flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-full border-2 font-display text-3xl text-white"
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
    <Section id="founders" className="relative bg-white">
      <Reveal direction="up">
        <SectionHeading overline={t('overline')} title={t('title')} align="center" light />
      </Reveal>

      <Reveal direction="up" delay={200}>
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-2xl border border-[#E5EAE7] bg-[#FAFBFB] p-8 sm:p-10 shadow-[0_18px_50px_-28px_rgba(15,30,25,0.25)]">
          {/* Tone-colored top rail */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#1F8A55,#E8B84A,#5B2A4F)]"
          />
          {/* Soft tone glow at top-right */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(232,184,74,0.35), transparent 70%)',
            }}
          />

          <div className="relative grid gap-10 md:grid-cols-12 items-center">
            <div className="md:col-span-7 space-y-5">
              <Quote className="h-7 w-7 text-accent-muted/80" />
              <p className="font-display italic text-[#0E1A14] text-xl sm:text-[1.4rem] leading-relaxed">
                {t('body1')}
              </p>
              <p className="text-[15px] text-[#4A5750] leading-relaxed">{t('body2')}</p>
              <div className="inline-flex items-center gap-2 text-[13px] text-[#6B7570]">
                <MapPin className="h-4 w-4 text-accent-muted" />
                {t('location')}
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-3">
                  <FounderAvatar initials="PK" accent="emerald" />
                  <div className="text-center">
                    <p className="font-display text-[#0E1A14]">{t('p1Name')}</p>
                    <p className="text-[11px] text-[#6B7570] uppercase tracking-[0.18em]">
                      {t('p1Role')}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <FounderAvatar initials="D" accent="gold" />
                  <div className="text-center">
                    <p className="font-display text-[#0E1A14]">{t('p2Name')}</p>
                    <p className="text-[11px] text-[#6B7570] uppercase tracking-[0.18em]">
                      {t('p2Role')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
