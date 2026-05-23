'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { ButtonLink } from './Button';
import { LanguageToggle } from './LanguageToggle';
import { APP_STORE_URL } from './StoreBadges';

export function Nav() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: { href: string; label: string }[] = [
    { href: '#features', label: t('features') },
    { href: '#how', label: t('how') },
    { href: '#pricing', label: t('pricing') },
    { href: '#faq', label: t('faq') },
  ];

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-xl bg-background/80 border-b border-border'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <a href="#top" aria-label="AfroBoost" className="flex items-center">
          <Logo width={140} />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-caption font-medium text-muted hover:text-foreground hover:bg-surface-elevated/60 transition"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle className="hidden sm:inline-flex" />
          <ButtonLink
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="gold"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {t('download')}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-foreground"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base text-foreground hover:bg-surface-elevated"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3">
              <LanguageToggle />
              <ButtonLink
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
                size="sm"
              >
                {t('download')}
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
