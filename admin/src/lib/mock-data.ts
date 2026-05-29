// Deterministic mock dataset for the AfroBoost Super Admin console.
// A seeded PRNG keeps server & client renders identical (no hydration drift).
// 100% fake — no backend, no network. Mirrors the mobile prototype's philosophy.

import {
  AdminUser,
  AuditAction,
  AuditLog,
  BusinessType,
  FinancialMonth,
  Invoice,
  InvoiceStatus,
  Owner,
  Plan,
  PLAN_PRICES,
  Provider,
  Region,
  Subscription,
  SupportTicket,
  Tenant,
  TenantStatus,
  TicketPriority,
  TicketStatus,
  Tone,
  UsageRecord,
} from "./types";

// ---- seeded PRNG (mulberry32) ----
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(0xafb0 ^ 20260529);
const pick = <T>(arr: T[]) => arr[Math.floor(rnd() * arr.length)];
const between = (min: number, max: number) => Math.floor(rnd() * (max - min + 1)) + min;
const chance = (p: number) => rnd() < p;

// ---- reference data ----
const BUSINESS_NAMES = [
  "Le Coin Créole",
  "Saveurs d'Afrique",
  "Maquis Abidjan",
  "Chez Tantine",
  "Kreyòl Kitchen",
  "Le Baobab",
  "Épicerie Kilimanjaro",
  "Bar Soleil Levant",
  "Mama Africa Grill",
  "Café Dakar",
  "Resto Lakay",
  "Le Jolof Spot",
  "Marché Tropical",
  "Calabash Lounge",
  "Poulet Braisé MTL",
  "Teranga Express",
  "Sankofa Bistro",
  "Le Piment Vert",
  "Wakanda Eats",
  "Boutik Kreyòl",
  "Nkono Catering",
  "Zouk Bar & Tapas",
  "Yassa House",
  "Banku & Tilapia Co.",
];

const OWNER_FIRST = ["Patrick", "Aminata", "Jean", "Fatou", "Marcus", "Nadège", "Kwame", "Sandrine", "Ibrahim", "Carline", "Didier", "Aïssatou", "Emmanuel", "Rose", "Ousmane", "Mireille"];
const OWNER_LAST = ["Mbeki", "Diallo", "Pierre", "Ndiaye", "Toussaint", "Okonkwo", "Jean-Baptiste", "Camara", "Mensah", "Étienne", "Bâ", "Cissé", "Laurent", "Owusu", "Sylla", "Joseph"];

const TYPES: BusinessType[] = ["restaurant", "restaurant", "restaurant", "bar", "grocery", "solo"];
const REGIONS: Region[] = ["Montréal", "Montréal", "Montréal", "Laval", "Longueuil", "Québec", "Gatineau"];
const STREETS = ["rue Saint-Denis", "boul. Saint-Laurent", "rue Jean-Talon", "av. du Parc", "rue Ontario", "boul. Pie-IX", "rue Bélanger"];
const TONES: Tone[] = ["warm", "pro", "casual", "direct"];
const PROVIDERS: Provider[] = ["facebook", "instagram", "google", "whatsapp", "twilio", "stripe", "gmail", "outlook", "calendly"];

// reference "today" — keeps mock dates stable & relative
export const NOW = new Date("2026-05-29T12:00:00Z");

function daysAgo(d: number): string {
  return new Date(NOW.getTime() - d * 86400000).toISOString();
}
function daysAhead(d: number): string {
  return new Date(NOW.getTime() + d * 86400000).toISOString();
}

function connectedFor(plan: Plan): Record<Provider, boolean> {
  const base = {} as Record<Provider, boolean>;
  for (const p of PROVIDERS) base[p] = false;
  // everyone has stripe + at least facebook/instagram
  base.stripe = true;
  base.facebook = chance(0.9);
  base.instagram = chance(0.85);
  base.google = chance(0.6);
  base.whatsapp = plan !== "decouverte" ? chance(0.7) : chance(0.2);
  base.twilio = plan === "premium" ? chance(0.8) : chance(0.3);
  base.gmail = chance(0.5);
  base.outlook = chance(0.2);
  base.calendly = chance(0.35);
  return base;
}

