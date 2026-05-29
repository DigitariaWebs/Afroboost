import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Gauge,
  Users,
  LifeBuoy,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  group: "Overview" | "Operations" | "Platform";
};

export const NAV: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, group: "Overview" },
  { href: "/dashboard/tenants", label: "Businesses", icon: Building2, group: "Operations" },
  { href: "/dashboard/billing", label: "Subscriptions & Billing", icon: CreditCard, group: "Operations" },
  { href: "/dashboard/usage", label: "Usage & Quotas", icon: Gauge, group: "Operations" },
  { href: "/dashboard/users", label: "Users & Roles", icon: Users, group: "Platform" },
  { href: "/dashboard/support", label: "Support", icon: LifeBuoy, group: "Platform" },
  { href: "/dashboard/audit", label: "Audit Log", icon: ScrollText, group: "Platform" },
];
