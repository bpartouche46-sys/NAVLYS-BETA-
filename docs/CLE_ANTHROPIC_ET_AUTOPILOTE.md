# 🔑 Clé Anthropic payante + 🧭 Autopilote du CORE

> Gravé le 2026-07-09 — ordre de Bruno : « mets en place une clé Anthropic
> payante (Claude / Claude Code / tous les clones) que je rentre dans mon CORE
> personnel (le NAVLYS CORE sur Hetzner), et que le CORE dirige l'ensemble de
> l'opération de A à Z à partir de ses agents, plus à partir de ma voix. »

Deux choses ici :
1. **Obtenir la clé Anthropic payante et la rentrer dans le CORE.**
2. **L'autopilote** : le CORE qui se dirige seul, sans ta voix.

---

## 1) La clé Anthropic payante (directe)

### Pourquoi directe et pas OpenRouter
Jusqu'ici le CORE passait par **OpenRouter**. Une clé **Anthropic directe** te
donne : le canal **indépendant** que tu contrôles, la **facturation officielle**
Anthropic, le **cache de prompt** (jusqu'à ~90 % moins cher sur les règles
communes). OpenRouter reste branché en **filet de secours** : si Anthropic
tombe, le CORE bascule **tout seul** (résilience, doctrine d'indépendance).

### Obtenir la clé (5 minutes, sur ton téléphone)
1. Va sur **console.anthropic.com** et connecte-toi (ou crée le compte).
2. **Billing** → ajoute un moyen de paiement (carte). C'est ce qui rend la clé
   « payante » : tu paies à l'usage (pay-as-you-go).
3. **Usage limits** → mets une **limite de dépense mensuelle** (ex. 20–50 $)
   pour dormir tranquille. On pourra la monter plus tard.
4. **API keys** → **Create Key** → nomme-la `navlys-core` → **copie-la**
   (elle commence par `sk-ant-...`). ⚠️ Elle ne s'affiche qu'**une fois**.

> Une seule clé Anthropic sert **tout** : le worker Python (Claude Code / clones),
> et les briques Supabase si tu veux. Pas besoin d'une clé par agent.

### La rentrer dans le CORE (Hetzner)
Sur le serveur, dans le fichier **`.env`** du CORE (jamais dans Git) :

```env
ANTHROPIC_API_KEY=sk-ant-...ta_cle...
# OpenRouter devient optionnel (filet de secours) :
OPENROUTER_API_KEY=
NAVLYS_LLM_PROVIDER=auto
```

Puis redémarre le worker :

```bash
sudo systemctl restart navlys-core     # si installé en service (voir deploy/INSTALL_HETZNER.md)
# ou, en test :
python run.py --once
```

Au démarrage, le CORE affiche `cerveau=Anthropic direct` : c'est bon, ta clé
est prise en compte. **Lecture tolérante** : le CORE accepte aussi
`CLAUDE_API_KEY`, `CLAUDE_CODE_API_KEY`, `ANTHROPIC_KEY` — tu ne peux pas te
tromper de nom.

### (Optionnel) La même clé côté Supabase
Pour que les Edge Functions (assistant, cockpit, bible, whatsapp) utilisent
aussi Anthropic direct : Supabase → **Edge Functions → Secrets** → ajoute
`ANTHROPIC_API_KEY`. **Jamais** dans le code ni dans Git.

---

## 2) L'autopilote — le CORE se dirige seul

### Le principe
Avant, une mission naissait de **ta voix** (Telegram/MasterNav). Maintenant, le
CORE **établit lui-même sa feuille de route** : à intervalle régulier, le cerveau
(Claude) regarde l'état de NAVLYS (missions en attente, point faible du dernier
autotest, mémoire/priorités) et **enfile des missions** vers les départements qui
en ont le plus besoin. Les 14 agents les traitent. Tu n'as plus rien à lancer.

- Démarre **immédiatement** au boot (le CORE prend la barre tout de suite).
- Puis **toutes les 6 h** par défaut (`NAVLYS_AUTOPILOT_HOURS`).
- **Au plus 6 missions** par passe (`NAVLYS_AUTOPILOT_MAX`), et **jamais de pile** :
  si la file « à faire » est déjà pleine, il passe son tour.

### Les garde-fous (Bible §6 — non négociables)
- L'autopilote ne crée **que des missions de PRÉPARATION**. Les agents préparent ;
  ils ne **publient rien**, n'**envoient aucun email**, ne **dépensent rien**, ne
  **déploient rien**.
- Tout livrable sensible reste en **`a_valider`** → **tu tranches**.
- **Aucun vrai débit d'argent** n'est déclenché par l'autopilote.

### Réglages (`.env`)
```env
NAVLYS_AUTOPILOT=1          # 1 = actif (défaut) ; 0 = éteint
NAVLYS_AUTOPILOT_HOURS=6    # fréquence de planification
NAVLYS_AUTOPILOT_MAX=6      # missions max par passe
```

### Tester une feuille de route à la main
```bash
python run.py --plan     # génère UNE feuille de route puis sort
```
Tu verras les missions créées dans le **cockpit** (`/cockpit`) et dans le
`journal` (type `autopilote`).

---

## En une phrase
Tu poses **une clé** (`ANTHROPIC_API_KEY`) dans le `.env` du CORE, tu redémarres,
et le CORE **pense avec Claude en direct** et **se dirige tout seul** — OpenRouter
reste en secours, et rien de sensible ne part sans ta validation.
