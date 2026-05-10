import { create } from 'zustand';
import i18n from '@/lib/i18n';

type SettingsState = {
  language: 'fr' | 'en';
  theme: 'light' | 'dark' | 'system';
  demoBanner: boolean;
  notifications: { posts: boolean; calls: boolean; reviews: boolean; weeklyReport: boolean };
  setLanguage: (lng: 'fr' | 'en') => void;
  setTheme: (t: SettingsState['theme']) => void;
  setDemoBanner: (v: boolean) => void;
  setNotification: (key: keyof SettingsState['notifications'], v: boolean) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  language: 'fr',
  theme: 'dark',
  demoBanner: false,
  notifications: { posts: true, calls: true, reviews: true, weeklyReport: true },
  setLanguage: (lng) => {
    i18n.changeLanguage(lng);
    set({ language: lng });
  },
  setTheme: (t) => set({ theme: t }),
  setDemoBanner: (v) => set({ demoBanner: v }),
  setNotification: (key, v) =>
    set((s) => ({ notifications: { ...s.notifications, [key]: v } })),
}));
