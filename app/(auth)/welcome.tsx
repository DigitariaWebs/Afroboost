import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, Pressable, NativeSyntheticEvent, NativeScrollEvent, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import LottieView from 'lottie-react-native';
import { Text, Button } from '@/components/ui';
import { AIOrb } from '@/components/brand/AIOrb';
import { KenteTexture } from '@/components/brand/KenteTexture';
import { useTheme } from '@/lib/theme';

const { width } = Dimensions.get('window');

export default function Welcome() {
  const { t } = useTranslation();
  const { c } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(0);
  const ref = useRef<FlatList>(null);

  const slides = [
    {
      title: t('auth.welcome.slide1Title'),
      sub: t('auth.welcome.slide1Sub'),
      gradient: [c.primary + 'DD', c.background] as [string, string],
      tone: 'emerald' as const,
      media: { kind: 'gif' as const, source: require('../../assets/1.gif') },
    },
    {
      title: t('auth.welcome.slide2Title'),
      sub: t('auth.welcome.slide2Sub'),
      gradient: [c.accent + 'BB', c.background] as [string, string],
      tone: 'gold' as const,
      media: { kind: 'gif' as const, source: require('../../assets/2.gif') },
    },
    {
      title: t('auth.welcome.slide3Title'),
      sub: t('auth.welcome.slide3Sub'),
      gradient: [c.deep + 'DD', c.background] as [string, string],
      tone: 'mixed' as const,
      media: { kind: 'lottie' as const, source: require('../../assets/3.json') },
    },
  ];

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const p = Math.round(e.nativeEvent.contentOffset.x / width);
    if (p !== page) setPage(p);
  };

  const next = () => {
    if (page < slides.length - 1) {
      ref.current?.scrollToOffset({ offset: (page + 1) * width, animated: true });
    } else {
      router.push('/(auth)/sign-up');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents="none">
        <LinearGradient colors={slides[page]!.gradient} style={StyleSheet.absoluteFill} />
        <KenteTexture tone={slides[page]!.tone} opacity={0.08} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: insets.top + 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <AIOrb size={28} />
          <Text variant="h3">AfroLink</Text>
        </View>
        <Pressable onPress={() => router.push('/(auth)/sign-up')} hitSlop={10}>
          <Text color="muted">{t('common.skip')}</Text>
        </Pressable>
      </View>

      <FlatList
        ref={ref}
        data={slides}
        keyExtractor={(_, i) => `slide-${i}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <View style={{ width, flex: 1, paddingHorizontal: 32, paddingBottom: 40 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {item.media.kind === 'lottie' ? (
                <LottieView
                  source={item.media.source}
                  autoPlay
                  loop
                  style={{ width: width * 0.75, height: width * 0.75 }}
                />
              ) : (
                <Image
                  source={item.media.source}
                  style={{ width: width * 0.75, height: width * 0.75 }}
                  contentFit="contain"
                />
              )}
            </View>
            <Text variant="overline" color="mutedFg" style={{ marginBottom: 12 }}>AfroLink — pour les entrepreneurs.es</Text>
            <Text variant="displayLg" style={{ fontSize: 52, lineHeight: 56 }}>{item.title}</Text>
            <Text variant="serifItalic" color="muted" style={{ marginTop: 16, fontSize: 18, lineHeight: 26 }}>{item.sub}</Text>
          </View>
        )}
      />

      <View style={{ paddingHorizontal: 32, paddingBottom: insets.bottom + 24, gap: 14 }}>
        <View style={{ flexDirection: 'row', gap: 4, marginBottom: 8 }}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 2,
                borderRadius: 1,
                backgroundColor: i === page ? c.accent : c.borderStrong,
              }}
            />
          ))}
        </View>
        <Button title={page === slides.length - 1 ? t('auth.welcome.start') : t('common.next')} onPress={next} fullWidth />
        <Pressable onPress={() => router.push('/(auth)/sign-in')} style={{ alignItems: 'center', paddingVertical: 6 }}>
          <Text color="muted">{t('auth.welcome.haveAccount')}</Text>
        </Pressable>
      </View>
    </View>
  );
}
