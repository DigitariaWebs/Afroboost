import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming, Easing } from 'react-native-reanimated';
import { Text } from '@/components/ui';
import { useTheme } from '@/lib/theme';

function Bar({ ratio, max, height, delay, color }: { ratio: number; max: number; height: number; delay: number; color: string }) {
  const h = useSharedValue(0);
  useEffect(() => {
    h.value = 0;
    h.value = withDelay(delay, withTiming(ratio, { duration: 600, easing: Easing.out(Easing.cubic) }));
  }, [ratio, delay, h]);
  const aStyle = useAnimatedStyle(() => ({ height: h.value * (height - 18) }));
  return (
    <Animated.View
      style={[
        { width: '100%', backgroundColor: color, borderRadius: 4, opacity: ratio === max ? 1 : 0.55 },
        aStyle,
      ]}
    />
  );
}

export function MiniBarChart({ data, labels, height = 120 }: { data: number[]; labels?: string[]; height?: number }) {
  const { c } = useTheme();
  const max = Math.max(1, ...data);
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, height }}>
        {data.map((v, i) => (
          <View key={i} style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Bar ratio={v / max} max={1} height={height} delay={i * 60} color={v === max ? c.accent : c.primary} />
          </View>
        ))}
      </View>
      {labels ? (
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 6 }}>
          {labels.map((l, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center' }}>
              <Text variant="overline" color="mutedFg" style={{ fontSize: 10 }}>{l}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
