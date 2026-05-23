import { useTranslations } from 'next-intl';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Globe,
  CircleDot,
  PhoneCall,
  Star,
} from 'lucide-react';
import { Container } from '@/components/Container';
import { StoreBadges } from '@/components/StoreBadges';
import { AIOrb } from '@/components/AIOrb';
import { PhoneMockup } from '@/components/PhoneMockup';
import { KenteOverlay } from '@/components/KenteOverlay';
import { Reveal, RevealLines } from '@/components/Reveal';
import { Typewriter } from '@/components/Typewriter';

export function Hero() {
  const t = useTranslations('hero');
  const root = useTranslations();
  const typewriterWords = root.raw('hero.typewriter') as string[];

  return (
    <section className="relative isolate overflow-hidden pt-10 pb-24 sm:pt-16 sm:pb-32 lg:pt-20">
      {/* Decorative backdrop */}
      <KenteOverlay opacity={0.04} className="-z-10" />
      <div
        aria-hidden
        className="absolute inset-x-0 -top-40 -z-10 h-[760px] blur-3xl animate-spotlight"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(31,138,85,0.45) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 -z-10 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl animate-drift"
        style={{
          background: 'radial-gradient(circle, rgba(232,184,74,0.35), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-[420px] -z-10 h-[460px] w-[460px] rounded-full opacity-50 blur-3xl animate-drift"
        style={{
          animationDelay: '4s',
          background: 'radial-gradient(circle, rgba(91,42,79,0.40), transparent 70%)',
        }}
      />
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(232,184,74,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(232,184,74,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 80%)',
        }}
      />

      <Container size="wide">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7 flex flex-col gap-7">
            {/* Eyebrow chip */}
            <Reveal direction="fade">
              <span className="group inline-flex items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-caption font-medium text-accent backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent/70" />
                  <span className="relative h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="tracking-[0.04em]">{t('eyebrow')}</span>
                <Sparkles className="h-3.5 w-3.5" />
              </span>
            </Reveal>

            {/* Masked headline */}
            <RevealLines
              className="font-display text-foreground text-[2.65rem] leading-[1.02] sm:text-[3.5rem] lg:text-[4.25rem] tracking-[-0.035em]"
              lines={[
                <span key="0">{t('titleStart')}</span>,
                <span key="1" className="text-gold-foil italic">
                  {t('titleAccent')}
                </span>,
              ]}
              stagger={120}
              delay={150}
            />

            {/* Typewriter strap */}
            <Reveal delay={350} direction="fade">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-[1.35rem] sm:text-[1.65rem] leading-tight text-muted">
                <span>{t('typeIntro')}</span>
                <span className="text-foreground">
                  <Typewriter words={typewriterWords} />
                </span>
              </div>
            </Reveal>

            <Reveal delay={500} direction="up">
              <p className="max-w-2xl text-lg sm:text-xl text-muted leading-relaxed">
                {t('subtitle')}
              </p>
            </Reveal>

            <Reveal delay={650} direction="up">
              <div className="flex flex-col gap-4">
                <StoreBadges
                  appStoreLabel={t('appStoreName')}
                  playStoreLabel={t('playName')}
                />
                <a
                  href="#features"
                  className="group inline-flex items-center gap-2 self-start text-caption font-medium text-muted hover:text-accent transition"
                >
                  <span className="link-underline">{t('secondaryCta')}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>

            {/* Trust pills with gradient borders */}
            <Reveal delay={800} direction="up">
              <ul className="flex flex-wrap items-center gap-3 pt-2">
                {[
                  { icon: ShieldCheck, color: 'text-success', label: t('trust1') },
                  { icon: Sparkles, color: 'text-accent', label: t('trust2') },
                  { icon: Globe, color: 'text-info', label: t('trust3') },
                ].map(({ icon: Icon, color, label }) => (
                  <li
                    key={label}
                    className="group relative overflow-hidden rounded-full bg-surface-elevated/40 px-3.5 py-1.5 text-caption text-muted backdrop-blur-sm transition hover:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full p-[1px] opacity-50 transition group-hover:opacity-100"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(232,184,74,0.5), rgba(31,138,85,0.3) 50%, rgba(91,42,79,0.4))',
                        WebkitMask:
                          'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        padding: '1px',
                      }}
                    />
                    <span className="relative inline-flex items-center gap-2">
                      <Icon className={`h-3.5 w-3.5 ${color}`} />
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Phone column */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="scale" delay={350}>
              <div
                className="relative mx-auto flex items-center justify-center"
                style={{ minHeight: 600 }}
              >
                {/* Outer rotating dial */}
                <div
                  aria-hidden
                  className="absolute inset-0 m-auto h-[460px] w-[460px] rounded-full opacity-30"
                  style={{
                    background:
                      'conic-gradient(from 90deg, rgba(232,184,74,0.5), transparent 40%, rgba(31,138,85,0.4) 60%, transparent 100%)',
                    animation: 'rotateSlow 22s linear infinite',
                  }}
                />
                <AIOrb
                  size={420}
                  className="absolute -top-8 -left-8 lg:-left-20 opacity-90 animate-float-slow"
                />

                {/* Floating callout chips */}
                <div className="pointer-events-none absolute left-0 top-10 z-20 hidden md:block">
                  <div className="animate-float">
                    <div className="rounded-md border border-accent/40 bg-background/85 px-3 py-2 text-caption text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.45)] backdrop-blur">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <PhoneCall className="h-3 w-3" />
                        </span>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
                            Appel pris
                          </p>
                          <p className="font-medium">Réservation · 4 pers.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute right-0 bottom-20 z-20 hidden md:block">
                  <div className="animate-float" style={{ animationDelay: '1.5s' }}>
                    <div className="rounded-md border border-success/40 bg-background/85 px-3 py-2 text-caption text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.45)] backdrop-blur">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success/15 text-success">
                          <Star className="h-3 w-3 fill-success" />
                        </span>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-success">
                            Avis 5★ publié
                          </p>
                          <p className="font-medium">Réponse auto envoyée</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 -mr-6 sm:-mr-12 animate-float-slow">
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
            </Reveal>
          </div>
        </div>

        {/* Stats strip */}
        <Reveal delay={950} direction="up">
          <div className="mt-20 grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto">
            {[
              { v: t('statValue1'), l: t('statLabel1'), accent: 'text-gold-foil' },
              { v: t('statValue2'), l: t('statLabel2'), accent: 'text-emerald-foil' },
              { v: t('statValue3'), l: t('statLabel3'), accent: 'text-gold-foil' },
            ].map((s, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-border/60 bg-surface-elevated/40 px-4 py-5 text-center backdrop-blur-sm transition hover:border-accent/40"
              >
                <CircleDot
                  className="absolute right-3 top-3 h-3 w-3 text-accent/40 transition group-hover:text-accent"
                  aria-hidden
                />
                <p className={`font-display text-[2rem] sm:text-[2.5rem] leading-none ${s.accent}`}>
                  {s.v}
                </p>
                <p className="mt-2 text-caption text-muted-fg uppercase tracking-[0.16em]">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
