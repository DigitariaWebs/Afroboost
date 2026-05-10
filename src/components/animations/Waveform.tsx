import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/lib/theme';

function Bar({ delay, tone }: { delay: number; tone: 'primary' | 'accent' }) {
  const { c } = useTheme();
  const color = tone === 'accent' ? c.accent : c.primary;
  const h = useSharedValue(8);
  useEffect(() => {
    h.value = withRepeat(withTiming(28 + Math.random() * 30, { duration: 380 + delay }), -1, true);
  }, [delay, h]);
  const s = useAnimatedStyle(() => ({ height: h.value }));
  return <Animated.View style={[{ width: 3, borderRadius: 2, backgroundColor: color }, s]} />;
}

export function Waveform({ bars = 22 }: { bars?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', height: 64 }}>
      {Array.from({ length: bars }).map((_, i) => (
        <Bar key={i} delay={i * 28} tone={i % 5 === 0 ? 'accent' : 'primary'} />
      ))}
    </View>
  );
}
