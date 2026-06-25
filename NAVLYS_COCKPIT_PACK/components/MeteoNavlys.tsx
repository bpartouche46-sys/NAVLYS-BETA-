/**
 * NAVLYS — MeteoNavlys
 * Le cadran météo (le grand vent du marché, qui oscille) face à TA route (fixe).
 * Le contraste est le message : le vent change, ton cap non.
 * TS strict.
 */
import { PALETTE } from "./types";

export interface MeteoNavlysProps {
  /** tendance marché -1..1 */
  readonly market: number;
  /** libellé "le grand vent global" */
  readonly windLabel: string;
  /** libellé "ta route tenue" */
  readonly routeLabel: string;
  /** état texte (ex. "Hausse modérée") déjà localisé */
  readonly marketStateText: string;
}

export default function MeteoNavlys(props: MeteoNavlysProps): JSX.Element {
  const { market, windLabel, routeLabel, marketStateText } = props;
  const angle = Math.max(-1, Math.min(1, market)) * 80; // -80..+80 deg
  const stateColor = market > 0.2 ? PALETTE.ice : market < -0.2 ? PALETTE.corail : PALETTE.dim;

  return (
    <div style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
      {/* Cadran marché (oscille) */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <svg viewBox="0 0 200 130" style={{ width: "100%", maxWidth: 190 }} role="img" aria-label="Cadran météo marché">
          <path d="M20,120 A80,80 0 0 1 180,120" fill="none" stroke="#12203a" strokeWidth={14} strokeLinecap="round" />
          <path d="M20,120 A80,80 0 0 1 73,52" fill="none" stroke={PALETTE.corail} strokeWidth={14} strokeLinecap="round" />
          <path d="M73,52 A80,80 0 0 1 127,52" fill="none" stroke="#9aa6b6" strokeWidth={14} />
          <path d="M127,52 A80,80 0 0 1 180,120" fill="none" stroke={PALETTE.ice} strokeWidth={14} strokeLinecap="round" />
          <g style={{ transformBox: "fill-box", transformOrigin: "50% 100%", transition: "transform .8s cubic-bezier(.5,.05,.2,1)" }}
             transform={`rotate(${angle} 100 120)`}>
            <polygon points="100,46 105,120 95,120" fill={PALETTE.cuivre} />
          </g>
          <circle cx={100} cy={120} r={8} fill={PALETTE.cuivre} stroke="#1a0e03" strokeWidth={2} />
        </svg>
        <div style={{ fontSize: 11, color: PALETTE.dim, textAlign: "center" }}>{windLabel}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: stateColor }}>{marketStateText}</div>
      </div>

      {/* Ta route (fixe) */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <svg viewBox="0 0 200 130" style={{ width: "100%", maxWidth: 190 }} role="img" aria-label="Ta route tenue">
          <circle cx={100} cy={95} r={58} fill="none" stroke="#12203a" strokeWidth={10} />
          <circle cx={100} cy={95} r={58} fill="none" stroke="rgba(184,115,51,.5)" strokeWidth={2} strokeDasharray="2 7" />
          <g transform="rotate(0 100 95)">
            <polygon points="100,40 106,95 94,95" fill={PALETTE.ice} />
            <polygon points="100,150 106,95 94,95" fill="#6e3f17" />
          </g>
          <circle cx={100} cy={95} r={7} fill={PALETTE.cuivre} stroke="#1a0e03" strokeWidth={2} />
          <text x={100} y={30} textAnchor="middle" fill={PALETTE.ice} fontSize={10} fontFamily="Georgia, serif">N</text>
        </svg>
        <div style={{ fontSize: 11, color: PALETTE.dim, textAlign: "center" }}>{routeLabel}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: PALETTE.cuivre }}>—</div>
      </div>
    </div>
  );
}
