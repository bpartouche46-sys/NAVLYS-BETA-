"use client";

/**
 * PlanUnifieCard — Final card showing the composed plan.
 *
 * Pure presentational. Consumes a NavlysPlan and a locale.
 */

import { NavlysLocale, NavlysPlan } from "../lib/navlysBridge";

export interface PlanUnifieCardProps {
  readonly plan: NavlysPlan;
  readonly locale: NavlysLocale;
}

const ICE = "#7DD3FC";
const ICE_DIM = "#0E4F66";
const BG = "#000";
const TEXT = "#F2F4F7";
const TEXT_DIM = "#9AA3AF";

const t = (locale: NavlysLocale, fr: string, en: string): string =>
  locale === "fr" ? fr : en;

export function PlanUnifieCard(props: PlanUnifieCardProps): JSX.Element {
  const { plan, locale } = props;

  return (
    <div
      style={{
        background: BG,
        color: TEXT,
        border: `1px solid ${ICE}`,
        borderRadius: 12,
        padding: 20,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ color: ICE, fontSize: 12, letterSpacing: 2 }}>
        {t(locale, "TON PLAN UNIFIÉ", "YOUR UNIFIED PLAN")}
      </div>
      <h2 style={{ fontSize: 22, margin: "6px 0 16px" }}>
        {t(locale, "Cap", "Heading")} : {plan.objectif.montantCible} €{" "}
        <span style={{ color: TEXT_DIM, fontSize: 14 }}>
          ({plan.objectif.duree} {t(locale, "mois", "months")})
        </span>
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        <Tile
          label={t(locale, "Économies/an", "Savings/year")}
          value={`${plan.economiesAnnuelles} €`}
        />
        <Tile
          label={t(locale, "Mois gagnés", "Months saved")}
          value={`${plan.acceleration.moisGagnes}`}
        />
        <Tile
          label={t(locale, "Forteresse 90 %", "Fortress 90 %")}
          value={`${plan.partitionForcter90Actif10.forteresse} €`}
        />
        <Tile
          label={t(locale, "Voilier 10 %", "Sailboat 10 %")}
          value={`${plan.partitionForcter90Actif10.jeuActif} €`}
        />
        <Tile
          label={t(locale, "Marge max", "Max margin")}
          value={`${plan.margeProtectionMax} €`}
        />
        <Tile
          label={t(locale, "Stratégie", "Strategy")}
          value={plan.stratRecommandee}
        />
      </div>

      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: `1px solid ${ICE_DIM}`,
          color: TEXT_DIM,
          fontSize: 12,
        }}
      >
        {plan.disclaimer}
      </div>
    </div>
  );
}

interface TileProps {
  readonly label: string;
  readonly value: string;
}

function Tile(props: TileProps): JSX.Element {
  return (
    <div
      style={{
        background: "rgba(125, 211, 252, 0.06)",
        border: `1px solid ${ICE_DIM}`,
        borderRadius: 8,
        padding: 12,
      }}
    >
      <div style={{ fontSize: 11, color: TEXT_DIM, letterSpacing: 1 }}>
        {props.label.toUpperCase()}
      </div>
      <div style={{ fontSize: 18, color: ICE, marginTop: 4 }}>
        {props.value}
      </div>
    </div>
  );
}
