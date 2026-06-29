// lib/profiles-catalog.ts — référentiel 7 profils NAVLYS (Cartographe M3)
// Reconstitué VERBATIM depuis _APP_CLIENT_PERSONALIZATION_TS.md §3.
import type { Allocation } from './types/navlys-domain';

interface ProfilCatalog {
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  nom: string;
  metaphore: string;
  emoji: string;
  allocation_cible: Allocation;
  cadence: string;
  strategies_actives_autorisees: string[];
  cagr_pct_min: number | null;
  cagr_pct_max: number | null;
  volatilite_pct: number | null;
  proba_perte_20pct_an: number | null;
  horizon_min_annees: number | null;
  pire_annee_pct: number | null;
  univers_actifs: string[];
  interdits_specifiques: string[];
}

export const PROFILS: Record<1 | 2 | 3 | 4 | 5 | 6 | 7, ProfilCatalog> = {
  1: {
    id: 1, nom: 'Le Marin Prudent', metaphore: 'Yacht au mouillage en baie abritée', emoji: '🛡️',
    allocation_cible: { prudent: 90, balanced: 10, tactique: 0 },
    cadence: 'trimestrielle', strategies_actives_autorisees: [],
    cagr_pct_min: 2.5, cagr_pct_max: 4.0, volatilite_pct: 5.0,
    proba_perte_20pct_an: 0.015, horizon_min_annees: 3, pire_annee_pct: -12.0,
    univers_actifs: [
      'Obligations souveraines courtes EUR/USD',
      'ETF iShares MSCI World Quality Dividend',
      'Vanguard Global Aggregate Bond',
      'Livret A / Livret Bleu / fonds €',
    ],
    interdits_specifiques: [
      'Aucune stratégie active',
      'Pas de crypto',
      "Pas d'actions individuelles",
      'Pas de stratégie +2%/jour (invalidée Mission #2)',
    ],
  },
  2: {
    id: 2, nom: 'Le Capitaine de Famille', metaphore: 'Voilier familial, cap long', emoji: '👨‍👩‍👧',
    allocation_cible: { prudent: 30, balanced: 60, tactique: 10 },
    cadence: 'mensuelle',
    strategies_actives_autorisees: ['Donchian 20/55 doux (ETF World, max 3% capital)'],
    cagr_pct_min: 5.0, cagr_pct_max: 7.0, volatilite_pct: 11.5,
    proba_perte_20pct_an: 0.08, horizon_min_annees: 5, pire_annee_pct: -25.0,
    univers_actifs: [
      'ETF MSCI World (IWDA, MWRD)',
      'ETF S&P 500 hedged EUR',
      'PEA actions value EU large cap',
      'Fonds € assurance-vie',
    ],
    interdits_specifiques: [
      'Pas de moyenne baisse sur thèse cassée',
      'Crypto plafonné 5% capital',
      'Stratégie active plafonnée 10% capital',
      'Garder 6 mois de dépenses en cash',
    ],
  },
  3: {
    id: 3, nom: "L'Entrepreneur en Croissance", metaphore: 'Catamaran rapide', emoji: '🚀',
    allocation_cible: { prudent: 20, balanced: 50, tactique: 30 },
    cadence: 'hebdomadaire',
    strategies_actives_autorisees: [
      'Donchian 20/55 (ETF + actions tech, max 20% capital)',
      'Stat-arb paires sectorielles (max 10% capital, 5 paires)',
    ],
    cagr_pct_min: 7.0, cagr_pct_max: 11.0, volatilite_pct: 17.5,
    proba_perte_20pct_an: 0.18, horizon_min_annees: 7, pire_annee_pct: -40.0,
    univers_actifs: [
      'ETF MSCI World, S&P 500, Nasdaq 100',
      'Actions large cap tech (NVDA, MSFT, GOOGL, AMZN, META)',
      'BTC + ETH spot',
    ],
    interdits_specifiques: [
      'Pas de martingale',
      "Pas d'altcoin hors top 10 cap",
      'Pas de stratégie active > 30% capital',
      'Stop-loss systématique tactique (-15%)',
    ],
  },
  4: {
    id: 4, nom: "L'Étudiant Découvreur", metaphore: "Optimist d'apprentissage", emoji: '🌱',
    allocation_cible: { prudent: 80, balanced: 20, tactique: 0 },
    cadence: 'mensuelle (DCA auto)', strategies_actives_autorisees: [],
    cagr_pct_min: 5.0, cagr_pct_max: 6.0, volatilite_pct: 13.0,
    proba_perte_20pct_an: 0.08, horizon_min_annees: 10, pire_annee_pct: -25.0,
    univers_actifs: ['Livret A, Livret Jeune', 'ETF MSCI World en DCA petit montant'],
    interdits_specifiques: [
      'Pas un centime en crypto',
      'Pas de stratégie active',
      'Pas de tip réseaux sociaux',
      "Garder 3 mois de dépenses en Livret A avant d'investir",
    ],
  },
  5: {
    id: 5, nom: 'Le Skipper Indépendant', metaphore: 'Voilier de croisière côtière', emoji: '🧭',
    allocation_cible: { prudent: 60, balanced: 20, tactique: 20 },
    cadence: 'mensuelle',
    strategies_actives_autorisees: ['Donchian 20/55 doux ETF World (max 5% capital)'],
    cagr_pct_min: 3.5, cagr_pct_max: 5.5, volatilite_pct: 8.5,
    proba_perte_20pct_an: 0.03, horizon_min_annees: 5, pire_annee_pct: -18.0,
    univers_actifs: [
      'Fonds € assurance-vie multi-supports',
      'Livret A',
      'ETF MSCI World + ETF MSCI Emerging Markets',
    ],
    interdits_specifiques: [
      "JAMAIS investir le cash d'urgence 6 mois",
      'Pas de crypto',
      'Pas de stratégie +2%/jour (invalidée Mission #2)',
      'Vérifier trésorerie 6 mois avant tout investissement',
    ],
  },
  6: {
    id: 6, nom: 'Le Pro Actif', metaphore: 'Goélette de course', emoji: '💼',
    allocation_cible: { prudent: 30, balanced: 30, tactique: 30, recherche_perso: 10 },
    cadence: 'quotidienne (15 min max)',
    strategies_actives_autorisees: [
      'Donchian 20/55 (univers diversifié, max 15% capital)',
      'Stat-arb paires sectorielles (max 15% capital, 10 paires)',
      'Recherche perso (paper trading uniquement, max 10% capital)',
      'Options couvertes (covered calls, cash-secured puts)',
    ],
    cagr_pct_min: 8.0, cagr_pct_max: 12.0, volatilite_pct: 15.0,
    proba_perte_20pct_an: 0.12, horizon_min_annees: 5, pire_annee_pct: -30.0,
    univers_actifs: [
      'ETF mondiaux multi-zones / styles',
      'Actions individuelles large cap liquides',
      'BTC + ETH spot (max 10% capital)',
      'Obligations souveraines + corporate IG',
    ],
    interdits_specifiques: [
      'Pas de stratégie non backtestée en argent réel',
      'Pas de martingale',
      'Pas de stratégie +2%/jour (invalidée Mission #2)',
      'Walk-forward + Monte Carlo obligatoire avant déploiement réel',
    ],
  },
  7: {
    id: 7, nom: 'Le Navigateur Curieux', metaphore: 'Simulateur de bord à terre', emoji: '🌊',
    allocation_cible: { paper_trading: 100 },
    cadence: 'libre (paper)',
    strategies_actives_autorisees: ['TOUTES (paper trading uniquement, y compris stratégies invalidées à fin pédagogique)'],
    cagr_pct_min: null, cagr_pct_max: null, volatilite_pct: null,
    proba_perte_20pct_an: null, horizon_min_annees: null, pire_annee_pct: null,
    univers_actifs: ['TOUS (paper)'],
    interdits_specifiques: [
      'JAMAIS convertir paper en réel sans re-questionnaire',
      'Si tentation passage réel → STOP, repasser questionnaire',
    ],
  },
};

