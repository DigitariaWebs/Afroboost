import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { Container } from '@/components/Container';
import { StoreBadges } from '@/components/StoreBadges';
import Plasma from '@/components/Plasma';
import { Reveal, RevealLines } from '@/components/Reveal';

export function FinalCTA() {
  const t = useTranslations('finalCta');
  const hero = useTranslations('hero');

  return (
    <section className="py-20 sm:py-28" id="footer">
      <Container>
        <div className="relative overflow-hidden rounded-xl border border-accent/30 px-6 py-16 sm:px-12 sm:py-20 text-center">
          <div className="absolute inset-0 -z-0">
            <Plasma
              color="#116f50"
              speed={1.2}
              direction="reverse"
              scale={1.1}
              opacity={0.8}
              mouseInteractive
            />
          </div>

          {/* Vignette + grain on top of plasma */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)',
            }}
          />

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-7">
            <Reveal direction="fade">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-background/40 px-3.5 py-1.5 text-caption font-medium text-accent backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                {t('overline')}
              </span>
            </Reveal>

            <RevealLines
              className="font-display text-display sm:text-display-lg text-foreground leading-[1.05] tracking-[-0.03em]"
              lines={[<span key="0">{t('title')}</span>]}
            />

            <Reveal direction="up" delay={250}>
              <p className="text-lg text-foreground/85 max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
                {t('subtitle')}
              </p>
            </Reveal>

            <Reveal direction="up" delay={400}>
              <StoreBadges
                className="justify-center pt-2"
                appStoreLabel={hero('appStoreName')}
                playStoreLabel={hero('playName')}
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
