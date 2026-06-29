// app/(onboarding)/_actions.ts — Server Actions onboarding
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §9.
// ReponsesSchema + genererRoutine importés des modules domaine reconstitués.
'use server';
import { cookies } from 'next/headers';
import { createServerActionClient } from '@/lib/supabase/server';
import { ReponsesSchema } from '@/lib/types/navlys-domain';
import { genererRoutine } from '@/lib/personalization-engine';
import { createHash } from 'crypto';

const ANSWERS_COOKIE = 'navlys_answers';

export async function saveCapReve(cap: string) {
  const supabase = createServerActionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('not authenticated');
  await supabase.from('cap_reve_objectifs').insert({
    user_id: user.id,
    cap_choisi: cap,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveAnswer(qid: string, value: any) {
  const c = cookies();
  const raw = c.get(ANSWERS_COOKIE)?.value;
  const obj = raw ? JSON.parse(raw) : {};
  obj[qid] = value;
  c.set(ANSWERS_COOKIE, JSON.stringify(obj), { httpOnly: true, sameSite: 'strict', secure: true });
}

export async function submitQuestionnaireIfComplete() {
  const c = cookies();
  const raw = c.get(ANSWERS_COOKIE)?.value;
  if (!raw) throw new Error('no answers');
  const parsed = ReponsesSchema.parse(JSON.parse(raw));
  const out = genererRoutine(parsed);
  if (out.statut === 'blocked') return out;

  const supabase = createServerActionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('not authenticated');

  const hash = createHash('sha256').update(JSON.stringify(parsed)).digest('hex');

  await supabase.from('profiles_user').insert({
    user_id: user.id,
    profil_id: out.profil!.id,
    profil_nom: out.profil!.nom,
    degre_interne: out.profil!.degre_interne,
    allocation_pct: out.allocation_cible_pct,
    cadence: out.cadence,
    strategies_actives: out.strategies_actives_autorisees,
    univers_actifs: out.univers_actifs_recommandes,
    interdits: out.interdits,
    alertes_psycho: out.alertes_psychologiques,
    perf_honnete: out.performance_honnete,
    questionnaire_raw: parsed,
    questionnaire_hash: hash,
  });

  c.delete(ANSWERS_COOKIE);
  return out;
}

export async function activateRoutine(tier: string) {
  const supabase = createServerActionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('not authenticated');
  await supabase.from('users').update({
    subscription_tier: tier,
    accepted_g1: true,
    accepted_g1_at: new Date().toISOString(),
    accepted_terms: true,
  }).eq('id', user.id);
}
