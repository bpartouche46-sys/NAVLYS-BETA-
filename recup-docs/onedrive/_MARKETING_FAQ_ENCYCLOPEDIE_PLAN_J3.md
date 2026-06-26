# ⚓⏱️ PLAN D'ACTION J-3 → FAQ + Encyclopédie EFFECTIVES au 1er juin
_28 mai 2026 · J-3 du lancement BETA · Plan opérationnel en 3 vagues_

> Mandat : que les 4 sites NAVLYS aient au 1er juin 2026 minuit Jérusalem une FAQ + encyclopédie publiques bilingues FR/EN, conformes G1 (PAS CIF/ORIAS, mode publisher CPA), branchées à un système de réponse multi-canal.

---

## VAGUE 1 — J-3 → J-1 — actions Claude AUTONOMES (≈ 12 h de travail)

Aucun blocage utilisateur. Claude produit. Bruno valide à la fin.

### 1.1 FAQ par site — 30 questions × 4 sites × FR/EN (livrable J-2)

Quatre fichiers à générer dans `_SITES_MASTER/FAQ/` :
- `faq_navlys_com_FR.md` + `faq_navlys_com_EN.md` (30 Q/R)
- `faq_navlys_io_FR.md` + `faq_navlys_io_EN.md` (30 Q/R)
- `faq_navbiolife_com_FR.md` + `faq_navbiolife_com_EN.md` (30 Q/R)
- `faq_brunopartouche_com_FR.md` + `faq_brunopartouche_com_EN.md` (30 Q/R **CORRIGÉES**, plus de CIF/ORIAS)

**Couverture des 30 questions, par bloc thématique** :

| Bloc | Nombre | Sujets |
|------|--------|--------|
| Identité & légal | 5 | Statut publisher CPA · PAS CIF/IOBSP/ORIAS · qui est Bruno · adresse légale · RGPD |
| Méthode 90/10 | 5 | Définition · risque · résiliation · sécurité fonds · garantie de capital |
| Mon Cap Rêvé | 3 | Qu'est-ce que c'est · accessible avant BETA · combien ça coûte |
| Le Cartographe | 3 | Définition · cas d'usage · accès |
| Le Laboratoire NEXT GEN | 2 | Promesse · cadence des news |
| Tarifs | 4 | NAVLYS NEXT GEN INVEST 49/490 € · NAVBIO Solo/Couple/Premium/Cinéma/Pro · gratuit ? · remboursement |
| Partenaires affiliés | 3 | Mode publisher CPA · liste 19 partenaires · transparence |
| Contact & support | 3 | Délai réponse · multi-canal · NAV IA Chat |
| Sécurité données | 2 | RGPD · stockage Stripe PCI-DSS |

### 1.2 Encyclopédie NAVLYS — 15 articles fondateurs (livrable J-1)

Dans `_SITES_MASTER/ENCYCLOPEDIE/` :

| # | Titre | Source matière première | Longueur cible | FR/EN |
|---|-------|--------------------------|----------------|-------|
| 1 | La méthode 90/10 | `_BACKTEST_LIBRE.md` + charte | 800 mots | FR + EN |
| 2 | Mon Cap Rêvé | `_MON_CAP_REVE_repositionnement.md` + moteur | 600 mots | FR + EN |
| 3 | Le Cartographe | `_CARTOGRAPHE_premier_rapport_public.md` + autres | 700 mots | FR + EN |
| 4 | Le Cap Tactique | `_CAP_TACTIQUE_strategies.md` | 700 mots | FR + EN |
| 5 | Le Laboratoire NEXT GEN | `_LABORATOIRE_NEXTGEN_manifeste.md` | 500 mots | FR + EN |
| 6 | Le « Vol drag » (effet drag des frais) | `_OPTIMISEUR_KELLY.md` | 400 mots | FR + EN |
| 7 | Le critère de Kelly | `_OPTIMISEUR_KELLY.md` | 400 mots | FR + EN |
| 8 | Charte éditoriale NAVLYS | `_CHARTE_EDITORIALE_CONDENSEE.md` | 500 mots | FR + EN |
| 9 | Palette de couleurs NAVLYS (bronze/or/ice blue) | `_BP_CREPUSCULE_palette.css` | 300 mots | FR + EN |
| 10 | Philosophie maritime NAVLYS | charte + dispatch | 600 mots | FR + EN |
| 11 | Glossaire technique financier | `_GLOSSAIRE_MULTILINGUE_NAVLYS.md` (déjà existant) | indexation | FR + EN |
| 12 | Que veut dire « publisher CPA » ? | `_BANQUES_LIENS_PARTENAIRES_CPA.md` | 400 mots | FR + EN |
| 13 | Qui est Bruno Mark Partouche | `_E_REPUTATION_KNOWLEDGE_GRAPH_BRUNO.md` | 600 mots | FR + EN |
| 14 | Comment NAVLYS gagne sa vie | éco-modèle CLAUDE.md | 500 mots | FR + EN |
| 15 | NAV IA Chat Universel — ce que c'est, ce que ce n'est pas | nouveau | 400 mots | FR + EN |

