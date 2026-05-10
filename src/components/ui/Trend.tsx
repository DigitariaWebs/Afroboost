import React from 'react';
import { View } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { Text } from './Text';
import { useTheme } from '@/lib/theme';

export function Trend({ value, suffix = '%', compact }: { value: number; suffix?: string; compact?: boolean }) {
  const { c } = useTheme();
  const up = value >= 0;
  const color = up ? c.success : c.danger;
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: compact ? 0 : 8,
        paddingVertical: compact ? 0 : 3,
        borderRadius: 999,
        backgroundColor: compact ? 'transparent' : color + '18',
        alignSelf: 'flex-start',
      }}
    >
      <Icon size={12} color={color} />
      <Text variant="mono" style={{ color, fontSize: 12, lineHeight: 14 }}>
        {up ? '+' : ''}
        {value.toFixed(1)}
        {suffix}
      </Text>
    </View>
  );
}
