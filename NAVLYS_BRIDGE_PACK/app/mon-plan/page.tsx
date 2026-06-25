/**
 * NAVLYS — /mon-plan (FR)
 *
 * Hosts the full 7-port journey in French locale.
 */

import { NavlysParcours } from "../../components/NavlysParcours";

export const metadata = {
  title: "NAVLYS — Ton plan en 7 escales",
  description:
    "Parcours unifié NAVLYS : fixe ton cap, révèle tes frais, applique la méthode 90/10, reçois ton plan.",
};

export default function MonPlanPage(): JSX.Element {
  return <NavlysParcours locale="fr" />;
}
