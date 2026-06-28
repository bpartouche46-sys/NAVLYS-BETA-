# 🤖 AUTONOMIE DE CLAUDE — modèle opérationnel (décidé par Bruno, 2026-06-28)

> **Décision Bruno (2026-06-28)** : on **abandonne le détour Hetzner** et on travaille
> **nativement sur la vraie stack Vercel + Supabase**, à laquelle Claude a un **accès direct
> vérifié**. Claude devient **autonome pour mettre à jour les sites**, depuis n'importe où
> (mobile, nouveau PC, ou à l'oral), **avec ou sans Bruno en direct** — dans les limites ci-dessous.
>
> Ce document est la **source de vérité** de « qui peut faire quoi ». Il **amende** `GOUVERNANCE.md`
> §2 et §4. Les **règles gravées** (`GOUVERNANCE.md` §0) et la **règle financière** (§3) restent
> **inchangées et au-dessus de tout**.

---

## 1. Pourquoi ce changement

- L'objectif de Bruno : *« ne plus avoir à utiliser l'ancien PC ; tout faire depuis le nouveau
  ou le mobile ; que le site se mette à jour avec ou sans moi. »*
- Constat vérifié le 2026-06-28 : **les sites vivent sur Vercel + Supabase**, et Claude y a un
  **accès live** via MCP. Le « core Hetzner » est **legacy** (0 conteneur actif) → inutile de
  transférer quoi que ce soit dessus. **Inaccessible en SSH à Claude de toute façon.**

---

## 2. Ce à quoi Claude a réellement accès (vérifié 2026-06-28)

| Brique | Accès Claude | Détail |
|--------|--------------|--------|
| **Vercel** (équipe NAVLYS `team_nBtY5FOQMPIT4J8Bmf7wvBSC`) | ✅ direct (MCP) | 6 projets : `navlys-app`, `navbio`, `brunopartouche`, `navlys-io`, `navlys-teaser`, `brunopartouche-teaser`. Lister, voir déploiements/logs, **déployer**, **rollback**. |
| **Supabase** (`navlys-core`, eu-west-3) | ✅ direct (MCP) | Lire/écrire la base (`journal`, `dossiers`, `core_knowledge`, `missions`, `agents`, `inscriptions`…), migrations, edge functions. RLS actif. |
| **GitHub** (`bpartouche46-sys/navlys-beta-`) | ✅ ce dépôt only | Code + mémoire. ⚠️ **NOVA-HUB non accessible** (hors scope). |
| **Google Drive / Gmail / Stripe / PayPal** | ✅ (MCP) | Lecture Drive (canal d'import de fichiers), mails, paiements (lecture). |
| **Hetzner (SSH)** | ❌ jamais | Hors d'atteinte + interdit aux agents. Abandonné (legacy). |
| **Disque de l'ancien PC** | ❌ jamais | Les fichiers doivent **transiter** par GitHub ou Drive. |

> 🔐 Tous ces accès MCP sont **révocables en 1 geste** par Bruno (déconnexion du connecteur) —
> conforme au principe « tout accès tiers doit être révocable » (`GOUVERNANCE.md` §2).

---

## 3. Niveaux d'autonomie — QUI fait QUOI (amende GOUVERNANCE §4)

### 🟢 Claude fait SEUL (autonome, sans feu vert par action)
- Modifier le **code et le contenu** des sites (design, textes, structure, correctifs).
- **Déployer en PRODUCTION** sur Vercel — **après** son auto-contrôle conformité (voir §4).
- Lire/écrire la **base Supabase** (corrections de données, contenu éditorial, mémoire).
- **Rollback** immédiat d'un déploiement qui pose problème (filet de sécurité Vercel).
- Tenir la **mémoire** à jour (`ETAT-DES-LIEUX`, journal d'erreurs).

> ⚠️ **Changement de règle gravée** : l'ancienne règle « tout contenu public = feu vert Bruno »
> est **assouplie par décision explicite de Bruno (2026-06-28)** → Claude peut publier en prod
> seul. La **conformité (gardien)** reste **obligatoire** avant chaque mise en ligne.

### 🔴 TOUJOURS Bruno (jamais Claude seul) — non négociable
- 💰 **Argent** : tout débit/paiement/prélèvement/investissement/nouveau partenaire, sur tous
  les comptes (Stripe, PayPal, partenaires…). Règle financière `GOUVERNANCE.md` §3 **intacte**.
  Exception : abonnements classiques déjà en cours.
- ⚖️ **Juridique** : mentions légales, CGU/confidentialité, entité, contrats, DPA, AIPD.
- 🚪 **Le GATE / date de lancement public** (`NEXT_PUBLIC_LAUNCH_UNLOCKED`) — règle gravée 3.
- 🗑️ **Suppressions** (fichier, projet, données, DNS) — règle gravée 8 : OK Bruno **+ backup**.
  Rappel gravé : **MX Google `navlys.com` à PRÉSERVER**.
- 🔑 **Secrets** : rotation/création de clés et tokens (Claude ne les écrit jamais dans Git).

---

## 4. Garde-fous AVANT chaque mise en production (obligatoire)

Claude est autonome, **pas imprudent**. Avant tout déploiement public :

1. 🚦 **Contrôle conformité (gardien)** — lignes rouges : zéro promesse de rendement, zéro
   conseil perso, pas d'Israël/Ashkelon/Jérusalem, **disclaimer présent**, dépersonnalisation
   (Bruno invisible sur NAVLYS), ton maritime. Grep sur **HTML + JS + CSS** (cf. ERR-005).
2. 🎨 **Charte** : Ice Blue `#7DD3FC` (zéro `#5fe0ff` résiduel), polices Cinzel/Cormorant/JetBrains.
3. 🧰 **Règle gravée 7** : **un seul `deploy` à la fois**, attendre l'état **READY** (jamais deux
   déploiements enchaînés). Secrets en **env only**, jamais en clair.
4. 🛟 **Filet** : noter le déploiement précédent (rollback candidate) pour revenir en 1 geste.
5. 📓 **Tracer** dans `ETAT-DES-LIEUX` : quoi déployé, où, quand (le **fait**, pas les secrets).

---

## 5. Comment Bruno me pilote depuis n'importe où

GitHub + Supabase + Vercel étant dans le cloud, Bruno n'a **plus besoin de l'ancien PC** :

- 📱 **Mobile / web** : Bruno écrit à Claude (app Claude) « change X sur navlys.com » → Claude
  modifie, contrôle, déploie, répond avec l'URL. Aucun ordinateur requis.
- 💻 **Nouveau PC** : pareil, + possibilité d'éditer le code en local et `git push`.
- 🤝 **En direct ou en différé** : Claude agit seul (§3 🟢) et journalise ; Bruno relit quand
  il veut. Pour l'argent/juridique (§3 🔴), Claude **prépare** et **attend** le feu vert.

---

## 6. Ce qui manque pour l'autonomie COMPLÈTE (à régler)

1. **Le vrai code source des sites live dans ce dépôt** (décision Bruno : **push GitHub**).
   - Les déploiements actuels sont en **CLI** (`source: cli`, non reliés à Git) → le code live
     n'est pas encore ici. Tant qu'il n'y est pas, Claude risque l'écueil **ERR-006** (écraser
     la voix / les pages live avec la v2 incomplète).
   - 👉 **Action Bruno** : publier chaque dossier de site dans `navlys-beta-` (monorepo, 1
     sous-dossier par site) via **GitHub Desktop**. Guide : `docs/SAUVEGARDE-CODE-VERCEL.md`
     + liaison `docs/PROCEDURE-VERCEL-GITHUB.md`.
2. **(Idéal) Relier chaque projet Vercel à son sous-dossier GitHub** (Root Directory) → un push
   = un déploiement, 100 % automatique. Cette liaison se fait **côté Bruno** (dashboard Vercel).
   En attendant, Claude déploie via l'outil Vercel (MCP) après contrôle conformité.

> ✅ Dès que le point 1 est fait, Claude peut mettre à jour **n'importe quel site, seul, depuis
> n'importe où**. Le point 2 rend ça automatique au `git push`.

---

## 7. Statut au 2026-06-28

- ✅ Accès live Vercel + Supabase **vérifié**.
- ✅ Modèle d'autonomie **décidé et gravé** (ce document).
- ⏳ **En attente Bruno** : push du code source des sites dans `navlys-beta-` (point 6.1).
- ⏳ **Optionnel Bruno** : liaison Vercel↔GitHub par projet (point 6.2).
- 🔴 Inchangé : **argent + juridique = Bruno** ; conformité (gardien) **obligatoire** avant prod.
</content>
