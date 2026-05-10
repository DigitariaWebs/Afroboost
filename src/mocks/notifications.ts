import type { Notification } from '@/types';

export const mockNotifications: Notification[] = [
  { id: 'n1', kind: 'post', title: 'Publication envoyée', body: 'Votre post du vendredi est en ligne sur Facebook et Instagram.', at: new Date(Date.now() - 3600000).toISOString(), read: false },
  { id: 'n2', kind: 'call', title: 'Nouvel appel géré', body: 'Réservation confirmée pour 4 personnes ce soir 19 h 15.', at: new Date(Date.now() - 7200000).toISOString(), read: false },
  { id: 'n3', kind: 'review', title: 'Nouvel avis ⭐⭐⭐⭐⭐', body: 'Marie-Lourdes vient de laisser 5 étoiles.', at: new Date(Date.now() - 86400000).toISOString(), read: true },
  { id: 'n4', kind: 'report', title: 'Rapport hebdo prêt', body: 'Découvrez vos résultats de la semaine dernière.', at: new Date(Date.now() - 86400000 * 2).toISOString(), read: true },
  { id: 'n5', kind: 'customer', title: 'Nouveau client', body: 'Aminata Diallo a été ajoutée à votre CRM.', at: new Date(Date.now() - 86400000 * 3).toISOString(), read: true },
];
