/**
 * NAVLYS — leadCapture helpers
 *
 * Client-side helpers for capturing the visitor's email and sharing
 * the plan via WhatsApp.
 */

import { NavlysLocale, NavlysPlan } from "./navlysBridge";

/** Simple email regex — sober, not exhaustive. */
const EMAIL_REGEX: RegExp =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns true if the email string looks valid. */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Composes a short, shareable summary of a plan for messaging apps.
 */
export function planToMessage(
  plan: NavlysPlan,
  locale: NavlysLocale,
): string {
  if (locale === "fr") {
    return [
      `NAVLYS — mon plan`,
      `Cap : ${plan.objectif.montantCible} € sur ${plan.objectif.duree} mois.`,
      `Économies de frais : ${plan.economiesAnnuelles} €/an.`,
      `Délai accéléré de ${plan.acceleration.moisGagnes} mois (${plan.acceleration.pctPlusVite} % plus vite).`,
      `Forteresse 90 % : ${plan.partitionForcter90Actif10.forteresse} €.`,
      `Voilier 10 % : ${plan.partitionForcter90Actif10.jeuActif} €.`,
      `Stratégie : ${plan.stratRecommandee}.`,
      ``,
      plan.disclaimer,
    ].join("\n");
  }
  return [
    `NAVLYS — my plan`,
    `Heading: ${plan.objectif.montantCible} € over ${plan.objectif.duree} months.`,
    `Fee savings: ${plan.economiesAnnuelles} €/year.`,
    `Timeline accelerated by ${plan.acceleration.moisGagnes} months (${plan.acceleration.pctPlusVite} % faster).`,
    `Fortress 90 %: ${plan.partitionForcter90Actif10.forteresse} €.`,
    `Sailboat 10 %: ${plan.partitionForcter90Actif10.jeuActif} €.`,
    `Strategy: ${plan.stratRecommandee}.`,
    ``,
    plan.disclaimer,
  ].join("\n");
}

/**
 * Builds the WhatsApp share URL for a plan.
 */
export function whatsAppShareUrl(
  plan: NavlysPlan,
  locale: NavlysLocale,
): string {
  const text = encodeURIComponent(planToMessage(plan, locale));
  return `https://wa.me/?text=${text}`;
}

export interface PlanSavePayload {
  readonly plan: NavlysPlan;
  readonly email: string;
  readonly consent: boolean;
  readonly locale: NavlysLocale;
}

export interface PlanSaveResponse {
  readonly ok: boolean;
  readonly reason?: string;
}

/**
 * Sends the plan + email to the API route /api/plan-save.
 */
export async function savePlan(
  payload: PlanSavePayload,
): Promise<PlanSaveResponse> {
  if (!isValidEmail(payload.email)) {
    return { ok: false, reason: "invalid-email" };
  }
  if (!payload.consent) {
    return { ok: false, reason: "consent-required" };
  }
  try {
    const res = await fetch("/api/plan-save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as PlanSaveResponse;
    return data;
  } catch {
    return { ok: false, reason: "network-error" };
  }
}
