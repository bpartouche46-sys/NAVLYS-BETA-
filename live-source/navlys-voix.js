/* NAVLYS — voix humaine + karaoké (@CoreNAVLYS)
   Tu parles -> le CORE comprend (endpoint chat) -> il te REPOND À VOIX HAUTE
   avec une vraie voix émotionnelle (ElevenLabs multilingue via /voix),
   et le texte défile en KARAOKÉ : gros, transparent, sans cadre, 1-2 lignes
   synchronisées avec la voix. Repli navigateur si la voix distante échoue. */
(function(){
  'use strict';
  if(window.__navlysVoix) return; window.__navlysVoix=true;

  var BASE='https://hhrlgyvtqluxpywjiwkd.supabase.co/functions/v1';
  var CHAT=BASE+'/chat', VOIX=BASE+'/voix';
  // Voix par défaut (chaude, humaine). Remplaçable par la voix clonée de Bruno.
  var VOICE_ID='SlMeTvFmET6Zf5gdxJ9H';

  var LMAP={fr:'fr-FR',en:'en-US',es:'es-ES',de:'de-DE',it:'it-IT',pt:'pt-PT',ar:'ar-SA',he:'he-IL',ru:'ru-RU',zh:'zh-CN',nl:'nl-NL'};
  var lang2=(navigator.language||'fr').slice(0,2).toLowerCase();
  var BCP=LMAP[lang2]||'fr-FR';

  var css=''
  +'#nv-fab{position:fixed;right:18px;bottom:18px;z-index:99998;width:64px;height:64px;border-radius:50%;cursor:pointer;'
  +'border:none;font-size:26px;color:#0a0803;background:radial-gradient(circle at 38% 30%,#ffe6a6,#e9d3a0 45%,#c9962f 100%);'
  +'box-shadow:0 10px 30px rgba(201,150,47,.5);animation:nvpulse 3s ease-in-out infinite}'
  +'@keyframes nvpulse{50%{box-shadow:0 12px 40px rgba(201,150,47,.6),0 0 34px rgba(255,215,122,.55)}}'
  +'#nv-fab.rec{background:radial-gradient(circle at 38% 30%,#ff9a9a,#e83a3a 100%);color:#fff;animation:nvrec 1s steps(2) infinite}'
  +'#nv-fab.think{filter:saturate(.7)}'
  +'@keyframes nvrec{50%{opacity:.55}}'
  +'#nv-karao{position:fixed;left:0;right:0;bottom:0;z-index:99997;display:none;pointer-events:none;'
  +'padding:0 6vw 12vh;text-align:center;font-family:"Cormorant Garamond",Georgia,serif}'
  +'#nv-karao.on{display:block}'
  +'#nv-kline{font-size:clamp(28px,5.4vw,52px);line-height:1.24;font-weight:400;letter-spacing:.01em;'
  +'text-shadow:0 2px 26px rgba(0,0,0,.75),0 1px 3px rgba(0,0,0,.9);transition:opacity .4s}'
  +'#nv-knext{font-size:clamp(19px,3.4vw,30px);line-height:1.25;margin-top:8px;color:rgba(234,242,251,.42);'
  +'text-shadow:0 2px 20px rgba(0,0,0,.7);font-style:italic}'
  +'#nv-kline .w{color:rgba(234,242,251,.34);transition:color .18s ease,text-shadow .18s ease}'
  +'#nv-kline .w.on{color:#f6ecd6}'
  +'#nv-kline .w.hot{color:#ffe6a6;text-shadow:0 0 18px rgba(255,215,122,.55),0 2px 26px rgba(0,0,0,.8)}'
  +'#nv-bar{position:fixed;right:18px;bottom:92px;z-index:99998;display:none;gap:8px;align-items:center;'
  +'width:min(340px,86vw);background:rgba(5,7,14,.72);backdrop-filter:blur(8px);border:1px solid rgba(233,211,160,.28);'
  +'border-radius:16px;padding:8px}#nv-bar.on{display:flex}'
  +'#nv-txt{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(125,211,252,.22);border-radius:11px;color:#eaf6ff;'
  +'padding:9px 12px;font-size:15px;font-family:inherit}#nv-txt:focus{outline:none;border-color:rgba(125,211,252,.5)}'
  +'#nv-send{border:none;border-radius:11px;padding:9px 13px;cursor:pointer;font-size:16px;background:linear-gradient(100deg,#c9962f,#ffd77a);color:#0a0803}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  var fab=document.createElement('button');fab.id='nv-fab';fab.type='button';
  fab.title='Parle à NAVLYS';fab.setAttribute('aria-label','Parler à NAVLYS');fab.textContent='🎙️';
  document.body.appendChild(fab);

  var karao=document.createElement('div');karao.id='nv-karao';karao.setAttribute('aria-live','polite');
  karao.innerHTML='<div id="nv-kline"></div><div id="nv-knext"></div>';
  document.body.appendChild(karao);
  var kline=karao.querySelector('#nv-kline'), knext=karao.querySelector('#nv-knext');

  var bar=document.createElement('div');bar.id='nv-bar';
  bar.innerHTML='<input id="nv-txt" placeholder="ou écris-moi ici…" autocomplete="off" aria-label="Écrire à NAVLYS"><button id="nv-send" type="button" title="Envoyer" aria-label="Envoyer">➤</button>';
  document.body.appendChild(bar);
  var txt=bar.querySelector('#nv-txt'), send=bar.querySelector('#nv-send');

  function decoupe(t){
    var mots=t.replace(/\s+/g,' ').trim().split(' '), lignes=[], cur='';
    for(var i=0;i<mots.length;i++){
      var essai=cur?cur+' '+mots[i]:mots[i];
      if(essai.length>52 && cur){lignes.push(cur);cur=mots[i];}
      else cur=essai;
      if(/[.!?…]$/.test(mots[i]) && cur.length>22){lignes.push(cur);cur='';}
    }
    if(cur)lignes.push(cur);
    return lignes.length?lignes:[t];
  }

  var karaoTimer=null;
  function stopKarao(){if(karaoTimer){cancelAnimationFrame(karaoTimer);karaoTimer=null;}}
  function renderLigne(ligne,nextLigne){
    kline.innerHTML='';
    var mots=ligne.split(' '), spans=[];
    for(var i=0;i<mots.length;i++){
      var s=document.createElement('span');s.className='w';s.textContent=mots[i]+(i<mots.length-1?' ':'');
      kline.appendChild(s);spans.push({el:s,len:mots[i].length+1});
    }
    knext.textContent=nextLigne||'';
    return spans;
  }
  function karaoke(lignes,getProgress,totalChars){
    karao.classList.add('on');
    var bornes=[],acc=0;
    lignes.forEach(function(l){var start=acc;acc+=l.length;bornes.push({start:start,end:acc,txt:l});});
    var totalC=totalChars||acc, curIdx=-1, spans=[];
    function tick(){
      var p=Math.max(0,Math.min(1,getProgress())), charPos=p*totalC, idx=0;
      for(var i=0;i<bornes.length;i++){if(charPos>=bornes[i].start)idx=i;}
      if(idx!==curIdx){curIdx=idx;spans=renderLigne(bornes[idx].txt,bornes[idx+1]?bornes[idx+1].txt:'');}
      var local=charPos-bornes[idx].start, run=0, hotSet=false;
      for(var k=0;k<spans.length;k++){
        run+=spans[k].len;spans[k].el.classList.remove('hot');
        if(run<=local){spans[k].el.classList.add('on');}
        else{spans[k].el.classList.remove('on');if(!hotSet){spans[k].el.classList.add('hot');hotSet=true;}}
      }
      karaoTimer=requestAnimationFrame(tick);
    }
    stopKarao();tick();
  }
  function finKarao(){stopKarao();setTimeout(function(){karao.classList.remove('on');kline.innerHTML='';knext.textContent='';},1400);}

  var audio=null;
  function parler(t){
    var lignes=decoupe(t), totalChars=t.replace(/\s+/g,' ').trim().length;
    fetch(VOIX,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:t,voice_id:VOICE_ID})})
    .then(function(r){if(!r.ok||(r.headers.get('content-type')||'').indexOf('audio')<0)throw 0;return r.blob();})
    .then(function(b){
      var url=URL.createObjectURL(b);
      if(audio){try{audio.pause();}catch(_){}}
      audio=new Audio(url);
      audio.addEventListener('play',function(){karaoke(lignes,function(){return audio.duration?audio.currentTime/audio.duration:0;},totalChars);});
      audio.addEventListener('ended',finKarao);
      audio.play().catch(function(){navTTS(t,lignes,totalChars);});
    })
    .catch(function(){navTTS(t,lignes,totalChars);});
  }
  function navTTS(t,lignes,totalChars){
    try{
      var u=new SpeechSynthesisUtterance(t);u.lang=BCP;u.rate=1;u.pitch=1;
      var vs=speechSynthesis.getVoices()||[];
      var best=vs.filter(function(v){return v.lang&&v.lang.slice(0,2).toLowerCase()===lang2;})
                 .sort(function(a,b){return (/google|natural|premium|enhanced/i.test(b.name)?1:0)-(/google|natural|premium|enhanced/i.test(a.name)?1:0);})[0];
      if(best)u.voice=best;
      var boundChar=0;
      u.onboundary=function(e){if(typeof e.charIndex==='number')boundChar=e.charIndex;};
      u.onstart=function(){karaoke(lignes,function(){return totalChars?boundChar/totalChars:0;},totalChars);};
      u.onend=finKarao;
      speechSynthesis.cancel();speechSynthesis.speak(u);
    }catch(_){karao.classList.add('on');renderLigne(lignes[0],lignes[1]||'');setTimeout(finKarao,3200);}
  }

  var busy=false;
  function envoyer(t){
    t=(t||'').trim();if(!t||busy)return;busy=true;fab.classList.add('think');
    fetch(CHAT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:t,lang:lang2})})
    .then(function(r){return r.json();})
    .then(function(d){var rep=(d&&(d.reply||d.text))||'Je t’écoute, redis-moi ça.';parler(rep);})
    .catch(function(){parler('La connexion est coupée un instant. Réessaie, je suis là.');})
    .then(function(){busy=false;fab.classList.remove('think');});
  }

  var Reco=window.SpeechRecognition||window.webkitSpeechRecognition, reco=null, on=false;
  if(Reco){reco=new Reco();reco.lang=BCP;reco.continuous=false;reco.interimResults=false;
    reco.onresult=function(e){var t=e.results[0][0].transcript;if(t)envoyer(t);};
    reco.onerror=function(){stopRec();};reco.onend=function(){stopRec();};}
  function startRec(){if(!reco||on)return;on=true;fab.classList.add('rec');try{reco.start();}catch(_){stopRec();}}
  function stopRec(){on=false;fab.classList.remove('rec');}
  fab.addEventListener('click',function(){
    bar.classList.add('on');
    if(!reco){txt.focus();return;}
    on?(function(){try{reco.stop();}catch(_){}stopRec();})():startRec();
  });
  send.addEventListener('click',function(){envoyer(txt.value);txt.value='';});
  txt.addEventListener('keydown',function(e){if(e.key==='Enter'){envoyer(txt.value);txt.value='';}});
  if(window.speechSynthesis){try{speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=function(){speechSynthesis.getVoices();};}catch(_){}}
})();
