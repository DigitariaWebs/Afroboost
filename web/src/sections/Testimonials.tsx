import { useTranslations } from 'next-intl';
import { Quote, Star } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
import { GlowCard } from '@/components/GlowCard';

// TODO: replace these placeholder testimonials with real customer quotes before launch.
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
    <Section>
      <SectionHeading
        overline={t('overline')}
        title={t('title')}
        align="center"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <GlowCard key={it.name} tone={it.tone} texture={false} className="h-full">
            <div className="flex flex-col h-full gap-5">
              <Quote className="h-7 w-7 text-accent/70" />
              <p className="font-serif italic text-foreground text-lg leading-relaxed flex-1">
                &ldquo;{it.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-border/60">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full font-serif text-foreground"
                  style={{
                    background: 'linear-gradient(135deg, #1F8A55, #5B2A4F)',
                  }}
                >
                  {it.initials}
                </div>
                <div>
                  <p className="text-body font-medium text-foreground">{it.name}</p>
                  <p className="text-caption text-muted-fg">{it.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </Section>
  );
}
