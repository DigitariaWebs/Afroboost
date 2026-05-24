import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';

// TODO: replace placeholder URLs with the real App Store + Google Play listings.
export const APP_STORE_URL = 'https://apps.apple.com/app/afroboost';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.afroboost';

export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      fill="none"
      aria-hidden
    >
      <path
        d="M325.3 234.3 102.4 16.2 392.6 184Z"
        fill="#E8B84A"
      />
      <path
        d="m102.4 16.2 222.9 218.1L102.4 495.8c-7.6-7-12.4-17.4-12.4-29V44.5c0-11.1 5-21 12.4-28.3Z"
        fill="#1F8A55"
      />
      <path
        d="m392.6 184 80.4 46.6c19.2 10.9 19.2 38 0 49l-80.4 46.4-67.3-67Z"
        fill="#F2C95C"
      />
      <path
        d="M102.4 495.8 325.3 277.7l67.3 67.3-290.2 167.9c-7.4-7.4-12.4-17.3-12.4-28.4Z"
        fill="#E25C5C"
      />
    </svg>
  );
}

type StoreButtonProps = {
  href: string;
  icon: React.ReactNode;
  topLine: string;
  label: string;
  variant: 'default' | 'compact';
  iconRingClass: string;
};

function StoreButton({ href, icon, topLine, label, variant, iconRingClass }: StoreButtonProps) {
  const isCompact = variant === 'compact';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'group relative inline-flex items-center overflow-hidden rounded-xl bg-surface-elevated/70 backdrop-blur-md transition-all duration-300 will-change-transform',
        'hover:-translate-y-0.5 hover:bg-surface-elevated hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]',
        isCompact ? 'h-12 pl-3 pr-4 gap-3' : 'h-[60px] pl-3.5 pr-5 gap-3.5',
      )}
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

      {/* Inner top highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
      />

      {/* Shine sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(232,184,74,0.18),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full"
      />

      {/* Icon disc */}
      <span
        aria-hidden
        className={clsx(
          'relative grid shrink-0 place-items-center rounded-lg bg-background/80 ring-1 transition-all duration-300 group-hover:ring-accent/50',
          iconRingClass,
          isCompact ? 'h-8 w-8' : 'h-10 w-10',
        )}
      >
        {icon}
      </span>

      {/* Text block */}
      <span className="relative flex flex-col items-start leading-none">
        <span
          className={clsx(
            'uppercase tracking-[0.22em] text-muted-fg transition-colors duration-300 group-hover:text-accent/80',
            isCompact ? 'text-[9px]' : 'text-[10px]',
          )}
        >
          {topLine}
        </span>
        <span
          className={clsx(
            'font-display text-foreground mt-1 transition-colors duration-300',
            isCompact ? 'text-[15px]' : 'text-[18px]',
          )}
        >
          {label}
        </span>
      </span>

      {/* Hover arrow */}
      <ArrowUpRight
        aria-hidden
        className={clsx(
          'relative ml-1 shrink-0 -translate-x-1 text-muted-fg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100',
          isCompact ? 'h-3.5 w-3.5' : 'h-4 w-4',
        )}
      />
    </a>
  );
}

export function StoreBadges({
  className,
  variant = 'default',
  appStoreLabel,
  playStoreLabel,
  topLine,
}: {
  className?: string;
  variant?: 'default' | 'compact';
  appStoreLabel?: string;
  playStoreLabel?: string;
  topLine?: string;
}) {
  return (
    <div className={clsx('flex flex-wrap items-center gap-3', className)}>
      <StoreButton
        href={APP_STORE_URL}
        variant={variant}
        topLine={topLine ?? 'Download on the'}
        label={appStoreLabel ?? 'App Store'}
        iconRingClass="ring-border-strong"
        icon={
          <AppleIcon
            className={clsx(
              'text-foreground transition-transform duration-300 group-hover:scale-110',
              variant === 'compact' ? 'h-5 w-5' : 'h-6 w-6',
            )}
          />
        }
      />
      <StoreButton
        href={GOOGLE_PLAY_URL}
        variant={variant}
        topLine={topLine ?? 'Get it on'}
        label={playStoreLabel ?? 'Google Play'}
        iconRingClass="ring-border-strong"
        icon={
          <PlayStoreIcon
            className={clsx(
              'transition-transform duration-300 group-hover:scale-110',
              variant === 'compact' ? 'h-5 w-5' : 'h-6 w-6',
            )}
          />
        }
      />
    </div>
  );
}
