import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/lib/theme';

export function ProgressBar({
  value,
  height = 6,
  tone,
}: {
  value: number;
  height?: number;
  tone?: 'default' | 'warning' | 'danger';
}) {
  const { c } = useTheme();
  const v = Math.max(0, Math.min(1, value));
  const w = useSharedValue(0);
  useEffect(() => {
    w.value = withTiming(v, { duration: 700 });
  }, [v, w]);
  const aStyle = useAnimatedStyle(() => ({ width: `${w.value * 100}%` }));

  const single = tone === 'danger' ? c.danger : tone === 'warning' ? c.warning : null;

  return (
    <View style={{ height, backgroundColor: c.borderStrong, borderRadius: 999, overflow: 'hidden' }}>
      <Animated.View style={[{ height: '100%', borderRadius: 999, overflow: 'hidden' }, aStyle]}>
        {single ? (
          <View style={{ flex: 1, backgroundColor: single }} />
        ) : (
          <LinearGradient
            colors={[c.primary, c.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        )}
      </Animated.View>
    </View>
  );
}
