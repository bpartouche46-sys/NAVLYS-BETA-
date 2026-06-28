# 🧳 MIGRATION ANCIEN PC → NOUVEAU PC — tout récupérer, puis abandonner l'ancien

> **Objectif de Bruno** : *« Je suis sur l'ancien ordinateur. Récupère tout pour ne plus avoir
> à l'utiliser pour notre travail. Je veux tout sur le nouvel ordi. »*
>
> Ce document est **le guide unique** de la migration. Il **ne duplique pas** les guides
> existants, il les **enchaîne dans le bon ordre** :
> - Code des sites → `docs/SAUVEGARDE-CODE-VERCEL.md`
> - Accès serveur / clé SSH → `docs/ACCES-SERVEUR.md`
> - Secrets & rotation → `docs/SECRETS-ET-CLES.md`
> - Sauvegarde serveur/clouds → `docs/SAUVEGARDE.md`, `docs/SAUVEGARDE-CLOUDS-VERS-CORE.md`

---

## ⚠️ À lire d'abord (cadre honnête)

- **Claude (cloud isolé) n'a AUCUN accès au disque de l'ancien PC.** Je ne peux pas
  « aspirer » tes fichiers à distance. **C'est toi qui exécutes** les étapes ci-dessous
  **sur l'ancien PC** ; moi je te guide et je tiens la mémoire à jour.
- **Méthode de transport = GitHub + tes clouds** (déjà la règle du projet, cf. ERR-001/002).
  Une fois que tout est poussé en lieu sûr, **le nouveau PC récupère tout** sans rien
  brancher physiquement à l'ancien.
- **Règle d'or sécurité (rappel)** : on ne pousse **JAMAIS** de secret dans Git
  (`.env`, clés, mots de passe, IP privées). Voir §4 + `docs/SECRETS-ET-CLES.md`.
- **Action sensible = feu vert de Bruno.** Ici tout est non destructif : on **copie**,
  on ne **supprime rien** de l'ancien PC tant que la §6 (vérification) n'est pas verte.

---

## 🗺️ Vue d'ensemble — 8 étapes

| # | Étape | Vers où | Doc détaillée |
|---|-------|---------|---------------|
| 1 | Inventaire de ce qui n'existe QUE sur l'ancien PC | — | ce doc §1 |
| 2 | Code des sites → GitHub | GitHub (privé) | `SAUVEGARDE-CODE-VERCEL.md` |
| 3 | Fichiers « lourds » (médias, vidéos, voix, exports) → cloud | OneDrive/Drive/R2 | ce doc §3 |
| 4 | Secrets (.env, clés, mots de passe) → coffre-fort | gestionnaire de mots de passe | `SECRETS-ET-CLES.md` |
| 5 | Mise en route du NOUVEAU PC | nouveau PC | ce doc §5 + `ACCES-SERVEUR.md` |
| 6 | **Automatisation** : nouveau PC → GitHub → core Hetzner (auto) | GitHub + cron core | ce doc §6 + `PROCEDURE-VERCEL-GITHUB.md` |
| 7 | Vérification finale AVANT d'abandonner l'ancien | — | ce doc §7 |

> 🎯 **Le but final** (demande de Bruno) : **ne plus jamais toucher l'ancien PC**. Tu
> travailles sur le **neuf** → tu **pousses sur GitHub** → les **sites Vercel** et le **core
> Hetzner** se mettent à jour **tout seuls** (§6).

> 💡 Ordre conseillé : **1 → 2 → 3 → 4 → 5 → 6**. Ne passe à l'étape suivante que quand
> la précédente est cochée. On peut s'arrêter et reprendre : tout est tracé ici.

---

## 1) Inventaire — qu'est-ce qui vit UNIQUEMENT sur l'ancien PC ?

Coche au fur et à mesure. **Cherche ces choses** sur l'ancien PC (Explorateur Windows /
Finder Mac). Pour chaque case cochée « présent », note où ça va (étape 2, 3 ou 4).

- [ ] **Dossiers de code des sites** (marque sûre : un sous-dossier caché `.vercel`
      contenant `project.json`). Noms probables : `navlys-app`, `brunopartouche`, `navbio`,
      `navlys-io`, `navlys-teaser`, `brunopartouche-teaser`. → **Étape 2**
      *(Rappel : navlys.com / navlys / brunopartouche seraient déjà sur GitHub `NOVA-HUB` —
      à confirmer ; on ne re-pousse que ce qui manque.)*
