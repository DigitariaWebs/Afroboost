"use client";

import { useMemo, useState } from "react";
import {
  LogIn,
  ShieldOff,
  ShieldCheck,
  Pencil,
  RotateCcw,
  UserCog,
  ArrowLeftRight,
  UserPlus,
  CheckCircle2,
  Download,
} from "lucide-react";
import { Card, CardHeader, HueAvatar, Badge } from "@/components/ui";
import { auditLogs } from "@/lib/mock-data";
import { AuditAction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";

const ACTION_META: Record<AuditAction, { label: string; icon: typeof LogIn; variant: Parameters<typeof Badge>[0]["variant"] }> = {
  login: { label: "Login", icon: LogIn, variant: "neutral" },
  suspend_tenant: { label: "Suspended", icon: ShieldOff, variant: "danger" },
  reactivate_tenant: { label: "Reactivated", icon: ShieldCheck, variant: "emerald" },
  edit_tenant: { label: "Edited", icon: Pencil, variant: "info" },
  refund_invoice: { label: "Refund", icon: RotateCcw, variant: "plum" },
  impersonate: { label: "Impersonate", icon: UserCog, variant: "gold" },
  change_plan: { label: "Plan change", icon: ArrowLeftRight, variant: "info" },
  invite_admin: { label: "Invite", icon: UserPlus, variant: "emerald" },
  resolve_ticket: { label: "Resolved", icon: CheckCircle2, variant: "emerald" },
  export_data: { label: "Export", icon: Download, variant: "gold" },
};

const ALL_ACTIONS = Object.keys(ACTION_META) as AuditAction[];

export default function AuditPage() {
  const [action, setAction] = useState<AuditAction | "all">("all");

  const rows = useMemo(
    () => (action === "all" ? auditLogs : auditLogs.filter((l) => l.action === action)),
    [action]
  );

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="font-serif text-3xl tracking-tight text-ink">Audit Log</h1>
        <p className="mt-1 text-sm text-ink-muted">Every admin action, newest first · {auditLogs.length} events</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setAction("all")}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            action === "all" ? "border-emerald/40 bg-emerald/15 text-emerald-light" : "border-line text-ink-muted hover:bg-white/[0.04]"
          )}
        >
          All
        </button>
        {ALL_ACTIONS.map((a) => (
          <button
            key={a}
            onClick={() => setAction(a)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              action === a ? "border-emerald/40 bg-emerald/15 text-emerald-light" : "border-line text-ink-muted hover:bg-white/[0.04]"
            )}
          >
            {ACTION_META[a].label}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader title="Activity" subtitle={`${rows.length} events`} />
        <ul className="divide-y divide-line/60">
          {rows.map((log) => {
            const meta = ACTION_META[log.action];
            const Icon = meta.icon;
            return (
              <li key={log.id} className="flex items-start gap-3 px-5 py-3.5">
                <span className={cn("mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                  meta.variant === "danger" ? "bg-danger/15 text-danger" :
                  meta.variant === "emerald" ? "bg-emerald/15 text-emerald-light" :
                  meta.variant === "gold" ? "bg-gold/15 text-gold-light" :
                  meta.variant === "plum" ? "bg-plum/25 text-plum-light" :
                  meta.variant === "info" ? "bg-info/15 text-info" : "bg-white/[0.06] text-ink-muted"
                )}>
                  <Icon size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-ink">{log.detail}</span>
                    <Badge variant={meta.variant}>{meta.label}</Badge>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                    <HueAvatar name={log.actor} hue={200} size={16} />
                    <span>{log.actor}</span>
                    <span className="text-ink-faint">·</span>
                    <span className="font-mono text-ink-faint">{log.ip}</span>
                  </div>
                </div>
                <div className="shrink-0 text-right text-xs text-ink-faint" title={format(new Date(log.at), "PPpp")}>
                  {formatDistanceToNow(new Date(log.at), { addSuffix: true })}
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
