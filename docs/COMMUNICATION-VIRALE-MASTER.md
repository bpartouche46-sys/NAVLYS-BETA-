# 🚀 COMMUNICATION VIRALE — FICHIER MAÎTRE À TRANSMETTRE AUX AGENTS

> **Ordre de Bruno (2026-07-15)** : *« La communication virale est l'angle primordial de notre
> succès, je veux le top du top. Utilise tes espions pour, chaque heure, regarder / écouter /
> transcrire les membres YouTube à suivre + Facebook + tous les réseaux, pour installer et exploiter
> de nouveaux GitHub d'experts pour la communication web automatique et virale irréfutable. Amène le
> visiteur à comprendre que son action quotidienne de communication peut lui faire gagner beaucoup
> d'argent s'il fait partie des premiers utilisateurs. Loop externe indépendant (Claude Code ou AI
> locale) sur Hetzner ou mon PC, cron externe, sans token ou très très peu. »*

> **Ce fichier est LA source unique** que les agents (NAVMKT, NAVLAB, NAVCOMU, NAVTECH, NAVLEX,
> NAVFI) doivent lire et exécuter. Il synthétise toutes les idées en un seul endroit.

---

## 0. Garde-fous NON NÉGOCIABLES (à respecter par CHAQUE agent)

1. 🔒 **Sécurité GitHub tiers (règle n°111)** : tout dépôt/lien/skill d'expert doit passer le **scan
   sécurité** (`skill-scanner` / `scripts/scan_skill.py` + revue manuelle) AVANT tout usage —
   texte caché (couleur sur couleur, zero-width, métadonnées), malware/backdoor/exfiltration, et
   **toute connexion externe**. **Seule connexion externe autorisée = Bruno** (`bruno@navlys.com`,
   `bpartouche46@gmail.com`). En cas de doute : **bloquer + alerter Bruno**.
2. 💰 **Argent = Bruno seul** : aucun payout d'affiliation, aucune dépense pub, aucun débit sans le
   feu vert de Bruno. Les 20% et les paiements se **préparent** ; Bruno déclenche.
3. ⚖️ **Zéro promesse** : « peut faire gagner » (jamais « fait gagner » / « gains garantis »).
   Toute page ambassadeur passe la **revue légale NAVLEX** avant publication (risque de promesse
   financière + optique pyramidale à neutraliser).
4. 🕸️ **Respect des CGU des plateformes** : offres/API **officielles** uniquement, **1 compte
   légitime par service**, **jamais** de scraping massif interdit, multi-comptes ou contournement
   de limites. Autonome, oui ; abusif, jamais.
5. 🪙 **Tokens IA minimisés** : privilégier **outils locaux sans token** (Whisper local, RSS,
   oEmbed) et **quotas gratuits quotidiens** des IA (routeur multi-IA, 1 compte/IA). Payant = dernier
   recours + signalement.
6. 🎨 **Charte + dépersonnalisation** : ice blue #7DD3FC + or, fond sombre ; Bruno visible AVEC
   disclaimer « voix générée par IA » (arbitrage 2026-07-15).

---

## 1. LES ESPIONS — veille sociale horaire (regarder · écouter · transcrire)

**But** : capter en continu les **techniques de communication virale** des meilleurs créateurs, les
transcrire, en extraire les recettes, et **nourrir le CORE** pour que NAVLYS communique « top du top ».

**Cadence** : cron **horaire** sur Hetzner (indépendant de Claude Code).

