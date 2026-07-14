# Plugins Claude Code pour l'autonomie — mise en place & sécurité

> Suite au Short **« 5 Plugins to Make Claude Code Autonomous »** d'Eric Tech
> (`@EricWTech`, YouTube). Décision de Bruno (2026-07-14) : mettre en place le
> **stack autonome de référence** via GitHub, Ralph Loop **pleinement actif**.
> Chaque plugin a été **cloné et scanné en local (règle n°111)** avant proposition.

## ⚠️ Pourquoi ce doc et pas une activation automatique

Activer un plugin dans `.claude/settings.json` fait tourner ses **hooks shell**
(`SessionStart`, `Stop`…) **à chaque session, sans validation par action**. C'est
une modification persistante du comportement de l'agent : le garde-fou du harness
exige qu'elle passe par une **revue humaine explicite** (impossible dans une
session web non-interactive en mode auto — l'édition y est refusée à dessein).

C'est **aligné avec la règle n°111** : du code tiers exécutable ne s'active jamais
à l'aveugle. La config ci-dessous est **vérifiée et prête** ; **c'est toi, Bruno,
qui l'actives** en une étape (voir « Comment activer »).

## ✅ Verdict sécurité (règle n°111 — scan du 2026-07-14)

| Plugin | Source | Ce que le code exécute | Verdict |
|---|---|---|---|
| **superpowers** | `obra/superpowers`, épinglé sur un SHA par Anthropic dans le marketplace officiel | Hook `SessionStart` : lit `skills/using-superpowers/SKILL.md` et l'injecte comme contexte. `run-hook.cmd` = wrapper bash multiplateforme. | **CLEAN** — aucune connexion réseau, aucune exfiltration, aucun texte caché |
| **ralph-loop** | `anthropics/claude-plugins-official` (Anthropic) | Hook `Stop` : lit son fichier d'état local + le transcript, et relance le même prompt tant que la tâche n'est pas finie (jq/sed/awk/perl, texte local uniquement). `setup-ralph-loop.sh` crée le fichier d'état. | **CLEAN** — aucune connexion réseau, aucune exfiltration |

Seule réserve = **opérationnelle** (pas sécuritaire) : Ralph Loop tourne en boucle
**infinie par défaut** → conso de tokens continue. Voir « Usage sûr de Ralph ».

Déjà en place, rien à refaire :
- **Context7** (docs API à jour) : déjà dans `.mcp.json`.
- **Skills Superpowers** : déjà utilisés via `skills-lock.json` (TDD, brainstorming,
  systematic-debugging, subagent-driven-development…). Le *plugin* ci-dessous ajoute
  en plus l'injection de contexte `using-superpowers` au démarrage.
- **Playwright** : déjà utilisé en local (`tools/check-i18n.mjs`, Chromium préinstallé).

## 🔌 Comment activer (au choix)

### Option A — déclaratif, committé dans le repo (« via GitHub »)

Ajoute ce bloc dans `.claude/settings.json` (au niveau racine, à côté de
`permissions`/`hooks`). Toute session qui ouvre le repo et fait confiance au dossier
chargera alors les plugins automatiquement :

```json
"extraKnownMarketplaces": {
  "claude-plugins-official": {
    "source": { "source": "github", "repo": "anthropics/claude-plugins-official" }
  }
},
"enabledPlugins": {
  "superpowers@claude-plugins-official": true,
  "ralph-loop@claude-plugins-official": true
}
```

### Option B — interactif, en une fois (Claude Code CLI/desktop)

```
/plugin marketplace add anthropics/claude-plugins-official
/plugin install superpowers@claude-plugins-official
/plugin install ralph-loop@claude-plugins-official
```

### Playwright MCP (contrôle navigateur autonome, optionnel)

Pour donner à Claude le pilotage direct d'un navigateur (tester le funnel
d'inscription, OAuth, paiement en conditions réelles), ajoute dans `.mcp.json` :

```json
"playwright": {
  "command": "npx",
  "args": ["-y", "@playwright/mcp@latest"]
}
```

Le Chromium préinstallé est réutilisé via `PLAYWRIGHT_BROWSERS_PATH` — ne jamais
lancer `playwright install`.

## 🔄 Usage sûr de Ralph (Bible §6 — protection tokens/argent)

**Toujours borner la boucle.** Jamais de `/ralph-loop` nu (= infini). Réflexe :

```
/ralph-loop <tâche> --max-iterations 20 --completion-promise 'TERMINÉ'
```

- `--max-iterations N` : arrêt automatique après N tours.
- `--completion-promise 'PHRASE'` : la boucle s'arrête quand Claude émet
  `<promise>PHRASE</promise>` **et seulement si c'est vrai** (ne pas mentir pour sortir).
- État lisible : `head -10 .claude/ralph-loop.local.md`.
- Ralph **commit sur git à chaque itération** : le faire tourner **sur la branche
  de dev désignée**, jamais sur `main` (contrainte de session), et surveiller la conso.

## 🧭 Où ça sert pour NAVLYS

- **superpowers** : discipline de dev autonome et non complaisante (TDD, debugging
  systématique, revue par sous-agent) — colle à la doctrine « rien n'est fini ».
- **ralph-loop** : abattre un chantier borné en autonomie (ex. audit zéro-erreur
  page par page, propagation d'un pattern) sans relancer manuellement à chaque tour.
- **Playwright MCP** : preuve avant parole (réflexe n°1) sur les parcours réels
  (inscription, OAuth, paiement).
- **Context7** (déjà là) : APIs à jour, moins d'hallucinations de versions.
