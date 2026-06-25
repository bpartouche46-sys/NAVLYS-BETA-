/**
 * NAVLYS — Cockpit
 * Conteneur principal : détient l'état, orchestre la scène 360, les mâts,
 * les winchs, la météo et l'instrument central. Données de DÉMONSTRATION.
 * TS strict — aucun `any`.
 *
 * Dépendances : React 18+. Aucun style externe requis.
 */
import { useCallback, useMemo, useState } from "react";
import {
  PALETTE,
  VOILURE_FACTOR,
  ACTIVE_RETURN_BOUNDS,
  type CockpitState,
  type CockpitStrings,
  type Lang,
  type Voilure,
  type Heading,
} from "./types";
import MastControl from "./MastControl";
import WinchSlider from "./WinchSlider";
import MeteoNavlys from "./MeteoNavlys";
import CapDuJourInstrument from "./CapDuJourInstrument";

const TICKERS: readonly string[] = [
  "MISTRAL-7", "ZÉPHYR-3", "TRAMONTANE-9", "ALIZÉ-5", "BORÉE-2", "SIROCCO-6", "NORDET-4",
];

function rnd(a: number, b: number): number {
  return a + Math.random() * (b - a);
}

function makeHeading(): Heading {
  const label = TICKERS[Math.floor(Math.random() * TICKERS.length)] ?? "MISTRAL-7";
  return { label, entry: rnd(40, 220), targetExitPct: rnd(1.5, 3.5) };
}

const INITIAL: CockpitState = {
  capital: 1000,
  fortShare: 0.9,
  realloc: 0.5,
  voilure: 1,
  market: 0.4,
  facing: "avant",
  fort: 900,
  actif: 100,
  day: 0,
  history: [1000],
  heading: { label: "MISTRAL-7", entry: 128.4, targetExitPct: 2.5 },
};

export interface CockpitProps {
  readonly lang: Lang;
  readonly strings: CockpitStrings;
  /** désactive les animations lourdes (prefers-reduced-motion) */
  readonly reducedMotion?: boolean;
}

function fmtEUR(n: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US", { maximumFractionDigits: 0 })
    .format(Math.round(n)) + " €";
}

