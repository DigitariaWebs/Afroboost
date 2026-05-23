import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AnnouncementBanner() {
  const t = useTranslations('banner');
  return (
    <div
      className="relative z-50 overflow-hidden border-b border-accent/15 bg-[linear-gradient(90deg,rgba(31,138,85,0.18)_0%,rgba(232,184,74,0.22)_50%,rgba(91,42,79,0.18)_100%)] bg-[length:200%_100%] animate-gradient-shift"
      role="status"
    >
      {/* shimmer overlay */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/2 bg-[linear-gradient(110deg,transparent,rgba(255,235,180,0.35),transparent)] animate-shine"
      />
      <div className="relative mx-auto flex max-w-6xl items-center justify-center gap-2 px-5 py-2 text-center text-caption text-foreground/95">
        <Sparkles className="h-3.5 w-3.5 text-accent shrink-0" />
        <span className="font-medium tracking-[0.01em]">{t('text')}</span>
        <ArrowRight className="hidden h-3 w-3 text-accent shrink-0 sm:block" />
      </div>
    </div>
  );
}
