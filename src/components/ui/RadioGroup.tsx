import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './Text';
import { useTheme, radius } from '@/lib/theme';

export type RadioOption<T extends string> = { value: T; label: string; description?: string };

export function RadioGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T | undefined;
  onChange: (v: T) => void;
  options: RadioOption<T>[];
}) {
  const { c } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      {options.map((o) => {
        const active = value === o.value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(o.value)}
            style={{
              padding: 14,
              borderWidth: 1,
              borderRadius: radius.md,
              borderColor: active ? c.accent : c.border,
              backgroundColor: active ? c.surfaceHigh : c.surfaceElevated,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 999,
                borderWidth: 2,
                borderColor: active ? c.accent : c.borderStrong,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {active ? <View style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: c.accent }} /> : null}
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="bodyEmphasis">{o.label}</Text>
              {o.description ? <Text variant="caption" color="muted">{o.description}</Text> : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
