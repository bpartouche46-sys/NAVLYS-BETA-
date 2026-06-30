// NAVLYS — Edge Function : SAV / Aide (assistant chaleureux)
// v1 · 2026-06-14 · POST /api/sav { message } -> { answer }
export const config = { runtime: 'edge' };

const ALLOWED = [
  'https://navlys.com','https://www.navlys.com','https://navlys.io','https://www.navlys.io',
  'https://brunopartouche.com','https://www.brunopartouche.com'
];
const MODEL='claude-haiku-4-5-20251001', MAX_TOKENS=700, MAX_MSG=1500;
const hits=new Map();
function limited(ip){ const now=Date.now(),w=60000,max=15; const a=(hits.get(ip)||[]).filter(t=>now-t<w); a.push(now); hits.set(ip,a); return a.length>max; }
function cors(o){ const x=ALLOWED.includes(o)?o:ALLOWED[0]; return {'Access-Control-Allow-Origin':x,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}; }
function j(d,s,o){ return new Response(JSON.stringify(d),{status:s,headers:{...cors(o),'Content-Type':'application/json'}}); }

const SYSTEM=[
 "Tu es l'Aide & SAV de NAVLYS — chaleureux, simple, humain, images marines, jamais robotique.",
 "NAVLYS = univers d'applications qui réunit l'humain et l'IA, accessible à tous, mobile + voix. L'humain au centre.",
 "Apps : NAVLYS Finance (éducation/veille, cockpit 90/10, GRATUIT 0€), NAVLYS Next Gen (livre/film de vie, gratuit puis à partir de 9,99€ HT/mois), NAVLEX (questions juridiques, 3 offertes puis 9,99€ HT/mois), Journal des Influenceurs, Radio NAVLYS.",
 "TOUS les prix sont affichés HORS TAXES (HT). Dis toujours 'HT'.",
 "Tu aides sur l'utilisation, les offres, les comptes, les questions générales.",
 "INTERDITS : aucun conseil financier personnalisé ni promesse de rendement (renvoie vers l'éducation Finance) ; aucun conseil juridique personnalisé (renvoie vers NAVLEX, info générale, pas un avocat).",
 "Si tu ne sais pas ou si c'est sensible, propose de laisser un message à l'équipe. Réponses courtes, gentilles, utiles."
].join(' ');

export default async function handler(req){
  const origin=req.headers.get('origin')||'';
  if(req.method==='OPTIONS') return new Response(null,{status:204,headers:cors(origin)});
  if(req.method!=='POST') return j({error:'POST only'},405,origin);
  if(!ALLOWED.includes(origin)) return j({error:'origin not allowed'},403,origin);
  const key=process.env.ANTHROPIC_API_KEY;
  if(!key) return j({error:'server not configured (ANTHROPIC_API_KEY)'},500,origin);
  const ip=req.headers.get('x-forwarded-for')||'anon';
  if(limited(ip)) return j({error:'Un instant, trop de messages d\'un coup — réessaie dans une minute.'},429,origin);
  let body; try{ body=await req.json(); }catch{ return j({error:'bad json'},400,origin); }
  const message=String(body.message||'').slice(0,MAX_MSG).trim();
  if(!message) return j({error:'message vide'},400,origin);
  const r=await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{ 'x-api-key':key,'anthropic-version':'2023-06-01','Content-Type':'application/json' },
    body:JSON.stringify({ model:MODEL, max_tokens:MAX_TOKENS, system:SYSTEM, messages:[{role:'user',content:message}] })
  });
  const data=await r.json().catch(()=>({}));
  if(!r.ok) return j({error:'cerveau indisponible'},502,origin);
  const answer=(data.content||[]).filter(c=>c.type==='text').map(c=>c.text).join('\n').trim();
  return j({ answer: answer || 'Je reviens vers toi très vite 🌊' },200,origin);
}
