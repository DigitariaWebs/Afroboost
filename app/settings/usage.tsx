import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { ScreenContainer, Header } from '@/components/layout';
import { Card, Text } from '@/components/ui';
import { UsageBar } from '@/components/domain/UsageBar';
import { mockUsage } from '@/mocks';

export default function UsageSettings() {
  const { t } = useTranslation();
  const router = useRouter();
  const upgrade = () => router.push('/settings/subscription');
  return (
    <ScreenContainer scroll>
      <Header back title={t('settings.usage')} />
      <Card>
        <Text variant="caption" color="muted">Période en cours</Text>
        <Text variant="bodyEmphasis">{mockUsage.periodStart} → {mockUsage.periodEnd}</Text>
      </Card>
      <Card>
        <View style={{ gap: 16 }}>
          <UsageBar label="Publications" used={mockUsage.posts.used} limit={mockUsage.posts.limit} onUpgrade={upgrade} />
          <UsageBar label="Appels gérés" used={mockUsage.calls.used} limit={mockUsage.calls.limit} onUpgrade={upgrade} />
          <UsageBar label="SMS envoyés" used={mockUsage.sms.used} limit={mockUsage.sms.limit} onUpgrade={upgrade} />
          <UsageBar label="Requêtes IA" used={mockUsage.ai.used} limit={mockUsage.ai.limit} onUpgrade={upgrade} />
        </View>
      </Card>
    </ScreenContainer>
  );
}
