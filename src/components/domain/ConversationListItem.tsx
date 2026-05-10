import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Avatar } from '@/components/ui';
import { ChannelIcon } from './ChannelIcon';
import { useTheme } from '@/lib/theme';
import { formatRelative } from '@/lib/utils';
import { useSettingsStore } from '@/stores/settingsStore';
import type { Conversation } from '@/types';

export function ConversationListItem({ conv, onPress }: { conv: Conversation; onPress?: () => void }) {
  const { c } = useTheme();
  const lng = useSettingsStore((s) => s.language);
  const unread = conv.unread > 0;
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        gap: 14,
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
        alignItems: 'center',
      }}
    >
      <View>
        <Avatar name={conv.customerName} size="md" />
        <View
          style={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            width: 18,
            height: 18,
            borderRadius: 999,
            backgroundColor: c.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChannelIcon channel={conv.channel} size={11} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
          <Text variant="bodyEmphasis" numberOfLines={1} style={{ flex: 1 }}>{conv.customerName}</Text>
          <Text variant="mono" color="muted" style={{ fontSize: 11 }}>{formatRelative(conv.lastTimestamp, lng)}</Text>
        </View>
        <Text variant="body" color={unread ? 'foreground' : 'muted'} numberOfLines={1} style={{ marginTop: 2 }}>
          {conv.lastMessage}
        </Text>
      </View>
      {unread ? (
        <View style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: c.accent }} />
      ) : null}
    </Pressable>
  );
}
