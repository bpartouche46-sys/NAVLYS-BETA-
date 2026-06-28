import type { Metadata } from 'next';
import Link from 'next/link';
import CockpitImmersif from '@/components/CockpitImmersif';

export const metadata: Metadata = {
  title: 'NAVLYS — Cockpit immersif',
  description:
    "Le poste de barre NAVLYS : la mer avance, tu tournes la tête à 360°, tu règles ton cap à la boussole. Démonstration pédagogique — aucun marché réel.",
};

export default function CockpitPage() {
  return (
    <>
      <div className="flex items-end justify-between flex-wrap gap-2 mb-2">
        <h1
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(30px,5vw,44px)',
            fontWeight: 500,
            margin: 0,
            color: 'var(--pearl)'
          }}
        >
          Le <em style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', color: 'var(--champagne)' }}>cockpit</em>
        </h1>
        <a
          href="/cockpit-immersif.html"
          target="_blank"
          rel="noopener"
          style={{ fontSize: 13, color: 'var(--pink)' }}
        >
          Ouvrir dans un onglet ↗
        </a>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 18px', maxWidth: 760 }}>
        Tiens la barre. La <strong style={{ color: 'var(--lavender)' }}>mer avance</strong>, tu <strong style={{ color: 'var(--lavender)' }}>glisses le doigt</strong> (ou
        actives le gyroscope) pour tourner la tête à 360° — devant ton cap, derrière ton sillage. En bas, les
        instruments&nbsp;: <em>tape</em> dessus, une bulle s&apos;ouvre. La boussole centrale règle ton allocation
        90/10 comme un cap. Tout est en argent de démonstration.
      </p>

      <CockpitImmersif />

      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { t: 'Tourne la tête', d: 'Glisse le doigt horizontalement (ou bouton ⌖ Gyro sur mobile) : devant = l’étoile-objectif et la Forteresse ; derrière = le sillage et tes résultats.' },
          { t: 'Ouvre les bulles', d: 'Chaque instrument du bas est tappable : Marché, Tendance, Amplitude, Cap, Objectif, Marge. La bulle explique et laisse régler les winchs.' },
          { t: 'Règle ton cap', d: 'La pièce bronze au centre est ta boussole : tourne-la pour répartir 90 % Forteresse / 10 % Jeu actif. Le winch « Mois suivant ⚓ » fait avancer la simulation.' }
        ].map((c) => (
          <div key={c.t} className="card">
            <h4 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, fontWeight: 600, margin: '0 0 6px', color: 'var(--pearl)' }}>
              {c.t}
            </h4>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--lavender)', opacity: 0.92 }}>{c.d}</p>
          </div>
        ))}
      </section>

      <p style={{ marginTop: 18, fontSize: 12.5, color: 'var(--muted)', fontStyle: 'italic', fontFamily: '"Fraunces", serif' }}>
        « Le vent du marché tourne sans cesse. Ton cap, lui, ne bouge pas. » — Cockpit en données de démonstration ;
        aucun marché réel, aucun conseil en investissement.{' '}
        <Link href="/methode" style={{ color: 'var(--pink)' }}>Comprendre la méthode →</Link>
      </p>
    </>
  );
}