export default function Cockpit(props: CockpitProps): JSX.Element {
  const { lang, strings, reducedMotion = false } = props;
  const [s, setS] = useState<CockpitState>(INITIAL);

  const fortPct = Math.round((s.fort / s.capital) * 100);
  const wind = (s.market + 1) / 2;

  /** Avance d'une journée (simulation bornée, démo). */
  const newDay = useCallback((): void => {
    setS((prev) => {
      const market = Math.max(-1, Math.min(1, prev.market + rnd(-0.45, 0.45)));
      const fortGrown = prev.fort * Math.pow(1.05, 1 / 365);
      const vf = VOILURE_FACTOR[prev.voilure];
      const mean = market * 0.012 * vf;
      const vol = 0.02 * vf;
      const ret = Math.max(ACTIVE_RETURN_BOUNDS.min, Math.min(ACTIVE_RETURN_BOUNDS.max, mean + rnd(-vol, vol)));
      let actif = prev.actif * (1 + ret);
      let fort = fortGrown;
      const gain = actif - prev.actif;
      if (gain > 0) {
        const moved = gain * prev.realloc;
        actif -= moved;
        fort += moved;
      }
      const capital = fort + actif;
      const history = [...prev.history, capital].slice(-120);
      return { ...prev, market, fort, actif, capital, history, day: prev.day + 1, heading: makeHeading() };
    });
  }, []);

  const setAlloc = useCallback((fortPctValue: number): void => {
    setS((prev) => {
      const fortShare = fortPctValue / 100;
      return { ...prev, fortShare, fort: prev.capital * fortShare, actif: prev.capital * (1 - fortShare) };
    });
  }, []);

  const setRealloc = useCallback((pct: number): void => {
    setS((prev) => ({ ...prev, realloc: pct / 100 }));
  }, []);

  const setVoilure = useCallback((v: Voilure): void => {
    setS((prev) => ({ ...prev, voilure: v }));
  }, []);

  const rotate = useCallback((): void => {
    setS((prev) => ({ ...prev, facing: prev.facing === "avant" ? "arriere" : "avant" }));
  }, []);

  const flipped = s.facing === "arriere";

  // projection 1 an (déterministe, démo)
  const projection = useMemo<number>(() => {
    const annual: readonly [number, number, number] = [0.04, 0.1, 0.2];
    const actAnnual = annual[s.voilure] * (0.6 + 0.4 * wind);
    return s.fort * 1.05 + s.actif * (1 + actAnnual);
  }, [s.fort, s.actif, s.voilure, wind]);

  const marketStateText =
    s.market > 0.2 ? (lang === "fr" ? "Hausse modérée" : "Moderate rise")
    : s.market < -0.2 ? (lang === "fr" ? "Risée de baisse" : "Bearish gust")
    : (lang === "fr" ? "Vent stable" : "Steady wind");

  return (
    <div style={{ color: PALETTE.perle, fontFamily: "system-ui, sans-serif" }}>
      {/* Barre d'action */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: 18, letterSpacing: 2, color: PALETTE.ice }}>
          {flipped ? strings.viewArriere : strings.viewAvant}
        </span>
        <span style={{ display: "flex", gap: 8 }}>
          <button onClick={newDay} style={btn(true)}>{strings.btnNewDay}</button>
          <button onClick={rotate} style={btn(false)}>{strings.btnRotate}</button>
        </span>
      </div>

      {/* Scène 360 : deux faces */}
      <div style={{ perspective: 1600, borderRadius: 18, overflow: "hidden", border: "1px solid rgba(184,115,51,.5)", background: PALETTE.noir, minHeight: 320 }}>
        <div style={{
          position: "relative", transformStyle: "preserve-3d",
          transition: reducedMotion ? undefined : "transform 1.15s cubic-bezier(.6,.02,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", minHeight: 320,
        }}>
          {/* Face avant : grand mât 90% */}
          <div style={faceStyle(false)}>
            <MastControl kind="grand" wind={wind} voilure={s.voilure} badge={`${100 - (100 - fortPct)}%`} />
          </div>
          {/* Face arrière : artimon 10% */}
          <div style={faceStyle(true)}>
            <MastControl kind="artimon" wind={wind} voilure={s.voilure} badge={`${100 - fortPct}%`} />
          </div>
        </div>
      </div>

      {/* Instrument central */}
      <div style={{ margin: "16px auto", maxWidth: 360 }}>
        <CapDuJourInstrument heading={s.heading} lang={lang} title={strings.capTitle} entryLabel={strings.capEntry} exitLabel={strings.capExit} />
      </div>

      {/* Coffres */}
      <div style={panel()}>
        <div style={{ display: "flex", gap: 12 }}>
          <Coffre name={strings.forteresse} sub={strings.forteresseSub} val={fmtEUR(s.fort, lang)} pct={`${fortPct} %`} accent={PALETTE.ice} />
          <Coffre name={strings.actif} sub={strings.actifSub} val={fmtEUR(s.actif, lang)} pct={`${100 - fortPct} %`} accent={PALETTE.bronze} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 12, paddingTop: 12, borderTop: "1px dashed rgba(184,115,51,.5)" }}>
          <span style={{ fontSize: 12, color: PALETTE.dim }}>{strings.totalLab}</span>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 28, color: PALETTE.cuivre }}>{fmtEUR(s.capital, lang)}</span>
        </div>
        <div style={{ fontSize: 12, color: PALETTE.dim, marginTop: 8 }}>
          {strings.projLab} : <b style={{ color: PALETTE.ice }}>{fmtEUR(projection, lang)}</b>
          <span style={{ float: "right" }}>{lang === "fr" ? "Jour" : "Day"} {s.day}</span>
        </div>
      </div>

      {/* Winchs */}
      <div style={panel()}>
        <WinchSlider label={strings.winchAlloc} value={Math.round(s.fortShare * 100)} min={80} max={95} step={1}
          output={`${Math.round(s.fortShare * 100)} / ${100 - Math.round(s.fortShare * 100)}`} onChange={setAlloc}
          scaleLeft="80/20" scaleRight="95/5" />
        <div style={{ height: 16 }} />
        <WinchSlider label={strings.winchRealloc} value={Math.round(s.realloc * 100)} min={0} max={100} step={5}
          output={`${Math.round(s.realloc * 100)} %`} onChange={setRealloc} />
        <div style={{ height: 16 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700 }}>{strings.winchVoilure}</span>
          <div style={{ display: "flex", gap: 6 }}>
            {([0, 1, 2] as const).map((v) => (
              <button key={v} onClick={() => setVoilure(v)} style={seg(s.voilure === v)}>{strings.voil[v]}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Météo + route */}
      <div style={panel()}>
        <MeteoNavlys market={s.market} windLabel={strings.meteoCap} routeLabel={strings.routeSteady} marketStateText={marketStateText} />
      </div>

      {/* Pied : signature + disclaimer */}
      <div style={{ textAlign: "center", marginTop: 18 }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 16, color: PALETTE.cuivre, marginBottom: 10 }}>{strings.signature}</div>
        <div style={{ fontSize: 11.5, color: PALETTE.dim, border: "1px solid rgba(184,115,51,.25)", borderRadius: 12, padding: "12px 16px" }}>
          {strings.disclaimer}
        </div>
      </div>
    </div>
  );
}

