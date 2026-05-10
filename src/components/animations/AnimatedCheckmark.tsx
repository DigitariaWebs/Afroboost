import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import { useTheme } from '@/lib/theme';

export function AnimatedCheckmark({ size = 96, color }: { size?: number; color?: string }) {
  const { c } = useTheme();
  const fg = color ?? c.success;
  const ring = useSharedValue(0);
  const tick = useSharedValue(0);

  useEffect(() => {
    ring.value = withSpring(1, { damping: 10, stiffness: 160 });
    tick.value = withSequence(withTiming(0, { duration: 200 }), withSpring(1, { damping: 12, stiffness: 220 }));
  }, [ring, tick]);

  const ringStyle = useAnimatedStyle(() => ({ transform: [{ scale: ring.value }] }));
  const tickStyle = useAnimatedStyle(() => ({ opacity: tick.value, transform: [{ scale: tick.value }] }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: fg + '22',
          alignItems: 'center',
          justifyContent: 'center',
        },
        ringStyle,
      ]}
    >
      <Animated.View style={tickStyle}>
        <Check size={size * 0.55} color={fg} strokeWidth={3} />
      </Animated.View>
    </Animated.View>
  );
}
