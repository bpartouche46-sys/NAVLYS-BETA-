// NAVLYS — Edge Function : Webhook WhatsApp (360dialog)
// v2 · 2026-06-30
// Deux modes selon QUI écrit :
//   • Bruno (numéro = BRUNO_WHATSAPP)  -> MODE PILOTE : il drive les 14 agents
//        (crée des missions, /recap, /voir, /valider, /refuser, /rapport).
//   • Tout autre numéro                -> MODE SAV : réponse client chaleureuse (Anthropic).
//
// GET  /api/whatsapp-webhook  -> vérification (hub.challenge)
// POST /api/whatsapp-webhook  -> reçoit un message, répond, envoie via 360dialog
//
// Clés côté serveur (Vercel → Settings → Environment Variables) :
//   D360_API_KEY, ANTHROPIC_API_KEY, WHATSAPP_VERIFY_TOKEN   (déjà en place)
//   BRUNO_WHATSAPP            = ton numéro WhatsApp (format international, ex. 9725XXXXXXXX)
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY                  (déjà ajoutés pour le cockpit)
export const config = { runtime: 'edge' };

const MODEL = 'claude-haiku-4-5-20251001', MAX_TOKENS = 600;

// ════════ INDÉPENDANCE DU CORE (gravé 2026-07-09) ════════
// Le CORE doit continuer à répondre à Bruno même si api.anthropic.com tombe
// (coupure Claude). callBrain() essaie Anthropic direct puis, si ça échoue,
// bascule seul sur OpenRouter (modèle gratuit non-Anthropic en dernier
// recours) — lecture tolérante de la clé (règle n°4), aucun redéploiement
// nécessaire le jour où OPENROUTER_API_KEY est posée dans Vercel.
function envAny(names) { for (const n of names) { const v = process.env[n]; if (v) return v; } return ''; }
async function callBrain(system, user, { anthKey, maxTokens = MAX_TOKENS, model = MODEL } = {}) {
  if (anthKey) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': anthKey, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, max_tokens: maxTokens, system, messages: [{ role: 'user', content: user }] }),
      });
      if (r.ok) {
        const d = await r.json();
        const t = (d.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('\n').trim();
        if (t) return t;
      }
    } catch { /* on tente le repli ci-dessous */ }
  }
  const orKey = envAny(['OPENROUTER_API_KEY', 'OPENROUTER_KEY', 'OPEN_ROUTER_API_KEY', 'OPEN_API_ROUTER', 'OPEN_API_ROUTER_KEY']);
  if (orKey) {
    for (const orModel of ['meta-llama/llama-3.3-70b-instruct:free', 'anthropic/claude-haiku-4.5']) {
      try {
        const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: { Authorization: `Bearer ${orKey}`, 'Content-Type': 'application/json', 'HTTP-Referer': 'https://navlys.com', 'X-Title': 'NAVLYS CORE' },
          body: JSON.stringify({ model: orModel, max_tokens: maxTokens, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }),
        });
        if (r.ok) {
          const d = await r.json();
          const t = (d?.choices?.[0]?.message?.content || '').trim();
          if (t) return t;
        }
      } catch { /* essai suivant */ }
    }
  }
  return '';
}

// ════════ MODE SAV (public, inchangé) ════════
const SYSTEM_SAV = [
  "Tu es l'Aide & SAV NAVLYS sur WhatsApp — chaleureux, simple, humain, images marines, jamais robotique. Réponses COURTES (WhatsApp).",
  "NAVLYS = univers d'applications humain + IA, accessible à tous. Apps : Finance (éducation, GRATUIT 0EUR), Next Gen (livre/film de vie, gratuit puis 9,99EUR HT/mois), NAVLEX (juridique, 3 questions offertes puis 9,99EUR HT/mois), Journal Influenceurs, Journal de l'IA, Radio.",
  "Tous les prix sont HT. INTERDIT : conseil financier personnalisé / promesse de rendement (renvoie à l'éducation), conseil juridique personnalisé (renvoie NAVLEX, info générale). Si sensible/inconnu : propose de laisser un message à l'équipe."
].join(' ');

