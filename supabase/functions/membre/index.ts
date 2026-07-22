// NAVLYS — Espace membre : le mini-site public de chaque membre, à navlys.com/membres/<slug>.
//   GET  ?slug=prenom-nom                         -> site public {slug, prenom, titre, bio, photo_url, liens, statut}
//   POST {action:'save', token, titre, bio, photo_url, liens}  -> le PROPRIÉTAIRE édite son site (token membre)
//   POST {action:'reserver', token}               -> garantit le slug + la fiche du membre (idempotent)
//   POST {action:'critique', slug, texte, prenom?, contact?}   -> 💡 relié au CORE (core_feedback)
//
// DOCTRINE : découverte gratuite (statut 'decouverte'), passe 'actif' au paiement (géré ailleurs).
// Écriture uniquement via cette fonction (service_role). Le token du membre l'autorise à éditer SON site.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = { "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"GET,POST,OPTIONS", "Access-Control-Allow-Headers":"content-type,authorization,apikey" };
const J = (d: unknown, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "Content-Type":"application/json", ...CORS } });
const clean = (x: unknown, n: number) => String(x == null ? "" : x).replace(/\s+/g, " ").trim().slice(0, n);
const hh = () => ({ apikey: K, Authorization: "Bearer " + K, "Content-Type": "application/json" });
async function rest(method: string, path: string, body?: unknown, prefer?: string) {
  const r = await fetch(U + "/rest/v1/" + path, { method, headers: { ...hh(), ...(prefer ? { Prefer: prefer } : {}) }, body: body ? JSON.stringify(body) : undefined });
  const d = await r.json().catch(() => null); return { ok: r.ok, d };
}

function slugify(s: string): string {
  return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "membre";
}
const pubSite = (r: any) => r && ({ slug: r.slug, prenom: r.prenom, titre: r.titre, bio: r.bio, photo_url: r.photo_url, liens: Array.isArray(r.liens) ? r.liens : [], statut: r.statut });
function nettoieLiens(x: unknown) {
  if (!Array.isArray(x)) return [];
  return x.slice(0, 12).map((l: any) => ({ label: clean(l && l.label, 60), url: clean(l && l.url, 300) }))
    .filter((l) => l.label && /^https?:\/\//i.test(l.url));
}

// Résout un membre par son token -> {email, prenom, slug}
async function membreParToken(token: string) {
  const g = await rest("GET", `membres?token=eq.${encodeURIComponent(token)}&select=email,prenom,slug`);
  if (!g.ok || !Array.isArray(g.d) || !g.d.length) return null;
  return g.d[0];
}
// Garantit un slug unique pour ce membre + une fiche core_membre_site (idempotent)
async function reserver(m: any) {
  let slug = m.slug || "";
  if (!slug) {
    const base = slugify(m.prenom || (m.email || "").split("@")[0]);
    slug = base;
    const ex = await rest("GET", `membres?slug=eq.${encodeURIComponent(slug)}&select=email`);
    if (ex.ok && Array.isArray(ex.d) && ex.d.length && ex.d[0].email !== m.email) {
      // collision : suffixe court déterministe depuis l'e-mail
      let h = 0; for (const c of (m.email || "")) h = (h * 31 + c.charCodeAt(0)) >>> 0;
      slug = base + "-" + h.toString(36).slice(0, 4);
    }
    await rest("PATCH", `membres?email=eq.${encodeURIComponent(m.email)}`, { slug });
  }
  // fiche site (créée si absente)
  const s = await rest("GET", `core_membre_site?slug=eq.${encodeURIComponent(slug)}&select=slug`);
  if (!(s.ok && Array.isArray(s.d) && s.d.length)) {
    await rest("POST", "core_membre_site", { slug, email: m.email, prenom: m.prenom || "", titre: (m.prenom ? (m.prenom + " sur NAVLYS") : "Mon espace NAVLYS") }, "return=minimal");
  }
  return slug;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

  if (req.method === "GET") {
    const u = new URL(req.url);
    const slug = clean(u.searchParams.get("slug"), 40);
    if (!slug) return J({ ok: true, service: "navlys-membre" });
    const g = await rest("GET", `core_membre_site?slug=eq.${encodeURIComponent(slug)}&select=*`);
    if (!g.ok || !Array.isArray(g.d) || !g.d.length) return J({ ok: false, error: "Cet espace n'existe pas encore." }, 200);
    // compteur de vues (best effort, non bloquant)
    try { await rest("PATCH", `core_membre_site?slug=eq.${encodeURIComponent(slug)}`, { vues: (Number(g.d[0].vues) || 0) + 1 }, "return=minimal"); } catch (_e) { /* */ }
    return J({ ok: true, site: pubSite(g.d[0]) });
  }

  const b: any = await req.json().catch(() => ({}));
  if (b && b.website) return J({ ok: true }); // pot de miel
  const action = clean(b.action, 20);

  if (action === "critique") {
    const slug = clean(b.slug, 40);
    const texte = clean(b.texte, 2000);
    if (!texte) return J({ ok: false, error: "Écris ta remarque." }, 200);
    await rest("POST", "core_feedback", { page: "/membres/" + slug, type: "critique", portee: "perso", message: texte, prenom: clean(b.prenom, 80), contact: clean(b.contact, 160) }, "return=minimal");
    return J({ ok: true, message: "Merci — ta remarque est arrivée au CORE. 🌊" });
  }

  const token = clean(b.token, 60);
  if (!token) return J({ ok: false, error: "Connecte-toi pour éditer ton espace." }, 200);
  const m = await membreParToken(token);
  if (!m) return J({ ok: false, error: "Profil introuvable — inscris-toi d'abord." }, 200);

  if (action === "reserver") {
    const slug = await reserver(m);
    return J({ ok: true, slug });
  }

  if (action === "save") {
    const slug = await reserver(m); // garantit slug + fiche
    const patch: any = { updated_at: new Date().toISOString() };
    if (b.titre != null) patch.titre = clean(b.titre, 120);
    if (b.bio != null) patch.bio = clean(b.bio, 2000);
    if (b.photo_url != null) { const p = clean(b.photo_url, 400); patch.photo_url = /^https?:\/\//i.test(p) ? p : ""; }
    if (b.liens != null) patch.liens = nettoieLiens(b.liens);
    const r = await rest("PATCH", `core_membre_site?slug=eq.${encodeURIComponent(slug)}`, patch, "return=representation");
    const row = r.ok && Array.isArray(r.d) && r.d[0] ? r.d[0] : null;
    return J({ ok: true, slug, site: row ? pubSite(row) : null });
  }

  return J({ ok: false, error: "action inconnue" }, 400);
});
