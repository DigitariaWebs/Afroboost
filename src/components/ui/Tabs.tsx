import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from './Text';
import { useTheme } from '@/lib/theme';

export type TabItem<T extends string> = { value: T; label: string };

export function Tabs<T extends string>({
  value,
  onChange,
  items,
}: {
  value: T;
  onChange: (v: T) => void;
  items: TabItem<T>[];
}) {
  const { c } = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 4, paddingHorizontal: 16 }}
    >
      {items.map((it) => {
        const active = value === it.value;
        return (
          <Pressable
            key={it.value}
            onPress={() => onChange(it.value)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 10,
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Text
              style={{
                color: active ? c.foreground : c.muted,
                fontFamily: active ? 'InstrumentSerif_400Regular_Italic' : 'Inter_500Medium',
                fontSize: active ? 18 : 14,
              }}
            >
              {it.label}
            </Text>
            <View
              style={{
                height: 2,
                width: active ? '100%' : 0,
                backgroundColor: c.accent,
                borderRadius: 999,
                minWidth: active ? 24 : 0,
              }}
            />
          </Pressable>
        );
      })}
      <View style={{ width: 8 }} />
    </ScrollView>
  );
}
