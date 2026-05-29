"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Session = {
  email: string;
  name: string;
  role: "super_admin";
  loggedInAt: string;
};

type AuthState = {
  session: Session | null;
  hydrated: boolean;
  login: (email: string) => void;
  logout: () => void;
  setHydrated: () => void;
};

function nameFromEmail(email: string): string {
  const local = email.split("@")[0] || "Admin";
  return local
    .split(/[._-]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      hydrated: false,
      // Mock login — accepts any credentials (matches the prototype's approach).
      login: (email: string) =>
        set({
          session: {
            email,
            name: nameFromEmail(email),
            role: "super_admin",
            loggedInAt: new Date().toISOString(),
          },
        }),
      logout: () => set({ session: null }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "afroboost-admin-session",
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    }
  )
);
