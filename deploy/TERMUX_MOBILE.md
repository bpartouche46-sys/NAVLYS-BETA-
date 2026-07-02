# 📱 NAVLYS CORE hors ligne sur ton Android (Samsung A56) — via Termux

But : faire tourner le **cerveau NAVLYS en Python, dans ta poche, SANS internet**.
Prouve l'autonomie totale : les 14 agents, la mémoire et le RÈGLEMENT vivent en
local (SQLite), même en mode avion.

## 1. Installer Termux (le terminal Linux d'Android)
- Installe **Termux** depuis **F-Droid** (https://f-droid.org) — PAS depuis le Play
  Store (la version Play est obsolète). C'est gratuit.
- Ouvre Termux.

## 2. Préparer Python (une fois, avec le wifi)
```bash
pkg update -y && pkg upgrade -y
pkg install -y python git
```

## 3. Récupérer le cerveau NAVLYS (une fois, avec le wifi)
```bash
git clone https://github.com/bpartouche46-sys/navlys-beta-.git
cd navlys-beta-
```
*(ou copie juste le dossier `navlys_core/` sur le téléphone)*

## 4. Lancer — et couper internet
```bash
# passe ton téléphone en MODE AVION maintenant ✈️  (preuve : zéro réseau)
python -m navlys_core.portable
```
Tu obtiens une **démo interactive** : tu écris une demande, le cerveau route vers
le bon agent (NAVFI, NAVME, NAVTECH…), applique le règlement (réponse par défaut
OUI, garde-fou argent), journalise en local. **Tout ça hors ligne.**

## Ce qui marche HORS LIGNE (autonomie prouvée)
- ✅ Routage vers les **14 agents** (par mots-clés).
- ✅ **Mémoire locale** (SQLite `navlys_local.db`), doctrines, RÈGLEMENT BM.
- ✅ Journalisation locale ; se **re-synchronise** avec Supabase dès qu'internet revient
  (« cloud si disponible, sinon local »).

## Ce qui a besoin d'internet (honnête)
- 🌐 Le **raisonnement LLM** (Claude/Hermès) et la **synchro cloud**. Hors ligne, le
  CORE fait la logique, le routage, les règles et la mémoire — mais pas la
  « réflexion » d'un grand modèle.
- 💡 Pour un **vrai cerveau IA hors ligne**, on met un **petit modèle local** :
  - sur ton **PC 32 Go** : Ollama + un modèle Llama/Mistral → NAVLYS pense sans internet.
  - sur l'**A56** : possible avec un très petit modèle (llama.cpp), plus lent — surtout
    pour tester. Le PC reste le meilleur pour l'offline lourd.

## En clair
Ton mobile devient une **base de test d'autonomie** : NAVLYS tourne dans ta main,
en mode avion, et ne meurt jamais si le réseau tombe. Le cloud n'est qu'un
**bonus**, jamais une dépendance.
