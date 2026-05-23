export const colors = {
  dark: {
    background: '#0E1A14',
    surface: '#15221C',
    surfaceElevated: '#1A2B22',
    surfaceHigh: '#22372D',
    border: '#2A3D34',
    borderStrong: '#3D5448',

    primary: '#1F8A55',
    primaryFg: '#F2F7F4',
    primaryMuted: '#15643E',

    accent: '#E8B84A',
    accentFg: '#1A1410',
    accentMuted: '#A57A2D',
    accentSoft: '#3A2E14',
    accentGradientFrom: '#F2C95C',
    accentGradientTo: '#B8842A',

    deep: '#5B2A4F',

    foreground: '#F2F7F4',
    muted: '#9BB0A6',
    mutedFg: '#6F857B',

    success: '#3DAA68',
    warning: '#E8B84A',
    danger: '#E25C5C',
    info: '#6FA8E0',

    aiGlowFrom: '#1F8A55',
    aiGlowTo: '#E8B84A',

    overlay: 'rgba(7,12,9,0.72)',
  },
  light: {
    background: '#F4F0E8',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceHigh: '#FFFFFF',
    border: '#E2DBCD',
    borderStrong: '#C9C0AE',

    primary: '#176B43',
    primaryFg: '#FFFFFF',
    primaryMuted: '#9CC6B0',

    accent: '#C29234',
    accentFg: '#FFFFFF',
    accentMuted: '#E8CE94',
    accentSoft: '#FBF1D9',
    accentGradientFrom: '#D9A845',
    accentGradientTo: '#9C701F',

    deep: '#5B2A4F',

    foreground: '#1A2520',
    muted: '#5C6B62',
    mutedFg: '#8B968E',

    success: '#0F7B3A',
    warning: '#C29234',
    danger: '#B81B1B',
    info: '#2563EB',

    aiGlowFrom: '#176B43',
    aiGlowTo: '#C29234',

    overlay: 'rgba(20,30,24,0.45)',
  },
} as const;

export type ThemeName = keyof typeof colors;
export type ColorToken = keyof typeof colors.dark;
