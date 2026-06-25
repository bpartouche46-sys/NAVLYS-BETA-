// =============================================================================
// NAVLYS — Mapping centralisé des prix
// Source unique de vérité côté app. Utilise lookup_keys Stripe (pas d'IDs en dur).
// =============================================================================

export type NavlysPlan = "monthly" | "annual" | "bio_live";

export interface NavlysPlanConfig {
  /** Clé technique. */
  plan: NavlysPlan;
  /** Lookup key Stripe (source unique de vérité côté Stripe). */
  lookupKey: string;
  /** Libellé public FR. */
  labelFr: string;
  /** Libellé public EN. */
  labelEn: string;
  /** Prix en cents EUR. */
  unitAmountCents: number;
  /** Mode Checkout (abonnement vs paiement unique). */
  mode: "subscription" | "payment";
  /** Inclut envoi pièce de bronze ? */
  includesBronzeCoin: boolean;
  /** Texte argument FR. */
  pitchFr: string;
  /** Texte argument EN. */
  pitchEn: string;
}

export const NAVLYS_PLANS: Record<NavlysPlan, NavlysPlanConfig> = {
  monthly: {
    plan: "monthly",
    lookupKey: "navlys_monthly",
    labelFr: "Cap mensuel",
    labelEn: "Monthly cap",
    unitAmountCents: 4900,
    mode: "subscription",
    includesBronzeCoin: false,
    pitchFr: "Embarque mois après mois. Largue les amarres quand tu veux.",
    pitchEn: "Board month by month. Cast off whenever you want.",
  },
  annual: {
    plan: "annual",
    lookupKey: "navlys_annual",
    labelFr: "Cap annuel + pièce de bronze",
    labelEn: "Annual cap + bronze coin",
    unitAmountCents: 49000,
    mode: "subscription",
    includesBronzeCoin: true,
    pitchFr:
      "Économise 98 €. Reçois chez toi la pièce de bronze NAVLYS frappée à la main, série numérotée. Ta première ancre.",
    pitchEn:
      "Save 98 €. Receive the hand-struck NAVLYS bronze coin at home, numbered series. Your first anchor.",
  },
  bio_live: {
    plan: "bio_live",
    lookupKey: "navlys_bio_live",
    labelFr: "Bio Live — accès à vie",
    labelEn: "Bio Live — lifetime access",
    unitAmountCents: 3900,
    mode: "payment",
    includesBronzeCoin: false,
    pitchFr: "Un paiement, plateforme à vie. Les mises à jour suivent le vent.",
    pitchEn: "One payment, lifetime platform. Updates ride the wind.",
  },
};

export function planFromString(value: string): NavlysPlan | null {
  if (value === "monthly" || value === "annual" || value === "bio_live") {
    return value;
  }
  return null;
}

export function formatEuro(cents: number, locale: "fr-FR" | "en-GB" = "fr-FR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
