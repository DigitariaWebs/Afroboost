import React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';

const LOGO_SOURCE = require('../../assets/images/logo.png');

const WORDMARK_WIDTH_RATIO = 0.5;
const WORDMARK_VERTICAL_OFFSET = 0.12;
const WORDMARK_ASPECT = 3;

export function Logo({ width = 160 }: { width?: number }) {
  const height = Math.round(width / WORDMARK_ASPECT);
  const innerSize = width / WORDMARK_WIDTH_RATIO;
  const translateY = -width * WORDMARK_VERTICAL_OFFSET;

  return (
    <View
      style={{
        width,
        height,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        source={LOGO_SOURCE}
        style={{
          width: innerSize,
          height: innerSize,
          transform: [{ translateY }],
        }}
        contentFit="contain"
      />
    </View>
  );
}
