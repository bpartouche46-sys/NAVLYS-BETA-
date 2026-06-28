/* NAVLYS — script commun aux pages produit
   Menu, compte à rebours (si #cd), inscription -> Supabase, onglets.
   Config par page : window.NV_SOURCE (tag), window.NV_TARGET (date ms, optionnel). */
(function(){
  var SB_URL = "https://hhrlgyvtqluxpywjiwkd.supabase.co";
  var SB_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhocmxneXZ0cWx1eHB5d2ppd2tkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNzYxMzIsImV4cCI6MjA5Njc1MjEzMn0.tGq_XXd4nJY-aYk9DfWGFJ5DW4C_NJJKb67owmvoejo";

  window.NV_menu = function(){ var d=document.getElementById('dd'); var b=document.querySelector('.menu-btn');
    var open=d.classList.toggle('show'); if(b) b.setAttribute('aria-expanded', open?'true':'false'); };
  document.addEventListener('click',function(e){ var d=document.getElementById('dd'); if(!d||!d.classList.contains('show'))return;
    if(!d.contains(e.target) && !e.target.classList.contains('menu-btn')) window.NV_menu(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ var d=document.getElementById('dd'); if(d&&d.classList.contains('show')) window.NV_menu(); }});

  // Compte à rebours (si présent)
  if(document.getElementById('cd') && window.NV_TARGET){
    var tick=function(){ var t=window.NV_TARGET-Date.now();
      if(t<=0){ ['cd-d','cd-h','cd-m','cd-s'].forEach(function(i){var el=document.getElementById(i);if(el)el.textContent='0';});
        var f=document.querySelector('.flashy h3'); if(f) f.innerHTML="C'est <em>ouvert</em> !"; return; }
      var d=Math.floor(t/864e5),h=Math.floor(t%864e5/36e5),m=Math.floor(t%36e5/6e4),s=Math.floor(t%6e4/1e3);
      var v={'cd-d':d,'cd-h':h,'cd-m':m,'cd-s':s};
      for(var k in v){var el=document.getElementById(k); if(el) el.textContent=(v[k]<10?'0':'')+v[k];} };
    tick(); setInterval(tick,1000);
  }

  // Boutons d'offre -> défile vers l'inscription
  document.querySelectorAll('.btn[data-tier]').forEach(function(b){
    b.addEventListener('click',function(){ var sel=document.getElementById('interet'); if(sel&&!sel.value) sel.value=b.getAttribute('data-tier'); });
  });

  // Inscription -> Supabase (RLS INSERT-only anon)
  var form=document.getElementById('joinForm');
  if(form){ form.addEventListener('submit',function(e){
    e.preventDefault();
    var msg=document.getElementById('formMsg'), btn=document.getElementById('joinBtn');
    var email=(document.getElementById('email')||{}).value, prenom=(document.getElementById('prenom')||{}).value, interet=(document.getElementById('interet')||{}).value;
    email=(email||'').trim(); prenom=(prenom||'').trim();
    msg.className='formmsg';
    if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ msg.className='formmsg err'; msg.textContent="Indique un e-mail valide, s'il te plaît."; return; }
    btn.disabled=true; var old=btn.textContent; btn.textContent='Envoi…';
    fetch(SB_URL+'/rest/v1/inscriptions',{ method:'POST',
      headers:{'Content-Type':'application/json','apikey':SB_ANON,'Authorization':'Bearer '+SB_ANON,'Prefer':'return=minimal'},
      body:JSON.stringify({email:email, prenom:prenom||null, interet:interet||null, source:(window.NV_SOURCE||'navlys')}) })
    .then(function(r){ if(r.ok){ msg.className='formmsg ok'; msg.textContent='✓ C\'est noté '+(prenom||'')+' ! On te prévient en priorité à l\'ouverture.'; form.reset(); }
      else { return r.text().then(function(t){ throw new Error(t); }); } })
    .catch(function(){ msg.className='formmsg err'; msg.textContent="Oups, réessaie dans un instant."; })
    .finally(function(){ btn.disabled=false; btn.textContent=old; });
  }); }

  document.querySelectorAll('.tabbar .tab').forEach(function(t){ t.addEventListener('click',function(){
    document.querySelectorAll('.tabbar .tab').forEach(function(x){x.classList.remove('active')}); if(t.getAttribute('href')!=='#') t.classList.add('active'); }); });
})();
