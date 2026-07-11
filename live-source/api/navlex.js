// NAVLYS — Edge Function : NAVLEX (information juridique générale)
// v1 · 2026-06-14
// POST /api/navlex { question } -> { answer }
// Clé Anthropic côté serveur (process.env.ANTHROPIC_API_KEY), jamais dans le navigateur.
export const config = { runtime: 'edge' };

const ALLOWED = [
  'https://navlys.com','https://www.navlys.com','https://navlys.io','https://www.navlys.io',
  'https://brunopartouche.com','https://www.brunopartouche.com'
];
const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 900;
const MAX_Q = 1200;

// anti-abus simple : 12 questions / min / IP
const hits = new Map();
function limited(ip){
  const now = Date.now(), w = 60000, max = 12;
  const a = (hits.get(ip) || []).filter(t => now - t < w);
  a.push(now); hits.set(ip, a);
  return a.length > max;
}
function cors(o){ const x = ALLOWED.includes(o) ? o : ALLOWED[0]; return {'Access-Control-Allow-Origin':x,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}; }
function j(d,s,o){ return new Response(JSON.stringify(d),{status:s,headers:{...cors(o),'Content-Type':'application/json'}}); }

// ════════ INDÉPENDANCE DU CORE (gravé 2026-07-09) ════════
// NAVLEX doit continuer à répondre même si api.anthropic.com tombe (coupure
// Claude). callBrain() essaie Anthropic direct puis, si ça échoue, bascule seul
// sur OpenRouter (modèle gratuit non-Anthropic en dernier recours) — lecture
// tolérante de la clé (règle n°4), aucun redéploiement nécessaire le jour où
// OPENROUTER_API_KEY est posée dans Vercel. Même pattern que whatsapp-webhook.js.
function envAny(names){ for(const n of names){ const v=process.env[n]; if(v) return v; } return ''; }
async function callBrain(system, user, { anthKey, maxTokens=MAX_TOKENS, model=MODEL }={}){
  if(anthKey){
    try{
      const r=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{ 'x-api-key':anthKey, 'anthropic-version':'2023-06-01', 'Content-Type':'application/json' },
        body:JSON.stringify({ model, max_tokens:maxTokens, system, messages:[{role:'user',content:user}] })
      });
      if(r.ok){
        const d=await r.json();
        const t=(d.content||[]).filter(c=>c.type==='text').map(c=>c.text).join('\n').trim();
        if(t) return t;
      }
    }catch{ /* on tente le repli ci-dessous */ }
  }
  const orKey=envAny(['OPENROUTER_API_KEY','OPENROUTER_KEY','OPEN_ROUTER_API_KEY','OPEN_API_ROUTER','OPEN_API_ROUTER_KEY']);
  if(orKey){
    for(const orModel of ['meta-llama/llama-3.3-70b-instruct:free','anthropic/claude-haiku-4.5']){
      try{
        const r=await fetch('https://openrouter.ai/api/v1/chat/completions',{
          method:'POST',
          headers:{ Authorization:`Bearer ${orKey}`, 'Content-Type':'application/json', 'HTTP-Referer':'https://navlys.com', 'X-Title':'NAVLYS CORE' },
          body:JSON.stringify({ model:orModel, max_tokens:maxTokens, messages:[{role:'system',content:system},{role:'user',content:user}] })
        });
        if(r.ok){
          const d=await r.json();
          const t=(d?.choices?.[0]?.message?.content||'').trim();
          if(t) return t;
        }
      }catch{ /* essai suivant */ }
    }
  }
  return '';
}

const SYSTEM = [
  "Tu es NAVLEX, l'assistant juridique pédagogique de NAVLYS.",
  "Tu expliques le droit en français SIMPLE, clair, sans jargon (style accessible à tous), avec des exemples concrets.",
  "Tu donnes une INFORMATION GÉNÉRALE, jamais un conseil juridique personnalisé : tu ne remplaces pas un avocat.",
  "Pour toute situation précise/personnelle, recommande de consulter un professionnel du droit.",
  "Tu peux développer autant que nécessaire pour être vraiment utile, mais reste honnête : si une réponse dépend du pays ou du contexte, dis-le.",
  "Termine chaque réponse par une courte ligne : « ⚖️ Info générale, pas un conseil personnalisé. »",
  "Refuse poliment toute demande illégale ou de contournement de la loi."
].join(' ');

export default async function handler(req){
  const origin = req.headers.get('origin') || '';
  if(req.method==='OPTIONS') return new Response(null,{status:204,headers:cors(origin)});
  if(req.method!=='POST') return j({error:'POST only'},405,origin);
  if(!ALLOWED.includes(origin)) return j({error:'origin not allowed'},403,origin);
  const key = process.env.ANTHROPIC_API_KEY;
  // Résilient : on démarre dès qu'AU MOINS un cerveau est configuré (Anthropic OU OpenRouter).
  const hasOr = !!envAny(['OPENROUTER_API_KEY','OPENROUTER_KEY','OPEN_ROUTER_API_KEY','OPEN_API_ROUTER','OPEN_API_ROUTER_KEY']);
  if(!key && !hasOr) return j({error:'server not configured (ANTHROPIC_API_KEY)'},500,origin);
  const ip = req.headers.get('x-forwarded-for') || 'anon';
  if(limited(ip)) return j({error:'Trop de questions d\'un coup — réessaie dans une minute.'},429,origin);

  let body; try{ body = await req.json(); }catch{ return j({error:'bad json'},400,origin); }
  const question = String(body.question||'').slice(0,MAX_Q).trim();
  if(!question) return j({error:'question vide'},400,origin);

  const answer = await callBrain(SYSTEM, question, { anthKey:key });
  if(!answer) return j({error:'cerveau indisponible'},502,origin);
  return j({ answer },200,origin);
}
