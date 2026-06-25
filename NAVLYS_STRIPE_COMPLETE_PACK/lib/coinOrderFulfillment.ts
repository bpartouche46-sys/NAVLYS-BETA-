// =============================================================================
// NAVLYS — Logique fulfillment pièce de bronze
// Déclenché par webhook invoice.paid sur sub annuelle (metadata includes_bronze_coin=true).
// =============================================================================
import { stripe } from "@/lib/stripe";
import { sendCoinShippedEmail } from "@/lib/emails/coinShipped";

export interface CoinOrderInput {
  subscriptionId: string;
  customerId: string;
  invoiceId: string;
}

export interface CoinOrderResult {
  orderRef: string;
  customerEmail: string;
  shippingAddress: Record<string, string | null>;
  serialNumber: string;
  estimatedShipDate: string;
}

/**
 * Crée une commande pièce bronze.
 *  1. Vérifie l'adresse postale côté customer Stripe.
 *  2. Génère numéro de série (séquentiel, prefix NAVLYS-).
 *  3. Notifie l'atelier de frappe (fulfillment@navlys.com — placeholder).
 *  4. Envoie email "ta pièce part dans 3 semaines" au membre.
 */
export async function handleCoinOrder(input: CoinOrderInput): Promise<CoinOrderResult> {
  const customer = await stripe.customers.retrieve(input.customerId);
  if (customer.deleted) {
    throw new Error(`Customer ${input.customerId} supprimé.`);
  }

  const email = customer.email ?? "";
  const shipping = customer.shipping ?? null;
  if (!shipping || !shipping.address) {
    throw new Error(
      `Adresse postale manquante pour ${input.customerId}. Bloquer l'envoi et demander à Bruno.`,
    );
  }

  // Anti-doublon : vérifie qu'on n'a pas déjà créé de commande pour cette sub
  const existing = await stripe.subscriptions.retrieve(input.subscriptionId);
  if (existing.metadata?.bronze_coin_order_ref) {
    return {
      orderRef: existing.metadata.bronze_coin_order_ref,
      customerEmail: email,
      shippingAddress: serializeAddress(shipping.address),
      serialNumber: existing.metadata.bronze_coin_serial ?? "UNKNOWN",
      estimatedShipDate: existing.metadata.bronze_coin_eta ?? new Date().toISOString(),
    };
  }

  const orderRef = `NAVLYS-BRONZE-${Date.now().toString(36).toUpperCase()}`;
  const serialNumber = generateSerial();
  const estimatedShipDate = computeEta(21); // 3 semaines

  // Marque la sub avec la référence (idempotency naturelle)
  await stripe.subscriptions.update(input.subscriptionId, {
    metadata: {
      ...existing.metadata,
      bronze_coin_order_ref: orderRef,
      bronze_coin_serial: serialNumber,
      bronze_coin_eta: estimatedShipDate,
    },
  });

  // Notifie l'atelier (placeholder — branche un vrai mail SMTP/Resend en prod)
  await notifyMintingWorkshop({
    orderRef,
    serialNumber,
    customerEmail: email,
    shipping: shipping.address,
    name: shipping.name ?? customer.name ?? "Équipage NAVLYS",
  });

  // Email membre : "ta pièce part dans 3 semaines"
  await sendCoinShippedEmail({
    email,
    orderRef,
    serialNumber,
    estimatedShipDate,
    locale: "fr",
    stage: "scheduled",
  });

  return {
    orderRef,
    customerEmail: email,
    shippingAddress: serializeAddress(shipping.address),
    serialNumber,
    estimatedShipDate,
  };
}

function serializeAddress(
  addr: { line1?: string | null; line2?: string | null; city?: string | null; postal_code?: string | null; country?: string | null; state?: string | null },
): Record<string, string | null> {
  return {
    line1: addr.line1 ?? null,
    line2: addr.line2 ?? null,
    city: addr.city ?? null,
    postal_code: addr.postal_code ?? null,
    country: addr.country ?? null,
    state: addr.state ?? null,
  };
}

function generateSerial(): string {
  // Format : NAVLYS-2026-#### (séquentiel à branchen sur DB en prod)
  const year = new Date().getFullYear();
  const seq = Math.floor(Math.random() * 9999).toString().padStart(4, "0");
  return `NAVLYS-${year}-${seq}`;
}

function computeEta(days: number): string {
  const eta = new Date();
  eta.setDate(eta.getDate() + days);
  return eta.toISOString().split("T")[0];
}

interface WorkshopNotice {
  orderRef: string;
  serialNumber: string;
  customerEmail: string;
  shipping: {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    postal_code?: string | null;
    country?: string | null;
  };
  name: string;
}

async function notifyMintingWorkshop(notice: WorkshopNotice): Promise<void> {
  // Placeholder : log structuré côté serveur. Branche Resend/SendGrid/SMTP en prod.
  const payload = {
    to: process.env.NAVLYS_WORKSHOP_EMAIL ?? "fulfillment@navlys.com",
    subject: `[NAVLYS] Frappe pièce bronze — ${notice.orderRef}`,
    body: [
      `Bon de commande NAVLYS — pièce de bronze`,
      `Référence : ${notice.orderRef}`,
      `Série    : ${notice.serialNumber}`,
      `Membre   : ${notice.name} (${notice.customerEmail})`,
      `Adresse  :`,
      `  ${notice.shipping.line1 ?? ""}`,
      notice.shipping.line2 ? `  ${notice.shipping.line2}` : "",
      `  ${notice.shipping.postal_code ?? ""} ${notice.shipping.city ?? ""}`,
      `  ${notice.shipping.country ?? ""}`,
      ``,
      `Specs : 32 mm, 12 g, CuSn8, recto NAVLYS, verso étoile polaire.`,
      `Packaging : boîte velours bleu marine NAVLYS, carte numérotée signée.`,
      `Suivi UPS demandé, à transmettre à Bruno (bpartouche46@gmail.com).`,
    ].filter(Boolean).join("\n"),
  };
  // eslint-disable-next-line no-console
  console.log("[NAVLYS coin order]", JSON.stringify(payload));
}
