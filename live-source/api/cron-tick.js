// NAVLYS — Moteur AUTONOME (cron) : fait travailler les agents tout seuls.
// v1 · 2026-06-30
//
// Déclenché automatiquement par le cron Vercel. À chaque passage :
//   1) prend les prochaines missions (claim_next_mission) pour les agents actifs ;
//   2) pour les veilles/recherches → CHERCHE sur le web (Tavily) et injecte le contexte ;
//   3) fait réfléchir l'agent (Claude Haiku — rapide & économique) ;
//   4) AUTO → mission « fait » ;  PREPARE (sensible) → « a_valider » (Bruno tranche) ;
//   5) journalise + apprend (agent_runs, journal).
//
// GARDE-FOUS anti-emballement (le « 45 $/jour » ne peut plus arriver) :
//   • MAX_PER_TICK missions par passage ;
//   • DAILY_TOKEN_CAP : si la conso du jour dépasse le plafond, on s'arrête ;
//   • modèle Haiku (le moins cher) ; aucune action externe (publi/paiement) auto.
//
// Sécurité d'accès : déclenchable seulement par le cron Vercel (en-tête x-vercel-cron,
//   que Vercel retire des requêtes externes) OU manuellement avec ?token=COCKPIT_TOKEN.
//   Aucune clé n'est dans ce code (dépôt public) : tout vient de process.env.
export const config = { runtime: 'edge' };

const MODEL = 'claude-haiku-4-5-20251001'; // autonome = rapide + économique
const MAX_TOKENS = 1200;
const MAX_PER_TICK = 3;                     // missions traitées par passage
const DAILY_TOKEN_CAP = 500000;            // plafond de tokens / jour (filet anti-emballement)

const REGLES_CORE = [
  "Tu es un agent du NAVLYS CORE, coordonné par MasterNav pour Bruno.",
  "Règles non négociables :",
  "- Statut SIMPLE CITOYEN : aucune mention CIF/ORIAS/conseiller. Éducation et information générale uniquement, jamais de conseil personnalisé ni de promesse de rendement. Disclaimers d'office sur tout contenu financier.",
  "- Charte : fond noir, ice blue + champagne or ; ZÉRO pourpre/mauve/fuchsia.",
  "- Tu PRÉPARES le travail. Tu ne publies pas, n'envoies aucun e-mail, ne dépenses rien, ne déploies pas, ne signes rien de toi-même.",
  "- Toute action externe ou coûteuse est laissée à la VALIDATION de Bruno (statut « a_valider »).",
  "Produis un livrable clair, actionnable, en français, prêt à être validé.",
].join('\n');

const SEARCH_HINTS = ['veille', 'recherche', 'actualit', 'marché', 'news', 'bourse', 'tendance', 'innovation', 'concurrent', 'prix'];

function json(d, s) {
  return new Response(JSON.stringify(d), {
    status: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
function nowIso() { return new Date().toISOString(); }

function sbHeaders(key) { return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }; }
async function sbGet(base, key, table, select, q) {
  const r = await fetch(`${base}/rest/v1/${table}?select=${encodeURIComponent(select)}${q ? '&' + q : ''}`, { headers: sbHeaders(key) });
  return r.ok ? r.json().catch(() => []) : [];
}
async function sbPatch(base, key, table, filter, patch) {
  await fetch(`${base}/rest/v1/${table}?${filter}`, { method: 'PATCH', headers: { ...sbHeaders(key), Prefer: 'return=representation' }, body: JSON.stringify(patch) });
}
async function sbInsert(base, key, table, row) {
  const r = await fetch(`${base}/rest/v1/${table}`, { method: 'POST', headers: { ...sbHeaders(key), Prefer: 'return=representation' }, body: JSON.stringify(row) });
  return r.ok ? r.json().catch(() => []) : [];
}
async function rpc(base, key, fn, payload) {
  const r = await fetch(`${base}/rest/v1/rpc/${fn}`, { method: 'POST', headers: sbHeaders(key), body: JSON.stringify(payload) });
  if (!r.ok) return null;
  const t = await r.text();
  return t && t !== 'null' ? JSON.parse(t) : null;
}

// Recherche web (Tavily) — renvoie un court contexte, ou '' si indispo.
async function webSearch(query, tavilyKey) {
  if (!tavilyKey) return '';
  try {
    const r = await fetch('https://api.tavily.com/search', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: tavilyKey, query, max_results: 4, search_depth: 'basic' }),
    });
    if (!r.ok) return '';
    const d = await r.json().catch(() => ({}));
    const items = (d.results || []).map((x) => `- ${x.title} : ${(x.content || '').slice(0, 240)} (${x.url})`).slice(0, 4);
    return items.length ? `# Résultats de recherche web (à vérifier, ne pas citer comme conseil)\n${items.join('\n')}` : '';
  } catch (e) { return ''; }
}

