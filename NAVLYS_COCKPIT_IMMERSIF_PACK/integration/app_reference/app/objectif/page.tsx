'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  GOAL_PRESETS,
  computeFinal,
  computeMonthly,
  computeDurationMonths,
  fmtEUR,
  fmtMonths,
  type Mode
} from '@/lib/objectif';

/**
 * Simulateur d'objectif NAVLYS (escale 1 du parcours).
 * Math pure réutilisée de lib/objectif.ts. Données illustratives — pas un conseil.
 */
export default function ObjectifPage() {
  const [mode, setMode] = useState<Mode>('monthly');
  const [goalKey, setGoalKey] = useState<string>('voyage');
  const [start, setStart] = useState<number>(500);
  const [monthly, setMonthly] = useState<number>(100);
  const [years, setYears] = useState<number>(5);
  const [goal, setGoal] = useState<number>(3000);
  const [yieldPct, setYieldPct] = useState<number>(3);

  const inputs = {
    startAmount: start,
    monthly,
    goalAmount: goal,
    durationMonths: years * 12,
    annualYieldPct: yieldPct
  };

  const result = useMemo(() => {
    if (mode === 'monthly') return fmtEUR(Math.max(0, computeMonthly(inputs)));
    if (mode === 'final') return fmtEUR(Math.max(0, computeFinal(inputs)));
    return fmtMonths(computeDurationMonths(inputs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, start, monthly, years, goal, yieldPct]);

  const resultLabel =
    mode === 'monthly' ? 'À mettre de côté chaque mois' : mode === 'final' ? 'Capital final estimé' : 'Temps nécessaire';

  function applyPreset(key: string) {
    const p = GOAL_PRESETS.find((g) => g.key === key);
    if (!p) return;
    setGoalKey(key);
    setGoal(p.defaultAmount);
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 6,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'var(--champagne)'
  };

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
        Ton <em style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', color: 'var(--champagne)' }}>objectif</em>, ton plan, tes chiffres
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 24px', maxWidth: 720 }}>
        Choisis un objectif, joue avec les chiffres, NAVLYS te montre le chemin. Pas de conseiller, pas de produit à
        vendre — juste un écran et un plan clair. Calcul illustratif.
      </p>

      {/* Objectifs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {GOAL_PRESETS.map((g) => (
          <button
            key={g.key}
            onClick={() => applyPreset(g.key)}
            className="card"
            style={{
              cursor: 'pointer',
              textAlign: 'left',
              padding: 14,
              borderColor: goalKey === g.key ? 'var(--line-strong)' : 'var(--line)',
              background:
                goalKey === g.key
                  ? 'linear-gradient(140deg, rgba(232,24,137,0.18), rgba(75,26,128,0.25))'
                  : undefined
            }}
          >
            <div style={{ fontSize: 22 }}>{g.emoji}</div>
            <div style={{ fontSize: 13, color: 'var(--lavender)', marginTop: 4 }}>{g.label}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          {/* Modes */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {(
              [
                { k: 'monthly', l: 'Combien / mois ?' },
                { k: 'final', l: 'Combien à la fin ?' },
                { k: 'duration', l: 'En combien de temps ?' }
              ] as { k: Mode; l: string }[]
            ).map((m) => (
              <button
                key={m.k}
                onClick={() => setMode(m.k)}
                className="btn-ghost"
                style={{
                  padding: '10px 6px',
                  fontSize: 12,
                  borderColor: mode === m.k ? 'var(--line-strong)' : 'var(--line)',
                  color: mode === m.k ? 'var(--pearl)' : 'var(--lavender)',
                  background: mode === m.k ? 'rgba(232,24,137,0.14)' : 'transparent'
                }}
              >
                {m.l}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Mise de départ (€)</label>
              <input className="input" type="number" value={start} onChange={(e) => setStart(+e.target.value)} />
            </div>
            {mode !== 'final' && (
              <div>
                <label style={labelStyle}>Objectif (€)</label>
                <input className="input" type="number" value={goal} onChange={(e) => setGoal(+e.target.value)} />
              </div>
            )}
            {mode !== 'monthly' && (
              <div>
                <label style={labelStyle}>Versement mensuel (€)</label>
                <input className="input" type="number" value={monthly} onChange={(e) => setMonthly(+e.target.value)} />
              </div>
            )}
            {mode !== 'duration' && (
              <div>
                <label style={labelStyle}>Durée (années)</label>
                <input className="input" type="number" value={years} onChange={(e) => setYears(+e.target.value)} />
              </div>
            )}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Rendement annuel espéré : {yieldPct} %</label>
              <input
                type="range"
                min={1}
                max={8}
                step={0.5}
                value={yieldPct}
                onChange={(e) => setYieldPct(+e.target.value)}
                style={{ width: '100%' }}
              />
              <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic', fontFamily: '"Fraunces", serif', marginTop: 4 }}>
                3 % = prudent · au-delà, plus de risque
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--champagne)' }}>
            {resultLabel}
          </div>
          <div
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(42px,9vw,68px)',
              fontWeight: 600,
              color: 'var(--good)',
              lineHeight: 1.05,
              margin: '8px 0'
            }}
          >
            {result}
          </div>
          <p style={{ fontSize: 13, color: 'var(--lavender)', opacity: 0.9, margin: '6px auto 0', maxWidth: 360 }}>
            Tu changes un curseur, tout se recalcule. Quand tu tiens ton cap, retrouve-le dans{' '}
            <Link href="/cockpit" style={{ color: 'var(--pink)' }}>le cockpit</Link>.
          </p>
        </div>
      </div>

      <p style={{ marginTop: 20, fontSize: 12.5, color: 'var(--muted)', fontStyle: 'italic', fontFamily: '"Fraunces", serif' }}>
        Calcul illustratif à intérêts composés. Les rendements ne sont pas garantis ; les performances passées ne
        préjugent pas du futur. Information pédagogique, pas un conseil personnalisé.
      </p>
    </>
  );
}
