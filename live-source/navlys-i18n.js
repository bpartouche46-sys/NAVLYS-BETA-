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
    ". Réservé aux 18 ans et +. Tes contenus restent privés par défaut et t'appartiennent. © 2026 NAVLYS · navlys.com": ". 18+ only. Your content stays private by default and belongs to you. © 2026 NAVLYS · navlys.com",

    /* ==================== cinema.html ==================== */
    "Écran vivant": "Living screen",
    "Naviguer l'avenir, ensemble": "Navigating the future, together",
    "L'IA est le vent, c'est toi qui tiens la barre. Tout respire, tout s'anime — comme un écran de cinéma qui ne s'arrête jamais.": "AI is the wind, you hold the helm. Everything breathes, everything comes alive — like a cinema screen that never stops.",
    "Le cerveau NAVLYS": "The NAVLYS brain",
    "14 agents, vivants, en continu": "14 agents, alive, around the clock",
    "univers": "universes",
    "Une seule maison, plusieurs mondes — chacun avec sa vidéo, son souffle.": "One home, many worlds — each with its own video, its own breath.",
    "Comprendre les marchés, sans jargon. Éducation. Gratuit.": "Understand the markets, no jargon. Education. Free.",
    "Ta vie, racontée, gardée, transmise.": "Your life, told, kept, passed on.",
    "Tes questions de droit, expliquées simplement.": "Your legal questions, explained simply.",
    "Bien-être": "Well-being",
    "Réflexologie, reiki, art de vivre méditerranéen.": "Reflexology, reiki, Mediterranean art of living.",
    "Le son de l'univers NAVLYS, en continu.": "The sound of the NAVLYS universe, around the clock.",
    "Créateurs, IA et tendances — le décryptage.": "Creators, AI and trends — the breakdown.",
    "Bientôt :": "Coming soon:",
    "ta voix": "your voice",
    "raconte ta vie": "tells your life",
    "Tu parles, NAVLYS t'écoute et te répond — à la voix, depuis ton téléphone. Déjà vivant sur le guichet.": "You speak, NAVLYS listens and answers you — by voice, from your phone. Already live at the desk.",
    "À la voix": "By voice",
    "NAVLYS — un écran de cinéma vivant. Tout respire, tout s'anime.": "NAVLYS — a living cinema screen. Everything breathes, everything comes alive.",
    "Espace d'information générale, statut simple citoyen.": "A space for general information, ordinary-citizen status.",

    /* ==================== finance.html ==================== */
    "‹ Accueil": "‹ Home",
    "Ton cockpit du jour,": "Your cockpit for the day,",
    "en euros et en bon sens.": "in euros and common sense.",
    "Le brief du matin, ta strategie en 1 clic, et un simulateur qui te montre — chiffre en euros — comment la serenite fait grandir ton argent. NAVLYS prepare ; toi, tu gardes la barre.": "The morning brief, your strategy in 1 click, and a simulator that shows you — counted in euros — how serenity grows your money. NAVLYS prepares; you keep the helm.",
    "GRATUIT · 0 € · pure education & veille": "FREE · €0 · pure education & watch",
    "🧠 Le cockpit autonome — le brief du jour": "🧠 The autonomous cockpit — the daily brief",
    "Chaque jour,": "Every day,",
    "rassemble les infos cles et te les presente. Tu vois, tu regles,": "gathers the key info and lays it out for you. You see, you adjust,",
    "tu approuves": "you approve",
    "Toi seul lances tes ordres": "You alone place your orders",
    "— NAVLYS te prepare tout, tu gardes la barre.": "— NAVLYS prepares everything for you, you keep the helm.",
    "Apercu de beta : exemples pedagogiques.": "Beta preview: educational examples.",
    "Aujourd'hui": "Today",
    "Marches :": "Markets:",
    "sur les semis IA, le flux d'options sort souvent le signal avant la presse.": "on AI chips, options flow often reveals the signal before the press.",
    "(a verifier)": "(to be verified)",
    "Cap serein :": "Serene course:",
    "90 % a l'abri, 10 % pour apprendre. Pas de pari sur la maison.": "90% safe, 10% to learn. No betting the house.",
    "Watchlist suivie :": "Watchlist tracked:",
    "(suivi, pas un conseil)": "(tracking, not advice)",
    "🎚 Tes reglages du jour": "🎚 Your settings for the day",
    "Part « ecole » que": "The « learning » share that",
    "acceptes de voir bouger :": "you accept to see move:",
    "Recevoir le brief chaque matin": "Receive the brief every morning",
    "Me proposer des parametres d'achat/vente": "Suggest buy/sell settings",
    "a approuver": "to approve",
    "Toujours me demander avant tout —": "Always ask me before anything —",
    "toujours ta validation 🔒": "always your approval 🔒",
    "✅ J'approuve mes reglages": "✅ I approve my settings",
    "🎯 Ta strategie du jour — en 1 clic": "🎯 Your strategy for the day — in 1 click",
    "Dis-moi ton enveloppe du jour, et NAVLYS te prepare un": "Tell me your budget for the day, and NAVLYS prepares you a",
    "plan clair": "clear plan",
    ": la repartition sereine en euros, la watchlist, et": ": the serene split in euros, the watchlist, and",
    "le cap du capitaine": "the captain's course",
    ". Tu l'adoptes... ou tu traces ta route. Rien n'est execute.": ". You adopt it... or you chart your own route. Nothing is executed.",
    "💵 Mon enveloppe du jour": "💵 My budget for the day",
    "⚡ Preparer ma journee": "⚡ Prepare my day",
    "🧮 Ton plan serein du jour": "🧮 Your serene plan for the day",
    "🛟 Part a l'abri (90 %)": "🛟 Safe share (90%)",
    "🎓 Part « ecole » (10 %)": "🎓 « Learning » share (10%)",
    "👀 Tu suis (pas un conseil)": "👀 You track (not advice)",
    "« Le cap du jour : rester serein, ne pas courir le jackpot. Le vrai gain, c'est la constance. »": "« The course of the day: stay serene, don't chase the jackpot. The real gain is consistency. »",
    "⚓ Je garde le cap": "⚓ I keep the course",
    "🧮 Je trace ma route": "🧮 I chart my own route",
    "📰 Les news du jour — avant-gout": "📰 Today's news — a first taste",
    "Chaque jour, NAVLYS CORE prepare 3 magazines. En voici l'amorce ; l'integrale est reservee aux abonnes.": "Every day, NAVLYS CORE prepares 3 magazines. Here's the opener; the full version is reserved for members.",
    "📈 NAVLYS Bourse —": "📈 NAVLYS Markets —",
    "Paris tient bon malgre la tempete geopolitique...": "Paris holds firm despite the geopolitical storm...",
    "... analyse complete et lecon du jour reservees aux abonnes.": "... full analysis and lesson of the day reserved for members.",
    "🤖 Journal de l'IA —": "🤖 The AI Journal —",
    "GPT-5.5, Gemini 3.1, agents partout : ce qui change pour les gens normaux...": "GPT-5.5, Gemini 3.1, agents everywhere: what changes for ordinary people...",
    "... le decryptage entier reserve aux abonnes.": "... the full breakdown reserved for members.",
    "✨ Influenceurs —": "✨ Influencers —",
    "les createurs IA passent le milliard, mais l'authenticite reste reine...": "AI creators pass the billion mark, but authenticity stays queen...",
    "... la suite reservee aux abonnes.": "... the rest reserved for members.",
    "🔒 Debloque": "🔒 Unlock",
    "l'integralite des journaux": "the full journals",
    ", chaque jour.": ", every day.",
    "a partir de 9,99 €": "from €9.99",
    "HT / mois": "excl. tax / month",
    "M'abonner": "Become a member",
    "Echelle NAVLYS (HT) : Gratuit · 9,99 · 29,99 · 49,99 · 99,99 €...": "NAVLYS scale (excl. tax): Free · 9.99 · 29.99 · 49.99 · 99.99 €...",
    "🧪 Le simulateur du bon sens": "🧪 The common-sense simulator",
    "Bouge les curseurs. Tu compares deux attitudes avec": "Move the sliders. You compare two mindsets with",
    "le meme argent": "the same money",
    ": tout miser sur le coup de poker, ou avancer en bon pere/mere de famille (90/10). Tout est en euros, net d'un cout de frais estime.": ": betting it all on a poker move, or moving forward prudently (90/10). Everything is in euros, net of an estimated fee cost.",
    "💵 Ce que tu mets de cote au depart :": "💵 What you set aside at the start:",
    "📅 Pendant combien d'annees :": "📅 For how many years:",
    "➕ Ce que tu ajoutes chaque mois :": "➕ What you add each month:",
    "🎰 L'approche coup de poker": "🎰 The poker-move approach",
    "Tout miser pour gagner gros, vite.": "Bet it all to win big, fast.",
    "Si ca passe :": "If it works out:",
    "Le plus souvent, il en reste :": "Most of the time, what's left:",
    "🧮 L'approche 90/10 sereine": "🧮 The serene 90/10 approach",
    "90 % au calme, 10 % pour apprendre.": "90% at rest, 10% to learn.",
    "Ce que ca construit, tranquillement :": "What it builds, quietly:",
    "Ecart de protection": "Protection gap",
    "Illustration pedagogique hypothetique — ce ne sont pas des previsions ni des rendements promis.": "Hypothetical educational illustration — these are neither forecasts nor promised returns.",
    "La vraie lecon :": "The real lesson:",
    "le vrai gain arrive quand tu rassembles tes forces et gardes le cap.": "the real gain comes when you gather your strength and keep the course.",
    "La discipline d'un bon pere de famille bat le coup de poker sur la duree, parce qu'elle": "Prudent discipline beats the poker move over time, because it",
    "protege ce que tu construis": "protects what you build",
    "NAVLYS Finance est un outil d'education et de veille a vocation informative uniquement.": "NAVLYS Finance is an education and watch tool for informational purposes only.",
    "Il ne fournit aucun conseil personnalise en investissement, ni recommandation d'achat ou de vente, et ne promet aucun rendement. « Le cap du capitaine » est une attitude generale et pedagogique, pas un signal ni une incitation a agir — chacun decide librement. Les marches comportent un risque de perte. NAVLYS ne dispose d'aucun agrement d'intermediaire financier. Tous les tarifs sont indiques": "It provides no personalized investment advice, no buy or sell recommendation, and promises no return. « The captain's course » is a general, educational attitude, not a signal or an incentive to act — everyone decides freely. Markets carry a risk of loss. NAVLYS holds no financial intermediary license. All rates are shown",
    ". Reserve aux 18 ans et +.": ". 18+ only.",
    "🌊 ⚓ NAVLYS 🪝 — « L'IA est le vent, c'est toi qui tiens la barre. »": "🌊 ⚓ NAVLYS 🪝 — « AI is the wind, you hold the helm. »",

    /* ==================== next-gen.html ==================== */
    "Écris ta vie": "Write your life",
    "Rejoindre": "Join",
    "Biographie vivante · Mémoire · Transmission": "Living biography · Memory · Legacy",
    "il y a bien longtemps, dans une vie lointaine…": "long ago, in a distant life…",
    "Ta vie,": "Your life,",
    "racontée": "told",
    ". Gardée. Transmise.": ". Kept. Passed on.",
    "Pas un livre. Pas un album. Une biographie vivante qui s'enrichit, se partage, se transmet. Pour les tiens, et pour ceux qui viendront.": "Not a book. Not an album. A living biography that grows, is shared, is passed on. For your loved ones, and for those to come.",
    "Lancement": "Launch",
    "Ouverture le": "Opening on",
    "Jours": "Days",
    "Heures": "Hours",
    "✦ Écris ta vie": "✦ Write your life",
    "📧 Être prévenu": "📧 Get notified",
    "Réserver ma place": "Reserve my spot",
    "Éducation & mémoire personnelle. Tes contenus restent ta propriété. Pas de revente de données, pas de pub.": "Education & personal memory. Your content stays yours. No data resale, no ads.",
    "Manifeste": "Manifesto",
    "Nous portons tous une histoire.": "We all carry a story.",
    "Des moments, des passages, des choix, des silences.": "Moments, passages, choices, silences.",
    "Cette histoire, elle s'efface si on ne la garde pas.": "That story fades if we don't keep it.",
    "NAVLYS Next Gen n'est pas un livre figé. C'est": "NAVLYS Next Gen is not a frozen book. It's",
    "une biographie vivante": "a living biography",
    ": qui se construit avec toi, qui s'enrichit chaque saison, qui se partage avec ceux que tu choisis, et qui se transmet — pour que tes enfants, tes petits-enfants, et même les inconnus que tu n'as jamais rencontrés, puissent lire ce que tu as vécu.": ": one that builds with you, grows each season, is shared with those you choose, and is passed on — so your children, your grandchildren, and even strangers you never met can read what you lived.",
    "Ce n'est pas que des mots. Ce sont aussi": "It's not only words. It's also",
    "tes photos, tes voix, tes vidéos, tes objets fétiches, tes lieux, tes recettes, tes chansons": "your photos, your voices, your videos, your cherished objects, your places, your recipes, your songs",
    ". Tout ce qui fait ta couleur. Tout ce qui fait ta sève.": ". Everything that makes your color. Everything that makes your sap.",
    "Parce que la transmission, ce n'est pas l'héritage notarié. C'est": "Because legacy isn't the notarized inheritance. It's",
    "le rire qu'on raconte 30 ans après, l'odeur d'une cuisine qu'on retrouve dans un parfum, le geste qu'un petit-fils refait sans savoir d'où il vient": "the laugh retold 30 years later, the smell of a kitchen found again in a perfume, the gesture a grandson repeats without knowing where it comes from",
    "NAVLYS Next Gen, c'est ta vie qui devient un héritage qu'on peut": "NAVLYS Next Gen is your life becoming a legacy you can",
    "encore toucher du doigt": "still touch with a fingertip",
    "5 chemins": "5 paths",
    "Une seule application, 5 façons d'entrer dans ta biographie.": "One single app, 5 ways to enter your biography.",
    "La Vie": "Life",
    "Les grandes étapes de ton parcours : enfance, jeunesse, rencontres, voyages, métiers, épreuves, victoires.": "The great milestones of your journey: childhood, youth, encounters, travels, careers, trials, victories.",
    "La Mémoire": "Memory",
    "Les moments qui t'ont fait. Les voix, les visages, les odeurs. Sauvegardés en haute qualité, à vie.": "The moments that made you. The voices, the faces, the scents. Saved in high quality, for life.",
    "La Transmission": "Legacy",
    "Ce que tu veux léguer. Tes valeurs, tes leçons, tes recettes. Reçus par ceux que tu choisis.": "What you want to hand down. Your values, your lessons, your recipes. Received by those you choose.",
    "Le Bien-être": "Well-being",
    "Écrire ta vie soigne. Réflexologie, reiki, méditations à puiser dans ton propre récit.": "Writing your life heals. Reflexology, reiki, meditations drawn from your own story.",
    "La Passion": "Passion",
    "Ce qui te fait vibrer aujourd'hui — musique, mer, sport, art, métier. Mis en lumière, partagé.": "What thrills you today — music, sea, sport, art, craft. Brought to light, shared.",
    "Next Gen — Ta vie, racontée": "Next Gen — Your life, told",
    "NAVLYS Next Gen est un service de biographie vivante à usage personnel et familial. Les contenus que tu déposes restent ta propriété. NAVLYS assure le stockage sécurisé et la transmission selon tes choix. Pas de revente de tes données. Pas de pub.": "NAVLYS Next Gen is a living-biography service for personal and family use. The content you upload stays yours. NAVLYS provides secure storage and transmission according to your choices. No resale of your data. No ads.",
    "©2026 NAVLYS Next Gen par Bruno Mark Partouche": "©2026 NAVLYS Next Gen by Bruno Mark Partouche",

    /* ==================== next-gen-atelier.html ==================== */
    "L'Atelier vivant": "The Living Workshop",
    "Raconte ta vie, à la voix": "Tell your life, by voice",
    "Ajoute tes photos, tes documents, tes vidéos. NAVLYS les regarde, te pose des questions comme un ami, puis monte tout — récit, voix, musique — avec des effets créatifs.": "Add your photos, your documents, your videos. NAVLYS looks at them, asks you questions like a friend, then edits it all — story, voice, music — with creative effects.",
    "1 · Dépose tes souvenirs": "1 · Drop in your memories",
    "Touche ici pour ajouter": "Tap here to add",
    "photos, vidéos, documents": "photos, videos, documents",
    "Rien n'est publié. Tout reste à toi.": "Nothing is published. Everything stays yours.",
    "▶ Commencer l'entretien à la voix": "▶ Start the voice interview",
    "Souvenir 1": "Memory 1",
    "Passer": "Skip",
    "Autre question": "Another question",
    "Suivant →": "Next →",
    "3 · Ta vie, mise en scène": "3 · Your life, staged",
    "▶ Lire le déroulé": "▶ Play the sequence",
    "✨ Nouvelle version (fondus / morphing)": "✨ New version (fades / morphing)",
    "📣 Ma promo du jour": "📣 My promo of the day",
    "Le récit corrigé et « donné vie » s'affiche pendant la lecture. Bientôt : coloriage des vieilles photos, vidéos et musique générées (étape IA, sur ton accord).": "The corrected and « brought-to-life » story appears during playback. Coming soon: colorizing old photos, generated videos and music (AI step, with your consent).",
    "Voix de NAVLYS (activer/couper)": "NAVLYS voice (on/off)",
    "Répondre à la voix": "Answer by voice",
    "Parle, ou écris ta réponse…": "Speak, or type your answer…",

    /* ==================== club.html ==================== */
    "Club NAVLYS · membres": "Club NAVLYS · members",
    "Récompenses VIP": "VIP Rewards",
    "Recommande NAVLYS autour de toi, gagne des crédits, et débloque des": "Recommend NAVLYS around you, earn credits, and unlock",
    "mois offerts": "free months",
    "et des surclassements. Toi aussi, deviens un pilier de l'équipage.": "and upgrades. You too, become a pillar of the crew.",
    "Ta progression": "Your progress",
    "2 500 crédits · 1 an offert 🎁": "2,500 credits · 1 year free 🎁",
    "Chaque personne à qui tu envoies notre recommandation (avec un petit mot) et que tu nous prouves =": "Each person you send our recommendation to (with a short note) and prove to us =",
    "10 crédits": "10 credits",
    ". 10 personnes = 100 crédits. 50 = 500. Et ça s'accumule.": ". 10 people = 100 credits. 50 = 500. And it adds up.",
    "Ce que tu débloques": "What you unlock",
    "Surclassement 1 mois": "1-month upgrade",
    "— goûte la version supérieure, offerte.": "— taste the higher tier, on us.",
    "3 mois offerts": "3 free months",
    "sur ta cotisation.": "on your membership.",
    "6 mois offerts": "6 free months",
    "1 an offert": "1 year free",
    "— l'offre découverte 9,90 €, gratuite un an entier.": "— the €9.90 discovery offer, free for a whole year.",
    "Prouve ta recommandation": "Prove your recommendation",
    "Tu as envoyé une de nos pubs à des amis avec un petit mot ? Dis-le-nous — on valide, on te crédite.": "Sent one of our ads to friends with a short note? Tell us — we verify, we credit you.",
    "Ton e-mail (membre)": "Your email (member)",
    "Combien de personnes as-tu touchées ?": "How many people did you reach?",
    "Ta preuve (colle les prénoms/liens, décris ton envoi)": "Your proof (paste the first names/links, describe your send)",
    "Envoyer ma preuve →": "Send my proof →",
    "Anti-triche : les crédits sont validés à la main avant d'être portés à ton compte. Pas de bot, jamais.": "Anti-cheat: credits are validated by hand before being added to your account. No bots, ever.",
    "Tu as une audience ? Deviens affilié": "Have an audience? Become an affiliate",
    "La commission la plus élevée du marché.": "The highest commission on the market.",
    "Là où les autres offrent 20 à 30 %, NAVLYS te reverse": "Where others offer 20 to 30%, NAVLYS pays you back",
    "40 % récurrents, à vie": "40% recurring, for life",
    ", sur chaque membre que tu amènes. Tu gagnes tant qu'il reste. Client = partenaire = affilié.": ", on every member you bring. You earn as long as they stay. Customer = partner = affiliate.",
    "Paliers bonus : plus tu amènes de membres, plus ton taux grimpe. Kit de contenu fourni, liens de suivi, paiement transparent.": "Bonus tiers: the more members you bring, the higher your rate climbs. Content kit provided, tracking links, transparent payment.",
    "Influenceurs & presse": "Influencers & press",
    "Créateurs, journalistes : on t'ouvre une": "Creators, journalists: we open you a",
    "version découverte gratuite": "free discovery version",
    "pour tester et raconter NAVLYS à ta communauté. Une histoire rare à raconter :": "to test and tell NAVLYS to your community. A rare story to tell:",
    "une entreprise d'une seule personne, pilotée par un cerveau IA, qui fait tout — pendant que son fondateur est encore salarié.": "a one-person company, run by an AI brain that does everything — while its founder is still an employee.",
    "Écris-nous.": "Write to us.",
    "Les premiers embarqués sont les mieux récompensés. Le large t'attend. 🌊": "The first aboard are the best rewarded. The open sea awaits you. 🌊",
    "Club NAVLYS · statut simple citoyen — information générale, aucune promesse de rendement. Les crédits ouvrent des accès au contenu, pas des produits financiers.": "Club NAVLYS · ordinary-citizen status — general information, no promise of return. Credits unlock access to content, not financial products.",
    "J'ai envoyé la pub NAVLYS à 20 amis sur WhatsApp avec le message : « … »": "I sent the NAVLYS ad to 20 friends on WhatsApp with the message: « … »",

    /* ==================== promo.html ==================== */
    "↺ Rejouer": "↺ Replay",
    "comme un film.": "like a film.",
    "Tes photos. Ta voix. Tes souvenirs.": "Your photos. Your voice. Your memories.",
    "l'atelier qui t'écoute": "the workshop that listens to you",
    "On te pose les bonnes questions —": "We ask you the right questions —",
    "comme un ami, sans te presser.": "like a friend, without rushing you.",
    "Tu parles. NAVLYS assemble le récit, les fondus, le son.": "You speak. NAVLYS assembles the story, the fades, the sound.",
    "le sens de GEN": "the meaning of GEN",
    "Ta génération. Ta généalogie.": "Your generation. Your genealogy.",
    "Ta génétique.": "Your genetics.",
    "L'histoire qui ne se raconte qu'une seule fois — la tienne.": "The story told only once — yours.",
    "notre philosophie": "our philosophy",
    "Plaisir.": "Pleasure.",
    "Sérénité.": "Serenity.",
    "Prends le temps. NAVLYS s'occupe du reste.": "Take your time. NAVLYS handles the rest.",
    "accès anticipé — ouvert": "early access — open",
    "Le film de ta vie, à portée de voix.": "The film of your life, within voice reach.",
    "embarque": "come aboard",
    "Commence ton atelier — c'est déjà en ligne.": "Start your workshop — it's already online.",
    "✦ Ouvrir l'atelier": "✦ Open the workshop",
    "↗ Partager": "↗ Share",
    "NAVLYS — statut simple citoyen · information générale, jamais de conseil personnalisé.": "NAVLYS — ordinary-citizen status · general information, never personalized advice.",

    /* ==================== assistance.html ==================== */
    "Assistance vocale": "Voice assistance",
    "en ligne": "online",
    "Parle, on t'écoute": "Speak, we're listening",
    "Appuie sur le micro et parle — ou écris. L'assistant te répond, à la voix.": "Press the mic and speak — or type. The assistant answers you, by voice.",
    "Espace d'information générale. Pas de conseil financier ou juridique personnalisé. La voix fonctionne sur ton navigateur (gratuite, rien n'est envoyé à un tiers pour la transcription).": "A space for general information. No personalized financial or legal advice. The voice runs in your browser (free, nothing is sent to a third party for transcription).",
    "Toi": "You",
    "NAVLYS écrit": "NAVLYS is typing",
    "Bonjour 🌊 Je suis l’assistant NAVLYS. Tu peux me parler ou m’écrire — une question sur nos applications, ton compte, ou autre chose ?": "Hi 🌊 I'm the NAVLYS assistant. You can speak or write to me — a question about our apps, your account, or something else?",
    "Je note ta demande, l’équipe revient vers toi vite. 🌊": "I've noted your request, the team will get back to you soon. 🌊",
    "Voix de réponse (activer/couper)": "Reply voice (on/off)",
    "Parler": "Speak",
    "Envoyer": "Send",
    "Ton prénom (optionnel)": "Your first name (optional)",
    "Email ou téléphone (optionnel)": "Email or phone (optional)",
    "Parle ou écris…": "Speak or type…",

    /* ==================== bibles.html ==================== */
    "La référence unique de l'entreprise": "The company's single reference",
    "Le Classeur des Bibles": "The Binder of Bibles",
    "Chaque bible reprend toute la philosophie et tout ce qui concerne son sujet. Déplie celle que tu veux lire. En cas de contradiction,": "Each bible gathers all the philosophy and everything about its subject. Unfold the one you want to read. In case of contradiction,",
    "la Bible NAVLYS fait foi": "the NAVLYS Bible prevails",
    "Présentation — Bruno Mark Partouche": "Introduction — Bruno Mark Partouche",
    ", porteur et capitaine de NAVLYS, basé en Israël. Homme d'univers et de transmission : il bâtit une maison d'applications où": ", bearer and captain of NAVLYS, based in Israel. A man of universes and legacy: he builds a house of apps where",
    "l'humain tient la barre et l'IA est le vent": "the human holds the helm and AI is the wind",
    "Posture": "Stance",
    "Statut : simple citoyen.": "Status: ordinary citizen.",
    "Aucun agrément (ni CIF, ni ORIAS). Il partage de l'": "No license (neither CIF nor ORIAS). He shares",
    "éducation et de l'information": "education and information",
    ", jamais un conseil personnalisé.": ", never personalized advice.",
    "Invisible derrière NAVLYS.": "Invisible behind NAVLYS.",
    "La réputation va de Bruno vers NAVLYS, jamais l'inverse. Ses e-mails et sa vie privée restent privés.": "Reputation flows from Bruno to NAVLYS, never the reverse. His emails and private life stay private.",
    "Honnêteté radicale": "Radical honesty",
    "et respect de chacun (accessibilité pour tous, langage simple et imagé, marin).": "and respect for everyone (accessibility for all, simple, vivid, seafaring language).",
    "Cadre": "Framework",
    "Société israélienne (fiscalité en Israël, banque Mizrahi à Ashkelon). NAVLYS encaisse via plusieurs prestataires pour ne jamais être bloqué et couvrir la France, l'Europe, le Royaume-Uni et la Suisse.": "Israeli company (taxation in Israel, Mizrahi bank in Ashkelon). NAVLYS collects via several providers to never be blocked and to cover France, Europe, the United Kingdom and Switzerland.",
    "Univers de référence & inspiration : le prestige et l'héritage d'un grand groupe familial — la transmission, la tenue, le long terme.": "Reference universe & inspiration: the prestige and heritage of a great family group — legacy, poise, the long term.",
    "Présentation — Le projet NAVLYS": "Introduction — The NAVLYS project",
    "= un univers d'applications nouvelle génération réunissant l'humain et l'IA,": "= a universe of next-generation apps bringing together the human and AI,",
    "accessible à tous, au téléphone et à la voix": "accessible to all, on the phone and by voice",
    ". Éducation, veille, communauté, média, affiliation.": ". Education, watch, community, media, affiliation.",
    "Le cerveau : NAVLYS CORE": "The brain: NAVLYS CORE",
    "14 agents de département": "14 department agents",
    ", autonomes, orchestrés par": ", autonomous, orchestrated by",
    ". Ils préparent, Bruno valide.": ". They prepare, Bruno approves.",
    "Tourne": "Runs",
    "24/7 sur Supabase": "24/7 on Supabase",
    "(missions, mémoire, journal, routines pg_cron). Affichage sur": "(missions, memory, journal, pg_cron routines). Display on",
    "Corps vivant :": "Living body:",
    "auto-test & auto-amélioration récursive": "recursive self-testing & self-improvement",
    "(un cran de mieux chaque jour),": "(a notch better every day),",
    "auto-cicatrisation des incidents": "incident self-healing",
    "veille de résilience": "resilience watch",
    "(rester 100 % autonome).": "(staying 100% autonomous).",
    "Les univers (applications)": "The universes (apps)",
    "— éducation, méthode 90/10, veille marché. Gratuit.": "— education, 90/10 method, market watch. Free.",
    "— ta vie racontée, gardée, transmise (biographie vivante).": "— your life told, kept, passed on (living biography).",
    "— questions de droit expliquées simplement (3 offertes).": "— legal questions explained simply (3 on the house).",
    "Bien-être · Radio · Journal des Influenceurs": "Well-being · Radio · Influencers Journal",
    "— l'art de vivre NAVLYS.": "— the NAVLYS art of living.",
    ": 1er juillet 2026. QG :": ": July 1st, 2026. HQ:",
    "Philosophie & options communes à toutes les apps": "Philosophy & options common to all the apps",
    "L'esprit": "The spirit",
    "Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif.": "One course, one hand, one day. NAVLYS guides you to your goal in a single gesture.",
    "» L'IA est le vent, c'est toi qui tiens la barre. Chaleureux, humain, jamais robotique, images marines discrètes.": "» AI is the wind, you hold the helm. Warm, human, never robotic, with discreet seafaring imagery.",
    "Les 5 règles d'or (non négociables)": "The 5 golden rules (non-negotiable)",
    "1. Aucun débit": "1. No debit",
    "d'argent sans validation de Bruno.": "of money without Bruno's approval.",
    "2. Aucune publication / e-mail / déploiement": "2. No publication / email / deployment",
    "sensible sans validation.": "sensitive without approval.",
    "3. Statut simple citoyen": "3. Ordinary-citizen status",
    "respecté dans chaque livrable (éducation, jamais de conseil perso).": "respected in every deliverable (education, never personal advice).",
    "4. Charte visuelle": "4. Visual identity",
    "respectée (voir la bible dédiée).": "respected (see the dedicated bible).",
    "5. Tout livrable sensible → statut": "5. Every sensitive deliverable → status",
    "à valider": "to validate",
    ", Bruno tranche.": ", Bruno decides.",
    "Options communes (dans chaque application)": "Common options (in every app)",
    "Écran de cinéma vivant": "Living cinema screen",
    ": barre haute fine + barre basse de navigation, décor marin qui respire, voiliers à l'horizon, logo animé.": ": a thin top bar + bottom navigation bar, breathing seafaring backdrop, sailboats on the horizon, animated logo.",
    "Tout à la voix": "Everything by voice",
    "(parler/écouter) et": "(speak/listen) and",
    "installable": "installable",
    "comme une appli mobile (PWA).": "like a mobile app (PWA).",
    "Accessibilité": "Accessibility",
    "pour tous : police lisible, A−/A+, focus visibles, mouvement réduit, mobile-first.": "for all: legible font, A−/A+, visible focus, reduced motion, mobile-first.",
    "Multilingue": "Multilingual",
    "(13 langues visées) +": "(13 languages targeted) +",
    "voix doublée": "dubbed voice",
    "anglais/russe quand le contenu est prêt.": "English/Russian when the content is ready.",
    "Aide & SAV vocal": "Voice Help & Support",
    "intégré, mêmes couleurs, mêmes valeurs, partout.": "built in, same colors, same values, everywhere.",
    "Doctrine de Bruno : réponse par défaut = OUI. Jamais de blocage : si pas de réponse, on avance seul en sécurité ou on escalade à MasterNav.": "Bruno's doctrine: default answer = YES. Never stuck: with no answer, we move forward safely alone or escalate to MasterNav.",
    "Bible NAVLYS — Référence (identité, prix, infra)": "NAVLYS Bible — Reference (identity, pricing, infra)",
    "Identité & cadre légal": "Identity & legal framework",
    "Porteur : Bruno Mark Partouche. Statut simple citoyen, contenu éducatif uniquement. Domaine : navlys.com.": "Bearer: Bruno Mark Partouche. Ordinary-citizen status, educational content only. Domain: navlys.com.",
    "Politique de prix (HT)": "Pricing policy (excl. tax)",
    "Paliers d'abonnement :": "Membership tiers:",
    "Coffret Fêtes (1 an + biographie) : 99,99 €.": "Holiday Box (1 year + biography): €99.99.",
    "Rail principal": "Main rail",
    "; rails secondaires PayPal / Merchant of Record (Lemon Squeezy / Paddle) pour la TVA et l'anti-blocage.": "; secondary rails PayPal / Merchant of Record (Lemon Squeezy / Paddle) for VAT and anti-blocking.",
    "Infrastructure réelle": "Actual infrastructure",
    "Base :": "Database:",
    "Web :": "Web:",
    "(navlys.com). Cerveau permanent optionnel : Hetzner (worker Python).": "(navlys.com). Optional permanent brain: Hetzner (Python worker).",
    "LLM : OpenRouter → Claude / Hermès. Modèles Anthropic : Opus 4.8 (sensible), Sonnet (courant), Haiku (rapide).": "LLM: OpenRouter → Claude / Hermès. Anthropic models: Opus 4.8 (sensitive), Sonnet (everyday), Haiku (fast).",
    "Les 14 agents": "The 14 agents",
    "Charte visuelle & identité": "Visual identity & branding",
    "Couleurs": "Colors",
    "respirant partout (": "breathing everywhere (",
    "Champagne / or": "Champagne / gold",
    "réservé au logo, aux animations et aux accents (": "reserved for the logo, animations and accents (",
    ", bronze": ", bronze",
    "Fond": "Background",
    "sombre": "dark",
    "Interdit absolu": "Absolutely forbidden",
    ": pourpre / mauve / fuchsia.": ": purple / mauve / fuchsia.",
    "Typographies": "Typography",
    "Cinzel (titres), Cormorant Garamond & Fraunces italic (corps), Lora (courant). Élégance, respiration, sillon lumineux.": "Cinzel (titles), Cormorant Garamond & Fraunces italic (body), Lora (regular). Elegance, breath, a luminous furrow.",
    "Signature vivante": "Living signature",
    "logo = pièce NAVLYS bronze": "logo = bronze NAVLYS coin",
    "qui tourne avec halo ice qui bat à 60 BPM. Décor marin cinématique : ciel→mer, horizon, aurores, particules,": "spinning with an ice halo beating at 60 BPM. Cinematic seafaring backdrop: sky→sea, horizon, auroras, particles,",
    "voiliers de l'Équipage": "sailboats of the Crew",
    ". Aucun menu mort, tout original NAVLYS.": ". No dead menus, everything original NAVLYS.",
    "Finance — Méthode 90/10 & Martingale idéale": "Finance — 90/10 Method & the ideal Martingale",
    "Éducation et information uniquement. Statut simple citoyen : aucun conseil personnalisé, aucune promesse de rendement. Tu décides et tu gères tout.": "Education and information only. Ordinary-citizen status: no personalized advice, no promise of return. You decide and you manage everything.",
    "La méthode 90/10": "The 90/10 method",
    ": socle serein, « bon père de famille », chiffré en": ": a serene base, « prudent steward », counted in",
    "euros réels": "real euros",
    ", anti-jackpot.": ", anti-jackpot.",
    ": part de risque assumée, encadrée, pédagogique — jamais l'épargne de survie.": ": a deliberate, framed, educational risk share — never your survival savings.",
    "Objectif pédagogique : comprendre, pas parier. Chaque idée du jour = une leçon, avec ses disclaimers.": "Educational goal: understand, not gamble. Each idea of the day = a lesson, with its disclaimers.",
    "La « martingale idéale » — recherche permanente": "The « ideal martingale » — ongoing research",
    "Chaque jour, NAVLYS croise": "Every day, NAVLYS cross-checks",
    "l'information du web": "information from the web",
    "les tendances boursières constatées": "observed market trends",
    "pour repérer le": "to spot the",
    "fait inhabituel récurrent": "recurring unusual fact",
    "— dans un journal d'info, chez une personne suivie sur le web, ou sur des": "— in a news outlet, from a person followed on the web, or on",
    "courbes précises connues": "known precise curves",
    "— qui oriente vers les": "— that points toward the",
    "bons choix du jour": "good choices of the day",
    "pour la part de risque quotidienne, toujours dans le cadre": "for the daily risk share, always within the",
    "Sources croisées : presse & réseaux, données marché (via notre API Alpaca en paper/test), courbes de référence.": "Cross-checked sources: press & social, market data (via our Alpaca API in paper/test), reference curves.",
    "On cherche le": "We look for the",
    "signal récurrent": "recurring signal",
    "(le même fait anormal qui revient), pas le coup de chance isolé.": "(the same abnormal fact that keeps returning), not the isolated stroke of luck.",
    "Sortie : une": "Output: a",
    "note pédagogique du jour": "educational note of the day",
    "(le « cap »), avec le raisonnement et les garde-fous — jamais un ordre.": "(the « course »), with the reasoning and the safeguards — never an order.",
    "Outils déjà en place": "Tools already in place",
    ": lecture live du compte (Alpaca paper) via notre API.": ": live account reading (Alpaca paper) via our API.",
    "Veille Bourse quotidienne + mini-leçons 90/10 (agents NAVFI).": "Daily market watch + 90/10 mini-lessons (NAVFI agents).",
    "Partenaires brokers (affiliation, statut #partenaire) : Alpaca, eToro, Trade Republic… — jamais d'encaissement de fonds clients par NAVLYS.": "Broker partners (affiliation, #partner status): Alpaca, eToro, Trade Republic… — NAVLYS never collects client funds.",
    "Guide Marketing complet": "Complete Marketing Guide",
    "Principe": "Principle",
    "Multiplier les vues à coût maîtrisé,": "Multiply views at controlled cost,",
    "sans bot": "no bots",
    "(la réputation est l'actif n°1, zéro auto-like/DM = zéro bannissement). Langage simple imagé maritime, aperçu mobile avant tout post,": "(reputation is asset n°1, zero auto-like/DM = zero ban). Simple, vivid maritime language, mobile preview before every post,",
    "jamais d'auto-publication": "never auto-publishing",
    "Canaux": "Channels",
    "13 réseaux": "13 networks",
    "principaux + quick-wins (Reddit, Substack, Discord…). Bios FR+EN prêtes, routine 1 clic.": "main ones + quick-wins (Reddit, Substack, Discord…). FR+EN bios ready, 1-click routine.",
    "Jeu d'invitation / parrainage": "Invitation / referral game",
    "conforme": "compliant",
    "(croissance organique 1–2 inscrits/heure, sans bot).": "(organic growth 1–2 sign-ups/hour, no bots).",
    "Première vague de lancement + calendrier 44 jours (J-13 → J+30).": "First launch wave + 44-day calendar (D-13 → D+30).",
    "Offres & upsell": "Offers & upsell",
    "Teste gratuitement (0 €) → montée en gamme douce (−50 % palier supérieur, surclassement cadeau).": "Try it free (€0) → gentle upsell (−50% on the higher tier, free upgrade).",
    "Packs cadeau à code (+1 an offert à un ami). Coffrets déclinés selon les univers.": "Gift code packs (+1 free year for a friend). Boxes tailored to each universe.",
    "Client =": "Customer =",
    "partenaire + client + affilié": "partner + customer + affiliate",
    "(gagnant-gagnant).": "(win-win).",
    "Veille permanente": "Ongoing watch",
    "Chaque jour, NAVLYS enrichit ses bases": "Every day, NAVLYS enriches its knowledge bases",
    "juridique, marketing, organisation": "legal, marketing, organization",
    "par la recherche web, et grave les acquis dans sa mémoire (corps vivant qui grandit).": "through web research, and etches the gains into its memory (a living body that grows).",
    "Guide Prospection": "Prospecting Guide",
    "Cible": "Target",
    "Toute personne qui veut apprendre, transmettre, ou avancer avec l'IA": "Anyone who wants to learn, pass on, or move forward with AI",
    "sans se faire dépasser": "without being left behind",
    "— accessible à tous, y compris malvoyants et PMR. Entrée douce par le gratuit.": "— accessible to all, including the visually impaired and people with reduced mobility. A gentle entry through the free tier.",
    "Parcours (le tunnel)": "Journey (the funnel)",
    "Découvrir": "Discover",
    "(accueil vivant) →": "(living homepage) →",
    "Tester gratuitement": "Try for free",
    "Adhérer": "Become a member",
    "(abonnement) →": "(membership) →",
    "Transmettre": "Pass it on",
    "(parrainage, cadeau).": "(referral, gift).",
    "Guichet vocal": "Voice desk",
    ": parler ou écrire, réponse à la voix.": ": speak or write, answer by voice.",
    "SAV & appels & messages vocaux → système NAVLYS indépendant (voix du navigateur, gratuit), WhatsApp gratuit en option.": "Support & calls & voice messages → independent NAVLYS system (browser voice, free), free WhatsApp optional.",
    "NAVLYS.IO — la passerelle entrepreneurs": "NAVLYS.IO — the entrepreneurs' gateway",
    "Un entrepreneur dépose son idée en or → NAVLYS co-construit (intéressement + frais de gestion/développement). Prospection B2B via la vitrine io.": "An entrepreneur drops off their golden idea → NAVLYS co-builds (profit share + management/development fees). B2B prospecting via the io showcase.",
    "Règle d'or prospection": "Golden rule of prospecting",
    "Jamais d'insistance, jamais de promesse. On informe, on montre la valeur, on laisse choisir — la réponse par défaut du client doit venir de la": "Never pushy, never a promise. We inform, we show the value, we let people choose — the customer's default answer must come from",
    "confiance": "trust",
    "Sécurité & garde-fous": "Security & safeguards",
    "Jamais de clé/secret dans le code ni dans Git ; secrets côté serveur uniquement (Supabase Edge / Vault).": "Never a key/secret in the code or in Git; secrets server-side only (Supabase Edge / Vault).",
    "Base verrouillée (RLS, fonctions serveur réservées au service_role, buckets privés).": "Locked database (RLS, server functions restricted to service_role, private buckets).",
    "Clés de paiement en test d'abord ; passage en réel maîtrisé.": "Payment keys in test first; a controlled switch to live.",
    "Auto-cicatrisation : tout incident (bug, débit, plainte, alerte mail) est classé, routé, réglé, puis": "Self-healing: every incident (bug, debit, complaint, email alert) is classified, routed, resolved, then",
    "gravé en règle permanente": "etched into a permanent rule",
    "Indépendance : toute dépendance instable est remplacée par une brique interne (objectif 100 % autonome).": "Independence: every unstable dependency is replaced by an internal building block (goal: 100% autonomous).",
    "NAVLYS — Le Classeur des Bibles · vivant, mis à jour en continu.": "NAVLYS — The Binder of Bibles · living, continuously updated.",

    /* ==================== partenaires.html ==================== */
    "Brokers, banques & outils — tous testés.": "Brokers, banks & tools — all tested.",
    "Les liens marqués": "The links marked",
    "« affilié »": "« affiliate »",
    "nous versent une petite commission,": "pay us a small commission,",
    "sans aucun surcoût pour toi": "at no extra cost to you",
    ". On ne référence que ce qu'on utilise vraiment. C'est de l'": ". We only list what we actually use. It's",
    "éducation et de la veille": "education and watch",
    "📈 Brokers actions & ETF": "📈 Stock & ETF brokers",
    "affilié": "affiliate",
    "API · actions US": "API · US stocks",
    "Broker actions US, 0 € de commission, API moderne.": "US stock broker, €0 commission, modern API.",
    "multi-actifs": "multi-asset",
    "Multi-actifs et copy trading.": "Multi-asset and copy trading.",
    "(Investir comporte des risques.)": "(Investing carries risks.)",
    "néo-broker EU": "EU neo-broker",
    "1 €/ordre, plans ETF (DCA) gratuits. Européen.": "€1/order, free ETF (DCA) plans. European.",
    "Référence française pour l'enveloppe fiscale (PEA).": "French reference for the tax-wrapper account (PEA).",
    "Spot crypto, frais bas.": "Spot crypto, low fees.",
    "(Actif volatil, risque élevé.)": "(Volatile asset, high risk.)",
    "Earn et DEX intégré.": "Earn and built-in DEX.",
    "sécurité": "security",
    "Éprouvé depuis 2013, réputé pour sa sécurité.": "Proven since 2013, renowned for its security.",
    "(Risque élevé.)": "(High risk.)",
    "💳 Néo-banques & cash": "💳 Neo-banks & cash",
    "néo-banque": "neo-bank",
    "Multi-devises, pratique au quotidien et en voyage.": "Multi-currency, handy for daily life and travel.",
    "transferts": "transfers",
    "Transferts internationaux au taux réel.": "International transfers at the real rate.",
    "banque en ligne FR": "FR online bank",
    "Combo banque + courtage français, simple.": "French bank + brokerage combo, simple.",
    "⚒️ Outils & communauté": "⚒️ Tools & community",
    "communauté": "community",
    "La plateforme de la communauté privée (Équipage NAVLYS).": "The private community platform (NAVLYS Crew).",
    "organisation": "organization",
    "Notes, wiki, projets. On y centralise le travail.": "Notes, wiki, projects. We centralize the work there.",
    "hébergement": "hosting",
    "Héberge tous nos sites : SSL auto, CDN mondial.": "Hosts all our sites: auto SSL, global CDN.",
    "paiements": "payments",
    "Le standard mondial du paiement en ligne.": "The global standard for online payment.",
    "⚠️ Liste en cours de consolidation (14 partenaires affichés). D'autres seront ajoutés après vérification — on n'invente rien.": "⚠️ List being consolidated (14 partners shown). More will be added after verification — we invent nothing.",
    ". Les contenus ne constituent en aucun cas un conseil personnalisé en investissement. Les liens « affilié » génèrent une commission sans surcoût pour toi. Investir comporte un risque de perte en capital. Chacun reste seul responsable de ses décisions. Réservé aux 18 ans et +. © 2026 NAVLYS · navlys.com": ". The content in no way constitutes personalized investment advice. « Affiliate » links earn a commission at no extra cost to you. Investing carries a risk of capital loss. Everyone remains solely responsible for their decisions. 18+ only. © 2026 NAVLYS · navlys.com",

    /* ==================== next-gen-beta.html ==================== */
    "L'univers": "The universe",
    "Veille": "Watch",
    "Communauté": "Community",
    "Journal IA": "AI Journal",
    "Espace membres": "Members' area",
    "● Beta opérationnelle": "● Operational beta",
    "Un cerveau, une personne, tout un univers.": "One brain, one person, a whole universe.",
    "Un projet d'": "A project of",
    "éducation financière": "financial education",
    "veille stratégique": "strategic watch",
    "communauté privée d'apprentissage": "a private learning community",
    "— porté par un art de vivre méditerranéen. L'IA est le vent ; c'est toi qui tiens la barre.": "— carried by a Mediterranean art of living. AI is the wind; you hold the helm.",
    "Rejoindre la communauté": "Join the community",
    "Découvrir l'univers": "Discover the universe",
    "Ce que tu trouves ici": "What you'll find here",
    "Comprendre, décrypter, naviguer": "Understand, decode, navigate",
    "Éducation": "Education",
    "Apprendre les marchés": "Learn the markets",
    "Décryptage pédagogique de la finance et de la crypto, sans jargon : comprendre": "Educational breakdown of finance and crypto, no jargon: understand",
    "pourquoi": "why",
    "ça bouge, à ton rythme.": "it moves, at your pace.",
    "Veille stratégique": "Strategic watch",
    "Le radar des tendances": "The trend radar",
    "Une veille quotidienne qui filtre le bruit et met en lumière les signaux qui comptent — en angle pédagogique.": "A daily watch that filters the noise and highlights the signals that matter — with an educational angle.",
    "Communauté privée": "Private community",
    "Un équipage": "A crew",
    "Un cercle d'apprenants qui partagent analyses, lectures et questions. On avance ensemble, jamais seul.": "A circle of learners sharing analyses, readings and questions. We move forward together, never alone.",
    "L'univers NAVLYS": "The NAVLYS universe",
    "Six modules, une même boussole": "Six modules, one same compass",
    "Chaque module sert l'éducation et la veille. Aucun n'est un service de conseil ou de gestion : ce sont des espaces pour": "Each module serves education and watch. None is an advisory or management service: they are spaces to",
    "apprendre": "learn",
    "comprendre": "understand",
    "Finance · éducation": "Finance · education",
    "Le briefing marché crypto & finance, résumé en angle pédagogique. La matière première du Journal IA.": "The crypto & finance market briefing, summarized with an educational angle. The raw material of the AI Journal.",
    "Beta disponible": "Beta available",
    "Média": "Media",
    "Le décryptage du jour : ce qui bouge, expliqué simplement, sans promesse ni recommandation.": "The breakdown of the day: what's moving, explained simply, no promise or recommendation.",
    "Transmission": "Legacy",
    "La biographie vivante : raconter et transmettre une histoire de vie, « ma vie en images ».": "The living biography: telling and passing on a life story, « my life in pictures ».",
    "Repères": "Bearings",
    "Comprendre le cadre : repères généraux et culture juridique, à visée informative.": "Understand the framework: general bearings and legal culture, for informational purposes.",
    "Le ton de l'univers : conversations, sérénité, vent et marée. Le mode de vie en audio.": "The tone of the universe: conversations, serenity, wind and tide. The lifestyle in audio.",
    "Réseau": "Network",
    "Un cercle de voix qui relaient le décryptage pédagogique et l'art de vivre méditerranéen.": "A circle of voices relaying the educational breakdown and the Mediterranean art of living.",
    "Une sélection de signaux du jour, filtrés et expliqués. Ci-dessous : des": "A selection of the day's signals, filtered and explained. Below: some",
    "données d'exemple": "sample data",
    "pour illustrer le format de la beta.": "to illustrate the beta format.",
    "Tout": "All",
    "Marchés": "Markets",
    "Art de vivre": "Art of living",
    "Exemple pédagogique. Cette veille ne constitue pas un conseil personnalisé ni une recommandation d'achat ou de vente.": "Educational example. This watch does not constitute personalized advice or a buy or sell recommendation.",
    "Communauté privée d'apprentissage": "Private learning community",
    "Rejoins le Club NAVLYS — choisis ta cotisation": "Join the NAVLYS Club — choose your membership",
    "cotisations de membre": "membership plans",
    "qui ouvrent l'accès au contenu éducatif et à la communauté. Ce n'est ni un produit financier ni une gestion de fonds — juste ton adhésion à l'équipage.": "that open access to educational content and the community. This is neither a financial product nor fund management — just your membership in the crew.",
    "Mousse": "Deckhand",
    "Gratuit": "Free",
    "Accès au Journal IA public": "Access to the public AI Journal",
    "1 briefing marché / semaine": "1 market briefing / week",
    "Newsletter du large": "Open-sea newsletter",
    "Embarquer": "Come aboard",
    "Le plus choisi": "Most chosen",
    "€/mois · cotisation": "€/month · membership",
    "Veille stratégique complète": "Full strategic watch",
    "Briefings quotidiens NAVFIN": "Daily NAVFIN briefings",
    "Communauté privée & ateliers": "Private community & workshops",
    "Archives du décryptage": "Breakdown archives",
    "Capitaine": "Captain",
    "Tout l'Équipage": "Everything in Crew",
    "Masterclass mensuelles": "Monthly masterclasses",
    "Coaching de vie & sessions bien-être": "Life coaching & well-being sessions",
    "Cercle restreint": "Inner circle",
    "Demander l'accès": "Request access",
    "La cotisation de membre donne accès à des contenus d'éducation et de veille. Elle ne constitue ni un produit d'investissement, ni un mandat de gestion, ni une promesse de rendement.": "The member's membership grants access to education and watch content. It constitutes neither an investment product, nor a management mandate, nor a promise of return.",
    "Le décryptage du jour": "The breakdown of the day",
    "Articles courts, lisibles en une minute.": "Short articles, readable in a minute.",
    "Contenus d'exemple": "Sample content",
    "pour la beta.": "for the beta.",
    "Décryptage · exemple": "Breakdown · example",
    "Pourquoi le marché « respire » avant une décision de banque centrale": "Why the market « breathes » before a central-bank decision",
    "On t'explique simplement le mécanisme de l'attente : volatilité, anticipation, et pourquoi le calme précède souvent l'annonce. Aucune recommandation — juste comprendre.": "We explain simply the mechanics of waiting: volatility, anticipation, and why calm often precedes the announcement. No recommendation — just understanding.",
    "Lecture 1 min": "1-min read",
    "Crypto : lire un graphique sans se faire emporter par l'émotion": "Crypto: reading a chart without getting swept up by emotion",
    "Les trois pièges du débutant, et la posture sereine : « l'IA est le vent, c'est toi qui tiens la barre ». Pédagogie, pas de signal d'achat.": "The three beginner traps, and the serene stance: « AI is the wind, you hold the helm ». Education, not a buy signal.",
    "Art de vivre · exemple": "Art of living · example",
    "De Corinthe à Suez : ce que la mer apprend sur la patience": "From Corinth to Suez: what the sea teaches about patience",
    "Un carnet de bord entre les îles grecques. Tilos, 100 % énergie verte, comme métaphore d'une économie qui change de cap.": "A logbook among the Greek islands. Tilos, 100% green energy, as a metaphor for an economy changing course.",
    "Carnet": "Logbook",
    "Méthode · exemple": "Method · example",
    "La règle du « comprendre avant d'agir »": "The rule of « understand before acting »",
    "Pourquoi l'éducation passe toujours avant la décision — et reste, elle, entre tes mains.": "Why education always comes before the decision — and the decision stays in your hands.",
    "Méthode": "Method",
    "Le pont de l'équipage": "The crew's deck",
    "Démonstration de l'espace membres de la beta.": "Demo of the beta members' area.",
    "Aucun compte réel": "No real account",
    "— connecte-toi avec n'importe quel identifiant pour visiter le tableau de bord factice.": "— log in with any identifier to visit the mock dashboard.",
    "Connexion": "Login",
    "démo": "demo",
    "Identifiant (apprenant)": "Identifier (learner)",
    "Code d'accès": "Access code",
    "Monter à bord": "Board the ship",
    "Espace de démonstration : aucune donnée n'est envoyée ni stockée sur un serveur.": "Demo space: no data is sent or stored on a server.",
    "Bonjour,": "Hello,",
    "Tableau de bord factice — données d'exemple.": "Mock dashboard — sample data.",
    "Briefings lus": "Briefings read",
    "Ateliers à venir": "Upcoming workshops",
    "Ton palier": "Your tier",
    "Ton fil d'apprentissage": "Your learning feed",
    "— Briefing du jour publié · angle pédagogique (exemple)": "— Today's briefing published · educational angle (example)",
    "Atelier": "Workshop",
    "— « Lire un graphique sereinement » · jeudi 20h (exemple)": "— « Reading a chart calmly » · Thursday 8pm (example)",
    "— 5 nouveaux signaux filtrés ce matin (exemple)": "— 5 new signals filtered this morning (example)",
    "— Nouvel épisode : « le vent et la barre » (exemple)": "— New episode: « the wind and the helm » (example)",
    "Quitter le pont": "Leave the deck",
    "Reçois le vent du large": "Catch the open-sea wind",
    "Inscris-toi à la lettre NAVLYS : décryptages, veille et carnets de mer. Formulaire de démonstration (beta) — propre, mais non connecté à un serveur.": "Sign up for the NAVLYS letter: breakdowns, watch and sea logbooks. Demo form (beta) — clean, but not connected to a server.",
    "Prénom de bord": "Crew first name",
    "Centre d'intérêt": "Interest",
    "Éducation financière": "Financial education",
    "Veille & décryptage crypto": "Crypto watch & breakdown",
    "Art de vivre méditerranéen": "Mediterranean art of living",
    "Communauté & ateliers": "Community & workshops",
    "J'ai lu la nature informative de NAVLYS et j'accepte de recevoir la lettre.": "I have read the informational nature of NAVLYS and agree to receive the letter.",
    "M'inscrire à la lettre": "Sign me up for the letter",
    "Connecté à Resend via": "Connected to Resend via",
    "une fois déployé. En ouverture locale (double-clic), le formulaire bascule en mode démo.": "once deployed. When opened locally (double-click), the form switches to demo mode.",
    "Le port d'attache": "The home port",
    "Une vie en mer Méditerranée": "A life on the Mediterranean Sea",
    "De Corinthe à Suez, au fil des îles grecques — Tilos, 100 % énergie verte. La sérénité de la mer infuse toute la pédagogie NAVLYS : prendre du recul, comprendre les courants, tenir le cap.": "From Corinth to Suez, along the Greek islands — Tilos, 100% green energy. The sea's serenity infuses all of NAVLYS's teaching: step back, understand the currents, hold the course.",
    "Écrire sur WhatsApp": "Write on WhatsApp",
    "Partenaires affiliés": "Affiliate partners",
    "NAVLYS est partenaire affilié de ces plateformes. Les liens d'affiliation peuvent générer une commission, sans coût supplémentaire pour toi, et ne constituent pas une recommandation personnalisée.": "NAVLYS is an affiliate partner of these platforms. Affiliate links may earn a commission, at no extra cost to you, and do not constitute a personalized recommendation.",
    "Éducation financière, veille stratégique, communauté privée d'apprentissage et média du mode de vie méditerranéen.": "Financial education, strategic watch, a private learning community and media of the Mediterranean lifestyle.",
    "Version beta": "Beta version",
    "Naviguer": "Navigate",
    "Navlys est un projet d'éducation et de veille à vocation informative uniquement. Les contenus diffusés ne constituent en aucun cas un conseil personnalisé en investissement, ni une recommandation d'achat ou de vente. Chacun reste seul responsable de ses décisions financières.": "Navlys is an education and watch project for informational purposes only. The content published in no way constitutes personalized investment advice, or a buy or sell recommendation. Everyone remains solely responsible for their financial decisions.",
    "© 2026 NAVLYS · Mentions légales · CGU · Confidentialité — NAVLYS NEXT GEN, beta opérationnelle.": "© 2026 NAVLYS · Legal notice · Terms · Privacy — NAVLYS NEXT GEN, operational beta.",
    "ton prénom de bord": "your crew first name",
    "n'importe quoi — c'est une démo": "anything — it's a demo",
    "NAVLYS — le cœur bat.": "NAVLYS — the heart beats."
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