// ════════ INDÉPENDANCE DU CORE (gravé 2026-07-09) ════════
// Le moteur autonome doit continuer à faire travailler les agents même si
// api.anthropic.com tombe (coupure Claude). think() essaie Anthropic direct
// puis, si ça échoue, bascule seul sur OpenRouter (modèle gratuit non-Anthropic
// en dernier recours) — lecture tolérante de la clé (règle n°4), aucun
// redéploiement nécessaire le jour où OPENROUTER_API_KEY est posée dans Vercel.
// Même pattern que whatsapp-webhook.js ; on renvoie toujours { text, tokens }
// (les tokens alimentent le garde-fou DAILY_TOKEN_CAP, d'où qu'ils viennent).
function envAny(names) { for (const n of names) { const v = process.env[n]; if (v) return v; } return ''; }
async function think(anthKey, system, user) {
  if (anthKey) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': anthKey, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, system, messages: [{ role: 'user', content: user }] }),
      });
      if (r.ok) {
        const d = await r.json().catch(() => ({}));
        const text = (d.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('\n').trim();
        if (text) {
          const u = d.usage || {};
          return { text, tokens: (u.input_tokens || 0) + (u.output_tokens || 0) };
        }
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
          body: JSON.stringify({ model: orModel, max_tokens: MAX_TOKENS, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }),
        });
        if (r.ok) {
          const d = await r.json().catch(() => ({}));
          const text = (d?.choices?.[0]?.message?.content || '').trim();
          if (text) {
            const u = d.usage || {};
            return { text, tokens: (u.total_tokens || (u.prompt_tokens || 0) + (u.completion_tokens || 0) || 0) };
          }
        }
      } catch { /* essai suivant */ }
    }
  }
  throw new Error('llm indisponible (Anthropic + OpenRouter)');
}

