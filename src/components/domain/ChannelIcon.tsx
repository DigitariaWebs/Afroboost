import React from 'react';
import { View } from 'react-native';
import { Phone, MessageSquare, MessageCircle, Camera, ThumbsUp, Star, Mail } from 'lucide-react-native';
import type { Channel } from '@/types';

const COLORS: Record<Channel, string> = {
  phone: '#0F7B3A',
  sms: '#2563EB',
  whatsapp: '#25D366',
  instagram: '#E1306C',
  facebook: '#1877F2',
  googleReview: '#FBBC05',
  email: '#6B6660',
};

export function ChannelIcon({ channel, size = 16, withBg = false }: { channel: Channel; size?: number; withBg?: boolean }) {
  const color = COLORS[channel];
  const Icon = (() => {
    switch (channel) {
      case 'phone': return <Phone size={size} color={color} />;
      case 'sms': return <MessageSquare size={size} color={color} />;
      case 'whatsapp': return <MessageCircle size={size} color={color} />;
      case 'instagram': return <Camera size={size} color={color} />;
      case 'facebook': return <ThumbsUp size={size} color={color} />;
      case 'googleReview': return <Star size={size} color={color} />;
      case 'email': return <Mail size={size} color={color} />;
    }
  })();
  if (!withBg) return <>{Icon}</>;
  return (
    <View
      style={{
        width: size + 14,
        height: size + 14,
        borderRadius: 999,
        backgroundColor: color + '22',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {Icon}
    </View>
  );
}
