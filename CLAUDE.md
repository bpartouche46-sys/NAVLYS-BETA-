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

> 💰 **RÈGLE FINANCIÈRE ABSOLUE (rappel permanent)** : **Bruno est le SEUL décisionnaire
> final** sur **tout investissement** et **toute validation de débit/paiement** sur **tous
> les comptes** (y compris **partenaires**). Aucun agent ne déclenche un débit sans son feu
> vert. **Seule exception** : les **abonnements classiques déjà en cours**. Détail : `docs/GOUVERNANCE.md`.

---

## 1. À quoi sert ce projet

NAVLYS — **éducation financière + veille stratégique + communauté privée
(« Équipage Navlys »)**. Slogan : *Ma méthode — Ton argent — Ton contrôle.*
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
> Le « core central » Hetzner est un système distinct des sites Vercel (à clarifier).

### Infrastructure connue

| Élément | Détail |
|---------|--------|
| **Cloud principal** | Hetzner (Allemagne) |
| **Rôle** | Héberge le **« core central »** de NAVLYS (système central) |
| Type de serveur | _(à préciser : Cloud VPS / dédié ?)_ |
| Accès | _(à préciser : SSH ? panneau type Coolify/Plesk/Portainer ? Docker ?)_ |
| OS | _(à préciser : Ubuntu / Debian … ?)_ |
| Ce que contient le « core central » | _(à préciser : API ? base de données ? back-office ? sites ?)_ |

> 🔐 **Sécurité** : aucun identifiant, IP, clé SSH ou mot de passe ne doit être écrit
> dans ce dépôt. Ces secrets restent en dehors de Git (voir `.gitignore`).

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
| `docs/ARCHITECTURE-AGENT-DIRECTEUR.md` | Architecture orchestrateur + sous-agents + feuille de route |
| `docs/MEMOIRE-CENTRALE.md` | Consolider les conversations sur le core (puis les supprimer) |
| `docs/STRATEGIE-NAVLYS.md` | Positionnement, méthode 90/10, conformité, produits (F1/F2/F3) |
| `docs/DESIGN-NAVLYS.md` | Charte (Ice Blue `#7DD3FC`, polices), patterns, conformité visuelle |
| `docs/JOURNAL-ERREURS.md` | Liste des erreurs passées — à ne JAMAIS reproduire |
| `docs/CHECKLIST-SECURITE.md` | Vérifications obligatoires avant/après chaque action |
| `docs/ROUTINE.md` | La routine pas-à-pas sécuriser/contrôler/corriger |
| `docs/ETAT-DES-LIEUX.md` | Où on en est (mis à jour à chaque fin de session) |
| `.claude/agents/gardien.md` | L'agent de contrôle |
| `.claude/commands/controle.md` | La commande `/controle` |
