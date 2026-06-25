/**
 * NAVLYS Veille Premium — Influence score.
 *
 * Pure function. Computes the world-watch score from a list of recent
 * events validated by the agency quorum + market correlation window.
 */

export type ClasseOracle = "A" | "B" | "C";

export interface EvenementOracle {
  readonly id: string;
  readonly oracleId: string;
  readonly horodatageUtc: string;
  readonly nbAgencesReprises: number;       // 0..6
  readonly delaiQuorumMinutes: number;       // time to quorum, 0..60
  readonly mouvementIndicePct: number;       // % move on reference index in 4h window
  readonly volatiliteMoyenne: number;         // baseline daily vol in %, e.g. 0.8
  readonly classeOracle: ClasseOracle;
  readonly anticipateur: boolean;
}

export interface InfluenceScoreOutput {
  readonly score: number;                    // 0..100
  readonly nbEvenementsMajeurs: number;
  readonly nbEvenementsForts: number;
  readonly nbEvenementsNotables: number;
  readonly commentaire: string;
}

const clamp = (n: number, min = 0, max = 100): number =>
  Math.max(min, Math.min(max, n));

/** Quorum score from agency uptake + speed. */
function scoreQuorum(nb: number, delaiMin: number): number {
  if (nb >= 6 && delaiMin <= 30) return 100;
  if (nb >= 5 && delaiMin <= 60) return 85;
  if (nb >= 4 && delaiMin <= 60) return 60;
  return 25;
}

/** Market correlation score: |move| / vol baseline. */
function scoreCorrelation(mouvementPct: number, volBaseline: number): number {
  if (volBaseline <= 0) return 0;
  const ratio = Math.abs(mouvementPct) / volBaseline;
  return clamp(Math.round(ratio * 50), 0, 100);
}

/** Class multiplier. */
function multiClasse(c: ClasseOracle): number {
  return c === "A" ? 1.0 : c === "B" ? 0.75 : 0.5;
}

/**
 * Computes the aggregate world-watch influence score over a window
 * of recent oracle events.
 */
export function calculerScoreInfluence(
  evenements: ReadonlyArray<EvenementOracle>,
): InfluenceScoreOutput {
  if (evenements.length === 0) {
    return {
      score: 0,
      nbEvenementsMajeurs: 0,
      nbEvenementsForts: 0,
      nbEvenementsNotables: 0,
      commentaire: "Aucun événement détecté sur la fenêtre. Pression mondiale nulle.",
    };
  }

  let total = 0;
  let majeurs = 0;
  let forts = 0;
  let notables = 0;

  for (const e of evenements) {
    const sq = scoreQuorum(e.nbAgencesReprises, e.delaiQuorumMinutes);
    const sc = scoreCorrelation(e.mouvementIndicePct, e.volatiliteMoyenne);
    const m = multiClasse(e.classeOracle);
    const bonus = e.anticipateur ? 1.1 : 1.0;
    const sEv = clamp(Math.round((sq * 0.5 + sc * 0.5) * m * bonus));
    total += sEv;
    if (sEv >= 85) majeurs++;
    else if (sEv >= 60) forts++;
    else if (sEv >= 40) notables++;
  }

  const moyenne = clamp(Math.round(total / evenements.length));

  return {
    score: moyenne,
    nbEvenementsMajeurs: majeurs,
    nbEvenementsForts: forts,
    nbEvenementsNotables: notables,
    commentaire: composerCommentaire(moyenne, majeurs, forts),
  };
}

function composerCommentaire(score: number, majeurs: number, forts: number): string {
  if (majeurs >= 2) {
    return `Pression mondiale très forte (${score}/100). ${majeurs} événements majeurs en cours. Reste à quai.`;
  }
  if (majeurs >= 1 || forts >= 2) {
    return `Pression mondiale notable (${score}/100). Surveille la propagation.`;
  }
  if (score >= 40) {
    return `Pression mondiale modérée (${score}/100). Quelques signaux à surveiller.`;
  }
  return `Pression mondiale faible (${score}/100). Mer calme.`;
}
