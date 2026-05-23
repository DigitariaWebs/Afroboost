import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Lock } from 'lucide-react-native';
import { Text, Input, Button, FloatingBack } from '@/components/ui';
import { GlowCard } from '@/components/brand/GlowCard';
import { useTheme } from '@/lib/theme';
import { mockMutation } from '@/lib/mock-api';
import { formatDate } from '@/lib/utils';

export default function PaymentMock() {
  const { t } = useTranslation();
  const router = useRouter();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const { plan } = useLocalSearchParams<{ plan: string; annual: string }>();
  const [card, setCard] = useState('4242 4242 4242 4242');
  const [exp, setExp] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [name, setName] = useState('Patrick Mukendi');
  const [loading, setLoading] = useState(false);

  const trialEnds = new Date(Date.now() + 15 * 86400000);

  const submit = async () => {
    setLoading(true);
    try {
      await mockMutation(null, { ms: 1400 });
      router.replace('/(onboarding)/done');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <FloatingBack />
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: insets.top + 56, paddingBottom: insets.bottom + 32, gap: 22 }} keyboardShouldPersistTaps="handled">
        <View style={{ gap: 6 }}>
          <Text variant="overline" color="mutedFg">Paiement</Text>
          <Text variant="display">{t('auth.payment.title')}</Text>
        </View>
        <GlowCard tone="emerald">
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <Lock size={16} color={c.accent} />
            <Text variant="overline" color="muted">Paiement sécurisé · mock</Text>
          </View>
          <Text variant="serifItalic" style={{ fontSize: 18, lineHeight: 26 }}>
            {t('auth.payment.disclaimer', { date: formatDate(trialEnds, 'PP', 'fr') })}
          </Text>
        </GlowCard>

        <View style={{ gap: 18 }}>
          <Input
            label={t('auth.payment.card')}
            placeholder="1234 5678 9012 3456"
            keyboardType="number-pad"
            value={card}
            onChangeText={setCard}
          />
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={{ flex: 1 }}>
              <Input label={t('auth.payment.expiry')} placeholder="MM/AA" value={exp} onChangeText={setExp} />
            </View>
            <View style={{ flex: 1 }}>
              <Input label={t('auth.payment.cvv')} placeholder="123" keyboardType="number-pad" value={cvv} onChangeText={setCvv} />
            </View>
          </View>
          <Input label={t('auth.payment.name')} placeholder="Prénom Nom" value={name} onChangeText={setName} />
        </View>

        <View style={{ gap: 4 }}>
          <Text variant="overline" color="mutedFg">Forfait</Text>
          <Text variant="h2" style={{ textTransform: 'capitalize' }}>{plan}</Text>
          <Text variant="caption" color="muted">{t('auth.plan.trial')}</Text>
        </View>

        <Button title={t('auth.payment.cta')} onPress={submit} loading={loading} fullWidth />
      </ScrollView>
    </View>
  );
}
