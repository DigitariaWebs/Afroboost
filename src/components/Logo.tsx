import React from 'react';
import { Image } from 'expo-image';

const LOGO_SOURCE = require('../../assets/images/logo.png');

const WORDMARK_ASPECT = 3;

export function Logo({ width = 160 }: { width?: number }) {
  const height = Math.round(width / WORDMARK_ASPECT);
  return (
    <Image
      source={LOGO_SOURCE}
      style={{ width, height, alignSelf: 'center' }}
      contentFit="contain"
    />
  );
}
