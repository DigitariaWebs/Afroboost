import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/Text';
import { useSettingsStore } from '@/stores/settingsStore';

export function DemoBanner() {
  const on = useSettingsStore((s) => s.demoBanner);
  const { t } = useTranslation();
  if (!on) return null;
  return (
    <View style={{ backgroundColor: '#E89A3F', paddingVertical: 4, alignItems: 'center' }}>
      <Text variant="caption" style={{ color: '#1A1A1A', fontFamily: 'Inter_600SemiBold' }}>
        {t('common.demoMode')}
      </Text>
    </View>
  );
}
