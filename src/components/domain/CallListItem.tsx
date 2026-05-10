import React from 'react';
import { View, Pressable } from 'react-native';
import { PhoneIncoming, PhoneForwarded } from 'lucide-react-native';
import { Text, Pill } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { formatRelative } from '@/lib/utils';
import { useSettingsStore } from '@/stores/settingsStore';
import type { Call } from '@/types';

export function CallListItem({ call, onPress }: { call: Call; onPress?: () => void }) {
  const { c } = useTheme();
  const lng = useSettingsStore((s) => s.language);
  const ai = call.handledBy === 'ai';
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
      <View
        style={{
          width: 36, height: 36, borderRadius: 999,
          backgroundColor: ai ? c.primary + '22' : c.accent + '22',
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        {ai ? <PhoneIncoming size={16} color={c.primary} /> : <PhoneForwarded size={16} color={c.accent} />}
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="bodyEmphasis">{call.caller}</Text>
        <Text variant="caption" color="muted">{call.intent}</Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 4 }}>
        <Text variant="mono" color="foreground" style={{ fontSize: 13 }}>{Math.floor(call.durationSec / 60)}:{String(call.durationSec % 60).padStart(2, '0')}</Text>
        <Text variant="mono" color="muted" style={{ fontSize: 11 }}>{formatRelative(call.timestamp, lng)}</Text>
      </View>
      <View style={{ marginLeft: 8 }}>
        <Pill tone={ai ? 'success' : 'warning'} dot>{ai ? 'IA' : 'Vous'}</Pill>
      </View>
    </Pressable>
  );
}
