import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { useTheme, typography, TypographyVariant, ColorToken } from '@/lib/theme';

export type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: ColorToken;
  center?: boolean;
};

export function Text({ variant = 'body', color = 'foreground', center, style, ...rest }: AppTextProps) {
  const { c } = useTheme();
  return (
    <RNText
      style={[
        typography[variant],
        { color: c[color] },
        center && styles.center,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
});
