'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { ButtonLink } from './Button';
import { LanguageToggle } from './LanguageToggle';
import { APP_STORE_URL } from './StoreBadges';
import { useActiveSection, useScrolled, useScrollProgress } from '@/lib/motion';

export function Nav() {
  const t = useTranslations('nav');
  const scrolled = useScrolled(24);
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);

  const links: { href: string; id: string; label: string }[] = [
    { href: '#features', id: 'features', label: t('features') },
    { href: '#how', id: 'how', label: t('how') },
    { href: '#pricing', id: 'pricing', label: t('pricing') },
    { href: '#faq', id: 'faq', label: t('faq') },
  ];

  const active = useActiveSection(links.map((l) => l.id), 140);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Sliding pill — measure the active link and reposition the indicator
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useLayoutEffect(() => {
    const el = linkRefs.current[active];
    const wrap = navRef.current;
    if (!el || !wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setPill({ left: r.left - wrapRect.left, width: r.width, opacity: 1 });
  }, [active, scrolled]);

  return (
    <>
      {/* Scroll progress hairline */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent pointer-events-none"
      >
        <div
          className="h-full origin-left bg-[linear-gradient(90deg,#1F8A55_0%,#E8B84A_50%,#5B2A4F_100%)] shadow-[0_0_12px_rgba(232,184,74,0.6)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <header
        className={clsx(
          'sticky top-0 z-50 transition-[padding] duration-500',
          scrolled ? 'pt-1.5 sm:pt-2' : 'pt-2.5 sm:pt-3',
        )}
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div
            className={clsx(
              'relative flex items-center justify-between gap-4 transition-all duration-500',
              'rounded-full border backdrop-blur-xl',
              scrolled
                ? 'border-accent/20 bg-background/75 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.6)] px-3 py-1 sm:px-4'
                : 'border-white/5 bg-white/[0.03] px-4 py-1.5 sm:px-5',
            )}
          >
            {/* Logo */}
            <a
              href="#top"
              aria-label="AfroBoost"
              className="group relative flex items-center gap-2.5 pl-1"
            >
              <span className="relative">
                <span
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-accent/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <Logo width={scrolled ? 100 : 112} className="relative transition-all duration-500" />
              </span>
            </a>

            {/* Center nav with sliding pill */}
            <nav
              ref={navRef}
              className="relative hidden lg:flex items-center"
              aria-label="Primary"
            >
              {/* Sliding pill behind active link */}
              <span
                aria-hidden
                className="absolute top-1/2 -translate-y-1/2 rounded-full bg-accent/15 ring-1 ring-accent/30 transition-all duration-500 ease-out"
                style={{
                  left: pill.left,
                  width: pill.width,
                  height: 28,
                  opacity: pill.opacity,
                }}
              />
              {links.map((l) => {
                const isActive = active === l.id;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    ref={(node) => {
                      linkRefs.current[l.id] = node;
                    }}
                    className={clsx(
                      'relative z-10 inline-flex items-center px-3.5 py-1.5 text-[13px] font-medium tracking-[0.02em] transition-colors duration-300',
                      isActive ? 'text-accent' : 'text-muted hover:text-foreground',
                    )}
                  >
                    <span className="relative">
                      {l.label}
                      <span
                        aria-hidden
                        className={clsx(
                          'absolute -bottom-0.5 left-1/2 h-[2px] w-1 -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageToggle className="hidden md:inline-flex" />
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative hidden sm:inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-[linear-gradient(120deg,#F2C95C_0%,#E8B84A_50%,#B8842A_100%)] bg-[length:200%_100%] px-3.5 py-1.5 text-[13px] font-semibold text-[#1A1410] shadow-[0_8px_24px_rgba(232,184,74,0.3)] transition-[background-position] duration-700 hover:bg-[position:100%_0]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full skew-x-[-18deg] bg-white/40 transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">{t('download')}</span>
                <ArrowUpRight className="relative h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-surface-elevated/60 text-foreground transition hover:border-accent/60"
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={clsx(
          'lg:hidden fixed inset-0 z-40 transition-opacity duration-500',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-kente opacity-[0.06]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(31,138,85,0.4), transparent 70%)',
          }}
        />

        <div className="relative flex h-full flex-col px-6 pt-28 pb-8">
          <nav className="flex flex-col gap-2">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'group relative flex items-baseline justify-between border-b border-border/40 py-5 font-display text-[2.25rem] leading-none text-foreground transition-transform',
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                )}
                style={{
                  transitionProperty: 'transform, opacity',
                  transitionDuration: '700ms',
                  transitionDelay: open ? `${120 + i * 80}ms` : '0ms',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-accent/70">
                    0{i + 1}
                  </span>
                  <span className="italic">{l.label}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-fg transition group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-5">
            <LanguageToggle />
            <ButtonLink
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="gold"
              size="lg"
              fullWidth
            >
              {t('download')}
            </ButtonLink>
            <p className="text-caption text-muted-fg text-center">
              Conçu à Montréal — par et pour la diaspora.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
