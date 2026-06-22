# 📥 Zone de dépôt — « à trier »

> Dossier temporaire pour rapatrier le code de l'ancien poste.
> Tu déposes ici **le code des sites/applis**, Claude analyse, trie et reconstruit
> proprement. Une fois le tri fait, ce dossier sera **vidé / supprimé**.

---

## Ce qu'on met ICI ✅
- Le **code source** des sites (dossiers type `navlys-app`, `brunopartouche`, `navbio`…)
- Fichiers `index.html`, `package.json`, `*.js`, `*.css`, images du site, etc.
- Un dossier par site, en gardant son nom d'origine.

## Ce qu'on ne met JAMAIS ici ❌
- ❌ Le **OneDrive perso** / documents privés (rien à faire dans un dépôt de code)
- ❌ Les **secrets** : mots de passe, clés API, fichiers `.env`
  (de toute façon bloqués par `.gitignore`, mais on n'essaie même pas)
- ❌ Les `node_modules/` (inutile, lourd, régénéré automatiquement — déjà ignoré)

---

## Mode d'emploi (Windows 10)

1. **Repérer** les dossiers des sites sur l'ancien PC (Explorateur de fichiers).
2. **Copier** ces dossiers dans ce dossier `_a-trier/` du dépôt cloné.
3. **Pousser** sur la branche dédiée (via GitHub Desktop ou `git push`).
4. **Prévenir Claude** : « c'est poussé » → il prend le relais pour l'analyse et le tri.

> 🔎 Astuce pour retrouver les sites sur le disque : ouvre l'invite de commande
> et lance `dir C:\ /s /b | findstr package.json` — ça liste les dossiers de projets.
