# 🧠 NAVLYS qui PENSE hors ligne — Ollama sur ton PC 32 Go

But : un **vrai cerveau IA local**, sans internet, sur ton ordinateur boosté
(32 Go RAM). NAVLYS raisonne même réseau coupé — le cloud devient un simple bonus.

## 1. Installer Ollama (une fois)
- **Windows / macOS** : télécharge sur https://ollama.com → installe → lance.
- **Linux** : `curl -fsSL https://ollama.com/install.sh | sh`

## 2. Charger un modèle (une fois, avec le wifi)
Avec 32 Go de RAM tu es large. Choisis :
```bash
ollama pull llama3.1:8b        # rapide, excellent (recommandé pour commencer)
# ou plus costaud, toujours OK en 32 Go :
ollama pull mistral-small      # ~24B, très bon en français
```

## 3. Tester hors ligne
```bash
# passe en mode avion ✈️  (preuve : zéro réseau)
ollama run llama3.1:8b "Explique en 2 phrases ce qu'est un ETF, pour un débutant."
```
Ça répond **sans internet**. Ollama sert aussi une API locale sur
`http://localhost:11434`.

## 4. Brancher le cerveau NAVLYS dessus (offline complet)
Le CORE portable (`navlys_core/portable.py`) suit la règle « cloud si dispo, sinon
local ». Pour le faire **penser via Ollama hors ligne**, on ajoute un appel à
l'API locale quand OpenRouter/Anthropic n'est pas joignable :

```python
# extrait à intégrer dans portable.py (déjà noté dans la roadmap)
import json, urllib.request
def penser_local(prompt, model="llama3.1:8b"):
    body = json.dumps({"model": model, "prompt": prompt, "stream": False}).encode()
    req = urllib.request.Request("http://localhost:11434/api/generate", body,
                                 {"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.loads(r.read())["response"]
```
→ En ligne : Claude/Hermès via OpenRouter. Hors ligne : Ollama en local. **Même
cerveau, jamais à l'arrêt.**

## En clair
- **PC 32 Go** = ton cerveau IA offline lourd (Ollama + Llama/Mistral).
- **A56 (Termux)** = la logique CORE + mémoire, offline léger (voir `TERMUX_MOBILE.md`).
- **Cloud (Supabase/OpenRouter)** = bonus quand le réseau est là.

NAVLYS pense partout, tout le temps — c'est la doctrine d'indépendance, réalisée.
