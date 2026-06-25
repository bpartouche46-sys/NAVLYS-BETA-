'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { annualMargin, tenYearMargin, NATIONAL_AVG_ANNUAL, type Bank, type ClientBalances } from '@/lib/margins';

/**
 * Marge Révélée (escale "frais cachés" du parcours).
 * Estimation pédagogique de ce que ta banque garde, en moyenne, chaque année.
 * Math pure réutilisée de lib/margins.ts. Estimations indicatives, pas un audit certifié.
 */
const BANKS: { id: Bank; label: string }[] = [
  { id: 'BNP_Paribas', label: 'BNP Paribas' },
  { id: 'Credit_Agricole', label: 'Crédit Agricole' },
  { id: 'Societe_Generale', label: 'Société Générale' },
  { id: 'LCL', label: 'LCL' },
  { id: 'La_Banque_Postale', label: 'La Banque Postale' }
];

const fmt = (n: number) => Math.round(n).toLocaleString('fr-FR') + ' €';

export default function MargePage() {
  const [bank, setBank] = useState<Bank>('BNP_Paribas');
  const [b, setB] = useState<ClientBalances>({ current: 5000, savings: 15000, lifeEuroFund: 40000, mortgage: 120000 });

  const annual = useMemo(() => annualMargin(bank, b), [bank, b]);
  const tenY = useMemo(() => tenYearMargin(bank, b), [bank, b]);
  const delta = annual - NATIONAL_AVG_ANNUAL;

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 6,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'var(--champagne)'
  };

  const fields: { k: keyof ClientBalances; l: string }[] = [
    { k: 'current', l: 'Solde compte courant (€)' },
    { k: 'savings', l: 'Épargne réglementée (€)' },
    { k: 'lifeEuroFund', l: 'Assurance vie fonds euros (€)' },
    { k: 'mortgage', l: 'Capital crédit restant (€)' }
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
        Marge <em style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', color: 'var(--champagne)' }}>révélée</em>
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 24px', maxWidth: 720 }}>
        En 60 secondes, vois l&apos;ordre de grandeur de ce que ta banque garde pour elle chaque année, en moyenne, sur
        un client comme toi. Estimations indicatives à but pédagogique.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <div className="grid grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.k}>
                <label style={labelStyle}>{f.l}</label>
                <input
                  className="input"
                  type="number"
                  value={b[f.k]}
                  onChange={(e) => setB({ ...b, [f.k]: +e.target.value })}
                />
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Ta banque principale</label>
              <select className="input" value={bank} onChange={(e) => setBank(e.target.value as Bank)}>
                {BANKS.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--champagne)' }}>
            Marge estimée par an
          </div>
          <div
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(40px,8vw,60px)',
              fontWeight: 600,
              color: 'var(--bad)',
              lineHeight: 1.05,
              margin: '6px 0'
            }}
          >
            {fmt(annual)}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Sur 10 ans</div>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 26, color: 'var(--pearl)' }}>{fmt(tenY)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>vs moyenne nationale</div>
              <div
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 26,
                  color: delta >= 0 ? 'var(--bad)' : 'var(--good)'
                }}
              >
                {delta >= 0 ? '+' : ''}
                {fmt(delta)}
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--lavender)', opacity: 0.9, marginTop: 14 }}>
            L&apos;idée n&apos;est pas d&apos;accuser, mais de <strong>voir</strong>. Ce que tu récupères en réduisant les frais
            cachés, tu peux le redéployer vers ton objectif.
          </p>
        </div>
      </div>

      <section className="mt-8 card">
        <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, fontWeight: 500, margin: '0 0 10px', color: 'var(--pearl)' }}>
          Trois leviers concrets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: 'Assurance emprunteur', d: "Renégocier grâce à la loi Lemoine peut représenter plusieurs milliers d'euros sur la durée d'un crédit." },
            { t: 'Assurance vie', d: "Comparer les frais de gestion des unités de compte et la place des fonds maison dans les profils gérés." },
            { t: 'Frais de tenue de compte', d: "Auditer les services payants inutilisés et les frais récurrents souvent oubliés." }
          ].map((c) => (
            <div key={c.t}>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 18, fontWeight: 600, color: 'var(--champagne)' }}>{c.t}</div>
              <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--lavender)', opacity: 0.92 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <p style={{ marginTop: 20, fontSize: 12.5, color: 'var(--muted)', fontStyle: 'italic', fontFamily: '"Fraunces", serif' }}>
        Estimations indicatives bâties sur des moyennes sectorielles publiques — ce n&apos;est pas un audit certifié de ta
        situation, ni un conseil personnalisé. Fiches détaillées par banque dans{' '}
        <Link href="/partenaires" style={{ color: 'var(--pink)' }}>la page partenaires</Link>.
      </p>
    </>
  );
}
