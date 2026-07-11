/* NAVLYS — couche VIVANTE (decor cinema anime + fond video + bulles promo + SAV vocal)
   v2 · 2026-06-15 · a inclure sur chaque page : <script src="/navlys-alive.js" defer></script> */
/* Sources vidéo de fond PARTAGÉES : voile NAVLYS + présentations.
   Ralenti (playbackRate) mais fluidité d'image conservée (lecture native) + HD.
   Essaie chaque fichier dans l'ordre ; si aucun n'existe → événement 'nv-novideo'
   (le décor vivant / le repli reste). Dépose les fichiers dans /media/. */
window.NAVLYS_BGV = window.NAVLYS_BGV || ['/media/voile.mp4','/media/fond.mp4','/media/presentation-1.mp4','/media/presentation-2.mp4','/media/presentation-3.mp4'];
/* petit écran LIVE (bande casino) : la vraie vidéo NAVLYS déjà en Storage (visage/voile) —
   la « voile » /media/ prend le dessus dès qu'elle existe */
window.NAVLYS_LIVEV = window.NAVLYS_LIVEV || ['/media/voile.mp4','https://hhrlgyvtqluxpywjiwkd.supabase.co/storage/v1/object/public/avatar/bruno-avatar-accueil.mp4'];
window.NAVLYS_setVideo = function(v, rate, srcs){
  var list=(srcs||window.NAVLYS_BGV||[]).slice(), i=0, done=false;
  function tryNext(){ if(i>=list.length){ try{ v.dispatchEvent(new Event('nv-novideo')); }catch(e){} return; } v.src=list[i++]; }
  v.addEventListener('error', function(){ if(!done) tryNext(); });
  v.addEventListener('loadeddata', function(){ done=true; try{ v.playbackRate=rate||0.6; }catch(e){} });
  tryNext();
  return v;
};
(function(){
  var ICE='#7DD3FC', OR='#e9d3a0', NOIR='#05060a';

  /* ---------- styles ---------- */
  var css = `
  #nv-living{position:fixed;inset:0;z-index:-4;width:100%;height:100%;display:block}
  #nv-video{position:fixed;inset:0;z-index:-3;width:100%;height:100%;object-fit:cover;opacity:.82;filter:saturate(1.06)}
  #nv-veil{position:fixed;inset:0;z-index:-2;pointer-events:none;background:radial-gradient(1400px 1000px at 50% 26%,transparent,rgba(5,6,10,.16) 80%,rgba(5,6,10,.42))}
  /* FLASH = bande HAUTE, pleine, fond or 100% opaque, ~1/3 d'écran — jamais par-dessus un texte (elle le recouvre en plein). PC + mobile. */
  /* bande FINE (moitié moins haute) : flash discret, animé, en haut */
  .nv-bubble{position:fixed;left:0;right:0;top:0;z-index:2147483000;
    display:flex;align-items:center;justify-content:center;text-align:center;padding:6px 40px 7px;
    background:linear-gradient(180deg,#f3dd8f 0%,#dcb84f 60%,#c79f39 100%);color:#100a00;
    box-shadow:0 6px 16px rgba(0,0,0,.38);cursor:pointer;
    font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(.88rem,2.4vw,1.12rem);line-height:1.22;font-weight:600;
    transform:translateY(-102%);transition:transform .5s cubic-bezier(.2,.8,.2,1);pointer-events:auto}
  .nv-bubble.show{transform:translateY(0)}
  .nv-bubble .in{max-width:820px;margin:0 auto}
  .nv-bubble b{color:#7a1500;font-style:normal;font-weight:800}
  .nv-bubble .x{position:absolute;top:6px;right:12px;width:24px;height:24px;border-radius:50%;
    display:grid;place-items:center;background:rgba(0,0,0,.16);color:#100a00;cursor:pointer;font-size:.9rem;font-weight:700}
  #nv-sav-btn{position:fixed;right:18px;bottom:84px;z-index:61;border:none;cursor:pointer;
    background:linear-gradient(100deg,${OR},#fff6df,${ICE},${OR});background-size:220% 100%;animation:nvsw 6s linear infinite;
    color:${NOIR};font-family:'Lora',serif;font-weight:600;border-radius:999px;padding:12px 18px;box-shadow:0 8px 26px rgba(0,0,0,.45)}
  @keyframes nvsw{0%{background-position:210% 0}100%{background-position:-60% 0}}
  #nv-sav{position:fixed;right:18px;bottom:140px;z-index:62;width:min(360px,92vw);display:none;flex-direction:column;
    background:linear-gradient(160deg,rgba(125,211,252,.10),rgba(10,12,20,.96));border:1px solid rgba(125,211,252,.3);
    border-radius:18px;overflow:hidden;box-shadow:0 16px 50px rgba(0,0,0,.6)}
  #nv-sav .hd{padding:13px 15px;border-bottom:1px solid rgba(125,211,252,.2);display:flex;align-items:center;gap:9px;color:#fff;font-family:'Cormorant Garamond';letter-spacing:1px}
  #nv-sav .hd .dot{width:9px;height:9px;border-radius:50%;background:${ICE};box-shadow:0 0 10px ${ICE};animation:nvb 2s ease-in-out infinite}
  @keyframes nvb{0%,100%{opacity:.5}50%{opacity:1}}
  #nv-sav .bd{padding:13px;display:flex;flex-direction:column;gap:9px;max-height:46vh;overflow:auto}
  #nv-sav .b{padding:10px 12px;border-radius:13px;font-family:'Lora',serif;font-size:.92rem;color:#eef0f6;white-space:pre-wrap;max-width:90%}
  #nv-sav .b.u{align-self:flex-end;background:rgba(125,211,252,.13);border:1px solid rgba(125,211,252,.3)}
  #nv-sav .b.n{align-self:flex-start;background:rgba(5,6,10,.55);border:1px solid rgba(233,211,160,.25)}
  #nv-sav .b .lt{color:${ICE};cursor:pointer;font-size:.78rem;font-style:italic;display:inline-block;margin-top:5px}
  #nv-sav .ft{display:flex;gap:7px;padding:11px;border-top:1px solid rgba(125,211,252,.2)}
  #nv-sav textarea{flex:1;background:rgba(5,6,10,.6);border:1px solid rgba(125,211,252,.25);border-radius:11px;color:#eef0f6;padding:9px;font-family:'Lora',serif;font-size:.95rem;resize:none;height:42px}
  #nv-sav .snd{border:none;cursor:pointer;background:${ICE};color:${NOIR};border-radius:10px;padding:0 14px;font-weight:600}
  #nv-sav .mic{border:1px solid rgba(125,211,252,.4);cursor:pointer;background:rgba(125,211,252,.12);color:#a8e3ff;border-radius:10px;padding:0 12px;font-size:1.05rem}
  #nv-sav .mic.on{background:rgba(233,211,160,.25);border-color:rgba(233,211,160,.7);animation:nvMicPulse 1.1s ease-in-out infinite}
  @keyframes nvMicPulse{0%,100%{box-shadow:0 0 0 0 rgba(233,211,160,.35)}50%{box-shadow:0 0 0 7px rgba(233,211,160,0)}}
  /* ---------- RETOUR (💡) : plus de 2e bouton flottant — un choix DANS le
     panneau Aide (un seul bouton à l'écran, demande Bruno 2026-07-08) ---------- */
  #nv-fb-open{cursor:pointer;text-align:center;color:${OR};font-family:'Lora',serif;font-size:.85rem;
    padding:8px 11px;border-top:1px solid rgba(233,211,160,.2);background:rgba(233,211,160,.06)}
  #nv-fb-open:hover{background:rgba(233,211,160,.14)}
  #nv-fb{position:fixed;right:18px;bottom:140px;z-index:62;width:min(360px,92vw);display:none;flex-direction:column;
    background:linear-gradient(160deg,rgba(28,26,18,.96),rgba(6,8,13,.97));border:1px solid rgba(233,211,160,.35);
    -webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);
    border-radius:18px;overflow:hidden;box-shadow:0 16px 50px rgba(0,0,0,.6)}
  #nv-fb .hd{padding:13px 15px;border-bottom:1px solid rgba(233,211,160,.25);color:#fff;font-family:'Cormorant Garamond';letter-spacing:1px}
  #nv-fb .hd small{display:block;color:#b9c6d6;font-family:'Lora',serif;font-size:.8rem;letter-spacing:0;margin-top:3px}
  #nv-fb .bd{padding:13px;display:flex;flex-direction:column;gap:9px}
  #nv-fb .row{display:flex;gap:7px;flex-wrap:wrap}
  #nv-fb .opt{flex:1;text-align:center;cursor:pointer;border:1px solid rgba(125,211,252,.25);border-radius:9px;padding:8px 4px;
    color:#cfe0f2;font-family:'Lora',serif;font-size:.85rem;min-height:42px}
  #nv-fb .opt.on{background:rgba(125,211,252,.18);color:#fff;border-color:rgba(125,211,252,.55)}
  #nv-fb textarea{background:rgba(5,6,10,.92);border:1px solid rgba(233,211,160,.3);border-radius:11px;color:#eef0f6;
    padding:10px;font-family:'Lora',serif;font-size:.95rem;resize:none;height:84px}
  #nv-fb .go{border:none;cursor:pointer;background:linear-gradient(100deg,${OR},#fff6df,${OR});color:${NOIR};
    border-radius:11px;padding:12px;font-weight:700;font-family:'Lora',serif}
  #nv-fb .ok{color:${OR};font-family:'Lora',serif;font-size:.9rem;padding:4px 2px;display:none}
  `;
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  /* ---------- DECOR CINEMA VIVANT (canvas, doux & suave, tourne toujours) ---------- */
  var cv=document.createElement('canvas'); cv.id='nv-living'; document.body.appendChild(cv);
  var ctx=cv.getContext('2d'), W=0, H=0, DPR=Math.min(window.devicePixelRatio||1,2);
  function resize(){ W=cv.clientWidth=innerWidth; H=cv.clientHeight=innerHeight; cv.width=W*DPR; cv.height=H*DPR; ctx.setTransform(DPR,0,0,DPR,0,0); }
  window.addEventListener('resize',resize); resize();

  // particules de lumiere qui montent doucement
  var motes=[]; for(var i=0;i<70;i++){ motes.push({ x:Math.random(), y:Math.random(), r:0.6+Math.random()*2.2, sp:0.006+Math.random()*0.02, ph:Math.random()*6.28, hue:Math.random()<0.5?ICE:OR }); }
  // voiliers de l'Equipage : glissent doucement sur l'horizon, toujours
  var boats=[]; for(var bj=0;bj<3;bj++){ boats.push({ x:Math.random()*1.3-0.15, y:0.74+Math.random()*0.11, sp:0.00016+Math.random()*0.00026, sc:0.7+Math.random()*0.85, ph:Math.random()*6.28, hue:bj===1?OR:ICE }); }
  function hx(c,a){ var n=parseInt(c.slice(1),16); return 'rgba('+(n>>16&255)+','+(n>>8&255)+','+(n&255)+','+a+')'; }
  function voilier(px,py,sc,col,swell){
    ctx.save(); ctx.translate(px,py+swell); ctx.globalCompositeOperation='lighter';
    ctx.shadowColor=hx(col,0.6); ctx.shadowBlur=14;
    // reflet sur l'eau
    var rfl=ctx.createLinearGradient(0,2*sc,0,28*sc); rfl.addColorStop(0,hx(col,0.20)); rfl.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=rfl; ctx.fillRect(-4*sc,2*sc,8*sc,26*sc);
    // coque
    ctx.beginPath(); ctx.moveTo(-17*sc,0); ctx.quadraticCurveTo(0,12*sc,17*sc,0); ctx.quadraticCurveTo(0,5*sc,-17*sc,0); ctx.closePath();
    ctx.fillStyle=hx(col,0.85); ctx.fill();
    // mat
    ctx.strokeStyle=hx(col,0.8); ctx.lineWidth=1.4*sc; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-31*sc); ctx.stroke();
    // grand-voile
    ctx.beginPath(); ctx.moveTo(1.6*sc,-30*sc); ctx.lineTo(1.6*sc,-2*sc); ctx.lineTo(15*sc,-2*sc); ctx.closePath(); ctx.fillStyle=hx(col,0.5); ctx.fill();
    // foc
    ctx.beginPath(); ctx.moveTo(-1.6*sc,-26*sc); ctx.lineTo(-1.6*sc,-2*sc); ctx.lineTo(-12*sc,-2*sc); ctx.closePath(); ctx.fillStyle=hx(col,0.32); ctx.fill();
    ctx.restore();
  }

  function frame(t){
    var s=t*0.001;
    // --- ciel -> mer, teintes qui derivent lentement ---
    var k=(Math.sin(s*0.06)+1)/2; // 0..1 tres lent
    var g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0.00,'#04060d');
    g.addColorStop(0.34,'#071226');
    g.addColorStop(0.60, k<0.5?'#0a2740':'#10283f');
    g.addColorStop(0.78, hx(ICE,0.10+0.05*k));
    g.addColorStop(0.90, hx(OR,0.10+0.06*(1-k)));
    g.addColorStop(1.00,'#06070c');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);

    // --- halo d'horizon (soleil doux) ---
    var hy=H*0.80, hx0=W*(0.5+0.18*Math.sin(s*0.05));
    var rg=ctx.createRadialGradient(hx0,hy,0,hx0,hy,H*0.6);
    rg.addColorStop(0, hx(OR,0.16)); rg.addColorStop(0.5, hx(OR,0.05)); rg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=rg; ctx.fillRect(0,0,W,H);

    // --- voiliers de l'Equipage qui glissent sur l'horizon ---
    for(var bI=0;bI<boats.length;bI++){ var bt=boats[bI];
      bt.x+=bt.sp; if(bt.x>1.2){ bt.x=-0.2; bt.y=0.74+Math.random()*0.11; bt.sc=0.7+Math.random()*0.85; }
      voilier(bt.x*W, bt.y*H, bt.sc, bt.hue, Math.sin(s*0.85+bt.ph)*2.2*bt.sc);
    }
    ctx.shadowBlur=0; ctx.globalCompositeOperation='source-over';

    // --- aurores / rubans de lumiere qui ondulent ---
    ctx.globalCompositeOperation='lighter';
    for(var a=0;a<3;a++){
      var baseY=H*(0.30+a*0.13), amp=24+a*14, col=a===1?OR:ICE;
      ctx.beginPath();
      for(var x=0;x<=W;x+=14){
        var y=baseY + Math.sin(x*0.0045 + s*(0.5+a*0.25) + a)*amp + Math.sin(x*0.0017 - s*0.3)*amp*0.5;
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle=hx(col, 0.07+0.03*Math.sin(s*0.6+a)); ctx.lineWidth=18+a*8;
      ctx.shadowColor=hx(col,0.5); ctx.shadowBlur=34; ctx.stroke();
    }
    ctx.shadowBlur=0;

    // --- particules de lumiere (motes) ---
    for(var m=0;m<motes.length;m++){ var p=motes[m];
      p.y-=p.sp*0.012; if(p.y<-0.05){ p.y=1.05; p.x=Math.random(); }
      var tw=0.4+0.6*Math.abs(Math.sin(s*1.2+p.ph));
      ctx.beginPath(); ctx.arc(p.x*W,p.y*H,p.r,0,6.283);
      ctx.fillStyle=hx(p.hue,0.5*tw); ctx.shadowColor=hx(p.hue,0.8); ctx.shadowBlur=8; ctx.fill();
    }
    ctx.shadowBlur=0; ctx.globalCompositeOperation='source-over';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------- voile tres leger pour la lisibilite ---------- */
  var veil=document.createElement('div'); veil.id='nv-veil'; document.body.appendChild(veil);

  /* ---------- fond video reel (slot /media/fond.mp4 — par-dessus le decor quand fourni) ---------- */
  var v=document.createElement('video'); v.id='nv-video';
  v.autoplay=true; v.muted=true; v.loop=true; v.playsInline=true; v.setAttribute('playsinline','');
  // fond = voile NAVLYS + présentations, RALENTI mais fluide + HD ; aucun fichier => décor vivant
  v.addEventListener('nv-novideo', function(){ v.remove(); });
  window.NAVLYS_setVideo(v, 0.6);
  document.body.appendChild(v);

  /* ---------- bulles promo (apparaissent / disparaissent) ---------- */
  var promos=[
    '🎁 <b>Teste gratuitement</b> — 0 €, en toute liberté.',
    '📖 <b>Ton histoire vaut de l\'or.</b> Écris-la, transmets-la.',
    '⚖️ <b>NAVLEX :</b> 3 questions juridiques offertes.',
    '🧭 <b>Finance :</b> en euros et en confiance.',
    '✨ <b>Le Journal des Influenceurs</b> est sorti.',
    '🎙️ Bientôt : <b>ta voix</b> raconte ta vie.',
    '🌊 <b>L\'IA est le vent</b>, c\'est toi qui tiens la barre.'
  ];
  var pi=Math.floor(Math.random()*promos.length);
  function bubble(){
    if(document.hidden) return schedule();
    var _old=document.querySelector('.nv-bubble'); if(_old){ _old.remove(); } // une seule bulle à la fois (plus de texte sur texte)
    var b=document.createElement('div'); b.className='nv-bubble';
    b.innerHTML='<span class="x">✕</span><div class="in">'+promos[pi%promos.length]+'</div>'; pi++;
    document.body.appendChild(b);
    requestAnimationFrame(function(){ b.classList.add('show'); });
    var kill=function(){ b.classList.remove('show'); setTimeout(function(){b.remove();},650); };
    var x=b.querySelector('.x'); x.onclick=function(ev){ ev.stopPropagation(); kill(); };
    b.querySelector('.in').onclick=function(){ location.href='/adhesion'; }; // la bande → inscription
    setTimeout(kill, 3000);
    schedule();
  }
  /* Un message toutes les ~2 minutes, visible 3 s (demande Bruno 2026-07-08) — et
     PAS de flash au démarrage : on laisse le prospect découvrir seul d'abord. */
  function schedule(){ setTimeout(bubble, 120000+Math.random()*20000); }
  setTimeout(bubble, 90000);

  /* ---------- SAV vocal ---------- */
  var btn=document.createElement('button'); btn.id='nv-sav-btn'; btn.textContent='💬 Aide';
  document.body.appendChild(btn);
  var panel=document.createElement('div'); panel.id='nv-sav';
  panel.innerHTML='<div class="hd"><span class="dot"></span> NAVLYS · Aide &amp; SAV</div>'+
    '<div class="bd" id="nv-bd"><div class="b n">Bonjour 👋 Je suis là pour t\'aider sur NAVLYS — une question, une idée ? Écris-moi.<br><span class="lt" id="nv-hello">🔊 écouter Bruno</span></div></div>'+
    '<div class="ft"><textarea id="nv-q" placeholder="Ta question…"></textarea><button class="mic" id="nv-mic" title="Parle — je t\'écoute">🎙️</button><button class="snd" id="nv-snd">→</button></div>'+
    '<div id="nv-fb-open">💡 Améliorer</div>';
  document.body.appendChild(panel);
  btn.onclick=function(){ var open=panel.style.display==='flex'; panel.style.display=open?'none':'flex'; if(!open) document.getElementById('nv-q').focus(); };
  /* accueil : la VRAIE voix de Bruno (mp3 statique, clone ElevenLabs) */
  var helloBtn=panel.querySelector('#nv-hello');
  if(helloBtn){ helloBtn.onclick=function(){ try{ nvStop(); nvAudio=new Audio('/media/voix-accueil.mp3'); nvAudio.play(); helloBtn.textContent='🔊 réécouter Bruno'; }catch(e){} }; }

  var NV_SAV='https://hhrlgyvtqluxpywjiwkd.supabase.co/functions/v1/assistant';
  // LE SAVOIR LOCAL (Bible condensée, 5 langues) : réponses instantanées sans réseau
  try{ var nvSav=document.createElement('script'); nvSav.src='/navlys-savoir.js'; nvSav.defer=true; (document.head||document.documentElement).appendChild(nvSav); }catch(e){}
  var nvSess=localStorage.getItem('nv_sav_session'); if(!nvSess){ nvSess='web-'+Math.abs(Math.floor((performance.now()*1000)%1e9)); localStorage.setItem('nv_sav_session',nvSess); }
  /* prénom connu (lecture tolérante) : le concierge salue la personne par son prénom */
  function nvPrenom(){ var ks=['nv-prenom','nvprenom','prenom','nv_user_prenom']; var i,v; for(i=0;i<ks.length;i++){ try{ v=localStorage.getItem(ks[i]); }catch(e){ v=null; } if(v&&v.trim()) return v.trim().slice(0,40); } return ''; }
  /* e-mail connu (lecture tolérante) : sert à reconnaître le fondateur → accès direct au cerveau central */
  function nvEmail(){ var ks=['nv-email','nvemail','email','nv_user_email']; var i,v; for(i=0;i<ks.length;i++){ try{ v=localStorage.getItem(ks[i]); }catch(e){ v=null; } if(v&&v.trim()&&v.indexOf('@')>-1) return v.trim().slice(0,160); } return ''; }
  function nvSetPrenom(v){ v=(v||'').trim().slice(0,40); if(v){ try{ localStorage.setItem('nv-prenom',v); }catch(e){} } }
  /* je salue par le prénom dès que je le connais (tutoiement, 1re personne) */
  try{ var _p=nvPrenom(); if(_p){ var _bd=document.getElementById('nv-bd'); if(_bd){ _bd.innerHTML='<div class="b n">Bonjour '+_p.replace(/[<>&]/g,'')+' 👋 Ravi de te revoir — dis-moi, je t\'écoute.<br><span class="lt" id="nv-hello">🔊 écouter Bruno</span></div>'; var _h=_bd.querySelector('#nv-hello'); if(_h) _h.onclick=function(){ try{ nvStop(); nvAudio=new Audio('/media/voix-accueil.mp3'); nvAudio.play(); _h.textContent='🔊 réécouter Bruno'; }catch(e){} }; } } }catch(e){}
  /* capture progressive : tout champ « prénom » de la page alimente le prénom connu */
  try{
    var ins=document.querySelectorAll('input');
    Array.prototype.forEach.call(ins,function(el){
      var tag=((el.name||'')+' '+(el.id||'')+' '+(el.getAttribute('placeholder')||'')).toLowerCase();
      if(tag.indexOf('prenom')>-1||tag.indexOf('prénom')>-1||tag.indexOf('first')>-1){
        if(el.value) nvSetPrenom(el.value);
        el.addEventListener('change',function(){ nvSetPrenom(el.value); });
        el.addEventListener('blur',function(){ nvSetPrenom(el.value); });
      }
    });
  }catch(e){}
  /* Message d'INDULGENCE au démarrage (Aide/SAV + 💡 Améliorer) — dans la langue de la personne */
  var NV_INDULG={
    fr:'🌱 Sois indulgent au démarrage : chaque application grandit à chaque seconde, grâce à toi et à ta participation. Ton retour fait tout avancer — surtout les langues et les traductions. Merci d\'être là.',
    en:'🌱 Please be kind at launch: every app grows every second, thanks to you and your participation. Your feedback moves everything forward — especially languages and translations. Thank you for being here.',
    ru:'🌱 Будь снисходителен на старте: каждое приложение растёт каждую секунду — благодаря тебе и твоему участию. Твой отклик двигает всё вперёд, особенно языки и переводы. Спасибо, что ты здесь.',
    he:'🌱 היה סלחני בהתחלה: כל אפליקציה גדלה בכל שנייה, בזכותך ובהשתתפותך. המשוב שלך מקדם הכול — במיוחד שפות ותרגומים. תודה שאתה כאן.',
    ar:'🌱 كن متسامحًا في البداية: كل تطبيق ينمو كل ثانية، بفضلك وبمشاركتك. ملاحظاتك تدفع كل شيء إلى الأمام — خاصةً اللغات والترجمات. شكرًا لوجودك.'
  };
  function nvUiLang(){ var l='fr'; try{ l=(window.NAVLYS_I18N&&window.NAVLYS_I18N.lang&&window.NAVLYS_I18N.lang())||localStorage.getItem('nv-lang')||navigator.language||'fr'; }catch(e){} l=String(l||'fr').slice(0,2); return NV_INDULG[l]?l:'fr'; }
  function nvIndulgTxt(){ return NV_INDULG[nvUiLang()]; }
  try{ var _bd2=document.getElementById('nv-bd'); if(_bd2){ var _di=document.createElement('div'); _di.className='b n nv-indulg'; _di.textContent=nvIndulgTxt(); _bd2.appendChild(_di); document.addEventListener('nv-lang',function(){ _di.textContent=nvIndulgTxt(); }); } }catch(e){}
  var NV_VOIX='https://hhrlgyvtqluxpywjiwkd.supabase.co/functions/v1/voix';
  var nvAudio=null, nvSpeakSeq=0;
  function nvClean(t){ return String(t).replace(/[*_#>`]|🌊|👋|😊|🚀/g,'').trim(); }
  /* ---------- KARAOKÉ (demande Bruno 2026-07-07) : UNE ligne fine, les mots
     apparaissent au rythme exact de la voix — fini le gros encadré de texte. */
  var karEl=null, karTimer=null;
  function nvKarEl(){
    if(karEl) return karEl;
    var s=document.createElement('style'); s.textContent=
      '#nv-karaoke{position:fixed;left:10px;right:10px;bottom:150px;z-index:63;pointer-events:none;'+
      'text-align:center;white-space:nowrap;overflow:hidden;font-family:\'Cormorant Garamond\',Georgia,serif;'+
      'font-size:clamp(1.05rem,3.4vw,1.45rem);font-weight:600;color:#fff;'+
      'text-shadow:0 0 10px rgba(125,211,252,.8),0 2px 6px rgba(0,0,0,.9);'+
      'opacity:0;transition:opacity .35s}'+
      '#nv-karaoke.on{opacity:1}'+
      '#nv-karaoke .done{color:'+OR+'}';
    document.head.appendChild(s);
    karEl=document.createElement('div'); karEl.id='nv-karaoke'; karEl.setAttribute('aria-live','off');
    document.body.appendChild(karEl); return karEl;
  }
  function nvKarStop(){ clearInterval(karTimer); karTimer=null; if(karEl){ karEl.classList.remove('on'); } }
  function nvKarWords(words, upto){ /* fenêtre glissante : on voit la fin de la phrase en cours */
    var el=nvKarEl(); var shown=words.slice(Math.max(0,upto-9), upto).join(' ');
    el.innerHTML='<span class="done">'+shown.replace(/[<>&]/g,'')+'</span>';
    el.classList.add('on');
  }
  function nvKarAudio(text, audio){ /* mots répartis sur la durée réelle du son */
    var words=nvClean(text).split(/\s+/).filter(Boolean); if(!words.length) return;
    nvKarStop();
    karTimer=setInterval(function(){
      try{
        if(!audio || audio.ended || audio.paused && audio.currentTime===0){ return; }
        var d=audio.duration; if(!d || !isFinite(d)) return;
        var k=Math.max(1, Math.min(words.length, Math.ceil(words.length*(audio.currentTime/d))));
        nvKarWords(words, k);
        if(audio.ended || audio.currentTime>=d-0.05){ nvKarStop(); setTimeout(function(){ if(karEl) karEl.classList.remove('on'); },1400); }
      }catch(e){}
    }, 120);
    audio.addEventListener('ended', function(){ nvKarStop(); setTimeout(function(){ if(karEl) karEl.classList.remove('on'); },1400); });
  }
  function nvKarUtter(text, u){ /* voix navigateur : synchro au MOT près (onboundary) */
    var t=nvClean(text); var words=t.split(/\s+/).filter(Boolean); if(!words.length) return;
    nvKarStop();
    u.onboundary=function(ev){ try{ var k=t.slice(0, ev.charIndex).split(/\s+/).filter(Boolean).length+1; nvKarWords(words, Math.min(k, words.length)); }catch(e){} };
    u.onend=function(){ setTimeout(function(){ if(karEl) karEl.classList.remove('on'); },1400); };
  }
  function nvStop(){ nvSpeakSeq++; nvKarStop(); if(karEl) karEl.classList.remove('on'); try{ if(nvAudio){ nvAudio.pause(); nvAudio=null; } }catch(e){} try{ if('speechSynthesis'in window) speechSynthesis.cancel(); }catch(e){} }
  // voix navigateur AMÉLIORÉE : meilleure voix DANS LA LANGUE DU SITE + débit doux
  function nvLangCode(){
    var l='fr';
    try{ l=(window.NAVLYS_I18N&&window.NAVLYS_I18N.lang&&window.NAVLYS_I18N.lang())||localStorage.getItem('nv-lang')||'fr'; }catch(e){}
    if(l==='en') return 'en-US';
    if(l==='ru') return 'ru-RU';
    if(l==='he') return 'he-IL';
    if(l==='ar') return 'ar-SA';
    return 'fr-FR';
  }
  function nvBrowserSpeak(text){
    if(!('speechSynthesis'in window))return;
    try{
      var code=nvLangCode(), base=code.slice(0,2);
      var u=new SpeechSynthesisUtterance(text); u.lang=code; u.rate=0.98; u.pitch=1.0;
      nvKarUtter(text, u); /* karaoké synchronisé au mot près */
      var vs=(speechSynthesis.getVoices&&speechSynthesis.getVoices())||[];
      var pref=['google','natural','neural','wavenet','amelie','amélie','thomas','virginie','audrey'];
      var pick=null,i,j;
      for(i=0;i<vs.length&&!pick;i++){ var n=((vs[i].name||'')+' '+(vs[i].lang||'')).toLowerCase(); if(n.indexOf(base)>-1){ for(j=0;j<pref.length;j++){ if(n.indexOf(pref[j])>-1){ pick=vs[i]; break; } } } }
      if(!pick){ for(i=0;i<vs.length;i++){ if((vs[i].lang||'').toLowerCase().indexOf(base)===0){ pick=vs[i]; break; } } }
      if(pick) u.voice=pick;
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    }catch(e){}
  }
  // NAVLYS parle : 1) voix ElevenLabs émotionnelle (brique /voix) ; 2) sinon navigateur
  function nvSpeak(text){
    var t=nvClean(text); if(!t) return; nvStop(); var seq=++nvSpeakSeq; // une seule voix à la fois
    var ko=false; try{ ko=sessionStorage.getItem('nv_voix_ko')==='1'; }catch(e){}
    if(ko){ nvBrowserSpeak(t); return; } /* clé voix morte constatée : repli immédiat, zéro aller-retour */
    try{
      fetch(NV_VOIX,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:t})})
        .then(function(r){ return r.json(); })
        .then(function(d){
          if(seq!==nvSpeakSeq) return; // un nouveau nvSpeak a démarré entre-temps → on abandonne (plus de "plusieurs Bruno")
          if(d&&d.ok&&d.audio){ nvStop(); nvAudio=new Audio(d.audio); var p=nvAudio.play(); if(p&&p['catch']) p['catch'](function(){ if(seq===nvSpeakSeq) nvBrowserSpeak(t); }); }
          else if(seq===nvSpeakSeq){ try{ sessionStorage.setItem('nv_voix_ko','1'); }catch(e){} nvBrowserSpeak(t); }
        })
        .catch(function(){ if(seq===nvSpeakSeq) nvBrowserSpeak(t); });
    }catch(e){ nvBrowserSpeak(t); }
  }
  function listen(text, el){ nvSpeak(text); el.textContent='🔊 réécouter'; }
  function add(cls, txt, withVoice){
    var bd=document.getElementById('nv-bd');
    var d=document.createElement('div'); d.className='b '+cls; d.appendChild(document.createTextNode(txt));
    if(withVoice){ var lt=document.createElement('span'); lt.className='lt'; lt.textContent='🔊 écouter'; lt.onclick=function(){listen(txt,lt);}; d.appendChild(document.createElement('br')); d.appendChild(lt); }
    bd.appendChild(d); bd.scrollTop=bd.scrollHeight; return d;
  }
  /* ---------- COMMANDE DE LANGUE à la voix ou au texte (gravé 2026-07-05) ----
     « réponds-moi en hébreu » / "speak English" / «говори по-русски» /
     «דבר איתי בעברית» / «تكلم بالعربية» → tout le site bascule + confirmation
     dans la langue cible. Comprise dans les 5 langues. */
  var NV_LANG_NOMS={
    fr:['francais','french','франц','צרפתית','الفرنسية','fr'],
    en:['anglais','english','англ','אנגלית','الإنجليزية','الانجليزية','en'],
    ru:['russe','russian','русск','по-русски','רוסית','الروسية','ru'],
    he:['hebreu','hebrew','иврит','на иврите','עברית','بالعبرية','العبرية'],
    ar:['arabe','arabic','арабск','по-арабски','ערבית','العربية','بالعربية']
  };
  var NV_LANG_VERBES=['parle','reponds','répond','passe','mets','bascule','speak','answer','talk','switch','reply','говори','отвечай','ответь','перейди','דבר','תדבר','תענה','ענה','עבור','تكلم','تحدث','أجب','اجب','حول'];
  var NV_LANG_OK={
    fr:'Avec plaisir ! On continue en français. 🌊',
    en:'With pleasure! We continue in English. 🌊',
    ru:'С удовольствием! Продолжаем по-русски. 🌊',
    he:'בשמחה! ממשיכים בעברית. 🌊',
    ar:'بكل سرور! نكمل بالعربية. 🌊'
  };
  function nvNorm(s){ s=String(s||'').toLowerCase(); try{ s=s.normalize('NFD').replace(/[̀-ͯ]/g,''); }catch(e){} return s.replace(/[’']/g,' ').replace(/\s+/g,' ').trim(); }
  function nvCmdLangue(texte){
    var t=nvNorm(texte); if(!t) return null;
    var verbe=false, i;
    for(i=0;i<NV_LANG_VERBES.length;i++){ if(t.indexOf(NV_LANG_VERBES[i])>-1){ verbe=true; break; } }
    var cible=null, len=0, l, j;
    for(l in NV_LANG_NOMS){ for(j=0;j<NV_LANG_NOMS[l].length;j++){ var n=nvNorm(NV_LANG_NOMS[l][j]); if(n.length>2&&n.length>len&&t.indexOf(n)>-1){ cible=l; len=n.length; } } }
    /* commande = un nom de langue + (un verbe de commande OU une phrase courte) */
    if(cible && (verbe || t.length<=32)) return cible;
    return null;
  }
  function send(){
    var q=document.getElementById('nv-q'); var t=q.value.trim(); if(!t) return;
    add('u',t,false); q.value='';
    // 0-bis) RÉGLAGE DU MOT D'ÉVEIL au clavier (si NAVLYS l'attend)
    try{ if(window.NAVLYS_WAKE&&window.NAVLYS_WAKE.attend()){ window.NAVLYS_WAKE.defini(t); return; } }catch(e){}
    var nvLng='fr'; try{ nvLng=(window.NAVLYS_I18N&&window.NAVLYS_I18N.lang&&window.NAVLYS_I18N.lang())||localStorage.getItem('nv-lang')||navigator.language||'fr'; }catch(e){}
    // 0) COMMANDE DE LANGUE : « réponds-moi en hébreu », "speak Russian"…
    var cible=nvCmdLangue(t);
    if(cible){
      try{ if(window.NAVLYS_I18N) window.NAVLYS_I18N.set(cible); }catch(e){}
      var okMsg=NV_LANG_OK[cible]||NV_LANG_OK.fr;
      add('n',okMsg,true); nvSpeak(okMsg);
      try{ fetch(NV_SAV,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session:nvSess,text:t,nom:nvPrenom(),email:nvEmail(),lang:cible,journal_seul:true,reponse_locale:okMsg})}).catch(function(){}); }catch(e){}
      return;
    }
    // 1) LE SAVOIR LOCAL d'abord : réponse INSTANTANÉE si la Bible connaît la question
    var loc=null; try{ loc=window.NAVLYS_SAVOIR_CHERCHE?window.NAVLYS_SAVOIR_CHERCHE(t,nvLng):null; }catch(e){}
    if(loc){
      add('n',loc,true); nvSpeak(loc);
      try{ fetch(NV_SAV,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session:nvSess,text:t,nom:nvPrenom(),email:nvEmail(),lang:nvLng,journal_seul:true,reponse_locale:loc})}).catch(function(){}); }catch(e){}
      return;
    }
    // 2) sinon : le cerveau NAVLYS
    var p=add('n','… un instant',false);
    fetch(NV_SAV,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session:nvSess,text:t,nom:nvPrenom(),email:nvEmail(),lang:nvLng})})
     .then(function(r){ return r.json(); })
     .then(function(d){ p.remove(); var rep=(d&&d.reply)?d.reply:'Je note ta demande, l\'équipe NAVLYS revient vers toi très vite. 🌊'; add('n',rep,true); nvSpeak(rep); })
     .catch(function(){ p.remove(); add('n','Connexion difficile, réessaie dans un instant. 🌊',false); });
  }
  panel.querySelector('#nv-snd').onclick=send;
  panel.querySelector('#nv-q').addEventListener('keydown',function(e){ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); send(); } });

  /* ---------- MAINS LIBRES : écoute continue + MOT D'ÉVEIL personnel ----------
     (gravé 2026-07-05, demande de Bruno) La personne parle SANS toucher à rien.
     Elle choisit SON mot secret : le dire réveille NAVLYS, « stop / dors » l'endort.
     Une seule contrainte navigateur : le tout 1er accès micro exige un geste
     (le bouton 🎙️). Ensuite tout est à la voix. Écoute redémarrée en boucle. */
  (function(){
    var micBtn=panel.querySelector('#nv-mic'); if(!micBtn) return;
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){ micBtn.title='Dictée : utilise le micro de ton clavier 🎙️'; return; } /* iOS Safari */

    var LS={ on:'nv-mains-libres', mot:'nv-mot-eveil' };
    function getMot(){ try{ return (localStorage.getItem(LS.mot)||'').trim(); }catch(e){ return ''; } }
    function setMot(m){ try{ localStorage.setItem(LS.mot, m); }catch(e){} }
    function estOn(){ try{ return localStorage.getItem(LS.on)==='oui'; }catch(e){ return false; } }
    function setOn(v){ try{ localStorage.setItem(LS.on, v?'oui':'non'); }catch(e){} }

    var MOTS_STOP=['stop','dors','tais toi','au revoir','stop navlys','sleep','stop listening','стоп','спи','замолчи','пока','עצור','לך לישון','די','توقف','نم','قف','مع السلامة'];
    var DORT_MSG={fr:'😴 Je dors. Dis ton mot pour me réveiller.',en:'😴 I\'m asleep. Say your word to wake me.',ru:'😴 Я сплю. Скажи своё слово, чтобы разбудить.',he:'😴 אני ישן. תגיד את המילה שלך כדי להעיר אותי.',ar:'😴 أنا نائم. قل كلمتك لإيقاظي.'};
    var EVEIL_MSG={fr:'👂 Je t\'écoute, vas-y.',en:'👂 I\'m listening, go ahead.',ru:'👂 Я слушаю, говори.',he:'👂 אני מקשיב, דבר.',ar:'👂 أنا أستمع، تفضّل.'};
    var DEMANDE_MOT={fr:'Choisis TON mot secret pour me réveiller (ex. « Capitaine », « NAVLYS », ton prénom…). Dis-le ou écris-le.',en:'Choose YOUR secret word to wake me (e.g. "Captain", "NAVLYS", your name…). Say it or type it.',ru:'Выбери СВОЁ секретное слово, чтобы будить меня (напр. «Капитан», «NAVLYS», твоё имя…). Скажи или напиши.',he:'בחר את מילת הסוד שלך כדי להעיר אותי (למשל «קפטן», «NAVLYS», השם שלך…). אמור או כתוב אותה.',ar:'اختر كلمتك السرية لإيقاظي (مثل «كابتن»، «NAVLYS»، اسمك…). قلها أو اكتبها.'};
    var MOT_OK={fr:'Parfait ! Dis « %s » quand tu veux me parler. 🌊',en:'Perfect! Say "%s" whenever you want to talk to me. 🌊',ru:'Отлично! Скажи «%s», когда захочешь поговорить. 🌊',he:'מעולה! תגיד «%s» מתי שתרצה לדבר איתי. 🌊',ar:'ممتاز! قل «%s» متى أردت أن تكلمني. 🌊'};
    function L(){ var l='fr'; try{ l=(window.NAVLYS_I18N&&window.NAVLYS_I18N.lang&&window.NAVLYS_I18N.lang())||localStorage.getItem('nv-lang')||'fr'; }catch(e){} return (['en','ru','he','ar'].indexOf(l)>-1)?l:'fr'; }

    var rec=null, running=false, eveille=false, attendMot=false, veutTourner=false, lastHeard=Date.now();
    function poser(cls,txt){ add(cls,txt,cls==='n'); if(cls==='n') nvSpeak(txt); }

    function demarrer(){
      if(running) return;
      try{
        rec=new SR(); rec.lang=nvLangCode(); rec.continuous=true; rec.interimResults=true; rec.maxAlternatives=1;
        rec.onstart=function(){ running=true; micBtn.classList.add('on'); dictBase=(q&&q.value)?(q.value.replace(/\s+$/,'')+' '):''; };
        rec.onresult=onResult;
        rec.onerror=function(ev){ if(ev&&ev.error==='not-allowed'){ veutTourner=false; setOn(false); micBtn.classList.remove('on'); poser('n', L()==='fr'?'Je n\'ai pas accès au micro — autorise-le puis retouche 🎙️.':'I can\'t reach the mic — allow it, then tap 🎙️ again.'); } };
        /* FIX bip (2026-07-07) : chaque redémarrage du micro joue le bip système
           Android → on ne relance QUE si la personne est en conversation active
           (éveillée, page visible, activité < 2 min). Sinon : micro COUPÉ net. */
        rec.onend=function(){ running=false;
          /* On relance UNIQUEMENT si l'utilisateur veut toujours (bouton ON) et page
             visible. Sinon micro coupé net → plus jamais de relance surprise (bips). */
          if(veutTourner && document.visibilityState==='visible'){ setTimeout(function(){ try{ demarrer(); }catch(e){} }, 300); }
          else { micBtn.classList.remove('on'); }
        };
        rec.start();
      }catch(e){ running=false; }
    }
    function stopper(){ veutTourner=false; try{ if(rec) rec.stop(); }catch(e){} micBtn.classList.remove('on'); }

    var q=document.getElementById('nv-q'), dictBase='';
    /* DICTÉE SIMPLE (2026-07-08, demande Bruno) : le micro écrit dans la case,
       PAS d'envoi automatique, PAS de mot d'éveil. On relit, on corrige, on touche →. */
    function onResult(ev){
      lastHeard=Date.now();
      var txt=''; for(var i=0;i<ev.results.length;i++){ txt+=ev.results[i][0].transcript; }
      if(q) q.value = dictBase + txt;
    }

    var MIC_ON={fr:'🎙️ Je t\'écoute — parle, ça s\'écrit tout seul. Touche → pour envoyer, ou re-touche le micro pour couper.',en:'🎙️ Listening — speak, it types itself. Tap → to send, or tap the mic again to stop.',ru:'🎙️ Слушаю — говори, всё печатается само. Нажми → чтобы отправить, или снова микрофон, чтобы выключить.',he:'🎙️ מקשיב — דבר, זה נכתב לבד. הקש → לשליחה, או שוב על המיקרופון כדי לעצור.',ar:'🎙️ أستمع — تكلّم، يُكتب تلقائيًا. المس → للإرسال، أو المس الميكروفون للإيقاف.'};
    var MIC_OFF={fr:'🎙️ Micro coupé.',en:'🎙️ Mic off.',ru:'🎙️ Микрофон выключен.',he:'🎙️ מיקרופון כבוי.',ar:'🎙️ الميكروفون متوقف.'};
    /* Un simple interrupteur : appui = j'écoute, appui = stop. Rien d'autre. */
    micBtn.onclick=function(){
      if(veutTourner){ veutTourner=false; setOn(false); stopper(); poser('n', MIC_OFF[L()]||MIC_OFF.fr); return; }
      setOn(true); veutTourner=true; lastHeard=Date.now();
      poser('n', MIC_ON[L()]||MIC_ON.fr);
      demarrer();
    };
    /* plus JAMAIS de relance auto du micro au chargement (source des bips) —
       le micro n'existe que sur le geste 🎙️. */

    /* réglage du mot d'éveil aussi possible au CLAVIER, via send() : si on attend
       le mot et que la personne l'écrit, on l'enregistre (capté dans send). */
    window.NAVLYS_WAKE={ attend:function(){ return attendMot; }, defini:function(m){ var mm=nvNorm(m).split(' ').slice(0,3).join(' '); setMot(mm); attendMot=false; eveille=false; poser('n', MOT_OK[L()].replace('%s', mm)); } };

    /* ---- PLUS d'ouverture automatique de l'Aide (demande Bruno 2026-07-08) :
       on ne montre plus l'encadré tout seul. Seule la LIGNE KARAOKÉ suit la voix.
       L'Aide reste disponible à la demande via le bouton « Aide » (bas-droite). ---- */
  })();

  /* ---------- RETOUR : ouvert depuis « 💡 Améliorer » DANS le panneau Aide
     (un seul bouton flottant à l'écran, demande Bruno 2026-07-08).
     Critiques / remarques / suggestions, pour soi ou pour la communauté.
     Part directement chez nous : core_feedback + journal + routage agent. */
  var NV_FB='https://hhrlgyvtqluxpywjiwkd.supabase.co/functions/v1/retour';
  var fbApp=(location.pathname==='/'||location.pathname==='')?'Accueil':location.pathname.replace(/^\//,'').replace(/\.html$/,'');
  var fb=document.createElement('div'); fb.id='nv-fb';
  fb.innerHTML='<div class="hd" style="position:relative">💡 Ton avis compte<span id="nv-fb-x" style="position:absolute;top:10px;right:12px;cursor:pointer;width:26px;height:26px;display:grid;place-items:center;border-radius:50%;background:rgba(125,211,252,.12);color:#a8e3ff;font-size:.85rem">✕</span><small><span>Application</span> : '+fbApp+' — <span>dis-nous tout, on lit, on applique, on répond.</span></small></div>'+
    '<div class="bd">'+
      '<div class="nvfb-indulg" style="font-size:.82rem;color:#bfe0f5;padding:0 2px 8px;line-height:1.5;border-bottom:1px solid rgba(125,211,252,.14);margin-bottom:8px"></div>'+
      '<div class="row" id="nv-fb-t">'+
        '<div class="opt" data-v="critique">🐞 Critique</div>'+
        '<div class="opt" data-v="remarque">💬 Remarque</div>'+
        '<div class="opt on" data-v="suggestion">💡 Suggestion</div>'+
      '</div>'+
      '<div class="row" id="nv-fb-p">'+
        '<div class="opt on" data-v="perso">Pour mon usage</div>'+
        '<div class="opt" data-v="communaute">Pour la communauté</div>'+
      '</div>'+
      '<textarea id="nv-fb-msg" placeholder="Ce que tu changerais, ce qui te manque, ce que tu adores…"></textarea>'+
      '<button class="go" id="nv-fb-go">Envoyer mon retour</button>'+
      '<div class="ok" id="nv-fb-ok"></div>'+
    '</div>';
  document.body.appendChild(fb);
  try{ var _fbi=fb.querySelector('.nvfb-indulg'); if(_fbi){ _fbi.textContent=nvIndulgTxt(); document.addEventListener('nv-lang',function(){ _fbi.textContent=nvIndulgTxt(); }); } }catch(e){}
  var fbOpen=document.getElementById('nv-fb-open');
  if(fbOpen){ fbOpen.onclick=function(){ panel.style.display='none'; fb.style.display='flex'; var m=document.getElementById('nv-fb-msg'); if(m) m.focus(); }; }
  var fbX=document.getElementById('nv-fb-x');
  if(fbX){ fbX.onclick=function(){ fb.style.display='none'; }; }
  function fbPick(rowId){
    var row=document.getElementById(rowId);
    Array.prototype.forEach.call(row.querySelectorAll('.opt'),function(o){
      o.onclick=function(){ Array.prototype.forEach.call(row.querySelectorAll('.opt'),function(x){ x.classList.remove('on'); }); o.classList.add('on'); };
    });
  }
  fbPick('nv-fb-t'); fbPick('nv-fb-p');
  function fbVal(rowId){ var on=document.getElementById(rowId).querySelector('.opt.on'); return on?on.getAttribute('data-v'):''; }
  document.getElementById('nv-fb-go').onclick=function(){
    var msgEl=document.getElementById('nv-fb-msg'), okEl=document.getElementById('nv-fb-ok');
    var msg=(msgEl.value||'').trim(); if(!msg){ msgEl.focus(); return; }
    var lng='fr'; try{ lng=(window.NAVLYS_I18N&&window.NAVLYS_I18N.lang&&window.NAVLYS_I18N.lang())||localStorage.getItem('nv-lang')||navigator.language||'fr'; }catch(e){}
    okEl.style.display='block'; okEl.textContent='… envoi en cours';
    fetch(NV_FB,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
      page:location.pathname||'/', type:fbVal('nv-fb-t'), portee:fbVal('nv-fb-p'),
      message:msg, prenom:nvPrenom(), email:nvEmail(), lang:lng, session:nvSess })})
     .then(function(r){ return r.json(); })
     .then(function(d){ okEl.textContent=(d&&d.merci)?d.merci:'Merci, c\'est bien arrivé 🙏'; msgEl.value='';
       setTimeout(function(){ fb.style.display='none'; okEl.style.display='none'; },3200); })
     .catch(function(){ okEl.textContent='Connexion difficile — réessaie dans un instant 🌊'; });
  };
})();

