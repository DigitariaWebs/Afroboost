import React, { useState } from 'react';
import { View, TextInput, TextInputProps, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Eye, EyeOff } from 'lucide-react-native';
import { Text } from './Text';
import { useTheme } from '@/lib/theme';

export type InputProps = TextInputProps & {
  label?: string;
  helper?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  password?: boolean;
  variant?: 'underline' | 'filled';
};

export function Input({
  label,
  helper,
  error,
  leftIcon,
  password,
  style,
  multiline,
  variant = 'underline',
  ...rest
}: InputProps) {
  const { c } = useTheme();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!password);

  const focus = useSharedValue(0);
  const lineStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: focus.value }],
    opacity: focus.value,
  }));

  const setFocus = (v: boolean) => {
    setFocused(v);
    focus.value = withTiming(v ? 1 : 0, { duration: 200 });
  };

  if (variant === 'filled') {
    return (
      <View style={{ gap: 6 }}>
        {label ? <Text variant="overline" color="mutedFg">{label}</Text> : null}
        <View
          style={{
            flexDirection: 'row',
            alignItems: multiline ? 'flex-start' : 'center',
            backgroundColor: c.surfaceElevated,
            borderColor: error ? c.danger : focused ? c.primary : c.border,
            borderWidth: 1,
            borderRadius: 14,
            paddingHorizontal: 14,
            minHeight: multiline ? 96 : 48,
            paddingVertical: multiline ? 10 : 0,
          }}
        >
          {leftIcon ? <View style={{ paddingRight: 10 }}>{leftIcon}</View> : null}
          <TextInput
            {...rest}
            multiline={multiline}
            secureTextEntry={hidden}
            onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
            onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
            placeholderTextColor={c.mutedFg}
            style={[{ flex: 1, color: c.foreground, fontFamily: 'Inter_400Regular', fontSize: 15, paddingVertical: 0 }, multiline && { textAlignVertical: 'top' }, style as any]}
          />
          {password ? (
            <Pressable onPress={() => setHidden((h) => !h)} hitSlop={8} style={{ padding: 4 }}>
              {hidden ? <EyeOff size={18} color={c.muted} /> : <Eye size={18} color={c.muted} />}
            </Pressable>
          ) : null}
        </View>
        {error || helper ? (
          <Text variant="caption" color={error ? 'danger' : 'muted'}>{error ?? helper}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={{ gap: 4 }}>
      {label ? <Text variant="overline" color="mutedFg">{label}</Text> : null}
      <View style={{ paddingTop: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: multiline ? 'flex-start' : 'center', gap: 10, paddingBottom: 12 }}>
          {leftIcon ? <View>{leftIcon}</View> : null}
          <TextInput
            {...rest}
            multiline={multiline}
            secureTextEntry={hidden}
            onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
            onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
            placeholderTextColor={c.mutedFg}
            style={[
              {
                flex: 1,
                color: c.foreground,
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                paddingVertical: 6,
                minHeight: multiline ? 80 : undefined,
              },
              multiline && { textAlignVertical: 'top' },
              style as any,
            ]}
          />
          {password ? (
            <Pressable onPress={() => setHidden((h) => !h)} hitSlop={8} style={{ padding: 4 }}>
              {hidden ? <EyeOff size={18} color={c.muted} /> : <Eye size={18} color={c.muted} />}
            </Pressable>
          ) : null}
        </View>
        <View style={{ height: 1, backgroundColor: error ? c.danger : c.borderStrong }} />
        <Animated.View
          style={[{ height: 2, backgroundColor: error ? c.danger : c.accent, marginTop: -1 }, lineStyle]}
        />
      </View>
      {error || helper ? (
        <Text variant="caption" color={error ? 'danger' : 'muted'} style={{ marginTop: 4 }}>{error ?? helper}</Text>
      ) : null}
    </View>
  );
}
