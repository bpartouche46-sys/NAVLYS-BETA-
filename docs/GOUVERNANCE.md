# ⚖️ GOUVERNANCE NAVLYS — principes fondamentaux (non négociables)

> Décidé par Bruno le 2026-06-22. Ces principes priment sur tout le reste.
> Ils sont reliés à la règle d'or de `CLAUDE.md` (lue à chaque session).

---

## 0. 🪙 LES 8 RÈGLES GRAVÉES (consolidées du « cerveau » récupéré, 2026-06-25)

> Source : `recup-docs/onedrive/00_ORGANIGRAMME.md` (§ « Règles gravées valables pour tous les
> départements », règles 1→7) + `recup-docs/onedrive/_MASTER_NAVLYS_NOW.md` (§ « INTERDITS gravés »).
> Ces 8 règles sont **au-dessus** de tout le travail NAVLYS (stratégie, com, code, calculs, légal).

1. **DÉPERSONNALISATION.** NAVLYS = marque produit dépersonnalisée. **Bruno invisible** sur NAVLYS
   (il vit sur **brunopartouche.com**). Réputation : **Bruno → NAVLYS, jamais l'inverse.**
2. **NI CONSEIL, NI PLACEMENT, NI ENCAISSEMENT.** NAVLYS = **éditeur pédagogique** (publisher).
   **PAS CIF / PAS ORIAS / PAS IOBSP.** On vend de l'information et une méthode — jamais un conseil
   personnalisé, jamais un ordre (RTO), jamais des fonds clients.
3. **LE GATE / LE LANCEMENT EST UN POINT DE CONTRÔLE.** Ne jamais déverrouiller / ouvrir un accès
   public avant la date décidée (`NEXT_PUBLIC_LAUNCH_UNLOCKED` reste `false` tant que non décidé).
   *(Historiquement « avant 31 mai » ; statut actuel = BETA. Date effective à figer par Bruno.)*
4. **PARTENAIRES = CARBURANT SEO.** Chaque broker/banque cité **ramène vers NAVLYS** (sens
   partenaire → NAVLYS). Affiliation en **mode publisher CPA** (comme un média/YouTubeur), pas
   apport d'affaires. On les garde tous.
5. **ZÉRO BOT.** Aucun auto-like / auto-follow / auto-DM. La réputation est l'**actif n°1**.
6. **TON MARITIME + DISCLAIMER.** Langage simple, imagé, maritime, tutoiement, phrases ≤ 20 mots.
   **Disclaimer éducatif en pied de page PARTOUT** (« Information éducative, pas un conseil personnalisé »).
7. **SECRETS = ENV ONLY + JAMAIS 2 DÉPLOIEMENTS ENCHAÎNÉS.** Aucun token/clé/`VOICE_ID`/IBAN en
   clair dans un fichier (variables d'environnement uniquement). Et **jamais deux `vercel deploy`
   rapprochés** (cause de 404 transitoires / builds en erreur concurrents) — un seul à la fois,
   attendre READY.
8. **RIEN SUPPRIMÉ SANS OK BRUNO + BACKUP.** Aucune suppression (fichier, projet, donnée) sans
   sauvegarde (`.bak` / `_ARCHIVE/`) **et** feu vert explicite de Bruno. On liste, on n'efface pas.
   Cas particulier gravé : **MX Google `navlys.com` à PRÉSERVER** sur toute modification DNS.

> 🔁 Ces 8 règles sont déclinées concrètement par domaine dans `docs/RENFORCEMENT/`.

---

## 1. 🔁 Principe « ZÉRO RÉPÉTITION » (capitaliser, jamais refaire deux fois)

> « Je ne veux plus jamais avoir à répéter deux fois ou faire deux fois la même chose. »

Toute tâche faite **une fois** doit être **capturée** pour être **réutilisable** :

| Type de capitalisation | Où | Exemple |
|---|---|---|
| **Knowledge** (savoir) | `docs/*.md` | une décision, un fait, une carte |
| **Compétence** (skill) | `.claude/commands/` ou `.claude/skills/` | `/controle`, `/second` |
| **Routine** (procédure) | `.claude/agents/` + `docs/ROUTINE.md` | gardien, directeur, runbooks |

**Réflexe obligatoire :**
- **Avant** d'agir → vérifier si une routine / un skill / un doc existe **déjà** (ne pas réinventer).
- **Après** avoir agi → si c'est reproductible, **l'enregistrer** comme knowledge/skill/routine.
- Tout est **relié au core central** (dépôt Git cloné sur Hetzner = mémoire commune synchronisée).

---

## 2. 🤖 Orchestration BRIDÉE + contrôle (aucun orchestrateur tiers « de confiance »)

> ⚠️ **Révisé le 2026-06-24** après l'incident **Hermès** (`ERR-006` / `docs/INCIDENT-HERMES.md`).
> L'ancien modèle « deux orchestrateurs en surveillance mutuelle » incluait **Hermès** (LLM
> externe via OpenRouter + accès serveur Hetzner), **retiré pour risque de sécurité majeur**.
> Leçon : **on ne fait plus confiance par défaut à un agent tiers** ; trop d'accès concentrés
> sur un intervenant non révocable rapidement.