async function brainSav(text, anthKey) {
  const t = await callBrain(SYSTEM_SAV, text, { anthKey });
  return t || 'Je reviens vers toi très vite 🌊';
}

async function sendWA(to, body, d360) {
  if (body.length > 3900) body = body.slice(0, 3900) + '\n…(suite tronquée)';
  await fetch('https://waba-v2.360dialog.io/messages', {
    method: 'POST',
    headers: { 'D360-API-KEY': d360, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body } }),
  });
}

// ════════ MODE PILOTE (Bruno drive le CORE) ════════
const KEYWORDS = {
  NAVFI: ['bourse', 'finance', 'etf', 'crypto', 'épargne', 'leçon', 'marché'],
  NAVCOM: ['post', 'réseau', 'communication', 'news', 'article', 'presse', 'faq'],
  NAVTECH: ['site', 'infra', 'vercel', 'déploiement', 'bug', 'technique', 'migration'],
  NAVLEX: ['juridique', 'rgpd', 'cgv', 'mentions', 'conformité', 'légal'],
  NAVPART: ['partenaire', 'affiliation', 'binance', 'alpaca', 'etoro', 'bybit'],
  NAVPTE: ['sécurité', 'secret', 'faille', 'protection', 'audit sécu'],
  NAVGEN: ['visuel', 'logo', 'image', 'génome', 'design'],
  NAVBIO: ['souvenir', 'biographie', 'livre de vie', 'next gen', 'héritage'],
  NAVLAB: ['recherche', 'prototype', 'innovation', 'r&d'],
  NAVLEAD: ['influenceur', 'ambassadeur', 'créateur'],
  NAVBIEN: ['bien-être', 'reiki', 'réflexo', 'accessibilité'],
  NAVDEM: ['produit', 'appli', 'feedback', 'retour membre', 'évolution'],
  NAVME: ['mémoire', 'souvenir interne', 'apprentissage'],
  NAVMKT: ['cohérence', 'uniformise', 'rapport', 'synthèse'],
};
function routeDept(text, valid) {
  const low = (text || '').toLowerCase();
  const m = low.match(/@([a-z]+)/);
  if (m) { const d = 'NAV' + m[1].slice(3).toUpperCase(); if (valid.includes(d)) return d; }
  for (const [dept, words] of Object.entries(KEYWORDS))
    if (valid.includes(dept) && words.some((w) => low.includes(w))) return dept;
  return valid.includes('NAVMKT') ? 'NAVMKT' : (valid[0] || 'NAVMKT');
}
const stripHandle = (t) => (t || '').split(/\s+/).filter((w) => !w.startsWith('@')).join(' ').trim();
const onlyDigits = (s) => String(s || '').replace(/\D/g, '');

function sbHeaders(key) { return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }; }
async function sbGet(base, key, table, select, order, limit) {
  const head = sbHeaders(key);
  const url = (ord) => `${base}/rest/v1/${table}?select=${encodeURIComponent(select)}${ord ? `&order=${encodeURIComponent(ord)}` : ''}${limit ? `&limit=${limit}` : ''}`;
  let r = await fetch(url(order), { headers: head });
  if (!r.ok && order) r = await fetch(url(null), { headers: head });
  return r.ok ? r.json().catch(() => []) : [];
}
async function sbPatch(base, key, table, filter, patch) {
  await fetch(`${base}/rest/v1/${table}?${filter}`, { method: 'PATCH', headers: { ...sbHeaders(key), Prefer: 'return=representation' }, body: JSON.stringify(patch) });
}
async function sbInsert(base, key, table, row) {
  const r = await fetch(`${base}/rest/v1/${table}`, { method: 'POST', headers: { ...sbHeaders(key), Prefer: 'return=representation' }, body: JSON.stringify(row) });
  return r.ok ? r.json().catch(() => []) : [];
}

