import React, { useEffect, useMemo } from 'react';
import Animated, { useAnimatedProps, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { useTheme } from '@/lib/theme';

const APath = Animated.createAnimatedComponent(Path);

export function Sparkline({
  data,
  width = 120,
  height = 36,
  tone = 'primary',
  fill = true,
}: {
  data: number[];
  width?: number;
  height?: number;
  tone?: 'primary' | 'accent' | 'muted';
  fill?: boolean;
}) {
  const { c } = useTheme();
  const stroke = tone === 'accent' ? c.accent : tone === 'muted' ? c.muted : c.primary;
  const fillColor = tone === 'accent' ? c.accent : c.primary;

  const path = useMemo(() => {
    if (!data.length) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const stepX = width / Math.max(1, data.length - 1);
    return data
      .map((v, i) => {
        const x = i * stepX;
        const y = height - 2 - ((v - min) / range) * (height - 4);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(' ');
  }, [data, width, height]);

  const fillPath = useMemo(() => {
    if (!path) return '';
    return `${path} L ${width} ${height} L 0 ${height} Z`;
  }, [path, width, height]);

  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 1100, easing: Easing.out(Easing.cubic) });
  }, [path, progress]);

  const animProps = useAnimatedProps(() => {
    const length = 600; // roughly enough for typical sparkline length
    return {
      strokeDasharray: [length, length] as any,
      strokeDashoffset: length * (1 - progress.value),
    };
  });

  const fillProps = useAnimatedProps(() => ({ opacity: progress.value * 0.4 }));

  return (
    <Svg width={width} height={height}>
      {fill ? (
        <Defs>
          <SvgGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={fillColor} stopOpacity="0.6" />
            <Stop offset="100%" stopColor={fillColor} stopOpacity="0" />
          </SvgGradient>
        </Defs>
      ) : null}
      {fill ? <APath d={fillPath} fill="url(#spark-fill)" animatedProps={fillProps} /> : null}
      <APath
        d={path}
        stroke={stroke}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animatedProps={animProps}
      />
    </Svg>
  );
}
