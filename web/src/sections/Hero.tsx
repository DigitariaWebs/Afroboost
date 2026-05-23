import { useTranslations } from 'next-intl';
import { ArrowRight, ShieldCheck, Sparkles, Globe } from 'lucide-react';
import { Container } from '@/components/Container';
import { StoreBadges } from '@/components/StoreBadges';
import { AIOrb } from '@/components/AIOrb';
import { PhoneMockup } from '@/components/PhoneMockup';
import { KenteOverlay } from '@/components/KenteOverlay';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden pt-12 pb-24 sm:pt-16 sm:pb-32 lg:pt-20">
      <KenteOverlay opacity={0.04} className="-z-10" />
      <div
        aria-hidden
        className="absolute inset-x-0 -top-40 -z-10 h-[700px] blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(31,138,85,0.45) 0%, transparent 70%)',
        }}
      />

      <Container size="wide">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7 flex flex-col gap-7">
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-caption font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              {t('eyebrow')}
            </span>

            <h1 className="font-serif text-foreground text-[2.5rem] leading-[1.05] sm:text-[3.25rem] lg:text-[4rem] tracking-[-0.025em]">
              <span className="block">{t('titleStart')}</span>
              <span
                className="block italic"
                style={{
                  background:
                    'linear-gradient(120deg, #F2C95C 0%, #E8B84A 50%, #B8842A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('titleAccent')}
              </span>
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-muted leading-relaxed">
              {t('subtitle')}
            </p>

            <div className="flex flex-col gap-4">
              <StoreBadges
                appStoreLabel={t('appStoreName')}
                playStoreLabel={t('playName')}
              />
              <a
                href="#features"
                className="inline-flex items-center gap-2 self-start text-caption font-medium text-muted hover:text-accent transition"
              >
                {t('secondaryCta')}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-caption text-muted">
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" />
                {t('trust1')}
              </li>
              <li className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                {t('trust2')}
              </li>
              <li className="inline-flex items-center gap-2">
                <Globe className="h-4 w-4 text-info" />
                {t('trust3')}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto flex items-center justify-center" style={{ minHeight: 560 }}>
              <AIOrb
                size={420}
                className="absolute -top-8 -left-8 lg:-left-20 opacity-90"
              />
              <div className="relative z-10 -mr-6 sm:-mr-12">
                <PhoneMockup
                  src="/demo-1.gif"
                  alt="AfroBoost dashboard"
                  width={300}
                  height={620}
                  tilt
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
