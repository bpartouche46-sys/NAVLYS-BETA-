// =============================================================================
// NAVLYS — /rejoindre-equipage (FR)
// =============================================================================
import { NavlysPricing } from "@/components/NavlysPricing";
import { BronzeCoinPromise } from "@/components/BronzeCoinPromise";
import { VibezBadge } from "@/components/VibezBadge";

export const metadata = {
  title: "Rejoindre l'équipage — NAVLYS NEXT GEN INVEST",
  description:
    "Embarque sur NAVLYS. Algorithme local, signaux quotidiens, pièce de bronze NAVLYS livrée à l'année.",
};

// Active la promo Vibez selon date (escalier S1/S2/S3)
function getVibezContext(): { active: boolean; code: string; percentOff: number; endsAt: string } | null {
  const now = new Date();
  const may10 = new Date("2026-05-10T00:00:00Z");
  const may16 = new Date("2026-05-16T23:59:59Z");
  const may17 = new Date("2026-05-17T00:00:00Z");
  const may23 = new Date("2026-05-23T23:59:59Z");
  const may24 = new Date("2026-05-24T00:00:00Z");
  const may30 = new Date("2026-05-30T23:59:59Z");

  if (now >= may10 && now <= may16) {
    return { active: true, code: "VIBEZ80", percentOff: 80, endsAt: "16 mai 2026" };
  }
  if (now >= may17 && now <= may23) {
    return { active: true, code: "VIBEZ70", percentOff: 70, endsAt: "23 mai 2026" };
  }
  if (now >= may24 && now <= may30) {
    return { active: true, code: "VIBEZ10", percentOff: 10, endsAt: "30 mai 2026" };
  }
  return null;
}

export default function RejoindreEquipagePage(): JSX.Element {
  const vibez = getVibezContext();
  return (
    <main className="navlys-page navlys-page--join">
      <header className="navlys-hero">
        <h1>Rejoindre l'équipage NAVLYS</h1>
        <p className="navlys-hero__lead">
          Tu n'achètes pas un abonnement. Tu montes à bord.
        </p>
        {vibez && (
          <VibezBadge
            locale="fr"
            code={vibez.code}
            percentOff={vibez.percentOff}
            endsAt={vibez.endsAt}
          />
        )}
      </header>

      <NavlysPricing
        locale="fr"
        vibezActive={vibez?.active ?? false}
        vibezCode={vibez?.code}
        vibezPercentOff={vibez?.percentOff}
      />

      <BronzeCoinPromise locale="fr" />

      <section className="navlys-faq-link">
        <p>
          Une question avant d'embarquer ?{" "}
          <a href="/fr/faq-paiement">Voir la FAQ paiement</a>.
        </p>
      </section>

      <footer className="navlys-page-footer">
        <p>
          <em>« On ne navigue pas contre le vent, on ajuste les voiles. »</em>
        </p>
        <p className="navlys-disclaimer">
          NAVLYS NEXT GEN INVEST est un outil d'aide à la décision. Les signaux
          ne constituent pas un conseil en investissement personnalisé.
          Tu restes capitaine de tes positions.
        </p>
      </footer>
    </main>
  );
}
