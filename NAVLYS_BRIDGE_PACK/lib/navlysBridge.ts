/**
 * NAVLYS Bridge — Shared type contracts between the three modules.
 *
 * This file is the common dictionary used by:
 *   - Goal simulator (NAVLYS_OBJECTIF_PACK)
 *   - Revealed Margin (CHEVAL_TROIE_PACK)
 *   - Scientific Martingale (MARTINGALE_SCIENTIFIQUE_PACK)
 *
 * Strict typing, named exports only. No `any` anywhere.
 */

export type NavlysObjectifType =
  | "voyage"
  | "voiture"
  | "mariage"
  | "naissance"
  | "etudes"
  | "immo"
  | "retraite"
  | "imprevus"
  | "custom";

export type NavlysStrategie =
  | "martingale"
  | "kelly-plein"
  | "demi-kelly"
  | "quart-kelly"
  | "mise-fixe";

export interface NavlysObjectif {
  /** Type of goal, picks one of 8 preset lighthouses or 'custom'. */
  readonly type: NavlysObjectifType;
  /** Target amount in €. */
  readonly montantCible: number;
  /** Duration in months to reach the goal. */
  readonly duree: number;
  /** Annual expected return percentage, range 1 to 8. */
  readonly rendementPctAnnuel: number;
}

export interface NavlysFraisActuels {
  /** Broker slug, e.g. 'etoro', 'degiro', 'alpaca'. */
  readonly broker: string;
  /** Bank slug, e.g. 'boursorama', 'fortuneo', 'revolut'. */
  readonly banque: string;
  /** Number of trades per month. */
  readonly tradesParMois: number;
  /** Average ticket size in €. */
  readonly ticketMoyen: number;
  /** Monthly bank fees in €. */
  readonly fraisBanqueMensuels: number;
}

export interface NavlysAcceleration {
  /** Months saved by reinvesting fee savings. */
  readonly moisGagnes: number;
  /** Percentage faster than initial timeline. */
  readonly pctPlusVite: number;
}

export interface NavlysPartition {
  /** 90 % share in € — long-term ETF fortress. */
  readonly forteresse: number;
  /** 10 % share in € — active play sailboat. */
  readonly jeuActif: number;
}

export interface NavlysPlan {
  readonly objectif: NavlysObjectif;
  readonly fraisActuels: NavlysFraisActuels;
  /** Annual savings recovered by aligning broker + bank. */
  readonly economiesAnnuelles: number;
  /** Acceleration of the goal thanks to savings + 90/10. */
  readonly acceleration: NavlysAcceleration;
  /** Split between 90 % fortress and 10 % active play. */
  readonly partitionForcter90Actif10: NavlysPartition;
  /** Maximum protection margin on the active play (sailboat). */
  readonly margeProtectionMax: number;
  /** Default recommended strategy (best ROI / safety trade-off). */
  readonly stratRecommandee: NavlysStrategie;
  /** Permanent educational disclaimer. */
  readonly disclaimer: string;
}

/** Default disclaimer text in FR. */
export const DISCLAIMER_FR: string =
  "Information pédagogique. Tu restes seul décideur. Teste en simulation avant tout engagement réel.";

/** Default disclaimer text in EN. */
export const DISCLAIMER_EN: string =
  "Educational information. You remain the sole decision-maker. Test in simulation before any real commitment.";

/** Locale type. */
export type NavlysLocale = "fr" | "en";

/** Returns the disclaimer string for the given locale. */
export function getDisclaimer(locale: NavlysLocale): string {
  return locale === "fr" ? DISCLAIMER_FR : DISCLAIMER_EN;
}