/* ====================================================================
   NAVLYS — BANDEAU UNIVERSEL (onglets type navigateur + Réglages/Compte/
   Paiement + Partage 1 clic). v1 · 2026-06-15 · injecté sur CHAQUE page.
   ==================================================================== */
(function(){
  var ICE='#7DD3FC', OR='#e9d3a0', NOIR='#05060a';
  // Menu HAUT = onglets icône + petit nom (façon barre du bas). En TÊTE : « Cadeaux »
  // (→ /ambassadeur) pour mettre en avant l'affiliation = gagner de l'argent + cadeaux
  // à ceux qui communiquent et le prouvent (demande Bruno 2026-07-08). On ne répète
  // jamais une destination déjà dans la barre du bas (le logo = Accueil).
  var pages=[
    {n:'Cadeaux',h:'/ambassadeur',i:'🎁',gift:true},
    {n:'Adhésion',h:'/adhesion',i:'✦'},
    {n:'Ton idée',h:'/idee',i:'💡'},
    {n:'NAVLEX',h:'/navlex',i:'⚖'},
    {n:'Influenceurs',h:'/influenceurs',i:'★'},
    {n:'Tech',h:'/tech',i:'◈'},
    {n:'Radio',h:'/radio',i:'♪'}
  ];
  var path=(location.pathname||'/').replace(/index\.html$/,'').replace(/\.html$/,'').replace(/\/+$/,'')||'/';

  var css=`
  :root{--nv-top-h:52px}
  body{padding-top:var(--nv-top-h)!important}
  #nv-top{position:fixed;top:0;left:0;right:0;z-index:120;height:var(--nv-top-h);display:flex;align-items:center;gap:10px;
    padding:0 12px;background:linear-gradient(180deg,rgba(7,9,16,.92),rgba(7,9,16,.74));
    backdrop-filter:blur(11px);-webkit-backdrop-filter:blur(11px);border-bottom:1px solid rgba(125,211,252,.22)}
  #nv-top:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;
    background:linear-gradient(90deg,transparent,${ICE},${OR},transparent);background-size:240% 100%;
    animation:nvline 7s linear infinite;opacity:.7}
  @keyframes nvline{0%{background-position:220% 0}100%{background-position:-40% 0}}
  .nv-brand{flex:0 0 auto;display:flex;align-items:center;gap:7px;text-decoration:none;font-family:'Cormorant Garamond','Lora',serif;
    font-size:1.18rem;letter-spacing:2px;color:#fff;padding:0 4px}
  .nv-brand .gem{width:13px;height:13px;border-radius:3px;transform:rotate(45deg);
    background:conic-gradient(${ICE},${OR},${ICE},${OR},${ICE});box-shadow:0 0 12px ${ICE};animation:nvbreath 3.4s ease-in-out infinite}
  @keyframes nvbreath{0%,100%{transform:rotate(45deg) scale(.86);filter:brightness(.9)}50%{transform:rotate(45deg) scale(1.12);filter:brightness(1.3)}}
  .nv-brand b{background:linear-gradient(90deg,#fff,${ICE},${OR},#fff);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;
    -webkit-text-fill-color:transparent;animation:nvsh 8s linear infinite;font-weight:600}
  @keyframes nvsh{0%{background-position:0 0}100%{background-position:220% 0}}
  .nv-tabs{flex:1 1 auto;display:flex;align-items:center;gap:4px;overflow-x:auto;scrollbar-width:none;mask-image:linear-gradient(90deg,transparent,#000 18px,#000 calc(100% - 18px),transparent)}
  .nv-tabs::-webkit-scrollbar{display:none}
  .nv-tab{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;
    text-decoration:none;color:#9fb3c8;padding:4px 10px 3px;border-radius:11px 11px 0 0;
    border:1px solid transparent;transition:.25s;white-space:nowrap}
  .nv-tab .i{font-size:15px;line-height:1}
  .nv-tab .l{font-family:'Cinzel','Cormorant Garamond',serif;font-size:8px;letter-spacing:.1em;text-transform:uppercase;line-height:1}
  .nv-tab:hover{color:#fff;background:rgba(125,211,252,.10)}
  .nv-tab.active{color:#fff;background:linear-gradient(180deg,rgba(125,211,252,.20),rgba(125,211,252,.04));
    border-color:rgba(125,211,252,.35);box-shadow:0 6px 18px rgba(125,211,252,.12)}
  .nv-tab.active .i{filter:drop-shadow(0 0 6px rgba(125,211,252,.5))}
  .nv-tab.gift{color:${OR}}
  .nv-tab.gift .l{color:${OR}}
  .nv-tab.gift .i{filter:drop-shadow(0 0 7px rgba(233,211,160,.6))}
  .nv-tab.gift{background:linear-gradient(180deg,rgba(233,211,160,.16),transparent);border-color:rgba(233,211,160,.35)}
  .nv-actions{flex:0 0 auto;display:flex;align-items:center;gap:6px}
  .nv-btn{cursor:pointer;border:1px solid rgba(125,211,252,.28);background:rgba(125,211,252,.07);color:#eaf2ff;
    font-family:'Lora',serif;font-size:.86rem;border-radius:11px;padding:7px 11px;display:flex;align-items:center;gap:6px;transition:.2s}
  .nv-btn:hover{background:rgba(125,211,252,.16);border-color:rgba(125,211,252,.5)}
  .nv-btn.share{background:linear-gradient(100deg,${OR},#fff6df,${ICE});color:${NOIR};border:none;font-weight:600;background-size:200% 100%;animation:nvsw 7s linear infinite}
  .nv-menu{position:fixed;top:calc(var(--nv-top-h) + 6px);z-index:121;min-width:230px;display:none;flex-direction:column;gap:2px;padding:8px;
    background:linear-gradient(160deg,rgba(12,16,26,.98),rgba(7,9,16,.98));border:1px solid rgba(125,211,252,.3);border-radius:14px;
    box-shadow:0 18px 50px rgba(0,0,0,.6)}
  .nv-menu.open{display:flex}
  .nv-menu a,.nv-menu button{all:unset;cursor:pointer;display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;
    color:#dfe8f5;font-family:'Lora',serif;font-size:.92rem}
  .nv-menu a:hover,.nv-menu button:hover{background:rgba(125,211,252,.12);color:#fff}
  .nv-menu .sep{height:1px;background:rgba(125,211,252,.16);margin:5px 2px}
  .nv-menu .lbl{font-size:.72rem;letter-spacing:1.5px;color:#8aa3bf;padding:6px 12px 2px;text-transform:uppercase}
  .nv-langs{display:flex;flex-wrap:wrap;gap:6px;padding:4px 8px 8px;max-height:44vh;overflow:auto}
  .nv-lang{flex:1 1 26%;min-width:58px;text-align:center;cursor:pointer;border:1px solid rgba(125,211,252,.25);border-radius:9px;padding:7px 4px;color:#cfe0f2;font-family:'Lora',serif;font-size:.82rem;white-space:nowrap}
  .nv-lang.on{background:rgba(125,211,252,.18);color:#fff;border-color:rgba(125,211,252,.5)}
  .nv-lang.soon{opacity:.6}
  #nv-toast{position:fixed;left:50%;top:calc(var(--nv-top-h) + 14px);transform:translateX(-50%) translateY(-8px);z-index:130;
    background:linear-gradient(150deg,rgba(125,211,252,.18),rgba(10,12,20,.96));border:1px solid rgba(125,211,252,.4);
    color:#eef6ff;font-family:'Lora',serif;font-size:.9rem;padding:10px 16px;border-radius:12px;opacity:0;pointer-events:none;transition:.3s;box-shadow:0 10px 30px rgba(0,0,0,.5)}
  #nv-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
  @media(max-width:640px){.nv-btn span.t{display:none}.nv-brand{font-size:1.02rem;letter-spacing:1px}}
  `;
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  // ---- barre ----
  var bar=document.createElement('div'); bar.id='nv-top';
  var tabs=pages.map(function(p){
    var act=(p.h==='/'? path==='/' : path===p.h || path.indexOf(p.h)===0);
    return '<a class="nv-tab'+(act?' active':'')+(p.gift?' gift':'')+'" href="'+p.h+'">'+
      '<span class="i">'+(p.i||'•')+'</span><span class="l">'+p.n+'</span></a>';
  }).join('');
  bar.innerHTML=
    '<a class="nv-brand" href="/" aria-label="NAVLYS — accueil"><img src="/media/icon-96.svg" alt="NAVLYS" style="height:34px;width:34px;display:block"></a>'+
    '<div class="nv-tabs">'+tabs+'</div>'+
    '<div class="nv-actions">'+
      '<button class="nv-btn share" id="nv-shareB">📤<span class="t">&nbsp;Partager</span></button>'+
      '<button class="nv-btn" id="nv-gearB">⚙️<span class="t">&nbsp;Menu</span></button>'+
    '</div>';
  document.body.appendChild(bar);

  function mkMenu(id,html,anchorRight){
    var m=document.createElement('div'); m.className='nv-menu'; m.id=id; m.innerHTML=html;
    document.body.appendChild(m);
    if(anchorRight){ m.style.right='12px'; } else { m.style.right='12px'; }
    return m;
  }
  function toast(t){ var e=document.getElementById('nv-toast'); e.textContent=t; e.classList.add('show'); clearTimeout(e._t); e._t=setTimeout(function(){e.classList.remove('show');},2600); }
  var toastEl=document.createElement('div'); toastEl.id='nv-toast'; document.body.appendChild(toastEl);

  // ---- menu PARTAGE (1 clic, toutes les formes) ----
  var url=location.origin+(path==='/'?'/':path);
  var msg='Rejoins-moi sur NAVLYS — la première IA qui orchestre les autres IA depuis ton téléphone, sans bureau ni ordinateur. Entre gratuitement (0 €) et gagne immédiatement une commission à vie sur les futurs abonnés NAVLYS que tu enrôleras dans l\'univers NAVLYS 🌊';
  var E=encodeURIComponent;
  var shareHTML=
    '<div class="lbl">Partager NAVLYS · 1 clic</div>'+
    '<button id="nv-native">✨ <span>Partage rapide (toutes formes)</span></button>'+
    '<a href="https://wa.me/?text='+E(msg+' '+url)+'" target="_blank" rel="noopener">🟢 <span>WhatsApp</span></a>'+
    '<a href="sms:?&body='+E(msg+' '+url)+'">💬 <span>SMS / Message</span></a>'+
    '<a href="https://www.facebook.com/sharer/sharer.php?u='+E(url)+'" target="_blank" rel="noopener">🔵 <span>Facebook</span></a>'+
    '<a href="https://twitter.com/intent/tweet?text='+E(msg)+'&url='+E(url)+'" target="_blank" rel="noopener">✖️ <span>X (Twitter)</span></a>'+
    '<a href="https://t.me/share/url?url='+E(url)+'&text='+E(msg)+'" target="_blank" rel="noopener">✈️ <span>Telegram</span></a>'+
    '<a href="https://www.reddit.com/submit?url='+E(url)+'&title='+E(msg)+'" target="_blank" rel="noopener">👽 <span>Reddit</span></a>'+
    '<button id="nv-youtube">▶️ <span>YouTube (copie + ouvre)</span></button>'+
    '<button id="nv-insta">📸 <span>Instagram (copie + ouvre)</span></button>'+
    '<a href="mailto:?subject='+E('NAVLYS')+'&body='+E(msg+'\n'+url)+'">✉️ <span>E-mail</span></a>'+
    '<div class="sep"></div>'+
    '<button id="nv-copy">🔗 <span>Copier le lien</span></button>';
  var shareM=mkMenu('nv-shareM',shareHTML,true);

  // ---- menu RÉGLAGES / COMPTE / PAIEMENT / LANGUE ----
  var curLang='fr'; try{ curLang=(window.localStorage&&localStorage.getItem('nv-lang'))||'fr'; }catch(e){}
  // Registre des langues : source unique = navlys-i18n.js (window.NAVLYS_I18N).
  // Repli local si l'i18n n'est pas encore prêt (scripts defer, ordre non garanti).
  var LANGCHIPS=(function(){
    try{
      if(window.NAVLYS_I18N&&window.NAVLYS_I18N.langs){
        return window.NAVLYS_I18N.langs().map(function(c){
          var m=(window.NAVLYS_I18N.meta&&window.NAVLYS_I18N.meta(c))||{};
          return {c:c,n:m.native||c};
        });
      }
    }catch(e){}
    return [{c:'fr',n:'Français'},{c:'en',n:'English'},{c:'ru',n:'Русский'},
      {c:'es',n:'Español'},{c:'pt',n:'Português'},{c:'it',n:'Italiano'},
      {c:'de',n:'Deutsch'},{c:'nl',n:'Nederlands'},{c:'wa',n:'Walon'},
      {c:'zh',n:'中文'},{c:'hi',n:'हिन्दी'},{c:'bn',n:'বাংলা'},
      {c:'he',n:'עברית'},{c:'ar',n:'العربية'},{c:'ur',n:'اردو'}];
  })();
  if(!LANGCHIPS.some(function(x){return x.c===curLang;})) curLang='fr';
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  var langChipsHTML=LANGCHIPS.map(function(x){
    return '<div class="nv-lang'+(curLang===x.c?' on':'')+'" data-l="'+esc(x.c)+'" data-n="'+esc(x.n)+'">'+esc(x.n)+'</div>';
  }).join('');
  var gearHTML=
    '<div class="lbl">Mon espace</div>'+
    '<button id="nv-account">👤 <span>Identité &amp; Compte</span></button>'+
    '<button id="nv-pay">💳 <span>Abonnement &amp; Paiement</span></button>'+
    '<button id="nv-settings">🎛️ <span>Réglages</span></button>'+
    '<div class="sep"></div>'+
    '<div class="lbl">Langue</div>'+
    '<div class="nv-langs">'+langChipsHTML+'</div>'+
    '<div class="sep"></div>'+
    '<button id="nv-help">💬 <span>Aide &amp; SAV</span></button>';
  var gearM=mkMenu('nv-gearM',gearHTML,true);

  function closeAll(except){ [shareM,gearM].forEach(function(m){ if(m!==except) m.classList.remove('open'); }); }
  document.getElementById('nv-shareB').onclick=function(e){ e.stopPropagation(); var o=shareM.classList.contains('open'); closeAll(); if(!o) shareM.classList.add('open'); };
  document.getElementById('nv-gearB').onclick=function(e){ e.stopPropagation(); var o=gearM.classList.contains('open'); closeAll(); if(!o) gearM.classList.add('open'); };
  document.addEventListener('click',function(){ closeAll(); });
  [shareM,gearM].forEach(function(m){ m.addEventListener('click',function(e){ e.stopPropagation(); }); });

  // actions partage
  shareM.querySelector('#nv-native').onclick=function(){
    if(navigator.share){ navigator.share({title:'NAVLYS',text:msg,url:url}).catch(function(){}); }
    else { navigator.clipboard&&navigator.clipboard.writeText(url); toast('Lien copié — colle-le où tu veux 🌊'); }
  };
  shareM.querySelector('#nv-copy').onclick=function(){ (navigator.clipboard?navigator.clipboard.writeText(url):0); toast('Lien copié ✓'); };
  shareM.querySelector('#nv-insta').onclick=function(){ (navigator.clipboard?navigator.clipboard.writeText(url):0); toast('Lien copié — colle-le dans ta story Instagram 📸'); setTimeout(function(){window.open('https://instagram.com','_blank');},400); };
  var ytB=shareM.querySelector('#nv-youtube'); if(ytB) ytB.onclick=function(){ (navigator.clipboard?navigator.clipboard.writeText(url):0); toast('Lien copié — colle-le dans ta description / Short YouTube ▶️'); setTimeout(function(){window.open('https://www.youtube.com','_blank');},400); };

  // actions menu
  gearM.querySelector('#nv-account').onclick=function(){ closeAll(); location.href='/profil'; };
  gearM.querySelector('#nv-pay').onclick=function(){ closeAll(); location.href='/adhesion'; };
  gearM.querySelector('#nv-settings').onclick=function(){ toast('Réglages personnels — en chemin 🎛️'); };
  gearM.querySelector('#nv-help').onclick=function(){ closeAll(); var b=document.getElementById('nv-sav-btn'); if(b) b.click(); };
  Array.prototype.forEach.call(gearM.querySelectorAll('.nv-lang'),function(el){
    el.onclick=function(){
      var l=el.getAttribute('data-l');
      // bascule i18n réelle (toutes les langues du registre sont actives ;
      // couverture partielle = repli FR automatique, jamais de trou visible)
      if(window.NAVLYS_I18N){ window.NAVLYS_I18N.set(l); }
      // marque l'onglet actif
      Array.prototype.forEach.call(gearM.querySelectorAll('.nv-lang'),function(x){
        if(x===el) x.classList.add('on'); else x.classList.remove('on');
      });
      toast((el.getAttribute('data-n')||l)+' ✓ 🌍');
    };
  });
})();

