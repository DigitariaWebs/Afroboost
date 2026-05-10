import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from './Text';
import { useTheme, radius } from '@/lib/theme';
import { useToastStore } from '@/stores/toastStore';
import type { Toast as TToast } from '@/types';

export function ToastViewport() {
  const toasts = useToastStore((s) => s.toasts);
  const insets = useSafeAreaInsets();
  return (
    <View pointerEvents="box-none" style={[styles.viewport, { top: insets.top + 8 }]}>
      {toasts.map((t) => (
        <ToastItem key={t.id} t={t} />
      ))}
    </View>
  );
}

function ToastItem({ t }: { t: TToast }) {
  const { c } = useTheme();
  const dismiss = useToastStore((s) => s.dismiss);
  const ty = useSharedValue(-80);
  const op = useSharedValue(0);
  useEffect(() => {
    ty.value = withSpring(0, { damping: 18, stiffness: 220 });
    op.value = withTiming(1, { duration: 180 });
  }, [ty, op]);

  const aStyle = useAnimatedStyle(() => ({ transform: [{ translateY: ty.value }], opacity: op.value }));

  const tone: Record<NonNullable<TToast['variant']>, string> = {
    default: c.accent,
    success: c.success,
    danger: c.danger,
    warning: c.warning,
  };
  const accent = tone[t.variant ?? 'default'];

  return (
    <Animated.View style={[styles.toast, { backgroundColor: c.surfaceHigh, borderColor: c.borderStrong, borderRadius: radius.md }, aStyle]}>
      <View style={[styles.bar, { backgroundColor: accent }]} />
      <Pressable onPress={() => dismiss(t.id)} style={{ flex: 1 }}>
        <Text variant="bodyEmphasis">{t.title}</Text>
        {t.description ? <Text variant="caption" color="muted">{t.description}</Text> : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  viewport: { position: 'absolute', left: 16, right: 16, gap: 8, zIndex: 1000 },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  bar: { width: 3, alignSelf: 'stretch', borderRadius: 2 },
});
