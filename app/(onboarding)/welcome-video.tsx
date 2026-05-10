import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Play } from 'lucide-react-native';
import { Text, Button } from '@/components/ui';
import { AIOrb } from '@/components/brand/AIOrb';
import { KenteTexture } from '@/components/brand/KenteTexture';
import { Logo } from '@/components/Logo';
import { useTheme, radius } from '@/lib/theme';

export default function WelcomeVideo() {
  const { t } = useTranslation();
  const router = useRouter();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <View style={{ alignItems: 'center', paddingTop: insets.top + 8, paddingHorizontal: 20 }}>
        <Logo width={120} />
      </View>
      <View style={{ flex: 1, padding: 24, justifyContent: 'space-between' }}>
        <View style={{ gap: 12, marginTop: 12 }}>
          <Text variant="overline" color="mutedFg">Bienvenue</Text>
          <Text variant="display">Découvrez{'\n'}<Text variant="display" style={{ color: c.accent }}>AfroLink.</Text></Text>
          <Text variant="serifItalic" color="muted" style={{ fontSize: 18 }}>{t('onboarding.welcomeVideo.subtitle')}</Text>
        </View>

        <Pressable
          style={{
            aspectRatio: 9 / 16,
            maxHeight: 460,
            alignSelf: 'center',
            width: '100%',
            borderRadius: radius.xl,
            backgroundColor: c.surfaceHigh,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: c.borderStrong,
          }}
        >
          <LinearGradient
            colors={[c.deep + 'AA', c.primary + '66', c.background] as [string, string, string]}
            style={StyleSheet.absoluteFill}
          />
          <KenteTexture tone="mixed" opacity={0.1} />
          <View style={{ alignItems: 'center', gap: 16 }}>
            <AIOrb size={96} active />
            <View
              style={{
                position: 'absolute',
                width: 96, height: 96, borderRadius: 999,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Play size={36} color="#fff" fill="#fff" />
            </View>
          </View>
          <View style={{ position: 'absolute', bottom: 16, right: 16, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: '#0009' }}>
            <Text variant="mono" style={{ color: '#fff', fontSize: 11 }}>{t('onboarding.welcomeVideo.duration')}</Text>
          </View>
        </Pressable>

        <Button title={t('common.continue')} onPress={() => router.push('/(onboarding)/business-profile')} fullWidth pill={false} />
      </View>
    </View>
  );
}
