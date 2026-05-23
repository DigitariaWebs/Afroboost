import clsx from 'clsx';

export function KenteOverlay({
  opacity = 0.05,
  className,
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={clsx('absolute inset-0 bg-kente pointer-events-none', className)}
      style={{ opacity }}
    />
  );
}
