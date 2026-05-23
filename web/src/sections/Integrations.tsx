import { useTranslations } from 'next-intl';
import {
  Facebook,
  Instagram,
  MessageCircle,
  MessagesSquare,
  Star,
  Calendar,
  Mail,
  ShoppingBag,
  CreditCard,
  Phone,
} from 'lucide-react';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { Marquee } from '@/components/Marquee';

const items = [
  { Icon: Facebook, name: 'Facebook' },
  { Icon: Instagram, name: 'Instagram' },
  { Icon: MessageCircle, name: 'WhatsApp' },
  { Icon: MessagesSquare, name: 'SMS' },
  { Icon: Star, name: 'Google Reviews' },
  { Icon: Calendar, name: 'Google Calendar' },
];

const marqueeItems = [
  { Icon: Mail, name: 'Gmail' },
  { Icon: ShoppingBag, name: 'Shopify' },
  { Icon: CreditCard, name: 'Stripe' },
  { Icon: Phone, name: 'Twilio' },
  { Icon: Calendar, name: 'Calendly' },
  { Icon: Facebook, name: 'Meta Ads' },
  { Icon: Instagram, name: 'Reels' },
  { Icon: Star, name: 'Yelp' },
];

export function Integrations() {
  const t = useTranslations('integrations');

  return (
    <section className="relative py-16 sm:py-20 border-y border-[#E5E7EB] bg-white overflow-hidden">
      {/* subtle dotted backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #0E1A14 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <Container>
        <Reveal direction="up">
          <div className="flex flex-col items-center text-center gap-3 mb-10">
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

        <Reveal direction="up" delay={120}>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
            {items.map(({ Icon, name }, i) => (
              <div
                key={name}
                className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-[#E5E7EB] bg-[#FAFBFB] px-4 py-5 transition hover:-translate-y-0.5 hover:border-accent/60 hover:bg-white hover:shadow-[0_10px_24px_-12px_rgba(232,184,74,0.4)]"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(232,184,74,0.15),transparent)] opacity-0 transition-opacity group-hover:opacity-100"
                />
                <Icon className="relative h-6 w-6 text-[#4A5750] transition group-hover:text-accent-muted" />
                <span className="relative text-caption font-medium text-[#6B7570] transition group-hover:text-[#0E1A14]">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>

      <Reveal direction="up" delay={250}>
        <div className="mt-10">
          <Marquee speed="slow">
            {marqueeItems.map(({ Icon, name }) => (
              <div
                key={name}
                className="mx-3 flex items-center gap-2.5 rounded-full border border-[#ECECEC] bg-white px-5 py-2.5 text-[13px] font-medium text-[#4A5750]"
              >
                <Icon className="h-4 w-4 text-accent-muted" />
                {name}
                <span className="mx-2 h-1 w-1 rounded-full bg-[#D6D6D6]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9CA39E]">
                  connected
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
