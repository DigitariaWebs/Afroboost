import type { Usage } from '@/types';

export const mockUsage: Usage = {
  posts: { used: 8, limit: 12 },
  calls: { used: 47, limit: 200 },
  sms: { used: 23, limit: 100 },
  ai: { used: 184, limit: 500 },
  periodStart: '2026-05-01',
  periodEnd: '2026-05-31',
};
