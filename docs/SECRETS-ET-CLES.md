# 🔐 SECRETS & CLÉS — runbook (rotation, stockage, jamais dans Git)

> **But** : que Bruno puisse **refaire / faire tourner (rotation)** tous les mots de passe
> et clés **proprement et en sécurité**, et que chaque agent sache **où** une clé est censée
> vivre — **sans jamais l'écrire dans ce dépôt**.
>
> 🔴 **Règle absolue** : **aucune** clé, mot de passe, token, IP privée ou secret n'est écrit
> dans Git. Ils vivent **uniquement** dans : un fichier `.env` local (ignoré par Git), le
> gestionnaire de secrets de l'hébergeur (Vercel/Hetzner), ou un **gestionnaire de mots de
> passe** (Bitwarden/1Password/KeePass). Ce fichier ne contient que des **noms** et des
> **procédures**, **jamais de valeurs**.

---

## 0. Pourquoi une rotation maintenant (contexte)

Des secrets ont pu transiter par des chats / l'ancien PC (cf. `ETAT-DES-LIEUX` :
« changer le mot de passe du cockpit car exposé en clair dans un chat »). Quand un secret a
**peut-être** été vu ailleurs qu'à son emplacement sûr, on ne se demande pas s'il est
compromis : **on le régénère**. Bruno a décidé de **refaire les mots de passe et les clés** —
ce runbook cadre l'opération.

---

## 1. Inventaire des secrets (NOMS seulement — valeurs hors Git)

> ⚠️ Liste à compléter par Bruno. **Ne jamais** coller la valeur ici.

| # | Secret | Où il sert | Où il DOIT vivre | Rotation |
|---|--------|------------|------------------|----------|
| S1 | **Mot de passe cockpit** (`bruno / …`) | interface d'admin Hetzner | gestionnaire de mots de passe | 🔁 à refaire (exposé chat) |
| S2 | **Clé SSH serveur Hetzner** | accès SSH au core | `~/.ssh/` du/des PC autorisés (jamais copiée dans un chat) | 🔁 régénérer paire + retirer l'ancienne de `authorized_keys` |
| S3 | **Mot de passe / accès Hetzner Console** | console.hetzner.cloud | gestionnaire de mots de passe + 2FA | 🔁 vérifier 2FA actif |
| S4 | **ANTHROPIC_API_KEY** (moteur du core) | orchestrateur Agent SDK | `.env` serveur (hors Git) | 🔁 nouvelle clé dédiée au core |
| S5 | ~~OpenRouter API key (Hermès)~~ | ❌ **RÉVOQUÉE** — Hermès retiré | — | 🛑 voir `docs/INCIDENT-HERMES.md` (ERR-006) |
| S6 | **GitHub token** (PAT / fine-grained) | push/PR depuis le core | secret CI / `.env` serveur | 🔁 scope minimal (repo voulu only) |
| S7 | **Vercel token** | déploiement sites | Vercel env / `.env` serveur | 🔁 scope équipe NAVLYS |
| S8 | **Supabase** (`anon` public + `service_role` secret) | base `navlys-core` | anon = public OK ; `service_role` = **secret strict** | 🔁 régénérer `service_role` si exposé |
| S9 | **Stripe** (clés `sk_…`) | paiements | secret strict, **mode test d'abord** | 🔁 + voir §règle financière |
| S10 | **Gmail / OAuth** (SAV) | lecture/envoi mails | OAuth tokens hors Git | 🔁 selon besoin |

> 🧩 Chaque ligne du moteur correspond à une variable de `core/.env.example` (noms alignés).

---

## 2. Procédure de rotation (générique, à répéter par secret)

1. **Générer** le nouveau secret depuis le fournisseur officiel (console Anthropic, Vercel,
   GitHub, Supabase, Stripe…). Pour SSH : `ssh-keygen -t ed25519 -C "navlys-core"`.
2. **Stocker** la valeur **uniquement** dans : le gestionnaire de mots de passe **et/ou** le
   `.env` du serveur **et/ou** le panneau « secrets » de l'hébergeur. **Jamais** dans Git,
   jamais collé dans un chat.
3. **Déployer** : mettre à jour `.env` / les variables d'environnement, redémarrer le service.
4. **Révoquer l'ancien** secret côté fournisseur (et retirer l'ancienne clé SSH de
   `~/.ssh/authorized_keys` sur le serveur).
5. **Vérifier** que tout refonctionne avec le nouveau (login, déploiement de test, etc.).
6. **Tracer** (sans la valeur) : noter dans `ETAT-DES-LIEUX` « S4 régénérée le JJ/MM » —
   le **fait**, pas le secret.

---

## 3. Bonnes pratiques permanentes

- ✅ **Principe du moindre privilège** : chaque token a le **scope minimal** (un repo, une
  équipe) et pas plus.
- ✅ **2FA partout** où c'est possible (Hetzner, GitHub, Vercel, Anthropic, Stripe, Google).
- ✅ **Clés distinctes par usage** (une clé Anthropic pour le core ≠ clé perso) → on révoque
  l'une sans tout casser.
- ✅ **`.env` jamais committé** : déjà couvert par `.gitignore` (`.env`, `.env.*`, `*.key`,
  `*.pem`, `secrets/`, `credentials*.json`).
- ✅ **Scan régulier** : `git log -p | grep -iE 'api[_-]?key|secret|password|token'` pour
  vérifier qu'aucune valeur n'a fuité dans l'historique. (Le gardien le fait aussi.)
- ❌ Ne **jamais** envoyer un secret par chat/mail/Discord. Si ça arrive → **rotation** (§2).

---

## 4. Si un secret a fuité (réflexe d'urgence)

1. **Régénérer immédiatement** (§2) — ne pas attendre.
2. **Révoquer** l'ancien côté fournisseur.
3. Vérifier les **logs d'accès** (connexions inhabituelles).
4. Consigner l'incident dans `JOURNAL-ERREURS.md` (sans la valeur) avec le garde-fou.

---

> 📌 **Lien moteur** : les variables attendues par l'orchestrateur sont listées, **sans
> valeurs**, dans `core/.env.example`. Bruno (ou un opérateur serveur de confiance à
> redéfinir) copie ce fichier en `.env` (ignoré par Git) et y met les vraies valeurs
> **sur le serveur uniquement**.
