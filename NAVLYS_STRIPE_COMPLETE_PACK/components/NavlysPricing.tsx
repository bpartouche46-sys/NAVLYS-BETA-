"use client";
// =============================================================================
// NAVLYS — Composant Pricing
// 3 cartes : Mensuel / Annuel + pièce bronze / Bio Live
// =============================================================================
import { useState } from "react";
import { NAVLYS_PLANS, formatEuro, type NavlysPlan } from "@/lib/navlysPrices";

interface NavlysPricingProps {
  locale: "fr" | "en";
  vibezActive?: boolean;
  vibezCode?: string;
  vibezPercentOff?: number;
}

export function NavlysPricing({
  locale,
  vibezActive = false,
  vibezCode,
  vibezPercentOff,
}: NavlysPricingProps): JSX.Element {
  const [loading, setLoading] = useState<NavlysPlan | null>(null);

  async function handleCheckout(plan: NavlysPlan): Promise<void> {
    setLoading(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          locale,
          promotionCode: vibezActive ? vibezCode : undefined,
        }),
      });
      const data: { url?: string; error?: string } = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // eslint-disable-next-line no-alert
        alert(data.error ?? (locale === "fr" ? "Erreur" : "Error"));
      }
    } finally {
      setLoading(null);
    }
  }

  const labels = locale === "fr"
    ? { join: "Rejoindre l'équipage", mostPopular: "Le plus choisi", saveYear: "Économise 98 €/an" }
    : { join: "Join the crew", mostPopular: "Most chosen", saveYear: "Save 98 €/year" };

  return (
    <div className="navlys-pricing-grid">
      {(Object.keys(NAVLYS_PLANS) as NavlysPlan[]).map((key) => {
        const cfg = NAVLYS_PLANS[key];
        const isAnnual = key === "annual";
        const displayPrice = vibezActive && vibezPercentOff
          ? cfg.unitAmountCents * (1 - vibezPercentOff / 100)
          : cfg.unitAmountCents;
        return (
          <div
            key={key}
            className={`navlys-pricing-card${isAnnual ? " navlys-pricing-card--featured" : ""}`}
            data-plan={key}
          >
            {isAnnual && <div className="navlys-pricing-badge">{labels.mostPopular}</div>}
            <h3 className="navlys-pricing-title">
              {locale === "fr" ? cfg.labelFr : cfg.labelEn}
            </h3>
            <p className="navlys-pricing-pitch">
              {locale === "fr" ? cfg.pitchFr : cfg.pitchEn}
            </p>
            <div className="navlys-pricing-price">
              {vibezActive && vibezPercentOff ? (
                <>
                  <span className="navlys-pricing-old">
                    {formatEuro(cfg.unitAmountCents, locale === "fr" ? "fr-FR" : "en-GB")}
                  </span>
                  <span className="navlys-pricing-new">
                    {formatEuro(displayPrice, locale === "fr" ? "fr-FR" : "en-GB")}
                  </span>
                </>
              ) : (
                <span className="navlys-pricing-new">
                  {formatEuro(cfg.unitAmountCents, locale === "fr" ? "fr-FR" : "en-GB")}
                </span>
              )}
              <span className="navlys-pricing-cadence">
                {key === "monthly" && (locale === "fr" ? " /mois" : " /month")}
                {key === "annual" && (locale === "fr" ? " /an" : " /year")}
                {key === "bio_live" && (locale === "fr" ? " une fois" : " one-time")}
              </span>
            </div>
            {isAnnual && (
              <p className="navlys-pricing-save">{labels.saveYear}</p>
            )}
            {cfg.includesBronzeCoin && (
              <p className="navlys-pricing-coin">
                {locale === "fr"
                  ? "🟫 Pièce de bronze NAVLYS livrée chez toi."
                  : "🟫 NAVLYS bronze coin shipped to your home."}
              </p>
            )}
            <button
              type="button"
              className="navlys-pricing-cta"
              disabled={loading !== null}
              onClick={() => void handleCheckout(key)}
            >
              {loading === key ? "…" : labels.join}
            </button>
          </div>
        );
      })}
    </div>
  );
}