/* ====================================================================
   NAVLYS — ACCESSIBILITÉ + FOND VIVANT ÉCLAIRÉ + COMPTE À REBOURS
   + MUSIQUE + RENOUVELLEMENT QUOTIDIEN. v1 · 2026-06-15
   ==================================================================== */
(function(){
  var ICE='#7DD3FC', OR='#e9d3a0';
  var DAY=Math.floor(Date.now()/864e5);

  // police haute lisibilité (conçue pour la basse vision)
  var lk=document.createElement('link'); lk.rel='stylesheet';
  lk.href='https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap';
  document.head.appendChild(lk);

  var css=`
  :root{--nv-fs:1}
  html{font-size:calc(112.5% * var(--nv-fs))}
  /* le fond sombre devient transparent -> le décor vivant éclaire toute la page */
  .bg{background:transparent!important}
  #nv-living{filter:saturate(1.14) brightness(1.12)}
  #nv-veil{background:radial-gradient(1400px 1000px at 50% 26%,transparent,rgba(5,6,10,.10) 82%,rgba(5,6,10,.34))!important}
  body,p,li,.lead,.intro,.tagline,.app p,.app h3,.disc,.q,nav.top a,.go,.tag,
  .nv-tab,.nv-menu a,.nv-menu button,.nv-bubble,#nv-sav .b,#nv-sav textarea,.nv-btn,.nv-lang,#nv-count{
    font-family:'Atkinson Hyperlegible','Lora',serif!important;letter-spacing:.2px}
  body{font-size:1.22rem;line-height:1.9}
  /* lisibilité sur fond animé : ombre douce derrière le texte courant (pas les titres dégradés) */
  p,li,.lead,.intro,.tagline,.q,.desc,.punch,.disc{text-shadow:0 1px 4px rgba(0,0,0,.6)}
  /* textes PLUS GROS et AÉRÉS : phrases courtes qui respirent, jamais de pavé */
  p,li{font-size:1.24rem;line-height:1.9;margin-bottom:.55em;max-width:34em}
  .lead,.intro{font-size:1.34rem;line-height:1.85}
  .app p{font-size:1.22rem}
  .disc{font-size:1.08rem;line-height:1.9}
  nav.top a{font-size:1.1rem}
  .nv-tab{font-size:1.06rem}
  .tagline{font-size:1.32rem;line-height:1.7}
  h1,h2{line-height:1.18}
  h3{line-height:1.3}
  .nv-btn,.nv-lang,.nv-menu a,.nv-menu button{min-height:42px}
  :focus-visible{outline:3px solid ${ICE};outline-offset:2px;border-radius:6px}
  @media (prefers-reduced-motion: reduce){
    *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}
  }
  body{padding-top:calc(var(--nv-top-h) + 42px)!important}
  #nv-count{position:fixed;top:var(--nv-top-h);left:0;right:0;z-index:119;height:42px;display:flex;align-items:center;justify-content:center;gap:10px;
    text-decoration:none;color:#fff;font-size:1rem;padding:0 12px;text-align:center;
    background:linear-gradient(90deg,rgba(12,74,110,.82),rgba(7,9,16,.9),rgba(125,211,252,.35));border-bottom:1px solid rgba(233,211,160,.3)}
  #nv-count b{color:${OR};font-weight:700}
  #nv-count .pin{color:${ICE}}
  @media(max-width:560px){#nv-count{font-size:.84rem;height:48px;line-height:1.18}body{padding-top:calc(var(--nv-top-h) + 48px)!important}}
  `;
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  // --- A- / A+ et Musique dans le bandeau ---
  function ready(fn){ if(document.querySelector('#nv-top .nv-actions')) fn(); else setTimeout(function(){ready(fn);},120); }
  ready(function(){
    var act=document.querySelector('#nv-top .nv-actions');
    /* taille de texte FIXE (les textes sont déjà grands) — plus de A-/A+ :
       l'échelle variable faisait déborder le bandeau et disparaître les langues */
    document.documentElement.style.setProperty('--nv-fs','1');
    try{ localStorage.removeItem('nvfs'); }catch(e){}
    var au=document.createElement('audio'); au.id='nv-audio'; au.loop=true; au.src='/media/ambiance.mp3'; document.body.appendChild(au);
    var mu=document.createElement('button'); mu.className='nv-btn'; mu.title='Musique NAVLYS'; mu.textContent='🎵';
    mu.onclick=function(){
      if(au.paused){ au.play().then(function(){ mu.textContent='🎶'; }).catch(function(){ toast('Radio NAVLYS arrive — choisis ta musique 🎵'); setTimeout(function(){location.href='/radio';},700); }); }
      else { au.pause(); mu.textContent='🎵'; }
    };
    act.insertBefore(mu, act.firstChild);
  });

  // --- compte à rebours réel jusqu'au 1er juillet 2026, 00:00 ---
  var band=document.createElement('a'); band.id='nv-count'; band.href='/adhesion'; document.body.appendChild(band);
  var TARGET=new Date(2026,6,1,0,0,0).getTime();
  function pad(n){ return (n<10?'0':'')+n; }
  function tick(){
    var diff=TARGET-Date.now();
    if(diff<=0){ band.innerHTML='✨ <b>NAVLYS est lancé</b> — entre dans l\'univers, accès anticipé <b>GRATUIT</b> &rsaquo;'; return; }
    var d=Math.floor(diff/864e5), h=Math.floor(diff%864e5/36e5), m=Math.floor(diff%36e5/6e4), s=Math.floor(diff%6e4/1e3);
    band.innerHTML='✨ <span class="pin">Ouverture le 1er juillet</span> · accès anticipé <b>GRATUIT</b> — <b>'+d+'j '+pad(h)+'h '+pad(m)+'m '+pad(s)+'s</b> &rsaquo;';
  }
  tick(); setInterval(tick,1000);

  // --- RENOUVELLEMENT QUOTIDIEN : le bateau change chaque jour, partout ---
  var slogans=[
    'Bienvenue à bord — l\'IA humaine et lumineuse, en 1 clic 🌊',
    'Aujourd\'hui, le bateau t\'offre une nouvelle lumière ✨',
    'Ton histoire vaut de l\'or — écris-la, transmets-la 📖',
    'L\'IA est le vent, c\'est toi qui tiens la barre ⚓',
    'En euros et en confiance — le cap serein 🧭',
    'À la portée de tous : une personne, un univers 🤝',
    'Chaque jour, NAVLYS se renouvelle pour toi 🌅',
    'Gagne ta vie en montant à bord — partenaire & ami 🪙'
  ];
  var slogan=slogans[((DAY%slogans.length)+slogans.length)%slogans.length];
  // teinte du jour, douce, dans la famille glacier (renouvellement visible sans casser l'identité)
  var liv=document.getElementById('nv-living'); if(liv){ liv.style.filter='saturate(1.14) brightness(1.12) hue-rotate('+((DAY%5)*5-6)+'deg)'; }
  setTimeout(function(){ if(typeof toast==='function') toast(slogan); else { var t=document.getElementById('nv-toast'); if(t){t.textContent=slogan;t.classList.add('show');setTimeout(function(){t.classList.remove('show');},3200);} } },1800);
})();

