"use client";

/**
 * NavlysParcours — Orchestrator of the 7-port journey.
 *
 * State machine: each port advances when the visitor completes its input.
 * The component finally renders <PlanUnifieCard /> and <SaveAndShareModal />.
 */

import { useMemo, useState } from "react";
import {
  NavlysFraisActuels,
  NavlysLocale,
  NavlysObjectif,
  NavlysObjectifType,
  NavlysPlan,
  getDisclaimer,
} from "../lib/navlysBridge";
import { composerPlan } from "../lib/planComposer";
import { PlanUnifieCard } from "./PlanUnifieCard";
import { SaveAndShareModal } from "./SaveAndShareModal";

export interface NavlysParcoursProps {
  readonly locale: NavlysLocale;
}

type Etape = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const OBJECTIFS_PRESETS: ReadonlyArray<{
  readonly type: NavlysObjectifType;
  readonly labelFr: string;
  readonly labelEn: string;
  readonly montantParDefaut: number;
  readonly dureeParDefaut: number;
}> = [
  { type: "voyage", labelFr: "Voyage", labelEn: "Travel", montantParDefaut: 5000, dureeParDefaut: 12 },
  { type: "voiture", labelFr: "Voiture", labelEn: "Car", montantParDefaut: 15000, dureeParDefaut: 24 },
  { type: "mariage", labelFr: "Mariage", labelEn: "Wedding", montantParDefaut: 20000, dureeParDefaut: 18 },
  { type: "naissance", labelFr: "Naissance", labelEn: "Birth", montantParDefaut: 8000, dureeParDefaut: 9 },
  { type: "etudes", labelFr: "Études", labelEn: "Studies", montantParDefaut: 30000, dureeParDefaut: 36 },
  { type: "immo", labelFr: "Immobilier", labelEn: "Real estate", montantParDefaut: 50000, dureeParDefaut: 60 },
  { type: "retraite", labelFr: "Retraite", labelEn: "Retirement", montantParDefaut: 100000, dureeParDefaut: 240 },
  { type: "imprevus", labelFr: "Imprévus", labelEn: "Unexpected", montantParDefaut: 5000, dureeParDefaut: 12 },
];

const STYLES = {
  bg: "#000",
  ice: "#7DD3FC",
  iceDim: "#0E4F66",
  text: "#F2F4F7",
  textDim: "#9AA3AF",
};

const t = (locale: NavlysLocale, fr: string, en: string): string =>
  locale === "fr" ? fr : en;

