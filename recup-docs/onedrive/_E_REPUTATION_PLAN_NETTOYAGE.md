# 🧹 PLAN DE NETTOYAGE E-RÉPUTATION — Bruno Mark Partouche × NAVLYS

_28 mai 2026 · Plan d'action en 3 vagues · J0 = aujourd'hui._

> **Principe directeur** : on ne supprime pas seulement, on REMPLACE. Toute case noire vidée doit être remplie par un signal NAVLYS propre, sinon le vide se repeuple de bruit. (Cf. recommandation finale du rapport Manus AI.)

---

## 🌊 VAGUE 1 — J-3 → J+7 (quick wins autonomes Claude)

Cible : tout ce que Claude peut faire SEUL sur les fichiers locaux + tout ce qu'il peut PRÉPARER pour Bruno (Bruno se contente de copier-coller).

### V1.1 — Contenus QUE CLAUDE CONTRÔLE (autonome)

| Action | Fichier(s) | Détail | Statut |
|---|---|---|---|
| ✏️ Injecter JSON-LD `Person` Bruno sur brunopartouche.com | `_BRUNOPARTOUCHE_AVEC_PARTENAIRES.html`, `_BRUNOPARTOUCHE_HUB_PIVOT.html`, `_BRUNOPARTOUCHE_TEASER_avec_anim.html`, `_BRUNOPARTOUCHE_TEASER_v2_compact.html` | Schema.org Person + sameAs vers tous les profils sociaux NAVLYS. Voir bloc complet dans `_E_REPUTATION_KNOWLEDGE_GRAPH_BRUNO.md`. | Prêt à appliquer (V1.3) |
| ✏️ Injecter JSON-LD `Organization` NAVLYS sur navlys.com | `navlys/public/teaser.html` (après backup `.bak`) | Schema.org Organization. | Prêt à appliquer (V1.3) |
| ✏️ `<meta>` description + `og:image` cohérents | Tous les `*.html` des 4 sites | NAVLYS / NAVBIO LIFE / NAVLYS.IO / brunopartouche.com. | Prêt à appliquer (V1.3) |
| ✏️ Ajouter balise canonique `<link rel="canonical">` | Tous les sites | Évite dilution SEO entre versions. | Prêt à appliquer (V1.3) |
| ✏️ robots.txt + sitemap.xml | Chaque domaine | Forcer indexation après ouverture du gate. | Prêt à appliquer (V1.3) |
| 📝 Auditer tous les fichiers Downloads pour résidu « NOVA » / « DFENSER » | `grep` récursif | Remplacer par NAVLYS / NAVBIO LIFE. Sauvegarde `.bak.nova` avant. | Mode automatique avec validation Bruno cas par cas |

### V1.2 — Contenus prêts pour Bruno (copier-coller)

