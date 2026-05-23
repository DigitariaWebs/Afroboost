import React, { useRef, useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react-native';
import { ScreenContainer, Header } from '@/components/layout';
import { Text, Input } from '@/components/ui';
import { AITypingIndicator } from '@/components/domain/AITypingIndicator';
import { useTheme, radius } from '@/lib/theme';
import { mockDelay } from '@/lib/mock-api';
import { genId } from '@/lib/utils';

const FAQ: { match: RegExp; answer: string }[] = [
  { match: /instagram|facebook|connect/i, answer: 'Allez dans Paramètres → Comptes connectés → appuyez sur « Connecter » à côté du réseau de votre choix. La connexion prend quelques secondes.' },
  { match: /annuler|abonnement|cancel/i, answer: 'Paramètres → Abonnement → « Annuler mon abonnement ». Votre accès reste actif jusqu’à la fin de la période payée.' },
  { match: /agent|appel|téléphon/i, answer: 'L’agent IA répond aux appels 24 h / 24. Configurez son message d’accueil et ses mots-clés d’escalade dans Paramètres → Configuration de l’agent IA.' },
  { match: /langue|language/i, answer: 'Paramètres → Langue. Le changement est immédiat dans toute l’application.' },
];

const QUICK_PROMPTS = [
  'Comment connecter Instagram ?',
  'Comment annuler mon abonnement ?',
  'Comment fonctionne l’agent IA ?',
];

export default function Help() {
  const { t } = useTranslation();
  const { c } = useTheme();
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<{ id: string; from: 'user' | 'ai'; text: string }[]>([
    { id: 'init', from: 'ai', text: 'Bonjour ! Posez-moi une question sur AfroBoost.' },
  ]);
  const [typing, setTyping] = useState(false);
  const ref = useRef<ScrollView>(null);

  const send = async (override?: string) => {
    const text = (override ?? draft).trim();
    if (!text) return;
    setDraft('');
    setMessages((m) => [...m, { id: genId('m'), from: 'user', text }]);
    setTyping(true);
    setTimeout(() => ref.current?.scrollToEnd({ animated: true }), 50);
    await mockDelay(1200);
    const hit = FAQ.find((f) => f.match.test(text));
    setTyping(false);
    setMessages((m) => [
      ...m,
      {
        id: genId('m'),
        from: 'ai',
        text: hit?.answer ?? 'Bonne question ! Je transmets votre demande à notre équipe support — vous recevrez une réponse par email dans la journée.',
      },
    ]);
    setTimeout(() => ref.current?.scrollToEnd({ animated: true }), 50);
  };

  return (
    <ScreenContainer padded={false} bottomInset>
      <Header back title={t('settings.help')} />
      <ScrollView ref={ref} contentContainerStyle={{ padding: 16, gap: 8, paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
          {QUICK_PROMPTS.map((p) => (
            <Pressable
              key={p}
              onPress={() => send(p)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
                backgroundColor: c.surface,
                borderWidth: 1,
                borderColor: c.border,
              }}
            >
              <Text variant="caption">{p}</Text>
            </Pressable>
          ))}
        </View>
        {messages.map((m) => (
          <View
            key={m.id}
            style={{
              alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              backgroundColor: m.from === 'user' ? c.primary : c.surface,
              borderColor: c.border,
              borderWidth: m.from === 'user' ? 0 : 1,
              padding: 12,
              borderRadius: radius.md,
            }}
          >
            <Text style={{ color: m.from === 'user' ? c.primaryFg : c.foreground }}>{m.text}</Text>
          </View>
        ))}
        {typing ? (
          <View style={{ alignSelf: 'flex-start', backgroundColor: c.surface, borderColor: c.border, borderWidth: 1, padding: 8, borderRadius: radius.md }}>
            <AITypingIndicator />
          </View>
        ) : null}
      </ScrollView>
      <View style={{ flexDirection: 'row', gap: 8, padding: 12, borderTopWidth: 1, borderColor: c.border, backgroundColor: c.surface }}>
        <View style={{ flex: 1 }}>
          <Input value={draft} onChangeText={setDraft} placeholder="Posez votre question…" multiline />
        </View>
        <Pressable
          onPress={() => send()}
          style={{ width: 44, height: 44, borderRadius: 999, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' }}
        >
          <Send size={18} color={c.primaryFg} />
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
