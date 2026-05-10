import React, { useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar, Clock } from 'lucide-react-native';
import { Text, Button, Card, BlurHeader } from '@/components/ui';
import { useTheme, radius } from '@/lib/theme';
import { toast } from '@/stores/toastStore';

export default function Schedule() {
  const { t } = useTranslation();
  const router = useRouter();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const today = new Date();
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState<string>('19:00');

  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
  const hours = ['11:00', '12:30', '15:00', '17:30', '19:00', '20:30'];

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <BlurHeader back title={t('content.schedule.title')} />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 24, paddingBottom: insets.bottom + 32 }}>
        <View>
          <Text variant="overline" color="mutedFg" style={{ marginBottom: 10 }}>{t('content.schedule.date')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {days.map((d, i) => {
              const active = i === day;
              return (
                <Pressable
                  key={i}
                  onPress={() => setDay(i)}
                  style={{
                    width: 64, paddingVertical: 12, alignItems: 'center',
                    borderRadius: radius.md,
                    backgroundColor: active ? c.surfaceHigh : c.surfaceElevated,
                    borderWidth: 1.5, borderColor: active ? c.accent : c.border,
                  }}
                >
                  <Text variant="overline" color={active ? 'foreground' : 'mutedFg'}>
                    {d.toLocaleDateString('fr-CA', { weekday: 'short' })}
                  </Text>
                  <Text variant="metric" style={{ fontSize: 24, lineHeight: 28, marginTop: 4, color: active ? c.accent : c.foreground }}>
                    {d.getDate()}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
        <View>
          <Text variant="overline" color="mutedFg" style={{ marginBottom: 10 }}>{t('content.schedule.time')}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {hours.map((h) => {
              const active = hour === h;
              return (
                <Pressable
                  key={h}
                  onPress={() => setHour(h)}
                  style={{
                    paddingHorizontal: 14, paddingVertical: 10,
                    borderRadius: 999,
                    backgroundColor: active ? c.accent : 'transparent',
                    borderWidth: 1, borderColor: active ? c.accent : c.border,
                  }}
                >
                  <Text variant="mono" style={{ color: active ? c.accentFg : c.foreground }}>{h}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Calendar size={16} color={c.muted} />
            <Text variant="serifItalic" style={{ fontSize: 16 }}>{days[day]!.toLocaleDateString('fr-CA', { dateStyle: 'full' })}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
            <Clock size={16} color={c.muted} />
            <Text variant="mono">{hour}</Text>
          </View>
        </Card>
        <Button
          title={t('content.schedule.confirm')}
          fullWidth
          onPress={() => {
            toast({ title: t('content.generate.scheduled'), variant: 'success' });
            router.replace('/(tabs)/content');
          }}
        />
      </ScrollView>
    </View>
  );
}
