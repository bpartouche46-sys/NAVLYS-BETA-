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

## 🧭 Positionnement — Next Gen avant Finance (STANDING — gravé le 2026-07-09, règle n°76)

> Correction ferme de Bruno après un audit Gemini qui lisait NAVLYS comme un
> site d'éducation financière (comparé à Finary) : **« la révolution à
> communiquer, c'est la première IA qui gère les IA via téléphone et ne
> nécessite aucun bureau aucun ordinateur pour créer vos propres applications
> [...] on utilise toutes les technologies et on orchestre celles-ci pour
> avoir un pouvoir infini en matière de création réelle WEB et SERVICES. »**

- **Le vrai différenciateur, toujours en tête de toute communication** : NAVLYS
  est la première IA qui orchestre d'autres IA depuis un simple téléphone,
  sans bureau ni ordinateur — chacun peut créer ses propres applications et
  les mettre au service de la communauté (commercialisation sur le réseau
  NAVLYS, ou amélioration quotidienne en temps réel du site/des applications
  via le bouton 💡 Améliorer, juste depuis son téléphone).
- **Next Gen (assistant humain / concierge)** est la porte d'entrée phare.
  **NAVFI (finance)** reste **UN détail parmi 14 départements**, jamais le
  sujet principal d'un pitch, d'un titre de page ou d'une meta description.
- **Nom légal à référencer partout, sans variante** : `NAVLYS Web Service (NWS)`
  (corrigé le 2026-07-09 : `/conditions` et `/confidentialite` affichaient par
  erreur « WSN — Web Services NAVLYS »).
- **Toute communication externe pointe uniquement vers `navlys.com`** —
  jamais navlys.io tant que son usage n'est pas tranché par Bruno (cf. §
  cockpit/redémarrage plus bas).
- **Réflexe anti-panique gravé** : un retour d'IA externe du type « je ne
  trouve pas / n'arrive pas à me connecter au site » ne veut PAS dire panne —
  **toujours vérifier en direct** (pg_net, avec le User-Agent du bot concerné
  si pertinent) avant de conclure. Preuve faite le 2026-07-09 : navlys.com
  répond 200 OK, robots.txt ouvert, et GPTBot/ChatGPT-User/OAI-SearchBot
  reçoivent tous le HTML complet sans blocage — le vrai sujet est
  l'indexation (domaine récent, peu de backlinks), pas une panne technique.
  Action qui dépend de Bruno : soumettre le sitemap à Google Search Console +
  Bing Webmaster Tools (vérification de propriété du domaine).
- Appliqué immédiatement (commit `419d79c`) : `<title>`/meta/OG de la homepage
  réécrits pour mener avec l'orchestration IA mobile plutôt que « applications
  IA + finance ». Gravé aussi en base : `core_reglement` (règle n°76),
  `core_bible_bugs` (leçons `gemini_audit_2026-07-09` et
  `chatgpt_indexation_2026-07-09`), mémoire NAVMKT/NAVLEX/NAVCOM/NAVTECH.

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
- **On corrige AVEC la communauté** (gravé 2026-07-04, règle n°16) : toujours en
  ligne d'abord, puis itération guidée par le bouton **💡 Améliorer**
  (`core_feedback` → lire → appliquer → répondre). Jamais de perfection cachée
  en local.
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

## 🎨 Routeur média multi-prestataires (STANDING — gravé le 2026-07-07)

> Ordre de Bruno : **« Mets un agent sur tous les prestataires (et concurrents),
> utilise leurs accès/tokens gratuits quotidiens, réduis chaque jour notre conso,
> teste chez différents prestataires, mémorise les nuances, jongle selon la demande. »**

- **Edge function `media`** (`GET`=diag readiness · `POST {type,prompt,size,token}`) :
  prend **toujours le meilleur prestataire GRATUIT légitime dispo**, **bascule seul**,
  compte les quotas du jour, et ne touche au **payant qu'en dernier recours — réservé
  admin (token=cockpit_pass) + signalement d'UNE ligne** (Bible §6).
