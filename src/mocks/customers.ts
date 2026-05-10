import type { Customer } from '@/types';

const names = [
  'Marie-Lourdes Joseph', 'Aminata Diallo', 'Patrick Mukendi', 'Carline Saint-Louis',
  'Mamadou Bah', 'Stéphanie Pierre-Louis', 'Jean-Robert Cadet', 'Fatou Sow',
  'Ibrahim Camara', 'Naomi Toussaint', 'Émilie Charles', 'Lionel Etienne',
  'Roselie Désir', 'Ousmane Ndiaye', 'Catherine Boukman', 'Sidi Konaté',
  'Sabrina Métellus', 'Olivier Kabasele', 'Christella Augustin', 'Awa Traoré',
  'Maxime Lavoie', 'Anne-Sophie Tremblay', 'David Beaulieu', 'Karine Gagnon',
  'François Lévesque', 'Lucie Dubois', 'Vincent Pelletier', 'Geneviève Roy',
  'Marc-André Côté', 'Isabelle Fortin', 'Sébastien Bélanger', 'Nathalie Cloutier',
  'Mireille Joachim', 'Wesley Pierre', 'Béatrice Mvondo', 'Joseph Akinyemi',
  'Adèle Mensah', 'Tanya Compère', 'Roland Mwamba', 'Esther Boko',
  'Yannick Désiré', 'Salimata Coulibaly', 'Hubert Antoine', 'Maïmouna Sané',
  'Brice N’Guessan', 'Carmelle Vincent', 'Daniel Mbaye', 'Patricia Léger',
  'Junior Pierre-Antoine', 'Khadija Diop', 'Frantz Bélizaire', 'Aïcha Touré',
];

const sources: Customer['source'][] = ['phone', 'social', 'walkIn', 'referral', 'import'];
const tags = [['VIP'], ['Régulier'], ['Anniversaire'], [], ['Allergique aux arachides'], ['Groupe'], ['Livraison'], []];
const channels = ['phone', 'whatsapp', 'instagram', 'facebook', 'sms'] as const;

export const mockCustomers: Customer[] = names.map((name, i) => {
  const at = new Date(Date.now() - i * 86400000 * 1.7).toISOString();
  return {
    id: `cust_${i + 1}`,
    name,
    phone: `(514) 555-${String(1000 + i).padStart(4, '0')}`,
    email: `${name.toLowerCase().replace(/[^a-z]/g, '.')}@example.com`,
    source: sources[i % sources.length]!,
    tags: tags[i % tags.length]!,
    lastContactChannel: channels[i % channels.length],
    lastContactAt: at,
    notes: i % 5 === 0 ? 'Préfère réserver par téléphone le soir.' : undefined,
    history: [
      { id: `h_${i}_1`, type: 'call', text: 'Réservation pour 4 personnes', at },
      { id: `h_${i}_2`, type: 'message', text: 'A demandé si le menu est sans gluten', at: new Date(Date.now() - (i + 1) * 86400000 * 3).toISOString() },
    ],
  };
});
