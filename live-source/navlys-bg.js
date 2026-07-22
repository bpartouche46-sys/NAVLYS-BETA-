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
  if(document.readyState!=='loading')mount();else document.addEventListener('DOMContentLoaded',mount);
})();
