import { useTranslations } from 'next-intl';
import { Facebook, Instagram, MessageCircle, MessagesSquare, Star, Calendar } from 'lucide-react';
import { Container } from '@/components/Container';

const items = [
  { Icon: Facebook, name: 'Facebook' },
  { Icon: Instagram, name: 'Instagram' },
  { Icon: MessageCircle, name: 'WhatsApp' },
  { Icon: MessagesSquare, name: 'SMS' },
  { Icon: Star, name: 'Google Reviews' },
  { Icon: Calendar, name: 'Google Calendar' },
];

export function Integrations() {
  const t = useTranslations('integrations');

  return (
    <section className="py-16 sm:py-20 border-y border-border bg-surface/40">
      <Container>
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <span className="text-overline uppercase font-medium tracking-[0.18em] text-accent">
            {t('overline')}
          </span>
          <h2 className="font-serif text-h1 text-foreground max-w-2xl">{t('title')}</h2>
          <p className="text-body text-muted max-w-xl">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {items.map(({ Icon, name }) => (
            <div
              key={name}
              className="group flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-surface-elevated/60 px-4 py-5 transition hover:border-accent/40 hover:bg-surface-elevated"
            >
              <Icon className="h-6 w-6 text-muted group-hover:text-accent transition" />
              <span className="text-caption font-medium text-muted-fg group-hover:text-foreground transition">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
