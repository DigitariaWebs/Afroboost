import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenContainer, Header } from '@/components/layout';
import { Card, Text, Switch, Divider } from '@/components/ui';
import { useSettingsStore } from '@/stores/settingsStore';

export default function NotificationsSettings() {
  const { t } = useTranslation();
  const n = useSettingsStore((s) => s.notifications);
  const set = useSettingsStore((s) => s.setNotification);

  const items: { key: keyof typeof n; label: string }[] = [
    { key: 'posts', label: t('settings.notif.posts') },
    { key: 'calls', label: t('settings.notif.calls') },
    { key: 'reviews', label: t('settings.notif.reviews') },
    { key: 'weeklyReport', label: t('settings.notif.weeklyReport') },
  ];

  return (
    <ScreenContainer scroll>
      <Header back title={t('settings.notifications')} />
      <Card padding={0}>
        {items.map((it, i) => (
          <View key={it.key}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 }}>
              <Text variant="bodyEmphasis" style={{ flex: 1 }}>{it.label}</Text>
              <Switch value={n[it.key]} onValueChange={(v) => set(it.key, v)} />
            </View>
            {i < items.length - 1 ? <Divider /> : null}
          </View>
        ))}
      </Card>
    </ScreenContainer>
  );
}
