// lib/personalization-engine.ts — moteur de personnalisation NAVLYS (portage M3)
// Reconstitué VERBATIM depuis _APP_CLIENT_PERSONALIZATION_TS.md §4.
// Sortie JSON identique au Python de référence (4 personas de test Jest).
import {
  PROFILS, ROUTINES_FILES, ALERTES_PSYCHO, DISCLAIMER_UNIVERSEL,
} from './profiles-catalog';
import type {
  Reponses, SortieRoutine, Allocation, ProfilId, DegreInterne,
} from './types/navlys-domain';

type BiasVector = Record<1 | 2 | 3 | 4 | 5 | 6 | 7, number>;

interface DebugInfo {
  bias: BiasVector;
  horizon_short: boolean;
  no_time: boolean;
  panic: boolean;
}

function calculerProfil(r: Reponses): { profil_id: ProfilId; degre: DegreInterne; debug: DebugInfo | { raison: string } } {
  if (!r.q12_accepte_education_seule) {
    return {
      profil_id: 0, degre: 'blocked',
      debug: { raison: 'Q12 refusé — NAVLYS = éducation seule, pas de conseil.' },
    };
  }

  const bias: BiasVector = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

  // ── Q1 âge ──
  if (r.q1_age <= 25) { bias[4] += 3; bias[7] += 1; }
  else if (r.q1_age <= 35) { bias[3] += 2; bias[5] += 2; }
  else if (r.q1_age <= 50) { bias[2] += 2; bias[3] += 1; bias[6] += 1; }
  else if (r.q1_age <= 65) { bias[1] += 1; bias[6] += 2; }
  else { bias[1] += 3; }

  // ── Q2 situation ──
  const mapQ2: Record<string, Partial<BiasVector>> = {
    etudiant: { 4: 3, 7: 2 },
    salarie: { 2: 2, 5: 1, 6: 1 },
    freelance: { 5: 3, 3: 1 },
    entrepreneur: { 3: 3, 6: 2 },
    retraite: { 1: 3 },
    sans_emploi: { 4: 2, 5: 2 },
  };
  applyMap(bias, mapQ2[r.q2_situation]);

  // ── Q3 capital (×2.5) ──
  if (r.q3_capital < 5_000) { bias[4] += 3 * 2.5; bias[7] += 1 * 2.5; }
  else if (r.q3_capital < 20_000) { bias[5] += 2 * 2.5; bias[7] += 1 * 2.5; }
  else if (r.q3_capital < 100_000) { bias[2] += 2 * 2.5; bias[3] += 1 * 2.5; bias[5] += 1 * 2.5; }
  else if (r.q3_capital < 500_000) { bias[1] += 1 * 2.5; bias[3] += 2 * 2.5; bias[6] += 2 * 2.5; }
  else { bias[1] += 2 * 2.5; bias[6] += 3 * 2.5; }

  // ── Q4 DCA ──
  if (r.q4_dca_mensuel < 100) { bias[4] += 1; bias[5] += 1; }
  else if (r.q4_dca_mensuel < 500) { bias[2] += 1; bias[5] += 1; }
  else if (r.q4_dca_mensuel < 2_000) { bias[2] += 2; bias[3] += 1; }
  else { bias[3] += 2; bias[6] += 2; }

  // ── Q5 objectif ──
  const mapQ5: Record<string, Partial<BiasVector>> = {
    securiser: { 1: 3, 5: 2 },
    grandir: { 2: 2, 3: 2 },
    projet_court: { 1: 2, 5: 2 },
    retraite: { 1: 2, 2: 2 },
    apprendre: { 4: 3, 7: 3 },
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
    panique: { 1: 3, 4: 1 },
    inquiet: { 1: 2, 2: 1, 5: 1 },
    accepte: { 2: 1, 5: 1 },
    opportunite: { 3: 2, 6: 2 },
    indifferent: { 2: 1, 3: 1, 6: 1 },
  };
  applyMap(bias, mapQ7[r.q7_reaction_perte]);
  const panic = r.q7_reaction_perte === 'panique';

  // ── Q8 expérience ──
  const mapQ8: Record<string, Partial<BiasVector>> = {
    zero: { 4: 3, 7: 2 },
    qq_mois: { 4: 2, 5: 1 },
    '1-3ans': { 2: 2, 5: 1 },
    '3-10ans': { 3: 2, 6: 1 },
    '10+ans': { 6: 3 },
    pro: { 6: 4 },
  };
  applyMap(bias, mapQ8[r.q8_experience]);

  // ── Q9 temps ──
  const no_time = r.q9_temps_semaine === '0min';
  const mapQ9: Record<string, Partial<BiasVector>> = {
    '0min': { 1: 2, 4: 2 },
    '15min': { 2: 2, 5: 2 },
    '1h': { 2: 1, 3: 1 },
    '3-5h': { 3: 2, 6: 2 },
    '10h+': { 6: 3, 7: 2 },
  };
  applyMap(bias, mapQ9[r.q9_temps_semaine]);

  // ── Q11 appétence perte tactique ──
  if (r.q11_perte_totale_tactique === 'non') {
    bias[3] *= 0.5;
    bias[6] *= 0.7;
    bias[1] += 2; bias[2] += 1; bias[5] += 1;
  }

  let profil_id = (Object.keys(bias) as unknown as (1 | 2 | 3 | 4 | 5 | 6 | 7)[])
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
  for (const k of Object.keys(m) as unknown as (1 | 2 | 3 | 4 | 5 | 6 | 7)[]) {
    bias[k] += m[k]!;
  }
}

