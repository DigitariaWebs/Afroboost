import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, MessageCircle, Eye, Clock, AlertTriangle } from 'lucide-react-native';
import { Text, Pill } from '@/components/ui';
import { ChannelIcon } from './ChannelIcon';
import { useTheme, radius } from '@/lib/theme';
import { formatRelative, formatDate } from '@/lib/utils';
import type { Post } from '@/types';
import { useSettingsStore } from '@/stores/settingsStore';

const STATUS_PILL: Record<Post['status'], { label: string; tone: 'success' | 'warning' | 'danger' | 'muted' | 'info' }> = {
  draft: { label: 'Brouillon', tone: 'muted' },
  queued: { label: 'À valider', tone: 'warning' },
  scheduled: { label: 'Programmée', tone: 'info' },
  published: { label: 'Publiée', tone: 'success' },
  failed: { label: 'Échec', tone: 'danger' },
};

export function PostCard({ post, onPress }: { post: Post; onPress?: () => void }) {
  const { c } = useTheme();
  const lng = useSettingsStore((s) => s.language);
  const meta = STATUS_PILL[post.status];
  const when = post.scheduledAt
    ? formatDate(post.scheduledAt, 'PPp', lng)
    : post.publishedAt
      ? formatRelative(post.publishedAt, lng)
      : '';

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          borderRadius: radius.lg,
          overflow: 'hidden',
          backgroundColor: c.surfaceElevated,
          borderWidth: 1,
          borderColor: c.border,
        }}
      >
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: post.imageUrl }}
            style={{ width: '100%', aspectRatio: 1.5, backgroundColor: c.border }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%' }}
          />
          <View style={{ position: 'absolute', left: 12, bottom: 12, right: 12, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ flexDirection: 'row', gap: 6, flex: 1 }}>
              {post.channels.map((ch) => (
                <View
                  key={ch}
                  style={{
                    paddingHorizontal: 8, paddingVertical: 4,
                    borderRadius: 999,
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    flexDirection: 'row', alignItems: 'center', gap: 4,
                  }}
                >
                  <ChannelIcon channel={ch as any} size={11} />
                  <Text variant="caption" style={{ color: '#fff' }}>{ch}</Text>
                </View>
              ))}
            </View>
            <Pill tone={meta.tone} filled>{meta.label}</Pill>
          </View>
        </View>
        <View style={{ padding: 14, gap: 8 }}>
          <Text numberOfLines={3}>{post.caption}</Text>
          {post.engagement ? (
            <View style={{ flexDirection: 'row', gap: 16, marginTop: 4 }}>
              <Stat icon={<Heart size={14} color={c.danger} />} value={post.engagement.likes} />
              <Stat icon={<MessageCircle size={14} color={c.info} />} value={post.engagement.comments} />
              <Stat icon={<Eye size={14} color={c.muted} />} value={post.engagement.reach} />
            </View>
          ) : when ? (
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
              {post.status === 'failed' ? <AlertTriangle size={13} color={c.danger} /> : <Clock size={13} color={c.muted} />}
              <Text variant="caption" color="muted">{when}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

function Stat({ icon, value }: { icon: React.ReactNode; value: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      {icon}
      <Text variant="mono" color="muted" style={{ fontSize: 12 }}>{value.toLocaleString('fr-CA')}</Text>
    </View>
  );
}
