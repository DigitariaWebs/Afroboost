import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Input, Button, FloatingBack } from '@/components/ui';
import { mockMutation } from '@/lib/mock-api';
import { toast } from '@/stores/toastStore';
import { useTheme } from '@/lib/theme';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const router = useRouter();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await mockMutation(null);
      toast({ title: t('auth.forgot.sent'), variant: 'success' });
      router.back();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <FloatingBack />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: insets.top + 56, paddingBottom: insets.bottom + 32, gap: 32 }} keyboardShouldPersistTaps="handled">
        <View style={{ gap: 12 }}>
          <Text variant="overline" color="mutedFg">Mot de passe</Text>
          <Text variant="display">Réinitialiser.</Text>
          <Text variant="serifItalic" color="muted">{t('auth.forgot.subtitle')}</Text>
        </View>
        <View style={{ gap: 16 }}>
          <Input
            label={t('auth.signIn.emailLabel')}
            placeholder="vous@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Button title={t('auth.forgot.cta')} onPress={submit} loading={loading} fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}
