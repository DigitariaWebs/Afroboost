import React from 'react';
import { Pressable, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme, radius } from '@/lib/theme';
import { Text } from './Text';

export function Checkbox({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  disabled?: boolean;
}) {
  const { c } = useTheme();
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange(!checked)}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 12, opacity: disabled ? 0.5 : 1 }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: radius.xs,
          borderWidth: 1.5,
          borderColor: checked ? c.accent : c.borderStrong,
          backgroundColor: checked ? c.accent : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked ? <Check size={14} color={c.accentFg} strokeWidth={3} /> : null}
      </View>
      {label ? <Text>{label}</Text> : null}
    </Pressable>
  );
}