export function NavlysParcours(props: NavlysParcoursProps): JSX.Element {
  const { locale } = props;
  const [etape, setEtape] = useState<Etape>(1);
  const [objectif, setObjectif] = useState<NavlysObjectif>({
    type: "voyage",
    montantCible: 5000,
    duree: 12,
    rendementPctAnnuel: 4,
  });
  const [frais, setFrais] = useState<NavlysFraisActuels>({
    broker: "etoro",
    banque: "boursorama",
    tradesParMois: 10,
    ticketMoyen: 500,
    fraisBanqueMensuels: 12,
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const plan: NavlysPlan = useMemo<NavlysPlan>(() => {
    const base = composerPlan(objectif, frais);
    return { ...base, disclaimer: getDisclaimer(locale) };
  }, [objectif, frais, locale]);

  const next = (): void => {
    setEtape((e) => (e < 7 ? ((e + 1) as Etape) : e));
  };
  const prev = (): void => {
    setEtape((e) => (e > 1 ? ((e - 1) as Etape) : e));
  };

  const stepLabel = (n: Etape): string => {
    const labelsFr = [
      "Quel est ton cap ?",
      "Combien de temps ?",
      "Tes frais actuels",
      "L'écart révélé",
      "La méthode 90/10",
      "Ton plan unifié",
      "Reçois ton plan",
    ];
    const labelsEn = [
      "What is your heading?",
      "How long?",
      "Your current fees",
      "The revealed gap",
      "The 90/10 method",
      "Your unified plan",
      "Receive your plan",
    ];
    return locale === "fr" ? labelsFr[n - 1] : labelsEn[n - 1];
  };

  return (
    <div
      style={{
        background: STYLES.bg,
        color: STYLES.text,
        minHeight: "100vh",
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <header style={{ marginBottom: 24 }}>
        <div style={{ color: STYLES.ice, fontSize: 14, letterSpacing: 2 }}>
          NAVLYS
        </div>
        <h1 style={{ fontSize: 28, margin: "8px 0 4px" }}>
          {t(locale, "Ton parcours en 7 escales", "Your 7-port journey")}
        </h1>
        <div style={{ color: STYLES.textDim, fontSize: 14 }}>
          {t(locale, "Escale", "Port")} {etape} / 7 — {stepLabel(etape)}
        </div>
        <div
          style={{
            display: "flex",
            gap: 4,
            marginTop: 12,
          }}
        >
          {([1, 2, 3, 4, 5, 6, 7] as Etape[]).map((n) => (
            <div
              key={n}
              style={{
                flex: 1,
                height: 4,
                background: n <= etape ? STYLES.ice : STYLES.iceDim,
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto" }}>
        {etape === 1 && (
          <section>
            <p style={{ color: STYLES.textDim }}>
              {t(
                locale,
                "Choisis le phare qui t'appelle.",
                "Pick the lighthouse that calls you.",
              )}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: 12,
                margin: "16px 0",
              }}
            >
              {OBJECTIFS_PRESETS.map((p) => (
                <button
                  key={p.type}
                  onClick={() =>
                    setObjectif({
                      type: p.type,
                      montantCible: p.montantParDefaut,
                      duree: p.dureeParDefaut,
                      rendementPctAnnuel: objectif.rendementPctAnnuel,
                    })
                  }
                  style={{
                    background: objectif.type === p.type ? STYLES.ice : "transparent",
                    color: objectif.type === p.type ? STYLES.bg : STYLES.text,
                    border: `1px solid ${STYLES.ice}`,
                    borderRadius: 8,
                    padding: "12px",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  {locale === "fr" ? p.labelFr : p.labelEn}
                </button>
              ))}
            </div>
            <label style={{ display: "block", marginTop: 12 }}>
              {t(locale, "Montant cible (€)", "Target amount (€)")}
              <input
                type="number"
                value={objectif.montantCible}
                onChange={(e) =>
                  setObjectif({ ...objectif, montantCible: Number(e.target.value) })
                }
                style={{
                  display: "block",
                  width: "100%",
                  background: STYLES.bg,
                  color: STYLES.text,
                  border: `1px solid ${STYLES.iceDim}`,
                  borderRadius: 6,
                  padding: "10px",
                  marginTop: 4,
                }}
              />
            </label>
            <label style={{ display: "block", marginTop: 12 }}>
              {t(locale, "Rendement annuel attendu", "Expected annual return")} :{" "}
              {objectif.rendementPctAnnuel} %
              <input
                type="range"
                min={1}
                max={8}
                step={1}
                value={objectif.rendementPctAnnuel}
                onChange={(e) =>
                  setObjectif({
                    ...objectif,
                    rendementPctAnnuel: Number(e.target.value),
                  })
                }
                style={{ display: "block", width: "100%", marginTop: 4 }}
              />
            </label>
          </section>
        )}

        {etape === 2 && (
          <section>
            <p style={{ color: STYLES.textDim }}>
              {t(
                locale,
                "Choisis ta voile : combien de mois pour atteindre ce cap ?",
                "Pick your sail: how many months to reach this heading?",
              )}
            </p>
            <label style={{ display: "block", marginTop: 16 }}>
              {t(locale, "Durée (mois)", "Duration (months)")} : {objectif.duree}
              <input
                type="range"
                min={3}
                max={360}
                step={1}
                value={objectif.duree}
                onChange={(e) =>
                  setObjectif({ ...objectif, duree: Number(e.target.value) })
                }
                style={{ display: "block", width: "100%", marginTop: 4 }}
              />
            </label>
          </section>
        )}

        {etape === 3 && (
          <section>
            <p style={{ color: STYLES.textDim }}>
              {t(
                locale,
                "Inspecte ta coque actuelle. Combien de coquillages ?",
                "Inspect your current hull. How many barnacles?",
              )}
            </p>
            <label style={{ display: "block", marginTop: 12 }}>
              {t(locale, "Broker actuel", "Current broker")}
              <input
                type="text"
                value={frais.broker}
                onChange={(e) => setFrais({ ...frais, broker: e.target.value })}
                style={inputStyle()}
              />
            </label>
            <label style={{ display: "block", marginTop: 12 }}>
              {t(locale, "Banque actuelle", "Current bank")}
              <input
                type="text"
                value={frais.banque}
                onChange={(e) => setFrais({ ...frais, banque: e.target.value })}
                style={inputStyle()}
              />
            </label>
            <label style={{ display: "block", marginTop: 12 }}>
              {t(locale, "Trades par mois", "Trades per month")}
              <input
                type="number"
                value={frais.tradesParMois}
                onChange={(e) =>
                  setFrais({ ...frais, tradesParMois: Number(e.target.value) })
                }
                style={inputStyle()}
              />
            </label>
            <label style={{ display: "block", marginTop: 12 }}>
              {t(locale, "Ticket moyen (€)", "Average ticket (€)")}
              <input
                type="number"
                value={frais.ticketMoyen}
                onChange={(e) =>
                  setFrais({ ...frais, ticketMoyen: Number(e.target.value) })
                }
                style={inputStyle()}
              />
            </label>
            <label style={{ display: "block", marginTop: 12 }}>
              {t(locale, "Frais banque mensuels (€)", "Monthly bank fees (€)")}
              <input
                type="number"
                value={frais.fraisBanqueMensuels}
                onChange={(e) =>
                  setFrais({
                    ...frais,
                    fraisBanqueMensuels: Number(e.target.value),
                  })
                }
                style={inputStyle()}
              />
            </label>
          </section>
        )}

        {etape === 4 && (
          <section>
            <p style={{ color: STYLES.textDim }}>
              {t(
                locale,
                "La marée se retire. Voici les pierres immergées.",
                "The tide recedes. Here are the rocks underwater.",
              )}
            </p>
            <div
              style={{
                marginTop: 16,
                padding: 20,
                border: `1px solid ${STYLES.ice}`,
                borderRadius: 10,
              }}
            >
              <div style={{ fontSize: 14, color: STYLES.textDim }}>
                {t(locale, "Tu payes par an", "You pay per year")}
              </div>
              <div style={{ fontSize: 36, color: STYLES.ice }}>
                {plan.economiesAnnuelles} €
              </div>
              <div style={{ fontSize: 14, color: STYLES.textDim, marginTop: 8 }}>
                {t(
                  locale,
                  "que tu pourrais récupérer avec un setup aligné.",
                  "you could recover with an aligned setup.",
                )}
              </div>
            </div>
          </section>
        )}

        {etape === 5 && (
          <section>
            <p style={{ color: STYLES.textDim }}>
              {t(
                locale,
                "La forteresse 90 % garde ton trésor. Le voilier 10 % explore.",
                "The 90 % fortress keeps your treasure. The 10 % sailboat explores.",
              )}
            </p>
            <div style={{ marginTop: 16, fontSize: 15, lineHeight: 1.6 }}>
              {t(
                locale,
                "La forteresse ne bouge jamais. Le voilier peut tanguer, mais sans menacer la forteresse. C'est tout.",
                "The fortress never moves. The sailboat may sway, but cannot threaten the fortress. That's all.",
              )}
            </div>
          </section>
        )}

        {etape === 6 && <PlanUnifieCard plan={plan} locale={locale} />}

        {etape === 7 && (
          <section>
            <p style={{ color: STYLES.textDim }}>
              {t(
                locale,
                "Glisse ton plan dans une bouteille à la mer.",
                "Slip your plan into a sealed bottle.",
              )}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                marginTop: 16,
                background: STYLES.ice,
                color: STYLES.bg,
                border: "none",
                borderRadius: 8,
                padding: "14px 20px",
                fontSize: 16,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {t(locale, "Recevoir mon plan", "Receive my plan")}
            </button>
            <SaveAndShareModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              plan={plan}
              locale={locale}
            />
          </section>
        )}
      </main>

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 720,
          margin: "32px auto 0",
        }}
      >
        <button
          onClick={prev}
          disabled={etape === 1}
          style={navBtn(etape === 1)}
        >
          {t(locale, "← Précédent", "← Previous")}
        </button>
        <button
          onClick={next}
          disabled={etape === 7}
          style={navBtn(etape === 7)}
        >
          {t(locale, "Suivant →", "Next →")}
        </button>
      </nav>

      <footer
        style={{
          marginTop: 40,
          paddingTop: 16,
          borderTop: `1px solid ${STYLES.iceDim}`,
          color: STYLES.textDim,
          fontSize: 12,
          textAlign: "center",
        }}
      >
        {getDisclaimer(locale)}
      </footer>
    </div>
  );
}

function inputStyle(): React.CSSProperties {
  return {
    display: "block",
    width: "100%",
    background: STYLES.bg,
    color: STYLES.text,
    border: `1px solid ${STYLES.iceDim}`,
    borderRadius: 6,
    padding: "10px",
    marginTop: 4,
  };
}

function navBtn(disabled: boolean): React.CSSProperties {
  return {
    background: "transparent",
    color: disabled ? STYLES.iceDim : STYLES.ice,
    border: `1px solid ${disabled ? STYLES.iceDim : STYLES.ice}`,
    borderRadius: 6,
    padding: "10px 16px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 14,
  };
}
