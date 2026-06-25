// =============================================================================
// NAVLYS — /en/join-the-crew (EN mirror)
// =============================================================================
import { NavlysPricing } from "@/components/NavlysPricing";
import { BronzeCoinPromise } from "@/components/BronzeCoinPromise";
import { VibezBadge } from "@/components/VibezBadge";

export const metadata = {
  title: "Join the crew — NAVLYS NEXT GEN INVEST",
  description:
    "Board NAVLYS. Local algorithm, daily signals, NAVLYS bronze coin shipped on annual.",
};

function getVibezContext(): { active: boolean; code: string; percentOff: number; endsAt: string } | null {
  const now = new Date();
  const may10 = new Date("2026-05-10T00:00:00Z");
  const may16 = new Date("2026-05-16T23:59:59Z");
  const may17 = new Date("2026-05-17T00:00:00Z");
  const may23 = new Date("2026-05-23T23:59:59Z");
  const may24 = new Date("2026-05-24T00:00:00Z");
  const may30 = new Date("2026-05-30T23:59:59Z");

  if (now >= may10 && now <= may16) {
    return { active: true, code: "VIBEZ80", percentOff: 80, endsAt: "May 16, 2026" };
  }
  if (now >= may17 && now <= may23) {
    return { active: true, code: "VIBEZ70", percentOff: 70, endsAt: "May 23, 2026" };
  }
  if (now >= may24 && now <= may30) {
    return { active: true, code: "VIBEZ10", percentOff: 10, endsAt: "May 30, 2026" };
  }
  return null;
}

export default function JoinTheCrewPage(): JSX.Element {
  const vibez = getVibezContext();
  return (
    <main className="navlys-page navlys-page--join">
      <header className="navlys-hero">
        <h1>Join the NAVLYS crew</h1>
        <p className="navlys-hero__lead">
          You're not buying a subscription. You're boarding.
        </p>
        {vibez && (
          <VibezBadge
            locale="en"
            code={vibez.code}
            percentOff={vibez.percentOff}
            endsAt={vibez.endsAt}
          />
        )}
      </header>

      <NavlysPricing
        locale="en"
        vibezActive={vibez?.active ?? false}
        vibezCode={vibez?.code}
        vibezPercentOff={vibez?.percentOff}
      />

      <BronzeCoinPromise locale="en" />

      <section className="navlys-faq-link">
        <p>
          Any question before boarding?{" "}
          <a href="/en/faq-payment">See the payment FAQ</a>.
        </p>
      </section>

      <footer className="navlys-page-footer">
        <p>
          <em>"You don't sail against the wind. You trim the sails."</em>
        </p>
        <p className="navlys-disclaimer">
          NAVLYS NEXT GEN INVEST is a decision-support tool. The signals are
          not personalized investment advice. You remain the captain of your
          positions.
        </p>
      </footer>
    </main>
  );
}
