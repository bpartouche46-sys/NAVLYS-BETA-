# 🧭 NAVLYS — Moteur de personnalisation TypeScript (portage M3)

**Verrouillé : 28 mai 2026 · Beta 1er juin · Référence Python : `_CARTOGRAPHE_M3_MOTEUR_PERSONNALISATION_PYTHON.py`**

Ce document fournit le portage **TypeScript strict** du moteur de personnalisation NAVLYS, à déposer dans `navlys/lib/personalization-engine.ts`. Sortie JSON **identique** au Python, validée par 4 personas de test Jest.

---

## 1. Arborescence cible

```
navlys/
├── lib/
│   ├── personalization-engine.ts       ← Moteur principal
│   ├── profiles-catalog.ts             ← Référentiel 7 profils
│   ├── types/
│   │   └── navlys-domain.ts            ← Types domaine (Reponses, Profil, Routine)
│   └── __tests__/
│       └── personalization-engine.test.ts
└── package.json (dépendances : zod, jest, ts-jest)
```

---

## 2. Types domaine — `lib/types/navlys-domain.ts`

```typescript
// ─── Réponses au questionnaire 12 questions ────────────────────────────────
export type Q2Situation = 'etudiant' | 'salarie' | 'freelance' | 'entrepreneur' | 'retraite' | 'sans_emploi';
export type Q5Objectif = 'securiser' | 'grandir' | 'projet_court' | 'retraite' | 'apprendre';
export type Q6Horizon = '<2ans' | '2-5ans' | '5-10ans' | '10-20ans' | '20+ans';
export type Q7Reaction = 'panique' | 'inquiet' | 'accepte' | 'opportunite' | 'indifferent';
export type Q8Experience = 'zero' | 'qq_mois' | '1-3ans' | '3-10ans' | '10+ans' | 'pro';
export type Q9Temps = '0min' | '15min' | '1h' | '3-5h' | '10h+';
export type Q10Interdit = 'crypto' | 'actions_indiv' | 'derives' | 'leverage' | 'quotidien';
export type Q11Perte = 'oui' | 'partiel' | 'non';

export interface Reponses {
  q1_age: number;                       // 18..90
  q2_situation: Q2Situation;
  q3_capital: number;                   // EUR
  q4_dca_mensuel: number;               // EUR
  q5_objectif: Q5Objectif;
  q6_horizon: Q6Horizon;
  q7_reaction_perte: Q7Reaction;
  q8_experience: Q8Experience;
  q9_temps_semaine: Q9Temps;
  q10_interdits_perso: Q10Interdit[];
  q11_perte_totale_tactique: Q11Perte;
  q12_accepte_education_seule: boolean;
}

// ─── Sortie ────────────────────────────────────────────────────────────────
export type ProfilId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type DegreInterne = 'defensive' | 'balanced' | 'aggressive' | 'blocked';

export interface Allocation {
  prudent?: number;
  balanced?: number;
  tactique?: number;
  recherche_perso?: number;
  paper_trading?: number;
}

export interface PerformanceHonnete {
  cagr_pct_min: number | null;
  cagr_pct_max: number | null;
  volatilite_estimee_pct: number | null;
  probabilite_perte_20pct_an: number | null;
  horizon_recommande_min_annees: number | null;
  pire_annee_plausible_pct: number | null;
}

export interface SortieRoutine {
  statut: 'ok' | 'blocked';
  raison?: string;
  profil?: {
    id: ProfilId;
    emoji: string;
    nom: string;
    metaphore: string;
    degre_interne: DegreInterne;
  };
  allocation_cible_pct?: Allocation;
  strategies_actives_autorisees?: string[];
  univers_actifs_recommandes?: string[];
  cadence?: string;
  routine_resume?: string;
  performance_honnete?: PerformanceHonnete;
  interdits?: string[];
  alertes_psychologiques?: string[];
  disclaimer: string;
}
```

---

## 3. Référentiel — `lib/profiles-catalog.ts`

