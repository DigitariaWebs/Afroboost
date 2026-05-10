import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useTheme, radius } from '@/lib/theme';

export function Skeleton({ style, height = 16, width }: { style?: ViewStyle; height?: number; width?: number | string }) {
  const { c } = useTheme();
  const op = useSharedValue(0.5);
  useEffect(() => {
    op.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, [op]);
  const aStyle = useAnimatedStyle(() => ({ opacity: op.value }));
  return (
    <Animated.View
      style={[{ height, width: width as any, backgroundColor: c.border, borderRadius: radius.sm }, aStyle, style]}
    />
  );
}