export default async function handler(req) {
  // ── Authentification ──
  const isCron = req.headers.get('x-vercel-cron'); // Vercel retire cet en-tête des requêtes externes
  let ok = !!isCron;
  if (!ok) {
    const u = new URL(req.url);
    const t = u.searchParams.get('token') || (req.headers.get('authorization') || '').replace(/^Bearer\s+/, '');
    ok = process.env.COCKPIT_TOKEN && t === process.env.COCKPIT_TOKEN;
  }
  if (!ok) return json({ error: 'unauthorized' }, 401);

  const base = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;
  const anthKey = process.env.ANTHROPIC_API_KEY;
  const tavilyKey = process.env.TAVILY_API_KEY;
  // Résilient : un cerveau suffit (Anthropic OU OpenRouter) — think() bascule seul.
  const hasBrain = anthKey || envAny(['OPENROUTER_API_KEY', 'OPENROUTER_KEY', 'OPEN_ROUTER_API_KEY', 'OPEN_API_ROUTER', 'OPEN_API_ROUTER_KEY']);
  if (!base || !key || !hasBrain) return json({ error: 'server not configured (SUPABASE / ANTHROPIC ou OPENROUTER)' }, 500);

  // ── Garde-fou journalier (anti-emballement) ──
  const dayStart = nowIso().slice(0, 10) + 'T00:00:00Z';
  const todayRuns = await sbGet(base, key, 'agent_runs', 'tokens', `started_at=gte.${dayStart}`);
  const tokensToday = todayRuns.reduce((s, r) => s + (r.tokens || 0), 0);
  if (tokensToday >= DAILY_TOKEN_CAP) {
    return json({ ok: true, skipped: 'plafond_tokens_du_jour_atteint', tokensToday, cap: DAILY_TOKEN_CAP }, 200);
  }

  const agents = await sbGet(base, key, 'agents', 'id,nom,prenom,role,autonomie,actif', 'order=id.asc');
  const details = [];
  let processed = 0;

  for (const a of agents) {
    if (processed >= MAX_PER_TICK) break;
    if (a.actif === false) continue;
    const claimed = await rpc(base, key, 'claim_next_mission', { p_departement: a.id });
    const mission = Array.isArray(claimed) ? claimed[0] : claimed;
    if (!mission || !mission.id) continue;

    const run = await sbInsert(base, key, 'agent_runs', {
      agent_id: a.id, mission_id: mission.id, statut: 'running',
      input: { titre: mission.titre, consigne: mission.consigne }, started_at: nowIso(),
    });
    const runId = Array.isArray(run) ? (run[0] && run[0].id) : (run && run.id);

    try {
      const txt = `${mission.titre || ''} ${mission.consigne || ''}`.toLowerCase();
      const needsSearch = SEARCH_HINTS.some((h) => txt.includes(h));
      const searchCtx = needsSearch ? await webSearch(`${mission.titre} ${mission.consigne}`.slice(0, 300), tavilyKey) : '';

      const system = `${REGLES_CORE}\n\n# Ton rôle (${a.prenom || a.nom || a.id})\n${a.role || ''}`;
      const user = [
        `# Mission`, `Titre : ${mission.titre || ''}`, `Consigne : ${mission.consigne || ''}`,
        searchCtx ? `\n${searchCtx}` : '',
        `\nRéalise la mission et rends un livrable prêt à valider.`,
      ].join('\n');

      const { text, tokens } = await think(anthKey, system, user);
      const auto = a.autonomie === 'auto';
      const statut = auto ? 'fait' : 'a_valider';

      await sbPatch(base, key, 'missions', `id=eq.${mission.id}`, {
        statut, resultat: text, assigned_agent: a.id, finished_at: nowIso(),
      });
      if (runId != null) {
        await sbPatch(base, key, 'agent_runs', `id=eq.${runId}`, {
          statut: 'done', output: text, tokens, finished_at: nowIso(),
        });
      }
      await sbInsert(base, key, 'journal', {
        type: 'agent',
        message: `${a.id} (auto-moteur) a traité #${mission.id} « ${(mission.titre || '').slice(0, 60)} » -> ${statut}`,
      });
      details.push({ agent: a.id, mission: mission.id, statut, recherche: !!searchCtx, tokens });
      processed++;
    } catch (e) {
      await sbPatch(base, key, 'missions', `id=eq.${mission.id}`, { statut: 'erreur', erreur: String(e).slice(0, 300), finished_at: nowIso() });
      if (runId != null) await sbPatch(base, key, 'agent_runs', `id=eq.${runId}`, { statut: 'error', erreur: String(e).slice(0, 300), finished_at: nowIso() });
      await sbInsert(base, key, 'journal', { type: 'erreur', message: `${a.id} (auto-moteur) erreur #${mission.id}: ${String(e).slice(0, 120)}` });
      details.push({ agent: a.id, mission: mission.id, statut: 'erreur' });
    }
  }

  return json({ ok: true, processed, tokensToday, details, at: nowIso() }, 200);
}
