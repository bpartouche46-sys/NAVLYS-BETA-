// =============================================================================
// NAVLYS — /en/success (EN mirror)
// =============================================================================
import { stripe } from "@/lib/stripe";

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export const metadata = {
  title: "Welcome aboard — NAVLYS",
};

export default async function SuccessPage({ searchParams }: PageProps): Promise<JSX.Element> {
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
      // silent
    }
  }

  return (
    <main className="navlys-page navlys-page--success">
      <header className="navlys-hero">
        <h1>Welcome aboard, sailor.</h1>
        <p className="navlys-hero__lead">You're now part of the NAVLYS crew.</p>
      </header>

      <section className="navlys-success-card">
        <h2>What happens now</h2>
        <ol>
          <li>You'll receive a welcome email {email ? `at ${email}` : "at the address you provided"}.</li>
          <li>Your NAVLYS NEXT GEN INVEST access is live immediately.</li>
          {includesBronze && (
            <li>
              <strong>Your NAVLYS bronze coin</strong> has been ordered from the
              minting workshop. You'll receive it in ~3 weeks. UPS tracking
              will be emailed.
            </li>
          )}
          <li>Plan selected: <code>{plan}</code>.</li>
        </ol>

        <a href="/member" className="navlys-cta">Open my member area</a>
        <a href="/en/faq-payment" className="navlys-link-secondary">See the payment FAQ</a>
      </section>

      <footer className="navlys-page-footer">
        <p><em>"Your first anchor."</em></p>
      </footer>
    </main>
  );
}
