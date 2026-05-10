import React from 'react';
import { Modal as RNModal, View, Pressable, StyleSheet } from 'react-native';
import { useTheme, radius } from '@/lib/theme';

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const { c } = useTheme();
  return (
    <RNModal transparent visible={open} animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={[StyleSheet.absoluteFill, styles.center, { backgroundColor: '#0009' }]}>
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: c.surface,
            borderRadius: radius.lg,
            padding: 20,
            width: '88%',
            maxWidth: 420,
          }}
        >
          <View>{children}</View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
const styles = StyleSheet.create({ center: { alignItems: 'center', justifyContent: 'center' } });
