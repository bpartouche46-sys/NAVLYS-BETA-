/**
 * NAVLYS — /api/plan-save
 *
 * Receives a NavlysPlan + email + consent. Validates, persists (placeholder),
 * and sends an email via Resend if RESEND_API_KEY is configured.
 *
 * Returns: { ok: boolean, reason?: string }
 */

import { NextRequest, NextResponse } from "next/server";
import { NavlysLocale, NavlysPlan } from "../../../lib/navlysBridge";

interface RequestBody {
  readonly plan: NavlysPlan;
  readonly email: string;
  readonly consent: boolean;
  readonly locale: NavlysLocale;
}

const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, reason: "invalid-json" },
      { status: 400 },
    );
  }

  if (!body.consent) {
    return NextResponse.json(
      { ok: false, reason: "consent-required" },
      { status: 400 },
    );
  }
  if (!EMAIL_REGEX.test(body.email)) {
    return NextResponse.json(
      { ok: false, reason: "invalid-email" },
      { status: 400 },
    );
  }
  if (!body.plan || typeof body.plan.objectif?.montantCible !== "number") {
    return NextResponse.json(
      { ok: false, reason: "invalid-plan" },
      { status: 400 },
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "plan@navlys.app";

  if (!resendKey) {
    // Placeholder mode: no real send. Useful for local dev.
    return NextResponse.json({ ok: true, reason: "placeholder" });
  }

  const subject =
    body.locale === "fr"
      ? "NAVLYS — Ton plan unifié"
      : "NAVLYS — Your unified plan";

  const text = composerEmailText(body.plan, body.locale);

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [body.email],
        subject,
        text,
      }),
    });
    if (!r.ok) {
      return NextResponse.json(
        { ok: false, reason: "resend-failure" },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, reason: "network-error" },
      { status: 502 },
    );
  }
}

function composerEmailText(plan: NavlysPlan, locale: NavlysLocale): string {
  if (locale === "fr") {
    return [
      `Bonjour,`,
      ``,
      `Ton plan NAVLYS est prêt.`,
      ``,
      `Cap : ${plan.objectif.montantCible} € sur ${plan.objectif.duree} mois.`,
      `Économies de frais : ${plan.economiesAnnuelles} €/an.`,
      `Délai accéléré de ${plan.acceleration.moisGagnes} mois (${plan.acceleration.pctPlusVite} % plus vite).`,
      `Forteresse 90 % : ${plan.partitionForcter90Actif10.forteresse} €.`,
      `Voilier 10 % : ${plan.partitionForcter90Actif10.jeuActif} €.`,
      `Marge de protection max : ${plan.margeProtectionMax} €.`,
      `Stratégie recommandée : ${plan.stratRecommandee}.`,
      ``,
      `Garde cette bouteille à la mer précieusement.`,
      ``,
      plan.disclaimer,
    ].join("\n");
  }
  return [
    `Hello,`,
    ``,
    `Your NAVLYS plan is ready.`,
    ``,
    `Heading: ${plan.objectif.montantCible} € over ${plan.objectif.duree} months.`,
    `Fee savings: ${plan.economiesAnnuelles} €/year.`,
    `Timeline accelerated by ${plan.acceleration.moisGagnes} months (${plan.acceleration.pctPlusVite} % faster).`,
    `Fortress 90 %: ${plan.partitionForcter90Actif10.forteresse} €.`,
    `Sailboat 10 %: ${plan.partitionForcter90Actif10.jeuActif} €.`,
    `Max protection margin: ${plan.margeProtectionMax} €.`,
    `Recommended strategy: ${plan.stratRecommandee}.`,
    ``,
    `Keep this bottle safely.`,
    ``,
    plan.disclaimer,
  ].join("\n");
}
