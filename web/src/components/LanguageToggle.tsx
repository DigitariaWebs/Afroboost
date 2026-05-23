'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { locales } from '@/lib/i18n';

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: string) => {
    if (next === locale) return;
    const segments = pathname.split('/').filter(Boolean);
    if ((locales as readonly string[]).includes(segments[0] ?? '')) {
      segments.shift();
    }
    const rest = segments.join('/');
    const target = next === 'fr' ? `/${rest}` : `/${next}${rest ? `/${rest}` : ''}`;
    router.push(target || '/');
  };

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-0 rounded-full border border-border bg-surface-elevated/70 backdrop-blur p-0.5 text-caption font-medium',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            className={clsx(
              'px-3 py-1 rounded-full uppercase tracking-[0.18em] transition',
              active
                ? 'bg-accent text-accent-fg'
                : 'text-muted hover:text-foreground',
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
