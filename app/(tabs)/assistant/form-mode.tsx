import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sparkles, Lightbulb } from 'lucide-react-native';
import { Text, Card, Button, Input, RadioGroup, Checkbox, ProgressBar, BlurHeader } from '@/components/ui';
import { AIOrb } from '@/components/brand/AIOrb';
import { mockDelay } from '@/lib/mock-api';
import { useTheme } from '@/lib/theme';

const RECOS = [
  { title: 'Renforcer le créneau du vendredi soir', body: 'Programmez 2 publications dédiées + 1 promo groupe pour booster les réservations.' },
  { title: "Activer l'agent IA pendant la pause déjeuner", body: 'Vous manquez 3 appels en moyenne entre 14 h et 15 h.' },
  { title: 'Lancer un programme fidélité simple', body: 'Carte 10 cafés = 1 offert. Génère 12 % de visites récurrentes en moyenne.' },
  { title: 'Tester un format vidéo court', body: 'Engagement Instagram +35 % avec des reels de 10–15 s.' },
  { title: 'Relancer les anciens clients VIP', body: 'Proposez un menu dégustation aux 30 clients les plus fidèles.' },
];

export default function FormMode({ embedded }: { embedded?: boolean }) {
  const { t } = useTranslation();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [a1, setA1] = useState<string | undefined>();
  const [a2, setA2] = useState('40');
  const [a3, setA3] = useState('');
  const [a4, setA4] = useState<Record<string, boolean>>({});
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);

  const total = 4;

  const next = async () => {
    if (step < total - 1) {
      setStep(step + 1);
      return;
    }
    setAnalyzing(true);
    await mockDelay(2000);
    setAnalyzing(false);
    setDone(true);
  };

  const Body = (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingBottom: insets.bottom + 110 }}>
      {!done ? (
        <>
          <View>
            <Text variant="overline" color="mutedFg">{t('assistant.form.progress', { n: step + 1, total })}</Text>
            <ProgressBar value={(step + 1) / total} />
          </View>

          {step === 0 && (
            <View style={{ gap: 14 }}>
              <Text variant="display" style={{ fontSize: 32 }}>{t('assistant.form.q1')}</Text>
              <RadioGroup
                value={a1}
                onChange={setA1}
                options={[
                  { value: 'a', label: t('assistant.form.q1a') },
                  { value: 'b', label: t('assistant.form.q1b') },
                  { value: 'c', label: t('assistant.form.q1c') },
                  { value: 'd', label: t('assistant.form.q1d') },
                ]}
              />
            </View>
          )}
          {step === 1 && (
            <View style={{ gap: 14 }}>
              <Text variant="display" style={{ fontSize: 32 }}>{t('assistant.form.q2')}</Text>
              <Input value={a2} onChangeText={setA2} keyboardType="number-pad" />
            </View>
          )}
          {step === 2 && (
            <View style={{ gap: 14 }}>
              <Text variant="display" style={{ fontSize: 32 }}>{t('assistant.form.q3')}</Text>
              <Input value={a3} onChangeText={setA3} keyboardType="decimal-pad" placeholder="$" />
            </View>
          )}
          {step === 3 && (
            <View style={{ gap: 14 }}>
              <Text variant="display" style={{ fontSize: 32 }}>{t('assistant.form.q4')}</Text>
              <View style={{ gap: 10 }}>
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
                  <Checkbox key={d} checked={!!a4[d]} onChange={(v) => setA4((s) => ({ ...s, [d]: v }))} label={d} />
                ))}
              </View>
            </View>
          )}

          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <Button title={t('common.previous')} variant="outline" onPress={() => setStep(Math.max(0, step - 1))} disabled={step === 0} />
            <View style={{ flex: 1 }}>
              <Button
                title={step < total - 1 ? t('common.next') : t('assistant.form.analyze')}
                fullWidth
                loading={analyzing}
                onPress={next}
                rightIcon={step === total - 1 ? <Sparkles size={16} color={c.primaryFg} /> : undefined}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={{ alignItems: 'center', gap: 12, marginTop: 12 }}>
            <AIOrb size={48} />
            <Text variant="overline" color="mutedFg">{t('assistant.form.results')}</Text>
            <Text variant="display" center style={{ fontSize: 32 }}>5 actions{'\n'}pour vous.</Text>
          </View>
          {RECOS.map((r, i) => (
            <Card key={i}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <View style={{ width: 36, height: 36, borderRadius: 999, backgroundColor: c.accent + '22', alignItems: 'center', justifyContent: 'center' }}>
                  <Lightbulb size={18} color={c.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text variant="bodyEmphasis">{r.title}</Text>
                  <Text variant="serifItalic" color="muted" style={{ marginTop: 6 }}>{r.body}</Text>
                </View>
              </View>
            </Card>
          ))}
          <Button title="Recommencer" variant="outline" onPress={() => { setDone(false); setStep(0); }} />
        </>
      )}
    </ScrollView>
  );

  if (embedded) return Body;
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <BlurHeader back title={t('assistant.tabs.form')} />
      {Body}
    </View>
  );
}
