import * as React from "react";
import { cn } from "@/lib/utils";

/* ---------------- Card ---------------- */
export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white/[0.03] shadow-card backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }: { title: React.ReactNode; subtitle?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
      <div>
        <h3 className="text-sm font-semibold tracking-tight text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-ink-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* ---------------- Badge ---------------- */
const BADGE_VARIANTS: Record<string, string> = {
  neutral: "bg-white/[0.06] text-ink-muted border-line",
  emerald: "bg-emerald/15 text-emerald-light border-emerald/30",
  gold: "bg-gold/15 text-gold-light border-gold/30",
  danger: "bg-danger/15 text-danger border-danger/30",
  info: "bg-info/15 text-info border-info/30",
  plum: "bg-plum/25 text-plum-light border-plum/40",
};

export function Badge({
  children,
  variant = "neutral",
  className,
  dot,
}: {
  children: React.ReactNode;
  variant?: keyof typeof BADGE_VARIANTS;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        BADGE_VARIANTS[variant],
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

/* ---------------- Button ---------------- */
const BTN_VARIANTS: Record<string, string> = {
  primary: "bg-emerald text-white hover:bg-emerald-light active:scale-[0.98]",
  gold: "bg-gold text-obsidian-950 hover:bg-gold-light active:scale-[0.98] font-semibold",
  ghost: "bg-transparent text-ink-muted hover:bg-white/[0.06] hover:text-ink",
  outline: "border border-line-strong text-ink hover:bg-white/[0.05]",
  danger: "bg-danger/90 text-white hover:bg-danger active:scale-[0.98]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof BTN_VARIANTS;
  size?: "sm" | "md";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all disabled:opacity-50 disabled:pointer-events-none",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
        BTN_VARIANTS[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---------------- Progress ---------------- */
export function ProgressBar({ value, tone = "emerald" }: { value: number; tone?: "emerald" | "gold" | "danger" }) {
  const color = value >= 100 ? "bg-danger" : value >= 85 ? "bg-gold" : tone === "danger" ? "bg-danger" : "bg-emerald";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
      <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

/* ---------------- Avatar ---------------- */
export function HueAvatar({ name, hue = 150, size = 36 }: { name: string; hue?: number; size?: number }) {
  const init = name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(135deg, hsl(${hue} 55% 32%), hsl(${(hue + 40) % 360} 50% 22%))`,
      }}
    >
      {init}
    </div>
  );
}

/* ---------------- Table ---------------- */
export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full border-collapse text-sm", className)}>{children}</table>
    </div>
  );
}
export function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <th className={cn("border-b border-line px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-faint", className)}>
      {children}
    </th>
  );
}
export function Td({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <td className={cn("border-b border-line/60 px-5 py-3 text-ink", className)}>{children}</td>;
}

/* ---------------- Misc ---------------- */
export function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-5">
      <h1 className="font-serif text-3xl tracking-tight text-ink">{children}</h1>
      {sub && <p className="mt-1 text-sm text-ink-muted">{sub}</p>}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      <div className="kente h-12 w-12 rounded-full border border-line" />
      <p className="text-sm font-medium text-ink">{title}</p>
      {hint && <p className="text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

export function Trend({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-xs font-medium", up ? "text-emerald-light" : "text-danger")}>
      {up ? "▲" : "▼"} {Math.abs(value).toFixed(1)}%
    </span>
  );
}
