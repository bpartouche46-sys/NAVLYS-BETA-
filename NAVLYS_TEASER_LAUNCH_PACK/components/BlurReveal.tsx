/**
 * NAVLYS — BlurReveal.tsx
 * Le vrai site NAVLYS recomposé en maquette, puis FLOUTÉ derrière le teaser.
 * On devine la homepage dans le brouillard — ça crée le désir.
 * Le 31 mai : passer `blur={0}` (et retirer l'assombrissement) pour révéler.
 *
 * TypeScript strict. Aucune dépendance hors React.
 *
 *   <BlurReveal lang="fr" blur={14} />
 */
export type Lang = "fr" | "en";

export interface BlurRevealProps {
  /** Langue d'affichage de la maquette. */
  lang?: Lang;
  /** Intensité du flou en px (14 = teaser, 0 = révélé). */
  blur?: number;
}

const COPY: Record<Lang, {
  m: [string, string, string, string]; cta: string;
  h1a: string; h1b: string; hp: string; pill: string;
  seve: [string, string][]; tiers: [string, string][];
}> = {
  fr: {
    m: ["Le cap", "La sève", "Tarifs", "Membre"], cta: "Embarquer",
    h1a: "Vise ton cap,", h1b: "atteins-le.",
    hp: "Une lecture humaine livrée chaque matin à 9 h. Un seul geste, et tu tiens ta route.",
    pill: "Recevoir mon cap du matin",
    seve: [
      ["Le cap matinal", "Chaque matin, une direction claire. Pas de bruit, juste la route à tenir."],
      ["L'œil aiguisé", "Une veille humaine qui regarde l'horizon à ta place pendant que tu vis ta vie."],
      ["La preuve irréfutable", "Le cap se voit. Tu vérifies, tu avances, tu tiens ta main sur la barre."],
    ],
    tiers: [["ÉQUIPAGE", "29,99"], ["SKIPPER", "39,99"], ["CAPITAINE", "49,99"]],
  },
  en: {
    m: ["The bearing", "The sap", "Pricing", "Member"], cta: "Come aboard",
    h1a: "Aim your bearing,", h1b: "reach it.",
    hp: "A human reading delivered every morning at 9 AM. One single move, and you hold your course.",
    pill: "Get my morning bearing",
    seve: [
      ["The morning bearing", "Every morning, one clear direction. No noise, just the course to hold."],
      ["The sharp eye", "A human watch that scans the horizon for you while you live your life."],
      ["Undeniable proof", "The bearing is visible. You check, you move, your hand stays on the helm."],
    ],
    tiers: [["CREW", "29.99"], ["SKIPPER", "39.99"], ["CAPTAIN", "49.99"]],
  },
};

const ICE = "#7DD3FC";
const BRONZE = "#B87333";
const COPPER = "#D49B5B";
const PEARL = "#E5E7EB";

function Ketch(): JSX.Element {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="nv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1726" /><stop offset=".55" stopColor="#16314b" />
          <stop offset=".75" stopColor={ICE} stopOpacity=".35" /><stop offset="1" stopColor={COPPER} stopOpacity=".55" />
        </linearGradient>
        <radialGradient id="nv-sun" cx="50%" cy="76%" r="30%">
          <stop offset="0" stopColor="#ffe6c0" /><stop offset="1" stopColor={COPPER} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nv-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#11324b" /><stop offset="1" stopColor="#06121e" />
        </linearGradient>
      </defs>
      <rect width="600" height="430" fill="url(#nv-sky)" />
      <circle cx="300" cy="392" r="150" fill="url(#nv-sun)" />
      <rect y="392" width="600" height="208" fill="url(#nv-sea)" />
      <g stroke={ICE} strokeOpacity=".28">
        <line x1="180" y1="455" x2="420" y2="455" /><line x1="210" y1="490" x2="390" y2="490" />
        <line x1="160" y1="525" x2="440" y2="525" /><line x1="230" y1="560" x2="370" y2="560" />
      </g>
      <g transform="translate(300,392)" fill="#0a0f15" stroke={BRONZE} strokeWidth="2">
        <path d="M-70,0 L70,0 L52,34 L-52,34 Z" />
        <line x1="-22" y1="-150" x2="-22" y2="0" /><line x1="40" y1="-110" x2="40" y2="0" />
        <path d="M-22,-148 L-22,-12 L-78,-12 Z" fill={COPPER} fillOpacity=".85" stroke="none" />
        <path d="M-22,-148 L-22,-12 L26,-12 Z" fill={BRONZE} fillOpacity=".9" stroke="none" />
        <path d="M40,-108 L40,-12 L8,-12 Z" fill={COPPER} fillOpacity=".8" stroke="none" />
        <path d="M40,-108 L40,-12 L72,-12 Z" fill={BRONZE} fillOpacity=".85" stroke="none" />
      </g>
      <g transform="translate(470,90)" fill={ICE}><circle r="3" />
        <path d="M0,-12 L2,-2 L12,0 L2,2 L0,12 L-2,2 L-12,0 L-2,-2 Z" fillOpacity=".9" /></g>
    </svg>
  );
}

