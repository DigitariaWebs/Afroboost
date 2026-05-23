import clsx from 'clsx';

// TODO: replace placeholder URLs with the real App Store + Google Play listings.
export const APP_STORE_URL = 'https://apps.apple.com/app/afroboost';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.afroboost';

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function PlayStoreIcon({ className }: { className?: string }) {
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
  const sizing =
    variant === 'compact'
      ? 'h-12 px-4 gap-2.5'
      : 'h-14 px-5 gap-3';

  return (
    <div className={clsx('flex flex-wrap items-center gap-3', className)}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'group inline-flex items-center rounded-md border border-border-strong bg-surface-elevated/80 backdrop-blur transition hover:border-accent/60 hover:bg-surface-elevated',
          sizing,
        )}
      >
        <AppleIcon className="h-7 w-7 text-foreground" />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-fg">
            {topLine ?? 'Download on the'}
          </span>
          <span className="font-serif text-lg text-foreground">
            {appStoreLabel ?? 'App Store'}
          </span>
        </span>
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'group inline-flex items-center rounded-md border border-border-strong bg-surface-elevated/80 backdrop-blur transition hover:border-accent/60 hover:bg-surface-elevated',
          sizing,
        )}
      >
        <PlayStoreIcon className="h-7 w-7" />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-fg">
            {topLine ?? 'Get it on'}
          </span>
          <span className="font-serif text-lg text-foreground">
            {playStoreLabel ?? 'Google Play'}
          </span>
        </span>
      </a>
    </div>
  );
}
