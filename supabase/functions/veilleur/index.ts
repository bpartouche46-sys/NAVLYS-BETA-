// ============================================================
// NAVLYS CORE — « veilleur »
// (1) mode=site     : teste chaque page de navlys.com (répond ? pas de blanc ?)
//                     → journalise VERT/ROUGE. Je vois casser AVANT Bruno.
// (2) mode=creation : produit la création du jour (promo auto, gratuite) et,
//                     si l'avatar est prêt, déclenche le clip parlant du jour.
// Tourne seul (crons). Aucune question à Bruno. Débit avatar = signalé (Bible §6).
// ============================================================

const SB_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SB_SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const ANTHROPIC = Deno.env.get("ANTHROPIC_API_KEY") ?? "";
// Repli anti-coupure (indépendance CORE) : OpenRouter si Anthropic tombe. Clé tolérante.
const OR = Deno.env.get("OPENROUTER_API_KEY") ?? Deno.env.get("OPENROUTER_KEY") ?? Deno.env.get("OPEN_ROUTER_API_KEY") ?? "";
const BASE = "https://navlys.com";
const FN = `${SB_URL}/functions/v1`;

const PAGES = [
  "/", "/cinema", "/finance", "/next-gen", "/assistance", "/promo",
  "/next-gen-beta", "/cockpit", "/tv", "/equipage", "/bibles",
  "/bible-marketing", "/next-gen-atelier", "/navlys-alive.js",
];

const json = (o: unknown, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } });

async function journal(type: string, message: string) {
  await fetch(`${SB_URL}/rest/v1/journal`, {
    method: "POST",
    headers: {
      apikey: SB_SERVICE, Authorization: `Bearer ${SB_SERVICE}`,
      "Content-Type": "application/json", Prefer: "return=minimal",
    },
    body: JSON.stringify({ ts: new Date().toISOString(), type, message }),
  }).catch(() => {});
}

// (1) Santé du site visible
async function santeSite() {
  const results = await Promise.all(PAGES.map(async (p) => {
    try {
      const r = await fetch(BASE + p, { redirect: "follow" });
      const body = await r.text();
      const vide = body.trim().length < 200;
      return { p, ok: r.ok && !vide, code: r.status, vide };
    } catch (e) {
      return { p, ok: false, code: 0, err: String(e) };
    }
  }));
  const ko = results.filter((x) => !x.ok);
  const niveau = ko.length ? "rouge" : "vert";
  const msg = `site ${niveau} — ${results.length - ko.length}/${results.length} pages OK`
    + (ko.length ? " — KO: " + ko.map((x) => x.p + "(" + x.code + ")").join(", ") : "");
  await journal("sante_site", msg);
  return { niveau, ko, total: results.length };
}

// (2) Création du jour — promo gratuite (Anthropic), + clip avatar si prêt
async function creationJour() {
  let promo = "";
  if (ANTHROPIC) {
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "x-api-key": ANTHROPIC, "anthropic-version": "2023-06-01", "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 220,
          messages: [{
            role: "user",
            content: "Écris la « promo du jour » NAVLYS Next Gen en 2 phrases courtes, ton marin, chaleureux, "
              + "plaisir & sérénité, statut simple citoyen (aucune promesse de rendement). "
              + "« Ta vie, comme un film. » Pas de hashtags.",
          }],
        }),
      });
      const j = await r.json();
      if (r.ok) promo = j?.content?.[0]?.text?.trim() ?? "";
    } catch (e) { promo = ""; }
  }
  // Repli OpenRouter si Anthropic n'a rien produit (indépendance CORE)
  if (!promo && OR) {
    const prompt = "Écris la « promo du jour » NAVLYS Next Gen en 2 phrases courtes, ton marin, chaleureux, "
      + "plaisir & sérénité, statut simple citoyen (aucune promesse de rendement). « Ta vie, comme un film. » Pas de hashtags.";
    for (const m of ["anthropic/claude-haiku-4.5", "meta-llama/llama-3.3-70b-instruct:free"]) {
      try {
        const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": "Bearer " + OR, "Content-Type": "application/json", "HTTP-Referer": "https://navlys.com", "X-Title": "NAVLYS" },
          body: JSON.stringify({ model: m, max_tokens: 220, messages: [{ role: "user", content: prompt }] }),
        });
        const d = await r.json().catch(() => ({}));
        if (r.ok) { const t = (d?.choices?.[0]?.message?.content || "").trim(); if (t) { promo = t; break; } }
      } catch (_) { /* modèle suivant */ }
    }
  }
  if (promo) await journal("creation_jour", promo);

  // Clip avatar si la brique est prête (sinon on n'appelle pas → aucun débit)
  let clip: unknown = { lance: false, raison: "avatar non prêt (clés manquantes)" };
  try {
    const d = await (await fetch(`${FN}/avatar?diag`)).json();
    if (d?.pret && promo) {
      const rc = await fetch(`${FN}/avatar`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: promo }),
      });
      clip = await rc.json();
      await journal("creation_jour", "clip avatar lancé (débit fal.ai/ElevenLabs)");
    }
  } catch (e) { clip = { lance: false, erreur: String(e) }; }

  return { promo, clip };
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const mode = url.searchParams.get("mode") ?? "site";
  try {
    if (mode === "creation") return json({ ok: true, mode, ...(await creationJour()) });
    return json({ ok: true, mode: "site", ...(await santeSite()) });
  } catch (e) {
    return json({ ok: false, error: String(e instanceof Error ? e.message : e) }, 500);
  }
});
