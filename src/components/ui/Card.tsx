import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme, radius } from '@/lib/theme';

export type CardProps = ViewProps & {
  padding?: number;
  elevated?: boolean;
  tone?: 'default' | 'high' | 'flat';
};

export function Card({ padding = 18, elevated, tone = 'default', style, children, ...rest }: CardProps) {
  const { c } = useTheme();
  const bg = tone === 'high' ? c.surfaceHigh : tone === 'flat' ? c.surface : c.surfaceElevated;
  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: bg,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: c.border,
          padding,
        },
        elevated && {
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 8 },
          elevation: 4,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
