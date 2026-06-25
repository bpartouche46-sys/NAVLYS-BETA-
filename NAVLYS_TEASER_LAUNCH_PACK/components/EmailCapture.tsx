/**
 * NAVLYS — EmailCapture.tsx
 * Capture d'email de préinscription.
 *  1) mémoire locale (localStorage) — démo / hors-ligne
 *  2) POST vers l'endpoint (placeholder /api/preinscription) — branché le jour J
 *  3) fallback mailto si aucune API
 *
 * TypeScript strict. Aucune dépendance hors React.
 *
 *   <EmailCapture lang="fr" endpoint="/api/preinscription" fallbackMailto="cap@navlys.com" />
 */
import { useState, type FormEvent } from "react";

export type Lang = "fr" | "en";

export interface EmailCaptureProps {
  lang?: Lang;
  /** Endpoint POST JSON { email, lang, ts }. Défaut : /api/preinscription. */
  endpoint?: string;
  /** Adresse de repli si l'API n'existe pas encore. */
  fallbackMailto?: string;
}

const COPY: Record<Lang, {
  lead: string; ph: string; btn: string; note: string; ok: string; bad: string;
}> = {
  fr: {
    lead: "Sois prévenu·e quand NAVLYS lève l'ancre. Un seul message, le jour J.",
    ph: "ton@email.fr", btn: "Être prévenu",
    note: "Aucun bruit. Aucune revente. Juste le cap, le jour du lancement.",
    ok: "⚓ Tu es à bord. On te prévient le jour J.",
    bad: "Vérifie ton adresse, le cap a besoin d'un port valide.",
  },
  en: {
    lead: "Be notified when NAVLYS sets sail. One message, on launch day.",
    ph: "you@email.com", btn: "Notify me",
    note: "No noise. No resale. Just the bearing, on launch day.",
    ok: "⚓ You're aboard. We'll signal you on the day.",
    bad: "Check your address — the bearing needs a valid port.",
  },
};

const ICE = "#7DD3FC";
const BRONZE = "#B87333";
const COPPER = "#D49B5B";
const PEARL = "#E5E7EB";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function rememberLocally(email: string): void {
  try {
    const raw = window.localStorage.getItem("navlys_preinscrits");
    const arr: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    if (!arr.includes(email)) {
      arr.push(email);
      window.localStorage.setItem("navlys_preinscrits", JSON.stringify(arr));
    }
  } catch {
    /* localStorage indisponible : on ignore */
  }
}

export default function EmailCapture({
  lang = "fr",
  endpoint = "/api/preinscription",
  fallbackMailto = "cap@navlys.com",
}: EmailCaptureProps): JSX.Element {
  const t = COPY[lang];
  const [email, setEmail] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) { setError(true); return; }
    setError(false);
    rememberLocally(value);
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, lang, ts: Date.now() }),
      });
    } catch {
      // statique : pas d'API → on tente le repli mailto sans bloquer l'UX
      if (fallbackMailto) {
        const subject = encodeURIComponent("NAVLYS — préinscription");
        const body = encodeURIComponent(`Préinscription : ${value} (${lang})`);
        window.location.href = `mailto:${fallbackMailto}?subject=${subject}&body=${body}`;
      }
    }
    setDone(true);
  }

  const input: React.CSSProperties = {
    flex: "1 1 240px", minWidth: 0, padding: "14px 18px", borderRadius: 40,
    border: `1px solid ${error ? COPPER : `${ICE}59`}`, background: "rgba(6,11,18,.7)",
    color: PEARL, fontSize: 15, outline: "none",
  };
  const button: React.CSSProperties = {
    padding: "14px 26px", borderRadius: 40, border: "none", cursor: "pointer",
    background: `linear-gradient(120deg,${BRONZE},${COPPER})`, color: "#1a0f04",
    fontWeight: 600, fontSize: 15, letterSpacing: ".04em",
  };

  return (
    <section style={{ width: "100%", maxWidth: 480, margin: "34px auto 0", textAlign: "center" }}>
      {done ? (
        <div style={{ padding: "14px 18px", borderRadius: 14, background: "rgba(125,211,252,.08)",
                      border: `1px solid ${ICE}73`, color: ICE, fontSize: 15 }}>
          {t.ok}
        </div>
      ) : (
        <>
          <p style={{ color: "#bcccdb", fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>{t.lead}</p>
          <form onSubmit={onSubmit} noValidate style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <input type="email" required autoComplete="email" placeholder={t.ph} style={input}
                   value={email} onChange={(e) => setEmail(e.target.value)} aria-label={t.ph} />
            <button type="submit" style={button}>{t.btn}</button>
          </form>
          <div style={{ marginTop: 12, fontSize: 12, color: error ? COPPER : "#7d8ea0" }}>
            {error ? t.bad : t.note}
          </div>
        </>
      )}
    </section>
  );
}
