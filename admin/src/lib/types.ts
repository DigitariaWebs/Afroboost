// Domain types for the AfroBoost Super Admin console.
// Mirrors the mobile app's types (src/types) and extends them with
// operator-level concepts (tenants, billing, financials, RBAC, audit).

export type BusinessType = "restaurant" | "bar" | "grocery" | "solo";
export type Plan = "decouverte" | "performance" | "premium";
export type Tone = "warm" | "pro" | "casual" | "direct";
export type Language = "fr" | "en" | "creole" | "lingala" | "soussou";
export type Region = "Montréal" | "Laval" | "Longueuil" | "Québec" | "Gatineau";

export type Provider =
  | "facebook"
  | "instagram"
  | "google"
  | "whatsapp"
  | "twilio"
  | "stripe"
  | "gmail"
  | "outlook"
  | "calendly";

export type TenantStatus = "active" | "trialing" | "past_due" | "suspended" | "canceled";

export type Tenant = {
  id: string;
  name: string;
  type: BusinessType;
  region: Region;
  address: string;
  ownerId: string;
  status: TenantStatus;
  plan: Plan;
  tone: Tone;
  languages: Language[];
  connectedAccounts: Record<Provider, boolean>;
  createdAt: string; // ISO
  trialEndsAt?: string;
  mrr: number; // monthly recurring revenue in CAD
  healthScore: number; // 0-100
  lastActiveAt: string;
  logoHue: number; // for generated avatar
};

export type Owner = {
  id: string;
  name: string;
  email: string;
  phone: string;
  tenantId: string;
  createdAt: string;
  lastLoginAt: string;
  emailVerified: boolean;
};

export type AdminRole = "super_admin" | "support" | "analyst" | "viewer";
export type AdminStatus = "active" | "invited" | "disabled";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  createdAt: string;
  lastActiveAt: string;
};

export type InvoiceStatus = "paid" | "open" | "void" | "refunded" | "failed";

export type Invoice = {
  id: string;
  tenantId: string;
  number: string;
  amount: number; // CAD
  status: InvoiceStatus;
  plan: Plan;
  issuedAt: string;
  paidAt?: string;
};

export type Subscription = {
  id: string;
  tenantId: string;
  plan: Plan;
  status: TenantStatus;
  mrr: number;
  startedAt: string;
  renewsAt: string;
  trialEndsAt?: string;
  canceledAt?: string;
  seats: number;
};

export type UsageRecord = {
  tenantId: string;
  posts: { used: number; limit: number };
  calls: { used: number; limit: number };
  sms: { used: number; limit: number };
  ai: { used: number; limit: number }; // AI generations / tokens (k)
  aiCost: number; // CAD spent on AI this period
  periodStart: string;
  periodEnd: string;
};

// Platform-wide financial month
export type FinancialMonth = {
  month: string; // e.g. "Jan"
  monthIso: string; // "2025-01"
  income: number; // gross revenue CAD
  aiCost: number; // spend on AI providers
  infraCost: number; // hosting, telephony, etc.
  otherCost: number; // payroll-allocated, misc
  newTenants: number;
  churnedTenants: number;
};

export type AuditAction =
  | "login"
  | "suspend_tenant"
  | "reactivate_tenant"
  | "edit_tenant"
  | "refund_invoice"
  | "impersonate"
  | "change_plan"
  | "invite_admin"
  | "resolve_ticket"
  | "export_data";

export type AuditLog = {
  id: string;
  actor: string; // admin name
  action: AuditAction;
  target: string; // tenant / invoice / user
  detail: string;
  at: string;
  ip: string;
};

export type TicketStatus = "open" | "pending" | "resolved";
export type TicketPriority = "low" | "normal" | "high" | "urgent";

export type SupportTicket = {
  id: string;
  subject: string;
  tenantId: string;
  requester: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: "email" | "chat" | "phone";
  createdAt: string;
  updatedAt: string;
  assignee?: string;
  preview: string;
};

export const PLAN_LABELS: Record<Plan, string> = {
  decouverte: "Découverte",
  performance: "Performance",
  premium: "Premium",
};

export const PLAN_PRICES: Record<Plan, number> = {
  decouverte: 47,
  performance: 97,
  premium: 197,
};

export const TYPE_LABELS: Record<BusinessType, string> = {
  restaurant: "Restaurant",
  bar: "Bar",
  grocery: "Épicerie",
  solo: "Solo",
};
