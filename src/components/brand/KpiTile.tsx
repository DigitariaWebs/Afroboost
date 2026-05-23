import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Text } from '@/components/ui/Text';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { Sparkline } from '@/components/ui/Sparkline';
import { Trend } from '@/components/ui/Trend';
import { useTheme, radius } from '@/lib/theme';

export function KpiTile({
  label,
  value,
  prefix,
  suffix,
  decimals = 0,
  delta,
  series,
  delay = 0,
  tone = 'primary',
  large,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta?: number;
  series?: number[];
  delay?: number;
  tone?: 'primary' | 'accent';
  large?: boolean;
}) {
  const { c } = useTheme();
  const isAccent = tone === 'accent';
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).springify().damping(18)}
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: c.surfaceElevated,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: isAccent ? c.accentMuted : c.border,
        borderTopWidth: isAccent ? 2 : 1,
        borderTopColor: isAccent ? c.accent : c.border,
        gap: 6,
        minWidth: 0,
      }}
    >
      <Text variant="overline" style={{ color: isAccent ? c.accent : c.mutedFg }}>{label}</Text>
      <AnimatedNumber
        value={value}
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        variant={large ? 'metricLg' : 'metric'}
        delay={delay}
      />
      {delta !== undefined ? <Trend value={delta} compact /> : null}
      {series && series.length ? (
        <View style={{ marginTop: 4 }}>
          <Sparkline data={series} width={140} height={28} tone={tone} />
        </View>
      ) : null}
    </Animated.View>
  );
}
