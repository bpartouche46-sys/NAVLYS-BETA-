// NAVLYS — Edge Function : Webhook WhatsApp (360dialog) -> SAV qui repond tout seul
// v1 · 2026-06-14
// GET  /api/whatsapp-webhook  -> verification (hub.challenge)
// POST /api/whatsapp-webhook  -> recoit un message, repond via le cerveau SAV (Anthropic), envoie via 360dialog
// Cles cote serveur : D360_API_KEY, ANTHROPIC_API_KEY, WHATSAPP_VERIFY_TOKEN
export const config = { runtime: 'edge' };

const MODEL = 'claude-haiku-4-5-20251001', MAX_TOKENS = 600;
const SYSTEM = [
  "Tu es l'Aide & SAV NAVLYS sur WhatsApp — chaleureux, simple, humain, images marines, jamais robotique. Reponses COURTES (WhatsApp).",
  "NAVLYS = univers d'applications humain + IA, accessible a tous. Apps : Finance (education, GRATUIT 0EUR), Next Gen (livre/film de vie, gratuit puis 9,99EUR HT/mois), NAVLEX (juridique, 3 questions offertes puis 9,99EUR HT/mois), Journal Influenceurs, Journal de l'IA, Radio.",
  "Tous les prix sont HT. INTERDIT : conseil financier personnalise / promesse de rendement (renvoie a l'education), conseil juridique personnalise (renvoie NAVLEX, info generale). Si sensible/inconnu : propose de laisser un message a l'equipe."
].join(' ');

async function brain(text, key){
  const r = await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST', headers:{ 'x-api-key':key, 'anthropic-version':'2023-06-01', 'Content-Type':'application/json' },
    body: JSON.stringify({ model:MODEL, max_tokens:MAX_TOKENS, system:SYSTEM, messages:[{role:'user',content:text}] })
  });
  const d = await r.json().catch(()=>({}));
  return ((d.content||[]).filter(c=>c.type==='text').map(c=>c.text).join('\n').trim()) || 'Je reviens vers toi tres vite 🌊';
}
async function sendWA(to, body, d360){
  await fetch('https://waba-v2.360dialog.io/messages',{
    method:'POST', headers:{ 'D360-API-KEY':d360, 'Content-Type':'application/json' },
    body: JSON.stringify({ messaging_product:'whatsapp', to, type:'text', text:{ body } })
  });
}

export default async function handler(req){
  const u = new URL(req.url);
  // Verification 360dialog/Meta
  if(req.method==='GET'){
    const mode=u.searchParams.get('hub.mode'), token=u.searchParams.get('hub.verify_token'), challenge=u.searchParams.get('hub.challenge');
    if(mode==='subscribe' && token && token===process.env.WHATSAPP_VERIFY_TOKEN) return new Response(challenge||'',{status:200});
    return new Response('forbidden',{status:403});
  }
  if(req.method!=='POST') return new Response('POST only',{status:405});

  const d360=process.env.D360_API_KEY, anth=process.env.ANTHROPIC_API_KEY;
  let body; try{ body=await req.json(); }catch{ return new Response('ok',{status:200}); }
  try{
    const value = body?.entry?.[0]?.changes?.[0]?.value;
    const msg = value?.messages?.[0];
    if(msg && msg.type==='text' && d360 && anth){
      const from = msg.from;
      const txt = msg.text?.body || '';
      const reply = await brain(txt, anth);
      await sendWA(from, reply, d360);
    }
  }catch(e){ /* on accuse toujours reception pour ne pas faire retenter Meta */ }
  // 360dialog/Meta attendent un 200 rapide
  return new Response(JSON.stringify({ received:true }),{status:200,headers:{'Content-Type':'application/json'}});
}