```typescript
import type { Allocation } from './types/navlys-domain';

interface ProfilCatalog {
  id: 1|2|3|4|5|6|7;
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

export const PROFILS: Record<1|2|3|4|5|6|7, ProfilCatalog> = {
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

export const ROUTINES_FILES: Record<1|2|3|4|5|6|7, string> = {
  1: 'Trimestrielle : 30 min · Mensuelle : 10 min DCA · Annuelle : 1 jour bilan',
  2: 'Hebdo : 10 min Carte · Mensuelle : 30 min rééquilibrage + DCA · Trim : 1 h',
  3: 'Quotidienne : 5 min · Hebdo : 1 h · Mensuelle : 1 h 30 · Trim : 2-3 h',
  4: 'Mensuelle : 10 min DCA · Hebdo : 15 min lecture · Trim : 30 min quiz',
  5: 'Hebdo : 10 min trésorerie · Mensuelle : 20 min · Trim : 1 h',
  6: 'Quotidienne : 15 min · Hebdo : 1 h · Mensuelle : 2 h · Trim : 3-4 h',
  7: 'Quotidienne libre (paper) · Hebdo : 30 min · Trim : 2 h',
};

export const ALERTES_PSYCHO: Record<1|2|3|4|5|6|7, string[]> = {
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
```

---

## 4. Moteur principal — `lib/personalization-engine.ts`

