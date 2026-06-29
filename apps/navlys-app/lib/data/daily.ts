// lib/data/daily.ts
// ⚠️ STUB — NON documenté dans les sources. Le dashboard (app/dashboard/page.tsx)
// appelle getDailyAction(profile) et lit { action, drift_pct, drift_ok, carte }.
// Le contenu RÉEL (génération de l'action du jour, calcul de drift d'allocation,
// banque de "cartes du jour") manque et requiert le vrai projet de Bruno.
// Voir README.md §Manquant. Ne pas livrer en prod tel quel.
//
// TODO(Bruno) : remplacer ce stub par la vraie logique
//   - calcul du drift d'allocation réel (positions vs allocation cible)
//   - sélection déterministe de l'"action du jour" selon le profil + la cadence
//   - banque de cartes (citations / rappels G1) sourcée
import type { SortieRoutine } from '@/lib/types/navlys-domain';

export interface DailyAction {
  action: string;
  drift_pct: number;
  drift_ok: boolean;
  carte: string;
}

/**
 * STUB déterministe sans dépendance externe — placeholder éducatif uniquement.
 * Aucune promesse de rendement, aucun conseil personnalisé.
 */
export async function getDailyAction(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _profile: SortieRoutine | Record<string, any>,
): Promise<DailyAction> {
  // TODO(Bruno) : brancher sur les vraies données (Supabase routines / positions).
  return {
    action: "Aujourd'hui : rien à faire. Garde le cap, respecte ta cadence.",
    drift_pct: 0,
    drift_ok: true,
    carte: "L'IA est le vent, c'est toi qui tiens la barre.",
  };
}
