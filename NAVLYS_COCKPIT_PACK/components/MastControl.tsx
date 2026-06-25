/**
 * NAVLYS — MastControl
 * Un mât et ses voiles. Les voiles se gonflent (scaleX) selon le vent et la voilure.
 * - kind "grand"  -> grandes voiles, La Forteresse (90%)
 * - kind "artimon"-> petites voiles, Le Jeu Actif (10%)
 * TS strict.
 */
import { PALETTE, type Voilure } from "./types";

export type MastKind = "grand" | "artimon";

export interface MastControlProps {
  readonly kind: MastKind;
  /** vent normalisé 0..1 (issu de l'état marché) */
  readonly wind: number;
  /** exposition du jour */
  readonly voilure: Voilure;
  /** libellé court affiché (ex. "90%") */
  readonly badge: string;
}

/** Coefficient de gonflement de la voile, borné, dérivé du vent et de la voilure. */
export function sailInflation(wind: number, voilure: Voilure, kind: MastKind): number {
  const voilK: readonly [number, number, number] = [0.7, 0.9, 1.05];
  const base = kind === "grand" ? 0.62 : 0.55;
  const reach = kind === "grand" ? 0.45 : 0.40;
  const k = base + Math.max(0, Math.min(1, wind)) * reach * voilK[voilure];
  return Math.max(0.5, Math.min(1.1, k));
}

export default function MastControl(props: MastControlProps): JSX.Element {
  const { kind, wind, voilure, badge } = props;
  const k = sailInflation(wind, voilure, kind);
  const isGrand = kind === "grand";
  const mastH = isGrand ? 330 : 210;
  const luffing = k < 0.7;

  const mainStyle: React.CSSProperties = {
    transformBox: "fill-box",
    transformOrigin: "0% 100%",
    transform: `scaleX(${k.toFixed(3)})`,
    transition: "transform .8s cubic-bezier(.5,.05,.2,1)",
    animation: luffing ? "navlysLuff 2.4s ease-in-out infinite" : undefined,
  };
  const genoaStyle: React.CSSProperties = {
    transformBox: "fill-box",
    transformOrigin: "100% 100%",
    transform: `scaleX(${(k * 0.95).toFixed(3)})`,
    transition: "transform .8s cubic-bezier(.5,.05,.2,1)",
  };

  const mainPath = isGrand
    ? "M0,16 C95,70 120,230 70,322 L0,322 Z"
    : "M0,12 C40,40 52,120 30,196 L0,196 Z";
  const genoaPath = isGrand
    ? "M0,40 C-90,90 -112,240 -64,322 L0,322 Z"
    : "M0,30 C-34,60 -44,130 -22,196 L0,196 Z";

  return (
    <svg viewBox={`-130 0 260 ${mastH + 30}`} width="100%" role="img"
         aria-label={isGrand ? "Grand mât · La Forteresse" : "Artimon · Le Jeu Actif"}>
      <defs>
        <linearGradient id={`sail-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f7fb" />
          <stop offset="1" stopColor="#aebccf" />
        </linearGradient>
        <linearGradient id={`mast-${kind}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6e3f17" />
          <stop offset="0.5" stopColor={PALETTE.cuivre} />
          <stop offset="1" stopColor="#6e3f17" />
        </linearGradient>
      </defs>
      <style>{`@keyframes navlysLuff{0%,100%{filter:none}50%{filter:brightness(1.07)}}`}</style>
      <rect x={isGrand ? -6 : -4} y={0} width={isGrand ? 12 : 8} height={mastH} fill={`url(#mast-${kind})`} />
      <g style={genoaStyle}>
        <path d={genoaPath} fill={`url(#sail-${kind})`} opacity={0.9} />
      </g>
      <g style={mainStyle}>
        <path d={mainPath} fill={`url(#sail-${kind})`} />
      </g>
      <text x={20} y={isGrand ? 180 : 130} fill={PALETTE.ice} fontFamily="Georgia, serif" fontSize={isGrand ? 18 : 14}>
        {badge}
      </text>
    </svg>
  );
}
