import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Text, Button, FloatingBack } from '@/components/ui';
import { KenteTexture } from '@/components/brand/KenteTexture';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/lib/theme';

export default function AuthChoice() {
  const { t } = useTranslation();
  const router = useRouter();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <LinearGradient
        colors={[c.primary + '33', c.background, c.background] as [string, string, string]}
        style={StyleSheet.absoluteFill}
      />
      <KenteTexture tone="mixed" opacity={0.08} />
      <FloatingBack />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 32,
          paddingTop: insets.top + 64,
          paddingBottom: insets.bottom + 24,
          justifyContent: 'space-between',
        }}
      >
        <Animated.View entering={FadeInDown.duration(500)} style={{ gap: 16 }}>
          <Logo width={180} />
          <Text variant="overline" color="mutedFg">{t('auth.choose.overline')}</Text>
          <Text variant="displayLg" style={{ fontSize: 48, lineHeight: 52 }}>
            {t('auth.choose.titleStart')}{'\n'}
            <Text variant="displayLg" style={{ color: c.accent, fontSize: 48, lineHeight: 52 }}>
              {t('auth.choose.titleAccent')}
            </Text>
          </Text>
          <Text variant="serifItalic" color="muted" style={{ fontSize: 18, lineHeight: 26 }}>
            {t('auth.choose.subtitle')}
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(500).delay(150)} style={{ gap: 12 }}>
          <Animated.View entering={FadeIn.duration(400).delay(300)}>
            <Button
              title={t('auth.choose.signUpCta')}
              onPress={() => router.push('/(auth)/sign-up')}
              fullWidth
              pill={false}
            />
          </Animated.View>
          <Animated.View entering={FadeIn.duration(400).delay(400)}>
            <Button
              title={t('auth.choose.signInCta')}
              variant="outline"
              onPress={() => router.push('/(auth)/sign-in')}
              fullWidth
              pill={false}
            />
          </Animated.View>
          <Text variant="caption" color="mutedFg" center style={{ marginTop: 8 }}>
            {t('auth.choose.terms')}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}
