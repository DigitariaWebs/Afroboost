import { Badge } from "./ui";
import {
  AdminRole,
  InvoiceStatus,
  TenantStatus,
  TicketPriority,
  TicketStatus,
} from "@/lib/types";

const TENANT: Record<TenantStatus, { label: string; variant: Parameters<typeof Badge>[0]["variant"] }> = {
  active: { label: "Active", variant: "emerald" },
  trialing: { label: "Trial", variant: "info" },
  past_due: { label: "Past due", variant: "gold" },
  suspended: { label: "Suspended", variant: "danger" },
  canceled: { label: "Canceled", variant: "neutral" },
};

export function TenantStatusBadge({ status }: { status: TenantStatus }) {
  const s = TENANT[status];
  return <Badge variant={s.variant} dot>{s.label}</Badge>;
}

const INVOICE: Record<InvoiceStatus, { label: string; variant: Parameters<typeof Badge>[0]["variant"] }> = {
  paid: { label: "Paid", variant: "emerald" },
  open: { label: "Open", variant: "info" },
  failed: { label: "Failed", variant: "danger" },
  void: { label: "Void", variant: "neutral" },
  refunded: { label: "Refunded", variant: "plum" },
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const s = INVOICE[status];
  return <Badge variant={s.variant}>{s.label}</Badge>;
}

const ROLE: Record<AdminRole, { label: string; variant: Parameters<typeof Badge>[0]["variant"] }> = {
  super_admin: { label: "Super Admin", variant: "gold" },
  support: { label: "Support", variant: "emerald" },
  analyst: { label: "Analyst", variant: "info" },
  viewer: { label: "Viewer", variant: "neutral" },
};

export function RoleBadge({ role }: { role: AdminRole }) {
  const s = ROLE[role];
  return <Badge variant={s.variant}>{s.label}</Badge>;
}

const TICKET: Record<TicketStatus, { label: string; variant: Parameters<typeof Badge>[0]["variant"] }> = {
  open: { label: "Open", variant: "gold" },
  pending: { label: "Pending", variant: "info" },
  resolved: { label: "Resolved", variant: "emerald" },
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  const s = TICKET[status];
  return <Badge variant={s.variant} dot>{s.label}</Badge>;
}

const PRIORITY: Record<TicketPriority, { label: string; variant: Parameters<typeof Badge>[0]["variant"] }> = {
  low: { label: "Low", variant: "neutral" },
  normal: { label: "Normal", variant: "info" },
  high: { label: "High", variant: "gold" },
  urgent: { label: "Urgent", variant: "danger" },
};

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const s = PRIORITY[priority];
  return <Badge variant={s.variant}>{s.label}</Badge>;
}
