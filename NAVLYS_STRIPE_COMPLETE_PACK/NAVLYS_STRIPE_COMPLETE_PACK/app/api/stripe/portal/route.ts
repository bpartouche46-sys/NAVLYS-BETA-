// =============================================================================
// NAVLYS — POST /api/stripe/portal
// Ouvre le Customer Portal Stripe pour gérer abo / facturation.
// =============================================================================
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PortalBody {
  customerId?: string;
  email?: string;
  locale?: "fr" | "en";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: PortalBody;
  try {
    body = (await req.json()) as PortalBody;
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  let customerId = body.customerId;

  // Résolution par email si pas d'ID fourni
  if (!customerId && body.email) {
    const list = await stripe.customers.list({ email: body.email, limit: 1 });
    customerId = list.data[0]?.id;
  }

  if (!customerId) {
    return NextResponse.json(
      { error: "Customer introuvable. Fournis customerId ou email." },
      { status: 400 },
    );
  }

  const baseUrl = process.env.NAVLYS_BASE_URL ?? "https://navlys.com";
  const returnPath = body.locale === "en" ? "/en/join-the-crew" : "/rejoindre-equipage";

  try {
    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${baseUrl}${returnPath}`,
      locale: body.locale === "en" ? "en" : "fr",
    });
    return NextResponse.json({ url: portal.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur portal";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