- **Registre `core_media_providers`** (priorité croissante) : `pollinations` (image,
  **sans clé, marche déjà**) → `cloudflare` (≈100/j, `CLOUDFLARE_AI_TOKEN`+`CLOUDFLARE_ACCOUNT_ID`)
  → `huggingface` (`HF_TOKEN`) → `gemini` (`GEMINI_API_KEY`, image+vidéo) →
  puis payants `stability`/`fal`/`openai`/`replicate`. Ajout d'une clé gratuite = un
  cran de plus débloqué, sans redéploiement (lecture tolérante des secrets, règle n°4).
- **Quotas** : `core_media_usage` (par prestataire × jour) ; RPC `navlys_media_candidats`
  / `navlys_media_utilise`. **Veille quotidienne** (cron `navlys_media_veille`, 06:30 UTC)
  → mission NAVLAB : auditer les offres gratuites, repérer nouveautés/nuances, enrichir le registre.
- **Frontière éthique gravée (non négociable)** : offres gratuites **officielles**
  uniquement, **un compte légitime par prestataire**, **jamais** de farming / multi-comptes /
  contournement de limites. Autonome, oui ; abusif, jamais.

## 📖 La Bible — routine d'apprentissage sans interruption (STANDING — gravé le 2026-07-09)

> Ordre de Bruno : **« Je veux une routine qui tienne compte de tout ce qui est vu
> par ChatGPT et externe à Claude, pour gérer et donner ordre à tous les agents,
> gonfler leur compétences et mémoire et infaillibilité. Toujours apprendre et
> faire une bible reprenant chaque bug pour créer la routine parfaite sans
> interruption — en boucle, sur notre serveur externe, JS/Python. »**

- **Edge function `bible`** (Supabase, tourne seule 24/7, indépendante de toute
  session Claude Code) : `POST {source, texte}` = ingère n'importe quel retour
  externe (audit d'agence, plainte, bug, log, alerte) ; Claude en extrait les
  vrais enseignements, ignore le bruit et les analyses de sites tiers par erreur
  (ex. confusion de marque). Chaque leçon devient : 1) une **règle permanente**
  (`navlys_regle`), 2) une entrée dans **`core_bible_bugs`** (jamais réapprise),
  3) une **note en mémoire** de l'agent du bon département (`agent_note` →
  `agent_memoire`, type `apprentissage`) — gonfle sa compétence directement.
- **`GET ?mode=boucle`** (cron `navlys_bible_boucle`, toutes les heures) : scanne
  SEUL `core_feedback` (💡 Améliorer) et `core_incidents` résolus **jamais
  digérés** (`bible_traite=false`) et les ingère automatiquement. Boucle fermée,
  sans intervention de Bruno.
- **Réflexe** : tout retour externe (audit d'agence, capture d'écran de
  consultant, plainte client) → `POST {source, texte}` sur la brique `bible` →
  la leçon est gravée et les agents progressent, une seule fois pour toutes les
  applications NAVLYS. Code source : `supabase/functions/bible/index.ts`.
- **Elle se teste et cherche ELLE-MÊME (gravé 2026-07-09, précision de Bruno) :**
  aucune de ces boucles ne dépend de Claude Code — de vraies requêtes HTTP
  exécutées par pg_cron + l'Edge Function, qui continuent identiquement même
  si cette conversation ou Claude tout entier disparaît.
  - `GET ?mode=verifier` (cron `navlys_bible_verifier`, toutes les 6 h) :
    teste elle-même robots.txt/sitemap.xml/pages clés sur navlys.com ET
    navlys.io, grave les 404/pages vides trouvées.
  - `GET ?mode=recherche` (cron `navlys_bible_recherche`, quotidien 8h35 UTC) :
    cherche elle-même « navlys » sur DuckDuckGo (sans clé), détecte si on
    n'est pas dans le top 3 et repère les homonymes/concurrents qui nous
    doublent — grave une veille marque à NAVMKT.
  - Preuve en base : `core_bible_bugs` a déjà capté en réel (09/07) que
    navlys.io est un déploiement Vercel SÉPARÉ de navlys.com (plusieurs pages
    en 404 dessus) et que deux homonymes (navly.io, « Navily ») nous doublent
    en recherche — à trancher par Bruno.