- **Claude** = cerveau **code + conformité**, via **GitHub** (aucun accès serveur direct).
- **Le gardien** (`.claude/agents/gardien.md`) = **arbitre** conformité/sécurité.
- **Tout opérateur serveur futur** est **bridé par le moteur du core** (liste blanche d'outils,
  hooks `PreToolUse`, `bypassPermissions` interdit) — **jamais** orchestrateur autonome de confiance.

Règle : **aucun agent n'agit en aveugle ni sans garde-fou.** Toute action sensible est
**tracée dans le dépôt** (mémoire commune) et **bloquée par le moteur** tant qu'elle touche
**argent/prod** sans le feu vert de Bruno. **Tout accès tiers doit être révocable en 1 geste.**

---

## 3. 💰 RÈGLE FINANCIÈRE ABSOLUE — Bruno seul décisionnaire

> « Le seul décisionnaire final, c'est moi, sur tout investissement ou validation de
> débit sur tous les comptes, y compris partenaires — hors abonnement classique déjà en cours. »

**RÈGLE :**
- **Bruno est le SEUL décisionnaire final** sur :
  - **tout investissement**,
  - **toute validation de débit / paiement / prélèvement**,
  - sur **TOUS les comptes** (NAVLYS, perso, **partenaires**, Stripe, PayPal, etc.).
- **AUCUN agent** (Claude, sous-agents, orchestrateurs, opérateur serveur) ne déclenche un
  débit / paiement / investissement / engagement de dépense **sans le feu vert
  explicite et préalable de Bruno**.

**SEULE EXCEPTION :**
- Les **abonnements classiques DÉJÀ EN COURS** (récurrents, déjà autorisés par Bruno)
  continuent **sans nouvelle validation**.

**Donc STOP → validation Bruno** pour : tout **nouveau** débit, **nouveau** prélèvement,
**nouveau** partenaire, **nouvelle** dépense, **tout investissement**, toute modification
d'un moyen de paiement.

> 🚦 Cette règle s'ajoute aux feux verts déjà requis pour : déploiement en production,
> publication de contenu public, suppression de données.

---

## 4. 🎚️ Niveaux de délégation (qui valide quoi) — décidé 2026-06-22

Bruno délègue à **Claude la main** sur le travail des sites **avant communication**.

**🟢 Sites beta / pré-lancement (PAS encore lancés en communication)**
- Claude **conçoit, modifie ET valide** les changements (design, contenu, structure,
  correctifs) **sans feu vert par changement** → on avance vite.
- **Deux garde-fous restent malgré tout :**
  1. 🚦 **Conformité** : avant que quoi que ce soit soit accessible sur un **domaine public**
     (URL en ligne, indexable), le **gardien** valide les lignes rouges (zéro promesse de
     rendement, zéro conseil perso, pas d'Israël/Jérusalem, disclaimer présent).
     *Raison : une URL publique est juridiquement publique, même non annoncée.*
  2. 💰 **Argent** : règle financière du §3 **inchangée** (Bruno seul).
- Tout changement est **journalisé** (`docs/ETAT-DES-LIEUX.md`) → Bruno relit quand il veut.

**🔴 Sites déjà lancés en communication (publiquement promus)**
- Claude **propose**, **Bruno valide** avant toute mise en ligne.

> Cadre ajustable par Bruno à tout moment (il peut élargir ou resserrer la délégation).
> ⚠️ Pré-requis pratique : pour exercer cette main, Claude doit avoir **accès à la source**
> (dépôt NOVA-HUB ou code fourni) — sinon il peut décider mais pas appliquer.