const AIDE = [
  '🧭 NAVLYS — tu pilotes le corps central.',
  '• Écris en clair (ou @navfi …) → je crée la mission au bon agent.',
  '• /recap — état des missions',
  '• /agents — les 14 agents',
  '• /voir <id> — lire un livrable',
  '• /valider <id> — valider',
  '• /refuser <id> motif — renvoyer à l\'agent',
  '• /rapport — le point du jour',
].join('\n');

async function pilote(base, key, anth, text) {
  const low = text.toLowerCase().trim();

  if (low === '/aide' || low === '/start' || low === '/help') return AIDE;

  if (low.startsWith('/agents')) {
    const ags = await sbGet(base, key, 'agents', 'id,prenom,handle', 'id.asc', 50);
    if (!ags.length) return 'Aucun agent chargé (le worker a-t-il initialisé la base ?).';
    return '👥 LES AGENTS\n' + ags.map((a) => `${a.prenom || '?'} ${a.handle || ''} — ${a.id}`).join('\n');
  }

  if (low.startsWith('/recap')) {
    const ms = await sbGet(base, key, 'missions', 'id,titre,statut,departement', 'id.desc', 100);
    if (!ms.length) return '📊 Aucune mission pour l\'instant.';
    const by = {}; ms.forEach((m) => { (by[m.statut] = by[m.statut] || []).push(m); });
    const out = ['📊 RÉCAP MISSIONS'];
    for (const s of ['a_valider', 'a_faire', 'en_cours', 'fait', 'erreur']) {
      const it = by[s] || []; if (!it.length) continue;
      out.push(`\n— ${s} (${it.length}) —`);
      it.slice(0, 15).forEach((m) => out.push(`#${m.id} [${m.departement}] ${m.titre}`));
    }
    return out.join('\n');
  }

  if (low.startsWith('/voir')) {
    const id = text.split(/\s+/)[1];
    if (!id) return 'Usage : /voir <id>';
    const rows = await sbGet(base, key, 'missions', 'id,titre,statut,resultat', `id=eq.${encodeURIComponent(id)}`, null, 1);
    if (!rows.length) return `Mission #${id} introuvable.`;
    const m = rows[0];
    return `#${m.id} ${m.titre} [${m.statut}]\n\n${m.resultat || '(pas encore de livrable)'}`;
  }

  if (low.startsWith('/valider')) {
    const id = text.split(/\s+/)[1];
    if (!id) return 'Usage : /valider <id>';
    await sbPatch(base, key, 'missions', `id=eq.${encodeURIComponent(id)}`, { statut: 'fait' });
    await sbInsert(base, key, 'journal', { type: 'validation', message: `Bruno a validé #${id} (WhatsApp).` });
    return `✅ Mission #${id} validée.`;
  }

  if (low.startsWith('/refuser')) {
    const parts = text.split(/\s+/);
    const id = parts[1];
    if (!id) return 'Usage : /refuser <id> motif';
    const motif = parts.slice(2).join(' ') || 'non précisé';
    await sbPatch(base, key, 'missions', `id=eq.${encodeURIComponent(id)}`, { statut: 'a_faire', erreur: motif.slice(0, 500) });
    await sbInsert(base, key, 'journal', { type: 'refus', message: `Bruno a refusé #${id} (WhatsApp) : ${motif.slice(0, 120)}` });
    return `↩️ Mission #${id} renvoyée à l'agent. Motif noté.`;
  }

  if (low.startsWith('/rapport')) {
    const [ags, ms] = await Promise.all([
      sbGet(base, key, 'agents', 'id,prenom,autonomie', 'id.asc', 50),
      sbGet(base, key, 'missions', 'id,titre,statut,departement', 'id.desc', 100),
    ]);
    const stats = {}; ms.forEach((m) => { stats[m.statut] = (stats[m.statut] || 0) + 1; });
    const aValider = ms.filter((m) => m.statut === 'a_valider').map((m) => `#${m.id} [${m.departement}] ${m.titre}`).slice(0, 12);
    if (!anth) {
      return [`📋 RAPPORT NAVLYS`, `${ags.length} agents.`,
        `À valider ${stats.a_valider || 0} · à faire ${stats.a_faire || 0} · en cours ${stats.en_cours || 0} · fait ${stats.fait || 0} · erreur ${stats.erreur || 0}.`,
        aValider.length ? `Priorité validation :\n${aValider.join('\n')}` : `Rien n'attend ta validation. 🌊`].join('\n');
    }
    const SYS = "Tu es le Rapporteur de NAVLYS qui parle à Bruno sur WhatsApp. Point COURT (4-6 phrases), chaleureux, parlé, tutoiement. Statut simple citoyen : aucune promesse financière. Termine par UNE action concrète proposée.";
    const usr = `AGENTS: ${ags.map((a) => `${a.prenom || a.id}/${a.autonomie || '?'}`).join(', ')}\nCOMPTEURS: ${JSON.stringify(stats)}\nÀ VALIDER: ${aValider.join(' | ') || 'aucune'}\nFais le point.`;
    const t = await callBrain(SYS, usr, { anthKey: anth });
    return '📋 ' + (t || 'Tout est calme pour le moment. 🌊');
  }

  // Message libre -> création de mission routée (comme MasterNav).
  const ags = await sbGet(base, key, 'agents', 'id', 'id.asc', 50);
  const valid = ags.map((a) => a.id);
  if (!valid.length) return 'Le corps central n\'a pas encore d\'agents chargés en base. Lance le worker une première fois.';
  const dept = routeDept(text, valid);
  const consigne = stripHandle(text) || text;
  const row = await sbInsert(base, key, 'missions', { departement: dept, titre: consigne.slice(0, 120), consigne, priorite: 2, statut: 'a_faire' });
  const created = Array.isArray(row) ? row[0] : row;
  const mid = created && created.id != null ? created.id : '?';
  await sbInsert(base, key, 'journal', { type: 'ordre', message: `Bruno -> ${dept} (WhatsApp) mission #${mid}` });
  return `📥 Mission #${mid} confiée à ${dept}.\nIl prépare ; tu recevras « à valider ». (/recap pour suivre)`;
}