- **`GET ?mode=avis`** (cron `navlys_bible_avis`, quotidien 7h15 UTC, gravé
  2026-07-09) : « tant que les autres IA nous jugeront trop léger et trop flou,
  il faut ajuster — interroge-les chaque jour » (Bruno). Lit le contenu RÉEL et
  LIVE de `/`, `/next-gen`, `/finance` sur navlys.com, demande un avis critique
  et sévère à Claude (+ Llama/OpenRouter si `OPENROUTER_API_KEY` posée, pour un
  vrai second avis indépendant), fait passer chaque avis par le pipeline
  `ingerer()` habituel. Testé en direct le 09/07 avant mise en prod : 5 leçons
  concrètes dès le premier passage (jargon interne à nettoyer, hiérarchie du
  message absente, modèle économique opaque) — preuve que la routine capte de
  vrais problèmes, pas du bruit.

## 📺 Veille YouTube influenceurs (STANDING — gravé le 2026-07-07)

> Ordre de Bruno : **« Prends les liens donnés par les influenceurs que je suis. »**

- **Brique `youtube`** (Edge Function, sans clé, 100 % gratuit) :
  `POST {url}` = analyser une vidéo/Short + suivre sa chaîne · `GET ?mode=scan`
  = scanner toutes les chaînes suivies · `POST {action:'liste'}` = chaînes + liens.
- Tables : `core_youtube_chaines` / `core_youtube_videos` / `core_youtube_liens`
  (liens avec source + contexte). Cron `navlys_youtube_veille` (15 */6 * * *).
- **Leçon gravée (règle n°45)** : l'API player YouTube (`youtubei`) est verrouillée
  anti-robot pour TOUTES les IP datacenter → on lit **oEmbed** (titre/auteur),
  le **RSS de chaîne** (15 dernières vidéos AVEC description complète) et la
  **page HTML** (`attributedDescription`). Les liens « en commentaire épinglé »
  sont illisibles côté serveur → WebSearch pour retrouver la ressource citée.
- Réflexe : Bruno envoie un lien YouTube → `POST {url}` sur la brique → la chaîne
  devient suivie, la veille tourne seule ensuite. SQL : `sql/youtube_veille_influenceurs.sql`.

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
4. **S'adapter et s'auto-adapter (gravé 2026-07-09, règle n°82)** : face à tout
   imprévu — nom de secret différent, format inattendu, instruction floue,
   dépendance externe qui change — je m'adapte immédiatement, sans bloquer ni
   redemander (lecture tolérante généralisée, contournement systématique). Et
   le système s'auto-adapte dans le temps : chaque ajustement ponctuel devient
   une **règle permanente** (`navlys_regle`) pour que la même adaptation ne
   soit plus jamais à refaire manuellement — pour tous les départements, toutes
   les briques (secrets, formats de données, API tierces, comportements
   utilisateur).

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
9. **Edge function appelée par pg_cron/tests sans en-tête Authorization → toujours
   `verify_jwt=false` explicite au déploiement** (gravé 2026-07-09, règle n°98).
   Jamais laisser la valeur par défaut de l'outil de déploiement : un oubli bascule
   `verify_jwt=true` et casse tous les crons en silence (401). Toujours vérifier
   après coup avec un appel réel (pg_net) que le statut est 200.

