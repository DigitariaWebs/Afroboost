import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mic } from 'lucide-react-native';
import { Text, Button, Input, Sheet, Card, FloatingBack, Pill } from '@/components/ui';
import { Logo } from '@/components/Logo';
import { Waveform } from '@/components/animations/Waveform';
import { AIOrb } from '@/components/brand/AIOrb';
import { AITypingIndicator } from '@/components/domain/AITypingIndicator';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { useTheme, radius } from '@/lib/theme';

export default function TrainAgent() {
  const { t } = useTranslation();
  const router = useRouter();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const draft = useOnboardingStore((s) => s.businessDraft);
  const businessName = draft.name || 'votre commerce';
  const [greeting, setGreeting] = useState(t('onboarding.trainAgent.greetingDefault', { name: businessName }));
  const [escalation, setEscalation] = useState(t('onboarding.trainAgent.escalationDefault'));
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <FloatingBack />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: insets.top + 56, paddingBottom: insets.bottom + 32, gap: 22 }} keyboardShouldPersistTaps="handled">
        <Logo width={300} />
        <View style={{ gap: 8 }}>
          <Text variant="overline" color="mutedFg">Agent IA téléphonique</Text>
          <Text variant="display" style={{ fontSize: 34 }}>Donnez-lui{'\n'}<Text variant="display" style={{ color: c.accent, fontSize: 34 }}>une voix.</Text></Text>
        </View>

        <Input
          label={t('onboarding.trainAgent.greetingLabel')}
          value={greeting}
          onChangeText={setGreeting}
          multiline
        />
        <Input
          label={t('onboarding.trainAgent.escalationLabel')}
          value={escalation}
          onChangeText={setEscalation}
        />
        <Card>
          <Text variant="overline" color="mutedFg">{t('onboarding.trainAgent.languagesLabel')}</Text>
          <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
            {(draft.languages ?? ['fr']).map((l) => <Pill key={l} tone="default" filled>{l.toUpperCase()}</Pill>)}
          </View>
        </Card>
        <Pressable
          onPress={() => setOpen(true)}
          style={{
            flexDirection: 'row', alignItems: 'center', gap: 12,
            padding: 18,
            borderRadius: radius.lg,
            backgroundColor: c.surfaceHigh,
            borderWidth: 1,
            borderColor: c.accent + '88',
          }}
        >
          <AIOrb size={36} active />
          <View style={{ flex: 1 }}>
            <Text variant="bodyEmphasis">{t('onboarding.trainAgent.test')}</Text>
            <Text variant="caption" color="muted">Simule un appel entrant</Text>
          </View>
          <Mic size={20} color={c.accent} />
        </Pressable>

        <View style={{ flex: 1 }} />
        <Button title={t('common.continue')} fullWidth pill={false} onPress={() => router.push('/(auth)/plan-select')} />
      </ScrollView>
      <AgentTestSheet open={open} onClose={() => setOpen(false)} businessName={businessName} />
    </View>
  );
}

function AgentTestSheet({ open, onClose, businessName }: { open: boolean; onClose: () => void; businessName: string }) {
  const { t } = useTranslation();
  const { c } = useTheme();
  const [lines, setLines] = useState<{ from: 'agent' | 'user'; text: string }[]>([]);
  const [typing, setTyping] = useState(false);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!open) {
      setLines([]);
      setTyping(false);
      ranRef.current = false;
      return;
    }
    if (ranRef.current) return;
    ranRef.current = true;
    let mounted = true;
    const run = async () => {
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
      setTyping(true);
      await sleep(700);
      if (!mounted) return;
      setLines((l) => [...l, { from: 'agent', text: t('onboarding.trainAgent.transcript1', { name: businessName }) }]);
      await sleep(800);
      if (!mounted) return;
      setLines((l) => [...l, { from: 'agent', text: t('onboarding.trainAgent.transcript2') }]);
      setTyping(false);
      await sleep(900);
      if (!mounted) return;
      setLines((l) => [...l, { from: 'user', text: t('onboarding.trainAgent.userBook') }]);
      setTyping(true);
      await sleep(900);
      if (!mounted) return;
      setLines((l) => [...l, { from: 'agent', text: t('onboarding.trainAgent.transcript3') }]);
      setTyping(false);
    };
    run();
    return () => {
      mounted = false;
    };
  }, [open, businessName, t]);

  return (
    <Sheet open={open} onClose={onClose}>
      <View style={{ alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <AIOrb size={68} active />
        <Text variant="h2">Agent en ligne</Text>
        <Waveform />
      </View>
      <ScrollView style={{ maxHeight: 280 }} contentContainerStyle={{ gap: 8 }}>
        {lines.map((l, i) => (
          <View
            key={i}
            style={{
              alignSelf: l.from === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              backgroundColor: l.from === 'user' ? c.accent : c.surfaceElevated,
              borderColor: c.border,
              borderWidth: l.from === 'user' ? 0 : 1,
              padding: 12,
              borderRadius: radius.md,
            }}
          >
            <Text variant={l.from === 'agent' ? 'serifItalic' : 'body'} style={{ color: l.from === 'user' ? c.accentFg : c.foreground }}>
              {l.text}
            </Text>
          </View>
        ))}
        {typing ? <AITypingIndicator /> : null}
      </ScrollView>
      <Button title="Fermer" variant="outline" onPress={onClose} fullWidth pill={false} style={{ marginTop: 16 }} />
    </Sheet>
  );
}
