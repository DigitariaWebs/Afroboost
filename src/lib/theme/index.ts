export * from './colors';
export * from './typography';
export * from './ThemeProvider';

export const radius = {
  xs: 6,
  sm: 10,
  DEFAULT: 14,
  md: 18,
  lg: 22,
  xl: 28,
  full: 9999,
} as const;

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const motion = {
  fast: 180,
  base: 240,
  slow: 360,
  cinematic: 520,
} as const;
