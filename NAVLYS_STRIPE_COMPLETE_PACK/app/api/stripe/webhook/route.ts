// =============================================================================
// NAVLYS — POST /api/stripe/webhook
// Vérifie la signature Stripe-Signature et route les events.
// Idempotency par event.id (Stripe garantit que chaque event a un ID unique).
// =============================================================================
import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, assertWebhookSecret } from "@/lib/stripe";
import { handleCoinOrder } from "@/lib/coinOrderFulfillment";
import { sendWelcomeEmail } from "@/lib/emails/welcome";
import { sendPaymentFailedEmail } from "@/lib/emails/paymentFailed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Set en mémoire process — bascule sur Redis/DB en prod
const processedEvents = new Set<string>();

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = assertWebhookSecret();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Signature invalide";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (processedEvents.has(event.id)) {
    return NextResponse.json({ received: true, duplicated: true });
  }
  processedEvents.add(event.id);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const locale = (session.metadata?.locale === "en" ? "en" : "fr") as "fr" | "en";
        const email = session.customer_details?.email ?? session.customer_email ?? "";
        if (email) {
          await sendWelcomeEmail({ email, plan: session.metadata?.plan ?? "monthly", locale });
        }
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = (invoice as unknown as { subscription?: string }).subscription;
        if (subId) {
          const sub = await stripe.subscriptions.retrieve(subId);
          const includesBronze = sub.metadata?.includes_bronze_coin === "true";
          if (includesBronze) {
            await handleCoinOrder({
              subscriptionId: sub.id,
              customerId: sub.customer as string,
              invoiceId: invoice.id ?? "",
            });
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const email = invoice.customer_email ?? "";
        if (email) {
          await sendPaymentFailedEmail({ email, amountDue: invoice.amount_due, locale: "fr" });
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        // Log seulement — pas d'action côté NAVLYS pour ces events
        break;

      default:
        // Event non géré : on accuse réception (200) pour éviter retry inutile
        break;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur traitement webhook";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