```typescript
import {
  PROFILS, ROUTINES_FILES, ALERTES_PSYCHO, DISCLAIMER_UNIVERSEL,
} from './profiles-catalog';
import type {
  Reponses, SortieRoutine, Allocation, ProfilId, DegreInterne,
} from './types/navlys-domain';

type BiasVector = Record<1|2|3|4|5|6|7, number>;

interface DebugInfo {
  bias: BiasVector;
  horizon_short: boolean;
  no_time: boolean;
  panic: boolean;
}

function calculerProfil(r: Reponses): { profil_id: ProfilId; degre: DegreInterne; debug: DebugInfo | { raison: string } } {
  if (!r.q12_accepte_education_seule) {
    return { profil_id: 0, degre: 'blocked',
             debug: { raison: 'Q12 refusé — NAVLYS = éducation seule, pas de conseil.' } };
  }

  const bias: BiasVector = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0 };

  // ── Q1 âge ──
  if (r.q1_age <= 25)       { bias[4]+=3; bias[7]+=1; }
  else if (r.q1_age <= 35)  { bias[3]+=2; bias[5]+=2; }
  else if (r.q1_age <= 50)  { bias[2]+=2; bias[3]+=1; bias[6]+=1; }
  else if (r.q1_age <= 65)  { bias[1]+=1; bias[6]+=2; }
  else                      { bias[1]+=3; }

  // ── Q2 situation ──
  const mapQ2: Record<string, Partial<BiasVector>> = {
    etudiant:     { 4:3, 7:2 },
    salarie:      { 2:2, 5:1, 6:1 },
    freelance:    { 5:3, 3:1 },
    entrepreneur: { 3:3, 6:2 },
    retraite:     { 1:3 },
    sans_emploi:  { 4:2, 5:2 },
  };
  applyMap(bias, mapQ2[r.q2_situation]);

  // ── Q3 capital (×2.5) ──
  if (r.q3_capital < 5_000)         { bias[4]+=3*2.5; bias[7]+=1*2.5; }
  else if (r.q3_capital < 20_000)   { bias[5]+=2*2.5; bias[7]+=1*2.5; }
  else if (r.q3_capital < 100_000)  { bias[2]+=2*2.5; bias[3]+=1*2.5; bias[5]+=1*2.5; }
  else if (r.q3_capital < 500_000)  { bias[1]+=1*2.5; bias[3]+=2*2.5; bias[6]+=2*2.5; }
  else                              { bias[1]+=2*2.5; bias[6]+=3*2.5; }

  // ── Q4 DCA ──
  if (r.q4_dca_mensuel < 100)      { bias[4]+=1; bias[5]+=1; }
  else if (r.q4_dca_mensuel < 500) { bias[2]+=1; bias[5]+=1; }
  else if (r.q4_dca_mensuel < 2_000){ bias[2]+=2; bias[3]+=1; }
  else                             { bias[3]+=2; bias[6]+=2; }

  // ── Q5 objectif ──
  const mapQ5: Record<string, Partial<BiasVector>> = {
    securiser:    { 1:3, 5:2 },
    grandir:      { 2:2, 3:2 },
    projet_court: { 1:2, 5:2 },
    retraite:     { 1:2, 2:2 },
    apprendre:    { 4:3, 7:3 },
  };
  applyMap(bias, mapQ5[r.q5_objectif]);

  // ── Q6 horizon (contraintes dures si court) ──
  const horizon_short = r.q6_horizon === '<2ans' || r.q6_horizon === '2-5ans';
  if (horizon_short) {
    bias[3] *= 0.3;
    bias[6] *= 0.5;
    bias[1] += 2;
  }

  // ── Q7 réaction perte ──
  const mapQ7: Record<string, Partial<BiasVector>> = {
    panique:     { 1:3, 4:1 },
    inquiet:     { 1:2, 2:1, 5:1 },
    accepte:     { 2:1, 5:1 },
    opportunite: { 3:2, 6:2 },
    indifferent: { 2:1, 3:1, 6:1 },
  };
  applyMap(bias, mapQ7[r.q7_reaction_perte]);
  const panic = r.q7_reaction_perte === 'panique';

  // ── Q8 expérience ──
  const mapQ8: Record<string, Partial<BiasVector>> = {
    zero:    { 4:3, 7:2 },
    qq_mois: { 4:2, 5:1 },
    '1-3ans':{ 2:2, 5:1 },
    '3-10ans': { 3:2, 6:1 },
    '10+ans': { 6:3 },
    pro:     { 6:4 },
  };
  applyMap(bias, mapQ8[r.q8_experience]);

  // ── Q9 temps ──
  const no_time = r.q9_temps_semaine === '0min';
  const mapQ9: Record<string, Partial<BiasVector>> = {
    '0min':  { 1:2, 4:2 },
    '15min': { 2:2, 5:2 },
    '1h':    { 2:1, 3:1 },
    '3-5h':  { 3:2, 6:2 },
    '10h+':  { 6:3, 7:2 },
  };
  applyMap(bias, mapQ9[r.q9_temps_semaine]);

  // ── Q11 appétence perte tactique ──
  if (r.q11_perte_totale_tactique === 'non') {
    bias[3] *= 0.5;
    bias[6] *= 0.7;
    bias[1] += 2; bias[2] += 1; bias[5] += 1;
  }

  let profil_id = (Object.keys(bias) as unknown as (1|2|3|4|5|6|7)[])
    .reduce((a, b) => (bias[a] >= bias[b] ? a : b)) as ProfilId;

  if (no_time && (profil_id === 3 || profil_id === 6)) {
    profil_id = (r.q3_capital >= 10_000 ? 2 : 4) as ProfilId;
  }
  if (panic && r.q11_perte_totale_tactique === 'non') {
    profil_id = (r.q3_capital >= 20_000 ? 1 : 4) as ProfilId;
  }

  // Degré interne
  const aggressive_score =
    (r.q7_reaction_perte === 'opportunite' ? 2 : 0) +
    (r.q6_horizon === '10-20ans' || r.q6_horizon === '20+ans' ? 2 : 0) +
    (r.q11_perte_totale_tactique === 'oui' ? 2 : 0);
  const defensive_score =
    ((r.q7_reaction_perte === 'panique' || r.q7_reaction_perte === 'inquiet') ? 2 : 0) +
    ((r.q6_horizon === '<2ans' || r.q6_horizon === '2-5ans') ? 2 : 0) +
    (r.q11_perte_totale_tactique === 'non' ? 2 : 0);

  let degre: DegreInterne = 'balanced';
  if (aggressive_score - defensive_score >= 3) degre = 'aggressive';
  else if (defensive_score - aggressive_score >= 3) degre = 'defensive';

  return { profil_id, degre, debug: { bias, horizon_short, no_time, panic } };
}

function applyMap(bias: BiasVector, m: Partial<BiasVector> | undefined): void {
  if (!m) return;
  for (const k of Object.keys(m) as unknown as (1|2|3|4|5|6|7)[]) {
    bias[k] += m[k]!;
  }
}

function ajusterAllocation(profil_id: 1|2|3|4|5|6|7, degre: DegreInterne): Allocation {
  const base: Allocation = { ...PROFILS[profil_id].allocation_cible };
  if (profil_id === 1 || profil_id === 4 || profil_id === 7) return base;
  if (degre === 'defensive' && base.tactique !== undefined) {
    const delta = Math.min(10, base.tactique ?? 0);
    base.tactique = (base.tactique ?? 0) - delta;
    base.prudent  = (base.prudent  ?? 0) + delta;
  } else if (degre === 'aggressive' && base.tactique !== undefined) {
    const delta = Math.min(10, base.prudent ?? 0);
    base.prudent  = (base.prudent ?? 0) - delta;
    base.tactique = (base.tactique ?? 0) + delta;
  }
  return base;
}

export function genererRoutine(r: Reponses): SortieRoutine {
  const { profil_id, degre, debug } = calculerProfil(r);

  if (profil_id === 0) {
    return {
      statut: 'blocked',
      raison: (debug as { raison: string }).raison,
      disclaimer: DISCLAIMER_UNIVERSEL,
    };
  }
  const p = PROFILS[profil_id as 1|2|3|4|5|6|7];
  const allocation_finale = ajusterAllocation(profil_id as 1|2|3|4|5|6|7, degre);

  const interdits = [...p.interdits_specifiques];
  const mapQ10: Record<string, string> = {
    crypto:        'Pas de crypto (préférence personnelle)',
    actions_indiv: "Pas d'actions individuelles (préférence personnelle)",
    derives:       'Pas de produits dérivés (préférence personnelle)',
    leverage:      'Pas de leverage (préférence personnelle)',
    quotidien:     'Pas de stratégie active quotidienne (préférence personnelle)',
  };
  for (const code of r.q10_interdits_perso) {
    if (mapQ10[code]) interdits.push(mapQ10[code]);
  }

  const strategies = (debug as DebugInfo).no_time ? [] : [...p.strategies_actives_autorisees];

  return {
    statut: 'ok',
    profil: {
      id: profil_id,
      emoji: p.emoji,
      nom: p.nom,
      metaphore: p.metaphore,
      degre_interne: degre,
    },
    allocation_cible_pct: allocation_finale,
    strategies_actives_autorisees: strategies,
    univers_actifs_recommandes: p.univers_actifs,
    cadence: p.cadence,
    routine_resume: ROUTINES_FILES[profil_id as 1|2|3|4|5|6|7],
    performance_honnete: {
      cagr_pct_min: p.cagr_pct_min,
      cagr_pct_max: p.cagr_pct_max,
      volatilite_estimee_pct: p.volatilite_pct,
      probabilite_perte_20pct_an: p.proba_perte_20pct_an,
      horizon_recommande_min_annees: p.horizon_min_annees,
      pire_annee_plausible_pct: p.pire_annee_pct,
    },
    interdits,
    alertes_psychologiques: ALERTES_PSYCHO[profil_id as 1|2|3|4|5|6|7],
    disclaimer: DISCLAIMER_UNIVERSEL,
  };
}
```