/* ====================================================================
   NAVLYS — BANDEAU PERMANENT qui apparaît / disparaît tout seul
   (intégrer NAVLYS au quotidien dans le navigateur). v1 · 2026-06-15
   ==================================================================== */
(function(){
  function ready(fn){ if(document.getElementById('nv-top')) fn(); else setTimeout(function(){ready(fn);},150); }
  ready(function(){
    var top=document.getElementById('nv-top'), count=document.getElementById('nv-count');
    var sty=document.createElement('style'); sty.textContent=`
      #nv-top,#nv-count{transition:transform .45s ease,opacity .45s ease}
      body.nv-chrome-hidden #nv-top{transform:translateY(-106%)}
      body.nv-chrome-hidden #nv-count{transform:translateY(-170%);opacity:0}
      #nv-hotzone{position:fixed;top:0;left:0;right:0;height:16px;z-index:118}
      #nv-peek{position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:118;width:54px;height:5px;border-radius:99px;
        background:linear-gradient(90deg,#7DD3FC,#e9d3a0);opacity:0;transition:opacity .4s;pointer-events:none;box-shadow:0 0 12px rgba(125,211,252,.6)}
      body.nv-chrome-hidden #nv-peek{opacity:.85}
    `; document.head.appendChild(sty);
    var hz=document.createElement('div'); hz.id='nv-hotzone'; document.body.appendChild(hz);
    var peek=document.createElement('div'); peek.id='nv-peek'; document.body.appendChild(peek); // petit repère vivant quand caché
    var t;
    function anyMenuOpen(){ return !!document.querySelector('.nv-menu.open'); }
    /* Onglets PERMANENTS en haut (demande Bruno 2026-07-07) : la barre ne se
       replie plus toute seule — bande écran de cinéma toujours présente, comme en bas. */
    function arm(){ clearTimeout(t); }
    function show(){ document.body.classList.remove('nv-chrome-hidden'); }
    function hide(){ /* jamais masquer : onglets permanents */ return; }
    document.addEventListener('mousemove',function(e){ if(e.clientY<56) show(); });
    [top,count,hz,peek].forEach(function(el){ if(el){ el.addEventListener('mouseenter',show); el.addEventListener('mouseleave',arm); } });
    var lastY=window.scrollY||0;
    window.addEventListener('scroll',function(){ var y=window.scrollY||0; if(y<lastY-4||y<8) show(); else if(y>lastY+8) arm(); lastY=y; },{passive:true});
    document.addEventListener('touchstart',function(e){ if(e.touches&&e.touches[0].clientY<64) show(); },{passive:true});
    arm(); // visible au départ, puis se replie tout seul après quelques secondes
  });
})();

