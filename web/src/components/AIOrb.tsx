import clsx from 'clsx';

export function AIOrb({
  size = 240,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={clsx('relative', className)}
      style={{ width: size, height: size }}
    >
      {/* Outer halo */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgba(232,184,74,0.5) 0%, rgba(31,138,85,0.3) 35%, transparent 70%)',
        }}
      />

      {/* Rotating gradient ring */}
      <div
        className="absolute inset-2 rounded-full animate-rotate-slow"
        style={{
          background:
            'conic-gradient(from 0deg, #1F8A55 0%, #E8B84A 30%, #5B2A4F 55%, #1F8A55 90%, #E8B84A 100%)',
          maskImage: 'radial-gradient(closest-side, transparent 62%, black 64%)',
          WebkitMaskImage: 'radial-gradient(closest-side, transparent 62%, black 64%)',
        }}
      />

      {/* Core orb with pulse */}
      <div
        className="absolute inset-5 rounded-full animate-pulse-orb"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, #F2C95C 0%, #E8B84A 25%, #1F8A55 60%, #0E1A14 100%)',
          boxShadow:
            '0 0 60px rgba(232,184,74,0.45), 0 0 120px rgba(31,138,85,0.35), inset 0 0 40px rgba(0,0,0,0.6)',
        }}
      />

      {/* Highlight */}
      <div
        className="absolute rounded-full opacity-60 blur-md"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          top: size * 0.18,
          left: size * 0.22,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
