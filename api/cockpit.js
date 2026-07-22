// NAVLYS — Cockpit central (API serveur sécurisée)
// v1 · 2026-06-30 · POST /api/cockpit { action, token, ... }
//
// Rôle : donner au cockpit visuel un accès LECTURE + PILOTAGE des tables du CORE
//        (agents, missions, journal) via la clé service_role — qui reste TOUJOURS
//        côté serveur (process.env), jamais dans le navigateur (garde-fou G1).
//
// Sécurité : chaque appel doit porter le bon COCKPIT_TOKEN (mot de passe privé).
//            Sans lui -> 401. La clé Supabase n'est jamais renvoyée au client.
//
// Variables d'environnement à définir dans Vercel (Project → Settings → Env) :
//   SUPABASE_URL                = https://....supabase.co
//   SUPABASE_SERVICE_ROLE_KEY   = (clé service_role — SECRET serveur)
//   COCKPIT_TOKEN               = (mot de passe que Bruno choisit pour entrer)
//   ANTHROPIC_API_KEY           = (déjà présent — sert au rapport vocal)
export const config = { runtime: 'edge' };

const MODEL_BRIEF = 'claude-haiku-4-5-20251001';   // rapporteur = modèle rapide/peu cher
const MAX_BRIEF_TOKENS = 700;

// ── CORS : le cockpit est servi sur le même domaine, mais on reste permissif
//    sur l'origine et on s'appuie sur le TOKEN comme vrai verrou. ──
function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
function j(d, s) {
  return new Response(JSON.stringify(d), {
    status: s, headers: { ...cors(), 'Content-Type': 'application/json' },
  });
}