### 1.3 Templates de réponse mail — 15 cas typiques (livrable J-2)

Dans `_SITES_MASTER/TEMPLATES/mail/` :

| # | Cas | Tone | Long |
|---|-----|------|------|
| 1 | Demande d'info générale | chaleureux + redirect FAQ/encyclopédie | court |
| 2 | Demande de tarif | direct + lien stripe + délai gratuité BETA | court |
| 3 | Demande de personnalisation conseil → refus G1 + redirect ORIAS | clair + non-blessant | court |
| 4 | Plainte / mécontentement | accusé sérieux + ESCALADE Bruno | court |
| 5 | Demande presse / interview | flatteur + délai 48 h + Bruno valide | court |
| 6 | Demande partenariat broker / banque | conditions publisher CPA + label `_BANQUES` | moyen |
| 7 | Demande partenariat affiliation contenu | conditions transparence | moyen |
| 8 | Refus de service (out of scope) | poli + redirect alternative | court |
| 9 | Demande RGPD (accès/effacement/portabilité) | template DPO standard | moyen |
| 10 | Demande de remboursement | rappel politique + Stripe self-serve | court |
| 11 | Demande de remboursement post-cinéma NAVBIO | spécifique one-shot | court |
| 12 | Demande légale (mise en demeure, AMF, ORIAS) | acknowledgment 24 h + ESCALADE Bruno + horodatage | court |
| 13 | Demande de prendre rendez-vous Bruno | redirect Calendly + critères acceptation | court |
| 14 | Demande de rejoindre l'équipe / candidature spontanée | accusé poli + redirect Notion roles | court |
| 15 | Question technique sur les outils calculateurs | redirect encyclopédie + KB Crisp | court |

Chaque template :
- FR + EN
- variable `{prénom}`, `{date}`, `{url_referrer}`
- footer charte : « Information éducative · Pas un conseil personnalisé »
- signature : « ⚓ Le Porte-Parole NAVLYS — pour Bruno »

### 1.4 Templates WhatsApp courts — 10 cas typiques (livrable J-2)

Format charte « 1 idée 1 action », ≤ 280 caractères.

| # | Cas | Exemple FR |
|---|-----|------------|
| 1 | Accusé réception immédiat | « ⚓ Reçu. Bruno répond sous 24 h. FAQ : navlys.com/faq » |
| 2 | Demande tarif | « 49 €/mois ou 490 €/an. Gratuit jusqu'au 30 juin. Lien : navlys.com/start » |
| 3 | Demande conseil personnalisé | « NAVLYS éduque, ne conseille pas. CIF inscrit ORIAS : orias.fr » |
| 4 | Demande NAVBIO | « NAVBIO Life : 19/29/39/149/199 €. Détails : navbiolife.com » |
| 5 | Hors heures (chabbat) | « Chabbat. Bruno répond dimanche matin. ⚓ » |
| 6 | Urgence légale | « Bruno traite ça à la main. Sous 4 h ouvrées. » |
| 7 | Lien partenaire affilié | « C'est un lien publisher CPA. NAVLYS touche une commission, toi non. » |
| 8 | Demande presse | « presse@navlys.com — délai 48 h. » |
| 9 | NAV IA Chat | « NAV IA répond 24/7 sur le site. Mais ici tu as Bruno. » |
| 10 | Désinscription | « WhatsApp STOP = retiré sous 1 min. Pas de mauvaise foi. » |

### 1.5 Glossaire technique condensé public

Extraire de `_GLOSSAIRE_MULTILINGUE_NAVLYS.md` les 40 termes essentiels, formater en page web indexable, brancher dans menu chaque site.

### 1.6 Correction immédiate `brunopartouche.com/faq.html` (URGENT G1)

Réécrire les 4 Q/R qui mentionnent CIF/ORIAS pour qu'elles disent la vérité :
- statut **publisher de contenu pédagogique**
- **PAS** CIF, **PAS** ORIAS
- Si tu veux un conseil perso → annuaire ORIAS

→ Livrable : `_E_REPUTATION_TEXTES_REMPLACEMENT.md` déjà contient cette matière. Reverser dans `faq.html` réécrit.

---

## VAGUE 2 — J-1 → J+7 — actions BRUNO requises (≤ 30 min chacune)

### 2.1 Crisp Pro — création du compte
- URL : https://crisp.chat/fr/pricing/
- Email : `bruno@navlys.com`
- Plan : **Pro €95/mois** (ou Mini €25 pour démarrer light)
- Brand : `NAVLYS`
- Récupérer `CRISP_WEBSITE_ID` → variable d'env Vercel

### 2.2 WhatsApp Business via 360dialog
- Depuis Crisp Pro → Integrations → WhatsApp via 360dialog (one-click)
- Fournir : numéro propre (à acheter via Twilio ou via 360dialog) + pièce d'identité + nom commercial NAVLYS
- Délai KYC Meta : 24-72 h
- Coût conv : ≈ 0,005-0,05 €/conv

### 2.3 Coller widget Crisp sur les 4 sites
Une ligne JavaScript dans `<head>` de :
- `navlys.com/teaser.html` (et toutes les pages)
- `navlys.io` vitrine
- `navbiolife.com` teaser
- `brunopartouche.com` (hub + teaser)