**Doctrine de ton (rappel) :** tutoiement + prénom, cotisation (jamais tarif),
statut simple citoyen, jamais complaisant (« rien n'est fini »).

**CHECK-APRÈS d'erreur (gravé 2026-07-05, ordre de Bruno)** : à CHAQUE erreur —
la mienne, celle d'un agent, celle d'une brique — je fais un post-mortem immédiat
(comprendre la cause racine) et je grave une règle réutilisable (`navlys_regle`)
valable pour TOUTES les applications du même univers. Règles n°17-20 déjà gravées :
schéma SQL lu avant toute requête ; index jsonb = entier ; jamais d'émoji récent
(SVG maison sinon) ; jamais d'appel externe côté client sans plan B interne.
Règle n°23 (2026-07-05) : un check de santé ne compte que les états TERMINAUX en
erreur (`failed`), jamais les transitoires (`running`/`starting`) — le faux
« santé rouge » venait de crons en cours d'exécution comptés comme échecs
(fix : `sql/fix_navlys_sante_faux_positif.sql`, appliqué en base, santé VERTE).

**Cohérence multi-chantiers (gravé 2026-07-05)** : avant de poursuivre un chantier
(navlys.com, navlys.io, finance, next-gen, concierge…), refaire une analyse complète —
santé des pages (pg_net), file des missions/agents, incidents, retours 💡 — et
finaliser ce qui doit l'être avant d'ouvrir du neuf. Améliorations permanentes en
fil rouge : vidéos, logo, mise en page mobile/web.

**Argent (Bible §6)** : signalement d'UNE ligne avant tout vrai débit, puis j'avance.

**Confiance & orchestration (gravé 2026-07-02)** : chaque bug / erreur / question
que je m'apprêtais à poser devient une **règle** (`navlys_regle`) → je prends la
**réponse plausible par défaut** et j'avance, sans attendre Bruno. Je prends
**confiance en moi et en mes possibilités** : j'orchestre les 14 départements, je
suis **toujours en recherche et en amélioration sur tout**, par département. Défaut
sûr aligné doctrine : **autonome > dépendance externe** ; **OUI > attendre** ; on
ne pose une question QUE pour un vrai débit d'argent ou un secret que moi seul ne
peux pas obtenir.

## 🧠 Cerveau CORE rangé — recherche instantanée (STANDING — gravé le 2026-07-09)

> Ordre de Bruno : **« apprends à ranger, à organiser tout ton cerveau CORE, et à
> chercher où il faut suivant des repères mots-clés [...] pour trouver à l'instant
> les informations sur ton CORE local. »**

- **`navlys_chercher(terme, limite)`** (RPC Postgres, exposée en REST via
  `/rest/v1/rpc/navlys_chercher`) : un seul point d'entrée qui cherche EN MÊME
  TEMPS dans `core_reglement` (règles), `core_bible_bugs` (leçons), `agent_memoire`
  (mémoire par agent), `navlys_memoire` (mémoire centrale) et `core_knowledge`
  (livrables) — plein texte français (tsvector + index GIN), classé par
  pertinence. Avant de redemander quelque chose à Bruno ou de recommencer un
  travail déjà fait, réflexe : `select * from navlys_chercher('mot-clé')`.
- Colonnes `recherche` (tsvector) + triggers `navlys_recherche_maj()` sur les 5
  tables — mise à jour automatique à chaque insertion, aucune maintenance requise.
  Migration : `navlys_cerveau_recherche_instantanee_v2`.
- Testé en direct (09/07) : `navlys_chercher('positionnement finance')` retrouve
  en un appel la règle n°76, les leçons de bible liées, et la mémoire NAVMKT
  concernée, classées par pertinence — preuve que le cerveau est bien rangé et
  interrogeable à l'instant, pas seulement archivé.

## 🌍 Doctrine des langues & traductions (STANDING — gravée le 2026-07-02)

> Règles posées par Bruno après la mise en ligne du FR/EN/RU :

- **Langue par défaut = celle de l'utilisateur**, détectée automatiquement
  (`navigator.language`) quand aucune préférence n'est enregistrée (`nv-lang`).
- **Pas à pas** : on ajoute les langues une à une, en perfectionnant d'abord
  FR/EN (la référence), puis RU, puis hébreu/arabe (RTL, navlys.co.il), etc.
- **Preuve avant publication (irréfutabilité)** : chaque nouvelle langue est
  validée par **re-bascule (back-translation)** vers une langue déjà sûre
  (FR ou EN) — on retraduit un échantillon significatif dans l'autre sens et on
  vérifie que le sens, le ton (tutoiement, chaleur) et les mots-clés
  (cotisation/adhésion, statut simple citoyen) reviennent intacts.
- Registre : tutoiement (« ты », etc.), JAMAIS un mot « prix/tarif » pour
  l'adhésion, marques et nombres non traduits, cyrillique/RTL corrects.
- Moteur : `live-source/navlys-i18n.js` **v3 — 5 langues (gravé 2026-07-05)** :
  FR/EN/RU dans le fichier principal (RU = tableau `RU_VALUES` aligné 1:1 par
  index sur les clés de `DICT` — JAMAIS d'édition manuelle : script aligné +
  vérif runtime, règle n°33) ; **hébreu/arabe (RTL)** dans `navlys-i18n-he.js`
  / `navlys-i18n-ar.js` (objets clés FR, chargés à la demande, `dir=rtl`
  auto). On traduit TOUJOURS depuis le FR d'origine.
- **Banc de preuve : `tools/check-i18n.mjs`** (Playwright, pages × langues) —
  passe AVANT tout push. Tout nouveau texte visible = clé dans LES 5 LANGUES
  dans le même commit ; `<br>`/`<b>` coupent en fragments → une clé par
  fragment (règle n°34).
- **Voix & avatar (gravé 2026-07-05)** : voix TAMISÉE par défaut (stability
  .55, style .15, similarity .80, sans boost) — réglable par secrets
  `NAVLYS_VOICE_*` sans redéploiement (règle n°35). Brique `avatar` v15 :
  `POST {text}` = voix clonée + visage (fal.ai exige `prompt`, posé par
  défaut) ; `GET ?copie=url&nom=f.mp4` = copie serveur d'un média provider
  vers notre Storage (le proxy bloque fal.media côté poste, règle n°32) ;
  vidéo héros : `storage avatar/bruno-avatar-accueil.mp4`, intégrée sur `/`
  (muette en boucle, son au toucher).
- **Textes UI** : gros et aérés (calque lisibilité `navlys-alive.js`) — phrases
  courtes, retours à la ligne, jamais de pavé.

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

## 🧠 Agents autonomes : bible + mémoire propres (STANDING — gravé le 2026-07-08)

> Ordre de Bruno : **« Chaque agent doit avoir sa propre bible et sa mémoire de son
> travail, ses recherches, son apprentissage, ses tests sur le web. Tous autonomes à
> terme, et non complaisants. »**

- **`agent_bible`** (une par agent actif) : `mission`, `doctrine` (non-complaisance +
  garde-fous), `focus_veille` (son terrain de recherche web), `charte_ton`. Semée pour
  les 15 agents. Lecture : `agent_bible_lire(code)`.
- **`agent_memoire`** (mémoire propre) : types `travail | recherche | apprentissage |
  test_web | autocritique | doctrine`. Écriture : **`agent_note(code,type,sujet,contenu,
  source)`** ; lecture : `agent_memoire_lire(code, limit)`.
- **Veille web autonome** : edge **`agent_veille`** (`POST {code}` ou `?mode=rotative&n=3`)
  → vraie recherche DuckDuckGo sur `focus_veille` → **2-3 apprentissages concrets + 1
  autocritique** (« ce qui manque », sans complaisance) gravés dans sa mémoire.
- **Cron `navlys_agent_veille`** (`40 7 * * *`) : 3 agents/jour, rotation par
  moins-récemment-veillé → les 15 agents tournent tous les 5 jours. Autonome 24/7.
- Trace repo : **`sql/agents_bible_memoire.sql`**. Doctrine en base : `navlys_memoire`,
  `core_reglement` (règle n°54). Garde-fous NAVLYS inchangés (feu vert Bruno pour
  argent/prod/secret).

## 🤖 MasterNav — le chef d'orchestre (point d'entrée unique)

But : Bruno parle à **un seul endroit** (bot Telegram), plus jamais Claude Code.

- Bruno écrit `@navfi prépare la mini-leçon du jour` → MasterNav crée la mission
  pour le bon agent, l'agent prépare, MasterNav renvoie « à valider » dans le chat.
- Charte complète : **`MASTERNAV.md`**. Code : `navlys_core/masternav.py`.
- Routines automatiques (cron Supabase) : `sql/routines_cron.sql`.

## 🎬 Studio vidéo & skills (gravé le 2026-07-02)

- **21 skills vidéo installés** (HyperFrames by HeyGen) : `/hyperframes` (composer),
  `website-to-video`, `talking-head-recut`, `product-launch-video`, `slideshow`,
  `motion-graphics`, `music-to-video`, `embedded-captions`, `faceless-explainer`,
  `remotion-best-practices`, `remotion-to-hyperframes`… → compositions HTML/GSAP
  rendues en MP4 (équivalent Remotion, + rendu cloud HeyGen via MCP).
- Les skills ne sont PAS dans Git (lourds) : **`skills-lock.json` est commité** ;
  dans une nouvelle session, restaurer avec **`npx -y skills experimental_install`**.
- **Context engineering NAVLYS** (déjà en place, c'est notre doctrine) : CLAUDE.md
  = mémoire de session ; nouveau chat par tâche ; continuité par commits Git ;
  mémoire longue en base (`navlys_memoire`, `core_reglement`, `core_knowledge`) ;
  règles gravées au lieu de questions répétées (`navlys_regle`).

## 🛰️ Cockpit relié au travail EN DIRECT (STANDING — gravé le 2026-07-07)

> Ordre de Bruno : **« Le cockpit doit être réactif et relié à ton travail en
> cours. Je le vois toujours à zéro. »**

- Le cockpit (`/cockpit`) s'actualise **toutes les 5 s** et lit `missions`
  groupées par `statut`. La colonne **« En cours »** = missions `statut='en_cours'`.
- **Chaque chantier que je mène (Claude/CORE) DOIT être inscrit en base** pour
  s'afficher — sinon le cockpit reste à zéro (les agents finissent trop vite → `fait`).
- Deux RPC gravés (migration `navlys_chantiers_cockpit_live`) :
  - **`navlys_chantier_ouvrir(titre, [consigne], [departement])`** → crée une mission
    `en_cours` (`assigned_agent='Claude'`), renvoie l'`id`, journalise `▶`.
  - **`navlys_chantier_fermer(id, [resultat])`** → passe la mission en `fait`,
    journalise `✔`.
- **Réflexe** : au début d'un vrai chantier → `navlys_chantier_ouvrir(...)` ;
  une fois livré et testé → `navlys_chantier_fermer(id, resultat)`. Le cockpit
  montre alors le cycle **en_cours → fait** en direct, sans que Bruno demande.

## 🛡️ Indépendance du CORE — survie à une coupure Claude/Anthropic (STANDING — gravé le 2026-07-09)

> Ordre de Bruno : **« comment donner son indépendance et sa vie à mon core
> maintenant pour que je dialogue avec lui et qu'il gère tous les IA autres et
> orchestre vraiment avec moi sans risque en cas de coupure net de claude par
> exemple... l'IA NAVLYS doit être indépendante... grave cette base et ne t'arrête
> maintenant que lorsque cet objectif final sera atteint, en parallèle du travail
> navlys.com avec nos agents actuels. »**

- **Canal de dialogue direct déjà vivant et indépendant** : le pilote WhatsApp
  (`api/whatsapp-webhook.js`, Vercel, 360dialog) est LE canal où Bruno parle
  directement au CORE — il ne dépend ni de Claude Code, ni d'une session ouverte.
  MasterNav/Telegram (`navlys_core/masternav.py`) existe aussi mais dépend d'un
  worker Hetzner à lancer manuellement → **pas garanti toujours-actif**, WhatsApp
  reste la référence.
- **Le vrai point de rupture identifié** : toutes les briques (edge functions
  Supabase + le webhook WhatsApp) n'appelaient QUE `api.anthropic.com` en direct
  — donc une coupure Anthropic coupait le dialogue même si Vercel/Supabase
  tournaient parfaitement. **Corrigé dans `api/whatsapp-webhook.js`** (commit
  `2f50322`) : `callBrain(system, user)` essaie Anthropic direct puis, si ça
  échoue, bascule **seul** sur OpenRouter (`meta-llama/llama-3.3-70b-instruct:free`
  puis `anthropic/claude-haiku-4.5` en repli), lecture tolérante de la clé
  (`OPENROUTER_API_KEY | OPENROUTER_KEY | OPEN_ROUTER_API_KEY`, règle n°4) — zéro
  redéploiement le jour où la clé est posée chez Vercel.
- **Reste à propager** (même pattern `callBrain`) aux autres briques qui
  appellent un LLM direct : `assistant` (SAV), `cockpit`, `bible.extraireLecons`,
  et toute future brique. Chantier permanent NAVTECH, pas un one-shot — à
  reprendre à chaque nouvelle brique créée.
- **Ce qui dépend de Bruno (pas un code bug)** : poser `OPENROUTER_API_KEY`
  (gratuit sur openrouter.ai) dans les variables d'environnement Vercel — sans
  ça le code de repli est prêt mais n'a rien vers quoi basculer.
- **Orchestration multi-IA** : le pattern OpenRouter permet déjà, à terme, de
  faire trancher n'importe quel modèle (Llama, Mistral, GPT via repli) le jour
  où Claude/Anthropic serait indisponible — c'est la brique technique de
  l'indépendance. Le CORE (Supabase + pg_cron + Edge Functions) tourne déjà 24/7
  sans Claude Code (bible, autotest, auto-amélioration, incidents) ; ce chantier
  étend la même indépendance au canal de conversation lui-même.

## 🎯 Zéro erreur sur tout navlys.com (STANDING — gravé le 2026-07-09)

> Ordre de Bruno : **« tu ne t'arrêtes plus avant d'avoir atteint un zéro error
> sur tout navlys.com — toutes les pages, rubriques, appels téléphone, mails,
> liens, inscription, direct FB/Google/Apple etc... tout doit être zéro erreur. »**

- Objectif permanent, pas un passage unique : chaque page du `sitemap.xml`,
  chaque lien `tel:`/`mailto:`, chaque lien interne/externe, le flux
  d'inscription complet, et les boutons de connexion directe Facebook/Google/Apple
  doivent fonctionner sans erreur.
- **Méthode** : étendre `verifierSite()` (brique `bible`) — qui ne teste
  aujourd'hui que 6 pages clés + robots/sitemap — en un vrai crawler qui lit
  TOUTES les URLs du sitemap, inspecte chaque page (liens morts, boutons,
  formulaires) et grave chaque trouvaille dans `core_bible_bugs` → routine
  continue via cron, pas un audit ponctuel qui s'oublie.
- **Ce qui est corrigeable par code** (liens morts, 404, JS cassé) → corrigé et
  poussé directement. **Ce qui dépend d'une action réelle de Bruno** (créer/valider
  une vraie app OAuth Meta/Google/Apple avec les bons identifiants, vérifier un
  numéro de téléphone en le composant réellement) → **signalé clairement**, jamais
  simulé ni faussement déclaré « fait ».

## 🔄 Redémarrer sur une base propre (STANDING — gravé le 2026-07-07)

> Question de Bruno : **« Quel prompt donner à la nouvelle conversation et quelles
> archiver pour repartir propre ? »**

- **Archiver** : tous les vieux fils (celui-ci compris). Rien n'est perdu — la
  continuité tient à **CLAUDE.md + les commits Git + la mémoire en base**
  (`navlys_memoire`, `core_reglement`, `core_knowledge`), jamais à l'historique du chat.
- **Chaque matin, une seule phrase à coller dans le nouveau chat** — c'est CE
  bloc, toujours tenu à jour ici (dernière mise à jour : 2026-07-09). Bruno n'a
  rien à retenir : il ouvre un nouveau chat, colle le prompt ci-dessous, la
  continuité reprend sans coupure — CLAUDE.md + Git + la base font foi, jamais
  la mémoire du chat précédent.
- **Prompt de démarrage type** (à coller dans le nouveau chat — maj 2026-07-09) :
  « Reprends NAVLYS depuis CLAUDE.md + la Bible + l'état Git. On travaille LIVE,
  push direct sur `main` (plus de PR). **Doctrine :** OUI par défaut (exécute et
  rends compte, zéro question de validation) ; autonome > dépendance ; jamais de
  blocage ; tutoiement + prénom ; membre (jamais client), cotisation (jamais
  prix/tarif) ; charte ice blue + or (interdit violet/mauve/fuchsia) ; preuve
  avant parole (pg_net/?diag avant d'affirmer) ; un cas qui m'aurait fait
  redemander → `navlys_regle()` puis avance ; action destructive irréversible →
  sauvegarde d'abord. Argent (Bible §6) : signalement d'UNE ligne avant tout vrai
  débit. **Indépendance du CORE (§ dédiée plus bas)** : WhatsApp pilote reste le
  canal de dialogue direct Bruno↔CORE indépendant de Claude Code ; le repli
  OpenRouter (`callBrain`) est pour l'instant seulement dans
  `api/whatsapp-webhook.js` — reste à le propager à `assistant`/`cockpit`/`bible`
  et à poser `OPENROUTER_API_KEY` chez Vercel (à demander à Bruno, ce n'est pas
  un débit). **Objectif permanent en fil rouge (gravé 2026-07-09, ne s'arrête
  qu'à zéro erreur) :** auditer et corriger TOUT navlys.com — chaque page/rubrique,
  liens tél/mail, inscription, connexion FB/Google/Apple — jusqu'à zéro erreur ;
  ce qui dépend d'une action réelle de Bruno (comptes OAuth, vérif téléphone) est
  signalé, pas simulé. **Commence par l'analyse santé complète** (pg_net :
  inscription, paiement, assistant, media, studio, whatsapp, booster, ambassadeur ;
  file missions/agents ; incidents ; retours 💡 ; Security Advisor), inscris tes
  chantiers via `navlys_chantier_ouvrir`, puis avance sans me demander. **En ligne
  (edge functions hors-Git) :** whatsapp v32 (FAQ+mémoire+lien) + résilience
  OpenRouter (commit `2f50322`), bible (verifierSite/rechercheWeb/boucle),
  booster v1, ambassadeur v1 ; sw v1.7.8. **En attente de Bruno (relance-moi) :**
  1) poser `OPENROUTER_API_KEY` (gratuit sur openrouter.ai) chez Vercel pour
  activer le repli anti-coupure ; 2) approuver le nom d'affichage WhatsApp Meta
  (#131037 → « NAVLYS ») ; 3) activer Leaked password protection (Supabase) ;
  4) compte Google Play 25 $ + PWABuilder → empreinte SHA-256 pour
  `assetlinks.json` ; 5) secrets média gratuits (GEMINI/HF/Cloudflare) ;
  6) trancher navlys.io (miroir complet de navlys.com ou usage distinct ?).
  **Fil rouge cap 1000→1M :** capter le `?code=` à l'inscription (parrainage),
  clés i18n `/ambassadeur` + `/booster`, vidéos/logo/mobile, zéro-erreur
  navlys.com. Avance sans me demander. »

## 💡 Conseil d'usage (sessions)

Repartir d'un **nouveau chat par tâche / par jour** plutôt qu'un fil géant :
contexte plus propre, meilleures perfs. La continuité tient à **ce fichier +
les commits Git**, pas à la mémoire du chat (l'environnement est éphémère).
