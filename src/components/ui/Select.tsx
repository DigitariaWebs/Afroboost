import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { Text } from './Text';
import { Sheet } from './Sheet';
import { useTheme, radius } from '@/lib/theme';

export type SelectOption<T extends string> = { value: T; label: string };

export function Select<T extends string>({
  value,
  onChange,
  options,
  placeholder,
  label,
}: {
  value: T | undefined;
  onChange: (v: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  label?: string;
}) {
  const { c } = useTheme();
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);
  return (
    <View style={{ gap: 6 }}>
      {label ? <Text variant="caption" color="muted">{label}</Text> : null}
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          minHeight: 48,
          borderWidth: 1,
          borderColor: c.border,
          borderRadius: radius.md,
          paddingHorizontal: 14,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: c.surface,
        }}
      >
        <Text color={current ? 'foreground' : 'mutedFg'}>
          {current?.label ?? placeholder ?? 'Sélectionner…'}
        </Text>
        <ChevronDown size={18} color={c.muted} />
      </Pressable>
      <Sheet open={open} onClose={() => setOpen(false)}>
        {label ? <Text variant="h3" style={{ marginBottom: 12 }}>{label}</Text> : null}
        <View style={{ gap: 4 }}>
          {options.map((o) => {
            const active = o.value === value;
            return (
              <Pressable
                key={o.value}
                onPress={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  borderRadius: radius.md,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: active ? c.primary + '15' : 'transparent',
                }}
              >
                <Text variant="bodyEmphasis">{o.label}</Text>
                {active ? <Check size={18} color={c.primary} /> : null}
              </Pressable>
            );
          })}
        </View>
      </Sheet>
    </View>
  );
}
