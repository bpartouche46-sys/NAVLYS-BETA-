# 🧠 NAVLYS CORE — moteur agentique (scaffold prêt à déployer)

> Implémentation concrète du blueprint `docs/CORE-CENTRAL-TECHNIQUE.md`.
> Orchestrateur **headless** (Claude Agent SDK) + sous-agents + **garde-fous câblés**
> (argent + prod = STOP → feu vert Bruno). **Aucun secret ici** : tout passe par `.env`
> (ignoré par Git). Voir `docs/SECRETS-ET-CLES.md`.

⚠️ **Statut** : scaffold **non testé depuis l'environnement GitHub** (pas d'install réseau
ici). À valider sur le serveur (Hermès) : `npm install && npm run build && npm run start`.

---

## Prérequis serveur (Hetzner)
- **Node 18+** (le SDK tourne en headless).
- **Redis** (mémoire persistante entre redémarrages — évite ERR-001). Optionnel pour un 1er run.
- **systemd** (garder le moteur en vie) + **cron/timer** (cadencer veille/SAV).

## Installation
```bash
cd core
cp .env.example .env          # puis remplir les VRAIES valeurs (jamais commitées)
cp .mcp.json.example .mcp.json  # activer seulement les MCP voulus
npm install
npm run build
npm run start                 # lance l'orchestrateur
```

## Déploiement en service (rester en vie)
```bash
sudo cp systemd/navlys-core.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now navlys-core
journalctl -u navlys-core -f   # logs
```

## Sécurité câblée (non négociable)
- `permissionMode` **bridé** (pas de `bypassPermissions`).
- **Liste blanche** d'outils ; commandes destructrices bloquées.
- Hook **PreToolUse** : lance le contrôle gardien (conformité ERR-003) + **bloque tout
  déploiement prod et toute dépense** tant que Bruno n'a pas validé.
- Hook **PostToolUse** : journal d'audit (qui/quoi/quand) → traçabilité.

> 🔴 Règle gravée : **argent + mise en ligne prod = STOP → feu vert Bruno** (`docs/GOUVERNANCE.md`).

## Structure
```
core/
├─ src/
│  ├─ index.ts              # point d'entrée orchestrateur (Agent SDK)
│  ├─ config.ts             # charge/valide l'env (zéro secret en dur)
│  └─ guardrails/
│     ├─ forbidden.ts       # logique pure: termes interdits + patterns argent/prod
│     ├─ preToolUse.ts      # hook: décide allow/deny AVANT exécution
│     └─ postToolUse.ts     # hook: journal d'audit
├─ .env.example             # NOMS des secrets (0 valeur)
├─ .mcp.json.example        # branchements MCP (sans secrets)
├─ systemd/navlys-core.service
├─ package.json
└─ tsconfig.json
```

## Décisions à confirmer (cf. CORE-CENTRAL-TECHNIQUE §5)
- Langage moteur : **TypeScript** (reco, voie SDK la plus avancée) — retenu pour ce scaffold.
- Qui héberge la clé Anthropic du core (compte dédié) → Bruno.
- 1ʳᵉ chaîne câblée : **Veille** (déjà active) puis SAV.
