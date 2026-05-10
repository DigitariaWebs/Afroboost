import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/lib/theme';

export function Divider({ vertical }: { vertical?: boolean }) {
  const { c } = useTheme();
  return (
    <View
      style={[
        vertical ? styles.v : styles.h,
        { backgroundColor: c.border },
      ]}
    />
  );
}
const styles = StyleSheet.create({
  h: { height: StyleSheet.hairlineWidth, alignSelf: 'stretch' },
  v: { width: StyleSheet.hairlineWidth, alignSelf: 'stretch' },
});
