# 🧠 CORE CENTRAL — BLUEPRINT TECHNIQUE (Agent Directeur)

> Complète `docs/ARCHITECTURE-AGENT-DIRECTEUR.md` (le « pourquoi » + les rôles) avec
> le **« comment » technique** : les briques réelles à installer sur le serveur Hetzner
> pour faire tourner le **core agentique central** (orchestrateur + sous-agents).
> 🔐 Aucun secret ici (clés/IP/mots de passe restent hors Git). Sources : doc officielle
> Claude Agent SDK (`code.claude.com/docs/en/agent-sdk/*`), vérifiée le 2026-06-23.

---

## 0. La vérité honnête sur « un agent qui crée et gère lui-même tous les agents »

✅ **Ce qui est faisable aujourd'hui (production-ready) :** un **agent directeur** qui tourne
24/7 sur le serveur, **délègue à des sous-agents** spécialisés (en parallèle), persiste sa
mémoire entre les redémarrages, branche des outils (GitHub, Vercel, Stripe, Gmail…) et
applique des **garde-fous stricts**.

⚠️ **Ce qui n'est PAS (encore) supporté tel quel — à savoir avant de promettre :**
- ❌ Un sous-agent **ne peut pas inventer de nouveaux types d'agents à la volée** : les
  types de sous-agents sont **pré-définis** au lancement (on peut en ajouter quand on veut,
  mais c'est **nous** qui les déclarons, pas l'agent qui les crée seul depuis rien).
- ❌ Pas de **boucle autonome auto-programmée** intégrée : c'est un planificateur externe
  classique (**cron / systemd**) qui réveille l'agent à intervalles. Pas de « il se relance
  tout seul » magique.
- ❌ Profondeur de sous-agents limitée à **5 niveaux** d'imbrication.

👉 **Conclusion NAVLYS :** on construit un **directeur qui pilote une bibliothèque d'agents
qu'on enrichit progressivement** — fiable et sûr. Le « méta-agent 100 % auto-bootstrap qui
se crée tout seul » n'est pas réaliste aujourd'hui, et de toute façon **interdit par nos
garde-fous** (argent + prod = Bruno). On ne survend pas.

---

## 1. Les briques à installer (sur le serveur Hetzner déjà en place)

| Brique | Quoi | Rôle |
|--------|------|------|
| **Moteur** | `@anthropic-ai/claude-agent-sdk` (Node 18+) **ou** `claude-agent-sdk` (Python 3.10+) | Le cerveau : boucle agentique + exécution d'outils, en **headless** (sans interface, parfait pour un serveur). |
| **Sous-agents** | Définis en code (`AgentDefinition`) ou en fichiers `.claude/agents/*.md` | Les experts métier (Sites, SAV, Back-office, Veille) + le **Gardien**. Tournent **en parallèle**, contexte isolé. |
| **Skills** | Dossiers `.claude/skills/<nom>/SKILL.md` | Capacités **réutilisables** (nos routines : contrôle conformité, déploiement, sauvegarde…). Chargées automatiquement. |
| **Outils (MCP)** | `.mcp.json` ou option `mcpServers` | Branchements : GitHub, Vercel, Stripe, Gmail, base de données… (`mcp__github__*`, etc.). |
| **Mémoire persistante** | `SessionStore` (Redis/Postgres) | Se souvenir **entre les redémarrages** (sinon on refait ERR-001). Redis = simple à poser sur Hetzner. |
| **Rester en vie** | service **systemd** (`Restart=always`) | Relance auto si crash. |
| **Cadencer** | **cron** / timer systemd | Réveiller l'agent toutes les N minutes (veille, SAV…). |

---

## 2. Les garde-fous CÂBLÉS DANS LE MOTEUR (pas en option)

Le SDK gère la sécurité de façon native — on **inscrit nos règles d'or dans le code** :

- **`permission_mode`** : on évite `bypassPermissions`. On part sur un mode **bridé**
  (`acceptEdits` pour les fichiers, le reste demande validation).
- **`allowed_tools` / `disallowed_tools`** : liste blanche stricte. On **bloque** les
  commandes destructrices (`Bash(rm -rf *)`, etc.).
- **Hooks `PreToolUse`** = LE point clé conformité : un hook qui **intercepte AVANT
  exécution** toute action sensible et :
  - lance le **Gardien** (refuse promesse de rendement, mention interdite, 404, disclaimer
    manquant — cf. ERR-003) ;
  - **bloque tout déploiement prod et toute dépense** tant que **Bruno** n'a pas validé.
- **Hooks `PostToolUse`** : journal d'audit (qui a fait quoi, quand) → traçabilité.

> 🔴 Règle gravée dans le moteur : **argent + mise en ligne prod = STOP → feu vert Bruno.**
> Le Gardien contrôle, le directeur propose/exécute, Bruno valide le sensible.

---

## 3. Architecture minimale viable (cible)

```
Serveur Hetzner (Ubuntu) — déjà : Docker, PM2, Nginx, certbot, fail2ban
  └─ Node 18+ / Python 3.10+
     └─ Orchestrateur (Agent SDK, headless)
        ├─ SessionStore (Redis) ........ mémoire entre runs
        ├─ .mcp.json .................... GitHub, Vercel, Stripe, Gmail…
        ├─ .claude/agents/*.md .......... Sites · SAV · Back-office · Veille · GARDIEN
        ├─ .claude/skills/*.md .......... nos routines réutilisables
        └─ Hooks PreToolUse/PostToolUse . conformité + feu vert Bruno + audit
     └─ systemd (Restart=always) ........ garde l'agent en vie
     └─ cron / timer .................... réveille l'agent (veille, SAV)
```

---

## 4. Comment ça se branche sur notre feuille de route

Ce blueprint **ne change pas** la stratégie « brique par brique » de
`ARCHITECTURE-AGENT-DIRECTEUR.md §5`. Il la **rend concrète** :

1. **Brique 2 (Sites sous Git propre)** d'abord — rapatrier la source dans GitHub (en cours :
   installation Claude Code sur le PC du bureau). **Prérequis** : sans source versionnée, pas
   d'agent Sites fiable.
2. **Brique 1 (1 chaîne SAV avec point de contrôle)** = premier vrai test de l'orchestrateur :
   lire les mails → **proposer** → Bruno valide → envoyer. Petit, sûr, démontrable.
3. Puis on **monte** : Back-office (Stripe en lecture d'abord), Veille, puis Orchestration (Brique 5).

> ⚠️ On n'installe **pas tout le moteur d'un coup**. On valide une chaîne, puis on étend la
> bibliothèque d'agents/skills. Anti-usine-à-gaz (cf. ERR connue).

---

## 5. Décisions à confirmer par Bruno (avant de coder le moteur)

- [ ] **Langage du moteur** : Node (TypeScript) ou Python ? (reco : **TypeScript**, c'est la
      voie la plus avancée du SDK — Workflow, etc.).
- [ ] **Qui héberge l'API key Anthropic** du moteur (compte/abonnement dédié au core) ?
- [ ] **Première chaîne** à câbler (reco : **SAV**, faible risque, effet « waouh » rapide).
- [ ] Qui prend le rôle « mains sur le serveur » (installs systemd/Redis) pendant que Claude
      écrit le moteur + les garde-fous ? **À redéfinir** — ex-Hermès **retiré** (ERR-006) ; le
      futur opérateur sera **bridé par le moteur**, pas de confiance par défaut.
