// NAVLYS · CHEVAL DE TROIE · lib/margins.ts
// Pure functions for bank margin estimation (server + client safe).

export type Bank =
  | "BNP_Paribas"
  | "Credit_Agricole"
  | "Societe_Generale"
  | "LCL"
  | "La_Banque_Postale";

export interface ClientBalances {
  current: number;
  savings: number;
  lifeEuroFund: number;
  mortgage: number;
}

interface MarginTable {
  current: number;
  savings: number;
  life: number;
  mortgage: number;
}

const MARGIN_BPS: Record<Bank, MarginTable> = {
  BNP_Paribas:       { current: 90, savings: 60, life: 110, mortgage: 70 },
  Credit_Agricole:   { current: 80, savings: 55, life: 100, mortgage: 65 },
  Societe_Generale:  { current: 85, savings: 60, life: 105, mortgage: 70 },
  LCL:               { current: 80, savings: 55, life:  95, mortgage: 65 },
  La_Banque_Postale: { current: 70, savings: 50, life:  90, mortgage: 55 },
};

export function annualMargin(bank: Bank, b: ClientBalances): number {
  const m = MARGIN_BPS[bank];
  return (
    (b.current * m.current +
      b.savings * m.savings +
      b.lifeEuroFund * m.life +
      b.mortgage * m.mortgage) /
    10_000
  );
}

export function tenYearMargin(bank: Bank, b: ClientBalances): number {
  return annualMargin(bank, b) * 10;
}

export const NATIONAL_AVG_ANNUAL = 320;
