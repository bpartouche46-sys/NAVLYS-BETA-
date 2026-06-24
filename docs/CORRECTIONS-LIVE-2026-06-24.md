# Corrections sites LIVE — relevé du 2026-06-24

> ⚠️ **Ces correctifs concernent les sites LIVE déployés sur Vercel**, dont le code
> **n'est PAS dans ce dépôt** (rappel ERR-006). Les appliquer demande la **source réelle
> du projet Vercel** (voir « Comment déployer » en bas) + le **feu vert de Bruno**
> (règle financière / action publique). Ce fichier = la spécification exacte, prête à appliquer.
>
> Source des constats : HTML live récupéré via le connecteur Vercel le 2026-06-24.

---

## 🔴 1. navbiolife.com — « Jérusalem » en clair + date périmée (PRIORITÉ : ligne rouge)

**Pourquoi c'est grave** : terme géographique interdit visible publiquement (meta + code),
et compteur ciblant le 31 mai → déjà expiré (on est le 24 juin).

### a) Balise meta description (`<head>`)
- **AVANT** : `<meta name="description" content="NAVBIO · biographie vivante. Découverte officielle le 1ᵉʳ juin 2026 minuit Jérusalem.">`
- **APRÈS** : `<meta name="description" content="NAVBIO · biographie vivante. Découverte officielle le 1ᵉʳ juillet 2026 à minuit.">`

### b) Titre de la carte de lancement
- **AVANT** : `<h2 title="...">Ouverture <em>1ᵉʳ juin 2026</em></h2>`
- **APRÈS** : `<h2 title="...">Ouverture <em>1ᵉʳ juillet 2026</em></h2>`

### c) Cible du compteur (JavaScript) — retire « Jérusalem » + vise le 1ᵉʳ juillet
- **AVANT** : `const TARGET = Date.parse('2026-05-31T21:00:00Z'); // 1 juin 00:00 Jérusalem`
- **APRÈS** : `const TARGET = Date.parse('2026-06-30T22:00:00Z'); // 1er juillet 2026, 00:00 Paris (CEST = UTC+2)`

### d) Texte de l'offre
- **AVANT** : `Pendant 30 jours après le 1ᵉʳ juin, escalator dégressif...`
- **APRÈS** : `Pendant 30 jours après le 1ᵉʳ juillet, escalator dégressif...`

---

## 🔴 2. brunopartouche.com — date de lancement périmée

> Le texte est dans le HTML capturé ; la **cible exacte du compteur** est dans un script
> non capté → à vérifier dans la source réelle (chercher `cd-d` / `Date.parse` / `TARGET`).

### a) Bouton CTA du hero
- **AVANT** : `<a href="#lancement" class="btn-big primary">✨ Lancement 1ᵉʳ juin</a>`
- **APRÈS** : `<a href="#lancement" class="btn-big primary">✨ Lancement 1ᵉʳ juillet</a>`

### b) Carte « live »
- **AVANT** : `<h3>navlys.com<br><em>1ᵉʳ juin 2026</em></h3>`
- **APRÈS** : `<h3>navlys.com<br><em>1ᵉʳ juillet 2026</em></h3>`

### c) Compteur (à confirmer sur source réelle)
- Aligner la constante cible sur `2026-06-30T22:00:00Z` (1ᵉʳ juillet 2026, 00:00 Paris).

---

## 🟠 3. navlys.com + navlys.com/finance — couleur hors charte

La charte = **Ice Blue `#7DD3FC`**. Ces deux pages utilisent l'ancien `#5fe0ff`.
(Les autres sites live — brunopartouche, navlys.io, navbio — sont déjà corrects.)

### a) Variable CSS (présente dans les 2 fichiers)
- **AVANT** : `--ice:#5fe0ff;`
- **APRÈS** : `--ice:#7DD3FC;`

### b) Littéraux `rgba(95,224,255, …)` résiduels
- Remplacer toutes les occurrences `rgba(95,224,255,` par `rgba(125,211,252,`
  (c'est l'équivalent RGB de `#7DD3FC`) pour les halos/ombres qui n'utilisent pas la variable.

---

## Comment déployer ces correctifs (déblocage nécessaire)

Le dépôt GitHub ne pilote pas Vercel. Pour rendre ces corrections déployables, **une** de ces voies :

1. **Recommandé — versionner les sites** : importer la source réelle des projets Vercel
   dans ce dépôt et **relier le projet Vercel à GitHub** (push → déploiement auto).
   Résout aussi l'objectif Phase 0 « code sous Git » et la confusion ERR-006.
2. **`vercel pull`** : récupérer la source depuis le poste/projet Vercel, l'ajouter au dépôt,
   appliquer ces patchs, redéployer.
3. **Dépannage immédiat** : Bruno édite directement dans l'interface/source Vercel à partir
   de cette spec (surtout le point 🔴 1 « Jérusalem », urgent).

> Aucune de ces voies n'est déclenchée sans le **feu vert explicite de Bruno** (déploiement = action publique).