```html
<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="<ID>";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>
```

### 2.4 Provisionner les 7 alias mails Workspace
Dans admin.google.com → Workspace → users → bruno → alias :
- `contact@`, `hello@`, `support@`, `presse@`, `partenaires@`, `legal@`, `rgpd@` (tous @navlys.com)

Tous forward → inbox Crisp (sauf `legal@` et `rgpd@` → Bruno direct).

### 2.5 Valider les contenus produits vague 1
Lecture rapide × 4 :
- 120 Q/R (4 sites × 30 Q × 2 langues — relire FR uniquement, EN c'est la même chose)
- 15 articles encyclopédie
- 15 templates mail
- 10 templates WhatsApp

Estimation lecture par Bruno : **2 h max sur 2 soirées**.

### 2.6 Mettre Bruno hors ligne sur les autres canaux
Désactiver auto-fwd de `bpartouche46@gmail.com` vers `bruno@navlys.com` (ou inversement). Une seule boîte source de vérité = Crisp inbox.

---

## VAGUE 3 — J+7 → J+30 — déploiement NAV IA Chat

### 3.1 Activer Anthropic Claude API
- Bruno crée compte console.anthropic.com (`bruno@navlys.com`)
- Génère clé API (`sk-ant-...`)
- La range dans 1Password puis pousse en variable d'env Vercel : `ANTHROPIC_API_KEY=sk-ant-...`
- Crédit initial : 50 $ (largement suffisant pour 2 mois)

### 3.2 Brancher Claude sur Crisp Magic Reply
Crisp Pro permet de connecter un endpoint custom AI :
- Endpoint Make.com → reçoit message Crisp → appelle Claude API avec system prompt G1 + contexte FAQ + contexte encyclopédie
- Renvoie réponse à Crisp → soit auto-send (modèle haute confiance), soit suggère à Bruno (handover humain)

### 3.3 RAG sur FAQ + encyclopédie
Deux options :
- **Option A** (simple, recommandée J+15) : système prompt inclut FAQ + encyclopédie en contexte (≈ 30 K tokens, cher en input mais simple)
- **Option B** (scalable, J+45) : embeddings + vector DB (Supabase pgvector) + RAG retrieval. Plus complexe, mais coût input < 5 K tokens par conversation.

### 3.4 A/B test Magic Reply auto vs handover humain
- 50 % : NAV IA envoie automatiquement
- 50 % : NAV IA suggère, Bruno valide en 1 clic
- Mesure : CSAT (note 1-5), délai moyen résolution, % escalade

### 3.5 Mesure CSAT + délai
KPI à brancher :
- CSAT moyen ≥ 4,2/5
- Délai première réponse < 1 min (auto-reply) puis < 24 h (humain/IA)
- Taux résolution IA seule ≥ 60 %
- Taux escalade Bruno ≤ 20 %
- Reporting hebdo automatique → Slack/email Bruno

---

## Récapitulatif livrables

| Vague | Quand | Owner | Livrables |
|-------|-------|-------|-----------|
| Vague 1 | J-3 → J-1 | Claude | 120 Q/R + 15 articles + 15 mails + 10 WhatsApp + glossaire + correction G1 bp.com |
| Vague 2 | J-1 → J+7 | Bruno | Compte Crisp + alias mails + widget × 4 sites + WhatsApp BSP + validation contenus |
| Vague 3 | J+7 → J+30 | Claude + Bruno | Claude API + Crisp Magic Reply + RAG + A/B test + CSAT |

---

## Estimation effort

| Acteur | Vague 1 | Vague 2 | Vague 3 | Total |
|--------|---------|---------|---------|-------|
| Claude (production) | 12 h | 2 h support | 6 h | **20 h** |
| Bruno (validation + clics) | 2 h relecture | 3 h ops | 1 h validation | **6 h** |

**Coût financier J0 → J+30** :
- Crisp Pro : 95 € × 1 mois = 95 €
- 360dialog conv : ≤ 30 €
- Anthropic Claude API : ≤ 50 €
- Make.com Pro : 29 €
- Achat numéro WhatsApp : ≤ 10 €
- **Total mois 1 : ≤ 215 €** (premier mois budgétaire infrastructure Marketing Comms)

---

## Garde-fous

- Aucune réponse IA n'est envoyée sans validation Bruno tant que CSAT < 4/5 sur les 20 premières conversations.
- Aucune mention CIF/IOBSP/ORIAS positif dans les réponses NAV IA — interdit dans le system prompt.
- Aucun engagement de gain, aucune promesse de rendement — interdit dans le system prompt.
- Footer obligatoire en fin de chaque réponse : « Information éducative · Pas un conseil personnalisé ».
- Tout message contenant les mots-clés « mise en demeure, AMF, ORIAS, fraude, plainte » → escalade Bruno immédiate (Make.com SMS).

---

⚓ *« Trois vagues. Une boîte. Un cerveau. Au 30 juin, le tuyau respire tout seul. »*
_Plan compilé par Le Porte-Parole · Département Marketing & Communications NAVLYS · 28 mai 2026._
