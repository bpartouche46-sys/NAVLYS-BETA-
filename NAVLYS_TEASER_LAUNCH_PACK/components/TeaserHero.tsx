/**
 * NAVLYS — TeaserHero.tsx
 * Pièce de bronze animée (rotation 3D, halo ICE BLUE pulsé à 60 BPM,
 * balayage de lumière dorée, étincelles) + tagline officielle.
 *
 * TypeScript strict. Aucune dépendance hors React.
 *
 *   import coin from "../assets/navlys_coin.png";
 *   <TeaserHero lang="fr" coinSrc={coin} />
 */
import { useMemo } from "react";

export type Lang = "fr" | "en";

export interface TeaserHeroProps {
  /** Langue d'affichage. */
  lang?: Lang;
  /** URL / import de la pièce bronze (PNG officiel). */
  coinSrc: string;
}

const COPY: Record<Lang, { main: string; mainBold: string; sub: string }> = {
  fr: { main: "Un cap, une main, ", mainBold: "un jour.", sub: "NAVLYS — vise ton cap, atteins-le" },
  en: { main: "One bearing, one hand, ", mainBold: "one day.", sub: "NAVLYS — aim your bearing, reach it" },
};

const ICE = "#7DD3FC";
const PEARL = "#E5E7EB";
const COPPER = "#D49B5B";

interface Spark { left: string; top: string; delay: string; dur: string; }

export default function TeaserHero({ lang = "fr", coinSrc }: TeaserHeroProps): JSX.Element {
  const t = COPY[lang];

  // étincelles bronze flottantes (positions stables entre les rendus)
  const sparks = useMemo<Spark[]>(() => {
    const out: Spark[] = [];
    for (let i = 0; i < 14; i++) {
      out.push({
        left: `${8 + Math.random() * 84}%`,
        top: `${8 + Math.random() * 84}%`,
        delay: `${(Math.random() * 4).toFixed(2)}s`,
        dur: `${(2.4 + Math.random() * 2.6).toFixed(2)}s`,
      });
    }
    return out;
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <style>{`
        @keyframes nv-coin-turn {
          0%   { transform: rotateY(-24deg) rotateX(3deg); }
          50%  { transform: rotateY(24deg) rotateX(-2deg); }
          100% { transform: rotateY(-24deg) rotateX(3deg); }
        }
        @keyframes nv-coin-float { 0%,100% { margin-top: 0; } 50% { margin-top: -12px; } }
        @keyframes nv-halo {
          0%,100% { filter: drop-shadow(0 0 18px rgba(125,211,252,.45)) drop-shadow(0 0 4px rgba(184,115,51,.4)); }
          50%     { filter: drop-shadow(0 0 42px rgba(125,211,252,.85)) drop-shadow(0 0 10px rgba(184,115,51,.6)); }
        }
        @keyframes nv-sweep { 0% { left:-60%; } 55% { left:130%; } 100% { left:130%; } }
        @keyframes nv-twinkle {
          0%   { opacity:0; transform: translateY(0) scale(.6); }
          30%  { opacity:1; }
          70%  { opacity:.7; }
          100% { opacity:0; transform: translateY(-26px) scale(1.1); }
        }
        .nv-coin-stage { position:relative; margin:40px auto 8px; width:min(70vw,330px); aspect-ratio:1/1; perspective:1100px; }
        .nv-coin-wrap  { position:relative; width:100%; height:100%; transform-style:preserve-3d;
                          animation: nv-coin-turn 12s ease-in-out infinite, nv-coin-float 7s ease-in-out infinite; }
        .nv-coin-img   { position:absolute; inset:0; width:100%; height:100%; object-fit:contain;
                          border-radius:50%; animation: nv-halo 1s ease-in-out infinite; }
        .nv-coin-sweep { position:absolute; inset:0; border-radius:50%; overflow:hidden; pointer-events:none; mix-blend-mode:screen; }
        .nv-coin-sweep::before {
          content:""; position:absolute; top:-40%; left:-60%; width:60%; height:180%; transform:rotate(18deg);
          background:linear-gradient(90deg,transparent, rgba(212,155,91,0) 20%, rgba(255,225,170,.85) 50%, rgba(212,155,91,0) 80%, transparent);
          filter:blur(2px); animation: nv-sweep 4s ease-in-out infinite;
        }
        .nv-spark { position:absolute; width:5px; height:5px; border-radius:50%;
                    background:radial-gradient(circle,#ffe1a8,rgba(184,115,51,0)); opacity:0; pointer-events:none; }
        @media (prefers-reduced-motion: reduce) {
          .nv-coin-wrap,.nv-coin-img,.nv-coin-sweep::before { animation:none !important; }
        }
      `}</style>

      <div className="nv-coin-stage" aria-label="Logo NAVLYS">
        <div className="nv-coin-wrap">
          <img
            className="nv-coin-img"
            src={coinSrc}
            alt={lang === "fr"
              ? "Logo NAVLYS — pièce de bronze, déesse archère et cerf, halo bleu glacier"
              : "NAVLYS logo — bronze coin, archer goddess and stag, ice-blue halo"}
          />
          <div className="nv-coin-sweep" />
          {sparks.map((s, i) => (
            <span key={i} className="nv-spark"
                  style={{ left: s.left, top: s.top, animation: `nv-twinkle ${s.dur} ease-in-out ${s.delay} infinite` }} />
          ))}
        </div>
      </div>

      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,5vw,44px)",
                    color: PEARL, letterSpacing: ".04em", marginTop: 8 }}>
        {t.main}<b style={{ color: ICE, fontWeight: 600 }}>{t.mainBold}</b>
      </div>
      <div style={{ color: COPPER, letterSpacing: ".16em", fontSize: 13,
                    textTransform: "uppercase", marginTop: 12 }}>
        {t.sub}
      </div>
    </div>
  );
}
