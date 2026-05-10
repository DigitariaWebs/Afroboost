import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenContainer, Header } from '@/components/layout';
import { Input, Button, Text, RadioGroup } from '@/components/ui';
import { mockBusiness } from '@/mocks';
import type { Tone } from '@/types';
import { toast } from '@/stores/toastStore';

export default function BusinessSettings() {
  const { t } = useTranslation();
  const [name, setName] = useState(mockBusiness.name);
  const [address, setAddress] = useState(mockBusiness.address);
  const [tone, setTone] = useState<Tone>(mockBusiness.tone);
  const [services, setServices] = useState(mockBusiness.services.join(', '));

  return (
    <ScreenContainer scroll>
      <Header back title={t('settings.business')} />
      <View style={{ gap: 14 }}>
        <Input label={t('onboarding.businessProfile.nameLabel')} value={name} onChangeText={setName} />
        <Input label={t('onboarding.businessProfile.addressLabel')} value={address} onChangeText={setAddress} />
        <Input label={t('onboarding.businessProfile.servicesLabel')} value={services} onChangeText={setServices} multiline />
        <Text variant="bodyEmphasis">{t('onboarding.businessProfile.toneLabel')}</Text>
        <RadioGroup
          value={tone}
          onChange={setTone}
          options={[
            { value: 'warm', label: t('onboarding.businessProfile.toneWarm') },
            { value: 'pro', label: t('onboarding.businessProfile.tonePro') },
            { value: 'casual', label: t('onboarding.businessProfile.toneCasual') },
            { value: 'direct', label: t('onboarding.businessProfile.toneDirect') },
          ]}
        />
        <Button title={t('common.save')} fullWidth onPress={() => toast({ title: 'Commerce enregistré', variant: 'success' })} />
      </View>
    </ScreenContainer>
  );
}
