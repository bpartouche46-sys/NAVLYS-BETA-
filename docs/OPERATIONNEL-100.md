# 🎯 ROUTE VERS 100% OPÉRATIONNEL & SÉCURISÉ

> Objectif de Bruno : **« rends tout opérationnel à 100% et sécurisé »**.
> Ce fichier transforme cet objectif en **liste finie, suivie et honnête** : chaque brique,
> son **statut**, **QUI** la fait, et le **blocage** éventuel. On coche jusqu'à 100%.
>
> 🔑 Légende statut : ✅ fait · 🟡 prêt (attend une action) · 🔴 bloqué (dépendance) · ⬜ à faire
> 👤 QUI : **C** = Claude (via GitHub) · **H** = Hermès (serveur) · **B** = Bruno (décisions/clés)

---

## ⚠️ La vérité honnête sur « 100% »

« Tout opérationnel à 100% » dépend de **3 leviers que Claude ne peut PAS actionner depuis
GitHub** (ils ont besoin d'un humain sur une machine + des clés) :

1. **Accès serveur Hetzner** (SSH) → Hermès / Bruno.
2. **Source des sites dans Git** (rapatriement depuis l'ancien/nouveau PC) → Bruno.
3. **Les clés / secrets** (à refaire) → Bruno (cf. `docs/SECRETS-ET-CLES.md`).

👉 Donc **Claude rend 100% PRÊT tout ce qui passe par le code/la doc** ; les 3 leviers
ci-dessus restent des **actions humaines**. Ce tracker dit exactement ce qui manque.

---

## A. 🔐 Sécurité (priorité n°1)

| # | Brique | Statut | QUI | Note |
|---|--------|--------|-----|------|
| A1 | Dépôt **sans secret** committé | ✅ | C | Scan OK : 0 secret, que des règles |
| A2 | `.gitignore` protège `.env`/clés/secrets | ✅ | C | `.env*`, `*.key`, `*.pem`, `secrets/`, `credentials*` |
| A3 | **Runbook clés/rotation** | ✅ | C | `docs/SECRETS-ET-CLES.md` |
| A4 | `core/.env.example` (noms, 0 valeur) | ✅ | C | aligné sur l'inventaire S1→S10 |
| A5 | **Rotation effective** des secrets exposés | 🟡 | B | cockpit, clés API → refaire (Bruno l'a annoncé) |
| A6 | **2FA** activé partout (Hetzner/GitHub/Vercel/Anthropic/Stripe) | ⬜ | B | à vérifier/activer |
| A7 | Garde-fous **argent + prod = STOP Bruno** câblés dans le moteur | ✅ | C | `core/src/guardrails/` — **18/18 tests OK** ; reste à déployer |

## B. 🧠 Core central (moteur agentique sur Hetzner)

| # | Brique | Statut | QUI | Note |
|---|--------|--------|-----|------|
| B1 | Blueprint technique | ✅ | C | `docs/CORE-CENTRAL-TECHNIQUE.md` |
| B2 | **Code du moteur prêt à déployer** (scaffold) | ✅ | C | `core/` complet (SDK, hooks, config, systemd) ; garde-fous testés |
| B3 | Décisions §5 (langage, qui héberge la clé, 1ʳᵉ chaîne) | 🟡 | B | reco : TypeScript ; 1ʳᵉ chaîne = Veille |
| B4 | Install moteur sur Hetzner (Node + Redis + systemd) | 🔴 | H | besoin accès serveur |
| B5 | Mémoire persistante (Redis/Postgres) | 🔴 | H | évite ERR-001 |
| B6 | Branchements MCP réels (GitHub/Vercel/Supabase…) | 🔴 | H/B | besoin des clés (§A5) |
| B7 | Cadence (cron/timer) veille + SAV | 🔴 | H | après B4 |

## C. 🌐 Sites (Vercel) + conformité

| # | Brique | Statut | QUI | Note |
|---|--------|--------|-----|------|
| C1 | Corrections conformité préparées (C-01→C-04) | ✅ | C | `corrections-pretes/` |
| C2 | Contrôle gardien Vague 1 (bio + navbio index) | ✅ | C | CONFORMES, prêts |
| C3 | **Source des sites dans Git** | 🔴 | B | install Claude Code PC bureau en cours |
| C4 | Mentions légales (éditeur/hébergeur) | 🔴 | B | hors Git + relecture juridique |
| C5 | **Feu vert prod** + déploiement | 🔴 | B | aucune mise en ligne sans accord |

## D. 🔄 Chaînes opérationnelles (sous-agents)

| # | Brique | Statut | QUI | Note |
|---|--------|--------|-----|------|
| D1 | **Veille web** (1ʳᵉ chaîne) | ✅ | C | tourne déjà — `docs/VEILLE/` |
| D2 | Chaîne **Sites / déploiement** | 🔴 | C/B | attend C3 (source dans Git) |
| D3 | Chaîne **SAV** (mails → propose → Bruno valide) | ⬜ | C/H | reco 2ᵉ chaîne après core |
| D4 | Chaîne **Back-office** (Stripe lecture d'abord) | ⬜ | C/H | argent = lecture seule sans feu vert |

## E. 💾 Sauvegarde

| # | Brique | Statut | QUI | Note |
|---|--------|--------|-----|------|
| E1 | Plan de sauvegarde | ✅ | C | `docs/SAUVEGARDE.md` + `scripts/backup.sh` |
| E2 | Snapshot Hetzner | ⬜ | B | filet immédiat |
| E3 | Volume 10 Go monté + rclone OneDrive→Hetzner | 🔴 | H | en cours |

---

## 🚦 Prochaines actions concrètes (ordre conseillé)

1. **B — Sécurité d'abord** : rotation des secrets exposés (§A5) + 2FA (§A6) — `docs/SECRETS-ET-CLES.md`.
2. **B — Débloquer la source des sites** (C3) : finir l'install Claude Code sur le PC bureau,
   pousser le code des sites dans Git → débloque D2 (chaîne Sites).
3. **H — Préparer le serveur** (B4/B5) : Node 18+, Redis, dossier du core.
4. **C — Le code du core est prêt** (`core/`) : dès que H a un serveur + B a une clé Anthropic,
   `npm install && npm run start` → moteur en vie avec garde-fous.
5. **On étend chaîne par chaîne** : Veille (✅) → Sites → SAV → Back-office. **Jamais tout d'un coup.**

> 📌 Ce tableau est la **source de vérité** de l'avancement. À mettre à jour à chaque progrès
> (et à refléter en bref dans `ETAT-DES-LIEUX`).
