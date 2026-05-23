import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Text, Button, FloatingBack, Pill } from '@/components/ui';
import { PlanCard } from '@/components/domain/PlanCard';
import type { Plan } from '@/types';
import { useTheme, radius } from '@/lib/theme';

export default function PlanSelect() {
  const { t } = useTranslation();
  const router = useRouter();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const [plan, setPlan] = useState<Plan>('performance');
  const [annual, setAnnual] = useState(false);

  const slide = useSharedValue(0);
  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(slide.value, { duration: 220 }) }],
  }));

  const monthly = { decouverte: 49, performance: 97, premium: 197 };
  const price = (n: number) => (annual ? `${Math.round(n * 0.85)} $` : `${n} $`);
  const period = annual ? t('auth.plan.perYear') : t('auth.plan.perMonth');
  const planLabel: Record<Plan, string> = {
    decouverte: t('auth.plan.decouverte'),
    performance: t('auth.plan.performance'),
    premium: t('auth.plan.premium'),
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <FloatingBack />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: insets.top + 56, paddingBottom: insets.bottom + 32, gap: 24 }}>
        <View style={{ gap: 8 }}>
          <Text variant="overline" color="mutedFg">Forfait</Text>
          <Text variant="display">{t('auth.plan.title')}</Text>
        </View>

        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            backgroundColor: c.surfaceElevated,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: c.border,
            padding: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 4,
                left: 4,
                bottom: 4,
                width: 130,
                backgroundColor: c.accent,
                borderRadius: 999,
              },
              sliderStyle,
            ]}
          />
          {(['monthly', 'annual'] as const).map((k, i) => {
            const active = (k === 'annual') === annual;
            return (
              <Pressable
                key={k}
                onPress={() => {
                  setAnnual(k === 'annual');
                  slide.value = i * 130;
                }}
                style={{
                  width: 130,
                  paddingVertical: 8,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Text style={{ color: active ? c.accentFg : c.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 13 }}>
                  {t(`auth.plan.${k}`)}
                </Text>
                {k === 'annual' ? (
                  <Pill tone={active ? 'default' : 'success'} dot={!active}>
                    <Text variant="caption" style={{ color: active ? c.accentFg : c.success }}>
                      {t('auth.plan.annualBadge')}
                    </Text>
                  </Pill>
                ) : null}
              </Pressable>
            );
          })}
        </View>

        <View style={{ gap: 14 }}>
          <PlanCard
            name={planLabel.decouverte}
            price={price(monthly.decouverte)}
            pricePeriod={period}
            features={['12 publications IA / mois', 'Agent IA téléphonique 200 appels', 'Inbox unifiée', 'CRM jusqu’à 500 clients']}
            selected={plan === 'decouverte'}
            onPress={() => setPlan('decouverte')}
          />
          <PlanCard
            name={planLabel.performance}
            price={price(monthly.performance)}
            pricePeriod={period}
            popular
            features={['Publications illimitées', 'Agent IA + transferts intelligents', 'Réponses Avis Google automatiques', 'Rapport hebdomadaire IA', 'CRM illimité']}
            selected={plan === 'performance'}
            onPress={() => setPlan('performance')}
          />
          <PlanCard
            name={planLabel.premium}
            price={price(monthly.premium)}
            pricePeriod={period}
            comingSoon
            features={['Tout Performance', 'Multi-établissements', 'Analyses avancées', 'Support prioritaire 24/7']}
          />
        </View>

        <View style={{ gap: 8, marginTop: 4 }}>
          <Button
            title={`Continuer avec ${planLabel[plan]}`}
            variant="gold"
            onPress={() => router.push({ pathname: '/(auth)/payment-mock', params: { plan, annual: annual ? '1' : '0' } })}
            fullWidth
          />
          <Text variant="caption" color="muted" center>{t('auth.plan.trial')}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
