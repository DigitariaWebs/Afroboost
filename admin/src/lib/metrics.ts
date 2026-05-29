// Aggregations derived from the mock dataset — platform-level KPIs.
import { financials, invoices, subscriptions, tenants, usage } from "./mock-data";
import { PLAN_LABELS, Plan } from "./types";

export function totalMrr(): number {
  return subscriptions
    .filter((s) => s.status === "active" || s.status === "past_due")
    .reduce((sum, s) => sum + s.mrr, 0);
}

export function arr(): number {
  return totalMrr() * 12;
}

export function tenantCounts() {
  const active = tenants.filter((t) => t.status === "active").length;
  const trialing = tenants.filter((t) => t.status === "trialing").length;
  const pastDue = tenants.filter((t) => t.status === "past_due").length;
  const suspended = tenants.filter((t) => t.status === "suspended").length;
  const canceled = tenants.filter((t) => t.status === "canceled").length;
  return { total: tenants.length, active, trialing, pastDue, suspended, canceled };
}

export function planDistribution() {
  const map: Record<Plan, number> = { decouverte: 0, performance: 0, premium: 0 };
  tenants.forEach((t) => {
    if (t.status !== "canceled") map[t.plan]++;
  });
  return (Object.keys(map) as Plan[]).map((p) => ({
    plan: p,
    label: PLAN_LABELS[p],
    count: map[p],
  }));
}

export function totalAiSpendThisPeriod(): number {
  return Math.round(usage.reduce((sum, u) => sum + u.aiCost, 0) * 100) / 100;
}

export function ytdIncome(): number {
  return financials.reduce((sum, m) => sum + m.income, 0);
}

export function ytdCost(): number {
  return financials.reduce((sum, m) => sum + m.aiCost + m.infraCost + m.otherCost, 0);
}

export function ytdProfit(): number {
  return ytdIncome() - ytdCost();
}

export function ytdMargin(): number {
  const inc = ytdIncome();
  return inc === 0 ? 0 : (ytdProfit() / inc) * 100;
}

// month-over-month income growth (last vs previous)
export function mrrGrowthPct(): number {
  if (financials.length < 2) return 0;
  const last = financials[financials.length - 1].income;
  const prev = financials[financials.length - 2].income;
  return prev === 0 ? 0 : ((last - prev) / prev) * 100;
}

// financial series enriched with profit & margin for charts
export function financialSeries() {
  return financials.map((m) => {
    const cost = m.aiCost + m.infraCost + m.otherCost;
    const profit = m.income - cost;
    return {
      ...m,
      cost,
      profit,
      margin: m.income === 0 ? 0 : Math.round((profit / m.income) * 100),
    };
  });
}

export function overdueInvoices() {
  return invoices.filter((i) => i.status === "failed" || i.status === "open");
}

export function paidRevenueAllTime(): number {
  return invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
}
