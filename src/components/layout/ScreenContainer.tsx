import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/lib/theme';

export function ScreenContainer({
  children,
  scroll,
  padded = true,
  style,
  contentStyle,
  bottomInset = true,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  bottomInset?: boolean;
}) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const padding = padded ? 16 : 0;
  const Body = scroll ? ScrollView : View;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: c.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Body
        style={[{ flex: 1 }, !scroll && contentStyle, style]}
        contentContainerStyle={
          scroll
            ? {
                padding,
                paddingBottom: bottomInset ? insets.bottom + 32 : padding,
                gap: 16,
                ...(contentStyle as object),
              }
            : undefined
        }
        keyboardShouldPersistTaps="handled"
      >
        {!scroll ? <View style={{ flex: 1, padding, paddingBottom: bottomInset ? insets.bottom + padding : padding }}>{children}</View> : children}
      </Body>
    </KeyboardAvoidingView>
  );
}