/* ====================================================================
   NAVLYS — NOYAU « mode recherche / digestion » (overlay réutilisable).
   Appel : NAVLYS_THINK.show()  …puis…  NAVLYS_THINK.hide()
   v1 · 2026-06-15
   ==================================================================== */
(function(){
  window.NAVLYS_THINK={
    show:function(){
      if(document.getElementById('nv-think')) return;
      var o=document.createElement('div'); o.id='nv-think';
      o.style.cssText='position:fixed;inset:0;z-index:200;background:rgba(3,4,10,.94);opacity:0;transition:opacity .4s';
      o.innerHTML='<iframe title="NAVLYS CORE" src="/core-energie.html" style="border:0;width:100%;height:100%"></iframe>';
      document.body.appendChild(o); requestAnimationFrame(function(){ o.style.opacity='1'; });
    },
    hide:function(){ var o=document.getElementById('nv-think'); if(o){ o.style.opacity='0'; setTimeout(function(){ o.remove(); },400); } }
  };
  // Éveil cinématique : le noyau s'allume à l'arrivée sur l'accueil (1 fois / session)
  try{
    var home=(location.pathname||'/').replace(/index\.html$/,'').replace(/\/+$/,'')==='';
    if(home && !sessionStorage.getItem('nv_intro')){
      sessionStorage.setItem('nv_intro','1');
      NAVLYS_THINK.show();
      setTimeout(function(){ NAVLYS_THINK.hide(); }, 2600);
    }
  }catch(e){}
})();

