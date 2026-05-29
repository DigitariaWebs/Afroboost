"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AIOrb } from "@/components/AIOrb";
import { Button } from "@/components/ui";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const [email, setEmail] = useState("patrick@afroboost.ca");
  const [password, setPassword] = useState("demo");
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Mock auth — accepts anything. Brief delay to feel real.
    setTimeout(() => {
      login(email);
      router.replace("/dashboard");
    }, 650);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="kente pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative w-full max-w-sm animate-fade-up">
        <div className="mb-8 flex flex-col items-center text-center">
          <AIOrb size={56} />
          <h1 className="mt-5 font-serif text-3xl tracking-tight text-ink">AfroBoost</h1>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold">Super Admin Console</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl border border-line bg-white/[0.03] p-6 shadow-card backdrop-blur-xl"
        >
          <label className="mb-1.5 block text-xs font-medium text-ink-muted">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-xl border border-line bg-obsidian-900/60 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-emerald/50"
            placeholder="you@afroboost.ca"
          />
          <label className="mb-1.5 block text-xs font-medium text-ink-muted">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-5 w-full rounded-xl border border-line bg-obsidian-900/60 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-emerald/50"
            placeholder="••••••••"
          />
          <Button type="submit" variant="gold" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
          <p className="mt-4 text-center text-[11px] text-ink-faint">
            Demo mode — any email & password works.
          </p>
        </form>
      </div>
    </div>
  );
}
