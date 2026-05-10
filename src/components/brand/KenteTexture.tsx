import React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { Defs, Pattern, Rect, Path, G } from 'react-native-svg';
import { useTheme } from '@/lib/theme';

export function KenteTexture({
  opacity = 0.06,
  tone,
  style,
}: {
  opacity?: number;
  tone?: 'gold' | 'emerald' | 'mixed';
  style?: ViewStyle;
}) {
  const { c } = useTheme();
  const stripeA = tone === 'emerald' ? c.primary : c.accent;
  const stripeB = tone === 'gold' ? c.accent : tone === 'emerald' ? c.aiGlowTo : c.deep;

  return (
    <Svg
      pointerEvents="none"
      style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, style] as any}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <Defs>
        <Pattern id="kente" width="48" height="48" patternUnits="userSpaceOnUse">
          <G opacity={opacity}>
            <Rect x="0" y="0" width="48" height="48" fill="transparent" />
            <Rect x="0" y="6" width="48" height="2" fill={stripeA} />
            <Rect x="0" y="12" width="48" height="1" fill={stripeB} />
            <Rect x="0" y="22" width="48" height="3" fill={stripeA} />
            <Rect x="0" y="30" width="48" height="1" fill={stripeB} />
            <Rect x="0" y="36" width="48" height="2" fill={stripeA} />
            <Path d="M0 42 L12 38 L24 42 L36 38 L48 42" stroke={stripeB} strokeWidth="0.7" fill="none" />
          </G>
        </Pattern>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#kente)" />
    </Svg>
  );
}
