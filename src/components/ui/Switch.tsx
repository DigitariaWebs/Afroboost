import React from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/lib/theme';

export function Switch({ value, onValueChange, disabled }: { value: boolean; onValueChange: (v: boolean) => void; disabled?: boolean }) {
  const { c } = useTheme();
  const W = 44;
  const H = 26;
  const knob = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(value ? W - H : 0, { duration: 180 }) }],
  }));
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={{
        width: W,
        height: H,
        borderRadius: 999,
        backgroundColor: value ? c.accent : c.borderStrong,
        padding: 2,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Animated.View
        style={[
          { width: H - 4, height: H - 4, borderRadius: 999, backgroundColor: value ? c.accentFg : c.surfaceHigh },
          knob,
        ]}
      />
    </Pressable>
  );
}
