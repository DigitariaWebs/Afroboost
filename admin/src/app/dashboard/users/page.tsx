"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, ShieldCheck, Users as UsersIcon } from "lucide-react";
import { Card, CardHeader, Table, Th, Td, HueAvatar, Badge, Button } from "@/components/ui";
import { RoleBadge } from "@/components/status";
import { admins, owners, tenantById } from "@/lib/mock-data";
import { AdminRole } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const ROLE_PERMS: Record<AdminRole, string> = {
  super_admin: "Full access — billing, suspensions, admin management, impersonation.",
  support: "Tenant support, ticket handling, impersonation. No billing changes.",
  analyst: "Read-only analytics & exports. No tenant mutations.",
  viewer: "Read-only dashboards. No exports, no actions.",
};

export default function UsersPage() {
  const [tab, setTab] = useState<"admins" | "owners">("admins");
  const [banner, setBanner] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl tracking-tight text-ink">Users & Roles</h1>
          <p className="mt-1 text-sm text-ink-muted">Admin team RBAC and business owner accounts</p>
        </div>
        <Button variant="gold" size="sm" onClick={() => setBanner("Admin invitation sent")}>
          <UserPlus size={14} /> Invite admin
        </Button>
      </div>

      {banner && (
        <div className="rounded-xl border border-emerald/30 bg-emerald/10 px-4 py-3 text-sm text-emerald-light">
          {banner} <span className="text-ink-faint">(mock action — no backend)</span>
        </div>
      )}

      <div className="flex gap-2">
        {(["admins", "owners"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              tab === t ? "border-emerald/40 bg-emerald/15 text-emerald-light" : "border-line text-ink-muted hover:bg-white/[0.04]"
            )}
          >
            {t === "admins" ? <ShieldCheck size={15} /> : <UsersIcon size={15} />}
            {t === "admins" ? `Admin team (${admins.length})` : `Business owners (${owners.length})`}
          </button>
        ))}
      </div>

      {tab === "admins" ? (
        <>
          <Card className="overflow-hidden">
            <CardHeader title="Admin team" subtitle="Operators with console access" />
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Role</Th>
                  <Th>Status</Th>
                  <Th>Created</Th>
                  <Th>Last active</Th>
                  <Th />
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a.id} className="transition-colors hover:bg-white/[0.03]">
                    <Td>
                      <div className="flex items-center gap-2.5">
                        <HueAvatar name={a.name} hue={200} size={32} />
                        <div>
                          <div className="font-medium text-ink">{a.name}</div>
                          <div className="text-xs text-ink-muted">{a.email}</div>
                        </div>
                      </div>
                    </Td>
                    <Td><RoleBadge role={a.role} /></Td>
                    <Td>
                      <Badge variant={a.status === "active" ? "emerald" : a.status === "invited" ? "info" : "neutral"} dot>
                        {a.status === "active" ? "Active" : a.status === "invited" ? "Invited" : "Disabled"}
                      </Badge>
                    </Td>
                    <Td className="text-ink-muted">{format(new Date(a.createdAt), "MMM yyyy")}</Td>
                    <Td className="text-ink-muted">{format(new Date(a.lastActiveAt), "MMM d, yyyy")}</Td>
                    <Td className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setBanner(`Edit dialog opened for ${a.name}`)}>Edit</Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>

          <Card>
            <CardHeader title="Roles & permissions" subtitle="What each admin role can do" />
            <div className="grid gap-px bg-line sm:grid-cols-2">
              {(Object.keys(ROLE_PERMS) as AdminRole[]).map((r) => (
                <div key={r} className="bg-obsidian-900 p-5">
                  <RoleBadge role={r} />
                  <p className="mt-2 text-sm text-ink-muted">{ROLE_PERMS[r]}</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : (
        <Card className="overflow-hidden">
          <CardHeader title="Business owners" subtitle="One owner per tenant" />
          <Table>
            <thead>
              <tr>
                <Th>Owner</Th>
                <Th>Business</Th>
                <Th>Email</Th>
                <Th>Verified</Th>
                <Th>Last login</Th>
              </tr>
            </thead>
            <tbody>
              {owners.map((o) => {
                const t = tenantById(o.tenantId);
                return (
                  <tr key={o.id} className="transition-colors hover:bg-white/[0.03]">
                    <Td>
                      <div className="flex items-center gap-2.5">
                        <HueAvatar name={o.name} hue={(t?.logoHue ?? 0) + 120} size={32} />
                        <span className="font-medium text-ink">{o.name}</span>
                      </div>
                    </Td>
                    <Td>
                      <Link href={`/dashboard/tenants/${o.tenantId}`} className="text-ink hover:text-emerald-light">{t?.name}</Link>
                    </Td>
                    <Td className="text-ink-muted">{o.email}</Td>
                    <Td>
                      <Badge variant={o.emailVerified ? "emerald" : "gold"}>{o.emailVerified ? "Verified" : "Pending"}</Badge>
                    </Td>
                    <Td className="text-ink-muted">{format(new Date(o.lastLoginAt), "MMM d, yyyy")}</Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      )}
    </div>
  );
}