**Sources & méthode LÉGITIME (par réseau)** :
| Réseau | Méthode sans token / légitime | État |
|--------|-------------------------------|------|
| **YouTube** | Brique `youtube` existante : **oEmbed** (titre/auteur) + **RSS de chaîne** (15 dernières vidéos + description) + page HTML (`attributedDescription`). **Sans clé.** | ✅ déjà en place (`sql/youtube_veille_influenceurs.sql`) |
| **Transcription audio** | **Whisper local** (openai-whisper / whisper.cpp) sur Hetzner → audio des nouvelles vidéos suivies → texte. **Zéro token API.** | ⏳ à installer sur Hetzner |
| **Facebook / Instagram** | **API Graph officielle** (nécessite app Meta + token = action Bruno) OU dépôt manuel de liens par Bruno. Le scraping direct est bloqué/illégal. | ⚠️ dépend de Bruno (app Meta) |
| **X / Twitter** | API officielle (payante) OU nitter/RSS publics instables. Réaliste : dépôt de liens. | ⚠️ limité |
| **TikTok** | Pas d'API publique fiable ; oEmbed pour une URL donnée. Réaliste : dépôt de liens. | ⚠️ limité |
| **LinkedIn** | Aucune route légitime de veille auto. Dépôt de liens manuel. | ⚠️ manuel |

**Réflexe (comme YouTube)** : Bruno envoie un lien d'un créateur à suivre → la brique l'ingère,
suit la source, et la veille horaire tourne ensuite seule.

**Sortie** : chaque cycle grave dans le CORE (`core_knowledge` / `agent_memoire` NAVMKT) : 2-3
**techniques virales concrètes** observées + 1 **application NAVLYS** immédiate.

**⚠️ Honnêteté** : « tous les réseaux, chaque heure, en auto » n'est **pas** entièrement faisable
légalement/techniquement. Le maximum propre = YouTube auto + transcription locale + API officielles
(clés Bruno) + dépôt de liens. On construit ça ; on ne promet pas l'impossible.

---

## 2. EXPLOITER LES GITHUB D'EXPERTS (communication web auto & virale)

**But** : repérer et **intégrer les meilleurs outils open-source** de communication virale
(planificateurs multi-réseaux, générateurs de contenu/hooks, analyse de tendances, A/B viral…).

**Process obligatoire (règle n°111)** :
1. NAVLAB recherche sur GitHub (topics : `social-media-automation`, `viral`, `content-generation`,
   `crossposting`, `open-source social scheduler`).
2. **Clone en local + SCAN sécurité** (`scripts/scan_skill.py` + revue manuelle du contexte).
3. Si **CLEAN** → intégrer comme brique interne (jamais de connexion externe autre que Bruno).
4. Si **doute** → **bloquer + alerter Bruno**.

**Candidats à évaluer (à scanner avant tout usage)** : outils de cross-posting open-source,
générateurs de hooks/scripts vidéo, Whisper (transcription), outils de veille de tendances.
(Liste non exhaustive — NAVLAB enrichit, chaque entrée passe le scan.)

---

## 3. PROGRAMME AMBASSADEUR — « ta com quotidienne peut te rapporter » (défini par BM)

**Message central (à faire comprendre au visiteur)** : *en faisant connaître NAVLYS chaque jour, tu
peux gagner de l'argent — surtout si tu fais partie des premiers.*

**Règle BM — DÉFINIE (corrigée 2026-07-15, à valider par Bruno + NAVLEX + comptable)** :
- **Taux = 20 %** (correction : pas 29 %).
- **Base = la MARGE NETTE de NAVLYS**, PAS le prix de vente brut. Calcul en 4 temps :
  1. Partir du **prix HT** de la vente.
  2. Retirer **tous les frais propres au client** (frais de paiement / transfert selon le mode choisi).
  3. Retirer les **charges NAVLYS** → on obtient le **HT net pour NAVLYS (entité Israël), net de
     tous frais et charges** = la marge nette.
  4. **Commission ambassadeur = 20 % de cette marge nette.**
- **Versement mensuel.**
- **Ajustement TVA** : le montant est calculé/réajusté sur une base **TTC dans le pays d'origine du
  client**, puis ramené en **net-net selon le taux de TVA du client**.
- Formule cible : `commission = 0,20 × (prix_HT − frais_client − charges_NAVLYS)`, puis ajustement
  TVA pays du client, payé mensuellement.
