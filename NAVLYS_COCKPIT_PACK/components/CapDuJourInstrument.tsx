/**
 * NAVLYS — CapDuJourInstrument
 * L'instrument central : compas à médaillon bronze (la pièce qui tourne)
 * + la carte "Cap du jour : [ticker] · Entrée [prix] · Sortie visée +X %".
 * Données de DÉMONSTRATION, fictives. TS strict.
 */
import { PALETTE, type Heading, type Lang } from "./types";

export interface CapDuJourInstrumentProps {
  readonly heading: Heading;
  readonly lang: Lang;
  readonly title: string;     // "Cap du jour"
  readonly entryLabel: string; // "Entrée"
  readonly exitLabel: string;  // "Sortie visée"
}

function formatEUR(n: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n) + " €";
}

function formatPct(n: number, lang: Lang): string {
  const s = n.toFixed(1).replace(".", lang === "fr" ? "," : ".");
  return `+${s} %`;
}

export default function CapDuJourInstrument(props: CapDuJourInstrumentProps): JSX.Element {
  const { heading, lang, title, entryLabel, exitLabel } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      {/* Compas à médaillon bronze (pièce NAVLYS qui tourne) */}
      <svg viewBox="0 0 120 120" width={96} height={96} role="img" aria-label="Compas NAVLYS — cap du jour">
        <defs>
          <radialGradient id="coinC" cx="38%" cy="32%" r="72%">
            <stop offset="0" stopColor="#f6d6ad" />
            <stop offset="0.4" stopColor={PALETTE.cuivre} />
            <stop offset="0.75" stopColor={PALETTE.bronze} />
            <stop offset="1" stopColor="#5c3514" />
          </radialGradient>
        </defs>
        <circle cx={60} cy={60} r={54} fill="#06101e" stroke={PALETTE.bronze} strokeWidth={3} />
        <polygon points="60,16 66,60 54,60" fill={PALETTE.ice} />
        <polygon points="60,104 66,60 54,60" fill="#6e3f17" />
        <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
          <circle cx={60} cy={60} r={22} fill="url(#coinC)" stroke="#3a2207" strokeWidth={2} />
          <text x={60} y={64} textAnchor="middle" fill="#3a2207" fontFamily="Georgia, serif"
                fontWeight={700} fontSize={8} letterSpacing="1">NAVLYS</text>
          <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="8s" repeatCount="indefinite" />
        </g>
      </svg>

      <div style={{
        textAlign: "center", width: "100%",
        background: "linear-gradient(180deg, rgba(6,16,30,.86), rgba(6,16,30,.66))",
        border: "1px solid rgba(184,115,51,.5)", borderRadius: 14, padding: "10px 14px",
      }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: PALETTE.bronze, textTransform: "uppercase" }}>{title}</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 26, letterSpacing: 2, color: PALETTE.perle, margin: "2px 0 4px" }}>
          {heading.label}
        </div>
        <div style={{ fontSize: 12.5, color: PALETTE.dim }}>
          {entryLabel} <b style={{ color: PALETTE.ice }}>{formatEUR(heading.entry, lang)}</b>
          {" · "}
          {exitLabel} <span style={{ color: PALETTE.ice, fontWeight: 700 }}>{formatPct(heading.targetExitPct, lang)}</span>
        </div>
      </div>
    </div>
  );
}
