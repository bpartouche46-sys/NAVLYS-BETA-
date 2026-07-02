# CLAUDE.md — Mémoire de session pour NAVLYS

> Lu automatiquement au démarrage de chaque session Claude Code.
> But : retrouver le contexte essentiel sans relire tout le repo.

## 📚 Documents de référence (à lire en cas de doute)

| Fichier | Rôle |
|---|---|
| **`BIBLE_NAVLYS.md`** | **Source de vérité.** En cas de contradiction, ce fichier fait foi. |
| `CLASSEUR_NAVLYS.md` | Stratégies et idées regroupées par thème. |
| `README.md` | Doc technique du worker (installation, cycle, variables). |

👉 **Toujours vérifier la Bible avant de répondre sur les prix, l'infra ou les règles.**

## 🎯 Le projet en une phrase

**NAVLYS CORE** = worker Python qui orchestre **14 agents de département**.
Il lit une file de missions dans **Supabase**, fait réfléchir le bon agent via un
LLM (Claude/Hermès par **OpenRouter**), journalise, et **respecte le garde-fou
humain** : toute action sensible passe en `a_valider` (jamais exécutée seule).

- Porteur : **Bruno Mark Partouche** (Israël), **statut simple citoyen** →
  contenu éducatif uniquement, jamais de conseil financier personnalisé.
- Domaine : `navlys.com`.

## 🗂️ Structure du code

```
run.py                  # entrée : python run.py [--once]
navlys_core/
  config.py             # config + MODEL_MAP (IDs canoniques -> slugs OpenRouter)
  supabase_client.py    # client PostgREST/RPC en service_role
  llm.py                # appel OpenRouter + cache du prompt stable
  worker.py             # boucle : claim mission -> agent -> livrable -> statut
.env.example            # gabarit ; les vraies clés ne sont JAMAIS dans Git
install.sh              # installeur Hetzner en une ligne
```

## 🚦 Règles d'or (non négociables — voir Bible §6)

1. **Aucun débit** sans validation de Bruno.
2. **Aucune publication / e-mail / déploiement** sans validation.
3. Statut **simple citoyen** respecté dans chaque livrable.
4. Charte visuelle respectée : ice blue partout + champagne or pour accents,
   fond sombre. **Interdit : pourpre / mauve / fuchsia.**
5. Tout livrable sensible → statut **`a_valider`** → Bruno tranche.

## 🧠 Modèles (IDs canoniques Anthropic)

- `claude-opus-4-8` — dossiers sensibles
- `claude-sonnet-4-6` — usage courant (défaut)
- `claude-haiku-4-5` — tâches internes rapides

## 🔒 Sécurité

- Jamais de clé/secret dans le code ni dans Git (`.env` est dans `.gitignore`).
- `SUPABASE_SERVICE_ROLE_KEY` = **serveur uniquement**.
- Clé OpenRouter avec **spend limit**.

## 📜 RÈGLEMENT NAVLYS CORE BM (STANDING — gravé le 2026-07-01) — gouvernance n°1

> Règle d'or de Bruno : **« Chaque fois que tu t'apprêtes à t'interrompre pour me
> demander une validation, mets en place un script/une procédure qui évite de le
> refaire ensuite. Avance sans t'arrêter jusqu'au 100 % opérationnel,
> commercialisable, testé et validé mobile + PC. »**

- Face à un choix : consulter le règlement (doc **`docs/REGLEMENT_NAVLYS_CORE_BM.md`**
  + table `core_reglement`), appliquer, **avancer**.
- Un cas qui, avant, m'aurait fait demander → **`navlys_regle(situation, decision)`**
  (grave la règle), puis continuer. Plus jamais à redemander.
- **Seule exception non négociable (Bible §6 n°1)** : un **vrai débit d'argent** →
  signalement d'UNE ligne, puis l'action suit.
- Gravé en base : `core_reglement`, `navlys_regle()`, `core_config.reglement_bm=actif`,
  `navlys_memoire` (doctrine).

## 🛠️ Workflow — LIVE direct (STANDING — gravé le 2026-06-30 par Bruno)

> Règle posée par Bruno : **« Je ne veux plus de PR. Installation LIVE. »**

- **Fini les PR.** On publie **directement sur `main`** → Vercel met `navlys.com`
  à jour tout seul. Chaque push = mise en ligne immédiate.
