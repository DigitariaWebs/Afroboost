import type { Review } from '@/types';

export const mockReviews: Review[] = [
  {
    id: 'rev_1',
    author: 'Marie-Lourdes J.',
    rating: 5,
    snippet: 'Meilleur griot de Montréal, accueil chaleureux et service rapide. Je reviendrai !',
    draftReply: 'Merci infiniment Marie-Lourdes pour votre fidélité ! On a hâte de vous revoir 🙏',
    status: 'pending',
    timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'rev_2',
    author: 'Maxime L.',
    rating: 4,
    snippet: 'Très bon repas, service un peu lent un samedi soir mais ça vaut la peine.',
    draftReply: 'Merci Maxime pour votre retour ! Nous travaillons à améliorer notre rapidité les soirs de pointe. À bientôt !',
    status: 'pending',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'rev_3',
    author: 'Aminata D.',
    rating: 5,
    snippet: 'Le mafé est parfait, ça me rappelle Dakar. Merci !',
    draftReply: 'Aminata, merci beaucoup ! C’est un plaisir de partager nos saveurs. À très bientôt 🙏',
    status: 'pending',
    timestamp: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'rev_4',
    author: 'Karine G.',
    rating: 3,
    snippet: 'Cuisine bonne mais le bruit ambiant rend les conversations difficiles.',
    draftReply: 'Merci Karine pour ce retour honnête. Nous étudions des solutions acoustiques pour le confort de tous.',
    status: 'pending',
    timestamp: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: 'rev_5',
    author: 'Wesley P.',
    rating: 5,
    snippet: 'Soirée konpa au top, ambiance authentique 🎶',
    draftReply: 'Merci Wesley ! Rendez-vous vendredi prochain pour la prochaine soirée 🎶',
    status: 'pending',
    timestamp: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
];
