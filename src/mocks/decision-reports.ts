import type { DecisionReport } from '@/types';

export const mockReports: DecisionReport[] = [
  {
    id: 'rep_1',
    weekStart: '2026-05-04',
    weekEnd: '2026-05-10',
    trend: {
      summary: 'Activité en hausse de 18 % par rapport à la semaine passée. Vendredi soir reste votre meilleur créneau.',
      series: [12, 18, 14, 22, 31, 28, 19],
    },
    wins: [
      'Soirée konpa du vendredi : 28 réservations (+40 %)',
      'Avis Google moyen passé de 4.5 à 4.7 ⭐',
      'Le post sur le mafé a généré 142 partages',
    ],
    issues: [
      'Trois appels manqués mardi entre 14 h et 15 h — pause déjeuner ?',
      'Stock de griot épuisé samedi à 21 h',
    ],
    actions: [
      { id: 'a1', text: 'Programmer une publication de relance pour le mardi', done: false },
      { id: 'a2', text: 'Augmenter la commande hebdo de griot de 20 %', done: false },
      { id: 'a3', text: 'Activer l’agent IA pendant la pause déjeuner', done: true },
    ],
  },
  {
    id: 'rep_2',
    weekStart: '2026-04-27',
    weekEnd: '2026-05-03',
    trend: { summary: 'Semaine stable, légère baisse en début de semaine.', series: [10, 12, 11, 18, 25, 24, 16] },
    wins: ['Brunch dominical complet', '12 nouveaux abonnés Instagram'],
    issues: ['Engagement Facebook en baisse'],
    actions: [
      { id: 'b1', text: 'Tester un format vidéo court sur Facebook', done: true },
      { id: 'b2', text: 'Relancer les anciens clients VIP', done: false },
    ],
  },
];