export default function BlurReveal({ lang = "fr", blur = 14 }: BlurRevealProps): JSX.Element {
  const t = COPY[lang];
  const card: React.CSSProperties = {
    background: "linear-gradient(180deg,rgba(14,28,44,.85),rgba(6,11,18,.85))",
    border: `1px solid ${BRONZE}38`, borderRadius: 20, padding: 30,
  };
  const price: React.CSSProperties = {
    background: "rgba(8,14,22,.9)", border: `1px solid ${ICE}29`,
    borderRadius: 20, padding: 34, textAlign: "center",
  };
  return (
    <div aria-hidden="true" style={{
      position: "fixed", inset: 0, zIndex: 0,
      filter: `blur(${blur}px) saturate(1.05) brightness(${blur > 0 ? 0.72 : 1})`,
      transform: "scale(1.06)", pointerEvents: "none", userSelect: "none",
    }}>
      <div style={{
        minHeight: "100%", paddingBottom: 80,
        background: "radial-gradient(80% 60% at 50% 0%, #0e1c2c 0%, #060b12 55%, #000 100%)",
      }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "26px 6vw", borderBottom: `1px solid ${ICE}1f` }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600,
                        letterSpacing: ".42em", fontSize: 30, color: PEARL }}>NAVLYS</div>
          <div style={{ display: "flex", gap: 34, fontSize: 15, color: "#9fb3c8", letterSpacing: ".06em" }}>
            {t.m.map((x) => <span key={x}>{x}</span>)}
          </div>
          <div style={{ padding: "10px 22px", border: `1px solid ${BRONZE}`, borderRadius: 40,
                        color: COPPER, fontSize: 14, letterSpacing: ".08em" }}>{t.cta}</div>
        </nav>

        <section style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 30,
                          alignItems: "center", padding: "7vh 6vw 5vh" }}>
          <div>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, lineHeight: 1.02,
                         fontSize: "clamp(40px,6vw,86px)", color: PEARL }}>
              {t.h1a}<br /><span style={{ color: ICE }}>{t.h1b}</span>
            </h1>
            <p style={{ marginTop: 22, maxWidth: "34ch", fontSize: 19, color: "#b9c6d6", lineHeight: 1.6 }}>{t.hp}</p>
            <span style={{ display: "inline-block", marginTop: 26, padding: "13px 30px", borderRadius: 40,
                           background: `linear-gradient(120deg,${BRONZE},${COPPER})`, color: "#1a0f04",
                           fontWeight: 600, letterSpacing: ".05em" }}>{t.pill}</span>
          </div>
          <div style={{ width: "100%", aspectRatio: "1/1", borderRadius: 26, overflow: "hidden",
                        border: `1px solid ${ICE}24`, boxShadow: "0 30px 90px rgba(0,0,0,.6)" }}>
            <Ketch />
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, padding: "2vh 6vw 6vh" }}>
          {t.seve.map(([h, p]) => (
            <div key={h} style={card}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", color: COPPER, fontSize: 24,
                           letterSpacing: ".04em", marginBottom: 10 }}>{h}</h3>
              <p style={{ color: "#a9b8c8", fontSize: 15, lineHeight: 1.6 }}>{p}</p>
            </div>
          ))}
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, padding: "0 6vw" }}>
          {t.tiers.map(([tier, amt], i) => (
            <div key={tier} style={i === 1 ? { ...price, border: `1px solid ${BRONZE}`, boxShadow: `0 0 0 1px ${BRONZE} inset` } : price}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", color: ICE, fontSize: 22, letterSpacing: ".16em" }}>{tier}</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 46, color: PEARL, margin: "14px 0" }}>
                {amt}<small style={{ fontSize: 16, color: "#8aa0b4" }}> €</small>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
