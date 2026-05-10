import React, { useRef, useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Send } from 'lucide-react-native';
import { Text, Card, Input, BlurHeader } from '@/components/ui';
import { AITypingIndicator } from '@/components/domain/AITypingIndicator';
import { AIOrb } from '@/components/brand/AIOrb';
import { MiniBarChart } from '@/components/domain/MiniBarChart';
import { useTheme, radius } from '@/lib/theme';
import { mockDelay } from '@/lib/mock-api';
import { genId } from '@/lib/utils';

type Msg = { id: string; from: 'user' | 'ai'; text: string; chart?: number[] };

const QUICK_RESPONSES: Record<string, { text: string; chart?: number[] }> = {
  default: {
    text: "Voici ce que je vois cette semaine : votre activité est en hausse de 18 %, vendredi soir reste votre meilleur créneau, et vos avis Google viennent de passer à 4.7 ⭐. Continuez sur cette lancée.",
    chart: [12, 18, 14, 22, 31, 28, 19],
  },
  best: {
    text: "Votre publication la plus performante : « Mafé d'agneau » publiée mardi — 142 partages et 38 commentaires. Le ton chaleureux + la photo de famille semblent avoir bien fonctionné.",
  },
  day: {
    text: "Vendredi reste votre meilleur jour avec 31 visites moyennes. Suivi du samedi (28). Lundi est plus calme — un bon moment pour relancer vos clients VIP.",
    chart: [12, 18, 14, 22, 31, 28, 19],
  },
  promo: {
    text: "Suggestion : « Brunch créole 2 pour 1 dimanche midi ». Vos clients dépensent en moyenne 22 % de plus le dimanche, et l'offre groupe encourage les visites en famille.",
  },
};

export default function Chat({ embedded }: { embedded?: boolean }) {
  const { t } = useTranslation();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? draft).trim();
    if (!text) return;
    setDraft('');
    setMessages((m) => [...m, { id: genId('m'), from: 'user', text }]);
    setTyping(true);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    await mockDelay(1500);
    const lower = text.toLowerCase();
    const key = lower.includes('mieux fonctionn') || lower.includes('best') ? 'best'
      : lower.includes('jour') || lower.includes('day') ? 'day'
      : lower.includes('promo') ? 'promo' : 'default';
    const reply = QUICK_RESPONSES[key]!;
    setTyping(false);
    setMessages((m) => [...m, { id: genId('m'), from: 'ai', text: reply.text, chart: reply.chart }]);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const Body = (
    <View style={{ flex: 1 }}>
      <ScrollView ref={scrollRef} contentContainerStyle={{ padding: 20, gap: 14, paddingBottom: 24 }}>
        {messages.length === 0 ? (
          <View style={{ alignItems: 'center', gap: 14, marginTop: 40 }}>
            <AIOrb size={120} active />
            <Text variant="display" center style={{ fontSize: 32, lineHeight: 36 }}>Bonjour, Patrick.</Text>
            <Text variant="serifItalic" color="muted" center style={{ fontSize: 18 }}>Que voulez-vous savoir aujourd'hui ?</Text>
          </View>
        ) : null}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {[
            t('assistant.chat.quick1'),
            t('assistant.chat.quick2'),
            t('assistant.chat.quick3'),
            t('assistant.chat.quick4'),
          ].map((q) => (
            <Pressable
              key={q}
              onPress={() => send(q)}
              style={{
                paddingHorizontal: 12, paddingVertical: 8,
                borderRadius: 999,
                backgroundColor: c.surfaceElevated,
                borderWidth: 1, borderColor: c.border,
              }}
            >
              <Text variant="caption">{q}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {messages.map((m) => {
          const fromAi = m.from === 'ai';
          return (
            <View key={m.id} style={{ alignSelf: fromAi ? 'flex-start' : 'flex-end', maxWidth: '88%', gap: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
                {fromAi ? <AIOrb size={20} active={false} /> : null}
                <View
                  style={{
                    backgroundColor: fromAi ? c.surfaceElevated : c.accent,
                    borderColor: c.border,
                    borderWidth: fromAi ? 1 : 0,
                    padding: 14,
                    borderRadius: radius.lg,
                    flex: 1,
                  }}
                >
                  <Text variant={fromAi ? 'serifItalic' : 'body'} style={{ color: fromAi ? c.foreground : c.accentFg, fontSize: fromAi ? 16 : 14, lineHeight: fromAi ? 24 : 22 }}>
                    {m.text}
                  </Text>
                </View>
              </View>
              {m.chart ? (
                <Card padding={14}>
                  <Text variant="overline" color="mutedFg" style={{ marginBottom: 8 }}>Activité par jour</Text>
                  <MiniBarChart data={m.chart} labels={['L', 'M', 'M', 'J', 'V', 'S', 'D']} />
                </Card>
              ) : null}
            </View>
          );
        })}
        {typing ? (
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', alignSelf: 'flex-start', backgroundColor: c.surfaceElevated, borderColor: c.border, borderWidth: 1, padding: 8, paddingHorizontal: 14, borderRadius: radius.lg }}>
            <AIOrb size={16} active />
            <AITypingIndicator />
          </View>
        ) : null}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          padding: 12,
          paddingBottom: embedded ? insets.bottom + 100 : insets.bottom + 12,
          borderTopWidth: 1,
          borderColor: c.border,
          backgroundColor: c.surface,
          alignItems: 'flex-end',
        }}
      >
        <View style={{ flex: 1 }}>
          <Input variant="filled" value={draft} onChangeText={setDraft} placeholder={t('assistant.chat.placeholder')} multiline />
        </View>
        <Pressable
          onPress={() => send()}
          style={{ width: 44, height: 44, borderRadius: 999, backgroundColor: c.accent, alignItems: 'center', justifyContent: 'center' }}
        >
          <Send size={18} color={c.accentFg} />
        </Pressable>
      </View>
    </View>
  );

  if (embedded) return Body;
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <BlurHeader back title={t('assistant.tabs.chat')} />
      {Body}
    </View>
  );
}