- **Sur tous les affiliés (abonnés ou non) et sur toutes les affiliations.**
- **Avantage « premiers utilisateurs »** : statut d'ambassadeur fondateur pour les premiers inscrits.
- **Échelle exigée : 100 000 → 1 000 000 membres** → l'architecture (tracking parrainage, calcul
  commissions mensuel en batch, dashboard) doit tenir à cette charge (Postgres/Supabase indexé).
- ✅ **Modèle sain** : 20 % d'une **marge nette** (pas du CA brut) = économiquement viable et bien
  moins risqué juridiquement qu'un pourcentage du chiffre d'affaires.

**⚠️ À sécuriser AVANT toute publication/paiement (signalé, non simulé)** :
- **TVA transfrontalière** : entité **Israël** ↔ clients **UE** à taux de TVA variables → le calcul
  « TTC pays d'origine puis net-net selon TVA client », qui émet la facture, et le **statut de
  l'ambassadeur** (particulier vs auto-entrepreneur qui doit **déclarer ce revenu**) doivent être
  tranchés par un **comptable + NAVLEX**. C'est le point le plus technique.
- **Transparence de la marge** : « 20 % de la marge nette » suppose de **définir précisément les
  charges NAVLYS** déduites, sinon la commission est incompréhensible/contestable pour l'ambassadeur.
- **Cadre affiliation/MLM** : « sur toutes les affiliations » ne doit **pas** basculer en schéma
  pyramidal multi-niveaux (illégal). NAVLEX borne le modèle.
- **Payouts = Bruno** (PayPal/Stripe non authentifiés dans la session Claude Code).

**Garde-fous conformité (obligatoires avant publication)** :
- Formulation **« peut te rapporter »**, jamais de gain garanti ni de chiffre promis.
- **Disclaimer** : « rémunération variable, non garantie ; dépend de ton activité ; pas un
  placement ni un revenu passif garanti ».