/* ----- petits sous-composants & styles ----- */
function Coffre(p: { readonly name: string; readonly sub: string; readonly val: string; readonly pct: string; readonly accent: string }): JSX.Element {
  return (
    <div style={{ flex: 1, border: `1px solid ${p.accent}55`, borderRadius: 12, padding: 12, background: "rgba(0,0,0,.25)" }}>
      <div style={{ fontSize: 12, color: PALETTE.cuivre, fontWeight: 700 }}>{p.name}</div>
      <div style={{ fontSize: 10.5, color: PALETTE.dim, margin: "2px 0 8px", minHeight: 14 }}>{p.sub}</div>
      <div style={{ fontFamily: "Georgia, serif", fontSize: 28, lineHeight: 1 }}>{p.val}</div>
      <div style={{ fontSize: 12, color: p.accent, marginTop: 4 }}>{p.pct}</div>
    </div>
  );
}

function panel(): React.CSSProperties {
  return {
    background: "linear-gradient(180deg, rgba(20,30,48,.7), rgba(6,12,24,.7))",
    border: "1px solid rgba(184,115,51,.5)", borderRadius: 16, padding: 16, marginTop: 14,
  };
}
function faceStyle(back: boolean): React.CSSProperties {
  return {
    position: back ? "absolute" : "relative", inset: 0, backfaceVisibility: "hidden",
    transform: back ? "rotateY(180deg)" : undefined,
    display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
  };
}
function btn(primary: boolean): React.CSSProperties {
  return {
    fontWeight: 700, fontSize: 13, borderRadius: 10, padding: "9px 16px", cursor: "pointer",
    border: `1px solid ${PALETTE.bronze}`,
    background: primary ? `linear-gradient(180deg, ${PALETTE.cuivre}, ${PALETTE.bronze})` : "linear-gradient(180deg,#2a1a0c,#150b04)",
    color: primary ? "#1a0e03" : PALETTE.cuivre,
  };
}
function seg(on: boolean): React.CSSProperties {
  return {
    flex: 1, borderRadius: 9, padding: "8px 4px", fontWeight: 700, fontSize: 12, cursor: "pointer",
    border: "1px solid rgba(184,115,51,.5)",
    background: on ? `linear-gradient(180deg, ${PALETTE.cuivre}, ${PALETTE.bronze})` : "rgba(0,0,0,.3)",
    color: on ? "#1a0e03" : PALETTE.dim,
  };
}
