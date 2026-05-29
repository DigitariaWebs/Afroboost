"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AIOrb } from "./AIOrb";
import { NAV, NavItem } from "./nav";
import { cn } from "@/lib/utils";

const GROUPS: NavItem["group"][] = ["Overview", "Operations", "Platform"];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-obsidian-950/70 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-3 px-6 py-6">
        <AIOrb size={34} />
        <div className="leading-tight">
          <div className="font-serif text-xl tracking-tight text-ink">AfroBoost</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-gold">Super Admin</div>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-2">
        {GROUPS.map((group) => (
          <div key={group}>
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              {group}
            </div>
            <div className="space-y-0.5">
              {NAV.filter((n) => n.group === group).map((item) => {
                const active =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all",
                      active
                        ? "bg-emerald/15 text-ink shadow-[inset_0_0_0_1px_rgba(45,190,118,0.25)]"
                        : "text-ink-muted hover:bg-white/[0.04] hover:text-ink"
                    )}
                  >
                    <Icon
                      size={17}
                      className={cn(active ? "text-emerald-light" : "text-ink-faint group-hover:text-ink-muted")}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="kente m-3 rounded-xl border border-line px-4 py-3">
        <p className="text-[11px] text-ink-muted">
          <span className="text-gold">Demo mode</span> — all data is mocked. No backend.
        </p>
      </div>
    </aside>
  );
}