/* ====================================================================
   NAVLYS — MOTIF VIVANT PAR PAGE (tout dans tout) : chaque section reçoit
   son fond vivant signature (ADN, noyau d'énergie, neural). v1 · 2026-06-15
   ==================================================================== */
(function(){
  var map={
    '/next-gen':'/adn-vivant.html',      // le vivant qui évolue
    '/finance':'/core-energie.html',     // le cerveau qui analyse
    '/navlex':'/cerveau-hero.html',      // l'intelligence du droit
    '/influenceurs':'/cerveau-hero.html',
    '/tech':'/core-energie.html'
  };
  var path=(location.pathname||'/').replace(/index\.html$/,'').replace(/\.html$/,'').replace(/\/+$/,'')||'/';
  var src=map[path]; if(!src) return;            // l'accueil garde son décor mer + cerveau cinématique
  var st=document.createElement('style');
  st.textContent='#nv-living{display:none!important}#nv-veil{background:radial-gradient(1400px 1000px at 50% 26%,transparent,rgba(4,7,15,.32) 80%,rgba(4,7,15,.62))!important}';
  document.head.appendChild(st);
  var f=document.createElement('iframe'); f.id='nv-motif'; f.title='NAVLYS — motif vivant'; f.setAttribute('aria-hidden','true'); f.src=src;
  f.style.cssText='position:fixed;inset:0;width:100%;height:100%;border:0;z-index:-4;opacity:.5;pointer-events:none';
  document.body.appendChild(f);
})();

