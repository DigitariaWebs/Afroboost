import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme, radius } from '@/lib/theme';
import { KenteTexture } from './KenteTexture';

export type GlowCardProps = ViewProps & {
  padding?: number;
  texture?: boolean;
  tone?: 'emerald' | 'gold' | 'plum' | 'subtle';
};

export function GlowCard({
  padding = 20,
  texture = true,
  tone = 'emerald',
  style,
  children,
  ...rest
}: GlowCardProps) {
  const { c } = useTheme();

  const tones: Record<NonNullable<GlowCardProps['tone']>, string[]> = {
    emerald: [c.primary + '22', c.surfaceElevated, c.accent + '14'],
    gold: [c.accentGradientFrom + '33', c.surfaceElevated, c.accentGradientTo + '22'],
    plum: [c.deep + '40', c.surfaceElevated, c.accent + '14'],
    subtle: [c.surfaceHigh, c.surfaceElevated, c.surface],
  };

  const borderColor = tone === 'gold' ? c.accentMuted : c.borderStrong;

  return (
    <View
      {...rest}
      style={[
        {
          borderRadius: radius.lg,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={tones[tone] as [string, string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {texture ? <KenteTexture tone={tone === 'gold' ? 'gold' : 'mixed'} opacity={0.05} /> : null}
      <View style={{ padding }}>{children}</View>
    </View>
  );
}
