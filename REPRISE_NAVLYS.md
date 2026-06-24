# 🚀 REPRISE NAVLYS — démarre ici (nouvelle machine / nouvelle session)

> Lis ce fichier + `CANON_NAVLYS.md` en premier. Tout le contexte est là.
> Dernière mise à jour : 2026-06-24

---

## 1. Où en est le projet (résumé 30 s)

NAVLYS™ = éditeur de logiciel éducatif (méthode 90/10) + Alpaca comme broker affilié principal.
Le **cerveau autonome tourne 24/7** (worker Hetzner, 14 agents). L'**atelier site** est prêt et
déployable. Source de vérité unique = `CANON_NAVLYS.md`.

État : ✅ cerveau en ligne · ✅ atelier site prêt · ⏳ branchement Vercel + rotation mots de passe (côté Bruno).

---

## 2. Accès nécessaires (serveurs MCP à connecter)

Ces accès sont liés au **compte Bruno**, pas à la machine — ils suivent la connexion.
À vérifier présents dans la session :

- **Supabase** — base unique `hhrlgyvtqluxpywjiwkd` (site + cerveau).
- **GitHub** — repo `bpartouche46-sys/navlys-beta-` (branche `claude/project-inventory-audit-j0k39p`).
- **Vercel** — déploiement du site.
- **Google Drive** — archives, anciennes versions, docs maîtres.
- **Stripe** — encaissement NAVLYS (actif).
- *(Optionnels : PayPal, Gmail, Calendar, Notion, Canva, Figma…)*

Si un serveur manque : le reconnecter dans la config Claude Code (OAuth). Les données, elles, sont déjà en base / sur Git.

---

## 3. Infrastructure réelle

| Brique | Détail |
|---|---|
| Base | Supabase `hhrlgyvtqluxpywjiwkd` (site + cerveau, **base unique**) |
| Repo | `NAVLYS-BETA-` (worker Python + atelier site) |
| Worker | Python sur **Hetzner**, 24/7, survit aux reboots (systemd) |
| Front | Vercel (serverless, **pas** Next.js), domaine cible `navlys.com` |
| Clé front lecture | publishable `sb_publishable_fkVkBVLyEZsYPwhayG-S8A_CwCel0wP` |

---

## 4. Structure de l'atelier (fichiers du repo)

- `index.html` — hub d'accueil (relie tout)
- `live.html` — dashboard CORE live (lecture seule, RPC `core_live_feed`)
- `tarifs.html` — formules F1–F4 + parrainage Alpaca
- `alpaca.html` — partenariat Alpaca
- `faq.html` — FAQ + mentions légales
- `vercel.json` / `.vercelignore` — déploiement statique (worker exclu)
- `CANON_NAVLYS.md` — Bible (doctrine, prix, charte, légal)

---

## 5. Cerveau & agents (Supabase)

- `core_knowledge` — **15 fiches** (identité, sites, prix, charte, méthode 90/10, FAQ, SAV, légal, formules…).
- `agents` — **14 agents** actifs (NAVFI, NAVCOM, NAVMKT, NAVTECH, NAVPART, NAVLEX, NAVBIO, NAVPTE, NAVME, NAVLAB, NAVGEN, NAVLEAD, NAVDEM, NAVBIEN).
- `missions` — file de travail ; statuts : a_faire → en_cours → a_valider → fait.
- `core_live_feed()` — RPC public sûr alimentant `live.html`.
- Pour lancer une tâche : `insert into missions (titre, consigne, statut, departement, created_at) values (...,'a_faire','NAVxxx',now());`

---

## 6. Prochaines actions (priorisées)

1. 🔒 **Bruno** : changer les ~40 mots de passe exportés en clair (`Google_Passwords.csv`) + 2FA.
2. 🌐 **Bruno** : brancher le repo sur Vercel (Add New → Project → import) → URL + auto-déploiement.
3. ✅ Valider les 10 livrables agents en attente (dashboard).
4. 🎨 Appliquer le **plan de re-skin** (mission NAVTECH) au vrai site (retirer pourpre, purger NOVA).
5. ⚖️ Intégrer l'**article CGV parrainage Alpaca** (mission NAVLEX).
6. 🦙 Quand l'espace membre sera prêt : table `navlys_alpaca_referrals` + trigger d'upgrade.

---

## 7. Pour relancer Claude

Ouvre le repo `NAVLYS-BETA-`, puis dis simplement : **« reprends NAVLYS »** ou **« où on en est »**.
Je relis ce fichier + `CANON_NAVLYS.md` et je continue exactement là où on s'est arrêtés.

⚓ *« L'IA est le vent, c'est toi qui tiens la barre. »*
