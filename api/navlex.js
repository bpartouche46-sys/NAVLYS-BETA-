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
  if(!key) return j({error:'server not configured (ANTHROPIC_API_KEY)'},500,origin);
  const ip = req.headers.get('x-forwarded-for') || 'anon';
  if(limited(ip)) return j({error:'Trop de questions d\'un coup — réessaie dans une minute.'},429,origin);

  let body; try{ body = await req.json(); }catch{ return j({error:'bad json'},400,origin); }
  const question = String(body.question||'').slice(0,MAX_Q).trim();
  if(!question) return j({error:'question vide'},400,origin);

  const r = await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{ 'x-api-key':key, 'anthropic-version':'2023-06-01', 'Content-Type':'application/json' },
    body: JSON.stringify({ model:MODEL, max_tokens:MAX_TOKENS, system:SYSTEM, messages:[{role:'user',content:question}] })
  });
  const data = await r.json().catch(()=>({}));
  if(!r.ok) return j({error:'cerveau indisponible', detail:data && data.error},502,origin);
  const answer = (data.content||[]).filter(c=>c.type==='text').map(c=>c.text).join('\n').trim();
  return j({ answer: answer || 'Désolé, pas de réponse pour le moment.' },200,origin);
}