- **Revue NAVLEX** (droit FR/UE de l'affiliation + démarchage + pratiques commerciales) **avant LIVE**.
- **Payouts = Bruno** (PayPal/Stripe/virement — à brancher par Bruno ; non authentifiés dans la
  session Claude Code actuelle).
- Transparence : conditions claires, traçabilité des parrainages (déjà câblé : `/ambassadeur`
  génère `?parrain=CODE`, `/adhesion` le lit).

**Livrable** : enrichir `/ambassadeur` (message « gagne en communiquant » + mécanique 20% + palier
« fondateur ») + i18n 5 langues + banc `check-i18n.mjs`.

---

## 3bis. DASHBOARD « WOW » DÈS LA 1ʳᵉ CONNEXION + AVATAR (demande Bruno 2026-07-15)

**But** : dès qu'un **inconnu** se connecte, il voit **immédiatement un tableau de bord prêt**, avec
des **bulles (widgets) vides mais visibles**, pour **comprendre nos capacités tout de suite** — pas
un écran blanc. Le « vide » est un **squelette montrant le potentiel** (à remplir au fil de l'usage).

- **Livrable** : `live-source/tableau-de-bord.html` — bulles capacités (les 14 départements /
  Next Gen, Finance, NAVLEX, Espions viraux, Ambassadeur/gains, Bateaux, Voix…), état « à activer »,
  chacune cliquable vers la vraie brique. Charte NAVLYS, mobile-first, i18n (via script, règle n°33).
- **Avatar moderne depuis le visuel public** : à la connexion OAuth, récupérer la **photo de profil
  publique** fournie par le fournisseur (Google/Facebook/Discord renvoient un `avatar_url`) → l'afficher
  en **avatar stylé moderne** (cadre or/ice, halo). Option d'embellissement IA local (dernier recours).
  - **⚠️ Garde-fou RGPD (obligatoire)** : on n'utilise l'image d'une personne **qu'avec son
    consentement explicite** au moment de la connexion (case « Utiliser ma photo comme avatar »).
    **Jamais** récupérer un visage sans accord. Fallback = avatar généré (initiales / pièce NAVLYS).
- **Échelle** : le dashboard lit l'état membre depuis Supabase (indexé) → tient à 100k–1M membres.

## 4. CSV VILLES EUROPE (ciblage géo de la communication)

Fichiers publics générés (v1, à vérifier/enrichir à la source — cf. ERR-007) :
- `data/villes-europe/capitales-europe.csv` — toutes les capitales européennes.
- `data/villes-europe/villes-europe-1M.csv` — villes européennes > 1 000 000 habitants.

**Usage** : ciblage géographique de la communication virale (campagnes ville par ville, ambassadeurs
locaux, contenu localisé). Populations = **estimations publiques approximatives à vérifier** ;
définition « ville propre » (pas agglomération) sauf mention.

---

## 5. ARCHITECTURE — LOOP EXTERNE INDÉPENDANT (Hetzner / PC, cron, sans token)

**Principe (rappel du cap Bruno)** : le moteur tourne **hors** de Claude Code — sur **Hetzner** (core
central) ou le **PC** de Bruno — via **cron**, avec **zéro ou très peu de token externe**.

```
Hetzner (core central) — cron horaire
  ├─ espion_youtube.sh      → RSS/oEmbed (sans token) → nouvelles vidéos des suivis
  ├─ espion_transcription   → Whisper LOCAL (sans token) → texte des audios
  ├─ extract_viral          → recettes virales → CORE (core_knowledge / NAVMKT)
  ├─ routeur_ia_gratuit      → si besoin d'un LLM : quotas gratuits quotidiens (1 compte/IA)
  └─ sync GitHub            → tire le code livré par Claude (scripts/sync-core.sh)
```

- **Base IA** : Claude Code **ou** IA locale (Ollama/llama.cpp) sur Hetzner → indépendance totale en
  cas de coupure (aligné doctrine « indépendance du CORE »).
- **Minimisation token** : local d'abord (Whisper, Ollama), sinon free tiers quotidiens.
- **Livraison** : Claude écrit les scripts dans GitHub → Hetzner les tire via `sync-core.sh` (Claude
  n'a **pas** d'accès SSH → Bruno déploie une fois).

---

## 6. RÉPARTITION AUX AGENTS (qui fait quoi)

| Agent | Mission |
|-------|---------|
| **NAVMKT (Marc)** | Stratégie virale « top du top », recettes issues de la veille, message ambassadeur, contenu de lancement. |
| **NAVLAB (Newton)** | Veille GitHub experts + **scan sécurité n°111**, veille sociale, routeur multi-IA free-tier. |
| **NAVCOMU (Sofia)** | Communauté ambassadeurs, accueil premiers utilisateurs, rétention. |
| **NAVTECH (Tom)** | Cron Hetzner, Whisper local, briques espions, `sync-core.sh`, indépendance. |
| **NAVLEX (Alex)** | Cadre légal du programme 20% (affiliation/MLM/démarchage) + disclaimers. |
| **NAVFI (Victor)** | Mécanique payouts (préparation only ; **débit = Bruno**). |

---

## 7. CE QUI DÉPEND DE BRUNO (bloquant, signalé — non simulé)

1. **Définition exacte des 20 %** (§3) — sinon on ne peut pas coder le calcul juste.
2. **App/API Meta (Facebook/Insta)** + toute clé réseau officielle (sinon veille limitée à YouTube).
3. **PayPal/Stripe** (payouts ambassadeurs) — non authentifiés dans la session ; à brancher par Bruno.
4. **Feu vert légal NAVLEX** sur le message « gagner de l'argent » avant publication.
5. **Déploiement Hetzner** des scripts cron (Claude livre via GitHub, Bruno lance une fois).
6. **GATE + communication virale finale** = ton GO le jour de validation (99% + zéro erreur + Next Gen 100%).
