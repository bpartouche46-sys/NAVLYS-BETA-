/* NAVLYS — fond vidéo universel (@CoreNAVLYS). Une vidéo plein écran fixe derrière tout, sur chaque page. */
(function(){
  if(window.__navbg)return;window.__navbg=true;
  var LIST=['/videos/navlys-cine.mp4']; // extensible : plusieurs vidéos s'enchaînent
  function mount(){
    if(document.querySelector('.nv-bgvideo'))return;
    var v=document.createElement('video');
    v.className='nv-bgvideo';v.muted=true;v.defaultMuted=true;v.autoplay=true;v.playsInline=true;
    v.setAttribute('muted','');v.setAttribute('playsinline','');v.setAttribute('autoplay','');
    v.loop=LIST.length<2;v.src=LIST[0];
    var veil=document.createElement('div');veil.className='nv-bgveil';
    document.body.insertBefore(veil,document.body.firstChild);
    document.body.insertBefore(v,document.body.firstChild);
    var p=v.play&&v.play();if(p&&p.catch)p.catch(function(){});
    if(LIST.length>1){var i=0;v.addEventListener('ended',function(){i=(i+1)%LIST.length;v.src=LIST[i];v.play();});}
  }

  function waBtn(){
    if(document.querySelector('.nv-wa'))return;
    if(!document.getElementById('nv-wa-css')){
      var st=document.createElement('style');st.id='nv-wa-css';
      st.textContent='.nv-wa{position:fixed;left:18px;bottom:18px;width:54px;height:54px;border-radius:50%;background:rgba(8,11,22,.86);border:1px solid rgba(233,211,160,.55);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(0,0,0,.5);z-index:60;transition:transform .2s,box-shadow .2s;backdrop-filter:blur(6px)}.nv-wa:hover{transform:scale(1.08);box-shadow:0 10px 28px rgba(37,211,102,.35)}.nv-wa svg{width:28px;height:28px}';
      document.head.appendChild(st);
    }
    var a=document.createElement('a');a.className='nv-wa';a.href='https://wa.me/15559913239';a.target='_blank';a.rel='noopener';
    a.setAttribute('aria-label','Parler à NAVLYS sur WhatsApp');a.title='Parler à NAVLYS sur WhatsApp';
    a.innerHTML='<svg viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-1.9 1-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.3.5c-.1.2-.3.3-.1.6.1.3.7 1.1 1.4 1.8.9.8 1.7 1 2 1.2.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z"/></svg>';
    document.body.appendChild(a);
  }
  if(document.readyState!=='loading'){mount();waBtn();}
  else document.addEventListener('DOMContentLoaded',waBtn);
  if(document.readyState!=='loading'){mount();waBtn();}else document.addEventListener('DOMContentLoaded',function(){mount();waBtn();});
})();