function statusFor(i: number): TenantStatus {
  // weighted distribution
  if (i % 11 === 0) return "trialing";
  if (i % 13 === 0) return "past_due";
  if (i % 17 === 0) return "suspended";
  if (i % 19 === 0) return "canceled";
  return "active";
}

// ---- build owners + tenants ----
export const owners: Owner[] = [];
export const tenants: Tenant[] = BUSINESS_NAMES.map((name, i) => {
  const id = `t_${String(i + 1).padStart(3, "0")}`;
  const ownerId = `o_${String(i + 1).padStart(3, "0")}`;
  const plan: Plan = (["decouverte", "performance", "performance", "performance", "premium"] as Plan[])[between(0, 4)];
  const status = statusFor(i + 1);
  const createdDays = between(20, 540);
  const ownerName = `${pick(OWNER_FIRST)} ${pick(OWNER_LAST)}`;

  owners.push({
    id: ownerId,
    name: ownerName,
    email: `${ownerName.toLowerCase().replace(/[^a-z]/g, ".")}@${name.toLowerCase().replace(/[^a-z]/g, "")}.ca`.replace(/\.+/g, "."),
    phone: `+1 514-${between(200, 989)}-${between(1000, 9989)}`,
    tenantId: id,
    createdAt: daysAgo(createdDays),
    lastLoginAt: daysAgo(between(0, status === "active" ? 4 : 40)),
    emailVerified: chance(0.92),
  });

  const mrr = status === "canceled" || status === "trialing" ? 0 : PLAN_PRICES[plan];

  return {
    id,
    name,
    type: TYPES[between(0, TYPES.length - 1)],
    region: REGIONS[between(0, REGIONS.length - 1)],
    address: `${between(100, 8999)} ${pick(STREETS)}`,
    ownerId,
    status,
    plan,
    tone: pick(TONES),
    languages: chance(0.4) ? ["fr", "en"] : ["fr"],
    connectedAccounts: connectedFor(plan),
    createdAt: daysAgo(createdDays),
    trialEndsAt: status === "trialing" ? daysAhead(between(1, 12)) : undefined,
    mrr,
    healthScore:
      status === "suspended" ? between(8, 30) : status === "past_due" ? between(25, 55) : between(55, 98),
    lastActiveAt: daysAgo(status === "active" ? between(0, 3) : between(5, 50)),
    logoHue: between(0, 359),
  } satisfies Tenant;
});

// ---- subscriptions ----
export const subscriptions: Subscription[] = tenants.map((t, i) => ({
  id: `sub_${String(i + 1).padStart(3, "0")}`,
  tenantId: t.id,
  plan: t.plan,
  status: t.status,
  mrr: t.mrr,
  startedAt: t.createdAt,
  renewsAt: daysAhead(between(1, 30)),
  trialEndsAt: t.trialEndsAt,
  canceledAt: t.status === "canceled" ? daysAgo(between(2, 60)) : undefined,
  seats: t.plan === "premium" ? between(2, 5) : 1,
}));

// ---- invoices (history per tenant) ----
const INVOICE_STATUSES: Record<TenantStatus, InvoiceStatus> = {
  active: "paid",
  trialing: "open",
  past_due: "failed",
  suspended: "open",
  canceled: "void",
  // (canceled invoices mostly paid historically; handled below)
};

export const invoices: Invoice[] = [];
let invCounter = 1000;
tenants.forEach((t) => {
  const months = between(1, 10);
  for (let m = months; m >= 1; m--) {
    const last = m === 1;
    let status: InvoiceStatus = "paid";
    if (last) status = INVOICE_STATUSES[t.status] ?? "paid";
    const amount = t.plan === "decouverte" ? 47 : t.plan === "performance" ? 97 : 197;
    const issuedAt = daysAgo(m * 30 + between(0, 4));
    invoices.push({
      id: `inv_${invCounter++}`,
      tenantId: t.id,
      number: `AFB-${2025}-${String(invCounter)}`,
      amount: t.status === "trialing" && last ? 0 : amount,
      status,
      plan: t.plan,
      issuedAt,
      paidAt: status === "paid" ? issuedAt : undefined,
    });
  }
});
// a few standalone refunds
invoices.slice(0, 3).forEach((inv) => {
  if (chance(0.5)) inv.status = "refunded";
});

