'use client';

import { MouseEvent, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Quote, Star } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
import { GlowCard } from '@/components/GlowCard';
import { Reveal } from '@/components/Reveal';

function CursorGlow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group/glow relative h-full"
      style={
        {
          '--mx': '50%',
          '--my': '0%',
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{
          background:
            'radial-gradient(280px circle at var(--mx) var(--my), rgba(232,184,74,0.18), transparent 70%)',
        }}
      />
      {children}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations('testimonials');

  const items = [
    {
      quote: t('items.t1Quote'),
      name: t('items.t1Name'),
      role: t('items.t1Role'),
      tone: 'emerald' as const,
      initials: 'M',
    },
    {
      quote: t('items.t2Quote'),
      name: t('items.t2Name'),
      role: t('items.t2Role'),
      tone: 'gold' as const,
      initials: 'JP',
    },
    {
      quote: t('items.t3Quote'),
      name: t('items.t3Name'),
      role: t('items.t3Role'),
      tone: 'plum' as const,
      initials: 'A',
    },
  ];

  return (
    <Section className="relative">
      <Reveal direction="up">
        <SectionHeading overline={t('overline')} title={t('title')} align="center" />
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.name} direction="up" delay={i * 160}>
            <CursorGlow>
              <GlowCard tone={it.tone} texture={false} className="h-full transition-transform duration-500 hover:-translate-y-1">
                <div className="flex flex-col h-full gap-5">
                  <Quote className="h-8 w-8 text-accent/60" />
                  <p className="font-display italic text-foreground text-lg sm:text-[1.2rem] leading-relaxed flex-1">
                    &ldquo;{it.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border/60">
                    <div
                      className="relative flex h-10 w-10 items-center justify-center rounded-full font-display text-foreground"
                      style={{
                        background:
                          it.tone === 'gold'
                            ? 'linear-gradient(135deg, #E8B84A, #B8842A)'
                            : it.tone === 'plum'
                              ? 'linear-gradient(135deg, #6E3360, #3D1A36)'
                              : 'linear-gradient(135deg, #1F8A55, #15643E)',
                      }}
                    >
                      <span className="text-[15px]">{it.initials}</span>
                    </div>
                    <div>
                      <p className="text-body font-medium text-foreground">{it.name}</p>
                      <p className="text-caption text-muted-fg">{it.role}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-0.5">
                      {[0, 1, 2, 3, 4].map((j) => (
                        <Star
                          key={j}
                          className="h-3.5 w-3.5 fill-accent text-accent"
                          style={{
                            animation: 'fadeInUp 600ms ease-out both',
                            animationDelay: `${i * 160 + j * 60 + 400}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </CursorGlow>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
