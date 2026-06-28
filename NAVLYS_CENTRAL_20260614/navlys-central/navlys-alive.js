/* NAVLYS — couche VIVANTE (fond vidéo + bulles promo + SAV vocal)
   v1 · 2026-06-14 · à inclure sur chaque page : <script src="/navlys-alive.js" defer></script> */
(function(){
  var ICE='#5fe0ff', OR='#e9d3a0', NOIR='#05060a';

  /* ---------- styles ---------- */
  var css = `
  #nv-video{position:fixed;inset:0;z-index:-3;width:100%;height:100%;object-fit:cover;opacity:.22;filter:saturate(1.05)}
  #nv-veil{position:fixed;inset:0;z-index:-3;pointer-events:none;background:radial-gradient(1200px 900px at 50% 30%,transparent,rgba(5,6,10,.55) 70%,rgba(5,6,10,.85))}
  .nv-bubble{position:fixed;right:18px;bottom:96px;z-index:60;max-width:260px;
    background:linear-gradient(150deg,rgba(95,224,255,.16),rgba(10,12,20,.92));
    border:1px solid rgba(95,224,255,.4);border-radius:16px;padding:12px 15px;color:#eef0f6;
    font-family:'Lora',serif;font-size:.92rem;box-shadow:0 10px 34px rgba(0,0,0,.5);
    opacity:0;transform:translateY(14px) scale(.96);transition:opacity .6s,transform .6s}
  .nv-bubble.show{opacity:1;transform:translateY(0) scale(1)}
  .nv-bubble b{color:${OR};font-style:normal}
  .nv-bubble .x{position:absolute;top:6px;right:9px;color:#9fb3c8;cursor:pointer;font-size:.9rem}
  #nv-sav-btn{position:fixed;right:18px;bottom:18px;z-index:61;border:none;cursor:pointer;
    background:linear-gradient(100deg,${OR},#fff6df,${ICE},${OR});background-size:220% 100%;animation:nvsw 6s linear infinite;
    color:${NOIR};font-family:'Lora',serif;font-weight:600;border-radius:999px;padding:12px 18px;box-shadow:0 8px 26px rgba(0,0,0,.45)}
  @keyframes nvsw{0%{background-position:210% 0}100%{background-position:-60% 0}}
  #nv-sav{position:fixed;right:18px;bottom:74px;z-index:62;width:min(360px,92vw);display:none;flex-direction:column;
    background:linear-gradient(160deg,rgba(122,31,43,.22),rgba(10,12,20,.96));border:1px solid rgba(95,224,255,.3);
    border-radius:18px;overflow:hidden;box-shadow:0 16px 50px rgba(0,0,0,.6)}
  #nv-sav .hd{padding:13px 15px;border-bottom:1px solid rgba(95,224,255,.2);display:flex;align-items:center;gap:9px;color:#fff;font-family:'Cormorant Garamond';letter-spacing:1px}
  #nv-sav .hd .dot{width:9px;height:9px;border-radius:50%;background:${ICE};box-shadow:0 0 10px ${ICE};animation:nvb 2s ease-in-out infinite}
  @keyframes nvb{0%,100%{opacity:.5}50%{opacity:1}}
  #nv-sav .bd{padding:13px;display:flex;flex-direction:column;gap:9px;max-height:46vh;overflow:auto}
  #nv-sav .b{padding:10px 12px;border-radius:13px;font-family:'Lora',serif;font-size:.92rem;color:#eef0f6;white-space:pre-wrap;max-width:90%}
  #nv-sav .b.u{align-self:flex-end;background:rgba(95,224,255,.13);border:1px solid rgba(95,224,255,.3)}
  #nv-sav .b.n{align-self:flex-start;background:rgba(5,6,10,.55);border:1px solid rgba(233,211,160,.25)}
  #nv-sav .b .lt{color:${ICE};cursor:pointer;font-size:.78rem;font-style:italic;display:inline-block;margin-top:5px}
  #nv-sav .ft{display:flex;gap:7px;padding:11px;border-top:1px solid rgba(95,224,255,.2)}
  #nv-sav textarea{flex:1;background:rgba(5,6,10,.6);border:1px solid rgba(95,224,255,.25);border-radius:11px;color:#eef0f6;padding:9px;font-family:'Lora',serif;font-size:.95rem;resize:none;height:42px}
  #nv-sav .snd{border:none;cursor:pointer;background:${ICE};color:${NOIR};border-radius:10px;padding:0 14px;font-weight:600}
  `;
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  /* ---------- fond vidéo (slot /media/fond.mp4) + voile ---------- */
  var veil=document.createElement('div'); veil.id='nv-veil'; document.body.appendChild(veil);
  var v=document.createElement('video'); v.id='nv-video';
  v.autoplay=true; v.muted=true; v.loop=true; v.playsInline=true; v.setAttribute('playsinline','');
  v.src='/media/fond.mp4';
  v.onerror=function(){ v.remove(); }; // pas de vidéo => on garde les dégradés animés
  document.body.appendChild(v);

  /* ---------- bulles promo (apparaissent / disparaissent) ---------- */
  var promos=[
    '🎁 <b>Teste gratuitement</b> — 0 €, sans carte.',
    '📖 <b>Ton histoire vaut de l\'or.</b> Écris-la, transmets-la.',
    '⚖️ <b>NAVLEX :</b> 3 questions juridiques offertes.',
    '🧭 <b>Finance :</b> en euros, pas en promesses.',
    '✨ <b>Le Journal des Influenceurs</b> est sorti.',
    '🎙️ Bientôt : <b>ta voix</b> raconte ta vie.',
    '🌊 <b>L\'IA est le vent</b>, c\'est toi qui tiens la barre.'
  ];
  var pi=Math.floor(Math.random()*promos.length);
  function bubble(){
    if(document.hidden) return schedule();
    var b=document.createElement('div'); b.className='nv-bubble';
    b.innerHTML='<span class="x">✕</span>'+promos[pi%promos.length]; pi++;
    document.body.appendChild(b);
    requestAnimationFrame(function(){ b.classList.add('show'); });
    var kill=function(){ b.classList.remove('show'); setTimeout(function(){b.remove();},650); };
    b.querySelector('.x').onclick=kill;
    setTimeout(kill, 6500);
    schedule();
  }
  function schedule(){ setTimeout(bubble, 9000+Math.random()*7000); }
  setTimeout(bubble, 3500);

  /* ---------- SAV vocal ---------- */
  var btn=document.createElement('button'); btn.id='nv-sav-btn'; btn.textContent='💬 Aide';
  document.body.appendChild(btn);
  var panel=document.createElement('div'); panel.id='nv-sav';
  panel.innerHTML='<div class="hd"><span class="dot"></span> NAVLYS · Aide &amp; SAV</div>'+
    '<div class="bd" id="nv-bd"><div class="b n">Bonjour 👋 Je suis là pour t\'aider sur NAVLYS — une question, un souci, une idée ? Écris-moi.</div></div>'+
    '<div class="ft"><textarea id="nv-q" placeholder="Ta question…"></textarea><button class="snd" id="nv-snd">→</button></div>';
  document.body.appendChild(panel);
  btn.onclick=function(){ var open=panel.style.display==='flex'; panel.style.display=open?'none':'flex'; if(!open) document.getElementById('nv-q').focus(); };

  function listen(text, el){
    el.textContent='🔊 …';
    fetch('/api/voice',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:text})})
     .then(function(r){ if(!r.ok) throw 0; return r.blob(); })
     .then(function(b){ var a=new Audio(URL.createObjectURL(b)); a.play(); el.textContent='🔊 réécouter'; })
     .catch(function(){ el.textContent='🔇 voix indisponible'; });
  }
  function add(cls, txt, withVoice){
    var bd=document.getElementById('nv-bd');
    var d=document.createElement('div'); d.className='b '+cls; d.appendChild(document.createTextNode(txt));
    if(withVoice){ var lt=document.createElement('span'); lt.className='lt'; lt.textContent='🔊 écouter'; lt.onclick=function(){listen(txt,lt);}; d.appendChild(document.createElement('br')); d.appendChild(lt); }
    bd.appendChild(d); bd.scrollTop=bd.scrollHeight; return d;
  }
  function send(){
    var q=document.getElementById('nv-q'); var t=q.value.trim(); if(!t) return;
    add('u',t,false); q.value='';
    var p=add('n','… un instant',false);
    fetch('/api/sav',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:t})})
     .then(function(r){ return r.json().then(function(d){return {ok:r.ok,d:d};}); })
     .then(function(o){ p.remove(); add('n', (o.ok&&o.d.answer)?o.d.answer:(o.d.error?'Souci : '+o.d.error:'Le SAV répondra une fois en ligne sur navlys.com.'), o.ok&&o.d.answer); })
     .catch(function(){ p.remove(); add('n','Le SAV répondra une fois NAVLYS en ligne. (En local, le cerveau n\'est pas joignable.)',false); });
  }
  panel.querySelector('#nv-snd').onclick=send;
  panel.querySelector('#nv-q').addEventListener('keydown',function(e){ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); send(); } });
})();
