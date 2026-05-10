import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenContainer, Header } from '@/components/layout';
import { RadioGroup } from '@/components/ui';
import { useSettingsStore } from '@/stores/settingsStore';
import { toast } from '@/stores/toastStore';

export default function LanguageSettings() {
  const { t } = useTranslation();
  const lang = useSettingsStore((s) => s.language);
  const setLang = useSettingsStore((s) => s.setLanguage);

  return (
    <ScreenContainer scroll>
      <Header back title={t('settings.language')} />
      <RadioGroup
        value={lang}
        onChange={(v) => {
          setLang(v);
          toast({ title: t('settings.languageUpdated'), variant: 'success' });
        }}
        options={[
          { value: 'fr', label: 'Français', description: 'Québec' },
          { value: 'en', label: 'English' },
        ]}
      />
    </ScreenContainer>
  );
}
