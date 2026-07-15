# CLAUDE.md — Mémoire permanente du projet NAVLYS

> Ce fichier est lu par Claude **au début de chaque session**.
> Il remplace la « mémoire » de la conversation : tout ce qui compte doit être
> écrit ici ou dans les fichiers de `docs/`, jamais gardé seulement « dans la tête ».
> **Objectif n°1 : ne jamais refaire deux fois la même erreur.**

---

## 0. RÈGLE D'OR (à appliquer à CHAQUE session)

Avant toute action, Claude DOIT :

1. **Lire** `docs/JOURNAL-ERREURS.md` (la liste des erreurs déjà commises).
2. **Lire** `docs/CHECKLIST-SECURITE.md` (les vérifications obligatoires).
3. **Lire** `docs/GOUVERNANCE.md` (les 3 principes fondamentaux non négociables).
4. **Vérifier** qu'aucune action prévue ne reproduit une erreur déjà listée.
5. À la **moindre erreur nouvelle**, l'ajouter immédiatement au journal AVANT de continuer.
6. **Capitaliser** (principe zéro répétition) : avant d'agir, vérifier qu'une routine/skill/doc
   n'existe pas déjà ; après avoir agi, l'enregistrer si c'est reproductible.

Si une de ces étapes est sautée, le travail est considéré comme **non valide**.

> 🪙 **RÈGLE GRAVÉE N°1 — DÉPERSONNALISATION (rappel permanent)** : **NAVLYS = marque produit
> DÉPERSONNALISÉE.** Bruno est **invisible** sur NAVLYS ; il « vit » sur **brunopartouche.com**
> (sa vie, son CV, le BRUNO COIN). Sens de la réputation : **Bruno → NAVLYS, jamais l'inverse.**
> NAVLYS ne se présente JAMAIS comme « le projet de Bruno conseiller » : c'est un **média éditeur
> pédagogique** (publisher), **PAS CIF / PAS ORIAS / PAS IOBSP**, ni conseil, ni placement, ni
> encaissement de fonds clients. Source : `recup-docs/onedrive/00_ORGANIGRAMME.md` (§ « Règles gravées »,
> règle 1) + `recup-docs/onedrive/_MASTER_NAVLYS_NOW.md`. Détail : `docs/GOUVERNANCE.md` (8 règles gravées).
> ✅ **ARBITRAGE BRUNO 2026-07-15 (tranché) — INCARNATION ASSUMÉE** : Bruno a décidé de **garder
> Bruno visible/audible** sur les sites NAVLYS (avatar + voix clonée + nom). **Condition obligatoire
> pour rester conforme** : ajouter **partout** où la voix/l'avatar cloné apparaît le disclaimer
> **« voix générée par IA »** (exigence RGPD art. 9 + IA Act art. 50), et **jamais** de positionnement
> de conseiller (ni CIF/ORIAS, ni conseil perso). La règle n°1 « Bruno invisible » est donc
> **assouplie** par ce choix explicite : l'incarnation est permise AVEC disclaimer IA. Voir
> `docs/RENFORCEMENT/02-communication.md` + `docs/ETAT-DES-LIEUX.md` (session 2026-07-15).

> 💰 **RÈGLE FINANCIÈRE ABSOLUE (rappel permanent)** : **Bruno est le SEUL décisionnaire
> final** sur **tout investissement** et **toute validation de débit/paiement** sur **tous
> les comptes** (y compris **partenaires**). Aucun agent ne déclenche un débit sans son feu
> vert. **Seule exception** : les **abonnements classiques déjà en cours**. Détail : `docs/GOUVERNANCE.md`.

---

## 1. À quoi sert ce projet

NAVLYS — **éducation financière + veille stratégique + communauté privée
(« Équipage Navlys »)**. Slogan **officiel figé (Bruno, 2026-06-25)** : *Ma méthode — Ton argent — Ton rythme.*
Méthode **90/10** (90 % Forteresse ETF/DCA + 10 % Capital Plaisir). Statut :
**finfluenceur déclaré, ZÉRO ORIAS / ZÉRO CIF** → éducation uniquement, jamais de
conseil personnalisé. Détails : **`docs/STRATEGIE-NAVLYS.md`**.

Volet technique : gestion et modification de sites web.
Les sites publics sont déployés sur **Vercel** (équipe `NAVLYS`). Carte détaillée et à
jour : **`docs/CARTE-SITES.md`**. ⚠️ Aucun projet n'est relié à GitHub (code non versionné).