export default async function handler(req) {
  const u = new URL(req.url);
  // Vérification 360dialog/Meta
  if (req.method === 'GET') {
    const mode = u.searchParams.get('hub.mode'), token = u.searchParams.get('hub.verify_token'), challenge = u.searchParams.get('hub.challenge');
    if (mode === 'subscribe' && token && token === process.env.WHATSAPP_VERIFY_TOKEN) return new Response(challenge || '', { status: 200 });
    return new Response('forbidden', { status: 403 });
  }
  if (req.method !== 'POST') return new Response('POST only', { status: 405 });

  const d360 = process.env.D360_API_KEY, anth = process.env.ANTHROPIC_API_KEY;
  const base = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const skey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;
  const bruno = onlyDigits(process.env.BRUNO_WHATSAPP);

  let body; try { body = await req.json(); } catch { return new Response('ok', { status: 200 }); }
  try {
    const value = body?.entry?.[0]?.changes?.[0]?.value;
    const msg = value?.messages?.[0];
    if (msg && msg.type === 'text' && d360) {
      const from = msg.from;
      const txt = msg.text?.body || '';
      const isBruno = bruno && onlyDigits(from) === bruno;
      let reply;
      if (isBruno && base && skey) {
        reply = await pilote(base, skey, anth, txt);           // MODE PILOTE
      } else if (isBruno) {
        reply = 'Cockpit non configuré : ajoute SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans Vercel pour piloter le CORE.';
      } else if (anth) {
        reply = await brainSav(txt, anth);                      // MODE SAV
      }
      if (reply) await sendWA(from, reply, d360);
    }
  } catch (e) { /* on accuse toujours réception pour ne pas faire retenter Meta */ }
  return new Response(JSON.stringify({ received: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