// ════════ INDÉPENDANCE DU CORE (gravé 2026-07-09) ════════
// Le rapporteur du cockpit doit continuer à parler même si api.anthropic.com
// tombe (coupure Claude). callBrain() essaie Anthropic direct puis, si ça
// échoue, bascule seul sur OpenRouter (modèle gratuit non-Anthropic en dernier
// recours) — lecture tolérante de la clé (règle n°4), aucun redéploiement
// nécessaire le jour où OPENROUTER_API_KEY est posée dans Vercel. Même pattern
// que whatsapp-webhook.js.
function envAny(names) { for (const n of names) { const v = process.env[n]; if (v) return v; } return ''; }
async function callBrain(system, user, { anthKey, maxTokens = MAX_BRIEF_TOKENS, model = MODEL_BRIEF } = {}) {
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

// Comparaison de token à temps ~constant (évite de fuiter la longueur par timing).
function tokenOk(given, expected) {
  if (!expected) return false;
  const a = String(given || ''), b = String(expected);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// ── Routage d'un message libre vers un département (miroir de masternav.py) ──
const KEYWORDS = {
  NAVFI:   ['bourse', 'finance', 'etf', 'crypto', 'épargne', 'leçon', 'marché'],
  NAVCOM:  ['post', 'réseau', 'communication', 'news', 'article', 'presse', 'faq'],
  NAVTECH: ['site', 'infra', 'vercel', 'déploiement', 'bug', 'technique', 'migration'],
  NAVLEX:  ['juridique', 'rgpd', 'cgv', 'mentions', 'conformité', 'légal'],
  NAVPART: ['partenaire', 'affiliation', 'binance', 'alpaca', 'etoro', 'bybit'],
  NAVPTE:  ['sécurité', 'secret', 'faille', 'protection', 'audit sécu'],
  NAVGEN:  ['visuel', 'logo', 'image', 'génome', 'design'],
  NAVBIO:  ['souvenir', 'biographie', 'livre de vie', 'next gen', 'héritage'],
  NAVLAB:  ['recherche', 'prototype', 'innovation', 'r&d'],
  NAVLEAD: ['influenceur', 'ambassadeur', 'créateur'],
  NAVBIEN: ['bien-être', 'reiki', 'réflexo', 'accessibilité'],
  NAVDEM:  ['produit', 'appli', 'feedback', 'retour membre', 'évolution'],
  NAVME:   ['mémoire', 'souvenir interne', 'apprentissage'],
  NAVMKT:  ['cohérence', 'uniformise', 'rapport', 'synthèse'],
};
function routeDept(text, validDepts) {
  const low = (text || '').toLowerCase();
  // @handle explicite (ex. @navfi)
  const m = low.match(/@([a-z]+)/);
  if (m) {
    const dept = 'NAV' + m[1].slice(3).toUpperCase(); // navfi -> NAVFI
    if (validDepts.includes(dept)) return dept;
  }
  for (const [dept, words] of Object.entries(KEYWORDS)) {
    if (validDepts.includes(dept) && words.some((w) => low.includes(w))) return dept;
  }
  return validDepts.includes('NAVMKT') ? 'NAVMKT' : (validDepts[0] || 'NAVMKT');
}
function stripHandle(text) {
  return (text || '').split(/\s+/).filter((w) => !w.startsWith('@')).join(' ').trim();
}

// ── Petit client Supabase (service_role) côté serveur ──
function sbHeaders(key) {
  return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
}
// GET tolérant : tente avec 'order', retombe sans 'order' si la colonne n'existe pas.
async function sbGet(base, key, table, select, order, limit) {
  const head = sbHeaders(key);
  const build = (ord) => {
    let q = `${base}/rest/v1/${table}?select=${encodeURIComponent(select)}`;
    if (ord) q += `&order=${encodeURIComponent(ord)}`;
    if (limit) q += `&limit=${limit}`;
    return q;
  };
  let r = await fetch(build(order), { headers: head });
  if (!r.ok && order) r = await fetch(build(null), { headers: head }); // colonne d'ordre absente
  if (!r.ok) return [];
  return r.json().catch(() => []);
}
async function sbPatch(base, key, table, idFilter, patch) {
  const r = await fetch(`${base}/rest/v1/${table}?${idFilter}`, {
    method: 'PATCH',
    headers: { ...sbHeaders(key), Prefer: 'return=representation' },
    body: JSON.stringify(patch),
  });
  if (!r.ok) throw new Error(`patch ${table} ${r.status}`);
  return r.json().catch(() => []);
}
async function sbInsert(base, key, table, row) {
  const r = await fetch(`${base}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...sbHeaders(key), Prefer: 'return=representation' },
    body: JSON.stringify(row),
  });
  if (!r.ok) throw new Error(`insert ${table} ${r.status}`);
  return r.json().catch(() => []);
}
// Compte exact via l'en-tete Content-Range (HEAD, ne charge pas les lignes).
async function sbCount(base, key, table, filter) {
  const q = `${base}/rest/v1/${table}?select=id${filter ? '&' + filter : ''}`;
  const r = await fetch(q, { method: 'HEAD', headers: { ...sbHeaders(key), Prefer: 'count=exact' } });
  const cr = r.headers.get('content-range') || '*/0';
  return parseInt(cr.split('/')[1] || '0', 10) || 0;
}
// Upsert d'une cle de config (merge sur la contrainte unique key).
async function sbUpsertConfig(base, key, cfgKey, cfgVal) {
  await fetch(`${base}/rest/v1/core_config?on_conflict=key`, {
    method: 'POST',
    headers: { ...sbHeaders(key), Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ key: cfgKey, value: cfgVal }),
  });
}

// ── Anti-abus léger ──
const hits = new Map();
function limited(ip) {
  const now = Date.now(), w = 60000, max = 60;
  const a = (hits.get(ip) || []).filter((t) => now - t < w);
  a.push(now); hits.set(ip, a);
  return a.length > max;
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors() });
  if (req.method !== 'POST') return j({ error: 'POST only' }, 405);

  const base = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
  // Accepte les deux noms possibles de la clé service_role selon la config Vercel.
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;
  const cockpitToken = process.env.COCKPIT_TOKEN;
  if (!base || !key) return j({ error: 'server not configured (SUPABASE_URL / SERVICE_ROLE_KEY)' }, 500);
  if (!cockpitToken) return j({ error: 'server not configured (COCKPIT_TOKEN manquant)' }, 500);

  const ip = req.headers.get('x-forwarded-for') || 'anon';
  if (limited(ip)) return j({ error: 'Trop de requêtes — réessaie dans une minute.' }, 429);

  let body;
  try { body = await req.json(); } catch { return j({ error: 'bad json' }, 400); }

  // Token : en-tête Authorization: Bearer <token> OU champ body.token
  const auth = req.headers.get('authorization') || '';
  const given = auth.startsWith('Bearer ') ? auth.slice(7) : (body.token || '');
  if (!tokenOk(given, cockpitToken)) return j({ error: 'Accès refusé : mot de passe cockpit invalide.' }, 401);

  const action = String(body.action || 'state');

  try {
    if (action === 'state') {
      const [agents, missions, journal] = await Promise.all([
        sbGet(base, key, 'agents',
          'id,prenom,handle,role,autonomie,actif,modele', 'id.asc', 200),
        sbGet(base, key, 'missions',
          'id,titre,statut,departement,priorite,resultat,consigne,assigned_agent,finished_at',
          'id.desc', 200),
        sbGet(base, key, 'journal', 'id,type,message,ts', 'ts.desc', 50),
      ]);
      // Statistiques par statut (pour les compteurs du cockpit).
      const stats = {};
      for (const m of missions) stats[m.statut] = (stats[m.statut] || 0) + 1;
      return j({ agents, missions, journal, stats }, 200);
    }

    // Tableau de bord centralise : tout ce qu'il faut pour piloter, en 1 appel.
    if (action === 'tableau') {
      const [agents, missions, journal, incidents, bugs, feedback, cfg] = await Promise.all([
        sbGet(base, key, 'agents', 'id,prenom,handle,role,autonomie,actif', 'id.asc', 200),
        sbGet(base, key, 'missions',
          'id,titre,statut,departement,priorite,resultat,consigne,assigned_agent,finished_at', 'id.desc', 300),
        sbGet(base, key, 'journal', 'id,type,message,ts', 'ts.desc', 30),
        sbGet(base, key, 'core_incidents', 'id,ts,categorie,severite,sujet,statut,agent',
          'ts.desc', 40),
        sbGet(base, key, 'core_bible_bugs', 'id,categorie,bug,departement,traite,cree_le', 'cree_le.desc', 40),
        sbGet(base, key, 'core_feedback', 'id,page,type,message,prenom,statut,created_at',
          'created_at.desc', 40),
        sbGet(base, key, 'core_config', 'key,value', null, 200),
      ]);
      const [inscriptions, membres, snap] = await Promise.all([
        sbCount(base, key, 'inscriptions'),
        sbCount(base, key, 'membres'),
        sbGet(base, key, 'core_croissance_snap', 'jour,source,entrees', 'jour.desc', 1),
      ]);
      const stats = {};
      for (const m of missions) stats[m.statut] = (stats[m.statut] || 0) + 1;
      const conf = {};
      for (const c of cfg) conf[c.key] = c.value;
      let attente = null;
      try { attente = conf.chantiers_attente ? JSON.parse(conf.chantiers_attente) : null; } catch { attente = null; }
      const openInc = incidents.filter((x) => x.statut !== 'resolu');
      const openBugs = bugs.filter((b) => b.traite === false || b.traite == null);
      const openFb = feedback.filter((f) => f.statut !== 'repondu');
      return j({
        agents, missions, journal, stats,
        incidents: openInc, bugs: openBugs, feedback: openFb,
        autotest: { score: conf.last_autotest_score || null, weak: conf.last_autotest_weak || null, niveau: conf.recursive_growth_level || null },
        kpi: { inscriptions, membres, croissance: snap[0] || null },
        attente, ts: new Date().toISOString(),
      }, 200);
    }

    // Checklist « En attente de Bruno » persistee dans core_config (partagee multi-appareils).
    if (action === 'attente_set') {
      const items = Array.isArray(body.items) ? body.items : [];
      await sbUpsertConfig(base, key, 'chantiers_attente', JSON.stringify(items));
      return j({ ok: true, n: items.length }, 200);
    }

    if (action === 'valider_tout') {
      const ra = await fetch(`${base}/rest/v1/missions?select=id&statut=eq.a_valider&limit=500`, { headers: sbHeaders(key) });
      const attente = ra.ok ? await ra.json().catch(() => []) : [];
      if (!attente.length) return j({ ok: true, valides: 0 }, 200);
      await sbPatch(base, key, 'missions', 'statut=eq.a_valider', { statut: 'fait' });
      await sbInsert(base, key, 'journal', {
        type: 'validation', message: `Bruno a TOUT validé en un clic : ${attente.length} mission(s) (cockpit).`,
      }).catch(() => {});
      return j({ ok: true, valides: attente.length }, 200);
    }

    if (action === 'create') {
      const texte = String(body.texte || '').trim();
      if (!texte) return j({ error: 'consigne vide' }, 400);
      const agents = await sbGet(base, key, 'agents', 'id', 'id.asc', 200);
      const validDepts = agents.map((a) => a.id);
      const dept = body.departement && validDepts.includes(body.departement)
        ? body.departement : routeDept(texte, validDepts);
      const consigne = stripHandle(texte) || texte;
      const row = await sbInsert(base, key, 'missions', {
        departement: dept, titre: consigne.slice(0, 120),
        consigne, priorite: 2, statut: 'a_faire',
      });
      const created = Array.isArray(row) ? row[0] : row;
      await sbInsert(base, key, 'journal', {
        type: 'ordre', message: `Cockpit -> ${dept} : mission « ${consigne.slice(0, 80)} »`,
      }).catch(() => {});
      return j({ ok: true, mission: created, departement: dept }, 200);
    }

    if (action === 'valider') {
      const id = String(body.id || '');
      if (!id) return j({ error: 'id manquant' }, 400);
      await sbPatch(base, key, 'missions', `id=eq.${encodeURIComponent(id)}`, { statut: 'fait' });
      await sbInsert(base, key, 'journal', {
        type: 'validation', message: `Bruno a validé la mission #${id} (cockpit).`,
      }).catch(() => {});
      return j({ ok: true }, 200);
    }

    if (action === 'refuser') {
      const id = String(body.id || '');
      if (!id) return j({ error: 'id manquant' }, 400);
      const motif = String(body.motif || 'non précisé').slice(0, 500);
      await sbPatch(base, key, 'missions', `id=eq.${encodeURIComponent(id)}`,
        { statut: 'a_faire', erreur: motif });
      await sbInsert(base, key, 'journal', {
        type: 'refus', message: `Bruno a refusé #${id} (cockpit) : ${motif.slice(0, 120)}`,
      }).catch(() => {});
      return j({ ok: true }, 200);
    }

    // Rapporteur virtuel : résume l'état du CORE en français parlé, prêt à être lu à voix haute.
    if (action === 'briefing') {
      const aKey = process.env.ANTHROPIC_API_KEY;
      const [agents, missions, journal] = await Promise.all([
        sbGet(base, key, 'agents', 'id,prenom,autonomie,actif', 'id.asc', 200),
        sbGet(base, key, 'missions', 'id,titre,statut,departement', 'id.desc', 200),
        sbGet(base, key, 'journal', 'type,message,ts', 'ts.desc', 15),
      ]);
      const stats = {};
      for (const m of missions) stats[m.statut] = (stats[m.statut] || 0) + 1;
      const aValider = missions.filter((m) => m.statut === 'a_valider')
        .map((m) => `#${m.id} [${m.departement}] ${m.titre}`).slice(0, 12);
      const recent = journal.map((e) => `${e.type}: ${e.message}`).slice(0, 12);

      // Sans AUCUN cerveau (ni Anthropic ni OpenRouter) : rapport déterministe
      // (toujours utile, zéro coût, indépendant de toute coupure LLM).
      const hasOr = !!envAny(['OPENROUTER_API_KEY', 'OPENROUTER_KEY', 'OPEN_ROUTER_API_KEY', 'OPEN_API_ROUTER', 'OPEN_API_ROUTER_KEY']);
      if (!aKey && !hasOr) {
        const lignes = [
          `Bonjour Bruno. Voici l'état du corps central NAVLYS.`,
          `${agents.length} agents enregistrés.`,
          `Missions : ${stats['a_valider'] || 0} à valider, ${stats['a_faire'] || 0} à faire, ` +
          `${stats['en_cours'] || 0} en cours, ${stats['fait'] || 0} faites, ${stats['erreur'] || 0} en erreur.`,
          aValider.length ? `À valider en priorité : ${aValider.join(' ; ')}.` : `Rien n'attend ta validation.`,
        ];
        return j({ text: lignes.join(' ') }, 200);
      }

      const SYSTEM = [
        "Tu es le Rapporteur de NAVLYS CORE : tu parles à Bruno, seul porteur du projet, à voix haute.",
        "Ton chaleureux, humain, clair, jamais technique ni robotique. Tu t'adresses à lui en « tu ».",
        "Fais un point oral COURT (5 à 8 phrases max) : ce que font les agents, ce qui attend sa validation,",
        "les points d'attention, et UNE suggestion d'action concrète. Pas de listes à puces, du langage parlé.",
        "Statut simple citoyen respecté : aucune promesse financière, aucun conseil personnalisé.",
      ].join(' ');
      const user = [
        `AGENTS (${agents.length}) : ` + agents.map((a) => `${a.prenom || a.id}/${a.autonomie || '?'}`).join(', '),
        `COMPTEURS MISSIONS : ` + JSON.stringify(stats),
        `À VALIDER : ` + (aValider.join(' | ') || 'aucune'),
        `JOURNAL RÉCENT : ` + (recent.join(' | ') || 'vide'),
        `Fais-moi le point de vive voix.`,
      ].join('\n');

      const text = await callBrain(SYSTEM, user, { anthKey: aKey });
      // Si tous les cerveaux tombent : repli déterministe plutôt qu'une erreur,
      // pour que le cockpit parle toujours (indépendance du CORE).
      if (!text) {
        return j({ text:
          `Bonjour Bruno. ${agents.length} agents enregistrés. ` +
          `Missions : ${stats['a_valider'] || 0} à valider, ${stats['a_faire'] || 0} à faire, ` +
          `${stats['en_cours'] || 0} en cours, ${stats['fait'] || 0} faites, ${stats['erreur'] || 0} en erreur. ` +
          (aValider.length ? `À valider en priorité : ${aValider.join(' ; ')}.` : `Rien n'attend ta validation.`) }, 200);
      }
      return j({ text }, 200);
    }

    return j({ error: `action inconnue : ${action}` }, 400);
  } catch (e) {
    return j({ error: 'erreur serveur', detail: String(e).slice(0, 200) }, 500);
  }
}
