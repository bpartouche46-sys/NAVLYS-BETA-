// =============================================================================
// NAVLYS — POST /api/stripe/coin-order-request
// Endpoint interne : enregistre une demande d'envoi pièce bronze.
// Appelable manuellement (back-office) ou via handleCoinOrder côté webhook.
// =============================================================================
import { NextRequest, NextResponse } from "next/server";
import { handleCoinOrder } from "@/lib/coinOrderFulfillment";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CoinOrderBody {
  subscriptionId?: string;
  customerId?: string;
  invoiceId?: string;
  /** Token d'admin pour sécuriser l'appel manuel. */
  adminToken?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: CoinOrderBody;
  try {
    body = (await req.json()) as CoinOrderBody;
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  // Vérification admin token (env var côté Vercel)
  const expected = process.env.NAVLYS_ADMIN_TOKEN;
  if (!expected || body.adminToken !== expected) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (!body.subscriptionId || !body.customerId) {
    return NextResponse.json(
      { error: "subscriptionId et customerId requis" },
      { status: 400 },
    );
  }

  try {
    const result = await handleCoinOrder({
      subscriptionId: body.subscriptionId,
      customerId: body.customerId,
      invoiceId: body.invoiceId ?? "",
    });
    return NextResponse.json({ ok: true, order: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur coin order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
