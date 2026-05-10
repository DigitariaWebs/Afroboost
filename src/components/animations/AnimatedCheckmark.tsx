import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import { useTheme } from '@/lib/theme';

export function AnimatedCheckmark({ size = 96, color }: { size?: number; color?: string }) {
  const { c } = useTheme();
  const fg = color ?? c.success;
  const tick = useSharedValue(0);

  useEffect(() => {
    tick.value = withTiming(1, { duration: 600 });
  }, [tick]);

  const tickStyle = useAnimatedStyle(() => ({ opacity: tick.value }));

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: fg + '22',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Animated.View style={tickStyle}>
        <Check size={size * 0.55} color={fg} strokeWidth={3} />
      </Animated.View>
    </View>
  );
}
