import type { Call } from '@/types';
import { mockCustomers } from './customers';

const intents = [
  'Réservation table',
  'Question horaires',
  'Commande à emporter',
  'Réclamation',
  'Demande devis groupe',
  'Question allergies',
];

export const mockCalls: Call[] = Array.from({ length: 14 }).map((_, i) => {
  const c = mockCustomers[i % mockCustomers.length]!;
  return {
    id: `call_${i + 1}`,
    caller: c.name,
    number: c.phone || '(514) 555-0000',
    durationSec: 45 + (i * 17) % 240,
    intent: intents[i % intents.length]!,
    handledBy: i % 5 === 0 ? 'transferred' : 'ai',
    timestamp: new Date(Date.now() - i * 1000 * 60 * 73).toISOString(),
    transcript: [
      `Agent : Bonjour, vous êtes bien chez Chez Patrick.`,
      `Client : ${i % 2 === 0 ? 'Bonjour, je voudrais réserver une table.' : 'Bonjour, est-ce que vous livrez ?'}`,
      `Agent : Bien sûr, ${i % 2 === 0 ? 'pour combien de personnes et à quelle heure ?' : 'oui nous livrons dans tout Montréal pour toute commande de 30 $ et plus.'}`,
    ],
  };
});
