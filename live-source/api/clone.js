// NAVLYS — Edge Function : CLONE ANIMÉ (HeyGen, avatar de Bruno + voix NAVLYS)
// v1 · 2026-06-29
//   POST /api/clone { text }            -> lance la génération -> { video_id }
//   GET  /api/clone?video_id=XXXX       -> { status, video_url }
//
// Garde-fou Bible §6 n°1 : la génération HeyGen est un VRAI débit d'argent.
//   -> un signalement d'UNE ligne est journalisé (console) avant l'appel payant,
//      puis l'action suit. Ce n'est pas une question, c'est une protection.
//
// Sécurité (R6) : aucune clé en clair. Tout vient des variables d'env Vercel :
//   HEYGEN_API_KEY       (obligatoire)
//   HEYGEN_AVATAR_ID     (obligatoire — l'avatar entraîné sur le visage de Bruno)
//   HEYGEN_VOICE_ID      (optionnel — voix HeyGen ; sinon on passe une audio_url)
export const config = { runtime: 'edge' };

const ALLOWED = [
  'https://navlys.com','https://www.navlys.com','https://navlys.io','https://www.navlys.io',
  'https://brunopartouche.com','https://www.brunopartouche.com'
];
const MAX_CHARS = 1500;
const hits = new Map();
function limited(ip){ const now=Date.now(),w=60000,max=6; const a=(hits.get(ip)||[]).filter(t=>now-t<w); a.push(now); hits.set(ip,a); return a.length>max; }
function cors(o){ const x=ALLOWED.includes(o)?o:ALLOWED[0]; return {'Access-Control-Allow-Origin':x,'Access-Control-Allow-Methods':'POST, GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}; }
function json(body,status,origin){ return new Response(JSON.stringify(body),{status,headers:{...cors(origin),'Content-Type':'application/json'}}); }

export default async function handler(req){
  const origin = req.headers.get('origin')||'';
  if(req.method==='OPTIONS') return new Response(null,{status:204,headers:cors(origin)});

  const key = process.env.HEYGEN_API_KEY;
  if(!key) return json({error:'server not configured (HEYGEN_API_KEY)'},500,origin);

  // -------- GET : état d'une génération en cours (pas de débit) --------
  if(req.method==='GET'){
    const url = new URL(req.url);
    const videoId = url.searchParams.get('video_id');
    if(!videoId) return json({error:'video_id requis'},400,origin);
    const r = await fetch('https://api.heygen.com/v1/video_status.get?video_id='+encodeURIComponent(videoId),{
      headers:{ 'X-Api-Key':key, 'Accept':'application/json' }
    });
    if(!r.ok) return json({error:'status '+r.status},502,origin);
    const d = await r.json();
    const data = d.data||{};
    return json({ status:data.status, video_url:data.video_url||null, error:data.error||null },200,origin);
  }

  // -------- POST : lance la génération (DÉBIT HeyGen) --------
  if(req.method!=='POST') return json({error:'POST or GET only'},405,origin);
  if(!ALLOWED.includes(origin)) return json({error:'origin not allowed'},403,origin);

  const ip = req.headers.get('x-forwarded-for')||'anon';
  if(limited(ip)) return json({error:'trop de demandes, patiente une minute'},429,origin);

  const avatarId = process.env.HEYGEN_AVATAR_ID;
  if(!avatarId) return json({error:'server not configured (HEYGEN_AVATAR_ID)'},500,origin);

  let body; try{ body=await req.json(); }catch{ return json({error:'bad json'},400,origin); }
  const text = String(body.text||'').slice(0,MAX_CHARS).trim();
  if(!text) return json({error:'texte vide'},400,origin);

  // Voix : soit une voix HeyGen (HEYGEN_VOICE_ID), soit une audio_url fournie
  // (ex. notre /api/voice ElevenLabs hébergé) pour garder EXACTEMENT la voix de Bruno.
  const audioUrl = String(body.audio_url||'').trim();
  const voiceId  = process.env.HEYGEN_VOICE_ID;
  let voice;
  if(audioUrl){ voice = { type:'audio', audio_url:audioUrl }; }
  else if(voiceId){ voice = { type:'text', input_text:text, voice_id:voiceId }; }
  else return json({error:'aucune voix configurée (HEYGEN_VOICE_ID ou audio_url)'},500,origin);

  const payload = {
    video_inputs: [{
      character: { type:'avatar', avatar_id:avatarId, avatar_style:'normal' },
      voice,
      background: { type:'color', value:'#02040a' } // charte NAVLYS : fond nuit
    }],
    dimension: { width: 720, height: 1280 }, // vertical, prêt pour les réseaux
    caption: false
  };

  // ⚠️ SIGNALEMENT DÉBIT (Bible §6) — une ligne, puis l'action suit.
  console.log('[NAVLYS][DÉBIT] Génération clone HeyGen lancée (avatar '+avatarId+', ~'+text.length+' car.)');

  const r = await fetch('https://api.heygen.com/v2/video/generate',{
    method:'POST',
    headers:{ 'X-Api-Key':key, 'Content-Type':'application/json', 'Accept':'application/json' },
    body: JSON.stringify(payload)
  });
  if(!r.ok){ const t=await r.text().catch(()=> ''); return json({error:'heygen '+r.status, detail:t.slice(0,300)},502,origin); }
  const d = await r.json();
  const videoId = (d.data&&d.data.video_id) || d.video_id;
  if(!videoId) return json({error:'pas de video_id', detail:JSON.stringify(d).slice(0,300)},502,origin);
  return json({ video_id:videoId, status:'processing', signal:'débit HeyGen journalisé' },200,origin);
}
