// NAVLYS Next Gen — le cerveau de l'atelier à souvenirs.
// POST {action, texte, sujet?}
//   'questions' -> 3–5 questions pour enrichir un doc/photo/video/récit
//   'polir'     -> réécrit : corrige orthographe/ponctuation/tournures, donne vie
//   'deroule'   -> enchaînement photo→vidéo→récit→son→musique à partir du récit
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const ANTH = Deno.env.get("ANTHROPIC_API_KEY") || "";
// Repli anti-coupure (indépendance CORE) : OpenRouter si Anthropic tombe. Clé tolérante.
const OR = Deno.env.get("OPENROUTER_API_KEY") || Deno.env.get("OPENROUTER_KEY") || Deno.env.get("OPEN_ROUTER_API_KEY") || "";
const MODEL = "claude-haiku-4-5-20251001";
const OR_MODELS = ["anthropic/claude-haiku-4.5", "meta-llama/llama-3.3-70b-instruct:free"];
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST,GET,OPTIONS", "Access-Control-Allow-Headers": "content-type,authorization,apikey" };
function J(d: unknown, s = 200) { return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS } }); }
const clean = (x: unknown, n: number) => String(x == null ? "" : x).replace(/\0/g, "").slice(0, n);
async function askAnthropic(system: string, user: string, maxT: number) {
  const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "x-api-key": ANTH, "anthropic-version": "2023-06-01", "Content-Type": "application/json" }, body: JSON.stringify({ model: MODEL, max_tokens: maxT, system, messages: [{ role: "user", content: user }] }) });
  const d: any = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error("anthropic_" + r.status);
  const t = ((d.content || []).filter((c: any) => c.type === "text").map((c: any) => c.text).join("\n").trim());
  if (!t) throw new Error("anthropic_empty");
  return t;
}
async function askOpenRouter(system: string, user: string, maxT: number) {
  for (const m of OR_MODELS) {
    try {
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", { method: "POST", headers: { "Authorization": "Bearer " + OR, "Content-Type": "application/json", "HTTP-Referer": "https://navlys.com", "X-Title": "NAVLYS" }, body: JSON.stringify({ model: m, max_tokens: maxT, messages: [{ role: "system", content: system }, { role: "user", content: user }] }) });
      const d: any = await r.json().catch(() => ({}));
      if (r.ok) { const t = (d?.choices?.[0]?.message?.content || "").trim(); if (t) return t; }
    } catch (_) { /* modèle suivant */ }
  }
  throw new Error("openrouter_failed");
}
// callBrain : Anthropic direct d'abord, OpenRouter en repli seul (indépendance CORE)
async function ask(system: string, user: string, maxT = 1200) {
  if (ANTH) { try { return await askAnthropic(system, user, maxT); } catch (_) { /* repli */ } }
  if (OR) return await askOpenRouter(system, user, maxT);
  throw new Error("no_llm");
}
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method === "GET") return J({ ok: true, service: "navlys-nextgen" });
  const b: any = await req.json().catch(() => ({}));
  const action = clean(b.action, 20) || "polir";
  const texte = clean(b.texte, 8000);
  const sujet = clean(b.sujet, 200);
  if (!ANTH && !OR) return J({ ok: false, error: "IA indisponible" }, 200);
  try {
    if (action === "questions") {
      const sys = "Tu es NAVLYS Next Gen, un biographe chaleureux et humain. On te donne un souvenir, un document, une photo ou une vidéo (décrite). Pose 3 à 5 questions courtes, douces et précises pour enrichir ce souvenir (qui, où, quand, l'émotion, un détail sensoriel). En français. Réponds UNIQUEMENT par les questions, une par ligne, sans numéro.";
      const out = await ask(sys, (sujet ? ("Élément : " + sujet + "\n") : "") + "Souvenir/description :\n" + (texte || "(vide)"));
      const questions = out.split("\n").map((s) => s.replace(/^[-*\d.\)\s]+/, "").trim()).filter(Boolean).slice(0, 5);
      return J({ ok: true, questions });
    }
    if (action === "deroule") {
      const sys = "Tu es le réalisateur NAVLYS Next Gen. À partir d'un récit de vie, propose un DÉROULÉ cinématique enchaînant les moments : pour chaque séquence, donne un titre court, l'image/photo à montrer, un plan vidéo/animation, la phrase de récit (voix off), l'ambiance sonore et une suggestion musicale. En français, sobre et émouvant. Réponds en JSON: {\"sequences\":[{\"titre\":\"\",\"photo\":\"\",\"video\":\"\",\"recit\":\"\",\"son\":\"\",\"musique\":\"\"}]}. Rien d'autre que le JSON.";
      const out = await ask(sys, "Récit :\n" + (texte || "(vide)"), 1800);
      let data: any = {}; try { data = JSON.parse(out.replace(/^```json?|```$/g, "").trim()); } catch { data = { sequences: [] }; }
      return J({ ok: true, sequences: Array.isArray(data.sequences) ? data.sequences.slice(0, 12) : [] });
    }
    if (action === "promo") {
      const sys = "Tu es NAVLYS Next Gen, auto-influenceur bienveillant. À partir du récit de vie, écris UNE promo du jour COURTE (2-3 phrases), chaleureuse et engageante, qui donne envie de découvrir cette histoire — sans exagérer ni rien promettre. Ajoute 2-3 hashtags sobres. Français. Réponds UNIQUEMENT par la promo.";
      const out = await ask(sys, "Récit :\n" + (texte || "(vide)"), 400);
      return J({ ok: true, promo: out });
    }
    const sys = "Tu es l'écrivain NAVLYS Next Gen. Réécris ce récit de vie en corrigeant l'orthographe, la ponctuation et les tournures maladroites, et en lui donnant VIE (rythme, images, émotion) — SANS inventer de faits, SANS changer le sens, en gardant la voix et la simplicité de la personne. Français. Réponds UNIQUEMENT par le texte réécrit.";
    const out = await ask(sys, (sujet ? ("Contexte : " + sujet + "\n") : "") + "Récit :\n" + (texte || "(vide)"), 2000);
    return J({ ok: true, texte_poli: out || texte });
  } catch (e) { return J({ ok: false, error: String((e as Error).message || e) }, 200); }
});
