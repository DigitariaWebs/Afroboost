import type { Post } from '@/types';

const img = (seed: number) => `https://picsum.photos/seed/afrolink-${seed}/600/600`;

const captions = [
  'Ce soir, notre poulet boucané vous attend 🍗🔥 Réservez votre table !',
  'Nouveau au menu : griot accompagné de bananes pesées et pikliz maison. À découvrir !',
  'Promo midi : 2 thiéboudienne pour 25 $ jusqu’à 14 h ⏰',
  'Merci à toute la communauté pour votre soutien — 5 ans déjà ! 🎉',
  'On recrute un.e cuisinier.ère passionné.e. Envoyez votre CV en DM 👨‍🍳',
  'Soirée DJ konpa ce vendredi dès 21 h. Entrée libre 🎶',
  'Brunch dominical : accras, jus de gingembre, plats créoles à volonté 🥥',
  'Fête des mères : menu spécial 3 services à 45 $. Réservation obligatoire 🌸',
  'Nouveau plat : mafé d’agneau, recette de la grand-mère 🥜🐑',
  'Livraison gratuite ce week-end pour toute commande de 35 $ et + 🛵',
];

export const mockPosts: Post[] = Array.from({ length: 32 }).map((_, i) => {
  const status: Post['status'] =
    i < 4 ? 'queued' : i < 10 ? 'scheduled' : i < 16 ? 'draft' : i === 16 ? 'failed' : 'published';
  const channels: Post['channels'] = i % 3 === 0 ? ['facebook'] : i % 3 === 1 ? ['instagram'] : ['facebook', 'instagram'];
  const now = Date.now();
  const dayOffset = status === 'scheduled' ? 1 + (i % 6) : -(i + 1);
  const at = new Date(now + dayOffset * 86400000).toISOString();
  return {
    id: `post_${i + 1}`,
    caption: captions[i % captions.length]!,
    imageUrl: img(i + 1),
    channels,
    status,
    scheduledAt: status === 'scheduled' || status === 'queued' ? at : undefined,
    publishedAt: status === 'published' ? at : undefined,
    engagement: status === 'published'
      ? { likes: 20 + ((i * 7) % 180), comments: ((i * 3) % 24), reach: 200 + ((i * 41) % 1800) }
      : undefined,
  };
});
