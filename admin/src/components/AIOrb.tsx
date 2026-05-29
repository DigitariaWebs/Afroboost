import { cn } from "@/lib/utils";

// The AfroBoost signature: an animated emerald-gold radial orb.
export function AIOrb({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn("relative inline-block", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className="absolute inset-0 rounded-full animate-orb-pulse"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #F0C766 0%, #E5B040 22%, #2DBE76 55%, #176B42 100%)",
          boxShadow: "0 0 18px -2px rgba(45,190,118,0.6)",
        }}
      />
      <span
        className="absolute inset-[3px] rounded-full opacity-60 animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.35), transparent 40%)",
        }}
      />
    </span>
  );
}
