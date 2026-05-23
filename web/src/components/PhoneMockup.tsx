import Image from 'next/image';
import clsx from 'clsx';

export function PhoneMockup({
  src,
  alt,
  className,
  tilt = false,
  width = 300,
  height = 620,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  tilt?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <div
      className={clsx(
        'relative mx-auto',
        tilt && 'rotate-[6deg] hover:rotate-0 transition-transform duration-700',
        className,
      )}
      style={{ width, height }}
    >
      {/* Outer frame */}
      <div
        className="absolute inset-0 rounded-[42px] p-[10px]"
        style={{
          background: 'linear-gradient(140deg, #2A3D34 0%, #15221C 100%)',
          boxShadow:
            '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,184,74,0.18), inset 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Inner bezel */}
        <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-background">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/95" />
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 320px, 60vw"
            className="object-cover"
            unoptimized
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}
