import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Upload, FileSpreadsheet, Check } from 'lucide-react-native';
import { Text, Card, Button, ProgressBar, BlurHeader } from '@/components/ui';
import { GlowCard } from '@/components/brand/GlowCard';
import { useTheme } from '@/lib/theme';

export default function CsvImport() {
  const { t } = useTranslation();
  const router = useRouter();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState<'idle' | 'importing' | 'done'>('idle');
  const [progress, setProgress] = useState(0);

  const start = () => {
    setPhase('importing');
    setProgress(0);
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(1, p + 0.06 + Math.random() * 0.05);
      setProgress(p);
      if (p >= 1) {
        clearInterval(id);
        setTimeout(() => setPhase('done'), 300);
      }
    }, 120);
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <BlurHeader back title={t('crm.importMock.title')} />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingBottom: insets.bottom + 110 }}>
        <GlowCard tone="gold">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <View style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: c.surfaceHigh, alignItems: 'center', justifyContent: 'center' }}>
              <FileSpreadsheet size={28} color={c.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="bodyEmphasis">customers-template.csv</Text>
              <Text variant="caption" color="muted">name, phone, email, source, tags</Text>
            </View>
          </View>
        </GlowCard>

        {phase === 'idle' && (
          <Button title={t('crm.importMock.choose')} leftIcon={<Upload size={16} color={c.primaryFg} />} onPress={start} fullWidth />
        )}
        {phase === 'importing' && (
          <Card>
            <Text variant="bodyEmphasis">{t('crm.importMock.importing')}</Text>
            <View style={{ marginTop: 12, gap: 6 }}>
              <ProgressBar value={progress} />
              <Text variant="mono" color="muted" style={{ fontSize: 12 }}>{Math.round(progress * 100)} %</Text>
            </View>
          </Card>
        )}
        {phase === 'done' && (
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 36, height: 36, borderRadius: 999, backgroundColor: c.success + '22', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={18} color={c.success} strokeWidth={3} />
              </View>
              <Text variant="h3" style={{ flex: 1 }}>{t('crm.importMock.done', { n: 47 })}</Text>
            </View>
            <View style={{ marginTop: 14 }}>
              <Button title={t('crm.importMock.viewContacts')} onPress={() => router.replace('/(tabs)/crm')} fullWidth />
            </View>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