/* ====================================================================
   NAVLYS — COQUE APP CINÉMA (site entier) : favicon de marque + installable
   (PWA) + barre basse de navigation FEUTRÉE, injectés sur CHAQUE page d'un
   coup. Discret, sombre, ice/or — ne couvre jamais le contenu. v1 · 2026-06-30
   ==================================================================== */
(function(){
  var d=document, head=d.head||d.getElementsByTagName('head')[0];
  function has(sel){ return !!d.querySelector(sel); }
  function addLink(rel,href,type){ if(has('link[rel="'+rel+'"]'))return; var l=d.createElement('link'); l.rel=rel; l.href=href; if(type)l.type=type; head.appendChild(l); }
  function addMeta(name,content){ if(has('meta[name="'+name+'"]'))return; var m=d.createElement('meta'); m.name=name; m.content=content; head.appendChild(m); }

  // Marque + installable, sur toutes les pages
  addLink('icon','/media/navlys_favicon.svg','image/svg+xml');
  addLink('manifest','/manifest.webmanifest');
  addLink('apple-touch-icon','/media/icon-192.svg');
  addMeta('theme-color','#03040a');
  addMeta('apple-mobile-web-app-capable','yes');
  addMeta('apple-mobile-web-app-title','NAVLYS');
  if('serviceWorker' in navigator){
    window.addEventListener('load',function(){ navigator.serviceWorker.register('/sw.js').catch(function(){}); });
    /* Rafraîchissement AUTOMATIQUE quand une nouvelle version prend la main (fini le
       cache figé — règle n°5) : dès que le nouveau service worker contrôle la page,
       on recharge UNE seule fois. Plus jamais besoin de vider le cache à la main. */
    var nvRefreshing=false;
    navigator.serviceWorker.addEventListener('controllerchange',function(){
      if(nvRefreshing) return; nvRefreshing=true; try{ window.location.reload(); }catch(e){}
    });
  }

  // Barre basse app (feutrée) — sauf si la page en a déjà une (ex. /cinema)
  if(!has('.botbar') && !has('#nv-botbar')){
    var path=(location.pathname||'/').replace(/index\.html$/,'').replace(/\.html$/,'').replace(/\/+$/,'')||'/';
    var items=[['/','≋','Accueil'],['/finance','📈','Finance'],['/next-gen','📖','Next Gen'],['/assistance','🎙️','Voix'],['/cockpit','⛬','Cockpit']];
    var css='#nv-botbar{position:fixed;bottom:0;left:0;right:0;height:60px;z-index:59;display:flex;justify-content:space-around;align-items:center;'
      +'background:rgba(4,6,12,.80);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-top:1px solid rgba(125,211,252,.14);padding-bottom:env(safe-area-inset-bottom)}'
      +"#nv-botbar a{display:flex;flex-direction:column;align-items:center;gap:3px;text-decoration:none;color:#8fa2b3;font-family:'Cinzel','Cormorant Garamond',serif;font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;flex:1;transition:.25s}"
      +'#nv-botbar a .i{font-size:19px;line-height:1;filter:grayscale(.35) opacity(.85)}'
      +'#nv-botbar a:hover,#nv-botbar a.on{color:#a8e3ff}'
      +'#nv-botbar a.on .i{filter:none;text-shadow:0 0 12px rgba(125,211,252,.6)}'
      +'body{padding-bottom:74px!important}'
      +'#nv-sav-btn{bottom:72px!important}#nv-sav{bottom:128px!important}';
    var s=d.createElement('style'); s.textContent=css; head.appendChild(s);
    var nav=d.createElement('nav'); nav.id='nv-botbar';
    nav.innerHTML=items.map(function(it){ var on=(it[0]===path)?' class="on"':''; return '<a href="'+it[0]+'"'+on+'><span class="i">'+it[1]+'</span>'+it[2]+'</a>'; }).join('');
    d.body.appendChild(nav);
  }
})();

/* ============================================================
   LE BATTEMENT PERMANENT — le cœur vivant de NAVLYS
   Un point de vie qui bat sur CHAQUE page, au centre-bas,
   discret mais toujours là. « au cœur de l'application. »
   Respecte prefers-reduced-motion (fige au lieu d'animer).
   ============================================================ */
