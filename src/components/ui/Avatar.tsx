import React from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import { useTheme, radius } from '@/lib/theme';

const sizes = { xs: 24, sm: 32, md: 40, lg: 56, xl: 84 } as const;

function hashColor(seed: string, palette: string[]) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return palette[h % palette.length]!;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ name, size = 'md', ring }: { name: string; size?: keyof typeof sizes; ring?: boolean }) {
  const { c } = useTheme();
  const palette = [c.primary, c.accent, c.deep, c.info, c.success, c.primaryMuted];
  const bg = hashColor(name, palette);
  const dim = sizes[size];
  const fontSize = dim < 36 ? 11 : dim < 50 ? 14 : dim < 70 ? 18 : 28;
  return (
    <View
      style={{
        width: dim,
        height: dim,
        backgroundColor: bg,
        borderRadius: radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: ring ? 2 : 0,
        borderColor: ring ? c.accent : 'transparent',
      }}
    >
      <Text style={{ color: '#fff', fontSize, fontFamily: 'InstrumentSerif_400Regular' }}>{initials(name)}</Text>
    </View>
  );
}
