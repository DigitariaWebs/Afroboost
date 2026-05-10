import React from 'react';
import { View, Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { useTheme } from '@/lib/theme';

export function Header({
  title,
  back,
  right,
  subtitle,
}: {
  title?: string;
  back?: boolean;
  right?: React.ReactNode;
  subtitle?: string;
}) {
  const { c } = useTheme();
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 48,
      }}
    >
      {back ? (
        <Pressable onPress={() => router.back()} hitSlop={8} style={{ padding: 4, marginLeft: -4 }}>
          <ChevronLeft size={26} color={c.foreground} />
        </Pressable>
      ) : null}
      <View style={{ flex: 1 }}>
        {title ? <Text variant="h2">{title}</Text> : null}
        {subtitle ? <Text variant="caption" color="muted">{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}
