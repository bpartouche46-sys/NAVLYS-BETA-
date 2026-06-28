// NAVLYS · Pack OBJECTIF · lib/objectif.ts
// Pure math for the homepage goal simulator.
// All functions are deterministic and have no side effects.

export type Mode = "monthly" | "final" | "duration";

export interface Inputs {
  startAmount: number;     // mise de départ (€)
  monthly: number;         // versement mensuel (€)
  goalAmount: number;      // objectif (€)
  durationMonths: number;  // durée (mois)
  annualYieldPct: number;  // rendement annuel espéré (%)
}

function monthlyRate(annualYieldPct: number): number {
  // Conversion taux annuel -> mensuel équivalent (composé).
  return Math.pow(1 + annualYieldPct / 100, 1 / 12) - 1;
}

/**
 * Mode B: calculer le capital final.
 * FV = PV*(1+r)^n + PMT * [((1+r)^n - 1) / r]
 */
export function computeFinal(inp: Inputs): number {
  const r = monthlyRate(inp.annualYieldPct);
  const n = inp.durationMonths;
  if (r === 0) {
    return inp.startAmount + inp.monthly * n;
  }
  const growth = Math.pow(1 + r, n);
  return inp.startAmount * growth + inp.monthly * ((growth - 1) / r);
}

/**
 * Mode A: calculer la mensualité nécessaire.
 * PMT = (FV - PV*(1+r)^n) / [((1+r)^n - 1) / r]
 */
export function computeMonthly(inp: Inputs): number {
  const r = monthlyRate(inp.annualYieldPct);
  const n = inp.durationMonths;
  if (n <= 0) return 0;
  if (r === 0) {
    return (inp.goalAmount - inp.startAmount) / n;
  }
  const growth = Math.pow(1 + r, n);
  return (inp.goalAmount - inp.startAmount * growth) / ((growth - 1) / r);
}

/**
 * Mode C: calculer la durée nécessaire (en mois).
 * n = log( (FV*r + PMT) / (PV*r + PMT) ) / log(1+r)
 */
export function computeDurationMonths(inp: Inputs): number {
  const r = monthlyRate(inp.annualYieldPct);
  if (inp.monthly <= 0 && inp.startAmount <= 0) return Infinity;
  if (r === 0) {
    if (inp.monthly <= 0) return Infinity;
    return Math.max(0, (inp.goalAmount - inp.startAmount) / inp.monthly);
  }
  const num = inp.goalAmount * r + inp.monthly;
  const den = inp.startAmount * r + inp.monthly;
  if (num <= 0 || den <= 0 || num <= den) return Infinity;
  return Math.log(num / den) / Math.log(1 + r);
}

export const GOAL_PRESETS: { key: string; label: string; defaultAmount: number; emoji: string }[] = [
  { key: "voyage",    label: "Un voyage",                 defaultAmount: 3000,   emoji: "✈️" },
  { key: "voiture",   label: "Une voiture",               defaultAmount: 15000,  emoji: "🚗" },
  { key: "mariage",   label: "Un mariage",                defaultAmount: 20000,  emoji: "💍" },
  { key: "naissance", label: "L'arrivée d'un enfant",     defaultAmount: 10000,  emoji: "👶" },
  { key: "etudes",    label: "Les études des enfants",    defaultAmount: 40000,  emoji: "🎓" },
  { key: "immo",      label: "Un apport immobilier",      defaultAmount: 50000,  emoji: "🏠" },
  { key: "retraite",  label: "Une retraite tranquille",   defaultAmount: 100000, emoji: "🌿" },
  { key: "imprevu",   label: "Pour les imprévus",         defaultAmount: 10000,  emoji: "🛟" },
];

export function fmtEUR(n: number): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €";
}

export function fmtMonths(m: number): string {
  if (!isFinite(m)) return "—";
  if (m < 12) return `${Math.round(m)} mois`;
  const years = Math.floor(m / 12);
  const rest = Math.round(m - years * 12);
  if (rest === 0) return `${years} ${years > 1 ? "ans" : "an"}`;
  return `${years} ${years > 1 ? "ans" : "an"} et ${rest} mois`;
}
