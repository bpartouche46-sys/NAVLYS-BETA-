# Skills internes NAVLYS CORE — indépendance vis-à-vis de Claude Code

> Ordre de Bruno (2026-07-09) : « tous les skills Claude doivent être copycat
> sur navlys core et développer en interne sur notre serveur sécurisé ».

## Pourquoi

Les skills Claude (Supabase, ElevenLabs, security-review, marketing...)
n'existent que **pendant une session Claude Code**. Le CORE NAVLYS, lui, doit
tourner en autonomie 24/7 (Hetzner + Supabase pg_cron), sans dépendre d'une
session Claude ouverte — c'est la même doctrine déjà gravée dans CLAUDE.md
(« Indépendance & résilience des dépendances »). Chaque capacité utile d'un
skill doit donc avoir un équivalent Python natif dans `navlys_core/`.

## Où ça vit

`navlys_core/skills_internes/` — un module Python par capacité copiée, même
schéma que `navlys_core/veille_resilience.py` : pur Python + `requests`,
aucune dépendance à un LLM pour la partie déterministe, journalisé dans
Supabase (`journal`), exécutable en cron sur Hetzner.

## Premier skill copié : `securite` (2026-07-09)

Port Python de `skill-scanner` / `security-review` / `find-bugs` : détection
statique déterministe de secrets en dur, code dangereux (eval/exec,
shell=True, reverse shell) et patterns d'injection de prompt (instruction
override, zero-width, homoglyphes).

- `navlys_core/skills_internes/securite.py`
- `scanner_texte(contenu, chemin)` → liste de trouvailles brutes
- `scanner_repertoire(chemin)` → scan récursif, agrégation par catégorie
- CLI : `python -m navlys_core.skills_internes.securite <chemin>`
- **Testé en réel** (2026-07-09) : 21 fichiers du skill `security-review`
  scannés, 54 correspondances brutes trouvées (13 secrets, 39 code dangereux,
  2 injection) — cohérent avec le scan Claude Code effectué plus tôt (règle
  n°111). Comme pour tout scan statique, **il ne juge pas l'intention** : une
  correspondance dans un fichier qui *documente* une attaque n'est pas une
  attaque réelle — à trancher par un agent/humain en aval, exactement comme
  la méthode déjà décrite dans CLAUDE.md (règle n°111).

## Prochains skills à copier (priorité proposée)

1. **`supabase-postgres-best-practices`** → un vérificateur Python de schéma
   (index manquants, RLS activé sans policy — déjà vu en direct via les
   advisors Supabase) exécutable en cron, sans attendre un audit manuel.
2. **`text-to-speech` / `speech-to-text`** → déjà largement couvert côté
   Supabase Edge Functions (brique `voix`, `avatar`) ; à documenter comme
   « déjà internalisé » plutôt qu'à recréer.
3. **Veille marketing** (`ai-seo`, analyses concurrence) → étendre
   `veille_resilience.py` ou créer `skills_internes/marketing.py` sur le même
   modèle (recherche DuckDuckGo + bancarisation `core_knowledge`).

Chantier trace : `navlys_chantier_ouvrir` #226 (base Supabase).
