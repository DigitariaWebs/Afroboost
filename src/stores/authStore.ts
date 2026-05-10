import { create } from 'zustand';
import { mockMutation } from '@/lib/mock-api';

type User = { id: string; email: string; name: string };
type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  signIn: async (email) => {
    await mockMutation(null);
    set({
      user: { id: 'usr_1', email, name: email.split('@')[0] || 'Patrick' },
      isAuthenticated: true,
    });
  },
  signUp: async (email) => {
    await mockMutation(null);
    set({
      user: { id: 'usr_1', email, name: email.split('@')[0] || 'Patrick' },
      isAuthenticated: true,
    });
  },
  signOut: () => set({ user: null, isAuthenticated: false }),
}));