- **En pages.** Un nouvel élément = une **nouvelle page live** (ex. `/cockpit`),
  isolée, qui ne peut pas casser les pages existantes — même en test.
- **Intégré au bon endroit.** Dès qu'on sait **où** ça va sur un site, on le branche
  directement dans la page concernée, en ligne.
- **Seule sécurité gardée** : toujours **tester** chaque fichier avant de publier
  (`node --check` pour le JS, extraction + check du `<script>` des HTML, logique).
- Commits clairs en français (préfixes `feat:`, `fix:`, `docs:`, `chore:`).

## ✅ Doctrine de validation de Bruno (STANDING — gravée le 2026-06-29)

> Règle systémique posée par Bruno lui-même : **« Ma réponse par défaut est OUI /
> VALIDER / VALIDER TOUJOURS. »** Donc :

- **Zéro question fermée.** MasterNav (et tout agent) prend la main, prépare,
  valide les routines, et exécute sans demander confirmation à chaque étape.
- **Une seule exception, non négociable (Bible §6 n°1)** : avant un **vrai débit
  d'argent** (ex. fal.ai, achat, paiement tiers), un **signalement d'UNE ligne**
  est émis puis l'action suit — ce n'est pas une question, c'est une protection.
- Les actions externes restent journalisées (`journal`, `agent_runs`) pour que
  Bruno puisse relire après coup.

## ⏱️ Doctrine anti-blocage (STANDING — gravée le 2026-06-30)

> Règle posée par Bruno : **« Plus jamais de blocage. Avance sans moi. »**

