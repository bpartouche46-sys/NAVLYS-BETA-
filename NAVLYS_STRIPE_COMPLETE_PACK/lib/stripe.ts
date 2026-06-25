// =============================================================================
// NAVLYS — Wrapper Stripe SDK
// Version SDK pinned : 2025-03-31
// =============================================================================
import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY;
if (!apiKey) {
  throw new Error("STRIPE_SECRET_KEY manquant côté serveur NAVLYS.");
}

export const stripe = new Stripe(apiKey, {
  apiVersion: "2025-03-31.basil",
  appInfo: {
    name: "NAVLYS NEXT GEN INVEST",
    version: "1.0.0",
    url: process.env.NAVLYS_BASE_URL ?? "https://navlys.com",
  },
  typescript: true,
});

export const STRIPE_WEBHOOK_SECRET: string =
  process.env.STRIPE_WEBHOOK_SECRET ?? "";

export function assertWebhookSecret(): string {
  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET manquant côté NAVLYS.");
  }
  return STRIPE_WEBHOOK_SECRET;
}
