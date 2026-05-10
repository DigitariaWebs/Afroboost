import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { useTheme, radius } from '@/lib/theme';

type Variant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted';

export function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: Variant }) {
  const { c } = useTheme();
  const map: Record<Variant, { bg: string; fg: string }> = {
    default: { bg: c.primary + '22', fg: c.primary },
    success: { bg: c.success + '22', fg: c.success },
    warning: { bg: c.warning + '22', fg: c.warning },
    danger: { bg: c.danger + '22', fg: c.danger },
    info: { bg: c.info + '22', fg: c.info },
    muted: { bg: c.border, fg: c.muted },
  };
  const { bg, fg } = map[variant];
  return (
    <View style={[styles.b, { backgroundColor: bg, borderRadius: radius.full }]}>
      <Text variant="caption" style={{ color: fg, fontFamily: 'Inter_600SemiBold' }}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  b: { paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
});
