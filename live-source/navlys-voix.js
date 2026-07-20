/* NAVLYS — assistant vocal universel (@CoreNAVLYS)
   Vit sur chaque page. Tu parles -> le CORE comprend (endpoint chat) -> il repond et te parle
   (voix clonee de Bruno via /voix, repli synthese navigateur). Aucune dependance. */
(function(){
  'use strict';
  if(window.__navlysVoix) return; window.__navlysVoix=true;
  var BASE='https://hhrlgyvtqluxpywjiwkd.supabase.co/functions/v1';
  var CHAT=BASE+'/chat', VOIX=BASE+'/voix';

  var css=''
  +'#nv-fab{position:fixed;right:18px;bottom:18px;z-index:99998;width:64px;height:64px;border-radius:50%;cursor:pointer;'
  +'border:none;font-size:26px;color:#0a0803;background:radial-gradient(circle at 38% 30%,#ffe6a6,#e9d3a0 45%,#c9962f 100%);'
  +'box-shadow:0 10px 30px rgba(201,150,47,.5),0 0 0 rgba(255,215,122,.6);animation:nvpulse 3s ease-in-out infinite}'
  +'@keyframes nvpulse{50%{box-shadow:0 12px 40px rgba(201,150,47,.6),0 0 34px rgba(255,215,122,.55)}}'
  +'#nv-fab.rec{background:radial-gradient(circle at 38% 30%,#ff9a9a,#e83a3a 100%);color:#fff;animation:nvrec 1s steps(2) infinite}'
  +'@keyframes nvrec{50%{opacity:.55}}'
  +'#nv-panel{position:fixed;right:18px;bottom:92px;z-index:99998;width:min(340px,92vw);max-height:64vh;display:none;flex-direction:column;'
  +'background:linear-gradient(160deg,#070a14,#03040a);border:1px solid rgba(233,211,160,.35);border-radius:18px;overflow:hidden;'
  +'box-shadow:0 24px 70px rgba(0,0,0,.6);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto}'
  +'#nv-panel.on{display:flex}'
  +'#nv-head{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid rgba(233,211,160,.2);'
  +'font-family:Georgia,serif;color:#e9d3a0;font-size:15px}'
  +'#nv-head .d{width:8px;height:8px;border-radius:50%;background:#3a8c5a;box-shadow:0 0 10px #3a8c5a}'
  +'#nv-head b{color:#f4ecdb;font-weight:600;letter-spacing:.04em}'
  +'#nv-close{margin-left:auto;background:none;border:none;color:#9aa6b2;font-size:18px;cursor:pointer}'
  +'#nv-log{flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:9px}'
  +'.nv-b{max-width:86%;padding:9px 12px;border-radius:13px;font-size:14px;line-height:1.4}'
  +'.nv-u{align-self:flex-end;background:linear-gradient(100deg,#c9962f,#e9d3a0);color:#0a0803}'
  +'.nv-a{align-self:flex-start;background:rgba(255,255,255,.06);color:#f4ecdb;border:1px solid rgba(125,211,252,.18)}'
  +'.nv-a.pending{color:#9aa6b2;font-style:italic}'
  +'#nv-bar{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(233,211,160,.2)}'
  +'#nv-txt{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(125,211,252,.25);border-radius:12px;color:#eaf6ff;'
  +'padding:9px 12px;font-size:14px}#nv-txt:focus{outline:none;border-color:rgba(125,211,252,.55)}'
  +'#nv-mic,#nv-send{border:none;border-radius:12px;padding:9px 13px;cursor:pointer;font-size:16px}'
  +'#nv-mic{background:rgba(125,211,252,.12);color:#a8e3ff}#nv-mic.rec{background:rgba(233,90,90,.25);color:#fff}'
  +'#nv-send{background:linear-gradient(100deg,#c9962f,#ffd77a);color:#0a0803}'
  +'#nv-hint{padding:0 14px 10px;color:#9aa6b2;font-size:11px}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  var fab=document.createElement('button');fab.id='nv-fab';fab.title='Parle a NAVLYS';fab.textContent='🎙️';document.body.appendChild(fab);
  var panel=document.createElement('div');panel.id='nv-panel';
  panel.innerHTML='<div id="nv-head"><span class="d"></span><b>NAVLYS</b> · parle-moi<button id="nv-close">✕</button></div>'
    +'<div id="nv-log"></div>'
    +'<div id="nv-bar"><button id="nv-mic" title="Parler">🎙️</button>'
    +'<input id="nv-txt" placeholder="parle ou ecris…" autocomplete="off">'
    +'<button id="nv-send" title="Envoyer">➤</button></div>'
    +'<div id="nv-hint">appuie sur le micro et parle — ou ecris</div>';
  document.body.appendChild(panel);

  var log=panel.querySelector('#nv-log'), txt=panel.querySelector('#nv-txt'),
      mic=panel.querySelector('#nv-mic'), send=panel.querySelector('#nv-send');
  function open(){panel.classList.add('on');if(!log.childElementCount)bulle('a','Bonjour je suis NAVLYS. Dis-moi ce que tu veux faire je m en occupe.');}
  function close(){panel.classList.remove('on');}
  fab.addEventListener('click',function(){panel.classList.contains('on')?close():open();});
  panel.querySelector('#nv-close').addEventListener('click',close);

  function bulle(who,t){var d=document.createElement('div');d.className='nv-b '+(who==='u'?'nv-u':'nv-a');d.textContent=t;log.appendChild(d);log.scrollTop=log.scrollHeight;return d;}

  var parle=false, audio=null;
  function dire(t){
    try{
      fetch(VOIX,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:t})})
        .then(function(r){return r.json();}).then(function(d){
          if(d&&d.ok&&d.audio){ if(audio){try{audio.pause();}catch(_){}} audio=new Audio(d.audio); audio.play().catch(navTts); }
          else navTts();
          function navTts(){ try{var u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';speechSynthesis.cancel();speechSynthesis.speak(u);}catch(_){}}
        })['catch'](function(){ try{var u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';speechSynthesis.cancel();speechSynthesis.speak(u);}catch(_){}});
    }catch(_){}
  }
  var enCours=false;
  function envoyer(t){
    t=(t||'').trim(); if(!t||enCours) return; enCours=true;
    bulle('u',t); txt.value='';
    var p=bulle('a','…'); p.classList.add('pending');
    fetch(CHAT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:t})})
      .then(function(r){return r.json();}).then(function(d){
        p.classList.remove('pending');
        var rep=(d&&d.ok&&d.reply)?d.reply:'Je n ai pas pu repondre la reessaie.';
        p.textContent=rep; log.scrollTop=log.scrollHeight; dire(rep);
      })['catch'](function(){ p.classList.remove('pending'); p.textContent='Connexion indisponible reessaie.'; })
      .then(function(){ enCours=false; });
  }
  send.addEventListener('click',function(){envoyer(txt.value);});
  txt.addEventListener('keydown',function(e){if(e.key==='Enter')envoyer(txt.value);});

  var Reco=window.SpeechRecognition||window.webkitSpeechRecognition, reco=null, ecoute=false;
  if(Reco){
    reco=new Reco();reco.lang='fr-FR';reco.continuous=false;reco.interimResults=false;
    reco.onresult=function(e){var t=e.results&&e.results[0]&&e.results[0][0]&&e.results[0][0].transcript;if(t){txt.value=t;envoyer(t);}};
    reco.onerror=function(){stopMic();};reco.onend=function(){stopMic();};
  }else{mic.title='Micro non supporte — ecris';}
  function startMic(){if(!reco||ecoute)return;ecoute=true;mic.classList.add('rec');fab.classList.add('rec');try{reco.start();}catch(_){stopMic();}}
  function stopMic(){ecoute=false;mic.classList.remove('rec');fab.classList.remove('rec');}
  mic.addEventListener('click',function(){if(!reco){txt.focus();return;}ecoute?(function(){try{reco.stop();}catch(_){}stopMic();})():startMic();});
})();
