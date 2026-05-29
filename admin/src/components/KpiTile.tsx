import { Card, Trend } from "./ui";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function KpiTile({
  label,
  value,
  icon: Icon,
  trend,
  hint,
  accent = "emerald",
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
  trend?: number;
  hint?: string;
  accent?: "emerald" | "gold" | "plum" | "danger";
}) {
  const accents: Record<string, string> = {
    emerald: "text-emerald-light bg-emerald/15",
    gold: "text-gold-light bg-gold/15",
    plum: "text-plum-light bg-plum/25",
    danger: "text-danger bg-danger/15",
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-ink-faint">{label}</span>
        {Icon && (
          <span className={cn("grid h-8 w-8 place-items-center rounded-lg", accents[accent])}>
            <Icon size={16} />
          </span>
        )}
      </div>
      <div className="mt-3 font-serif text-3xl tabular tracking-tight text-ink">{value}</div>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-ink-muted">
        {trend !== undefined && <Trend value={trend} />}
        {hint && <span>{hint}</span>}
      </div>
    </Card>
  );
}
