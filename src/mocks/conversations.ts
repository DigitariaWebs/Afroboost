import type { Conversation, Channel, Message } from '@/types';
import { mockCustomers } from './customers';

const channels: Channel[] = ['phone', 'sms', 'whatsapp', 'instagram', 'facebook', 'googleReview'];

const sampleThreads: { c: Channel; msgs: { f: Message['from']; t: string }[] }[] = [
  {
    c: 'whatsapp',
    msgs: [
      { f: 'customer', t: 'Bonsoir, est-ce que vous avez de la place ce soir vers 19 h pour 4 personnes ?' },
      { f: 'ai', t: 'Bonsoir Marie-Lourdes ! Oui, nous avons une table disponible à 19 h 15. Je vous la réserve ?' },
      { f: 'customer', t: 'Parfait, oui merci 🙏' },
      { f: 'ai', t: 'Réservation confirmée pour 4 personnes à 19 h 15 au nom de Marie-Lourdes. À ce soir !' },
    ],
  },
  {
    c: 'instagram',
    msgs: [
      { f: 'customer', t: 'Vous livrez à Laval ?' },
      { f: 'ai', t: 'Bonjour ! Oui, nous livrons à Laval pour toute commande de 30 $ et plus. 🛵' },
    ],
  },
  {
    c: 'sms',
    msgs: [
      { f: 'customer', t: 'Quels sont vos horaires dimanche ?' },
      { f: 'ai', t: 'Bonjour ! Nous sommes ouverts dimanche de 12 h à 21 h.' },
      { f: 'customer', t: 'Merci !' },
    ],
  },
  {
    c: 'facebook',
    msgs: [
      { f: 'customer', t: 'J’organise un anniversaire pour 15 personnes le 24 mai, c’est possible ?' },
      { f: 'ai', t: 'Oui ! Pour les groupes de 10+ nous avons un menu dédié. Je transfère votre demande à Patrick qui vous appellera dans la journée.' },
      { f: 'business', t: 'Bonjour ! Je vous appelle à 15 h pour confirmer le menu et l’acompte.' },
    ],
  },
  {
    c: 'googleReview',
    msgs: [
      { f: 'customer', t: '⭐⭐⭐⭐⭐ Meilleur griot de Montréal, accueil chaleureux !' },
      { f: 'ai', t: 'Merci infiniment pour votre avis ! On a hâte de vous revoir 🙏' },
    ],
  },
];

export const mockConversations: Conversation[] = Array.from({ length: 25 }).map((_, i) => {
  const cust = mockCustomers[i % mockCustomers.length]!;
  const tpl = sampleThreads[i % sampleThreads.length]!;
  const baseTime = Date.now() - i * 1000 * 60 * 47;
  const messages: Message[] = tpl.msgs.map((m, j) => ({
    id: `m_${i}_${j}`,
    from: m.f,
    text: m.t,
    timestamp: new Date(baseTime - (tpl.msgs.length - j) * 60000).toISOString(),
  }));
  const last = messages[messages.length - 1]!;
  return {
    id: `conv_${i + 1}`,
    channel: tpl.c,
    customerName: cust.name,
    avatarSeed: cust.name,
    unread: i < 4 ? 1 + (i % 3) : 0,
    lastMessage: last.text,
    lastTimestamp: last.timestamp,
    messages,
    customerId: cust.id,
  };
});
