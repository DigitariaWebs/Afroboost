import type { Business } from '@/types';

export const mockBusiness: Business = {
  id: 'biz_1',
  name: 'Chez Patrick',
  type: 'restaurant',
  address: '1234 rue Sainte-Catherine, Montréal, QC',
  hours: {
    mon: '11:00–22:00',
    tue: '11:00–22:00',
    wed: '11:00–22:00',
    thu: '11:00–23:00',
    fri: '11:00–00:00',
    sat: '12:00–00:00',
    sun: '12:00–21:00',
  },
  services: ['Restauration sur place', 'Plats à emporter', 'Livraison', 'Réservations groupes'],
  tone: 'warm',
  languages: ['fr', 'en', 'creole'],
  connectedAccounts: {
    facebook: true,
    instagram: true,
    google: true,
    gmail: false,
    outlook: false,
    calendly: true,
    stripe: true,
    twilio: true,
    whatsapp: false,
  },
  plan: 'performance',
  trialEndsAt: '2026-05-24',
};
