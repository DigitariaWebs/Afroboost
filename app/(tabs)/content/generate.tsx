import React, { useState } from 'react';
import { View, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sparkles, RefreshCw, Check, ThumbsUp, Camera } from 'lucide-react-native';
import { Text, Card, Button, Input, Skeleton, Sheet, Stepper, RadioGroup, Pill, BlurHeader } from '@/components/ui';
import { AIOrb } from '@/components/brand/AIOrb';
import { useTheme, radius } from '@/lib/theme';
import { mockDelay } from '@/lib/mock-api';
import { toast } from '@/stores/toastStore';

type Step = 0 | 1 | 2 | 3;

export default function Generate() {
  const { t } = useTranslation();
  const router = useRouter();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<Step>(0);
  const [template, setTemplate] = useState<string | undefined>();
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState<'warm' | 'pro' | 'casual' | 'direct'>('warm');
  const [channels, setChannels] = useState<{ fb: boolean; ig: boolean }>({ fb: true, ig: true });
  const [imgReady, setImgReady] = useState(false);
  const [caption, setCaption] = useState('');
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const fullCaption =
    'Ce vendredi soir 🎉 venez goûter notre poulet boucané fait maison et notre nouveau riz djon-djon. Réservation conseillée — places limitées. #ChezPatrick #Montréal';

  const templates = [
    { id: 'promo', label: t('content.generate.tplPromo'), emoji: '🏷️' },
    { id: 'dish', label: t('content.generate.tplDish'), emoji: '🍽️' },
    { id: 'event', label: t('content.generate.tplEvent'), emoji: '🎉' },
    { id: 'testimonial', label: t('content.generate.tplTestimonial'), emoji: '⭐' },
    { id: 'hiring', label: t('content.generate.tplHiring'), emoji: '👔' },
    { id: 'custom', label: t('content.generate.tplCustom'), emoji: '✏️' },
  ];

  const startGenerate = async () => {
    setStep(2);
    setImgReady(false);
    setCaption('');
    await mockDelay(1500);
    setImgReady(true);
    for (let i = 0; i <= fullCaption.length; i++) {
      setCaption(fullCaption.slice(0, i));
      await new Promise((r) => setTimeout(r, 16));
    }
    setStep(3);
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <BlurHeader back title={t('content.generate.title')} />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 22, paddingBottom: insets.bottom + 110 }} keyboardShouldPersistTaps="handled">
        <Stepper current={step} total={4} />

        {step === 0 && (
          <View style={{ gap: 16 }}>
            <View>
              <Text variant="overline" color="mutedFg">Étape 1</Text>
              <Text variant="h1" style={{ marginTop: 4 }}>{t('content.generate.stepTemplate')}</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              {templates.map((tpl) => {
                const active = template === tpl.id;
                return (
                  <Pressable
                    key={tpl.id}
                    onPress={() => setTemplate(tpl.id)}
                    style={{
                      flexBasis: '47%',
                      flexGrow: 1,
                      padding: 18,
                      borderRadius: radius.lg,
                      borderWidth: 1.5,
                      borderColor: active ? c.accent : c.border,
                      backgroundColor: active ? c.surfaceHigh : c.surfaceElevated,
                      alignItems: 'flex-start',
                      gap: 12,
                      minHeight: 120,
                    }}
                  >
                    <Text style={{ fontSize: 28 }}>{tpl.emoji}</Text>
                    <Text variant="h2" style={{ fontSize: 18 }}>{tpl.label}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Button title={t('common.next')} onPress={() => template && setStep(1)} disabled={!template} fullWidth />
          </View>
        )}

        {step === 1 && (
          <View style={{ gap: 18 }}>
            <View>
              <Text variant="overline" color="mutedFg">Étape 2</Text>
              <Text variant="h1" style={{ marginTop: 4 }}>{t('content.generate.stepPrompt')}</Text>
            </View>
            <Input
              label={t('content.generate.promptLabel')}
              placeholder={t('content.generate.promptPlaceholder')}
              multiline
              value={prompt}
              onChangeText={setPrompt}
            />
            <View style={{ gap: 8 }}>
              <Text variant="overline" color="mutedFg">{t('content.generate.tone')}</Text>
              <RadioGroup
                value={tone}
                onChange={setTone}
                options={[
                  { value: 'warm', label: 'Chaleureux' },
                  { value: 'pro', label: 'Professionnel' },
                  { value: 'casual', label: 'Décontracté' },
                  { value: 'direct', label: 'Direct' },
                ]}
              />
            </View>
            <View style={{ gap: 8 }}>
              <Text variant="overline" color="mutedFg">{t('content.generate.channels')}</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <ChannelToggle on={channels.fb} icon={<ThumbsUp size={16} color={channels.fb ? c.accentFg : c.foreground} />} label="Facebook" onPress={() => setChannels((s) => ({ ...s, fb: !s.fb }))} />
                <ChannelToggle on={channels.ig} icon={<Camera size={16} color={channels.ig ? c.accentFg : c.foreground} />} label="Instagram" onPress={() => setChannels((s) => ({ ...s, ig: !s.ig }))} />
              </View>
            </View>
            <Button
              title="Générer"
              rightIcon={<Sparkles size={16} color={c.primaryFg} />}
              onPress={startGenerate}
              disabled={!prompt && template !== 'custom' && !template}
              fullWidth
            />
          </View>
        )}

        {step === 2 && (
          <View style={{ gap: 18 }}>
            <View style={{ alignItems: 'center', gap: 14, marginVertical: 16 }}>
              <AIOrb size={96} active />
              <Text variant="serifItalic" color="muted" style={{ fontSize: 16 }}>L'agent rédige votre publication…</Text>
            </View>
            <Card padding={0} style={{ overflow: 'hidden' }}>
              {imgReady ? (
                <Image source={{ uri: 'https://picsum.photos/seed/afroboost-gen/800/800' }} style={{ width: '100%', aspectRatio: 1.2 }} />
              ) : (
                <Skeleton height={260} />
              )}
              <View style={{ padding: 14, gap: 8, minHeight: 100 }}>
                {caption ? <Text variant="serifItalic" style={{ fontSize: 16 }}>{caption}</Text> : null}
              </View>
            </Card>
          </View>
        )}

        {step === 3 && (
          <View style={{ gap: 14 }}>
            <View>
              <Text variant="overline" color="mutedFg">Étape 4</Text>
              <Text variant="h1" style={{ marginTop: 4 }}>{t('content.generate.stepPreview')}</Text>
            </View>
            <Card padding={0} style={{ overflow: 'hidden' }}>
              <Image source={{ uri: 'https://picsum.photos/seed/afroboost-gen/800/800' }} style={{ width: '100%', aspectRatio: 1.2 }} />
              <View style={{ padding: 14, gap: 12 }}>
                <Input variant="filled" multiline value={caption} onChangeText={setCaption} />
                <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
                  {channels.fb ? <Pill tone="info" filled>Facebook</Pill> : null}
                  {channels.ig ? <Pill tone="default" filled>Instagram</Pill> : null}
                </View>
              </View>
            </Card>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button title="Régénérer" variant="outline" leftIcon={<RefreshCw size={16} color={c.foreground} />} onPress={startGenerate} />
              <View style={{ flex: 1 }}>
                <Button title="Approuver" leftIcon={<Check size={16} color={c.primaryFg} />} onPress={() => setScheduleOpen(true)} fullWidth />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <Sheet open={scheduleOpen} onClose={() => setScheduleOpen(false)}>
        <View style={{ alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <AIOrb size={40} />
          <Text variant="h2">Que voulez-vous faire ?</Text>
        </View>
        <View style={{ gap: 10 }}>
          <Button title={t('content.generate.publishNow')} onPress={() => { setScheduleOpen(false); toast({ title: t('content.generate.published'), variant: 'success' }); router.replace('/(tabs)/content'); }} fullWidth />
          <Button title={t('content.generate.schedule')} variant="secondary" onPress={() => { setScheduleOpen(false); router.push('/(tabs)/content/schedule'); }} fullWidth />
          <Button title={t('content.generate.saveDraft')} variant="outline" onPress={() => { setScheduleOpen(false); toast({ title: 'Brouillon enregistré', variant: 'success' }); router.replace('/(tabs)/content'); }} fullWidth />
        </View>
      </Sheet>
    </View>
  );
}

function ChannelToggle({ on, icon, label, onPress }: { on: boolean; icon: React.ReactNode; label: string; onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row', alignItems: 'center', gap: 8,
        paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999,
        backgroundColor: on ? c.accent : 'transparent',
        borderWidth: 1, borderColor: on ? c.accent : c.border,
      }}
    >
      {icon}
      <Text style={{ color: on ? c.accentFg : c.foreground, fontFamily: 'Inter_500Medium' }}>{label}</Text>
    </Pressable>
  );
}
