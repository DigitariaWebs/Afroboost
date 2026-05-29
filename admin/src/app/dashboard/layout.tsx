"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { AIOrb } from "@/components/AIOrb";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session, hydrated } = useAuth();

  useEffect(() => {
    if (hydrated && !session) router.replace("/login");
  }, [hydrated, session, router]);

  if (!hydrated || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <AIOrb size={44} />
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:pl-64">
      <Sidebar />
      <Topbar />
      <main className="mx-auto max-w-7xl px-5 py-7 lg:px-8 lg:py-9">{children}</main>
    </div>
  );
}