// ---- usage records ----
const LIMITS: Record<Plan, { posts: number; calls: number; sms: number; ai: number }> = {
  decouverte: { posts: 20, calls: 100, sms: 200, ai: 50 },
  performance: { posts: 60, calls: 400, sms: 800, ai: 200 },
  premium: { posts: 200, calls: 1500, sms: 3000, ai: 800 },
};

export const usage: UsageRecord[] = tenants.map((t) => {
  const lim = LIMITS[t.plan];
  const intensity = t.status === "active" ? rnd() * 0.7 + 0.35 : rnd() * 0.4;
  const used = (limit: number) => Math.min(Math.round(limit * intensity * (0.8 + rnd() * 0.6)), Math.round(limit * 1.2));
  const aiUsed = used(lim.ai);
  return {
    tenantId: t.id,
    posts: { used: used(lim.posts), limit: lim.posts },
    calls: { used: used(lim.calls), limit: lim.calls },
    sms: { used: used(lim.sms), limit: lim.sms },
    ai: { used: aiUsed, limit: lim.ai },
    aiCost: Math.round(aiUsed * (0.18 + rnd() * 0.22) * 100) / 100,
    periodStart: daysAgo(29),
    periodEnd: daysAhead(1),
  };
});

// ---- platform financials (last 12 months) ----
const MONTH_NAMES = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const MONTH_ISO = [
  "2025-06", "2025-07", "2025-08", "2025-09", "2025-10", "2025-11",
  "2025-12", "2026-01", "2026-02", "2026-03", "2026-04", "2026-05",
];

export const financials: FinancialMonth[] = MONTH_NAMES.map((month, i) => {
  const growth = 1 + i * 0.085;
  const income = Math.round((4200 + i * 380) * growth + between(-200, 400));
  const aiCost = Math.round(income * (0.14 + rnd() * 0.05));
  const infraCost = Math.round(income * (0.08 + rnd() * 0.03));
  const otherCost = Math.round(income * (0.22 + rnd() * 0.06));
  return {
    month,
    monthIso: MONTH_ISO[i],
    income,
    aiCost,
    infraCost,
    otherCost,
    newTenants: between(1, 4) + Math.floor(i / 3),
    churnedTenants: between(0, 2),
  };
});

// ---- admin users (RBAC) ----
export const admins: AdminUser[] = [
  { id: "a_001", name: "Patrick Mbeki", email: "patrick@afroboost.ca", role: "super_admin", status: "active", createdAt: daysAgo(540), lastActiveAt: daysAgo(0) },
  { id: "a_002", name: "Sophie Tremblay", email: "sophie@afroboost.ca", role: "support", status: "active", createdAt: daysAgo(300), lastActiveAt: daysAgo(0) },
  { id: "a_003", name: "David Chen", email: "david@afroboost.ca", role: "analyst", status: "active", createdAt: daysAgo(210), lastActiveAt: daysAgo(1) },
  { id: "a_004", name: "Léa Gagnon", email: "lea@afroboost.ca", role: "support", status: "active", createdAt: daysAgo(150), lastActiveAt: daysAgo(2) },
  { id: "a_005", name: "Marc Dubois", email: "marc@afroboost.ca", role: "viewer", status: "active", createdAt: daysAgo(90), lastActiveAt: daysAgo(5) },
  { id: "a_006", name: "Aisha Bello", email: "aisha@afroboost.ca", role: "support", status: "invited", createdAt: daysAgo(3), lastActiveAt: daysAgo(3) },
  { id: "a_007", name: "Tom Wright", email: "tom@afroboost.ca", role: "analyst", status: "disabled", createdAt: daysAgo(420), lastActiveAt: daysAgo(70) },
];

