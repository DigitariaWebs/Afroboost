import Image from 'next/image';
import clsx from 'clsx';

export function Logo({ width = 160, className }: { width?: number; className?: string }) {
  const height = Math.round(width / 3);
  return (
    <Image
      src="/logo.png"
      alt="AfroBoost"
      width={width}
      height={height}
      className={clsx('object-contain', className)}
      priority
    />
  );
}
