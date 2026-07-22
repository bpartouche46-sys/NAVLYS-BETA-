"use client";

import { useMemo, useState } from "react";

type Bank =
  | "BNP_Paribas"
  | "Credit_Agricole"
  | "Societe_Generale"
  | "LCL"
  | "La_Banque_Postale";

interface Inputs {
  current: number;
  savings: number;
  lifeEuroFund: number;
  mortgage: number;
  bank: Bank;
}

// Estimations marges (basis points / produits) — calibrées pour démo grand public.
const MARGIN_BPS: Record<Bank, { current: number; savings: number; life: number; mortgage: number }> = {
  BNP_Paribas:       { current: 90, savings: 60, life: 110, mortgage: 70 },
  Credit_Agricole:   { current: 80, savings: 55, life: 100, mortgage: 65 },
  Societe_Generale:  { current: 85, savings: 60, life: 105, mortgage: 70 },
  LCL:               { current: 80, savings: 55, life:  95, mortgage: 65 },
  La_Banque_Postale: { current: 70, savings: 50, life:  90, mortgage: 55 },
};

function bp(v: number) {
  return v / 10000;
}

export default function MargeRevelee() {
  const [inp, setInp] = useState<Inputs>({
    current: 5000,
    savings: 15000,
    lifeEuroFund: 40000,
    mortgage: 120000,
    bank: "BNP_Paribas",
  });

  const annual = useMemo(() => {
    const m = MARGIN_BPS[inp.bank];
    return (
      inp.current * bp(m.current) +
      inp.savings * bp(m.savings) +
      inp.lifeEuroFund * bp(m.life) +
      inp.mortgage * bp(m.mortgage)
    );
  }, [inp]);

  const tenYears = annual * 10;
  const nationalAvg = 320;
  const delta = annual - nationalAvg;

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Marge Révélée</h2>
        <p className="text-sm text-slate-500">
          Vois en 60 secondes ce que ta banque garde pour elle chaque année, en moyenne, sur un client comme toi.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field
          label="Solde compte courant (€)"
          value={inp.current}
          onChange={(v) => setInp({ ...inp, current: v })}
        />
        <Field
          label="Épargne réglementée (€)"
          value={inp.savings}
          onChange={(v) => setInp({ ...inp, savings: v })}
        />
        <Field
          label="Assurance vie fonds euros (€)"
          value={inp.lifeEuroFund}
          onChange={(v) => setInp({ ...inp, lifeEuroFund: v })}
        />
        <Field
          label="Capital crédit restant (€)"
          value={inp.mortgage}
          onChange={(v) => setInp({ ...inp, mortgage: v })}
        />

        <label className="flex flex-col text-sm md:col-span-2">
          <span className="mb-1 text-slate-700">Votre banque principale</span>
          <select
            className="rounded-lg border border-slate-300 px-3 py-2"
            value={inp.bank}
            onChange={(e) => setInp({ ...inp, bank: e.target.value as Bank })}
          >
            <option value="BNP_Paribas">BNP Paribas</option>
            <option value="Credit_Agricole">Crédit Agricole</option>
            <option value="Societe_Generale">Société Générale</option>
            <option value="LCL">LCL</option>
            <option value="La_Banque_Postale">La Banque Postale</option>
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <div className="text-xs uppercase tracking-wide text-slate-400">
          Ce que ta banque garde environ
        </div>
        <div className="mt-1 text-3xl font-bold">
          {annual.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} € / an
        </div>
        <div className="mt-1 text-sm text-slate-300">
          ≈ {tenYears.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} € sur 10 ans
        </div>
        <div className="mt-2 text-xs text-slate-400">
          {delta >= 0
            ? `Soit ${Math.round(delta)} € de plus que la moyenne en France.`
            : `Soit ${Math.abs(Math.round(delta))} € de moins que la moyenne en France.`}
        </div>
      </div>

      <div className="mt-4 text-center">
        <a
          href="/"
          className="inline-block rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700"
        >
          Voir comment NAVLYS m'aide à planifier
        </a>
      </div>

      <p className="mt-4 text-center text-[11px] text-slate-400">
        Estimation pédagogique basée sur des moyennes publiques. NAVLYS ne donne
        aucun conseil personnalisé et ne vend aucun produit.
      </p>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col text-sm">
      <span className="mb-1 text-slate-700">{label}</span>
      <input
        type="number"
        min={0}
        className="rounded-lg border border-slate-300 px-3 py-2"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
