# ⚖️ GOUVERNANCE NAVLYS — principes fondamentaux (non négociables)

> Décidé par Bruno le 2026-06-22. Ces principes priment sur tout le reste.
> Ils sont reliés à la règle d'or de `CLAUDE.md` (lue à chaque session).

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

## 2. 🤖 Orchestrateurs en SURVEILLANCE MUTUELLE

Deux orchestrateurs, reliés au core, qui **se contrôlent l'un l'autre** :

- **Claude** = cerveau **code + conformité**, via **GitHub** (aucun accès serveur direct).
- **Hermès** = **opérations**, via **OpenRouter + accès Hetzner** (exécute sur le serveur).
- **Le gardien** (`.claude/agents/gardien.md`) = **arbitre** conformité/sécurité.

Règle : **aucun des deux n'agit en aveugle.** Chaque action sensible de l'un peut être
**vérifiée par l'autre** (et par le gardien) avant d'être validée. Tout est tracé dans
le dépôt (mémoire commune) → l'un peut toujours relire ce que l'autre a fait.

---

## 3. 💰 RÈGLE FINANCIÈRE ABSOLUE — Bruno seul décisionnaire

> « Le seul décisionnaire final, c'est moi, sur tout investissement ou validation de
> débit sur tous les comptes, y compris partenaires — hors abonnement classique déjà en cours. »

**RÈGLE :**
- **Bruno est le SEUL décisionnaire final** sur :
  - **tout investissement**,
  - **toute validation de débit / paiement / prélèvement**,
  - sur **TOUS les comptes** (NAVLYS, perso, **partenaires**, Stripe, PayPal, etc.).
- **AUCUN agent** (Claude, Hermès, sous-agents, orchestrateurs) ne déclenche un
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
