// lib/types/navlys-domain.ts — types domaine + schéma Zod
// Reconstitué VERBATIM depuis _APP_CLIENT_PERSONALIZATION_TS.md §2 (types) + §5 (Zod).
// Le schéma Zod est colocalisé ici car _actions.ts importe ReponsesSchema depuis ce module.
import { z } from 'zod';

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

// ─── Schéma Zod côté API — validation des réponses ─────────────────────────
export const ReponsesSchema = z.object({
  q1_age: z.number().int().min(18).max(90),
  q2_situation: z.enum(['etudiant', 'salarie', 'freelance', 'entrepreneur', 'retraite', 'sans_emploi']),
  q3_capital: z.number().min(0).max(50_000_000),
  q4_dca_mensuel: z.number().min(0).max(100_000),
  q5_objectif: z.enum(['securiser', 'grandir', 'projet_court', 'retraite', 'apprendre']),
  q6_horizon: z.enum(['<2ans', '2-5ans', '5-10ans', '10-20ans', '20+ans']),
  q7_reaction_perte: z.enum(['panique', 'inquiet', 'accepte', 'opportunite', 'indifferent']),
  q8_experience: z.enum(['zero', 'qq_mois', '1-3ans', '3-10ans', '10+ans', 'pro']),
  q9_temps_semaine: z.enum(['0min', '15min', '1h', '3-5h', '10h+']),
  q10_interdits_perso: z.array(z.enum(['crypto', 'actions_indiv', 'derives', 'leverage', 'quotidien'])).default([]),
  q11_perte_totale_tactique: z.enum(['oui', 'partiel', 'non']).default('non'),
  q12_accepte_education_seule: z.boolean(),
});

export type ReponsesValidated = z.infer<typeof ReponsesSchema>;
