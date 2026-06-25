import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NAVLYS — Partenaires brokers & fiches banques',
  description:
    "Brokers régulés vers lesquels NAVLYS oriente sa communauté, et fiches d'audit des grandes banques françaises (frais cachés, leviers d'optimisation). Information pédagogique.",
  keywords: [
    'broker régulé', 'affiliation crypto', 'frais bancaires', 'audit banque',
    'BNP Paribas frais', 'assurance vie frais', 'loi Lemoine', 'NAVLYS partenaires'
  ]
};

const partners = [
  { n: 'Binance', t: 'crypto spot & futures', desc: "Le plus grand échange crypto au monde. Spot, dérivés, staking, copy-trading.", url: process.env.NEXT_PUBLIC_AFFILIATE_BINANCE || 'https://accounts.binance.com/register' },
  { n: 'Bybit', t: 'dérivés crypto', desc: "Plateforme spécialisée en perp futures, copy-trading et bots intégrés.", url: process.env.NEXT_PUBLIC_AFFILIATE_BYBIT || 'https://www.bybit.com/register' },
  { n: 'OKX', t: 'crypto multi-actifs', desc: "Spot, futures, options, DeFi et NFTs sur une seule interface professionnelle.", url: process.env.NEXT_PUBLIC_AFFILIATE_OKX || 'https://www.okx.com/join' },
  { n: 'Plus500', t: 'CFD régulés', desc: "Broker régulé européen pour CFD sur indices, actions, matières premières.", url: process.env.NEXT_PUBLIC_AFFILIATE_PLUS500 || 'https://www.plus500.com' },
  { n: 'Alpaca', t: 'API broker US', desc: "Courtage actions/ETF US avec API publique, paper trading natif, idéal pour bots.", url: process.env.NEXT_PUBLIC_AFFILIATE_ALPACA || 'https://alpaca.markets' }
];

const banques = [
  {
    n: 'BNP Paribas',
    marge: '~ 380 € / an',
    opaque: 'Assurance vie BNP Cardif (frais UC ~1 %), fonds maison surreprésentés en gestion sous mandat, marge d’arbitrage sur crédit immobilier.',
    leviers: 'Renégocier l’assurance emprunteur (loi Lemoine), externaliser l’assurance vie, auditer les frais de tenue de compte.'
  },
  {
    n: 'Crédit Agricole',
    marge: '~ 320 € / an',
    opaque: 'Predica (fonds euros à rendement décroissant), SCPI maison à frais d’entrée élevés, crédit conso couplé à des assurances accessoires.',
    leviers: 'Comparer Predica au marché indépendant, sortir des SCPI maison vers des SCPI multi-sociétés, vérifier l’utilité des assurances couplées.'
  },
  {
    n: 'Société Générale',
    marge: '~ 350 € / an',
    opaque: 'Sogecap (assurance vie avec sous-jacents maison), crédits revolving liés aux cartes premium, frais de gestion UC élevés.',
    leviers: 'Auditer la part de fonds maison dans Sogecap, renégocier les frais de gestion UC, suspendre les services premium non utilisés.'
  },
  {
    n: 'LCL',
    marge: '~ 300 € / an',
    opaque: 'LCL Vie (assurance vie maison), assurance emprunteur groupe sur le crédit immobilier, cartes premium peu utilisées mais facturées.',
    leviers: 'Renégocier l’assurance emprunteur, basculer LCL Vie vers un contrat indépendant (< 0,6 % de frais), auditer les packages.'
  },
  {
    n: 'La Banque Postale',
    marge: '~ 260 € / an',
    opaque: 'CNP Assurances (fonds euros à rendement bas), contrats Cachemire à frais d’UC élevés, marge sur les services packagés.',
    leviers: 'Sortir progressivement des contrats Cachemire, optimiser la part Livret A, auditer les services facturés.'
  }
];

export default function PartenairesPage() {
  return (
    <>
      <h1
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 40,
          fontWeight: 500,
          margin: '0 0 6px',
          color: 'var(--pearl)'
        }}
      >
        Nos <em style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', color: 'var(--champagne)' }}>partenaires</em>
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 24px' }}>
        Brokers régulés vers lesquels NAVLYS oriente sa communauté. Liens d&apos;affiliation transparents.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((p) => (
          <a
            key={p.n}
            href={p.url}
            target="_blank"
            rel="noopener nofollow sponsored"
            className="card no-underline block"
            style={{ color: 'var(--pearl)' }}
          >
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, fontWeight: 600 }}>{p.n}</div>
            <div style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontSize: 12, color: 'var(--champagne)', marginTop: 4 }}>
              {p.t}
            </div>
            <p style={{ margin: '10px 0 0', fontSize: 14, color: 'var(--lavender)', opacity: 0.92 }}>{p.desc}</p>
            <div style={{ marginTop: 12, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--pink)' }}>
              Ouvrir un compte →
            </div>
          </a>
        ))}
      </div>

      {/* Fiches banques — contenu SEO */}
      <section className="mt-12">
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 32,
            fontWeight: 500,
            margin: '0 0 6px',
            color: 'var(--pearl)'
          }}
        >
          Fiches <em style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', color: 'var(--champagne)' }}>banques</em> — frais &amp; leviers
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 20px', maxWidth: 760 }}>
          Repères pédagogiques sur les marges moyennes et les frais souvent invisibles des grandes banques françaises.
          Estime ta propre situation avec{' '}
          <Link href="/marge" style={{ color: 'var(--pink)' }}>la Marge révélée</Link>. Chiffres indicatifs issus de
          moyennes sectorielles publiques.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banques.map((b) => (
            <article key={b.n} className="card">
              <div className="flex items-baseline justify-between gap-3" style={{ marginBottom: 8 }}>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 24, fontWeight: 600, margin: 0, color: 'var(--pearl)' }}>
                  {b.n}
                </h3>
                <span style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontSize: 13, color: 'var(--bad)' }}>{b.marge}</span>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: 13.5, color: 'var(--lavender)' }}>
                <strong style={{ color: 'var(--champagne)' }}>Produits opaques : </strong>
                {b.opaque}
              </p>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--lavender)' }}>
                <strong style={{ color: 'var(--champagne)' }}>Leviers d&apos;optimisation : </strong>
                {b.leviers}
              </p>
            </article>
          ))}
        </div>
      </section>

      <p style={{ marginTop: 22, fontSize: 12.5, color: 'var(--muted)', fontStyle: 'italic', fontFamily: '"Fraunces", serif' }}>
        Les fiches banques sont des repères généraux à but pédagogique, bâtis sur des moyennes publiques — ni un audit
        individuel, ni un conseil. NAVLYS perçoit une commission d&apos;affiliation sur certains brokers, signalée par les
        liens « sponsored ».
      </p>
    </>
  );
}