function ajusterAllocation(profil_id: 1 | 2 | 3 | 4 | 5 | 6 | 7, degre: DegreInterne): Allocation {
  const base: Allocation = { ...PROFILS[profil_id].allocation_cible };
  if (profil_id === 1 || profil_id === 4 || profil_id === 7) return base;
  if (degre === 'defensive' && base.tactique !== undefined) {
    const delta = Math.min(10, base.tactique ?? 0);
    base.tactique = (base.tactique ?? 0) - delta;
    base.prudent = (base.prudent ?? 0) + delta;
  } else if (degre === 'aggressive' && base.tactique !== undefined) {
    const delta = Math.min(10, base.prudent ?? 0);
    base.prudent = (base.prudent ?? 0) - delta;
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
  const p = PROFILS[profil_id as 1 | 2 | 3 | 4 | 5 | 6 | 7];
  const allocation_finale = ajusterAllocation(profil_id as 1 | 2 | 3 | 4 | 5 | 6 | 7, degre);

  const interdits = [...p.interdits_specifiques];
  const mapQ10: Record<string, string> = {
    crypto: 'Pas de crypto (préférence personnelle)',
    actions_indiv: "Pas d'actions individuelles (préférence personnelle)",
    derives: 'Pas de produits dérivés (préférence personnelle)',
    leverage: 'Pas de leverage (préférence personnelle)',
    quotidien: 'Pas de stratégie active quotidienne (préférence personnelle)',
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
    routine_resume: ROUTINES_FILES[profil_id as 1 | 2 | 3 | 4 | 5 | 6 | 7],
    performance_honnete: {
      cagr_pct_min: p.cagr_pct_min,
      cagr_pct_max: p.cagr_pct_max,
      volatilite_estimee_pct: p.volatilite_pct,
      probabilite_perte_20pct_an: p.proba_perte_20pct_an,
      horizon_recommande_min_annees: p.horizon_min_annees,
      pire_annee_plausible_pct: p.pire_annee_pct,
    },
    interdits,
    alertes_psychologiques: ALERTES_PSYCHO[profil_id as 1 | 2 | 3 | 4 | 5 | 6 | 7],
    disclaimer: DISCLAIMER_UNIVERSEL,
  };
}
