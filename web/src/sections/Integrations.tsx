import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { Marquee } from '@/components/Marquee';

const platforms = [
  { src: '/platforms/fb.png', name: 'Facebook' },
  { src: '/platforms/ig.png', name: 'Instagram' },
  { src: '/platforms/WhatsApp.png', name: 'WhatsApp' },
  { src: '/platforms/googlereviews.png', name: 'Google Reviews' },
  {
    src: '/platforms/google-calendar-logo-google-calendar-icon-free-png.webp',
    name: 'Google Calendar',
  },
];

export function Integrations() {
  const t = useTranslations('integrations');

  return (
    <section className="relative py-16 sm:py-20 border-y border-[#E5E7EB] bg-white overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0E1A14 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <Container>
        <Reveal direction="up">
          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <span className="inline-flex items-center gap-2 text-overline uppercase font-medium tracking-[0.22em] text-accent-muted">
              <span className="h-px w-6 bg-accent-muted/60" />
              {t('overline')}
              <span className="h-px w-6 bg-accent-muted/60" />
            </span>
            <h2 className="font-display text-h1 sm:text-[2.25rem] leading-tight text-[#0E1A14] max-w-2xl">
              {t('title')}
            </h2>
            <p className="text-body text-[#4A5750] max-w-xl">{t('subtitle')}</p>
          </div>
        </Reveal>
      </Container>

      <Reveal direction="up" delay={150}>
        <Marquee speed="fast">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="mx-10 sm:mx-14 flex h-28 w-28 sm:h-36 sm:w-36 shrink-0 items-center justify-center transition hover:-translate-y-0.5"
            >
              <Image
                src={p.src}
                alt={p.name}
                width={144}
                height={144}
                className="h-full w-full object-contain"
                unoptimized
              />
            </div>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
