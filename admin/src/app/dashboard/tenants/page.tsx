"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, Table, Th, Td, HueAvatar, ProgressBar, Badge } from "@/components/ui";
import { TenantStatusBadge } from "@/components/status";
import { tenants, usageByTenant } from "@/lib/mock-data";
import { PLAN_LABELS, TenantStatus, TYPE_LABELS } from "@/lib/types";
import { cn, formatCurrency, pct } from "@/lib/utils";

const STATUS_FILTERS: { key: TenantStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "trialing", label: "Trial" },
  { key: "past_due", label: "Past due" },
  { key: "suspended", label: "Suspended" },
  { key: "canceled", label: "Canceled" },
];

type SortKey = "name" | "mrr" | "health" | "created";

export default function TenantsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<TenantStatus | "all">("all");
  const [sort, setSort] = useState<SortKey>("mrr");

  const rows = useMemo(() => {
    let list = tenants.filter((t) => {
      const matchesQ =
        !q ||
        t.name.toLowerCase().includes(q.toLowerCase()) ||
        t.region.toLowerCase().includes(q.toLowerCase());
      const matchesStatus = status === "all" || t.status === status;
      return matchesQ && matchesStatus;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "health":
          return b.healthScore - a.healthScore;
        case "created":
          return +new Date(b.createdAt) - +new Date(a.createdAt);
        case "mrr":
        default:
          return b.mrr - a.mrr;
      }
    });
    return list;
  }, [q, status, sort]);

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl tracking-tight text-ink">Businesses</h1>
          <p className="mt-1 text-sm text-ink-muted">{rows.length} of {tenants.length} tenants</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or region…"
            className="w-56 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-emerald/40"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-line bg-obsidian-900 px-3 py-2 text-sm text-ink outline-none focus:border-emerald/40"
          >
            <option value="mrr">Sort: MRR</option>
            <option value="health">Sort: Health</option>
            <option value="name">Sort: Name</option>
            <option value="created">Sort: Newest</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatus(f.key)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              status === f.key
                ? "border-emerald/40 bg-emerald/15 text-emerald-light"
                : "border-line text-ink-muted hover:bg-white/[0.04]"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <Table>
          <thead>
            <tr>
              <Th>Business</Th>
              <Th>Plan</Th>
              <Th>Status</Th>
              <Th className="text-right">MRR</Th>
              <Th>Health</Th>
              <Th>AI usage</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => {
              const u = usageByTenant(t.id);
              const aiPct = u ? pct(u.ai.used, u.ai.limit) : 0;
              return (
                <tr key={t.id} className="group cursor-pointer transition-colors hover:bg-white/[0.03]">
                  <Td>
                    <Link href={`/dashboard/tenants/${t.id}`} className="flex items-center gap-3">
                      <HueAvatar name={t.name} hue={t.logoHue} size={34} />
                      <div>
                        <div className="font-medium text-ink">{t.name}</div>
                        <div className="text-xs text-ink-muted">{TYPE_LABELS[t.type]} · {t.region}</div>
                      </div>
                    </Link>
                  </Td>
                  <Td><Badge variant={t.plan === "premium" ? "plum" : t.plan === "performance" ? "emerald" : "neutral"}>{PLAN_LABELS[t.plan]}</Badge></Td>
                  <Td><TenantStatusBadge status={t.status} /></Td>
                  <Td className="text-right tabular font-medium">{t.mrr ? formatCurrency(t.mrr) : "—"}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <span className="tabular w-7 text-xs text-ink-muted">{t.healthScore}</span>
                      <div className="w-16"><ProgressBar value={t.healthScore} tone={t.healthScore < 40 ? "danger" : "emerald"} /></div>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <div className="w-16"><ProgressBar value={aiPct} /></div>
                      <span className="tabular text-xs text-ink-muted">{aiPct}%</span>
                    </div>
                  </Td>
                  <Td className="text-right">
                    <ChevronRight size={16} className="text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {rows.length === 0 && <div className="py-12 text-center text-sm text-ink-muted">No businesses match your filters.</div>}
      </Card>
    </div>
  );
}
