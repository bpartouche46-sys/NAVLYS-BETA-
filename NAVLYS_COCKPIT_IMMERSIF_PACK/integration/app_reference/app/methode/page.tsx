import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NAVLYS — La méthode : Forteresse 90 / Jeu actif 10',
  description:
    "La logique NAVLYS en clair : 90 % protégés (la Forteresse, ~5 %/an), 10 % réactifs (le Jeu actif), et la réaffectation disciplinée des gains. Pédagogie, pas un conseil.",
  keywords: ['méthode NAVLYS', '90/10', 'gestion du risque', 'capitalisation', 'éducation financière']
};

export default function MethodePage() {
  const piliers = [
    {
      n: '90 %',
      t: 'La Forteresse',
      d: "La grande part, protégée et stable. Elle avance doucement, à un rythme prudent (de l'ordre de ~5 %/an, lissé). C'est la coque qui ne prend pas l'eau quand la mer forcit. On n'y touche pas pour « tenter un coup »."
    },
    {
      n: '10 %',
      t: 'Le Jeu actif',
      d: "La petite part, vive et réactive, plafonnée par construction. Elle peut gagner ou perdre, mais jamais au point de menacer le navire. C'est là que vit la prise de risque maîtrisée."
    },
    {
      n: '↺',
      t: 'La réaffectation',
      d: "Quand le Jeu actif gagne, une partie du gain est reversée dans la Forteresse. Le coffre grossit, la part risquée se reconstitue : c'est le moteur d'une croissance composée, lente mais régulière."
    }
  ];

  return (
    <>
      <h1
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(30px,5vw,44px)',
          fontWeight: 500,
          margin: '0 0 6px',
          color: 'var(--pearl)'
        }}
      >
        La <em style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', color: 'var(--champagne)' }}>méthode</em> NAVLYS
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 24px', maxWidth: 760 }}>
        Une idée simple, tenue d&apos;une main : <strong style={{ color: 'var(--lavender)' }}>protéger la grande part,
        faire jouer la petite, et capitaliser les gains</strong>. Le vent du marché tourne sans cesse ; ton cap, lui, ne
        bouge pas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {piliers.map((p) => (
          <div key={p.t} className="card">
            <div style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontSize: 34, color: 'var(--champagne)', marginBottom: 6 }}>
              {p.n}
            </div>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, fontWeight: 600, margin: '0 0 6px', color: 'var(--pearl)' }}>
              {p.t}
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--lavender)', opacity: 0.92 }}>{p.d}</p>
          </div>
        ))}
      </div>

      <section className="mt-10 card">
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, fontWeight: 500, margin: '0 0 10px', color: 'var(--pearl)' }}>
          « Martingale scientifique » — de quoi parle-t-on&nbsp;?
        </h2>
        <p style={{ color: 'var(--lavender)', fontSize: 15, lineHeight: 1.75 }}>
          Le mot « martingale » évoque souvent le casino — doubler la mise après chaque perte. <strong>NAVLYS fait
          exactement l&apos;inverse.</strong> Ici, il n&apos;y a pas de course en avant : la grande part reste à l&apos;abri, la
          part risquée est strictement bornée, et ce sont les <em>gains</em> — pas les pertes — que l&apos;on capitalise.
          La discipline n&apos;est pas dans l&apos;audace, elle est dans la <strong>répétition régulière d&apos;un geste
          prudent</strong> : encaisser, sécuriser une partie, recommencer.
        </p>
        <p style={{ color: 'var(--lavender)', fontSize: 15, lineHeight: 1.75 }}>
          C&apos;est « scientifique » au sens où la taille des positions, le partage 90/10 et la réaffectation suivent des
          règles fixées <em>à l&apos;avance</em>, pas l&apos;émotion du moment. La règle décide ; l&apos;humain garde la barre,
          observe, et ajuste son cap quand sa vie change — pas quand le marché crie.
        </p>
      </section>

      <section className="mt-6 card" style={{ background: 'linear-gradient(140deg, rgba(75,26,128,0.18), rgba(8,3,15,0.55))' }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 24, fontWeight: 500, margin: '0 0 10px', color: 'var(--pearl)' }}>
          L&apos;humain reste la pièce centrale
        </h2>
        <p style={{ color: 'var(--lavender)', fontSize: 15, lineHeight: 1.75, margin: 0 }}>
          NAVLYS ne promet pas une machine qui « bat le marché ». L&apos;intuition, l&apos;expérience et la sérénité face à la
          volatilité valent plus qu&apos;un automatisme. La méthode est un cadre de discipline et de gestion du risque —
          un garde-fou — au service de tes décisions, jamais à leur place. Le détail des calculs internes reste, lui,
          dans la salle des machines&nbsp;: ce qui compte pour toi, c&apos;est le cap, pas la mécanique.
        </p>
      </section>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { t: '1 · Pose ton cap', d: 'Définis ton objectif et ton horizon.', href: '/objectif', cta: 'Simulateur d’objectif →' },
          { t: '2 · Récupère du carburant', d: 'Vois les frais qui te freinent et libère-les.', href: '/marge', cta: 'Marge révélée →' },
          { t: '3 · Tiens la barre', d: 'Règle ton allocation 90/10 et avance, mois après mois.', href: '/cockpit', cta: 'Ouvrir le cockpit →' }
        ].map((s) => (
          <Link key={s.t} href={s.href} className="card no-underline block" style={{ color: 'var(--pearl)' }}>
            <h4 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, fontWeight: 600, margin: '0 0 6px', color: 'var(--pearl)' }}>
              {s.t}
            </h4>
            <p style={{ margin: '0 0 10px', fontSize: 14, color: 'var(--lavender)', opacity: 0.92 }}>{s.d}</p>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--pink)' }}>{s.cta}</div>
          </Link>
        ))}
      </section>

      <p style={{ marginTop: 22, fontSize: 12.5, color: 'var(--muted)', fontStyle: 'italic', fontFamily: '"Fraunces", serif' }}>
        Contenu pédagogique général. Ce n&apos;est pas un conseil financier personnalisé ni une promesse de rendement.
        Le trading comporte un risque de perte en capital. Tu décides tout, tu gères tout.
      </p>
    </>
  );
}