| Action | Cible | Texte à coller | Temps Bruno |
|---|---|---|---|
| 📋 Headline LinkedIn | `il.linkedin.com/in/bpartouche` | Section 2 de `_E_REPUTATION_TEXTES_REMPLACEMENT.md` | 2 min |
| 📋 About LinkedIn | Idem | Section 2 idem | 5 min |
| 📋 Bio X / Twitter | `@amarock52` (à transformer ou nouveau compte) | Section 3 idem | 3 min |
| 📋 Bio Instagram | Nouveau compte `@bruno.partouche` ou `@navlys.official` | Section 4 idem | 3 min |
| 📋 Description chaîne YouTube | Nouvelle chaîne NAVLYS | Section 5 idem | 5 min |
| 📋 Description entreprise (Pappers, Société.com — si tu décides d'enregistrer une entité) | À déterminer | Section 6 idem | 10 min |

### V1.3 — Pré-validation Bruno (avant que Claude touche aux fichiers HTML)

Bruno doit valider :
- [ ] OK pour injecter JSON-LD Person sur brunopartouche.com avec liste `sameAs` finale ?
- [ ] OK pour rebrand complet textes des sites avec tagline « **Ma méthode, Votre argent, Votre tempo ! — BM** » ?
- [ ] OK pour ajouter référence à « Le Cartographe » et « Le Trésorier » dans le footer ?
- [ ] **Photo officielle Bruno** : laquelle des 8 ChatGPT Image trouvées dans Downloads ? Bruno choisit 1 et la dépose en `Downloads/_BRUNO_PHOTO_OFFICIELLE.png`.

---

## 🌊 VAGUE 2 — J+7 → J+30 (actions à valider cas par cas)

Cible : nettoyer les traces que Bruno a mises en ligne ailleurs et qui ne sont pas sous contrôle direct de Claude.

### V2.1 — Désindexation Google (Bruno se connecte, Claude guide pas à pas)

| Action | Outil | Cible | Validation Bruno |
|---|---|---|---|
| 🔴 Demande désindexation contenu obsolète | [Google Refresh Outdated Content](https://search.google.com/search-console/remove-outdated-content) | Article Charente Libre (après modification ou rétractation du nom à la source) | OUI requis |
| 🔴 Demande retrait infos personnelles | [Google Results About You](https://support.google.com/websearch/answer/12719076) | Profils annuaires affichant adresse / téléphone | OUI requis |
| 🔴 Droit à l'oubli RGPD | [Google EU privacy form](https://support.google.com/legal/contact/lr_eudpa) | Article Charente Libre (vote Zemmour) | OUI requis |

### V2.2 — Actions à la source (Bruno opère, Claude fournit texte)

| Action | Cible | Modèle de courrier | Validation |
|---|---|---|---|
| 📧 Demande retrait/anonymisation à Charente Libre | redaction@charentelibre.fr | Modèle RGPD renforcé (`_E_REPUTATION_TEXTES_REMPLACEMENT.md` section 9.1) | OUI |
| 📧 Demande suppression profil Copains d'avant | via formulaire RGPD linternaute.com | Modèle RGPD allégé (section 9.2) | OUI |
| 🗑️ Suppression compte X `@amarock52` ou rebrand complet | Bruno se connecte | Procédure désactivation X (30 jours grâce période) | OUI |
| 🗑️ Suppression commentaires Facebook politiques | Bruno se connecte à `bruno.partouche.1` | Audit historique complet (cf. liste Manus AI) | OUI |
| ⚙️ Refonte profil LinkedIn IL | `il.linkedin.com/in/bpartouche` — Bruno se connecte | Textes section 2 + retirer ASHKELON + masquer +972 | OUI |
| 🗑️ Fermeture profil doublon LinkedIn `bruno-marc-partouche-6745137` | Bruno | Procédure LinkedIn « Close account » | OUI |

### V2.3 — Création / réactivation profils NAVLYS (Bruno crée — Claude ne peut JAMAIS le faire)

| Profil | URL souhaitée | Texte fourni dans | Notes |
|---|---|---|---|
| LinkedIn Page NAVLYS | linkedin.com/company/navlys | Section 2.B | Confirme adresse email pro `bruno@navlys.com` |
| X / Twitter NAVLYS | `@NavlysCo` ou `@navlys_official` (handle `@navlys_` pris) | Section 3.B | Vérifier dispo handles avant création |
| Instagram NAVLYS | `@navlys.official` | Section 4.B | Idem |
| YouTube NAVLYS | youtube.com/@navlys | Section 5.B | À monter en chaîne avec Cartographe |
| TikTok | À évaluer en V3 | — | Pas prioritaire |
| Threads / Bluesky / Mastodon | À évaluer en V3 | — | Pas prioritaire |
| Wikidata item NAVLYS + Bruno Partouche | wikidata.org | Section 7 | Création possible immédiatement (ouvert au public) |

### V2.4 — Annuaires & registres (cas par cas)

| Annuaire | Statut actuel | Action |
|---|---|---|
| Pappers 482511292 Tourcoing | ⚪ Homonyme, pas toi | **NE RIEN FAIRE** (ce n'est pas Bruno) |
| Société.com 482511292 | ⚪ Idem | **NE RIEN FAIRE** |
| ORIAS register | ✅ Pas inscrit | Conforme G1 — **NE PAS s'inscrire** |
| REGAFI | ✅ Pas inscrit | Idem |
| Viadeo (homonymes) | ⚪ | NE RIEN FAIRE |

→ **Insight** : aucun annuaire ne porte ton nom incorrectement. La confusion vient de profils sociaux que TU contrôles (LinkedIn, X, Facebook). C'est une bonne nouvelle.

---

## 🌊 VAGUE 3 — J+30 → J+90 (SEO renforcement long terme)

Cible : faire EXISTER Bruno × NAVLYS en page 1 Google. Reconstruction.

### V3.1 — Contenu SEO long-tail signé Bruno / Le Cartographe / NAVLYS

| Quoi | Combien | Où | Cible mots-clés |
|---|---|---|---|
| Articles « Le Cartographe » sur brunopartouche.com | 8-10 sur 3 mois | Section blog | « event studies finance », « facteurs intraday », « atlas marchés » |
| Pages NAVLYS d'écosystème | 6-8 | navlys.com/univers, navlys.com/methode | « méthode NAVLYS », « simulation marchés », « pédagogie finance » |
| Page « À propos » Bruno | 1 | brunopartouche.com/a-propos | « Bruno Mark Partouche », « skipper Méditerranée », « finance Israel » |
| Vidéos « Premier rapport public » Cartographe | 4-5 sur 3 mois | YouTube NAVLYS | « event study », « éducation finance » |

### V3.2 — Backlinks de qualité

Cible : 5-10 backlinks dofollow depuis sites ≥ DA 30 sur 3 mois.

| Piste | Statut |
|---|---|
| Guest post Finance Magazine FR (fintech) | À démarcher mois 1 |
| Podcast finance francophone (Money Pickle, La Martingale, etc.) | Démarcher avec press kit existant `NAVLYS_PRESS_KIT_PACK` |
| Interview Times of Israel — angle « entrepreneur méditerranéen » | À démarcher (réseau existant Bruno) |
| Article ProductHunt lancement NAVLYS | Mois 1 post-lancement |
| Tribune LinkedIn sur la méthode NAVLYS | Bruno publie 1× par mois |

### V3.3 — Press kit & RP

Le `NAVLYS_PRESS_KIT_PACK` existe déjà dans Downloads → à diffuser à :
- 10 journalistes finance/tech français (Les Échos, La Tribune, Frenchweb, BFM)
- 5 médias israéliens (Times of Israel, Globes, Calcalist)
- 3 podcasts finance francophones
→ Action mois 1-2 post-lancement.

### V3.4 — Google My Business

Bruno est en Israël, indépendant. **Cas particulier** : GMB est principalement orienté commerces avec adresse publique. Pour Bruno (digital uniquement) : à éviter. **PAS de fiche GMB**.

### V3.5 — Knowledge Graph Google (panel à droite)

→ Stratégie complète détaillée dans `_E_REPUTATION_KNOWLEDGE_GRAPH_BRUNO.md`. Conditions : JSON-LD (V1) + Wikidata (V2) + 3 sources tierces fiables (V3) + photo cohérente partout (V1).

---

## 📊 Calendrier consolidé

```
J-3 ━━┓                            VAGUE 1 (autonome)
       ┃ Claude rédige les 6 docs (FAIT 28/05)
J0  ━━┫
       ┃ Bruno valide V1.3 → Claude injecte JSON-LD + meta sur 4 sites
J+3 ━━┫
       ┃ Bruno copie-colle bios LinkedIn / X / Insta / YouTube
J+7 ━━┫
       ┃                            VAGUE 2 (cas par cas)
       ┃ Bruno fait demandes Google + lettres RGPD Charente Libre + Copains d'avant
J+14 ━┫ Bruno purge X @amarock52 / Facebook commentaires
       ┃ Bruno refait profil LinkedIn IL
J+21 ━┫ Bruno crée Page Company NAVLYS + handles Insta/YouTube
J+30 ━┫
       ┃                            VAGUE 3 (long terme)
J+45 ━┫ Claude rédige 4 articles Cartographe blog
       ┃ Bruno publie press kit aux 18 contacts médias
J+60 ━┫ Demande Wikidata + 1ère vidéo YouTube
J+75 ━┫ Tribune LinkedIn Bruno (1ère)
J+90 ━┫ Audit de suivi (`_E_REPUTATION_AUDIT_v2.md`)
```

---

## 🛑 Garde-fous (Anthropic + G1 NAVLYS)

- ❌ **Claude ne crée JAMAIS de compte au nom de Bruno** (ni LinkedIn, ni X, ni Insta, ni YouTube, ni Wikidata, ni annuaire).
- ❌ **Claude ne se connecte JAMAIS aux profils de Bruno** avec ses identifiants.
- ❌ **Claude n'envoie JAMAIS de mail en son nom** (Bruno copie-colle).
- ❌ **Claude n'écrit JAMAIS que Bruno est CIF/ORIAS actif** (G1 NAVLYS — il a quitté le statut).
- ✅ Tous les changements sur les sites NAVLYS = backup `.bak.YYYYMMDD` avant + log dans `_NAVLYS_PILOTAGE/journal_e_reputation.md`.
- ✅ Tous les courriers / mails sont fournis EN TEXTE et Bruno les envoie depuis sa boîte (`bruno@navlys.com` privilégié pour cohérence branding).

---

## 🔁 Boucle de contrôle (mensuelle)

Le département e-Réputation (Le Sémaphore / Le Hérault / Le Phare — à choisir) tourne :
- Audit Google nominatif (13 requêtes du présent doc) → rapport mensuel.
- Capture top 10 par requête + diff avec mois précédent.
- Alertes immédiates si nouvelle trace négative apparaît.
- KPI suivis : note /10 globale, # de résultats NAVLYS en page 1, # de profils homonymes au-dessus de toi.

→ Détail dans `_DEPARTEMENT_E_REPUTATION_charte.md`.

---

⚓ **Lien sortant : `_E_REPUTATION_TEXTES_REMPLACEMENT.md` (textes prêts à coller).**
