/* ============================================================
   NAVLYS — comportements v2 (commun)
   - menu déroulant
   - compte à rebours flashy (window.NV_TARGET = timestamp ms)
   - playlist cinéma (window.NV_REELS = [{src,title}, ...])
   - son : la vidéo démarre MUETTE (autoplay), son au clic
   ============================================================ */
(function(){
  // menu
  window.NV_menu=function(){var d=document.getElementById('dd');if(d)d.classList.toggle('show');};

  // compte à rebours
  var TARGET = window.NV_TARGET || (Date.now()+14*86400000);
  function pad(n,l){return String(n).padStart(l||2,'0');}
  function tick(){
    var el=document.getElementById('cd-d'); if(!el) return;
    var diff=Math.max(0,TARGET-Date.now());
    el.textContent=Math.floor(diff/86400000);
    document.getElementById('cd-h').textContent=pad(Math.floor(diff%86400000/3600000));
    document.getElementById('cd-m').textContent=pad(Math.floor(diff%3600000/60000));
    document.getElementById('cd-s').textContent=pad(Math.floor(diff%60000/1000));
  }
  tick(); setInterval(tick,1000);

  // playlist cinéma
  var REELS = window.NV_REELS || [{src:"https://navlys.com/media/presentation.mp4",title:"NAVLYS — présentation"}];
  var v=document.getElementById('liveVideo'),
      poster=document.getElementById('reelPoster'),
      rTitle=document.getElementById('reelTitle'),
      dots=document.getElementById('reelDots'),
      idx=-1, hold=null;
  if(v && dots){
    REELS.forEach(function(){var d=document.createElement('i');dots.appendChild(d);});
    var setDots=function(){[].forEach.call(dots.children,function(d,i){d.className=i===idx?'on':'';});};
    var next=function(){idx=(idx+1)%REELS.length;play(REELS[idx]);};
    var play=function(r){
      clearTimeout(hold); if(rTitle)rTitle.textContent=r.title||''; setDots();
      if(r.src){
        if(poster)poster.style.opacity=0; v.style.display='';
        v.src=r.src; v.load(); var p=v.play(); if(p&&p.catch)p.catch(function(){});
        v.onended=next;
        v.onerror=function(){ if(poster)poster.style.opacity=1; v.style.display='none'; hold=setTimeout(next,6000); };
      } else {
        if(poster)poster.style.opacity=1; v.style.display='none'; v.removeAttribute('src');
        hold=setTimeout(next, r.hold||8000);
      }
    };
    next();
    window.NV_sound=function(){
      var b=document.getElementById('sndBtn');
      v.muted=!v.muted; if(b)b.textContent=v.muted?'🔇':'🔊';
      if(!v.muted){try{v.play();}catch(e){}}
    };
  }
})();
