import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet, Dimensions, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useTheme, radius } from '@/lib/theme';

export function Sheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const { c, name } = useTheme();
  const H = Dimensions.get('window').height;
  const translate = useSharedValue(H);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (open) {
      translate.value = withSpring(0, { damping: 22, stiffness: 260 });
      opacity.value = withTiming(1, { duration: 220 });
    } else {
      translate.value = withTiming(H, { duration: 220 });
      opacity.value = withTiming(0, { duration: 180 });
    }
  }, [open, H, translate, opacity]);

  const sheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translate.value }] }));
  const overlayStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  if (!open && opacity.value === 0) return null;

  const Backdrop: any = Platform.OS === 'ios' ? BlurView : View;
  const backdropProps = Platform.OS === 'ios' ? { intensity: 18, tint: name === 'dark' ? 'dark' : 'light' } : {};

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={open ? 'auto' : 'none'}>
      <Animated.View style={[StyleSheet.absoluteFill, overlayStyle]}>
        <Backdrop {...backdropProps} style={[StyleSheet.absoluteFill, { backgroundColor: c.overlay }]}>
          <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />
        </Backdrop>
      </Animated.View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: c.surfaceHigh,
            borderTopLeftRadius: radius.xl,
            borderTopRightRadius: radius.xl,
            padding: 20,
            paddingBottom: 36,
            maxHeight: '92%',
            borderTopWidth: 1,
            borderColor: c.borderStrong,
          },
          sheetStyle,
        ]}
      >
        <View
          style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: c.accent, alignSelf: 'center', marginBottom: 14, opacity: 0.55 }}
        />
        {children}
      </Animated.View>
    </View>
  );
}
