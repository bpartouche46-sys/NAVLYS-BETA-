// =============================================================================
// NAVLYS — /succes (confirmation FR)
// =============================================================================
import { stripe } from "@/lib/stripe";

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export const metadata = {
  title: "Bienvenue à bord — NAVLYS",
};

export default async function SuccesPage({ searchParams }: PageProps): Promise<JSX.Element> {
  const params = await searchParams;
  const sessionId = params.session_id;

  let plan = "monthly";
  let includesBronze = false;
  let email: string | null = null;

  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["customer"],
      });
      plan = session.metadata?.plan ?? "monthly";
      includesBronze = session.metadata?.includes_bronze_coin === "true";
      email = session.customer_details?.email ?? session.customer_email ?? null;
    } catch {
      // silencieux : la page reste accessible même si la session a expiré
    }
  }

  return (
    <main className="navlys-page navlys-page--success">
      <header className="navlys-hero">
        <h1>Bienvenue à bord, marin·e.</h1>
        <p className="navlys-hero__lead">
          Tu fais maintenant partie de l'équipage NAVLYS.
        </p>
      </header>

      <section className="navlys-success-card">
        <h2>Ce qui se passe maintenant</h2>
        <ol>
          <li>Tu reçois un email de bienvenue {email ? `à ${email}` : "à l'adresse fournie"}.</li>
          <li>Ton accès à NAVLYS NEXT GEN INVEST est actif immédiatement.</li>
          {includesBronze && (
            <li>
              <strong>Ta pièce de bronze NAVLYS</strong> est commandée à
              l'atelier de frappe. Tu la reçois sous 3 semaines environ.
              Suivi UPS envoyé par email.
            </li>
          )}
          <li>Plan choisi : <code>{plan}</code>.</li>
        </ol>

        <a href="/membre" className="navlys-cta">
          Ouvrir mon espace membre
        </a>
        <a href="/fr/faq-paiement" className="navlys-link-secondary">
          Voir la FAQ paiement
        </a>
      </section>

      <footer className="navlys-page-footer">
        <p><em>« Ta première ancre. »</em></p>
      </footer>
    </main>
  );
}