(function(){
  var d=document;
  function boot(){
    if(d.getElementById('nv-heart')) return;
    var reduce = false;
    try{ reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
    var css=''
      +'#nv-heart{position:fixed;left:50%;bottom:80px;transform:translateX(-50%);'
      +'z-index:54;pointer-events:none;width:14px;height:14px;border-radius:50%;'
      +'background:radial-gradient(circle at 50% 42%,#e8f8ff 0%,#7DD3FC 42%,#2b8fc4 100%);'
      +'box-shadow:0 0 10px rgba(125,211,252,.65),0 0 22px rgba(125,211,252,.35);'
      +'opacity:.9;will-change:transform,opacity}'
      +'#nv-heart::after{content:"";position:absolute;inset:-8px;border-radius:50%;'
      +'border:1px solid rgba(125,211,252,.5);opacity:0}'
      +(reduce?''
        :'@keyframes nvBeat{0%{transform:translateX(-50%) scale(1)}'
         +'12%{transform:translateX(-50%) scale(1.35)}22%{transform:translateX(-50%) scale(1)}'
         +'34%{transform:translateX(-50%) scale(1.22)}46%{transform:translateX(-50%) scale(1)}'
         +'100%{transform:translateX(-50%) scale(1)}}'
         +'@keyframes nvPulse{0%{opacity:.5;transform:scale(.6)}70%{opacity:0;transform:scale(1.9)}100%{opacity:0}}'
         +'#nv-heart{animation:nvBeat 3.2s ease-in-out infinite}'
         +'#nv-heart::after{animation:nvPulse 3.2s ease-out infinite}');
    var s=d.createElement('style'); s.textContent=css; d.head.appendChild(s);
    var h=d.createElement('div'); h.id='nv-heart';
    h.setAttribute('aria-hidden','true'); h.title='NAVLYS — le cœur bat.';
    d.body.appendChild(h);
  }
  if(d.readyState==='loading') d.addEventListener('DOMContentLoaded',boot); else boot();
})();

/* ====================================================================
   NAVLYS — CHARGEUR i18n : garantit que le module de traduction FR<->EN
   (navlys-i18n.js) est présent sur CHAQUE page qui embarque ce chrome,
   pour que la bascule de langue fonctionne partout (au moins sur le
   chrome partagé). N'injecte rien si déjà chargé. v1 · 2026-07-02
   ==================================================================== */
(function(){
  var d=document;
  if(window.NAVLYS_I18N) return;
  var scripts=d.getElementsByTagName('script'), i;
  for(i=0;i<scripts.length;i++){ if((scripts[i].src||'').indexOf('navlys-i18n.js')!==-1) return; }
  var s=d.createElement('script'); s.src='/navlys-i18n.js'; s.defer=true;
  (d.head||d.getElementsByTagName('head')[0]||d.body).appendChild(s);
})();

/* ====================================================================
   NAVLYS — BANDE CINÉMA (sous l'onglet du haut) : petit écran vidéo en
   DIRECT + défilé de données & offres promo. Permanent, ice/or, discret.
   Remplace l'ancien bandeau compte-à-rebours (#nv-count) par un ruban vivant.
   v1 · 2026-07-07 — demande Bruno : « écran de cinéma en haut, vidéo + défilé ».
   ==================================================================== */
(function(){
  var d=document;
  function ready(fn){ if(d.getElementById('nv-top')) fn(); else setTimeout(function(){ready(fn);},150); }
  ready(function(){
    if(d.getElementById('nv-cine')) return;
    var ICE='#7DD3FC', OR='#e9d3a0';
    function L(){ var l='fr'; try{ l=(window.NAVLYS_I18N&&window.NAVLYS_I18N.lang&&window.NAVLYS_I18N.lang())||localStorage.getItem('nv-lang')||'fr'; }catch(e){} return (['en','ru','he','ar'].indexOf(l)>-1)?l:'fr'; }
    var A=function(fr,en,ru,he,ar){ return {fr:fr,en:en,ru:ru,he:he,ar:ar}; };
    var LNK='<a href="/finance" style="color:'+ICE+';text-decoration:none">';
    var ITEMS=[
      A('✨ <b>NAVLYS</b> · l\'univers Lovelace','✨ <b>NAVLYS</b> · the Lovelace universe','✨ <b>NAVLYS</b> · вселенная Lovelace','✨ <b>NAVLYS</b> · יקום Lovelace','✨ <b>NAVLYS</b> · عالم Lovelace'),
      A('⚓ L\'IA est le vent, c\'est toi qui tiens la barre','⚓ AI is the wind, you hold the helm','⚓ ИИ — это ветер, штурвал в твоих руках','⚓ הבינה היא הרוח, אתה מחזיק בהגה','⚓ الذكاء هو الريح، وأنت تمسك الدفّة'),
      A('🎁 <b>Accès Fondateur</b> — teste en toute liberté','🎁 <b>Founder Access</b> — try freely','🎁 <b>Доступ Основателя</b> — пробуй свободно','🎁 <b>גישת מייסד</b> — התנסה בחופשיות','🎁 <b>وصول المؤسس</b> — جرّب بحرية'),
      A('⚖️ NAVLEX · 3 questions offertes','⚖️ NAVLEX · 3 free questions','⚖️ NAVLEX · 3 вопроса бесплатно','⚖️ NAVLEX · 3 שאלות חינם','⚖️ NAVLEX · ٣ أسئلة مجانية'),
      A('📈 '+LNK+'NAVFIN · le défilé bourse ›</a>','📈 '+LNK+'NAVFIN · the market ticker ›</a>','📈 '+LNK+'NAVFIN · бегущая строка биржи ›</a>','📈 '+LNK+'NAVFIN · מדד הבורסה ›</a>','📈 '+LNK+'NAVFIN · شريط البورصة ›</a>'),
      A('📖 Next Gen · ta vie mise en scène','📖 Next Gen · your life, staged','📖 Next Gen · твоя жизнь как в кино','📖 Next Gen · החיים שלך על המסך','📖 Next Gen · حياتك على الشاشة'),
      A('🌍 5 langues · navlys.com','🌍 5 languages · navlys.com','🌍 5 языков · navlys.com','🌍 5 שפות · navlys.com','🌍 5 لغات · navlys.com'),
      A('🎙️ Tout à la voix, depuis ton mobile','🎙️ All by voice, from your phone','🎙️ Всё голосом, с телефона','🎙️ הכול בקול, מהנייד','🎙️ كل شيء بالصوت، من هاتفك')
    ];
    function trackHTML(){ var lg=L(); var h=ITEMS.map(function(o){ return '<span class="it">'+(o[lg]||o.fr)+'</span>'; }).join(''); return h+h; }
    var css=''
      +'#nv-count{display:none!important}'
      /* bandeau JEU/CASINO : plus petit (34px), sous l'onglet du haut, ne gêne ni le scroll ni la barre */
      +'#nv-cine{position:fixed;top:var(--nv-top-h,52px);left:0;right:0;z-index:119;height:34px;display:flex;align-items:stretch;overflow:hidden;'
      /* fond MOUVEMENT DE MER : une onde glacier qui glisse lentement, sous le texte */
      +'background:linear-gradient(100deg,transparent 0,rgba(125,211,252,.14) 18%,transparent 40%,rgba(125,211,252,.10) 64%,transparent 86%),linear-gradient(90deg,rgba(4,7,15,.96),rgba(9,14,24,.9)),#060a14;'
      +'background-size:220% 100%,100% 100%,100% 100%;'
      +'box-shadow:0 4px 16px rgba(0,0,0,.4),0 0 14px rgba(233,211,160,.12);animation:nvCineGlow 2.4s ease-in-out infinite,nvSea 9s linear infinite}'
      +'@keyframes nvSea{to{background-position:220% 0,0 0,0 0}}'
      +'@keyframes nvCineGlow{0%,100%{box-shadow:0 4px 16px rgba(0,0,0,.4),0 0 12px rgba(233,211,160,.10)}50%{box-shadow:0 4px 16px rgba(0,0,0,.4),0 0 22px rgba(125,211,252,.30)}}'
      /* plus de pointillés (demande Bruno) : un fin liseré lumineux or→ice, haut & bas */
      +'#nv-cine:before,#nv-cine:after{content:"";position:absolute;left:0;right:0;height:1px;z-index:3;pointer-events:none;'
      +'background:linear-gradient(90deg,transparent,rgba(233,211,160,.55) 30%,rgba(125,211,252,.45) 70%,transparent)}'
      +'#nv-cine:before{top:0}#nv-cine:after{bottom:0}'
      +'#nv-cine .scr{flex:0 0 auto;width:46px;position:relative;overflow:hidden;border-right:1px solid rgba(125,211,252,.2);background:#04060d}'
      +'#nv-cine .scr video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.9}'
      +'#nv-cine .scr .live{position:absolute;top:3px;left:4px;z-index:2;font:700 7px/1 \'Cinzel\',serif;letter-spacing:.08em;color:#fff;'
      +'background:rgba(210,30,30,.9);border-radius:3px;padding:1px 3px;animation:nvLive 1s steps(2) infinite}'
      +'@keyframes nvLive{50%{opacity:.35}}'
      +'#nv-cine .scr .gem{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:16px;'
      +'background:radial-gradient(circle at 50% 40%,rgba(125,211,252,.4),transparent 70%);animation:nvCineGem 2.2s ease-in-out infinite}'
      +'@keyframes nvCineGem{0%,100%{opacity:.6;transform:scale(.86)}50%{opacity:1;transform:scale(1.12)}}'
      +'#nv-cine .view{flex:1;overflow:hidden;position:relative;'
      +'-webkit-mask-image:linear-gradient(90deg,transparent,#000 18px,#000 calc(100% - 18px),transparent);'
      +'mask-image:linear-gradient(90deg,transparent,#000 18px,#000 calc(100% - 18px),transparent)}'
      +'#nv-cine .track{position:absolute;top:0;left:0;height:100%;display:flex;align-items:center;gap:30px;white-space:nowrap;padding-left:30px;'
      +'font-family:\'Cormorant Garamond\',\'Lora\',serif;font-size:.92rem;color:#eaf6ff;text-shadow:0 0 8px rgba(125,211,252,.45);will-change:transform;animation:nvCine 60s linear infinite}'
      +'#nv-cine:hover .track{animation-play-state:paused}'
      +'#nv-cine .track b{color:'+OR+';font-weight:700;text-shadow:0 0 8px rgba(233,211,160,.6)}'
      +'#nv-cine .track span.it{display:inline-flex;align-items:center;gap:7px}'
      +'@keyframes nvCine{from{transform:translateX(0)}to{transform:translateX(-50%)}}'
      +'@media (prefers-reduced-motion:reduce){#nv-cine,#nv-cine:before,#nv-cine:after,#nv-cine .track,#nv-cine .scr .live{animation:none!important}#nv-cine .track{padding-left:12px}}'
      +'@media(max-width:560px){#nv-cine{height:32px}#nv-cine .scr{width:40px}#nv-cine .track{font-size:.86rem}}'
      +'body{padding-top:calc(var(--nv-top-h,52px) + 40px)!important}';
    var st=d.createElement('style'); st.textContent=css; d.head.appendChild(st);

    var bar=d.createElement('div'); bar.id='nv-cine';
    bar.innerHTML='<div class="scr"><span class="live">● LIVE</span><span class="gem">💠</span></div>'
      +'<div class="view"><div class="track">'+trackHTML()+'</div></div>';
    d.body.appendChild(bar);
    /* re-rendu dans la bonne langue à chaque bascule (événement nv-lang) */
    document.addEventListener('nv-lang',function(){ var tr=bar.querySelector('.track'); if(tr) tr.innerHTML=trackHTML(); });

    /* --- PREUVE EN DIRECT : le vrai travail du CORE, pas une promesse -----
       Demande Bruno (2026-07-09) : « montre-moi le changement online sur le
       site en temps réel — c'est ça qu'il faut valoriser en première page. »
       On va chercher les dernières actions réelles (brique publique
       « vitrine ») et on les glisse en tête du bandeau, préfixées EN DIRECT. */
    (function(){
      var VITRINE='https://hhrlgyvtqluxpywjiwkd.supabase.co/functions/v1/vitrine';
      /* Le flux contient parfois du texte écrit par un visiteur (démo voix) :
         jamais de HTML brut visiteur injecté — toujours échappé avant affichage. */
      function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
      function maj(){
        fetch(VITRINE).then(function(r){return r.json();}).then(function(d){
          var feed=(d&&d.feed)||[]; if(!feed.length) return;
          var tr=bar.querySelector('.track'); if(!tr) return;
          var live=feed.map(function(m){ return '<span class="it" style="color:#e9d3a0">🔴 <b>EN DIRECT</b> — '+esc(m)+'</span>'; }).join('');
          tr.innerHTML=live+trackHTML();
        }).catch(function(){});
      }
      maj(); setInterval(maj,30000);
    })();

    /* petit écran : vidéo en DIRECT si disponible, sinon le gem animé reste */
    try{
      var v=d.createElement('video'); v.muted=true; v.loop=true; v.autoplay=true; v.playsInline=true; v.setAttribute('playsinline','');
      v.addEventListener('nv-novideo', function(){ try{ v.remove(); }catch(e){} });
      v.addEventListener('loadeddata', function(){ try{ var g=bar.querySelector('.gem'); if(g) g.style.display='none'; }catch(e){} });
      window.NAVLYS_setVideo(v, 0.6, window.NAVLYS_LIVEV);
      bar.querySelector('.scr').appendChild(v);
    }catch(e){}
  });
})();

/* ====================================================================
   NAVLYS — VIDÉO INCRUSTÉE dans chaque encadré (.card / .box). Demande
   Bruno (2026-07-07). Une couche vidéo douce en boucle derrière le contenu,
   incrustée aux coins arrondis. Perf : max 4 vidéos actives à la fois
   (le reste reçoit un dégradé vivant), lazy via IntersectionObserver,
   repli gracieux si /media/fond.mp4 absent. v1
   ==================================================================== */
(function(){
  var d=document;
  var reduce=false; try{ reduce=matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
  function boot(){
    var frames=d.querySelectorAll('.card,.box');
    if(!frames.length) return;
    var css=''
      +'.nv-vframe{position:relative;isolation:isolate}'
      +'.nv-vframe>.nv-vbg{position:absolute;inset:0;z-index:-1;overflow:hidden;border-radius:inherit;pointer-events:none}'
      +'.nv-vframe>.nv-vbg video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.16;filter:saturate(1.05)}'
      +'.nv-vframe>.nv-vbg .nv-vfallback{position:absolute;inset:0;opacity:.55;'
      +'background:linear-gradient(180deg,rgba(255,255,255,.05),transparent 26%),linear-gradient(120deg,rgba(125,211,252,.10),transparent 55%),radial-gradient(120% 90% at 82% 8%,rgba(233,211,160,.10),transparent 60%)'
      +(reduce?'':';animation:nvVshift 15s ease-in-out infinite alternate')+'}'
      +'@keyframes nvVshift{to{filter:hue-rotate(-10deg) brightness(1.08)}}'
      /* finition PREMIUM (« du high ») : éclat haut de gamme sur les icônes (additif, sans toucher la mise en page) */
      +'.nv-vframe svg,.nv-vframe .emoji,.nv-vframe .i,.nv-vframe .led,.nv-vframe .gem{filter:drop-shadow(0 0 5px rgba(125,211,252,.32)) drop-shadow(0 0 10px rgba(233,211,160,.18))}';
    var s=d.createElement('style'); s.textContent=css; d.head.appendChild(s);
    var live=0, MAX=4;
    function skin(card){
      if(card.querySelector(':scope>.nv-vbg')) return null;
      card.classList.add('nv-vframe');
      var wrap=d.createElement('div'); wrap.className='nv-vbg'; wrap.setAttribute('aria-hidden','true');
      var fb=d.createElement('div'); fb.className='nv-vfallback'; wrap.appendChild(fb);
      card.insertBefore(wrap, card.firstChild);
      return wrap;
    }
    function mount(card){
      var wrap=skin(card); if(!wrap) return;
      if(reduce || live>=MAX) return; /* au-delà du plafond : le dégradé vivant suffit */
      try{
        live++; /* compté À LA CRÉATION (sinon plafond inefficace en scroll rapide) */
        var v=d.createElement('video'); v.muted=true; v.loop=true; v.autoplay=true; v.playsInline=true; v.setAttribute('playsinline','');
        v.addEventListener('nv-novideo', function(){ live--; try{ v.remove(); }catch(e){} }); /* libère la place */
        window.NAVLYS_setVideo(v, 0.6);
        wrap.insertBefore(v, wrap.firstChild);
      }catch(e){ live--; }
    }
    if(!('IntersectionObserver' in window)){
      for(var i=0;i<frames.length;i++) skin(frames[i]);
      return;
    }
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ mount(e.target); io.unobserve(e.target); } }); },{rootMargin:'140px'});
    for(var j=0;j<frames.length;j++) io.observe(frames[j]);
  }
  if(d.readyState==='loading') d.addEventListener('DOMContentLoaded',boot); else boot();
})();

/* ====================================================================
   NAVLYS — LA RESPIRATION : le site & les applications « respirent ».
   Une lueur glacier qui gonfle et se retire lentement (le cerveau vivant),
   derrière le contenu, sur CHAQUE page. Demande Bruno (2026-07-07).
   Se fige sous prefers-reduced-motion. v1
   ==================================================================== */
(function(){
  var d=document;
  var reduce=false; try{ reduce=matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
  if(d.getElementById('nv-breath')) return;
  var css=''
    +'#nv-breath{position:fixed;inset:0;z-index:-3;pointer-events:none;'
    +'background:radial-gradient(58% 42% at 50% 34%,rgba(125,211,252,.12),transparent 70%);mix-blend-mode:screen'
    +(reduce?';opacity:.7}':';animation:nvBreath 7.5s ease-in-out infinite}')
    +'@keyframes nvBreath{0%,100%{opacity:.4}50%{opacity:1}}'; /* opacité seule : respire sans déborder */
  var s=d.createElement('style'); s.textContent=css; d.head.appendChild(s);
  var el=d.createElement('div'); el.id='nv-breath'; el.setAttribute('aria-hidden','true');
  (d.body||d.documentElement).appendChild(el);
})();
