/**
 * NAVLYS — Cockpit · types partagés (TS strict)
 * Aucun `any`. Tous les états et props du cockpit sont typés ici.
 */

export type Lang = "fr" | "en";

export type Facing = "avant" | "arriere";

/** 0 = prudent · 1 = équilibré · 2 = agressif */
export type Voilure = 0 | 1 | 2;

/** Cap du jour — données de DÉMONSTRATION, fictives, jamais un signal réel. */
export interface Heading {
  /** ticker fictif (nom de vent), ex. "MISTRAL-7" */
  readonly label: string;
  /** prix d'entrée démo (€) */
  readonly entry: number;
  /** sortie visée, en % (ex. 2.5) */
  readonly targetExitPct: number;
}

/** État complet du cockpit. */
export interface CockpitState {
  /** capital total embarqué (€). Démo: 1000. */
  capital: number;
  /** part de la Forteresse, 0.80..0.95 (winch Allocation) */
  fortShare: number;
  /** part des plus-values reversée à la Forteresse, 0..1 (winch Réaffectation) */
  realloc: number;
  /** exposition du jour (winch Voilure) */
  voilure: Voilure;
  /** tendance du marché mondial simulée, -1..1 */
  market: number;
  /** orientation de la scène 360 */
  facing: Facing;
  /** capital de la Forteresse (€) */
  fort: number;
  /** capital du Jeu Actif (€) */
  actif: number;
  /** compteur de jours simulés */
  day: number;
  /** historique du capital total (pour la courbe / le sillage) */
  history: ReadonlyArray<number>;
  /** cap du jour affiché */
  heading: Heading;
}

/** Dictionnaire i18n minimal pour les libellés du cockpit. */
export interface CockpitStrings {
  readonly forteresse: string;
  readonly forteresseSub: string;
  readonly actif: string;
  readonly actifSub: string;
  readonly totalLab: string;
  readonly projLab: string;
  readonly winchAlloc: string;
  readonly winchRealloc: string;
  readonly winchVoilure: string;
  readonly voil: readonly [string, string, string];
  readonly meteoCap: string;
  readonly routeSteady: string;
  readonly capTitle: string;
  readonly capEntry: string;
  readonly capExit: string;
  readonly btnNewDay: string;
  readonly btnRotate: string;
  readonly viewAvant: string;
  readonly viewArriere: string;
  readonly signature: string;
  readonly disclaimer: string;
}

/** Palette stricte NAVLYS (référence partagée). */
export const PALETTE = {
  bronze: "#B87333",
  cuivre: "#D49B5B",
  ice: "#7DD3FC",
  noir: "#000000",
  nuit: "#0B1220",
  perle: "#E5E7EB",
  dim: "#9aa6b6",
  corail: "#e07a5f",
} as const;

export type Palette = typeof PALETTE;

/** Amplitude (volatilité) du Jeu Actif par cran de voilure. */
export const VOILURE_FACTOR: readonly [number, number, number] = [0.6, 1.0, 1.7];

/** Bornes du rendement journalier simulé du Jeu Actif. */
export const ACTIVE_RETURN_BOUNDS = { min: -0.06, max: 0.08 } as const;
