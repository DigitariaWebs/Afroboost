import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import { useTheme } from '@/lib/theme';

export function AIOrb({
  size = 32,
  active = true,
  style,
}: {
  size?: number;
  active?: boolean;
  style?: ViewStyle;
}) {
  const { c } = useTheme();
  const pulse = useSharedValue(0.7);
  const rotate = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: active ? 1500 : 3000, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
    rotate.value = withRepeat(withTiming(360, { duration: 8000, easing: Easing.linear }), -1, false);
  }, [active, pulse, rotate]);

  const wrap = useAnimatedStyle(() => ({
    opacity: pulse.value,
    transform: [{ scale: 0.94 + pulse.value * 0.08 }, { rotate: `${rotate.value}deg` }],
  }));

  const halo = useAnimatedStyle(() => ({
    opacity: 0.2 + pulse.value * 0.4,
    transform: [{ scale: 1 + pulse.value * 0.15 }],
  }));

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: size,
            backgroundColor: c.primary,
            shadowColor: c.aiGlowFrom,
            shadowOpacity: 0.7,
            shadowRadius: size * 0.6,
            shadowOffset: { width: 0, height: 0 },
          },
          halo,
        ]}
      />
      <Animated.View style={wrap}>
        <Svg width={size} height={size}>
          <Defs>
            <RadialGradient id={`orb-${size}`} cx="35%" cy="30%" r="80%">
              <Stop offset="0%" stopColor={c.aiGlowTo} stopOpacity="1" />
              <Stop offset="55%" stopColor={c.aiGlowFrom} stopOpacity="1" />
              <Stop offset="100%" stopColor={c.deep} stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Circle cx={size / 2} cy={size / 2} r={size / 2 - 1} fill={`url(#orb-${size})`} />
        </Svg>
      </Animated.View>
    </View>
  );
}
