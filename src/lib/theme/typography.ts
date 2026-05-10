import type { TextStyle } from 'react-native';

const SERIF = 'InstrumentSerif_400Regular';
const SERIF_ITALIC = 'InstrumentSerif_400Regular_Italic';

export const typography = {
  displayLg: {
    fontFamily: SERIF_ITALIC,
    fontSize: 56,
    lineHeight: 60,
    letterSpacing: -1.4,
  } as TextStyle,
  display: {
    fontFamily: SERIF,
    fontSize: 44,
    lineHeight: 50,
    letterSpacing: -1.2,
  } as TextStyle,
  h1: {
    fontFamily: SERIF,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.6,
  } as TextStyle,
  h2: {
    fontFamily: SERIF,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.3,
  } as TextStyle,
  h3: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.1,
  } as TextStyle,
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
  } as TextStyle,
  bodyEmphasis: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 22,
  } as TextStyle,
  caption: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  } as TextStyle,
  overline: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  } as TextStyle,
  mono: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 20,
    fontVariant: ['tabular-nums'],
  } as TextStyle,
  metric: {
    fontFamily: SERIF,
    fontSize: 38,
    lineHeight: 42,
    fontVariant: ['tabular-nums'],
    letterSpacing: -0.8,
  } as TextStyle,
  metricLg: {
    fontFamily: SERIF,
    fontSize: 56,
    lineHeight: 62,
    fontVariant: ['tabular-nums'],
    letterSpacing: -1.4,
  } as TextStyle,
  serifItalic: {
    fontFamily: SERIF_ITALIC,
    fontSize: 18,
    lineHeight: 26,
  } as TextStyle,
} as const;

export type TypographyVariant = keyof typeof typography;
