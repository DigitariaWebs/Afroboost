import React from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import { Button } from './Button';

export function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  onCta,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
}) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 }}>
      {icon ? <View style={{ opacity: 0.7 }}>{icon}</View> : null}
      <Text variant="h3" center>{title}</Text>
      {description ? <Text variant="body" color="muted" center>{description}</Text> : null}
      {ctaLabel && onCta ? <Button title={ctaLabel} onPress={onCta} /> : null}
    </View>
  );
}