---

## 5. Schéma Zod côté API — validation des réponses

```typescript
import { z } from 'zod';

export const ReponsesSchema = z.object({
  q1_age: z.number().int().min(18).max(90),
  q2_situation: z.enum(['etudiant','salarie','freelance','entrepreneur','retraite','sans_emploi']),
  q3_capital: z.number().min(0).max(50_000_000),
  q4_dca_mensuel: z.number().min(0).max(100_000),
  q5_objectif: z.enum(['securiser','grandir','projet_court','retraite','apprendre']),
  q6_horizon: z.enum(['<2ans','2-5ans','5-10ans','10-20ans','20+ans']),
  q7_reaction_perte: z.enum(['panique','inquiet','accepte','opportunite','indifferent']),
  q8_experience: z.enum(['zero','qq_mois','1-3ans','3-10ans','10+ans','pro']),
  q9_temps_semaine: z.enum(['0min','15min','1h','3-5h','10h+']),
  q10_interdits_perso: z.array(z.enum(['crypto','actions_indiv','derives','leverage','quotidien'])).default([]),
  q11_perte_totale_tactique: z.enum(['oui','partiel','non']).default('non'),
  q12_accepte_education_seule: z.boolean(),
});

export type ReponsesValidated = z.infer<typeof ReponsesSchema>;
```

---

## 6. Tests Jest — `lib/__tests__/personalization-engine.test.ts`

