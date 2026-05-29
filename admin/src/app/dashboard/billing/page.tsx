"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DollarSign, RefreshCw, AlertCircle, TrendingUp } from "lucide-react";
import { KpiTile } from "@/components/KpiTile";
import { Card, CardHeader, Table, Th, Td, Badge, HueAvatar, Button } from "@/components/ui";
import { InvoiceStatusBadge } from "@/components/status";
import { invoices, subscriptions, tenantById } from "@/lib/mock-data";
import { arr, mrrGrowthPct, paidRevenueAllTime, totalMrr } from "@/lib/metrics";
import { InvoiceStatus, PLAN_LABELS, PLAN_PRICES, Plan } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

const FILTERS: { key: InvoiceStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "paid", label: "Paid" },
  { key: "open", label: "Open" },
  { key: "failed", label: "Failed" },
  { key: "refunded", label: "Refunded" },
  { key: "void", label: "Void" },
];

export default function BillingPage() {
  const [filter, setFilter] = useState<InvoiceStatus | "all">("all");
  const [banner, setBanner] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...invoices].sort((a, b) => +new Date(b.issuedAt) - +new Date(a.issuedAt)),
    []
  );
  const rows = useMemo(
    () => (filter === "all" ? sorted : sorted.filter((i) => i.status === filter)),
    [filter, sorted]
  );

  // MRR by plan
  const byPlan = useMemo(() => {
    const map: Record<Plan, { count: number; mrr: number }> = {
      decouverte: { count: 0, mrr: 0 },
      performance: { count: 0, mrr: 0 },
      premium: { count: 0, mrr: 0 },
    };
    subscriptions
      .filter((s) => s.status === "active" || s.status === "past_due")
      .forEach((s) => {
        map[s.plan].count++;
        map[s.plan].mrr += s.mrr;
      });
    return map;
  }, []);

  const failedCount = invoices.filter((i) => i.status === "failed").length;
  const failedAmount = invoices.filter((i) => i.status === "failed").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="font-serif text-3xl tracking-tight text-ink">Subscriptions & Billing</h1>
        <p className="mt-1 text-sm text-ink-muted">Stripe-style mock — revenue, plans & invoices</p>
      </div>

      {banner && (
        <div className="rounded-xl border border-emerald/30 bg-emerald/10 px-4 py-3 text-sm text-emerald-light">
          {banner} <span className="text-ink-faint">(mock action — no backend)</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiTile label="MRR" value={formatCurrency(totalMrr())} icon={DollarSign} trend={mrrGrowthPct()} accent="emerald" />
        <KpiTile label="ARR (run-rate)" value={formatCurrency(arr())} icon={TrendingUp} accent="gold" />
        <KpiTile label="Collected (all-time)" value={formatCurrency(paidRevenueAllTime())} icon={RefreshCw} accent="emerald" />
        <KpiTile label="Failed payments" value={String(failedCount)} icon={AlertCircle} hint={formatCurrency(failedAmount)} accent="danger" />
      </div>

      {/* MRR by plan */}
      <div className="grid gap-4 sm:grid-cols-3">
        {(Object.keys(byPlan) as Plan[]).map((p) => (
          <Card key={p} className="p-5">
            <div className="flex items-center justify-between">
              <Badge variant={p === "premium" ? "plum" : p === "performance" ? "emerald" : "neutral"}>{PLAN_LABELS[p]}</Badge>
              <span className="text-xs text-ink-muted">{formatCurrency(PLAN_PRICES[p])}/mo</span>
            </div>
            <div className="mt-3 font-serif text-2xl tabular text-ink">{formatCurrency(byPlan[p].mrr)}</div>
            <div className="text-xs text-ink-muted">{byPlan[p].count} subscriptions</div>
          </Card>
        ))}
      </div>

      {/* Invoices */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Invoices"
          subtitle={`${rows.length} shown`}
          action={
            <div className="flex flex-wrap gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                    filter === f.key ? "border-emerald/40 bg-emerald/15 text-emerald-light" : "border-line text-ink-muted hover:bg-white/[0.04]"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          }
        />
        <Table>
          <thead>
            <tr>
              <Th>Invoice</Th>
              <Th>Business</Th>
              <Th>Issued</Th>
              <Th>Plan</Th>
              <Th className="text-right">Amount</Th>
              <Th>Status</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 60).map((inv) => {
              const t = tenantById(inv.tenantId);
              return (
                <tr key={inv.id} className="transition-colors hover:bg-white/[0.03]">
                  <Td className="font-mono text-xs text-ink-muted">{inv.number}</Td>
                  <Td>
                    <Link href={`/dashboard/tenants/${inv.tenantId}`} className="flex items-center gap-2 hover:text-emerald-light">
                      <HueAvatar name={t?.name ?? "?"} hue={t?.logoHue ?? 150} size={26} />
                      <span className="text-ink">{t?.name}</span>
                    </Link>
                  </Td>
                  <Td>{format(new Date(inv.issuedAt), "MMM d, yyyy")}</Td>
                  <Td>{PLAN_LABELS[inv.plan]}</Td>
                  <Td className="text-right tabular font-medium">{formatCurrency(inv.amount)}</Td>
                  <Td><InvoiceStatusBadge status={inv.status} /></Td>
                  <Td className="text-right">
                    {inv.status === "paid" && (
                      <Button variant="ghost" size="sm" onClick={() => setBanner(`Refund issued on ${inv.number}`)}>Refund</Button>
                    )}
                    {inv.status === "failed" && (
                      <Button variant="ghost" size="sm" onClick={() => setBanner(`Retried charge on ${inv.number}`)}>Retry</Button>
                    )}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
