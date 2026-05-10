import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs, BlurHeader } from '@/components/ui';
import { AIOrb } from '@/components/brand/AIOrb';
import Chat from './chat';
import WeeklyReport from './weekly-report';
import FormMode from './form-mode';
import { useTheme } from '@/lib/theme';

type Tab = 'chat' | 'report' | 'form';

export default function AssistantIndex() {
  const { t } = useTranslation();
  const { c } = useTheme();
  const [tab, setTab] = useState<Tab>('chat');

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <BlurHeader
        title={t('tabs.assistant')}
        right={<AIOrb size={24} />}
      />
      <View style={{ paddingTop: 12, paddingBottom: 6 }}>
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: 'chat', label: t('assistant.tabs.chat') },
            { value: 'report', label: t('assistant.tabs.report') },
            { value: 'form', label: t('assistant.tabs.form') },
          ]}
        />
      </View>
      <View style={{ flex: 1 }}>
        {tab === 'chat' ? <Chat embedded /> : tab === 'report' ? <WeeklyReport embedded /> : <FormMode embedded />}
      </View>
    </View>
  );
}
