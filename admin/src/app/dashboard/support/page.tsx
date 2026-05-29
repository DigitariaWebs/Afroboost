"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LifeBuoy, Mail, MessageCircle, Phone } from "lucide-react";
import { KpiTile } from "@/components/KpiTile";
import { Card, CardHeader, Table, Th, Td, HueAvatar, Button } from "@/components/ui";
import { TicketStatusBadge, PriorityBadge } from "@/components/status";
import { tenantById, tickets } from "@/lib/mock-data";
import { TicketStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const CHANNEL_ICON = { email: Mail, chat: MessageCircle, phone: Phone };

const FILTERS: { key: TicketStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "pending", label: "Pending" },
  { key: "resolved", label: "Resolved" },
];

export default function SupportPage() {
  const [filter, setFilter] = useState<TicketStatus | "all">("all");
  const [resolved, setResolved] = useState<Record<string, boolean>>({});

  const counts = useMemo(() => ({
    open: tickets.filter((t) => t.status === "open").length,
    pending: tickets.filter((t) => t.status === "pending").length,
    urgent: tickets.filter((t) => t.priority === "urgent").length,
  }), []);

  const rows = useMemo(
    () => (filter === "all" ? tickets : tickets.filter((t) => t.status === filter)),
    [filter]
  );

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="font-serif text-3xl tracking-tight text-ink">Support</h1>
        <p className="mt-1 text-sm text-ink-muted">Tickets across all businesses</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiTile label="Open" value={String(counts.open)} icon={LifeBuoy} accent="gold" />
        <KpiTile label="Pending" value={String(counts.pending)} accent="emerald" />
        <KpiTile label="Urgent" value={String(counts.urgent)} accent="danger" />
        <KpiTile label="Total" value={String(tickets.length)} accent="plum" />
      </div>

      <Card className="overflow-hidden">
        <CardHeader
          title="Tickets"
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
              <Th>Ticket</Th>
              <Th>Business</Th>
              <Th>Priority</Th>
              <Th>Status</Th>
              <Th>Assignee</Th>
              <Th>Updated</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows.map((tk) => {
              const t = tenantById(tk.tenantId);
              const Channel = CHANNEL_ICON[tk.channel];
              const isResolved = resolved[tk.id] || tk.status === "resolved";
              return (
                <tr key={tk.id} className="transition-colors hover:bg-white/[0.03]">
                  <Td>
                    <div className="flex items-start gap-2.5">
                      <Channel size={15} className="mt-0.5 text-ink-faint" />
                      <div>
                        <div className="font-medium text-ink">{tk.subject}</div>
                        <div className="font-mono text-[11px] text-ink-faint">{tk.id} · {tk.requester}</div>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <Link href={`/dashboard/tenants/${tk.tenantId}`} className="flex items-center gap-2 hover:text-emerald-light">
                      <HueAvatar name={t?.name ?? "?"} hue={t?.logoHue ?? 150} size={26} />
                      <span className="text-ink">{t?.name}</span>
                    </Link>
                  </Td>
                  <Td><PriorityBadge priority={tk.priority} /></Td>
                  <Td><TicketStatusBadge status={isResolved ? "resolved" : tk.status} /></Td>
                  <Td className="text-ink-muted">{tk.assignee ?? <span className="text-ink-faint">Unassigned</span>}</Td>
                  <Td className="text-ink-muted">{formatDistanceToNow(new Date(tk.updatedAt), { addSuffix: true })}</Td>
                  <Td className="text-right">
                    {!isResolved && (
                      <Button variant="ghost" size="sm" onClick={() => setResolved((r) => ({ ...r, [tk.id]: true }))}>
                        Resolve
                      </Button>
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
