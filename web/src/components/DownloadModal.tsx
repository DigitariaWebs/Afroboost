'use client';

import { useEffect } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { X, ArrowUpRight, Sparkles } from 'lucide-react';
import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  AppleIcon,
  PlayStoreIcon,
} from './StoreBadges';

export function DownloadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('nav');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-title"
      className={clsx(
        'fixed inset-0 z-[80] flex items-center justify-center px-4 transition-opacity duration-300',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={clsx(
          'relative w-full max-w-md overflow-hidden rounded-2xl border border-accent/30 bg-[#0E1A14]/95 p-6 sm:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-500',
          open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0',
        )}
      >
        {/* Decorative gradient corner */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(232,184,74,0.45), transparent 70%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full opacity-50 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(31,138,85,0.45), transparent 70%)',
          }}
        />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t('downloadClose')}
          className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-surface-elevated/70 text-muted transition hover:border-accent/60 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="relative flex flex-col items-center text-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-accent">
            <Sparkles className="h-3 w-3" />
            {t('download')}
          </span>
          <h3
            id="download-title"
            className="font-display text-[1.8rem] sm:text-[2.1rem] leading-tight text-foreground"
          >
            {t('downloadTitle')}
          </h3>
          <p className="text-caption text-muted">{t('downloadSubtitle')}</p>
        </div>

        {/* Store cards */}
        <div className="relative mt-7 grid gap-3">
          <StoreCard
            href={APP_STORE_URL}
            icon={<AppleIcon className="h-8 w-8 text-foreground" />}
            label={t('downloadApple')}
            sub={t('downloadAppleSub')}
          />
          <StoreCard
            href={GOOGLE_PLAY_URL}
            icon={<PlayStoreIcon className="h-8 w-8" />}
            label={t('downloadGoogle')}
            sub={t('downloadGoogleSub')}
          />
        </div>
      </div>
    </div>
  );
}

function StoreCard({
  href,
  icon,
  label,
  sub,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4 overflow-hidden rounded-xl bg-surface-elevated/70 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-elevated hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]"
    >
      {/* Animated gradient border */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl p-[1px] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, rgba(232,184,74,0.55), rgba(31,138,85,0.35) 45%, rgba(91,42,79,0.5) 80%, rgba(232,184,74,0.55))',
          backgroundSize: '220% 220%',
          WebkitMask:
            'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          animation: 'gradient-shift 6s ease-in-out infinite',
        }}
      />

      {/* Top highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
      />

      {/* Shine sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(232,184,74,0.18),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full"
      />

      <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-background/80 ring-1 ring-border-strong transition-all duration-300 group-hover:ring-accent/50">
        <span className="transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      </span>
      <span className="relative flex flex-col items-start leading-none">
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-fg transition-colors duration-300 group-hover:text-accent/80">
          {sub}
        </span>
        <span className="mt-1 font-display text-lg text-foreground">{label}</span>
      </span>
      <ArrowUpRight className="relative ml-auto h-5 w-5 -translate-x-1 text-muted-fg opacity-60 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
    </a>
  );
}
