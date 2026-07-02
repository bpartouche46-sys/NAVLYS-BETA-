/* NAVLYS — i18n AUTONOME (zéro dépendance externe). FR <-> EN.
   Style ES5/vanilla (var, fonctions classiques). Passe `node --check`.
   - langue lue/écrite dans localStorage (clé "nv-lang", défaut "fr")
   - bascule qui traduit le texte VISIBLE via un dictionnaire FR->EN
   - walk des noeuds texte (insensible aux espaces superflus) + attributs
     (placeholder, title, aria-label)
   - met document.documentElement.lang à jour
   API : window.NAVLYS_I18N = { set(l), toggle(), lang(), refresh() }
   v1 · 2026-07-02 · <script src="/navlys-i18n.js" defer></script>
   ==================================================================== */
(function(){
  'use strict';

  var LANG = 'fr';
  var ATTRS = ['placeholder','title','aria-label'];

  /* ---------- Dictionnaire FR -> EN (clés = phrase française normalisée) ----
     Normalisation : espaces multiples réduits à un seul + trim.
     Les espaces de début/fin du noeud réel sont préservés autour de la
     traduction ; quand une élision française colle un mot au gras suivant
     (ex. « projet d' » + <b>…</b>), l'espace nécessaire est intégré à la
     valeur anglaise. -------------------------------------------------------- */
  var DICT = {
    /* ---- chrome partagé : onglets de navigation ---- */
    "Accueil": "Home",
    "Influenceurs": "Influencers",

    /* ---- chrome : barre basse (app) ---- */
    "Voix": "Voice",

    /* ---- chrome : boutons de la barre ---- */
    "Partager": "Share",

    /* ---- chrome : menu Partage ---- */
    "Partager NAVLYS · 1 clic": "Share NAVLYS · 1 click",
    "Partage rapide (toutes formes)": "Quick share (all forms)",
    "YouTube (copie + ouvre)": "YouTube (copy + open)",
    "Instagram (copie + ouvre)": "Instagram (copy + open)",
    "Copier le lien": "Copy the link",

    /* ---- chrome : menu Réglages / Compte / Paiement / Langue ---- */
    "Mon espace": "My space",
    "Identité & Compte": "Identity & Account",
    "Abonnement & Paiement": "Membership & Payment",
    "Réglages": "Settings",
    "Langue": "Language",
    "Aide & SAV": "Help & Support",

    /* ---- chrome : toasts d'information ---- */
    "Espace Identité & Compte — en ligne très bientôt 👤": "Identity & Account space — online very soon 👤",
    "Abonnement & Paiement sécurisé — en ligne très bientôt 💳": "Membership & secure Payment — online very soon 💳",
    "Réglages personnels — en chemin 🎛️": "Personal settings — on the way 🎛️",
    "Lien copié ✓": "Link copied ✓",
    "Lien copié — colle-le où tu veux 🌊": "Link copied — paste it anywhere 🌊",
    "Lien copié — colle-le dans ta story Instagram 📸": "Link copied — paste it in your Instagram story 📸",
    "Lien copié — colle-le dans ta description / Short YouTube ▶️": "Link copied — paste it in your YouTube description / Short ▶️",

    /* ---- chrome : SAV / Aide vocale ---- */
    "💬 Aide": "💬 Help",
    "NAVLYS · Aide & SAV": "NAVLYS · Help & Support",
    "Bonjour 👋 Je suis là pour t'aider sur NAVLYS — une question, une idée ? Écris-moi.": "Hi 👋 I'm here to help you on NAVLYS — a question, an idea? Write to me.",
    "Ta question…": "Your question…",
    "… un instant": "… one moment",
    "Je note ta demande, l'équipe NAVLYS revient vers toi très vite. 🌊": "I've noted your request, the NAVLYS team will get back to you very soon. 🌊",
    "Connexion difficile, réessaie dans un instant. 🌊": "Connection trouble, try again in a moment. 🌊",
    "🔊 écouter": "🔊 listen",
    "🔊 réécouter": "🔊 replay",

    /* ---- chrome : compte à rebours ---- */
    "Ouverture le 1er juillet": "Opening July 1st",
    "· accès anticipé": "· early access",
    "GRATUIT": "FREE",
    "NAVLYS est lancé": "NAVLYS is live",
    "— entre dans l'univers, accès anticipé": "— enter the universe, early access",

    /* ---- chrome : slogans du jour (toast) ---- */
    "Bienvenue à bord — l'IA humaine et lumineuse, en 1 clic 🌊": "Welcome aboard — human, luminous AI, in 1 click 🌊",
    "Aujourd'hui, le bateau t'offre une nouvelle lumière ✨": "Today, the ship offers you a new light ✨",
    "Ton histoire vaut de l'or — écris-la, transmets-la 📖": "Your story is worth gold — write it, pass it on 📖",
    "L'IA est le vent, c'est toi qui tiens la barre ⚓": "AI is the wind, you hold the helm ⚓",
    "En euros et en confiance — le cap serein 🧭": "In euros and in confidence — a serene course 🧭",
    "À la portée de tous : une personne, un univers 🤝": "Within everyone's reach: one person, one universe 🤝",
    "Chaque jour, NAVLYS se renouvelle pour toi 🌅": "Every day, NAVLYS renews itself for you 🌅",
    "Gagne ta vie en montant à bord — partenaire & ami 🪙": "Earn your living by coming aboard — partner & friend 🪙",

    /* ==================== PAGE D'ACCUEIL (index.html) ==================== */

    /* barre de marque du haut (fam-nav) */
    "Partenaires": "Partners",
    "NAVBIO — biographie vivante": "NAVBIO — living biography",

    /* prélude + héro */
    "Il y a bien longtemps, l'IA n'existait pas… Mais ça, c'était avant.": "Long ago, AI did not exist… But that was before.",
    "· le cerveau central": "· the central brain",
    "Un cerveau. Une personne.": "One brain. One person.",
    "Tout un univers.": "A whole universe.",
    "L'IA est le vent, c'est toi qui tiens la barre.": "AI is the wind, you hold the helm.",
    "Ma méthode · Ton argent · Ton rythme": "My method · Your money · Your pace",
    "🎁 Teste gratuitement — 0 €": "🎁 Try it free — €0",

    /* section applications */
    "Les": "The",
    "applications": "applications",
    "Un univers d'outils IA + humains. Deux bêtas réelles à tester gratuitement, le reste grandit dans le CORE.": "A universe of AI + human tools. Two real betas to try for free, the rest grows inside the CORE.",

    /* cartes applications */
    "Gratuit · 0 €": "Free · €0",
    "éducation · méthode 90/10": "education · 90/10 method",
    "Comprendre l'argent en bon père de famille, chiffré en euros. Cockpit, brief du jour, simulateur du bon sens. Éducation & veille, jamais un conseil.": "Understand money the prudent way, counted in euros. Cockpit, daily brief, common-sense simulator. Education & watch, never advice.",
    "Essayer →": "Try it →",
    "ta vie, chapitre par chapitre": "your life, chapter by chapter",
    "Raconte ou dicte ta vie. Ton histoire vaut de l'or — garde-la, transmets-la. Tes souvenirs t'appartiennent.": "Tell or dictate your life. Your story is worth gold — keep it, pass it on. Your memories belong to you.",
    "Écrire ma vie →": "Write my life →",
    "droit · pédagogique": "law · educational",
    "Tes questions juridiques expliquées simplement. 3 questions offertes. Information pédagogique, pas un conseil d'avocat.": "Your legal questions explained simply. 3 questions on the house. Educational information, not a lawyer's advice.",
    "Découvrir →": "Discover →",
    "Le Journal": "The Journal",
    "IA & créateurs · veille": "AI & creators · watch",
    "L'actualité de l'IA et de l'économie des créateurs, expliquée simplement, préparée avec NAVLYS CORE.": "The latest in AI and the creator economy, explained simply, prepared with NAVLYS CORE.",
    "Lire →": "Read →",
    "ambiance · live": "ambience · live",
    "La bande-son de l'Équipage : musique et flux en direct pour travailler, apprendre, respirer.": "The Crew's soundtrack: live music and streams to work, learn, breathe.",
    "Écouter →": "Listen →",
    "brokers · banques · outils": "brokers · banks · tools",
    "Nos partenaires testés (brokers, crypto, néo-banques, outils), en toute transparence sur l'affiliation.": "Our tested partners (brokers, crypto, neo-banks, tools), fully transparent about affiliation.",
    "Voir →": "See →",

    /* section partenaires */
    "Nos": "Our",
    "partenaires": "partners",
    "Brokers, banques et outils — tous testés, liens d'affiliation transparents, sans surcoût pour toi.": "Brokers, banks and tools — all tested, transparent affiliate links, at no extra cost to you.",
    "Pour investir en actions et ETF, du néo-broker européen au PEA français.": "To invest in stocks and ETFs, from the European neo-broker to the French PEA.",
    "Plateformes crypto sélectionnées pour leurs frais et leur sécurité.": "Crypto platforms selected for their fees and security.",
    "Banques & cash": "Banks & cash",
    "Néo-banques et transferts au taux réel, pour le quotidien et l'international.": "Neo-banks and transfers at the real rate, for daily life and abroad.",
    "Outils & communauté": "Tools & community",
    "Les outils qui font tourner NAVLYS et la communauté.": "The tools that keep NAVLYS and the community running.",
    "Voir tous les partenaires →": "See all partners →",

    /* section communauté */
    "L'": "The",
    "Équipage": "Crew",
    "Une communauté privée pour apprendre ensemble, à ton rythme. Tu n'es jamais seul à la barre.": "A private community to learn together, at your pace. You're never alone at the helm.",
    "Rejoindre l'aventure →": "Join the adventure →",

    /* section mission */
    "Notre": "Our",
    "mission": "mission",
    "Mettre l'IA à la portée de tous, en un clic et à la voix — pour égaliser l'accès au savoir, au bien-être et à la transmission. L'humain reste la pièce centrale. NAVLYS, c'est aussi 100 % dématérialisé, dans le respect de la Méditerranée qui nous porte.": "Bringing AI within everyone's reach, in one click and by voice — to level access to knowledge, well-being and legacy. The human stays at the heart of it. NAVLYS is also 100% paperless, honoring the Mediterranean that carries us.",

    /* pied de page */
    "· le site référence": "· the reference site",
    "Applications · Partenaires · Communauté · Journal": "Apps · Partners · Community · Journal",
    "NAVLYS est un projet d'": "NAVLYS is a project of ",
    "éducation et de veille à vocation informative uniquement": "education and watch, for informational purposes only",
    ". Les contenus ne constituent en aucun cas un conseil personnalisé en investissement. Les liens « affilié » génèrent une commission sans surcoût pour toi. Investir comporte un risque de perte en capital. Chacun reste seul responsable de ses décisions. Tous les tarifs sont indiqués": ". The content never constitutes personalized investment advice. « Affiliate » links earn a commission at no extra cost to you. Investing carries a risk of capital loss. Everyone remains solely responsible for their own decisions. All rates are shown ",
    "HT": "excl. tax",
    ". Réservé aux 18 ans et +. Tes contenus restent privés par défaut et t'appartiennent. © 2026 NAVLYS · navlys.com": ". 18+ only. Your content stays private by default and belongs to you. © 2026 NAVLYS · navlys.com"
  };

  /* ---------- utilitaires ---------- */
  function norm(s){ return String(s).replace(/\s+/g,' ').replace(/^\s+|\s+$/g,''); }
  function leadWs(s){ var m=String(s).match(/^\s*/); return m?m[0]:''; }
  function trailWs(s){ var m=String(s).match(/\s*$/); return m?m[0]:''; }

  /* renvoie la traduction EN (avec espaces de bord préservés) ou null */
  function translateRaw(raw){
    var key=norm(raw);
    if(!key) return null;
    var en=DICT[key];
    if(en==null) return null;
    if(en===key) return null; /* identique : rien à faire */
    return leadWs(raw)+en+trailWs(raw);
  }

  /* ---------- traduction d'un noeud texte ---------- */
  function doNode(tn){
    if(!tn || tn.nodeType!==3) return;
    if(LANG==='en'){
      if(tn.__nvLang==='en') return;
      var out=translateRaw(tn.nodeValue);
      if(out!=null){
        if(tn.__nvOrig==null) tn.__nvOrig=tn.nodeValue;
        tn.nodeValue=out; tn.__nvLang='en';
      }
    } else {
      if(tn.__nvOrig!=null && tn.__nvLang==='en'){
        tn.nodeValue=tn.__nvOrig; tn.__nvLang='fr';
      }
    }
  }

  /* ---------- traduction d'un attribut ---------- */
  function doAttr(el,name){
    if(!el || el.nodeType!==1 || !el.getAttribute) return;
    if(!el.hasAttribute(name)) return;
    var store=el.__nvAttr || (el.__nvAttr={});
    if(LANG==='en'){
      var v=el.getAttribute(name);
      var out=translateRaw(v);
      if(out!=null){
        if(store[name]==null) store[name]=v;
        el.setAttribute(name,out);
      }
    } else {
      if(store[name]!=null) el.setAttribute(name,store[name]);
    }
  }

  function skipTag(nn){ return nn==='SCRIPT'||nn==='STYLE'||nn==='NOSCRIPT'; }

  /* ---------- parcours d'un sous-arbre ---------- */
  function translateSubtree(node){
    if(!node) return;
    if(node.nodeType===3){ doNode(node); return; }
    if(node.nodeType!==1) return;
    if(skipTag(node.nodeName)) return;
    var a;
    for(a=0;a<ATTRS.length;a++) doAttr(node,ATTRS[a]);
    /* noeuds texte descendants */
    if(document.createTreeWalker && typeof NodeFilter!=='undefined'){
      var walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT,{
        acceptNode:function(t){
          var p=t.parentNode;
          if(p && skipTag(p.nodeName)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      },false);
      var list=[], tn;
      while((tn=walker.nextNode())) list.push(tn);
      var k; for(k=0;k<list.length;k++) doNode(list[k]);
    }
    /* attributs des éléments descendants */
    if(node.querySelectorAll){
      var els=node.querySelectorAll('[placeholder],[title],[aria-label]');
      var e,b;
      for(e=0;e<els.length;e++){ for(b=0;b<ATTRS.length;b++) doAttr(els[e],ATTRS[b]); }
    }
  }

  function translateAll(){ translateSubtree(document.body); }

  /* ---------- observateur : traduit le contenu ajouté dynamiquement ---------- */
  function startObserver(){
    if(!window.MutationObserver) return;
    var obs=new MutationObserver(function(muts){
      if(LANG!=='en') return; /* en FR, la source est déjà en français */
      var i,j;
      for(i=0;i<muts.length;i++){
        var mu=muts[i];
        if(mu.type==='characterData'){ doNode(mu.target); }
        else if(mu.type==='attributes'){ doAttr(mu.target,mu.attributeName); }
        else if(mu.addedNodes){
          for(j=0;j<mu.addedNodes.length;j++) translateSubtree(mu.addedNodes[j]);
        }
      }
    });
    obs.observe(document.documentElement,{
      subtree:true, childList:true, characterData:true,
      attributes:true, attributeFilter:ATTRS
    });
  }

  /* ---------- API publique ---------- */
  function setLang(l){
    LANG=(l==='en')?'en':'fr';
    try{ localStorage.setItem('nv-lang',LANG); }catch(e){}
    if(document.documentElement) document.documentElement.lang=LANG;
    translateAll();
  }

  window.NAVLYS_I18N={
    set:setLang,
    toggle:function(){ setLang(LANG==='en'?'fr':'en'); },
    lang:function(){ return LANG; },
    refresh:translateAll
  };

  /* ---------- init ---------- */
  function init(){
    var saved='fr';
    try{ saved=localStorage.getItem('nv-lang')||'fr'; }catch(e){}
    LANG=(saved==='en')?'en':'fr';
    if(document.documentElement) document.documentElement.lang=LANG;
    startObserver();
    if(LANG==='en') translateAll();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