export const ROUTINES_FILES: Record<1 | 2 | 3 | 4 | 5 | 6 | 7, string> = {
  1: 'Trimestrielle : 30 min · Mensuelle : 10 min DCA · Annuelle : 1 jour bilan',
  2: 'Hebdo : 10 min Carte · Mensuelle : 30 min rééquilibrage + DCA · Trim : 1 h',
  3: 'Quotidienne : 5 min · Hebdo : 1 h · Mensuelle : 1 h 30 · Trim : 2-3 h',
  4: 'Mensuelle : 10 min DCA · Hebdo : 15 min lecture · Trim : 30 min quiz',
  5: 'Hebdo : 10 min trésorerie · Mensuelle : 20 min · Trim : 1 h',
  6: 'Quotidienne : 15 min · Hebdo : 1 h · Mensuelle : 2 h · Trim : 3-4 h',
  7: 'Quotidienne libre (paper) · Hebdo : 30 min · Trim : 2 h',
};

export const ALERTES_PSYCHO: Record<1 | 2 | 3 | 4 | 5 | 6 | 7, string[]> = {
  1: ["Tu te connectes plus d'1× par mois ? Tu sors de ta route — re-questionnaire."],
  2: ["Tu sur-ré-équilibres plus d'1× par mois ? Tu fais du market timing — STOP."],
  3: ["Tu enfreins un stop-loss 'juste cette fois' ? G1 — STOP et journal obligatoire."],
  4: ['Tu écoutes un tip TikTok/Discord ? STOP — re-lis le Manifeste NEXT GEN.'],
  5: ['Tu puises dans la trésorerie 6 mois ? STOP IMMÉDIAT, c\'est sacré.'],
  6: ['Tu déploies en réel une stratégie sans walk-forward + Monte Carlo ? G1 — interdit.'],
  7: ['Tentation de passer en réel sans re-questionnaire ? STOP.'],
};

export const DISCLAIMER_UNIVERSEL =
  "⚖️ NAVLYS = éducation à la décision financière. NAVLYS n'est pas un conseiller " +
  "(CIF/ORIAS). Tu es seul décisionnaire. G1 : pas de martingale, pas de moyenne " +
  "baisse sur thèse cassée, pas de leverage, pas de stratégie 'cible +2%/jour' " +
  '(invalidée Mission #2 par le Cartographe : Sharpe OOS −5,49, drawdown −95,2%).';
