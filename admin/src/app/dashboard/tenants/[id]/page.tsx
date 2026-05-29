"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldOff,
  ShieldCheck,
  UserCog,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardHeader, HueAvatar, Badge, Button, ProgressBar, Table, Th, Td } from "@/components/ui";
import { TenantStatusBadge, InvoiceStatusBadge } from "@/components/status";
import {
  invoicesByTenant,
  ownerByTenant,
  subByTenant,
  tenantById,
  usageByTenant,
} from "@/lib/mock-data";
import { PLAN_LABELS, PLAN_PRICES, Provider, TYPE_LABELS } from "@/lib/types";
import { formatCurrency, pct } from "@/lib/utils";
import { format } from "date-fns";

const PROVIDER_LABELS: Record<Provider, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  google: "Google Business",
  whatsapp: "WhatsApp",
  twilio: "Phone (Twilio)",
  stripe: "Stripe",
  gmail: "Gmail",
  outlook: "Outlook",
  calendly: "Calendly",
};

export default function TenantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const tenant = tenantById(id);
  const [banner, setBanner] = useState<string | null>(null);

  if (!tenant) {
    return (
      <div className="py-20 text-center">
        <p className="text-ink-muted">Business not found.</p>
        <Link href="/dashboard/tenants" className="mt-3 inline-block text-sm text-emerald-light hover:underline">
          ← Back to businesses
        </Link>
      </div>
    );
  }

  const owner = ownerByTenant(tenant.id);
  const usage = usageByTenant(tenant.id);
  const invoices = invoicesByTenant(tenant.id);
  const sub = subByTenant(tenant.id);

  const usageRows = usage
    ? [
        { label: "Posts", ...usage.posts },
        { label: "Calls", ...usage.calls },
        { label: "SMS", ...usage.sms },
        { label: "AI generations", ...usage.ai },
      ]
    : [];

  return (
    <div className="space-y-6 animate-fade-up">
      <Link href="/dashboard/tenants" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft size={15} /> Businesses
      </Link>

      {banner && (
        <div className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold-light">
          {banner} <span className="text-ink-faint">(mock action — no backend)</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center gap-4">
        <HueAvatar name={tenant.name} hue={tenant.logoHue} size={64} />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl tracking-tight text-ink">{tenant.name}</h1>
            <TenantStatusBadge status={tenant.status} />
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            {TYPE_LABELS[tenant.type]} · {tenant.region} · joined {format(new Date(tenant.createdAt), "MMM yyyy")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setBanner(`Impersonation session started for ${tenant.name}`)}>
            <UserCog size={14} /> Impersonate
          </Button>
          {tenant.status === "suspended" ? (
            <Button variant="primary" size="sm" onClick={() => setBanner(`${tenant.name} reactivated`)}>
              <ShieldCheck size={14} /> Reactivate
            </Button>
          ) : (
            <Button variant="danger" size="sm" onClick={() => setBanner(`${tenant.name} suspended`)}>
              <ShieldOff size={14} /> Suspend
            </Button>
          )}
        </div>
      </div>

      {/* Top grid */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Owner + business */}
        <Card>
          <CardHeader title="Owner & business" />
          <div className="space-y-3 p-5 text-sm">
            <div className="flex items-center gap-3">
              <HueAvatar name={owner?.name ?? "?"} hue={(tenant.logoHue + 120) % 360} size={40} />
              <div>
                <div className="font-medium text-ink">{owner?.name}</div>
                <div className="flex items-center gap-1 text-xs text-ink-muted">
                  {owner?.emailVerified ? <CheckCircle2 size={12} className="text-emerald-light" /> : <XCircle size={12} className="text-gold" />}
                  {owner?.emailVerified ? "Verified" : "Unverified"}
                </div>
              </div>
            </div>
            <Info icon={Mail} text={owner?.email ?? "—"} />
            <Info icon={Phone} text={owner?.phone ?? "—"} />
            <Info icon={MapPin} text={tenant.address} />
            <Info icon={Calendar} text={`Last active ${format(new Date(tenant.lastActiveAt), "MMM d, yyyy")}`} />
          </div>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader title="Subscription" />
          <div className="space-y-4 p-5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">Plan</span>
              <Badge variant={tenant.plan === "premium" ? "plum" : tenant.plan === "performance" ? "emerald" : "neutral"}>
                {PLAN_LABELS[tenant.plan]}
              </Badge>
            </div>
            <Row label="Price" value={`${formatCurrency(PLAN_PRICES[tenant.plan])}/mo`} />
            <Row label="MRR" value={tenant.mrr ? formatCurrency(tenant.mrr) : "—"} />
            <Row label="Seats" value={String(sub?.seats ?? 1)} />
            {sub?.trialEndsAt && <Row label="Trial ends" value={format(new Date(sub.trialEndsAt), "MMM d, yyyy")} />}
            {sub && !sub.canceledAt && <Row label="Renews" value={format(new Date(sub.renewsAt), "MMM d, yyyy")} />}
            {sub?.canceledAt && <Row label="Canceled" value={format(new Date(sub.canceledAt), "MMM d, yyyy")} />}
            <div className="pt-1">
              <Button variant="ghost" size="sm" onClick={() => setBanner(`Plan change dialog opened for ${tenant.name}`)}>
                Change plan
              </Button>
            </div>
          </div>
        </Card>

        {/* Connected accounts */}
        <Card>
          <CardHeader title="Connected accounts" />
          <div className="grid grid-cols-1 gap-2 p-5 text-sm">
            {(Object.keys(tenant.connectedAccounts) as Provider[]).map((p) => (
              <div key={p} className="flex items-center justify-between">
                <span className="text-ink-muted">{PROVIDER_LABELS[p]}</span>
                {tenant.connectedAccounts[p] ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-light"><CheckCircle2 size={13} /> Connected</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-ink-faint"><XCircle size={13} /> Not linked</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Usage */}
      <Card>
        <CardHeader title="Usage this period" subtitle={usage ? `${format(new Date(usage.periodStart), "MMM d")} – ${format(new Date(usage.periodEnd), "MMM d")}` : undefined} />
        <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {usageRows.map((r) => {
            const p = pct(r.used, r.limit);
            return (
              <div key={r.label}>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="text-xs text-ink-muted">{r.label}</span>
                  <span className="tabular text-xs text-ink">{r.used}/{r.limit}</span>
                </div>
                <ProgressBar value={p} />
                {p >= 100 && <span className="mt-1 inline-block text-[11px] text-danger">Over limit</span>}
              </div>
            );
          })}
        </div>
        {usage && (
          <div className="border-t border-line px-5 py-3 text-sm text-ink-muted">
            AI spend this period: <span className="font-medium text-plum-light">{formatCurrency(usage.aiCost)}</span>
          </div>
        )}
      </Card>

      {/* Invoices */}
      <Card className="overflow-hidden">
        <CardHeader title="Invoices" subtitle={`${invoices.length} on record`} />
        <Table>
          <thead>
            <tr>
              <Th>Invoice</Th>
              <Th>Issued</Th>
              <Th>Plan</Th>
              <Th className="text-right">Amount</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <Td className="font-mono text-xs text-ink-muted">{inv.number}</Td>
                <Td>{format(new Date(inv.issuedAt), "MMM d, yyyy")}</Td>
                <Td>{PLAN_LABELS[inv.plan]}</Td>
                <Td className="text-right tabular font-medium">{formatCurrency(inv.amount)}</Td>
                <Td><InvoiceStatusBadge status={inv.status} /></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

function Info({ icon: Icon, text }: { icon: typeof Mail; text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-ink-muted">
      <Icon size={15} className="text-ink-faint" />
      <span className="truncate text-ink">{text}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-muted">{label}</span>
      <span className="tabular font-medium text-ink">{value}</span>
    </div>
  );
}
