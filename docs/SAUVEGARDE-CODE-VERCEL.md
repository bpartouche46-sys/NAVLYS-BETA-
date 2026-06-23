# 💾 Sauvegarder le CODE des sites Vercel dans GitHub (Phase 0)

> ⚠️ **MISE À JOUR 2026-06-23 — à lire en premier.** Vérification faite : le code de
> **navlys.com (navlys-core), navlys et brunopartouche est DÉJÀ sur GitHub** dans le dépôt
> **`bpartouche46-sys/NOVA-HUB`** (actif). **Pas besoin de les recopier depuis l'ancien PC.**
> Ce guide ne reste utile que pour les sites **non encore couverts** par NOVA-HUB
> (à confirmer : **navbiolife.com**, **navlys.io**, **navlys-teaser**, **brunopartouche-teaser**)
> et pour les éléments **server-local** (cockpit, médias `/root/navlys/`).

> Contexte d'origine : les sites sont déployés en direct (`source: cli`), sans lien Git
> automatique. (Voir aussi `docs/JOURNAL-ERREURS.md` → ERR-002 / ERR-004.)

---

## Étape 1 — Retrouver les dossiers du code sur l'ANCIEN PC

Chaque site est un **dossier** sur l'ancien PC. Pour les repérer :
- Cherchez des dossiers portant des noms comme `navlys-app`, `brunopartouche`, `navbio`,
  `navlys-io`, `navlys-teaser`, `brunopartouche-teaser`.
- Indice fiable : un dossier de site contient un **sous-dossier caché `.vercel`** (avec un
  fichier `project.json`). C'est la marque d'un projet déjà déployé sur Vercel.
- Souvent ils sont dans `Documents`, le Bureau, ou un dossier `projets`/`dev`/`sites`.

> 💡 Astuce : dans l'explorateur Windows, activez « Éléments masqués » (onglet Affichage)
> pour voir les dossiers `.vercel`. Et utilisez la recherche Windows : tapez `project.json`.

Notez le chemin de chaque dossier trouvé. (On veut au minimum **navlys-app** pour commencer.)

---

## Étape 2 — Installer GitHub Desktop (le plus simple, pas de ligne de commande)

1. Téléchargez **GitHub Desktop** : https://desktop.github.com
2. Installez-le, puis connectez-vous avec le compte GitHub `bpartouche46-sys`.

---

## Étape 3 — Publier un site dans GitHub (à refaire pour chaque site)

Dans GitHub Desktop :
1. Menu **File → Add local repository**.
2. Choisissez le dossier du site (ex. `navlys-app`).
3. S'il propose « create a repository » → acceptez.
4. **IMPORTANT** : avant de publier, il faut exclure les fichiers lourds/inutiles et les
   secrets. Créez (ou laissez GitHub Desktop proposer) un fichier `.gitignore` contenant
   au minimum :
   ```
   node_modules/
   .next/
   .vercel/
   .env
   .env.*
   dist/
   build/
   ```
5. Cliquez **Publish repository**.
   - Décochez « Keep this code private » seulement si vous voulez un dépôt public.
     → **Recommandé : laisser PRIVÉ** (votre code n'est pas public).
6. Répétez pour chaque site.

✅ Une fois publié, le code est en sécurité sur GitHub : versionné, sauvegardé, modifiable
sans risque. C'est la fin de la Phase 0 côté code.

---

## ⚠️ Règle de sécurité (très important)
- **Ne publiez JAMAIS un fichier `.env`** ni aucun fichier contenant des mots de passe,
  clés API, identifiants. Le `.gitignore` ci-dessus les bloque — vérifiez qu'ils
  n'apparaissent pas dans la liste des fichiers avant de publier.
- En cas de doute sur un fichier, demandez avant de publier.

---

## Et après ? (aperçu Phase 3)
Une fois les sites dans GitHub, on pourra **relier chaque projet Vercel à son dépôt GitHub**
(Vercel → projet → Settings → Git → Connect). Les futurs déploiements se feront alors
automatiquement depuis GitHub : plus jamais de code « perdu », et chaque modification
sera traçable. (Ne pas faire maintenant — d'abord sauvegarder.)