| Site (projet Vercel) | Domaine principal | Hébergeur | Dépôt GitHub | Statut |
|------|-----|--------|------|--------|
| navlys-app | navlys.com | Vercel | ❌ non relié | 🟢 actif |
| brunopartouche | brunopartouche.com | Vercel | ❌ non relié | 🟢 actif |
| navbio | navbiolife.com / navbiolive.com | Vercel | ❌ non relié | 🟢 actif |
| navlys-io | navlys.io | Vercel | ❌ non relié | 🟠 non-live ? |
| navlys-teaser | navlys-teaser.vercel.app | Vercel | ❌ non relié | 🟢 actif |
| brunopartouche-teaser | brunopartouche-teaser.vercel.app | Vercel | ❌ non relié | 🟠 non-live ? |

> Équipe Vercel : `NAVLYS` / `team_nBtY5FOQMPIT4J8Bmf7wvBSC` — compte bpartouche46@gmail.com.

### 🟢 ÉTAT RÉEL DU PROJET (corrigé 2026-06-25 d'après `recup-docs/`)

- **Statut = LANCÉ / phase BETA active.** Le **gate a été ouvert** (31 mai → 1ᵉʳ juin 2026 selon les
  docs ; le countdown public actuel affiche 1ᵉʳ juillet → **incohérence à trancher par Bruno**).
  Source : `recup-docs/onedrive/_MASTER_NAVLYS_NOW.md` (« lancement gate passé le 31 mai 2026 ✓,
  phase BETA en cours »). Détail des dates et arbitrage : `docs/ETAT-DES-LIEUX.md` + `docs/RENFORCEMENT/01-strategie.md`.

### Infrastructure / stack RÉELLE (corrigée 2026-06-25 · Hetzner rétabli 2026-07-15)

> ✅ **CORRECTION 2026-07-15 (ERR-008)** : **Hetzner = notre SERVEUR CENTRAL** (Hetzner Cloud,
> Nuremberg). Il fait tourner le **core central NAVLYS** + des **IA en local**. **NE PAS écrire
> « abandonné/legacy »** (erreur passée). Cap gravé par Bruno : **tout en applications cron locales
> indépendantes sur Hetzner**, **ouvertes aux recherches web** → **Vercel + Supabase = de simples
> OUTILS** (vitrine + base), pas le cerveau. Localisation du core : **`/root/navlys/`** (~9 dossiers)
> · secrets `/root/navlys/config/.env` · cockpit `/var/www/cockpit/` · mémoire clonée
> `/root/navlys/memoire`. ⚠️ **Claude n'a AUCUN accès SSH à Hetzner** → il livre le code via GitHub,
> Hetzner le tire (cron `scripts/sync-core.sh`). « Pas d'accès pour Claude » ≠ « inutile ». Le
> diagnostic 22/06 (« 0 conteneur actif ») était une **photo à un instant t**, pas une preuve
> d'abandon. Objectif tokens : **routeur multi-IA sur les quotas gratuits quotidiens** (1 compte/IA).

