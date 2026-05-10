import React from 'react';
import { Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/lib/theme';

export function FloatingBack({ tint }: { tint?: string }) {
  const { c } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      onPress={() => router.back()}
      hitSlop={12}
      style={{
        position: 'absolute',
        top: insets.top + 8,
        left: 12,
        zIndex: 10,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ChevronLeft size={28} color={tint ?? c.foreground} />
    </Pressable>
  );
}
