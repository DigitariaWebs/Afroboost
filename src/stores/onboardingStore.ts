import { create } from 'zustand';
import type { Business, Provider } from '@/types';

type OnboardingState = {
  step: number;
  isComplete: boolean;
  businessDraft: Partial<Business>;
  connectedAccounts: Partial<Record<Provider, boolean>>;
  setStep: (n: number) => void;
  updateBusiness: (patch: Partial<Business>) => void;
  toggleAccount: (provider: Provider, value: boolean) => void;
  complete: () => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 0,
  isComplete: false,
  businessDraft: {},
  connectedAccounts: {},
  setStep: (n) => set({ step: n }),
  updateBusiness: (patch) =>
    set((s) => ({ businessDraft: { ...s.businessDraft, ...patch } })),
  toggleAccount: (provider, value) =>
    set((s) => ({ connectedAccounts: { ...s.connectedAccounts, [provider]: value } })),
  complete: () => set({ isComplete: true, step: 0 }),
  reset: () => set({ step: 0, isComplete: false, businessDraft: {}, connectedAccounts: {} }),
}));
