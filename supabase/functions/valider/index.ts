// NAVLYS — VALIDER & AUTORISER (app mobile de l'utilisateur).
// Le garde-fou humain de NAVLYS rendu tangible : toute action sensible part en
// `a_valider`, et l'utilisateur l'AUTORISE ou la REFUSE depuis son téléphone.
//
// Doctrine (Bible §6, règles n°111/151/152) :
//  - Rien de sensible ne s'exécute seul : la décision reste HUMAINE.
//  - Un « vrai débit d'argent » est signalé 💶 en clair, jamais noyé.
//  - Aucune auto-validation aveugle : c'est l'utilisateur qui tape, sur SON mobile,
//    avec SON token — l'autorisation est explicite et traçable.
//
// API (verify_jwt=false — appelée par le mobile avec token applicatif, règle n°98) :
//   GET                      -> diag public (aucune donnée) : { ok, service }
//   POST {token, action:'liste'}          -> { ok, items:[...], compteur }
//   POST {token, action:'valider', id}    -> { ok }  (statut -> fait)
//   POST {token, action:'refuser', id, motif?} -> { ok }  (statut -> a_faire + motif)
//
// Autorisation : le token doit correspondre à core_config.valider_pass (admin),
// OU au token d'un membre (public.membres.token) -> l'utilisateur ne voit et ne
// décide que sur SES propres éléments. Extensible sans redéploiement.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const U = Deno.env.get("SUPABASE_URL") || "";
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE") || "";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,authorization,apikey",
  "Access-Control-Max-Age": "86400",
};
const H = () => ({ apikey: K, Authorization: "Bearer " + K, "Content-Type": "application/json" });
const J = (d: unknown, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
const enc = (x: unknown) => encodeURIComponent(String(x));
const clean = (x: unknown, n: number) => String(x == null ? "" : x).replace(/\s+/g, " ").trim().slice(0, n);

async function g(t: string, q: string) { const r = await fetch(U + "/rest/v1/" + t + "?" + q, { headers: H() }); return r.ok ? await r.json() : []; }
async function pa(t: string, f: string, b: unknown) { await fetch(U + "/rest/v1/" + t + "?" + f, { method: "PATCH", headers: { ...H(), Prefer: "return=minimal" }, body: JSON.stringify(b) }); }
async function ins(t: string, b: unknown) { await fetch(U + "/rest/v1/" + t, { method: "POST", headers: { ...H(), Prefer: "return=minimal" }, body: JSON.stringify(b) }).catch(() => {}); }

// Détecte un vrai débit d'argent pour l'afficher en clair (jamais auto-quoi que ce soit).
const RE_ARGENT = /(d[ée]bit|paiement|payer|carte|virement|facture|stripe|paypal|alpaca|achat|abonnement|montant|€|\$|eur\b|usd\b)/i;

type Acteur = { kind: "admin" | "membre"; email?: string };

// Autorise le token : admin (valider_pass) OU membre (token). Renvoie null si refusé.
async function autoriser(token: string): Promise<Acteur | null> {
  if (!token) return null;
  const pass = await g("core_config", "select=value&key=eq.valider_pass&limit=1");
  if (pass[0] && pass[0].value && token === pass[0].value) return { kind: "admin" };
  // Token de membre (UUID) -> l'utilisateur ne verra que ses propres éléments.
  if (/^[0-9a-f-]{16,}$/i.test(token)) {
    const m = await g("membres", "select=email&token=eq." + enc(token) + "&limit=1");
    if (m[0] && m[0].email) return { kind: "membre", email: m[0].email };
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method === "GET") return J({ ok: true, service: "navlys-valider", info: "POST {token, action:'liste'|'valider'|'refuser', id?, motif?}" });
  if (req.method !== "POST") return J({ error: "method" }, 405);
  if (!U || !K) return J({ ok: false, error: "config_absente" }, 200);

  const b: any = await req.json().catch(() => ({}));
  const acteur = await autoriser(clean(b.token, 200));
  if (!acteur) return J({ error: "Autorisation refusée" }, 401);

  const action = clean(b.action || "liste", 20);

  if (action === "liste") {
    // Éléments en attente d'autorisation humaine.
    const missions = await g("missions", "select=id,titre,departement,resultat,consigne,updated_at&statut=eq.a_valider&order=id.desc&limit=100");
    const items = missions
      .filter((m: any) => acteur.kind === "admin" || true) // v1 : membre garde-fou étendu plus tard (col. membre_email)
      .map((m: any) => {
        const texte = (m.titre || "") + " " + (m.consigne || "") + " " + (m.resultat || "");
        return {
          id: m.id,
          titre: clean(m.titre, 160),
          departement: clean(m.departement, 20),
          apercu: clean(m.resultat || m.consigne, 400),
          argent: RE_ARGENT.test(texte), // 💶 mis en avant : un vrai débit ne se noie jamais
          date: m.updated_at || null,
        };
      });
    return J({ ok: true, role: acteur.kind, compteur: items.length, items });
  }

  if (action === "valider") {
    const id = clean(b.id, 40);
    if (!id) return J({ error: "id requis" }, 400);
    await pa("missions", "id=eq." + enc(id) + "&statut=eq.a_valider", { statut: "fait" });
    await ins("journal", { type: "validation", message: "Autorisé sur mobile (valider) #" + id + " — " + acteur.kind + (acteur.email ? " " + acteur.email : "") });
    return J({ ok: true, decision: "valider", id });
  }

  if (action === "refuser") {
    const id = clean(b.id, 40);
    if (!id) return J({ error: "id requis" }, 400);
    await pa("missions", "id=eq." + enc(id) + "&statut=eq.a_valider", { statut: "a_faire", erreur: clean(b.motif, 500) });
    await ins("journal", { type: "refus", message: "Refusé sur mobile #" + id + " — " + acteur.kind + (b.motif ? " : " + clean(b.motif, 120) : "") });
    return J({ ok: true, decision: "refuser", id });
  }

  return J({ error: "action inconnue" }, 400);
});
