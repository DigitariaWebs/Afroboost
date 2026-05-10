import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/lib/theme';

export function Stepper({ current, total }: { current: number; total: number }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            backgroundColor: i <= current ? c.accent : c.borderStrong,
          }}
        />
      ))}
    </View>
  );
}
