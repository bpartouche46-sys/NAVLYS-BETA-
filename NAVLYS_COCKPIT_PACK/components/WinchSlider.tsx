/**
 * NAVLYS — WinchSlider
 * Un winch = un curseur bronze "à portée de main".
 * Sert pour l'allocation (90/10) et la réaffectation des plus-values (%).
 * TS strict — aucune prop optionnelle non typée.
 */
import { useId } from "react";
import { PALETTE } from "./types";

export interface WinchSliderProps {
  /** libellé affiché à gauche */
  readonly label: string;
  /** valeur courante */
  readonly value: number;
  /** bornes */
  readonly min: number;
  readonly max: number;
  readonly step: number;
  /** texte de sortie affiché à droite (déjà formaté, ex. "90 / 10" ou "50 %") */
  readonly output: string;
  /** callback de changement */
  readonly onChange: (value: number) => void;
  /** légende basse optionnelle (gauche / droite) */
  readonly scaleLeft?: string;
  readonly scaleRight?: string;
}

export default function WinchSlider(props: WinchSliderProps): JSX.Element {
  const {
    label, value, min, max, step, output, onChange, scaleLeft, scaleRight,
  } = props;
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;

  const trackStyle: React.CSSProperties = {
    width: "100%",
    height: 12,
    borderRadius: 999,
    border: `1px solid rgba(184,115,51,.45)`,
    background:
      `linear-gradient(90deg, ${PALETTE.bronze} ${fill}%, #12203a ${fill}%)`,
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, fontWeight: 700, color: PALETTE.perle }}>
          <span aria-hidden style={{
            width: 20, height: 20, borderRadius: "50%",
            background: `radial-gradient(circle at 35% 30%, #f0c79a, ${PALETTE.bronze} 60%, #5c3514)`,
            boxShadow: "inset -2px -2px 4px rgba(0,0,0,.5)",
          }} />
          <label htmlFor={id}>{label}</label>
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: PALETTE.ice, fontVariantNumeric: "tabular-nums" }}>
          {output}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        style={trackStyle}
      />
      {(scaleLeft !== undefined || scaleRight !== undefined) && (
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: PALETTE.dim }}>
          <span>{scaleLeft ?? ""}</span>
          <span>{scaleRight ?? ""}</span>
        </div>
      )}
    </div>
  );
}
