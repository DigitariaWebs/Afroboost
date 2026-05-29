"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut, Search } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { NAV } from "./nav";
import { HueAvatar } from "./ui";

function titleFor(pathname: string): string {
  const match = [...NAV]
    .sort((a, b) => b.href.length - a.href.length)
    .find((n) => (n.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(n.href)));
  return match?.label ?? "Dashboard";
}

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-line bg-obsidian-950/60 px-5 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-2 lg:hidden">
        <span className="font-serif text-lg text-ink">AfroBoost</span>
      </div>

      <div className="hidden text-sm font-medium text-ink-muted lg:block">{titleFor(pathname)}</div>

      <div className="relative ml-auto hidden max-w-xs flex-1 items-center md:flex">
        <Search size={15} className="pointer-events-none absolute left-3 text-ink-faint" />
        <input
          placeholder="Search businesses, invoices…"
          className="w-full rounded-full border border-line bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-emerald/40"
        />
      </div>

      <div className="ml-auto flex items-center gap-3 md:ml-0">
        <div className="hidden text-right sm:block">
          <div className="text-sm font-medium text-ink">{session?.name ?? "Admin"}</div>
          <div className="text-[11px] text-gold">Super Admin</div>
        </div>
        <HueAvatar name={session?.name ?? "Admin"} hue={150} size={36} />
        <button
          onClick={() => {
            logout();
            router.replace("/login");
          }}
          title="Sign out"
          className="rounded-full border border-line p-2 text-ink-muted transition-colors hover:bg-white/[0.05] hover:text-danger"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
