import React from 'react';
import { View, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Text } from './Text';
import { useTheme } from '@/lib/theme';

export function SectionHeader({
  overline,
  title,
  subtitle,
  action,
  onAction,
}: {
  overline?: string;
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
}) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
      <View style={{ flex: 1 }}>
        {overline ? <Text variant="overline" color="muted" style={{ marginBottom: 4 }}>{overline}</Text> : null}
        <Text variant="h2">{title}</Text>
        {subtitle ? <Text color="muted" variant="caption" style={{ marginTop: 4 }}>{subtitle}</Text> : null}
      </View>
      {action ? (
        <Pressable onPress={onAction} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 4 }}>
          <Text variant="bodyEmphasis" style={{ color: c.accent }}>{action}</Text>
          <ChevronRight size={14} color={c.accent} />
        </Pressable>
      ) : null}
    </View>
  );
}
