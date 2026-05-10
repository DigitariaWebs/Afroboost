import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from './Text';
import { useTheme } from '@/lib/theme';

export function BlurHeader({
  title,
  back,
  right,
  transparent,
}: {
  title?: string;
  back?: boolean;
  right?: React.ReactNode;
  transparent?: boolean;
}) {
  const { c, name } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const Wrap: any = transparent || Platform.OS === 'ios' ? BlurView : View;
  const wrapProps = transparent || Platform.OS === 'ios' ? { intensity: 40, tint: name === 'dark' ? 'dark' : 'light' } : {};

  return (
    <Wrap
      {...wrapProps}
      style={{
        paddingTop: insets.top,
        backgroundColor: transparent ? 'transparent' : c.background + 'E6',
        borderBottomWidth: transparent ? 0 : 1,
        borderColor: c.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', minHeight: 52, paddingHorizontal: 12, gap: 8 }}>
        {back ? (
          <Pressable onPress={() => router.back()} hitSlop={8} style={{ padding: 6 }}>
            <ChevronLeft size={24} color={c.foreground} />
          </Pressable>
        ) : null}
        <View style={{ flex: 1 }}>
          {title ? <Text variant="h3" numberOfLines={1}>{title}</Text> : null}
        </View>
        {right}
      </View>
    </Wrap>
  );
}