- [ ] **Fichiers `.env`** (à la racine de chaque dossier de site) → **Étape 4** (coffre, PAS Git)
- [ ] **Clé(s) SSH** : dossier `.ssh` (fichiers `id_ed25519`, `id_rsa`, `config`,
      `known_hosts`). → **Étape 4/5** (transport sécurisé, jamais dans un chat ni Git)
- [ ] **Médias & assets lourds** : vidéos de présentation, `bruno.mp3`, images, exports
      voix ElevenLabs, montages, kits presse, logos source. → **Étape 3**
- [ ] **Le « cerveau » / docs de travail** (OneDrive, dossiers `_NAVLYS_*`, notes, exports).
      Une grande partie est **déjà** dans ce dépôt (`recup-docs/`, `_NAVLYS_*`, packs) —
      vérifie qu'il ne reste rien d'unique à rapatrier. → **Étape 3** (le reste)
- [ ] **Accès navigateur** : mots de passe enregistrés, marque-pages, sessions.
      → exporter depuis le navigateur vers le gestionnaire de mots de passe. → **Étape 4**
- [ ] **Configs outils** : GitHub Desktop, Vercel CLI (`~/.vercel`), `git config`,
      VS Code (extensions/réglages). → réinstaller sur le neuf (Étape 5), rien à « sauver ».
- [ ] **Autre** (à compléter par Bruno) : ____________________________________________

> 📌 Quand cet inventaire est rempli, on sait **exactement** ce qu'il reste à déplacer.
> Tant qu'une ligne « présent » n'est pas traitée, **ne pas effacer l'ancien PC**.

---

## 2) Code des sites → GitHub

👉 **Suis `docs/SAUVEGARDE-CODE-VERCEL.md`** (GitHub Desktop, pas de ligne de commande).
Points clés à ne pas oublier :

- Avant publication, vérifier le **`.gitignore`** (exclut `node_modules/`, `.next/`,
  `.vercel/`, `.env`, `.env.*`). **Aucun `.env` ne doit apparaître** dans la liste des
  fichiers à publier.
- Dépôts **PRIVÉS** par défaut.
- Ne re-pousser que les sites **non déjà couverts** par `NOVA-HUB`
  (à confirmer : `navbiolife.com`, `navlys.io`, `navlys-teaser`, `brunopartouche-teaser`).

- [ ] Chaque dossier de site trouvé en §1 est **publié sur GitHub** (ou confirmé déjà présent).
- [ ] Vérifié : **aucun secret** dans les fichiers publiés.

---

## 3) Fichiers lourds (médias, voix, exports) → cloud

Ces fichiers **ne vont pas dans Git** (trop lourds). On les met dans un cloud que le
nouveau PC peut rouvrir : **OneDrive** ou **Google Drive** (ou R2 si déjà en place,
cf. `SAUVEGARDE-CLOUDS-VERS-CORE.md`).

Méthode simple (sans technique) :
1. Crée un dossier cloud **`NAVLYS-MIGRATION-<date>`**.
2. Glisse dedans : vidéos, audio (`bruno.mp3`, exports ElevenLabs), images source, kits,
   montages, et tout dossier de travail unique repéré en §1.
3. Attends la **fin de la synchronisation** (icône « à jour » / coche verte).

- [ ] Tous les médias/exports lourds sont **dans le cloud** et **synchronisés**.
- [ ] Le « cerveau » résiduel (non déjà dans `recup-docs/`) est **dans le cloud** aussi.

> 🔁 Variante avancée (optionnelle) : `rclone` OneDrive→serveur, déjà décrite dans
> `docs/SAUVEGARDE-CLOUDS-VERS-CORE.md`. Réservé si tu veux centraliser sur le core.

---

## 4) Secrets (.env, clés, mots de passe) → coffre-fort

🔴 **Jamais dans Git, jamais dans un chat.** Transport **chiffré** uniquement.

👉 **Suis `docs/SECRETS-ET-CLES.md`** (inventaire S1→S10 + procédure de rotation).
Pour la migration, l'essentiel :

- [ ] Ouvre/installe un **gestionnaire de mots de passe** (Bitwarden / 1Password / KeePass).
- [ ] Mets-y le **contenu de chaque `.env`** (copie le texte, range-le par site), et tous
      les mots de passe (cockpit, Hetzner, Vercel, GitHub, Supabase, Stripe, Gmail…).
