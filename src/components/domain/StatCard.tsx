import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { Text, Card } from '@/components/ui';
import { useTheme } from '@/lib/theme';

export function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  icon,
  delay = 0,
}: {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  icon?: React.ReactNode;
  delay?: number;
}) {
  const { c } = useTheme();
  const up = (delta ?? 0) >= 0;
  return (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <Card padding={14} style={{ minWidth: 160 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="caption" color="muted">{label}</Text>
          {icon}
        </View>
        <Text variant="display" style={{ marginTop: 4 }}>{value}</Text>
        {delta !== undefined ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 }}>
            {up ? <TrendingUp size={14} color={c.success} /> : <TrendingDown size={14} color={c.danger} />}
            <Text variant="caption" style={{ color: up ? c.success : c.danger, fontFamily: 'Inter_600SemiBold' }}>
              {up ? '+' : ''}{delta}{typeof delta === 'number' ? '' : ''}
            </Text>
            {deltaLabel ? <Text variant="caption" color="muted"> {deltaLabel}</Text> : null}
          </View>
        ) : null}
      </Card>
    </Animated.View>
  );
}
