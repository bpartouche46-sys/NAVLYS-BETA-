/**
 * NAVLYS — ChronosBanner.tsx
 * Bannière Chronos : silhouette du dieu du temps + horloge aux aiguilles
 * INVERSÉES (anti-horaire) + compteur à rebours réel vers le lancement.
 *
 * TypeScript strict. Aucune dépendance hors React.
 *
 *   <ChronosBanner lang="fr" targetIso="2026-05-31T00:00:00+03:00" />
 *
 * La cible par défaut : 31 mai 2026, 00:00 Asia/Jerusalem (UTC+3 en mai).
 */
import { useEffect, useState } from "react";

export type Lang = "fr" | "en";

export interface ChronosBannerProps {
  /** Langue d'affichage. */
  lang?: Lang;
  /** Date cible ISO avec offset (ex. "2026-05-31T00:00:00+03:00"). */
  targetIso?: string;
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const COPY: Record<Lang, {
  kicker: string; lead: string;
  d: string; h: string; m: string; s: string; live: string;
}> = {
  fr: {
    kicker: "Le temps compte à rebours",
    lead: "Le grand jour approche. NAVLYS lève l'ancre dans :",
    d: "Jours", h: "Heures", m: "Minutes", s: "Secondes",
    live: "⚓ NAVLYS est en ligne — bienvenue à bord.",
  },
  en: {
    kicker: "Time is counting down",
    lead: "The great day nears. NAVLYS sets sail in:",
    d: "Days", h: "Hours", m: "Minutes", s: "Seconds",
    live: "⚓ NAVLYS is live — welcome aboard.",
  },
};

const ICE = "#7DD3FC";
const BRONZE = "#B87333";
const COPPER = "#D49B5B";
const PEARL = "#E5E7EB";

function computeRemaining(targetMs: number): Remaining {
  let diff = targetMs - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(diff / 86_400_000); diff -= days * 86_400_000;
  const hours = Math.floor(diff / 3_600_000); diff -= hours * 3_600_000;
  const minutes = Math.floor(diff / 60_000); diff -= minutes * 60_000;
  const seconds = Math.floor(diff / 1_000);
  return { days, hours, minutes, seconds, done: false };
}

const pad = (n: number): string => String(n).padStart(2, "0");

export default function ChronosBanner({
  lang = "fr",
  targetIso = "2026-05-31T00:00:00+03:00",
}: ChronosBannerProps): JSX.Element {
  const targetMs = new Date(targetIso).getTime();
  const t = COPY[lang];
  const [rem, setRem] = useState<Remaining>(() => computeRemaining(targetMs));

  useEffect(() => {
    const id = window.setInterval(() => setRem(computeRemaining(targetMs)), 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  const cell: React.CSSProperties = {
    minWidth: 78, padding: "14px 10px", borderRadius: 14,
    background: "rgba(6,11,18,.72)", border: `1px solid ${BRONZE}52`,
    boxShadow: "0 0 22px rgba(0,0,0,.5)",
  };
  const num: React.CSSProperties = {
    fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 38, lineHeight: 1,
    color: COPPER, textShadow: `0 0 16px ${BRONZE}73`, fontVariantNumeric: "tabular-nums",
  };
  const lab: React.CSSProperties = {
    marginTop: 8, fontSize: 11, letterSpacing: ".22em",
    textTransform: "uppercase", color: "#8aa0b4",
  };

  return (
    <section style={{ width: "100%", maxWidth: 760, margin: "18px auto 0", textAlign: "center" }}
             aria-label={t.kicker}>
      <style>{`
        @keyframes navlys-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .nv-hand { transform-origin: 100px 100px; }
        .nv-hand-h { animation: navlys-ccw 43200s linear infinite; }
        .nv-hand-m { animation: navlys-ccw 3600s linear infinite; }
        .nv-hand-s { animation: navlys-ccw 60s steps(60) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .nv-hand-h,.nv-hand-m,.nv-hand-s { animation: none !important; }
        }
      `}</style>

      <div style={{ fontSize: 12.5, letterSpacing: ".42em", color: ICE,
                    textTransform: "uppercase", opacity: 0.9 }}>
        {t.kicker}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 26, marginTop: 14, flexWrap: "wrap" }}>
        {/* Silhouette de Chronos, dieu du temps + ailes + sablier */}
        <svg width={96} height={118} viewBox="0 0 96 118" aria-hidden="true"
             style={{ filter: `drop-shadow(0 0 12px ${BRONZE}66)` }}>
          <g fill="none" stroke={BRONZE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M48 40 C30 30 14 32 4 44 C20 42 30 46 40 54" stroke={ICE} strokeOpacity={0.7} />
            <path d="M48 40 C66 30 82 32 92 44 C76 42 66 46 56 54" stroke={ICE} strokeOpacity={0.7} />
            <circle cx={48} cy={20} r={9} />
            <path d="M40 24 C42 34 54 34 56 24" />
            <path d="M34 36 C34 30 62 30 62 36 L66 86 C66 96 30 96 30 86 Z" fill="#0a1420" fillOpacity={0.6} />
            <path d="M34 50 C24 56 22 70 26 80" />
            <path d="M62 50 C72 56 74 70 70 80" />
            <path d="M40 100 L56 100 L48 109 Z M40 118 L56 118 L48 109 Z" fill={COPPER} fillOpacity={0.5} />
          </g>
        </svg>

        {/* Horloge aux aiguilles INVERSÉES */}
        <div style={{ width: 118, height: 118 }}>
          <svg viewBox="0 0 200 200" width="100%" height="100%"
               style={{ filter: `drop-shadow(0 0 14px ${ICE}59)` }}>
            <circle cx={100} cy={100} r={94} fill="#06101a" stroke={BRONZE} strokeWidth={3} />
            <circle cx={100} cy={100} r={86} fill="none" stroke={ICE} strokeOpacity={0.25} strokeWidth={1} />
            <g fill={COPPER} fontFamily="'Cormorant Garamond',serif" fontSize={16} textAnchor="middle">
              <text x={100} y={26}>XII</text><text x={137} y={36}>I</text><text x={164} y={63}>II</text>
              <text x={174} y={106}>III</text><text x={164} y={148}>IV</text><text x={137} y={175}>V</text>
              <text x={100} y={185}>VI</text><text x={63} y={175}>VII</text><text x={36} y={148}>VIII</text>
              <text x={26} y={106}>IX</text><text x={36} y={63}>X</text><text x={63} y={36}>XI</text>
            </g>
            <line className="nv-hand nv-hand-h" x1={100} y1={100} x2={100} y2={52} stroke={PEARL} strokeWidth={5} strokeLinecap="round" />
            <line className="nv-hand nv-hand-m" x1={100} y1={100} x2={100} y2={34} stroke={ICE} strokeWidth={3.5} strokeLinecap="round" />
            <line className="nv-hand nv-hand-s" x1={100} y1={112} x2={100} y2={24} stroke={BRONZE} strokeWidth={2} strokeLinecap="round" />
            <circle cx={100} cy={100} r={6} fill={BRONZE} />
            <circle cx={100} cy={100} r={2.5} fill="#06101a" />
          </svg>
        </div>
      </div>

      <p style={{ marginTop: 16, fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(18px,3.4vw,24px)", color: PEARL, letterSpacing: ".02em" }}>
        {t.lead}
      </p>

      {rem.done ? (
        <div style={{ ...cell, minWidth: "auto", padding: "16px 26px", display: "inline-block", marginTop: 18 }}>
          <div style={{ ...num, fontSize: 24 }}>{t.live}</div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 18, flexWrap: "wrap" }}>
          <div style={cell}><div style={num}>{rem.days}</div><div style={lab}>{t.d}</div></div>
          <div style={cell}><div style={num}>{pad(rem.hours)}</div><div style={lab}>{t.h}</div></div>
          <div style={cell}><div style={num}>{pad(rem.minutes)}</div><div style={lab}>{t.m}</div></div>
          <div style={cell}><div style={num}>{pad(rem.seconds)}</div><div style={lab}>{t.s}</div></div>
        </div>
      )}
    </section>
  );
}
