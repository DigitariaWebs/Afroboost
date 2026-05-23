import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Input, Button, FloatingBack } from '@/components/ui';
import { Logo } from '@/components/Logo';
import { useAuthStore } from '@/stores/authStore';
import { useTheme } from '@/lib/theme';

export default function SignUp() {
  const { t } = useTranslation();
  const router = useRouter();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const signUp = useAuthStore((s) => s.signUp);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [errors, setErrors] = useState<{ email?: string; pw?: string; pw2?: string }>({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const e: typeof errors = {};
    if (!email.includes('@')) e.email = t('errors.invalidEmail');
    if (pw.length < 8) e.pw = t('errors.passwordTooShort');
    if (pw !== pw2) e.pw2 = t('errors.passwordsDontMatch');
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      await signUp(email, pw);
      router.replace('/(onboarding)/business-profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <FloatingBack />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: insets.top + 56, paddingBottom: insets.bottom + 32, gap: 32 }} keyboardShouldPersistTaps="handled">
        <View style={{ gap: 16 }}>
          <Logo width={300} />
          <Text variant="overline" color="mutedFg">Bienvenue</Text>
          <Text variant="displayLg" style={{ fontSize: 48, lineHeight: 52 }}>Créez votre{'\n'}<Text variant="displayLg" style={{ color: c.accent, fontSize: 48, lineHeight: 52 }}>compte.</Text></Text>
          <Text variant="serifItalic" color="muted" style={{ fontSize: 18 }}>15 jours d'essai. Annulable à tout moment.</Text>
        </View>

        <View style={{ gap: 22 }}>
          <Input
            label={t('auth.signUp.emailLabel')}
            placeholder="vous@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          <Input
            label={t('auth.signUp.passwordLabel')}
            placeholder="••••••••"
            password
            value={pw}
            onChangeText={setPw}
            error={errors.pw}
          />
          <Input
            label={t('auth.signUp.confirmLabel')}
            placeholder="••••••••"
            password
            value={pw2}
            onChangeText={setPw2}
            error={errors.pw2}
          />
        </View>

        <View style={{ gap: 12 }}>
          <Button title={t('auth.signUp.cta')} onPress={submit} loading={loading} fullWidth />
          <Pressable onPress={() => router.replace('/(auth)/sign-in')} style={{ alignItems: 'center', paddingVertical: 8 }}>
            <Text color="muted">{t('auth.signUp.haveAccount')}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
