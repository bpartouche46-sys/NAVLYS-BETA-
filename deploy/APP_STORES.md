# 📱 NAVLYS dans les 3 stores — Google Play · Samsung Galaxy · Apple App Store

> NAVLYS est une **PWA** (navlys.com). On ne réécrit pas l'app : on **emballe le site**
> dans un conteneur natif signé, publié dans chaque store. Un seul site, trois vitrines.
> Chaque mise en ligne sur `main` met à jour l'app **sans re-soumettre** (le conteneur
> pointe vers navlys.com).

---

## ✅ Ce qui est DÉJÀ fait (en ligne, côté technique)

- **Icônes store-grade en PNG** (le SVG était refusé par les stores) :
  `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `icon-1024.png`
  (**RGB sans alpha** = exigence Apple), `apple-touch-icon-180.png`.
- **`manifest.webmanifest`** complet : nom, description, `id`, `scope`, `display standalone`,
  couleurs de marque, icônes PNG + maskable, raccourcis (Voix, Cinéma, Ambassadeur).
- **`/.well-known/assetlinks.json`** en place (vérification de domaine Android — il ne
  manque que l'empreinte de la clé de signature, voir plus bas).
- **`deploy/twa-manifest.json`** : la config d'emballage prête pour Bubblewrap / PWABuilder.

## 🔑 Ce qui te revient (comptes + argent + signature — je ne peux pas le faire à ta place)

| Store | Compte développeur | Coût | Particularité |
|---|---|---|---|
| **Google Play** | Google Play Console | **25 $ une fois** | Compte société : vérification d'identité (quelques jours). |
| **Samsung Galaxy** | Samsung Seller Portal | **gratuit** | Accepte le **même build Android** que Play. |
| **Apple App Store** | Apple Developer Program | **99 $/an** | Société : **numéro D-U-N-S** requis (gratuit, ~1-2 semaines à obtenir). Build **sur Mac** (ou service cloud). |

> Ce sont les seules vraies portes : identité + paiement + clé de signature. Doctrine
> Bible §6 : avant tout débit, je te fais un signalement d'UNE ligne, puis on avance.

---

## 🟢 GOOGLE PLAY + 🔵 SAMSUNG (même build Android — le plus simple, commence par là)

Le plus rapide : **PWABuilder** (aucun outil à installer).

1. Va sur **https://www.pwabuilder.com** → entre `https://navlys.com` → **Start**.
   (Le score doit être bon : manifest + service worker + icônes sont déjà prêts.)
2. **Package For Stores → Android → Generate**. Tu obtiens un `.zip` avec :
   - `app-release-signed.aab` (à envoyer aux stores),
   - `signing-key-info.txt` (contient l'**empreinte SHA-256** — c'est **public**, pas un secret),
   - la clé `.keystore` (**à garder précieusement, JAMAIS dans Git** — c'est elle qui prouve que l'app est bien la tienne pour toujours).
3. **Envoie-moi l'empreinte SHA-256** : je la colle dans `/.well-known/assetlinks.json`
   et je publie → la barre d'URL disparaît dans l'app (vraie app plein écran).
4. **Google Play** : Play Console → Créer l'app → verser l'`.aab` → remplir la fiche
   (description, captures, icône 512, catégorie) → soumettre. Revue : quelques heures à 3 jours.
5. **Samsung Galaxy** : Seller Portal → Add New App (Android) → verser **le même `.aab`** →
   fiche → soumettre.

> Alternative en ligne de commande (si tu préfères) : `npx @bubblewrap/cli init --manifest
> https://navlys.com/manifest.webmanifest` puis `bubblewrap build`. La config
> `deploy/twa-manifest.json` est déjà aux bonnes valeurs.

## 🍎 APPLE APP STORE

Apple demande un build signé **sur macOS**. Deux chemins :

- **Simple** : PWABuilder → **Package For Stores → iOS → Generate** → tu obtiens un projet
  Xcode. Ouvre-le sur un Mac, connecte ton compte Apple Developer, **Archive → Distribute →
  App Store Connect**.
- **Sans Mac** : passer par un service de build cloud (ex. Codemagic/MacinCloud) avec le
  même projet PWABuilder.

**Attention règle Apple 4.2 (« minimum functionality »)** : Apple refuse les simples
« sites emballés ». NAVLYS passe car il a de **vraies fonctions natives** : voix (micro),
hors-ligne (service worker), notifications, installation. À mettre en avant dans la fiche
et la note de revue : « app vocale, fonctionne hors-ligne, notifications ».

Fiche App Store : icône **1024×1024** (`icon-1024.png`, déjà sans alpha), captures iPhone,
politique de confidentialité (→ `navlys.com/confidentialite`), catégorie, description.

---

## 🧾 Fiches store — textes prêts (à coller)

- **Nom** : NAVLYS
- **Sous-titre** : Ton univers, à la voix.
- **Description courte** : Humain + IA, tout au téléphone et à la voix. À essayer gratuitement.
- **Catégories** : Finance / Style de vie / Productivité.
- **Confidentialité** : https://navlys.com/confidentialite · **Conditions** : https://navlys.com/conditions
- **Support** : https://navlys.com/assistance

## 🔒 Sécurité (gravé)

- La **clé de signature** (`.keystore` Android, certificats Apple) ne va **JAMAIS** dans Git.
  C'est ton identité d'éditeur, à sauvegarder hors-ligne. Perdue = impossible de mettre à jour l'app.
- L'**empreinte SHA-256** du certificat, elle, est **publique** (c'est fait pour être publié
  dans `assetlinks.json`). Tu peux me la donner en clair.

## ▶️ Prochain geste (le plus court chemin)

1. Ouvre **pwabuilder.com**, entre `navlys.com`, génère le **paquet Android**.
2. Colle-moi l'**empreinte SHA-256** → je finalise `assetlinks.json` en ligne.
3. En parallèle : crée le **compte Google Play** (25 $) — c'est la première vitrine à ouvrir.

Le reste (Samsung = même fichier, Apple = compte + Mac) suit derrière, sans rien recoder.
