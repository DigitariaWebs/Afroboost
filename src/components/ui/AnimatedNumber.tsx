import React, { useEffect } from 'react';
import { TextProps } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { TextInput } from 'react-native';
import { useTheme, typography, TypographyVariant, ColorToken } from '@/lib/theme';

const ATextInput = Animated.createAnimatedComponent(TextInput);

export function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 900,
  variant = 'metric',
  color = 'foreground',
  delay = 0,
  formatter,
  style,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  variant?: TypographyVariant;
  color?: ColorToken;
  delay?: number;
  formatter?: (n: number) => string;
  style?: TextProps['style'];
}) {
  const { c } = useTheme();
  const sv = useSharedValue(0);
  useEffect(() => {
    sv.value = 0;
    sv.value = withTiming(value, { duration, easing: Easing.out(Easing.cubic) });
  }, [value, duration, sv]);

  const animProps = useAnimatedProps(() => {
    const n = sv.value;
    const text = formatter
      ? formatter(n)
      : `${prefix}${n.toLocaleString('fr-CA', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
    return { text, defaultValue: text } as any;
  });

  return (
    <ATextInput
      editable={false}
      animatedProps={animProps as any}
      style={[typography[variant], { color: c[color], padding: 0 }, style]}
    />
  );
}
