// NAVLYS — Edge Function : VOIX (TTS ElevenLabs, voix NAVLYS)
// v1 · 2026-06-14 · POST /api/voice { text } -> audio/mpeg
export const config = { runtime: 'edge' };

const ALLOWED = [
  'https://navlys.com','https://www.navlys.com','https://navlys.io','https://www.navlys.io',
  'https://brunopartouche.com','https://www.brunopartouche.com'
];
// VOICE_ID fourni UNIQUEMENT via env ELEVENLABS_VOICE_ID (R6 sécurité : jamais en clair dans Git)
const MAX_CHARS = 1200;
const hits = new Map();
function limited(ip){ const now=Date.now(),w=60000,max=10; const a=(hits.get(ip)||[]).filter(t=>now-t<w); a.push(now); hits.set(ip,a); return a.length>max; }
function cors(o){ const x=ALLOWED.includes(o)?o:ALLOWED[0]; return {'Access-Control-Allow-Origin':x,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}; }

export default async function handler(req){
  const origin = req.headers.get('origin')||'';
  if(req.method==='OPTIONS') return new Response(null,{status:204,headers:cors(origin)});
  if(req.method!=='POST') return new Response(JSON.stringify({error:'POST only'}),{status:405,headers:{...cors(origin),'Content-Type':'application/json'}});
  if(!ALLOWED.includes(origin)) return new Response(JSON.stringify({error:'origin not allowed'}),{status:403,headers:{...cors(origin),'Content-Type':'application/json'}});
  const key = process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY2;
  if(!key) return new Response(JSON.stringify({error:'server not configured (ELEVENLABS_API_KEY)'}),{status:500,headers:{...cors(origin),'Content-Type':'application/json'}});
  const ip = req.headers.get('x-forwarded-for')||'anon';
  if(limited(ip)) return new Response(JSON.stringify({error:'trop de demandes, patiente une minute'}),{status:429,headers:{...cors(origin),'Content-Type':'application/json'}});
  let body; try{ body=await req.json(); }catch{ return new Response(JSON.stringify({error:'bad json'}),{status:400,headers:{...cors(origin),'Content-Type':'application/json'}}); }
  const text = String(body.text||'').slice(0,MAX_CHARS).trim();
  if(!text) return new Response(JSON.stringify({error:'texte vide'}),{status:400,headers:{...cors(origin),'Content-Type':'application/json'}});
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  if(!voiceId) return new Response(JSON.stringify({error:'server not configured (ELEVENLABS_VOICE_ID)'}),{status:500,headers:{...cors(origin),'Content-Type':'application/json'}});
  const r = await fetch('https://api.elevenlabs.io/v1/text-to-speech/'+voiceId,{
    method:'POST',
    headers:{ 'xi-api-key':key, 'Content-Type':'application/json', 'Accept':'audio/mpeg' },
    body: JSON.stringify({ text, model_id:'eleven_multilingual_v2', voice_settings:{ stability:0.5, similarity_boost:0.75 } })
  });
  if(!r.ok) return new Response(JSON.stringify({error:'tts '+r.status}),{status:502,headers:{...cors(origin),'Content-Type':'application/json'}});
  return new Response(r.body,{status:200,headers:{...cors(origin),'Content-Type':'audio/mpeg','Cache-Control':'no-store'}});
}