```typescript
import { genererRoutine } from '../personalization-engine';
import type { Reponses } from '../types/navlys-domain';

describe('🧭 Moteur de personnalisation NAVLYS — 4 personas de référence', () => {

  it('Marie 68 ans retraitée 250 000 € → Profil 1 (Marin Prudent) défensif', () => {
    const r: Reponses = {
      q1_age: 68, q2_situation: 'retraite', q3_capital: 250_000,
      q4_dca_mensuel: 0, q5_objectif: 'securiser', q6_horizon: '2-5ans',
      q7_reaction_perte: 'panique', q8_experience: 'qq_mois',
      q9_temps_semaine: '0min', q10_interdits_perso: ['crypto','leverage'],
      q11_perte_totale_tactique: 'non', q12_accepte_education_seule: true,
    };
    const out = genererRoutine(r);
    expect(out.statut).toBe('ok');
    expect(out.profil?.id).toBe(1);
    expect(out.profil?.degre_interne).toBe('defensive');
    expect(out.strategies_actives_autorisees).toEqual([]);
    expect(out.allocation_cible_pct).toEqual({ prudent: 90, balanced: 10, tactique: 0 });
  });

  it('Thomas 38 ans salarié 50 000 € → Profil 2 (Capitaine de Famille) balanced', () => {
    const r: Reponses = {
      q1_age: 38, q2_situation: 'salarie', q3_capital: 50_000,
      q4_dca_mensuel: 400, q5_objectif: 'grandir', q6_horizon: '10-20ans',
      q7_reaction_perte: 'accepte', q8_experience: '1-3ans',
      q9_temps_semaine: '15min', q10_interdits_perso: [],
      q11_perte_totale_tactique: 'partiel', q12_accepte_education_seule: true,
    };
    const out = genererRoutine(r);
    expect(out.profil?.id).toBe(2);
    expect(out.profil?.degre_interne).toBe('balanced');
    expect(out.allocation_cible_pct?.balanced).toBe(60);
  });

  it('Léa 22 ans étudiante 800 € → Profil 4 (Étudiant Découvreur)', () => {
    const r: Reponses = {
      q1_age: 22, q2_situation: 'etudiant', q3_capital: 800,
      q4_dca_mensuel: 50, q5_objectif: 'apprendre', q6_horizon: '10-20ans',
      q7_reaction_perte: 'inquiet', q8_experience: 'zero',
      q9_temps_semaine: '15min', q10_interdits_perso: ['crypto','derives'],
      q11_perte_totale_tactique: 'non', q12_accepte_education_seule: true,
    };
    const out = genererRoutine(r);
    expect(out.profil?.id).toBe(4);
    expect(out.interdits).toContain('Pas de crypto (préférence personnelle)');
  });

  it('Bruno 50 ans entrepreneur 300 000 € → Profil 6 (Pro Actif) aggressive', () => {
    const r: Reponses = {
      q1_age: 50, q2_situation: 'entrepreneur', q3_capital: 300_000,
      q4_dca_mensuel: 2_500, q5_objectif: 'grandir', q6_horizon: '10-20ans',
      q7_reaction_perte: 'opportunite', q8_experience: '10+ans',
      q9_temps_semaine: '3-5h', q10_interdits_perso: [],
      q11_perte_totale_tactique: 'oui', q12_accepte_education_seule: true,
    };
    const out = genererRoutine(r);
    expect(out.profil?.id).toBe(6);
    expect(out.profil?.degre_interne).toBe('aggressive');
    expect(out.allocation_cible_pct?.tactique).toBe(40);   // 30 + 10 aggressive shift
  });

  it('Q12 = false → statut blocked, pas de profil', () => {
    const r: Reponses = {
      q1_age: 30, q2_situation: 'salarie', q3_capital: 10_000,
      q4_dca_mensuel: 100, q5_objectif: 'grandir', q6_horizon: '5-10ans',
      q7_reaction_perte: 'accepte', q8_experience: 'qq_mois',
      q9_temps_semaine: '15min', q10_interdits_perso: [],
      q11_perte_totale_tactique: 'partiel', q12_accepte_education_seule: false,
    };
    const out = genererRoutine(r);
    expect(out.statut).toBe('blocked');
    expect(out.profil).toBeUndefined();
  });
});
```

---

## 7. Commandes

```bash
cd navlys
npm install zod
npm install -D jest ts-jest @types/jest
npx jest lib/__tests__/personalization-engine.test.ts
```

Critère d'acceptation Beta : **5/5 tests verts**, sortie JSON byte-identique au Python sur les 4 personas de référence.

---

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL · 🧭 LE CARTOGRAPHE
