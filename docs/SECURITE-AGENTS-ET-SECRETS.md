# Sécurité — accès des agents & secrets à roder avant lancement

> Décision de gouvernance prise par **Bruno** le 2026-06-22.
> 🔐 Règle d'or : **aucune** valeur de secret (mot de passe, clé, token, IP, clé SSH)
> n'est écrite dans ce fichier ni dans le dépôt. On n'y liste que **où ça vit** et **quoi faire**.

## 1. Décision : les agents IA n'ont AUCUN accès

- **Hermès a été déconnecté du SSH Hetzner** par Bruno.
- Règle posée : **Hermès et Claude aident en CONSEIL UNIQUEMENT — zéro accès** à quoi que ce
  soit (serveur, comptes, bases, clés, paiements).
- **Bruno est le seul exécuteur** des actions sensibles. Quasi tous les comptes sont déjà
  protégés en **2FA / double authentification** (app sur mobile). ✅
- Conséquence sur la vision « agent directeur » (cf. `ETAT-DES-LIEUX` session f) : l'orchestration
  se fait **par le conseil** — les agents proposent plans + commandes, **Bruno exécute**.
  Aucun agent ne détient de credentials.

## 2. Modèle d'accès cible

| Acteur | Accès | Rôle |
|--------|-------|------|
| **Bruno** | tout (protégé 2FA) | **seul exécuteur**, seul décideur argent |
| **Claude** (moi) | **GitHub (ce dépôt) uniquement** | code + conformité + guidage pas-à-pas ; aucun accès serveur/comptes |
| **Hermès** | **aucun** (déconnecté) | conseil / ops *sans* credentials |
| **gardien** | dépôt (lecture/édition) | contrôle conformité |

## 3. Secrets / clés à risque — inventaire & rotation AVANT lancement

> Repérés pendant les sessions. **Aucune valeur** n'est notée ici — uniquement l'action.

| Élément | Où | Action avant lancement | Statut |
|---------|-----|------------------------|--------|
| Mot de passe **root Hetzner** | collé en clair dans un chat | **réinitialisé** ; puis **SSH en clés** + couper login par mot de passe | 🟡 réinit. faite, SSH-clés à faire |
| Mot de passe **cockpit** (`bruno/…`) | collé en clair (ETAT f) | **changer** | 🔴 à faire |
| Mots de passe tapés en console / anciens (`nova2026`, etc.) | chat / console | **changer partout**, vérifier non réutilisés | 🔴 à faire |
| Clé **Supabase `anon`** | visible dans la home navlys.com (JS, public par design) | OK **si RLS strict** (insert-only sur `inscriptions`) → **vérifier les policies** ; ne **jamais** exposer la clé `service_role` | 🟡 à vérifier |
| **Tokens GitHub / clés API** (dont l'accès LLM d'Hermès) | divers | **révoquer + recréer** ce qui a pu fuiter | 🔴 à faire |
| **Secrets en dur dans le code** des sites/apps | code source (à auditer) | **grep secrets** avant tout déploiement ; déplacer en **variables d'environnement** | 🔴 à faire |

## 4. Garde-fous (rappel)

- Aucun secret n'entre dans le dépôt (règle d'or). ✅ vérifié ce jour : dépôt propre.
- **Avant toute mise en ligne** : (1) audit « secrets en dur », (2) rotation des clés à risque,
  (3) 2FA partout, (4) accès agents = zéro.
- **Argent = Bruno seul** (cf. `GOUVERNANCE.md`).
- Les agents proposent ; **Bruno exécute** les actions sensibles.