| Brique | Réalité (sources `recup-docs/`) |
|--------|---------------------------------|
| **Front / Host** | **Vercel** (team NAVLYS) — Next.js 14 (apps), Next.js 15.5 (brunopartouche). Edge Frankfurt. |
| **DB / Auth** | **Supabase EU** (RLS, magic link / OAuth). |
| **Emails** | **Resend** (transactionnels + marketing). |
| **Monitoring** | **Sentry** (+ PostHog analytics, Vercel Analytics). |
| **Voix** | **ElevenLabs** (clone Bruno, `eleven_multilingual_v2`) ; cache **Cloudflare R2** ; `VOICE_ID` en env serveur uniquement. |
| **IA** | **Anthropic Claude** (Haiku par défaut, escalade Sonnet) — NAV IA / SAV / NAVLEX. *(NAVBIO mentionne aussi OpenAI → à clarifier.)* |
| **Paiements** | **Stripe** (compte non encore créé d'après MASTER ; pack code prêt). |
| **WhatsApp** | **360dialog (D360)** — mentionné, intégration à confirmer. |
| **WAF / DNS** | **Cloudflare** (WAF, Bot Fight, R2) + DNS Namecheap. **MX Google `navlys.com` à PRÉSERVER.** |

> 🎨 **Charte couleur confirmée** : Ice Blue **`#7DD3FC`** (officiel, cf. `recup-docs/onedrive/_AUDIT_CHARTE_COULEURS.md`).
> Tout `#5fe0ff` résiduel = à corriger. Polices : Cinzel (titres) + Cormorant Garamond (corps) + JetBrains Mono (chiffres).

> 🔐 **Sécurité** : aucun identifiant, IP, clé SSH ou mot de passe ne doit être écrit
> dans ce dépôt. Ces secrets restent en dehors de Git (voir `.gitignore`).
> 🔴 **Alerte ouverte** : un **token Vercel** a été partagé en clair (cf. `_MASTER_NAVLYS_NOW.md`)
> → **à révoquer + régénérer par Bruno** (action sensible = Bruno).

---

## 2. Comment on travaille (règles de fond)

- **Une chose à la fois.** Pas de grosse tâche en un seul bloc → on découpe.
- **Tout est commité.** Aucun travail ne reste seulement dans la conversation.
- **Petits commits fréquents** avec un message clair (quoi + pourquoi).
- **On teste avant de pousser.** Si on ne peut pas tester, on le dit clairement.
- **Jamais sur la branche principale directement** sans accord explicite.
- **En cas de doute → on demande**, on n'invente pas.

---

## 3. Anti-saturation mémoire

- Les informations importantes vont dans des **fichiers**, pas dans la discussion.
- On préfère **plusieurs sessions courtes** à une seule session géante.
- Avant de finir une session : mettre à jour `docs/ETAT-DES-LIEUX.md`
  (« où on en est ») pour que la session suivante reprenne sans tout relire.

---

## 4. Le Gardien (agent de contrôle)

Un agent dédié, **« gardien »** (`.claude/agents/gardien.md`), peut être lancé à tout
moment pour : **sécuriser → contrôler → corriger → enregistrer la leçon**.
Commande rapide : `/controle` (voir `.claude/commands/controle.md`).

---

## 5. Fichiers de référence

| Fichier | Rôle |
|---------|------|
| `docs/GOUVERNANCE.md` | **Principes fondamentaux** : zéro répétition · surveillance mutuelle · règle financière (Bruno seul décide) |
| `docs/AUTONOMIE-CLAUDE.md` | **Modèle opérationnel (2026-06-28, corrigé 2026-07-15)** : Claude autonome sur Vercel+Supabase (déploie/publie seul après conformité) ; **argent + juridique + GATE = Bruno**. **Hetzner = serveur central actif** (core + IA locales, piloté via GitHub car pas de SSH — ERR-008). Mode boucle active depuis 2026-07-15. |
| `docs/MIGRATION-ANCIEN-PC.md` | Guide migration ancien→nouveau PC + auto-sync (le volet Hetzner devient optionnel — voir AUTONOMIE-CLAUDE) |
| `docs/ARCHITECTURE-AGENT-DIRECTEUR.md` | Architecture orchestrateur + sous-agents + feuille de route |
| `docs/MEMOIRE-CENTRALE.md` | Consolider les conversations sur le core (puis les supprimer) |
| `docs/STRATEGIE-NAVLYS.md` | Positionnement, méthode 90/10, conformité, produits (F1/F2/F3) |
| `docs/REGISTRE-VALIDATIONS-FINANCIERES.md` | **Registre central** des débits/paiements détectés (Gmail) en attente du feu vert de Bruno (règle financière §3) |
| `docs/DESIGN-NAVLYS.md` | Charte (Ice Blue `#7DD3FC`, polices), patterns, conformité visuelle |
| `docs/PHASE-0-SUIVI.md` | Tableau de suivi Phase 0 (sécuriser : snapshot, sauvegardes, code sous Git) |
| `docs/JOURNAL-ERREURS.md` | Liste des erreurs passées — à ne JAMAIS reproduire |
| `docs/CHECKLIST-SECURITE.md` | Vérifications obligatoires avant/après chaque action |
| `docs/ROUTINE.md` | La routine pas-à-pas sécuriser/contrôler/corriger |
| `docs/ETAT-DES-LIEUX.md` | Où on en est (mis à jour à chaque fin de session) |
| `.claude/agents/gardien.md` | L'agent de contrôle |
| `.claude/commands/controle.md` | La commande `/controle` |