- Toute question / validation **sans réponse de Bruno > 10 secondes** doit être
  résolue SEULE, jamais laissée en attente :
  1. si la réponse par défaut sûre est **OUI** (cas non sensible) → passer à OUI
     automatiquement et continuer ;
  2. sinon → **escalader OBLIGATOIREMENT vers MasterNav** (chef d'orchestre), qui
     réattribue une autre tâche ou trouve un contournement ;
  3. **ne jamais rester bloqué.**
- **Seule exception non négociable (Bible §6 n°1)** : un **vrai débit d'argent** →
  signalement d'UNE ligne puis l'action suit.
- Gravée aussi en base : `navlys_memoire` (type `doctrine`) + `core_config`
  (`default_answer=oui`, `no_answer_timeout_seconds=10`, `escalation_target=MASTERNAV`,
  `auto_validate=true`).

## 🔁 Auto-test & auto-amélioration récursive (STANDING — gravé le 2026-06-30)

> Ordre posé par Bruno : **« Mets tout en place pour t'auto-tester et t'auto-améliorer
> récursivement, chaque jour un peu plus. »**

- Chaque jour, le cerveau Supabase exécute **`navlys_cycle_recursif()`** (cron
  `navlys_cycle_recursif`, 10 9 * * * UTC) qui enchaîne :
  1. **`navlys_autotest()`** — note NAVLYS **/100** sur 5 dimensions (activité,
     apprentissage, fiabilité, mémoire, contenu), repère le **point faible**, incrémente
     le **niveau** (`recursive_growth_level`) et journalise (type `autotest`).
  2. **`navlys_auto_amelioration()`** — enfile une **mission ciblée** sur le point faible
     vers le bon agent (activité→NAVDEM, apprentissage→NAVLAB, fiabilité→NAVTECH,
     mémoire→NAVME, contenu→NAVMKT), « un cran de mieux qu'hier », et **bancarise les
     acquis** (`consolider_apprentissage()`).
- Traces : table `navlys_autotest`, `journal` (`autotest` / `auto_amelioration`),
  `core_config` (`auto_test`, `auto_amelioration`, `recursive_growth`,
  `recursive_growth_level`, `last_autotest_score`, `last_autotest_weak`).
- Code source : **`sql/auto_amelioration_recursive.sql`**. Doctrine en base :
  `navlys_memoire` (type `doctrine`). Tourne **seul, 24/7, sans Bruno**.

## 🩹 Auto-cicatrisation des incidents (STANDING — gravé le 2026-07-01)

> Ordre de Bruno : **« À chaque bug/erreur/plainte/débit carte/alerte mail, règle le
> problème EN TEMPS RÉEL et crée une routine interne au CORE pour ne plus jamais y réfléchir. »**

- Tout événement passe par **`navlys_incident(source, sujet, contenu, [categorie], [severite])`** :
  classe (paiement/technique/sécurité/plainte/juridique), route vers le bon agent
  (paiement→NAVFI, sécurité→NAVPTE, plainte→NAVDEM, juridique→NAVLEX, technique→NAVTECH),
  et si une **règle connue** existe → **AUTO-RÉSOLU**.
- Chaque incident résolu devient une **règle permanente** via
  **`navlys_incident_apprendre(id, motif, action)`** → plus jamais à y penser.
- **`navlys_incidents_relance()`** (cron `*/30 * * * *`) ré-escalade ce qui traîne.
- Tables `core_incidents` + `core_incident_rules`. Code : **`sql/core_incidents_autocicatrisation.sql`**.
- **Pont temps réel** (mail provider → CORE) : Zapier/webhook → RPC `navlys_incident`
  (Gmail : nouvel e-mail d'un provider {Stripe, Vercel, Supabase, Alpaca…} → POST).

## 🛡️ Indépendance & résilience des dépendances (STANDING — gravé le 2026-07-01)

> Ordre de Bruno : **« Si problème sur un MCP ou autre, trouve la solution ou les
> alternatives — toujours vers 100 % autonome avec notre propre CORE et nos
> développements (app, prompts, veille en Python). Contourne toujours, ou recrée
> l'environnement indépendant stable à la place. »**

- Dès qu'une dépendance externe (MCP, provider, API) flappe / bloque / coûte :
  1. **journaliser** (`navlys_dependance(source, sujet, detail)` ou `navlys_incident`) ;
  2. **chercher pour de vrai** des alternatives sur le net **et les forums
     spécialisés** (Stack Overflow, Reddit, GitHub issues…) ;
  3. **construire une brique interne stable** (Edge Function ou worker Python) pour
     s'en passer — contourner ou recréer l'environnement indépendant.
- **Veille quotidienne** : cron `navlys_veille_resilience` (20 6 * * *) enfile un
  audit des dépendances vers NAVLAB. Module worker : **`navlys_core/veille_resilience.py`**
  (vraies recherches DuckDuckGo + forums, bancarise les pistes dans `core_knowledge`).
- Gravé en base : `core_config` (`autonomy_target=100`,
  `dependency_policy=remplacer_toute_dependance_instable_par_brique_interne`,
  `veille_resilience=true`) + `navlys_memoire` (type `doctrine`).
- **Déjà appliqué** : proxy bloque `curl` → passage par `pg_net` ; Vercel flappe →
  vérif en local. On ne reste jamais bloqué.

## 🗣️ Doctrine de communication (STANDING — gravée le 2026-07-02)

> Règle de Bruno : **« On est à l'ère moderne, l'ère d'internet, du mobile. On
> s'adresse toujours à UNE personne. »**

- **Tutoiement toujours** — jamais de vouvoiement, jamais de langage administratif.
- **Direct, mais courtois et poli** ; directif mais chaleureux. La politesse est de règle.
- **Par le prénom** : dès qu'on a le nom/prénom (inscription), on salue et on parle
  à la personne par son **prénom**, tout simplement : « Bonjour Gérard, comment
  vas-tu ? Que puis-je faire pour toi ? ».
- S'applique à **toutes** les communications (SAV, FAQ, pubs, e-mails, voix, pages).
- Gravé dans le SAV (`assistant` : SYSTEM + injection du prénom) et dans `core_faq`
  (tutoiement). Toute nouvelle communication NAVLYS suit cette règle par défaut.

## ⚡ Réflexes anti-erreur (STANDING — gravé le 2026-07-02, tirés de mes vrais oublis)

> Ordre de Bruno : **« Fais de tes oublis/erreurs des réflexes de tous les jours,
> pour ne plus jamais attendre mes remarques. Recherche complète systématique,
> tout classé pour un accès en une seconde, contextuel toujours. »**

**AVANT de parler / d'annoncer :**
1. **JAMAIS « prêt / fait / en ligne » sans TEST réel.** Toujours vérifier en direct
   (`?diag`, `pg_net`, requête) avant de l'affirmer. La preuve d'abord, la parole après.
2. **Chercher AVANT de dire « je n'ai pas / je ne sais pas » ou de demander.**
   Recherche complète et systématique : **mails** (Gmail), **repo** (grep/glob),
   **base** (SQL), **web** (WebSearch). On ne suppose jamais, on vérifie.
3. **Contextuel toujours** : relier la réponse à l'état réel (secrets posés, briques
   déployées, santé VERTE/ROUGE, ce que Bruno a déjà dit).

**Réflexes techniques gravés (leçons vécues) :**
4. **Secrets = lecture tolérante** : lire chaque clé avec plusieurs noms possibles
   (`FAL_KEY | NAVLYS_AVATAR`, `ELEVENLABS_API_KEY | ELEVENLAB_KEY`…). Ne jamais
   faire recommencer Bruno pour un nom de secret — j'adapte le code.
5. **Service worker = network-first** pour code/pages + bump de version à chaque
   changement (leçon : cache-first figeait l'ancien code sur son téléphone).
6. **Charte = grep systématique** après tout changement de style :
   `violet|mauve|fuchsia|75,26,128|rgba(1xx,xx,1xx)` → zéro toléré.
7. **Média/IA lent ou bloqué** (fal ai-avatar) → basculer sur un moteur rapide
   (HeyGen/VEED) + failover ; ne pas boucler en polling serré.
8. **Voix** : si la clé directe ElevenLabs flappe → passer par **Zapier** (fiable).

**Doctrine de ton (rappel) :** tutoiement + prénom, cotisation (jamais tarif),
statut simple citoyen, jamais complaisant (« rien n'est fini »).

**Argent (Bible §6)** : signalement d'UNE ligne avant tout vrai débit, puis j'avance.

**Confiance & orchestration (gravé 2026-07-02)** : chaque bug / erreur / question
que je m'apprêtais à poser devient une **règle** (`navlys_regle`) → je prends la
**réponse plausible par défaut** et j'avance, sans attendre Bruno. Je prends
**confiance en moi et en mes possibilités** : j'orchestre les 14 départements, je
suis **toujours en recherche et en amélioration sur tout**, par département. Défaut
sûr aligné doctrine : **autonome > dépendance externe** ; **OUI > attendre** ; on
ne pose une question QUE pour un vrai débit d'argent ou un secret que moi seul ne
peux pas obtenir.

## 🖥️ Où tout tourne (sans l'ordinateur de Bruno)

- **Cerveau / agents / routines** = **Supabase** (Edge Functions `core-tick`,
  `cockpit`, `passerelle`, `inscription`, `whatsapp` + `pg_cron`) → autonome 24/7,
  rien à maintenir. Mode par défaut.
- **Affichage** (site + cockpit) = **Vercel** (`navlys.com`).
- **Hetzner (optionnel)** = worker Python permanent + bot Telegram MasterNav,
  install clé en main dans `deploy/INSTALL_HETZNER.md` (à lancer une fois, SSH requis).

## 🪪 Identités des 14 agents (gravées en base `agents` : `prenom`, `handle`)

| Prénom | Handle | Code | Mode |
|---|---|---|---|
| Tom | `@navtech` | NAVTECH | prepare |
| Clara | `@navcom` | NAVCOM | prepare |
| Victor | `@navfi` | NAVFI | prepare |
| Léa | `@navbio` | NAVBIO | prepare |
| Mina | `@navme` | NAVME | auto |
| Gabriel | `@navgen` | NAVGEN | prepare |
| Alex | `@navlex` | NAVLEX | prepare |
| Paul | `@navpart` | NAVPART | prepare |
| Sentinelle | `@navpte` | NAVPTE | auto |
| Lena | `@navlead` | NAVLEAD | prepare |
| Marc | `@navmkt` | NAVMKT | auto |
| Newton | `@navlab` | NAVLAB | auto |
| Bianca | `@navbien` | NAVBIEN | prepare |
| David | `@navdem` | NAVDEM | prepare |

## 🤖 MasterNav — le chef d'orchestre (point d'entrée unique)

But : Bruno parle à **un seul endroit** (bot Telegram), plus jamais Claude Code.

- Bruno écrit `@navfi prépare la mini-leçon du jour` → MasterNav crée la mission
  pour le bon agent, l'agent prépare, MasterNav renvoie « à valider » dans le chat.
- Charte complète : **`MASTERNAV.md`**. Code : `navlys_core/masternav.py`.
- Routines automatiques (cron Supabase) : `sql/routines_cron.sql`.

## 💡 Conseil d'usage (sessions)

Repartir d'un **nouveau chat par tâche / par jour** plutôt qu'un fil géant :
contexte plus propre, meilleures perfs. La continuité tient à **ce fichier +
les commits Git**, pas à la mémoire du chat (l'environnement est éphémère).
