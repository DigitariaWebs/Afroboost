import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenContainer, Header } from '@/components/layout';
import { Avatar, Input, Button, Modal, Text } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/stores/toastStore';

export default function Profile() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const [name, setName] = useState(user?.name ?? 'Patrick');
  const [email, setEmail] = useState(user?.email ?? 'patrick@chezpatrick.ca');
  const [phone, setPhone] = useState('+1 514 555 0123');
  const [pwOpen, setPwOpen] = useState(false);

  return (
    <ScreenContainer scroll>
      <Header back title={t('settings.profile')} />
      <Pressable onPress={() => toast({ title: 'Photo (mock)' })} style={{ alignItems: 'center' }}>
        <Avatar name={name} size="xl" />
        <Text variant="caption" color="primary" style={{ marginTop: 8 }}>Modifier la photo</Text>
      </Pressable>
      <View style={{ gap: 14 }}>
        <Input label={t('crm.fields.name')} value={name} onChangeText={setName} />
        <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Input label={t('crm.fields.phone')} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <Button title="Modifier mon mot de passe" variant="outline" onPress={() => setPwOpen(true)} />
        <Button title={t('common.save')} onPress={() => toast({ title: 'Profil enregistré', variant: 'success' })} fullWidth />
      </View>

      <Modal open={pwOpen} onClose={() => setPwOpen(false)}>
        <Text variant="h2" style={{ marginBottom: 12 }}>Mot de passe</Text>
        <Input label="Actuel" password />
        <View style={{ height: 10 }} />
        <Input label="Nouveau" password />
        <View style={{ height: 14 }} />
        <Button title={t('common.save')} fullWidth onPress={() => { setPwOpen(false); toast({ title: 'Mot de passe modifié', variant: 'success' }); }} />
      </Modal>
    </ScreenContainer>
  );
}
