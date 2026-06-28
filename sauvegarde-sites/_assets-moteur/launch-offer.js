/* NAVLYS Launch Offer — escalator 50/40/30/20 du 1er juin (minuit Asia/Jerusalem) au 1er juillet */
(function(){
  var T0=Date.parse('2026-05-31T21:00:00Z'); // 1er juin 00:00 Asia/Jerusalem (UTC+3)
  var TIERS=[
    {s:0, e:7,  pct:50, code:'CAP50'},
    {s:7, e:14, pct:40, code:'CAP40'},
    {s:14,e:21, pct:30, code:'CAP30'},
    {s:21,e:30, pct:20, code:'CAP20'}
  ];
  var P={m:49, a:490, b:39}; // mensuel · annuel · NAVBIO
  var MODE=(window.NAVLYS_OFFER_MODE||'full'); // 'full' ou 'navbio'
  function pad(n){return n<10?'0'+n:''+n;}
  function tier(){
    var now=Date.now(), d=(now-T0)/86400000;
    if(d<0) return {state:'before', wait:-d};
    if(d>=30) return {state:'after'};
    for(var i=0;i<TIERS.length;i++) if(d>=TIERS[i].s && d<TIERS[i].e){
      var left=TIERS[i].e-d; var next=i+1<TIERS.length?TIERS[i+1].pct:0;
      return {state:'in', t:TIERS[i], left:left, next:next};
    }
    return {state:'after'};
  }
  function row(label,full,disc,unit){
    return '<span class="lo-price"><del>'+full+'€</del> <b>'+disc+'€</b> '+unit+'</span>';
  }
  function render(){
    var el=document.getElementById('navlys-launch-offer'); if(!el) return;
    var i=tier(), h='';
    if(i.state==='before'){
      var d=Math.floor(i.wait), hh=Math.floor((i.wait-d)*24);
      h='<div class="lo-card"><div class="lo-tag">🚀 Lancement officiel</div>'+
        '<div class="lo-h">Dans <strong>'+d+' j '+pad(hh)+' h</strong></div>'+
        '<div class="lo-sub">1ᵉʳ juin 2026 · minuit, heure de Jérusalem</div>'+
        '<div class="lo-tiers">Puis 30 jours d\'offres : <strong>−50 % → −40 % → −30 % → −20 %</strong>, semaine après semaine. Au 1ᵉʳ juillet : tarif plein.</div></div>';
    } else if(i.state==='in'){
      var t=i.t, dL=Math.floor(i.left), hL=Math.floor((i.left-dL)*24);
      var dm=Math.round(P.m*(1-t.pct/100)), da=Math.round(P.a*(1-t.pct/100)), db=Math.round(P.b*(1-t.pct/100));
      var prices=(MODE==='navbio')?row('NAVBIO',P.b,db,'NAVBIO'):
        (row('Mensuel',P.m,dm,'/mois')+' '+row('Annuel',P.a,da,'/an')+' '+row('NAVBIO',P.b,db,'NAVBIO'));
      h='<div class="lo-card lo-active"><div class="lo-tag">🎁 Offre semaine en cours · −'+t.pct+' %</div>'+
        '<div class="lo-h">Code : <strong>'+t.code+'</strong></div>'+
        '<div class="lo-prices">'+prices+'</div>'+
        '<div class="lo-sub">'+(i.next>0?'Passage à −'+i.next+' % dans '+dL+' j '+pad(hL)+' h':'Dernière semaine — prix plein dans '+dL+' j')+'</div></div>';
    } else {
      var prices=(MODE==='navbio')?'<span class="lo-price"><b>'+P.b+'€</b> NAVBIO</span>':
        '<span class="lo-price"><b>'+P.m+'€</b> /mois</span> <span class="lo-price"><b>'+P.a+'€</b> /an</span> <span class="lo-price"><b>'+P.b+'€</b> NAVBIO</span>';
      h='<div class="lo-card"><div class="lo-tag">Tarif plein</div><div class="lo-prices">'+prices+'</div></div>';
    }
    el.innerHTML=h;
  }
  var s=document.createElement('style');
  s.textContent='#navlys-launch-offer .lo-card{background:linear-gradient(135deg,rgba(125,211,252,0.08),rgba(184,115,51,0.06));border:1px solid rgba(125,211,252,0.35);border-radius:18px;padding:24px 28px;margin:34px auto;max-width:720px;text-align:center;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}'+
    '#navlys-launch-offer .lo-active{border-color:rgba(233,211,160,0.7);box-shadow:0 0 44px rgba(233,211,160,0.18)}'+
    '#navlys-launch-offer .lo-tag{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#7DD3FC;margin-bottom:10px;font-weight:600}'+
    '#navlys-launch-offer .lo-active .lo-tag{color:#e9d3a0}'+
    '#navlys-launch-offer .lo-h{font-size:24px;font-weight:300;color:#eaf6fb;margin-bottom:6px;font-family:"Cormorant Garamond",serif;line-height:1.2}'+
    '#navlys-launch-offer .lo-h strong{font-weight:600;color:#e9d3a0;font-family:"Fraunces",serif;font-style:italic}'+
    '#navlys-launch-offer .lo-sub{font-size:13.5px;color:#9fbdd4;margin-top:10px}'+
    '#navlys-launch-offer .lo-tiers{font-size:13.5px;color:#bcc9d1;margin-top:10px;line-height:1.5}'+
    '#navlys-launch-offer .lo-prices{display:flex;gap:18px;justify-content:center;flex-wrap:wrap;margin:14px 0 4px}'+
    '#navlys-launch-offer .lo-price{font-size:14.5px;color:#9fbdd4}'+
    '#navlys-launch-offer .lo-price b{color:#e9d3a0;font-size:19px;font-weight:700;font-family:"Fraunces",serif;font-style:italic}'+
    '#navlys-launch-offer .lo-price del{color:#5c7388;font-size:13px;margin-right:4px}';
  document.head.appendChild(s);
  if(!document.getElementById('navlys-launch-offer')){
    var d=document.createElement('div'); d.id='navlys-launch-offer';
    var ft=document.querySelector('footer'); if(ft) ft.parentNode.insertBefore(d,ft); else document.body.appendChild(d);
  }
  render(); setInterval(render,60000);
})();
