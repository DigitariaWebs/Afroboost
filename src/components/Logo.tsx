import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useTheme, radius } from '@/lib/theme';

export function Logo({ size = 56 }: { size?: number }) {
  const { c } = useTheme();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius.full,
        backgroundColor: c.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: c.primaryFg, fontFamily: 'Inter_700Bold', fontSize: size * 0.42 }}>
        AL
      </Text>
    </View>
  );
}
