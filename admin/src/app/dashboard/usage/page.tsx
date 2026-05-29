"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bot, FileText, Phone, MessageSquare, AlertTriangle } from "lucide-react";
import { KpiTile } from "@/components/KpiTile";
import { Card, CardHeader, Table, Th, Td, HueAvatar, ProgressBar, Badge } from "@/components/ui";
import { tenants, usage, usageByTenant } from "@/lib/mock-data";
import { totalAiSpendThisPeriod } from "@/lib/metrics";
import { PLAN_LABELS } from "@/lib/types";
import { cn, formatCurrency, formatNumber, pct } from "@/lib/utils";

type Metric = "ai" | "posts" | "calls" | "sms";

export default function UsagePage() {
  const [metric, setMetric] = useState<Metric>("ai");
  const [onlyOver, setOnlyOver] = useState(false);

  const totals = useMemo(() => {
    const sum = (k: Metric) => usage.reduce((s, u) => s + u[k].used, 0);
    return {
      ai: sum("ai"),
      posts: sum("posts"),
      calls: sum("calls"),
      sms: sum("sms"),
    };
  }, []);

  const overageCount = usage.filter((u) =>
    (["ai", "posts", "calls", "sms"] as Metric[]).some((k) => u[k].used >= u[k].limit)
  ).length;

  const rows = useMemo(() => {
    const list = tenants
      .map((t) => ({ t, u: usageByTenant(t.id)! }))
      .filter(({ u }) => u)
      .sort((a, b) => pct(b.u[metric].used, b.u[metric].limit) - pct(a.u[metric].used, a.u[metric].limit));
    return onlyOver ? list.filter(({ u }) => u[metric].used >= u[metric].limit * 0.85) : list;
  }, [metric, onlyOver]);

  const METRICS: { key: Metric; label: string }[] = [
    { key: "ai", label: "AI" },
    { key: "posts", label: "Posts" },
    { key: "calls", label: "Calls" },
    { key: "sms", label: "SMS" },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="font-serif text-3xl tracking-tight text-ink">Usage & Quotas</h1>
        <p className="mt-1 text-sm text-ink-muted">Consumption against plan limits · current 30-day period</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiTile label="AI generations" value={formatNumber(totals.ai)} icon={Bot} hint={`${formatCurrency(totalAiSpendThisPeriod())} spend`} accent="plum" />
        <KpiTile label="Posts published" value={formatNumber(totals.posts)} icon={FileText} accent="emerald" />
        <KpiTile label="Calls handled" value={formatNumber(totals.calls)} icon={Phone} accent="gold" />
        <KpiTile label="At / over limit" value={String(overageCount)} icon={AlertTriangle} hint="businesses" accent="danger" />
      </div>

      <Card className="overflow-hidden">
        <CardHeader
          title="Per-business usage"
          subtitle="Sorted by the selected metric"
          action={
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {METRICS.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMetric(m.key)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                      metric === m.key ? "border-emerald/40 bg-emerald/15 text-emerald-light" : "border-line text-ink-muted hover:bg-white/[0.04]"
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <label className="flex cursor-pointer items-center gap-1.5 text-[11px] text-ink-muted">
                <input type="checkbox" checked={onlyOver} onChange={(e) => setOnlyOver(e.target.checked)} className="accent-emerald" />
                Near/over limit
              </label>
            </div>
          }
        />
        <Table>
          <thead>
            <tr>
              <Th>Business</Th>
              <Th>Plan</Th>
              <Th>Posts</Th>
              <Th>Calls</Th>
              <Th>SMS</Th>
              <Th>AI</Th>
              <Th className="text-right">AI cost</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ t, u }) => (
              <tr key={t.id} className="transition-colors hover:bg-white/[0.03]">
                <Td>
                  <Link href={`/dashboard/tenants/${t.id}`} className="flex items-center gap-2.5 hover:text-emerald-light">
                    <HueAvatar name={t.name} hue={t.logoHue} size={30} />
                    <span className="text-ink">{t.name}</span>
                  </Link>
                </Td>
                <Td><Badge variant={t.plan === "premium" ? "plum" : t.plan === "performance" ? "emerald" : "neutral"}>{PLAN_LABELS[t.plan]}</Badge></Td>
                <UsageCell used={u.posts.used} limit={u.posts.limit} />
                <UsageCell used={u.calls.used} limit={u.calls.limit} />
                <UsageCell used={u.sms.used} limit={u.sms.limit} />
                <UsageCell used={u.ai.used} limit={u.ai.limit} />
                <Td className="text-right tabular text-plum-light">{formatCurrency(u.aiCost)}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

function UsageCell({ used, limit }: { used: number; limit: number }) {
  const p = pct(used, limit);
  return (
    <Td>
      <div className="flex items-center gap-2">
        <div className="w-14"><ProgressBar value={p} /></div>
        <span className={cn("tabular text-xs", p >= 100 ? "text-danger" : "text-ink-muted")}>
          {used}/{limit}
        </span>
      </div>
    </Td>
  );
}
