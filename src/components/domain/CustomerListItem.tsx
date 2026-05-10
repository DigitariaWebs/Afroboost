import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Avatar, Pill } from '@/components/ui';
import { ChannelIcon } from './ChannelIcon';
import { useTheme } from '@/lib/theme';
import { formatRelative } from '@/lib/utils';
import { useSettingsStore } from '@/stores/settingsStore';
import type { Customer } from '@/types';

export function CustomerListItem({ customer, onPress }: { customer: Customer; onPress?: () => void }) {
  const { c } = useTheme();
  const lng = useSettingsStore((s) => s.language);
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        gap: 14,
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: c.border,
      }}
    >
      <Avatar name={customer.name} size="md" />
      <View style={{ flex: 1 }}>
        <Text variant="bodyEmphasis">{customer.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
          {customer.lastContactChannel ? <ChannelIcon channel={customer.lastContactChannel} size={11} /> : null}
          <Text variant="mono" color="muted" style={{ fontSize: 11 }}>
            {customer.lastContactAt ? formatRelative(customer.lastContactAt, lng) : '—'}
          </Text>
        </View>
      </View>
      {customer.tags[0] ? <Pill tone="accent" dot>{customer.tags[0]}</Pill> : null}
    </Pressable>
  );
}
