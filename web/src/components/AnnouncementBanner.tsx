import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AnnouncementBanner() {
  const t = useTranslations('banner');
  return (
    <div
      className="relative z-50 border-b border-accent/15 bg-[linear-gradient(90deg,rgba(31,138,85,0.18)_0%,rgba(232,184,74,0.18)_50%,rgba(91,42,79,0.18)_100%)] bg-[length:200%_100%] animate-gradient-shift"
      role="status"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-5 py-2 text-center text-caption text-foreground/90">
        <Sparkles className="h-3.5 w-3.5 text-accent shrink-0" />
        <span className="font-medium">{t('text')}</span>
      </div>
    </div>
  );
}
