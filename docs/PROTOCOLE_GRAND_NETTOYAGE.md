# 🧼 PROTOCOLE GRAND NETTOYAGE → SYSTÈME VIERGE « CORE-EN-UN-JOUR »

> Vision de Bruno (gravée le 2026-07-05) : quand tout sera prêt, nettoyage COMPLET
> — comptes, mémoire, historique, connecteurs, clés, tout le système — pour obtenir
> un **système vierge** capable d'accueillir une idée et de la lancer **en un jour** :
> encaissement, gestion, création du CORE individuel sur un serveur, et mise de ce
> cerveau à disposition d'un **partenaire unique, affilié à vie**.
>
> ⏱️ Déclencheur : APRÈS le lancement du 14 juillet, sur ordre explicite de Bruno
> (« GRAND NETTOYAGE »). Rien n'est effacé avant. Ce document est le plan, prêt.

---

## 0. CE QUI EST SACRÉ (jamais nettoyé — c'est l'ADN)

| Élément | Où |
|---|---|
| Bible, Classeur, Règlement BM, CLAUDE.md | repo Git (main) |
| Règles gravées (n°1→20+) & doctrines | `core_reglement`, `navlys_memoire` |
| Le prompt maître (branches vides) | `/navpush` + ce repo |
| L'emblème (cerf + arc + 9 lisses) & la charte | `live-source/media/` |
| Les briques serveur (code) & migrations SQL | repo Git |
| skills-lock.json (studio vidéo) | repo Git |

Le nettoyage efface les DONNÉES et les ACCÈS, jamais le SAVOIR.

## 1. NETTOYAGE DES COMPTES & CONNECTEURS

**Utilisés réellement (à conserver, rotation de clés) :**
Supabase · Vercel · GitHub · Anthropic · OpenRouter · ElevenLabs · HeyGen ·
fal.ai · Alpaca (paper) · Zapier (ponts ElevenLabs/HeyGen/Gmail/Telegram/Publer) ·
Google Workspace (bruno@navlys.com) · Canva.

**Connectés mais NON utilisés (à déconnecter au nettoyage) :**
FMP · Docusign · PayPal · Semrush · Spotify · Kiwi · Notion · Dropbox · Figma ·
Malwarebytes · Descrybe · Synthesize Bio · Microsoft Learn · Supermetrics ·
tout MCP dormant. Règle : un connecteur non utilisé 30 jours = débranché.

**Procédure compte par compte :** exporter ce qui doit l'être → révoquer les
autorisations OAuth → supprimer le compte OU le geler → noter dans le registre.

## 2. NETTOYAGE DES CLÉS (rotation totale)

1. Inventaire des secrets Supabase (Edge Functions → Secrets) — noms seulement,
   jamais les valeurs dans un document.
2. RÉGÉNÉRER chaque clé encore utile chez le prestataire (Anthropic, OpenRouter,
   ElevenLabs, fal, Alpaca, service_role Supabase, tokens Vercel/GitHub).
3. SUPPRIMER les clés mortes ou doublons (ex. ELEVENLAB_KEY invalide, alias).
4. Reposer les neuves sous les noms canoniques (les briques lisent déjà en
   tolérant). Vérifier chaque brique en direct après rotation.
5. Spend limits partout où c'est possible.

## 3. NETTOYAGE MÉMOIRE & HISTORIQUE (base)

**À purger :** `journal` (garder 30 j), `sav_messages` (tests + anciens),
`net._http_response` (tout), `core_feedback` traités, `core_incidents` résolus,
`agent_runs` anciens, missions terminées, données de test (sessions `test-*`).

**À garder :** doctrines, règlement, `core_knowledge` bancarisé, FAQ,
`core_config`, identités des 14 agents, crédits/parrainage réels.

**Avant toute purge :** `sauvegarde` complète (brique existante, 24 tables) +
export SQL daté, stocké hors ligne (PC 32 Go + Hetzner). Purge = réversible.

## 4. NETTOYAGE REPO & SESSIONS

- Squash de l'historique si souhaité (tag `v1-lancement` avant).
- Suppression des branches mortes, artefacts, scratch.
- Nouvelle session Claude vierge (la continuité = CLAUDE.md + Git, déjà gravé).

## 5. LE PRODUIT : « CORE-EN-UN-JOUR » (ce que le nettoyage rend possible)

Pipeline J0, pour UN partenaire unique (affilié à vie) :

| Heure | Étape |
|---|---|
| H0 | L'idée arrive → remplir le PROMPT MAÎTRE (`/navpush`) : identité, charte, branches |
| H+1 | Cloner le repo-template vierge → nouveau repo partenaire |
| H+2 | Provisionner : projet Supabase NEUF dédié + Vercel + domaine |
| H+3 | Poser les secrets NEUFS (jamais partagés entre partenaires) |
| H+4 | Déployer les briques (assistant, voix, retour, veilleur, sauvegarde, météo…) |
| H+6 | Encaissement : rail choisi (PayPlus/banque directe/Lemon) branché |
| H+8 | i18n langue(s) du partenaire + concierge à SA voix (clone ElevenLabs) |
| H+10 | Tests de bout en bout (santé verte) → ouverture de l'accès UTILISATEUR au partenaire |
| J1 | EN LIGNE. Le partenaire exploite SA marque ; NAVLYS WEB SERVICE gère TOUT |

**Principe d'isolation :** 1 partenaire = 1 repo + 1 projet Supabase + 1 jeu de
clés + 1 CORE. Aucun partage de secrets ni de données entre cerveaux.

## 5bis. LE MODÈLE : NAVLYS WEB SERVICE, GESTIONNAIRE DE TOUT
> Précision de Bruno (gravée le 2026-07-05, règle n°22) : le sous-traitant pour
> tout, c'est NOTRE CORE principal — la société israélienne **NAVLYS WEB SERVICE**.
> Tout passe par nous.

- **Domaines** : déposés et détenus par NAVLYS WEB SERVICE (jamais au nom du partenaire).
- **Sites** : déployés et hébergés sur NOS comptes (Vercel/Supabase de la société).
- **Sécurité** : secrets, clés, sauvegardes — créés, détenus et tournés par nous.
- **Gestion** : maintenance, briques, mises à jour, incidents — nous, 24/7.
- **Le partenaire** : utilise le système sous SA marque, encaisse via le rail
  que nous opérons, et reste **dépendant de nous** — c'est le cœur du modèle :
  un abonné-partenaire à vie, pas un propriétaire d'infrastructure.
- **Ce que le partenaire reçoit** : un accès UTILISATEUR/exploitant (cockpit,
  contenus, stats), jamais les accès racine (registrar, hébergeur, base, clés).
- **Contrat (mission NAVLEX)** : licence d'exploitation + affiliation à vie,
  réversibilité encadrée (si départ : la marque part, l'infrastructure reste),
  conformité israélienne (société, facturation, TVA).

## 6. ORDRE D'EXÉCUTION LE JOUR J

1. Sauvegarde totale (base + repo + secrets inventaire) → 2 copies hors ligne.
2. Comptes & connecteurs (§1) → 3. Clés (§2) → 4. Base (§3) → 5. Repo (§4).
6. Test de renaissance : dérouler §5 sur une idée factice en < 1 jour = preuve.
7. Gravé au journal : `grand_nettoyage` fait, système vierge certifié.
