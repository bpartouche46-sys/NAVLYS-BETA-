/**
 * NAVLYS — planComposer
 *
 * Pure function that takes a goal + current fees state, and returns
 * a complete unified NavlysPlan. No side effect, deterministic.
 */

import {
  DISCLAIMER_FR,
  NavlysFraisActuels,
  NavlysObjectif,
  NavlysPartition,
  NavlysPlan,
  NavlysStrategie,
} from "./navlysBridge";

/**
 * Rough average fee rate per trade for high-fee brokers (€ per trade).
 * Calibrated against CHEVAL_TROIE_PACK reference formulas.
 */
const HIGH_FEE_BROKER_AVG_PER_TRADE_EUR: number = 5;

/**
 * Aligned setup (e.g. Alpaca-style) average fee rate per trade (€ per trade).
 */
const ALIGNED_BROKER_AVG_PER_TRADE_EUR: number = 0.5;

/**
 * Aligned bank average monthly cost (€/month).
 */
const ALIGNED_BANK_MONTHLY_EUR: number = 0;

/**
 * Active play share of capital (10 %).
 */
const ACTIVE_PLAY_RATIO: number = 0.1;

/**
 * Fortress share of capital (90 %).
 */
const FORTRESS_RATIO: number = 0.9;

/**
 * Protection margin ratio on the active play (visitor accepts to lose
 * up to 50 % of the sailboat without threatening the fortress).
 */
const PROTECTION_MARGIN_RATIO: number = 0.5;

/**
 * Default recommended strategy — half-Kelly is the best documented
 * trade-off between potential and safety margin.
 */
const DEFAULT_STRATEGY: NavlysStrategie = "demi-kelly";

/**
 * Computes annual fee savings from switching to an aligned setup.
 */
function calculerEconomiesAnnuelles(frais: NavlysFraisActuels): number {
  const fraisBrokerActuelsAnnuels =
    frais.tradesParMois * HIGH_FEE_BROKER_AVG_PER_TRADE_EUR * 12;
  const fraisBrokerAlignesAnnuels =
    frais.tradesParMois * ALIGNED_BROKER_AVG_PER_TRADE_EUR * 12;
  const fraisBanqueAnnuels = frais.fraisBanqueMensuels * 12;
  const fraisBanqueAlignesAnnuels = ALIGNED_BANK_MONTHLY_EUR * 12;

  const economies =
    fraisBrokerActuelsAnnuels -
    fraisBrokerAlignesAnnuels +
    (fraisBanqueAnnuels - fraisBanqueAlignesAnnuels);

  return Math.max(0, Math.round(economies));
}

/**
 * Computes acceleration of the goal thanks to reinvested savings.
 * Uses simplified compound logic: savings reduce the gap to target.
 */
function calculerAcceleration(
  obj: NavlysObjectif,
  economiesAnnuelles: number,
): { moisGagnes: number; pctPlusVite: number } {
  if (obj.montantCible <= 0 || obj.duree <= 0) {
    return { moisGagnes: 0, pctPlusVite: 0 };
  }

  const tauxMensuel = obj.rendementPctAnnuel / 100 / 12;
  const apportMensuelInitial = obj.montantCible / obj.duree;
  const economiesMensuelles = economiesAnnuelles / 12;
  const apportTotalAccelere = apportMensuelInitial + economiesMensuelles;

  // Simplified linear model — economies shorten the timeline proportionally.
  const ratio = apportMensuelInitial / apportTotalAccelere;
  const dureeAcceleree = obj.duree * ratio;
  const moisGagnesBruts = obj.duree - dureeAcceleree;

  // Compound interest gives a small additional boost (approximation).
  const boostCompose = 1 + tauxMensuel * obj.duree * 0.1;
  const moisGagnes = Math.round(moisGagnesBruts * boostCompose);
  const pctPlusVite = Math.round((moisGagnes / obj.duree) * 100);

  return {
    moisGagnes: Math.max(0, moisGagnes),
    pctPlusVite: Math.max(0, Math.min(pctPlusVite, 99)),
  };
}

/**
 * Computes the 90/10 partition based on the target amount.
 */
function calculerPartition(obj: NavlysObjectif): NavlysPartition {
  const total = obj.montantCible;
  return {
    forteresse: Math.round(total * FORTRESS_RATIO),
    jeuActif: Math.round(total * ACTIVE_PLAY_RATIO),
  };
}

/**
 * Composes the full unified plan from a goal and current fees state.
 */
export function composerPlan(
  obj: NavlysObjectif,
  frais: NavlysFraisActuels,
): NavlysPlan {
  const economiesAnnuelles = calculerEconomiesAnnuelles(frais);
  const acceleration = calculerAcceleration(obj, economiesAnnuelles);
  const partitionForcter90Actif10 = calculerPartition(obj);
  const margeProtectionMax = Math.round(
    partitionForcter90Actif10.jeuActif * PROTECTION_MARGIN_RATIO,
  );

  return {
    objectif: obj,
    fraisActuels: frais,
    economiesAnnuelles,
    acceleration,
    partitionForcter90Actif10,
    margeProtectionMax,
    stratRecommandee: DEFAULT_STRATEGY,
    disclaimer: DISCLAIMER_FR,
  };
}
