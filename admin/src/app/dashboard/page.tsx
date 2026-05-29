"use client";

import Link from "next/link";
import {
  Building2,
  DollarSign,
  TrendingUp,
  Bot,
  Wallet,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";
import { KpiTile } from "@/components/KpiTile";
import { Card, CardHeader, Badge } from "@/components/ui";
import { CostBreakdownChart, GrowthChart, IncomeCostChart, PlanPie } from "@/components/charts";
import { TenantStatusBadge } from "@/components/status";
import { HueAvatar } from "@/components/ui";
import {
  arr,
  financialSeries,
  mrrGrowthPct,
  planDistribution,
  tenantCounts,
  totalAiSpendThisPeriod,
  totalMrr,
  ytdIncome,
  ytdMargin,
  ytdProfit,
} from "@/lib/metrics";
import { tenants } from "@/lib/mock-data";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { PLAN_LABELS } from "@/lib/types";

export default function OverviewPage() {
  const series = financialSeries();
  const counts = tenantCounts();
  const plans = planDistribution();
  const attention = tenants.filter((t) => t.status === "past_due" || t.status === "suspended").slice(0, 5);

  return (
    <div className="space-y-7 animate-fade-up">
      <div>
        <h1 className="font-serif text-3xl tracking-tight text-ink">Platform Overview</h1>
        <p className="mt-1 text-sm text-ink-muted">
          AfroBoost operator console · {counts.total} businesses · data as of May 2026
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiTile label="MRR" value={formatCurrency(totalMrr())} icon={DollarSign} trend={mrrGrowthPct()} hint="vs last month" accent="emerald" />
        <KpiTile label="ARR (run-rate)" value={formatCurrency(arr())} icon={TrendingUp} hint="annualized" accent="gold" />
        <KpiTile label="Active businesses" value={String(counts.active)} icon={Building2} hint={`${counts.trialing} on trial`} accent="emerald" />
        <KpiTile label="AI spend (30d)" value={formatCurrency(totalAiSpendThisPeriod())} icon={Bot} hint="across all tenants" accent="plum" />
      </div>

      {/* Financials: income / cost / profit */}
      <Card>
        <CardHeader
          title="Income, cost & profit"
          subtitle="Trailing 12 months (CAD)"
          action={
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="text-ink-muted">YTD income <span className="font-semibold text-emerald-light">{formatCurrency(ytdIncome())}</span></span>
              <span className="text-ink-muted">Profit <span className="font-semibold text-gold">{formatCurrency(ytdProfit())}</span></span>
              <Badge variant="gold">Margin {formatPercent(ytdMargin())}</Badge>
            </div>
          }
        />
        <div className="p-4">
          <IncomeCostChart data={series} />
        </div>
      </Card>

      {/* Cost breakdown + plan mix */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Where the money goes"
            subtitle="Monthly cost breakdown — AI is the largest variable cost"
            action={<Wallet size={16} className="text-ink-faint" />}
          />
          <div className="p-4">
            <CostBreakdownChart data={series} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Plan mix" subtitle="Active subscriptions" />
          <div className="p-4">
            <PlanPie data={plans} />
            <div className="mt-2 space-y-1.5">
              {plans.map((p) => (
                <div key={p.plan} className="flex items-center justify-between text-xs">
                  <span className="text-ink-muted">{PLAN_LABELS[p.plan]}</span>
                  <span className="tabular font-medium text-ink">{p.count}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Growth + needs attention */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Growth" subtitle="New vs churned businesses per month" />
          <div className="p-4">
            <GrowthChart data={series} />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Needs attention"
            subtitle="Past-due & suspended accounts"
            action={
              <Link href="/dashboard/tenants" className="inline-flex items-center gap-1 text-xs text-emerald-light hover:underline">
                All businesses <ArrowUpRight size={13} />
              </Link>
            }
          />
          {attention.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-ink-muted">Everything healthy 🎉</div>
          ) : (
            <ul className="divide-y divide-line/60">
              {attention.map((t) => (
                <li key={t.id}>
                  <Link href={`/dashboard/tenants/${t.id}`} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-white/[0.03]">
                    <HueAvatar name={t.name} hue={t.logoHue} size={34} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-ink">{t.name}</div>
                      <div className="text-xs text-ink-muted">{t.region} · {PLAN_LABELS[t.plan]}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {t.status === "suspended" && <AlertTriangle size={14} className="text-danger" />}
                      <TenantStatusBadge status={t.status} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