// ---- audit log ----
const AUDIT_ACTIONS: AuditAction[] = [
  "login", "suspend_tenant", "reactivate_tenant", "edit_tenant", "refund_invoice",
  "impersonate", "change_plan", "invite_admin", "resolve_ticket", "export_data",
];
const AUDIT_DETAIL: Record<AuditAction, (t: string) => string> = {
  login: () => "Signed in to admin console",
  suspend_tenant: (t) => `Suspended tenant ${t} for non-payment`,
  reactivate_tenant: (t) => `Reactivated tenant ${t}`,
  edit_tenant: (t) => `Updated business profile for ${t}`,
  refund_invoice: (t) => `Issued refund on invoice ${t}`,
  impersonate: (t) => `Started impersonation session for ${t}`,
  change_plan: (t) => `Changed plan for ${t}`,
  invite_admin: (t) => `Invited new admin ${t}`,
  resolve_ticket: (t) => `Resolved support ticket ${t}`,
  export_data: (t) => `Exported data for ${t}`,
};

export const auditLogs: AuditLog[] = Array.from({ length: 60 }, (_, i) => {
  const action = pick(AUDIT_ACTIONS);
  const actor = pick(admins.filter((a) => a.status === "active")).name;
  const tenant = pick(tenants);
  const target =
    action === "invite_admin" ? pick(admins).email :
    action === "refund_invoice" ? pick(invoices).number :
    action === "resolve_ticket" ? `TKT-${between(1000, 1999)}` :
    tenant.name;
  return {
    id: `log_${String(i + 1).padStart(4, "0")}`,
    actor,
    action,
    target,
    detail: AUDIT_DETAIL[action](target),
    at: daysAgo(i * 0.4 + rnd()),
    ip: `${between(24, 207)}.${between(0, 255)}.${between(0, 255)}.${between(1, 254)}`,
  };
}).sort((a, b) => +new Date(b.at) - +new Date(a.at));

// ---- support tickets ----
const TICKET_SUBJECTS = [
  "Facebook connection keeps dropping",
  "How do I change my plan?",
  "AI replied in the wrong language",
  "Invoice charged twice",
  "Calendar sync not working",
  "Want to cancel my subscription",
  "Posts not publishing to Instagram",
  "Phone agent missed a call",
  "Can I export my customer list?",
  "Google reviews not importing",
  "Upgrade to Premium pricing question",
  "App crashes on the CRM tab",
];
const TICKET_STATUS: TicketStatus[] = ["open", "open", "pending", "resolved", "resolved", "resolved"];
const TICKET_PRIORITY: TicketPriority[] = ["low", "normal", "normal", "high", "urgent"];

export const tickets: SupportTicket[] = Array.from({ length: 18 }, (_, i) => {
  const t = pick(tenants);
  const owner = owners.find((o) => o.tenantId === t.id)!;
  const status = pick(TICKET_STATUS);
  return {
    id: `TKT-${1000 + i}`,
    subject: pick(TICKET_SUBJECTS),
    tenantId: t.id,
    requester: owner.name,
    status,
    priority: pick(TICKET_PRIORITY),
    channel: pick(["email", "chat", "phone"] as const),
    createdAt: daysAgo(between(0, 30)),
    updatedAt: daysAgo(between(0, 5)),
    assignee: status === "resolved" || chance(0.6) ? pick(admins.filter((a) => a.role === "support")).name : undefined,
    preview: "Hi, I'm having an issue and could use some help with my AfroBoost account…",
  };
}).sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

// ---- helper lookups ----
export const tenantById = (id: string) => tenants.find((t) => t.id === id);
export const ownerByTenant = (tenantId: string) => owners.find((o) => o.tenantId === tenantId);
export const usageByTenant = (tenantId: string) => usage.find((u) => u.tenantId === tenantId);
export const invoicesByTenant = (tenantId: string) => invoices.filter((i) => i.tenantId === tenantId);
export const subByTenant = (tenantId: string) => subscriptions.find((s) => s.tenantId === tenantId);
