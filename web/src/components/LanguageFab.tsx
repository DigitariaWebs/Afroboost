'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Check, Globe } from 'lucide-react';
import { locales } from '@/lib/i18n';

const LANG_DATA: Record<string, { flag: string; label: string; sub: string }> = {
  fr: { flag: '🇫🇷', label: 'Français', sub: 'FR' },
  en: { flag: '🇬🇧', label: 'English', sub: 'EN' },
};

const EMOJI_FONT =
  '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", "Twemoji Mozilla", sans-serif';

export function LanguageFab() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const current = LANG_DATA[locale] ?? { flag: locale.toUpperCase(), label: locale, sub: locale };

  const switchTo = (next: string) => {
    setOpen(false);
    if (next === locale) return;
    const segments = pathname.split('/').filter(Boolean);
    if ((locales as readonly string[]).includes(segments[0] ?? '')) {
      segments.shift();
    }
    const rest = segments.join('/');
    const target = next === 'fr' ? `/${rest}` : `/${next}${rest ? `/${rest}` : ''}`;
    // Update the next-intl locale cookie so middleware ('as-needed') doesn't
    // redirect us back to the previously remembered locale.
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.push(target || '/');
    router.refresh();
  };

  // Close on outside click + ESC
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="fixed bottom-5 right-5 z-[150] sm:bottom-6 sm:right-6"
    >
      {/* Popover (above the trigger) */}
      <div
        role="menu"
        aria-hidden={!open}
        className={clsx(
          'absolute bottom-[calc(100%+12px)] right-0 w-[220px] origin-bottom-right rounded-2xl border border-accent/25 bg-background/95 p-1.5 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300',
          open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none',
        )}
      >
        <div className="mb-1 px-3 pt-2 pb-1">
          <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            <Globe className="h-3 w-3" /> Language
          </p>
        </div>
        {locales.map((l) => {
          const data = LANG_DATA[l] ?? { flag: l.toUpperCase(), label: l, sub: l };
          const isActive = l === locale;
          return (
            <button
              key={l}
              type="button"
              role="menuitemradio"
              aria-checked={isActive}
              onClick={() => switchTo(l)}
              className={clsx(
                'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition',
                isActive
                  ? 'bg-accent/15 ring-1 ring-accent/30'
                  : 'hover:bg-surface-elevated/70',
              )}
            >
              <span
                className="text-[22px] leading-none"
                style={{ fontFamily: EMOJI_FONT }}
              >
                {data.flag}
              </span>
              <span className="flex flex-1 flex-col leading-tight">
                <span
                  className={clsx(
                    'font-display text-[15px]',
                    isActive ? 'text-foreground' : 'text-foreground/90',
                  )}
                >
                  {data.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg">
                  {data.sub}
                </span>
              </span>
              {isActive ? (
                <Check className="h-4 w-4 text-accent" />
              ) : (
                <span className="h-4 w-4" />
              )}
            </button>
          );
        })}
      </div>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language: ${current.label}`}
        title={current.label}
        className={clsx(
          'group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-background/85 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300',
          open
            ? 'ring-1 ring-accent shadow-[0_0_20px_rgba(232,184,74,0.55)]'
            : 'hover:border-accent/60 hover:shadow-[0_0_16px_rgba(232,184,74,0.35)]',
        )}
      >
        <span
          className="text-[22px] leading-none transition-transform duration-300 group-hover:scale-110"
          style={{ fontFamily: EMOJI_FONT }}
        >
          {current.flag}
        </span>
        <span
          aria-hidden
          className="absolute -bottom-0.5 right-2 inline-flex items-center justify-center rounded-full bg-accent px-1.5 py-px font-mono text-[8px] font-semibold tracking-[0.15em] text-[#1A1410] shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
        >
          {current.sub}
        </span>
      </button>
    </div>
  );
}
