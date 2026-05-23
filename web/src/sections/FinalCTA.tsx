import { useTranslations } from 'next-intl';
import { Container } from '@/components/Container';
import { StoreBadges } from '@/components/StoreBadges';
import { KenteOverlay } from '@/components/KenteOverlay';
import { AIOrb } from '@/components/AIOrb';

export function FinalCTA() {
  const t = useTranslations('finalCta');
  const hero = useTranslations('hero');

  return (
    <section className="py-20 sm:py-28" id="footer">
      <Container>
        <div
          className="relative overflow-hidden rounded-xl border border-accent/30 px-6 py-16 sm:px-12 sm:py-20 text-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(31,138,85,0.35) 0%, rgba(232,184,74,0.25) 50%, rgba(91,42,79,0.3) 100%)',
          }}
        >
          <KenteOverlay opacity={0.07} />
          <div className="absolute -top-10 -right-10 opacity-50 -z-0">
            <AIOrb size={260} />
          </div>

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
            <span className="text-overline uppercase font-medium tracking-[0.18em] text-accent">
              {t('overline')}
            </span>
            <h2 className="font-serif text-display sm:text-display-lg text-foreground leading-[1.05]">
              {t('title')}
            </h2>
            <p className="text-lg text-muted max-w-xl">{t('subtitle')}</p>
            <StoreBadges
              className="justify-center pt-2"
              appStoreLabel={hero('appStoreName')}
              playStoreLabel={hero('playName')}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