- [ ] **Clé SSH** : voir §5 (le plus propre = **créer une clé neuve** sur le nouveau PC,
      pas copier l'ancienne). Si tu dois transporter l'ancienne : **clé USB chiffrée**,
      puis suppression de la copie. Jamais par e-mail/chat.
- [ ] **Secrets potentiellement exposés** (token Vercel, mdp cockpit signalés dans
      `ETAT-DES-LIEUX`) : prévois leur **rotation** (régénérer) — décision/action = Bruno.

---

## 5) Mise en route du NOUVEAU PC

Sur le **nouvel ordinateur** :

1. **Récupérer toute la mémoire + le code** :
   - Installe **GitHub Desktop**, connecte-toi en `bpartouche46-sys`.
   - **Clone** `NAVLYS-BETA-` (cette mémoire) **et** `NOVA-HUB` (le code des sites)
     + tout dépôt publié en §2.
   - En ligne de commande, l'équivalent est :
     ```bash
     git clone https://github.com/bpartouche46-sys/NAVLYS-BETA-.git
     git clone https://github.com/bpartouche46-sys/NOVA-HUB.git
     ```
2. **Récupérer les fichiers lourds** : rouvre le dossier cloud `NAVLYS-MIGRATION-<date>`
   (§3) et laisse-le se synchroniser sur le neuf.
3. **Remettre les secrets** : ouvre le gestionnaire de mots de passe (§4), recrée les
   fichiers `.env` localement **à côté** de chaque dossier de site (ils resteront hors Git
   grâce au `.gitignore`).
4. **Accès serveur (SSH)** : 👉 **suis `docs/ACCES-SERVEUR.md`** — méthode recommandée =
   **créer une clé neuve** sur le nouveau PC et l'autoriser sur le serveur depuis l'ancien
   PC (tant qu'il marche encore). Teste la connexion depuis le neuf.
5. **Outils** : réinstalle Vercel CLI (`npm i -g vercel`), VS Code, Node, etc. Reconnecte
   `vercel login` (équipe NAVLYS) et `git config` (nom/e-mail).

- [ ] `NAVLYS-BETA-` + `NOVA-HUB` (+ autres) **clonés** sur le neuf.
- [ ] Dossier cloud des médias **synchronisé** sur le neuf.
- [ ] `.env` recréés localement (et **absents** de `git status`).
- [ ] **SSH testé OK** depuis le nouveau PC.
- [ ] Outils réinstallés et reconnectés.

---

## 6) ⚙️ Automatisation : nouveau PC → GitHub → core Hetzner (tout seul)

> **Objectif de Bruno** : *« Ne plus rien mettre à jour depuis l'ancien ordinateur, tout
> faire depuis le nouveau, et que ça se mette aussi à jour AUTOMATIQUEMENT sur le core
> NAVLYS Hetzner. »*

**Principe — GitHub est la source unique de vérité :**

```
   Nouveau PC  ──(git push)──▶  GitHub  ──┬──(auto)──▶  Sites Vercel (redéploiement au push)
   (seul poste                            │
    de travail)                           └──(cron pull)──▶  Core Hetzner (ce script)
```

Tu ne touches plus jamais l'ancien PC : tu travailles sur le neuf, tu **pousses sur
GitHub**, et **tout le reste se met à jour seul**.

### 6a. Sites publics (Vercel) — auto au push
Déjà cadré dans **`docs/PROCEDURE-VERCEL-GITHUB.md`** : une fois chaque projet Vercel relié
à son dépôt GitHub, **chaque push déclenche un déploiement**. ⚠️ Garde-fou conformité +
**feu vert Bruno** pour la promotion en production (cf. gouvernance) : on peut laisser les
**Preview** s'auto-générer et ne promouvoir le **Production** que sur validation.

### 6b. Core Hetzner — mise à jour automatique (cron)
Le serveur **tire** (pull) GitHub tout seul, à intervalle régulier. Pas de port entrant à
ouvrir, le serveur ne fait que **sortir** vers GitHub → cohérent avec la posture sécurité
du projet (pas d'inbound, 2FA, Bruno exécute).

Script fourni : **`scripts/sync-core.sh`** (non destructif : il s'arrête s'il détecte des
modifs locales sur le core au lieu de les écraser). Installation, **par Bruno en SSH** :

```bash
# 1) cloner le dépôt une fois sur le serveur
git clone https://github.com/bpartouche46-sys/NAVLYS-BETA-.git /opt/navlys/NAVLYS-BETA-
cp /opt/navlys/NAVLYS-BETA-/scripts/sync-core.sh /opt/navlys/sync-core.sh
chmod +x /opt/navlys/sync-core.sh

# 2) tester à la main
REPO_DIR=/opt/navlys/NAVLYS-BETA- /opt/navlys/sync-core.sh

# 3) automatiser : toutes les 5 minutes
crontab -e
# puis ajouter cette ligne :
*/5 * * * * REPO_DIR=/opt/navlys/NAVLYS-BETA- /opt/navlys/sync-core.sh >> /var/log/navlys-sync.log 2>&1
```

- Pour **redémarrer un service** quand le code change, ajoute `POST_HOOK` :
  `POST_HOOK="systemctl restart navlys-core"` (adapter au vrai nom du service).
- Suivi : `tail -f /var/log/navlys-sync.log`.

> 🔐 **Sécurité** : le serveur lit GitHub via **HTTPS public** (dépôt) ou un **token GitHub
> en lecture seule** rangé dans son `.env` (jamais dans Git — cf. `SECRETS-ET-CLES.md` S6).
> Ne jamais coller de token dans la crontab en clair : le mettre en variable d'environnement
> serveur.
> ⚠️ **Rappel ouvert** : le « core Hetzner » est noté **possiblement legacy** (à confirmer
> par Bruno, cf. `CLAUDE.md` §1 et `ETAT-DES-LIEUX`). **Vérifier d'abord** que le core doit
> bien rester actif **avant** de brancher ce cron. Si le core est abandonné au profit de
> Vercel+Supabase, l'étape 6b devient inutile (seul 6a compte).

- [ ] Sites Vercel reliés à GitHub (auto-deploy) — *quand Bruno le décide*.
- [ ] `scripts/sync-core.sh` installé + cron actif sur le core — *si le core est conservé*.
- [ ] Testé : un push depuis le neuf apparaît bien sur le core (`navlys-sync.log`).

---

## 7) ✅ Vérification finale AVANT d'abandonner l'ancien PC

Ne considère l'ancien PC comme « inutile » **que si TOUTES ces cases sont vertes** :

- [ ] Chaque dossier de code de la §1 est **sur GitHub** (ouvert et vérifié en ligne).
- [ ] Tous les médias/exports lourds sont **dans le cloud** et **rouverts depuis le neuf**.
- [ ] Tous les `.env` et mots de passe sont **dans le gestionnaire** et **recréés sur le neuf**.
- [ ] **SSH fonctionne depuis le nouveau PC** (plus besoin de l'ancien pour le serveur).
- [ ] Le nouveau PC peut **tout faire** : ouvrir le code, déployer (test), accéder au serveur,
      retrouver la mémoire (`NAVLYS-BETA-`).
- [ ] **Rien d'unique** ne reste sur l'ancien PC (relis l'inventaire §1, ligne par ligne).

> 🟢 **Seulement alors** : l'ancien PC peut être mis de côté.
> 🔐 **Avant de t'en débarrasser pour de bon** (revente/recyclage) : retire l'ancienne clé
> SSH de `~/.ssh/authorized_keys` sur le serveur, déconnecte les comptes (Vercel/GitHub/
> navigateur), puis **efface le disque** (réinitialisation usine). Ne jette jamais un PC
> avec des clés/`.env` encore dessus.

---

## 📓 Suivi (à mettre à jour au fil de l'eau)

| Étape | Statut | Note |
|-------|--------|------|
| 1 Inventaire | ⬜ à faire | |
| 2 Code → GitHub | ⬜ à faire | |
| 3 Médias → cloud | ⬜ à faire | |
| 4 Secrets → coffre | ⬜ à faire | |
| 5 Nouveau PC | ⬜ à faire | |
| 6 Automatisation (Vercel + cron core) | ⬜ à faire | |
| 7 Vérif finale | ⬜ à faire | |

> Quand une étape avance, change ⬜→🟡 (en cours) →✅ (fait) et ajoute la date.
> Reporte aussi l'avancement dans `docs/ETAT-DES-LIEUX.md` en fin de session.
</content>
</invoke>
