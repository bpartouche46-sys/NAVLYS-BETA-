# 🕵️ Espions NAVLYS — veille virale horaire (loop externe, sans token)

Module **indépendant de Claude Code** : tourne en **cron sur Hetzner** (ou le PC de Bruno),
capte les techniques de **communication virale** des créateurs suivis, et nourrit le CORE.
**Zéro token externe** (ou très peu) : RSS public + transcription locale + LLM local optionnel.

## Chaîne de traitement

```
chaines.txt ──> espion_youtube.sh ──> data/espions/queue.jsonl
   (channel_id)   RSS public, sans clé      (nouvelles vidéos)
                          │
                          ▼
                  transcribe.sh ──> data/espions/transcriptions/<id>.txt
                  yt-dlp + Whisper LOCAL (sans token)
                          │
                          ▼
                 extract_viral.py ──> data/espions/viral-insights.jsonl
                 heuristique + Ollama LOCAL optionnel      (→ à ingérer dans le CORE)
```

## Installation (une fois, sur Hetzner)

```bash
# dépendances de transcription (facultatif mais recommandé)
pip install -U yt-dlp openai-whisper
# LLM local optionnel (synthèse plus riche, toujours sans token externe)
curl -fsSL https://ollama.com/install.sh | sh && ollama pull llama3.2

chmod +x scripts/espions/*.sh
# renseigner les créateurs à suivre :
$EDITOR scripts/espions/chaines.txt      # une ligne = un channel_id (UC...)
# installer le cron :
crontab scripts/espions/crontab.example  # ou copier les lignes dans `crontab -e`
```

## Ce que ça produit
- `data/espions/queue.jsonl` — file des vidéos détectées.
- `data/espions/transcriptions/*.txt` — texte des audios (local).
- `data/espions/viral-insights.jsonl` — **techniques virales + application NAVLYS**, prêtes à
  ingérer dans le CORE (`core_knowledge` / mémoire NAVMKT).

## Garde-fous (règles NAVLYS)
- **Sans token / très peu** : RSS + Whisper local + Ollama local. Payant = jamais ici.
- **CGU respectées** : flux RSS **officiels** ; la transcription est un usage **privé/interne**
  (analyse), sans rediffusion. En cas de doute juridique → se limiter au RSS (titres + métadonnées).
- **1 requête/chaîne, cadence horaire** : pas de scraping massif, pas de multi-comptes.
- **Réseaux hors YouTube** (Facebook/Insta/X/TikTok) : nécessitent une **API officielle** (clé
  Bruno) ou le **dépôt manuel de liens** — le scraping direct y est bloqué/interdit. Voir
  `docs/COMMUNICATION-VIRALE-MASTER.md` §1.
- **Sécurité (règle n°111)** : tout outil GitHub tiers ajouté ici doit d'abord passer le scan
  sécurité (texte caché / malware / connexion externe). Seule connexion externe autorisée = Bruno.

## Dépend de Bruno
- Déployer sur Hetzner (Claude n'a pas d'accès SSH) et lancer `crontab`.
- Remplir `chaines.txt` avec les créateurs à suivre.
- (Optionnel) poser les clés d'API officielles des autres réseaux pour élargir la veille.
