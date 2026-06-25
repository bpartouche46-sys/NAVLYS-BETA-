"use client";

/**
 * SaveAndShareModal — Email capture + WhatsApp share.
 *
 * Lightweight modal, no external dependency. Submits to /api/plan-save.
 */

import { useState } from "react";
import { NavlysLocale, NavlysPlan } from "../lib/navlysBridge";
import { savePlan, whatsAppShareUrl } from "../lib/leadCapture";

export interface SaveAndShareModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly plan: NavlysPlan;
  readonly locale: NavlysLocale;
}

const ICE = "#7DD3FC";
const ICE_DIM = "#0E4F66";
const BG = "#0A0A0A";
const TEXT = "#F2F4F7";
const TEXT_DIM = "#9AA3AF";

const t = (locale: NavlysLocale, fr: string, en: string): string =>
  locale === "fr" ? fr : en;

export function SaveAndShareModal(props: SaveAndShareModalProps): JSX.Element | null {
  const { open, onClose, plan, locale } = props;
  const [email, setEmail] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const [reason, setReason] = useState<string>("");

  if (!open) {
    return null;
  }

  const handleSave = async (): Promise<void> => {
    setStatus("sending");
    setReason("");
    const res = await savePlan({ plan, email, consent, locale });
    if (res.ok) {
      setStatus("ok");
    } else {
      setStatus("error");
      setReason(res.reason ?? "unknown");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: BG,
          color: TEXT,
          border: `1px solid ${ICE}`,
          borderRadius: 12,
          padding: 24,
          maxWidth: 480,
          width: "100%",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h3 style={{ marginTop: 0, color: ICE }}>
          {t(locale, "Reçois ton plan", "Receive your plan")}
        </h3>
        <p style={{ color: TEXT_DIM, fontSize: 14 }}>
          {t(
            locale,
            "Une bouteille à la mer scellée. Tu la reçois par email, ou tu la partages sur WhatsApp.",
            "A sealed bottle. You receive it by email, or share it on WhatsApp.",
          )}
        </p>

        <label style={{ display: "block", marginTop: 12 }}>
          {t(locale, "Email", "Email")}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              background: "#000",
              color: TEXT,
              border: `1px solid ${ICE_DIM}`,
              borderRadius: 6,
              padding: 10,
              marginTop: 4,
            }}
          />
        </label>

        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            marginTop: 12,
            fontSize: 13,
            color: TEXT_DIM,
          }}
        >
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            style={{ marginTop: 3 }}
          />
          <span>
            {t(
              locale,
              "J'accepte de recevoir mon plan par email. Je peux me désinscrire à tout moment.",
              "I agree to receive my plan by email. I can unsubscribe at any time.",
            )}
          </span>
        </label>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button
            onClick={handleSave}
            disabled={status === "sending"}
            style={{
              flex: 1,
              background: ICE,
              color: "#000",
              border: "none",
              borderRadius: 6,
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {status === "sending"
              ? t(locale, "Envoi...", "Sending...")
              : t(locale, "Envoyer par email", "Send by email")}
          </button>
          <a
            href={whatsAppShareUrl(plan, locale)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              background: "transparent",
              color: ICE,
              border: `1px solid ${ICE}`,
              borderRadius: 6,
              padding: "10px 14px",
              textDecoration: "none",
            }}
          >
            WhatsApp
          </a>
        </div>

        {status === "ok" && (
          <div style={{ marginTop: 12, color: ICE, fontSize: 13 }}>
            {t(locale, "Bouteille envoyée. Vérifie ta boîte.", "Bottle sent. Check your inbox.")}
          </div>
        )}
        {status === "error" && (
          <div style={{ marginTop: 12, color: "#FCA5A5", fontSize: 13 }}>
            {t(locale, "Échec d'envoi", "Send failed")} ({reason})
          </div>
        )}

        <div
          style={{
            marginTop: 16,
            paddingTop: 12,
            borderTop: `1px solid ${ICE_DIM}`,
            color: TEXT_DIM,
            fontSize: 11,
          }}
        >
          {plan.disclaimer}
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: 12,
            background: "transparent",
            color: TEXT_DIM,
            border: "none",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          {t(locale, "Fermer", "Close")}
        </button>
      </div>
    </div>
  );
}
