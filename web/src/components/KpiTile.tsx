import clsx from 'clsx';

export function KpiTile({
  label,
  value,
  prefix,
  suffix,
  delta,
  tone = 'primary',
  large,
  className,
}: {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  delta?: number;
  tone?: 'primary' | 'accent';
  large?: boolean;
  className?: string;
}) {
  const isAccent = tone === 'accent';
  return (
    <div
      className={clsx(
        'flex flex-col gap-1.5 rounded-lg border bg-surface-elevated p-4',
        isAccent ? 'border-accent-muted border-t-2 border-t-accent' : 'border-border',
        className,
      )}
    >
      <span
        className={clsx(
          'text-overline uppercase font-medium tracking-[0.18em]',
          isAccent ? 'text-accent' : 'text-muted-fg',
        )}
      >
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        {prefix ? (
          <span className="font-serif text-muted text-xl">{prefix}</span>
        ) : null}
        <span
          className={clsx(
            'font-serif text-foreground tabular-nums',
            large ? 'text-metric-lg' : 'text-metric',
          )}
        >
          {value}
        </span>
        {suffix ? (
          <span className="font-serif text-muted text-xl">{suffix}</span>
        ) : null}
      </div>
      {delta !== undefined ? (
        <span
          className={clsx(
            'text-caption font-medium',
            delta >= 0 ? 'text-success' : 'text-danger',
          )}
        >
          {delta >= 0 ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%
        </span>
      ) : null}
    </div>
  );
}
