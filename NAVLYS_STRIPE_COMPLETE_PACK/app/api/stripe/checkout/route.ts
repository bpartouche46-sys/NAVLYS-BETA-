// =============================================================================
// NAVLYS — POST /api/stripe/checkout
// Crée une Session Checkout selon le plan demandé. Mode subscription ou payment.
// Idempotency-Key obligatoire (anti-doublon).
// =============================================================================
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { stripe } from "@/lib/stripe";
import { NAVLYS_PLANS, planFromString, type NavlysPlan } from "@/lib/navlysPrices";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CheckoutBody {
  plan?: string;
  email?: string;
  locale?: "fr" | "en";
  promotionCode?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const plan: NavlysPlan | null = body.plan ? planFromString(body.plan) : null;
  if (!plan) {
    return NextResponse.json(
      { error: "Plan inconnu. Attendu : monthly | annual | bio_live" },
      { status: 400 },
    );
  }

  const config = NAVLYS_PLANS[plan];
  const baseUrl =
    process.env.NAVLYS_BASE_URL ?? "https://navlys.com";
  const locale = body.locale === "en" ? "en" : "fr";

  // Résolution du Price via lookup_key (pas d'ID en dur)
  const prices = await stripe.prices.list({
    lookup_keys: [config.lookupKey],
    expand: ["data.product"],
    active: true,
    limit: 1,
  });
  const price = prices.data[0];
  if (!price) {
    return NextResponse.json(
      { error: `Prix Stripe introuvable pour ${config.lookupKey}` },
      { status: 500 },
    );
  }

  const idempotencyKey = crypto
    .createHash("sha256")
    .update(`${body.email ?? "anon"}|${plan}|${Date.now() >> 12}`)
    .digest("hex");

  const successPath = locale === "fr" ? "/succes" : "/en/success";
  const cancelPath = locale === "fr" ? "/rejoindre-equipage" : "/en/join-the-crew";

  try {
    const session = await stripe.checkout.sessions.create(
      {
        mode: config.mode,
        line_items: [{ price: price.id, quantity: 1 }],
        customer_email: body.email,
        allow_promotion_codes: true,
        billing_address_collection: "required",
        ...(config.includesBronzeCoin
          ? {
              shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU", "DE", "ES", "IT", "PT", "NL", "GB", "US", "CA"] },
              phone_number_collection: { enabled: true },
            }
          : {}),
        ...(body.promotionCode
          ? { discounts: [{ promotion_code: body.promotionCode }] }
          : {}),
        metadata: {
          brand: "NAVLYS",
          plan,
          locale,
          includes_bronze_coin: String(config.includesBronzeCoin),
        },
        subscription_data:
          config.mode === "subscription"
            ? {
                metadata: {
                  brand: "NAVLYS",
                  plan,
                  includes_bronze_coin: String(config.includesBronzeCoin),
                },
              }
            : undefined,
        success_url: `${baseUrl}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}${cancelPath}?canceled=1`,
        locale: locale === "fr" ? "fr" : "en",
      },
      { idempotencyKey },
    );

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur Stripe inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
