import React from 'react';
import { View, Pressable, ViewStyle, StyleSheet } from 'react-native';
import { Text } from './Text';
import { useTheme } from '@/lib/theme';

type Tone = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted' | 'accent';

export function Pill({
  children,
  tone = 'default',
  filled,
  dot,
  leftIcon,
  onPress,
  style,
}: {
  children: React.ReactNode;
  tone?: Tone;
  filled?: boolean;
  dot?: boolean;
  leftIcon?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  const { c } = useTheme();
  const map: Record<Tone, string> = {
    default: c.foreground,
    success: c.success,
    warning: c.warning,
    danger: c.danger,
    info: c.info,
    muted: c.muted,
    accent: c.accent,
  };
  const fg = map[tone];
  const Wrap: any = onPress ? Pressable : View;
  return (
    <Wrap
      onPress={onPress}
      style={[
        styles.base,
        {
          backgroundColor: filled ? fg + '22' : 'transparent',
          borderColor: filled ? 'transparent' : c.borderStrong,
        },
        style,
      ]}
    >
      {dot ? (
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: fg, marginRight: 6 }} />
      ) : null}
      {leftIcon ? <View style={{ marginRight: 6 }}>{leftIcon}</View> : null}
      <Text variant="caption" style={{ color: fg, fontFamily: 'Inter_500Medium' }}>
        {children}
      </Text>
    </Wrap>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
});
