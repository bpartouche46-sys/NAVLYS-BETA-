# 🛠️ I18N INFRA NEXT.JS — Spécification technique NAVLYS

> **Version 1.0 — 28 mai 2026** · Décision tranchée Claude (autonomie demandée par Bruno).
> Cible : projet `navlys/` (Next.js 14.2.15, App Router, TypeScript, Tailwind).
> Compatibilité backwards : la `teaser.html` gate actuelle reste intacte. L'i18n s'active sur les pages internes uniquement.

---

## ✅ DÉCISION TRANCHÉE — STACK MULTILINGUE NAVLYS

### Module i18n applicatif → **`next-intl`**
### Plateforme de gestion traductions (TMS) → **Crowdin** (gratuit pour démarrer)
### Format messages → **ICU MessageFormat** dans JSON par locale
### Stratégie routing → **`/[locale]/...`** avec middleware d'auto-détection

---

## 🆚 COMPARATIF MODULES I18N — JUSTIFICATION

| Critère | **next-intl** ⭐ | react-intl | next-i18next | lingui | i18next |
|---|---|---|---|---|---|
| Support App Router 2025 | ✅ natif | ⚠️ limité | ❌ Pages only | ✅ | ⚠️ wrappers |
| TypeScript first | ✅ types auto | ✅ | ⚠️ | ✅ | ⚠️ types ext. |
| ICU MessageFormat (pluriels, genres, dates) | ✅ | ✅ | ❌ basique | ✅ | ⚠️ via plugin |
| Bundle size par locale | **~15 KB** | 47 KB | 28 KB | 12 KB | 65 KB |
| Server Components support | ✅ excellent | ⚠️ partiel | ❌ | ⚠️ | ⚠️ |
| Communauté + maintenance 2025 | 🟢 très active | 🟡 stable | 🔴 ralentit | 🟡 active | 🟢 active |
| Coût | Gratuit MIT | Gratuit BSD | Gratuit MIT | Gratuit MIT | Gratuit MIT |
| Courbe apprentissage | Douce | Moyenne | Douce | Moyenne | Moyenne |
| **Recommandation NAVLYS** | **✅ CHOISI** | non | non | viable mais smaller eco | non |

**Justification du choix `next-intl`** :
1. **App Router 2025 = next-intl** : seule lib qui supporte nativement Server Components, Streaming, et Static Generation (SSG) en multilingue. `next-i18next` est mort pour App Router. `react-intl` nécessite des wrappers qui cassent SSG.
2. **TypeScript autocomplete des clés** : `t('navlys.tagline')` est typé strictement → impossible de référencer une clé inexistante. Énorme gain de fiabilité pour 12 langues × 5 namespaces.
3. **ICU complet** : indispensable pour pluriels russes (1 file, 2 файла, 5 файлов), genres arabes, dates locales.
4. **Bundle minimal** : 15 KB partagés + clés JSON lazy-loadées par locale.
5. **Communauté 2025** : maintenu par Jan Amann (très actif), ~6 000 stars, releases hebdo.
6. **Documentation excellente** : https://next-intl-docs.vercel.app/

---

## 🆚 COMPARATIF TMS — JUSTIFICATION

| Plateforme | Tier gratuit | Plan payant | Intégration Git | Glossaire | Mémoire trad. | Verdict NAVLYS |
|---|---|---|---|---|---|---|
| **Crowdin** ⭐ | **60 000 mots gérés** | $40/mois Pro | ✅ GitHub natif | ✅ | ✅ | **✅ DÉMARRAGE** |
| Lokalise | Trial 14 j | $120/mois Team | ✅ GitHub | ✅ très complet | ✅ | Migration si > 100 abonnés |
| POEditor | 1 000 strings | $14.99/mois | ✅ GitHub | ⚠️ basique | ⚠️ | Suffisant mais limité |
| Phrase | Trial 30 j | $27/mois Lite | ✅ | ✅ | ✅ | Enterprise overkill |
| Smartling | Demo only | $5K+/mois | ✅ | ✅ | ✅ | Surdimensionné NAVLYS |

**Justification `Crowdin`** :
1. **Gratuit jusqu'à 60 000 mots gérés** → NAVLYS V1+V2+V3 (FR+EN+RU+ES+IT, ~30 000 mots) tient confortablement.
2. **Intégration GitHub directe** : push d'un nouveau texte FR → Crowdin notifie les traducteurs automatiquement → PR auto vers `feature/i18n-translations`.
3. **Workflow pro** : assignation traducteur par langue, validation, glossaire partagé `_GLOSSAIRE_MULTILINGUE_NAVLYS.md` importable au format CSV.
4. **Mémoire de traduction** : si on traduit "Investir comporte des risques" en DE une fois, c'est suggéré pour les usages suivants automatiquement → cohérence + économie temps.
5. **Migration Lokalise** : prévue si > 100 abonnés payants (alors le ROI justifie les $120/mois).

⚠️ **Activation Crowdin = action Bruno** (création compte gratuit, connexion repo GitHub). Spec opérationnelle dans `_LANGUE_MODULE_LIVRAISON.md`.

---

## 🌐 STRATÉGIE ROUTING

### Pattern choisi : **`/[locale]/...`** (prefix obligatoire pour toutes langues)

```
navlys.com/fr/        → français
navlys.com/en/        → anglais
navlys.com/ru/        → russe
navlys.com/de/        → allemand
navlys.com/ar/        → arabe (RTL)
navlys.com/           → 301 redirect vers /fr/ ou langue détectée
```

**Pourquoi prefix obligatoire ?**
- **SEO** : chaque langue a sa propre URL canonique. Google indexe distinctement. Hreflang propre.
- **Cache** : Vercel Edge cache par URL → CDN efficace.
- **Pas d'ambiguïté** : `/methode` deviendrait quelle langue ? Le prefix tranche.
- **Compatibilité gate teaser** : `teaser.html` reste à la racine, l'i18n démarre quand le gate s'ouvre le 31 mai.

### Détection automatique de la langue
- **Première visite** : middleware lit le header `Accept-Language` du navigateur.
- **Choix utilisateur** : enregistré dans cookie `NEXT_LOCALE` (1 an, secure, sameSite=lax).
- **Priorité** : cookie > Accept-Language > fallback `en`.

### SEO multilingue (`hreflang`)
Chaque page injecte automatiquement dans `<head>` :
```html
<link rel="alternate" hreflang="fr" href="https://navlys.com/fr/methode" />
<link rel="alternate" hreflang="en" href="https://navlys.com/en/methode" />
<link rel="alternate" hreflang="ru" href="https://navlys.com/ru/methode" />
<link rel="alternate" hreflang="x-default" href="https://navlys.com/en/methode" />
```

### Sitemap multilingue
`/sitemap.xml` généré automatiquement avec une entrée par (page × locale) :
```xml
<url>
  <loc>https://navlys.com/fr/methode</loc>
  <xhtml:link rel="alternate" hreflang="fr" href="https://navlys.com/fr/methode"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://navlys.com/en/methode"/>
  ...
</url>
```

---

## 📦 STRUCTURE FICHIERS DE TRADUCTION

```
navlys/
├── messages/
│   ├── fr/
│   │   ├── common.json     # nav, footer, CTA, disclaimers G1
│   │   ├── navlys.json     # site NAVLYS (méthode, abonnement, etc.)
│   │   ├── navbio.json     # produit NAVBIO
│   │   ├── navlysio.json   # outils techniques
│   │   └── bp.json         # site brunopartouche.com
│   ├── en/
│   ├── ru/
│   ├── es/
│   ├── de/
│   ├── it/
│   ├── nl/
│   ├── pt-br/
│   ├── ar/      # RTL
│   ├── he/      # RTL
│   ├── zh/      # zh-TW à démarrage
│   └── ja/
```

**Namespaces (par locale)** :
- `common` : partagé entre les 4 sites (G1 disclaimers, nav, footer, microcopy UI)
- `navlys` : spécifique NAVLYS principal
- `navbio` : spécifique NAVBIO
- `navlysio` : spécifique NAVLYS.IO (outils)
- `bp` : spécifique brunopartouche.com

**Fallback** : si une clé manque dans `ru/navlys.json`, next-intl cherche dans `en/navlys.json` automatiquement. Configurable dans `i18n.ts`.

---

## 🎌 LANGUAGE SWITCHER — UI

Composant React `LanguageSwitcher` placé dans le nav top + footer de tous les sites.

### Drapeaux 12 langues
```
🇫🇷 Français
🇬🇧 English
🇷🇺 Русский
🇪🇸 Español
🇩🇪 Deutsch
🇮🇹 Italiano
🇳🇱 Nederlands
🇧🇷 Português (Brasil)
🇸🇦 العربية
🇮🇱 עברית
🇨🇳 中文 (繁體)
🇯🇵 日本語
```

### Comportements
- **Nav top** : dropdown compact, drapeau actif + chevron, ouvre liste verticale au clic.
- **Footer** : ligne horizontale des 12 drapeaux, hover affiche nom natif en tooltip.
- **État actif** : drapeau légèrement plus grand (1.2×) + halo couleur (Ice Blue `#7DD3FC` sur navlys.com, Or `#C9A961` sur brunopartouche.com).
- **Click** : route `router.push('/' + nouvelleLocale + chemin actuel sans ancien prefix)` + écriture cookie `NEXT_LOCALE`.

---

## ↔️ RTL (Arabe / Hébreu)

### Application automatique
Le composant `<html>` reçoit `dir="rtl"` quand `locale === 'ar' || locale === 'he'`.

### CSS — logical properties obligatoires
Au lieu de :
```css
.card { margin-left: 16px; padding-right: 24px; }  /* ❌ casse en RTL */
```
Utiliser :
```css
.card { margin-inline-start: 16px; padding-inline-end: 24px; }  /* ✅ s'inverse en RTL */
```

### Icônes directionnelles
- Flèches `→`, `←`, `chevron-right`, `chevron-left` : composant `<DirectionalIcon>` qui inverse selon `dir`.
- Logos : ne PAS inverser (NAVLYS reste lisible gauche-droite, c'est un branding).
- Vidéo : ne PAS inverser (le contenu vidéo reste tel quel).

### Tests RTL
- Playwright snapshot `/ar/methode` doit montrer texte arabe aligné à droite, icônes inversées, fond animé intact.
- Tester sur device réel avec clavier arabe (saisie input).

---

## 🌐 DEVISES ET DATES

### Helper `formatCurrency(amount, locale)`
```typescript
import { format } from '@/utils/format';
format.currency(49, 'fr-FR');      // "49,00 €"
format.currency(49, 'en-US');      // "$49.00"
format.currency(49, 'de-DE');      // "49,00 €"
format.currency(49, 'ja-JP');      // "¥49"  (pas de décimales)
format.currency(49, 'ru-RU');      // "49,00 ₽"
```

### Helper `formatDate(date, locale)`
```typescript
format.date(new Date('2026-05-28'), 'fr-FR');  // "28/05/2026"
format.date(new Date('2026-05-28'), 'en-US');  // "5/28/2026"
format.date(new Date('2026-05-28'), 'ja-JP');  // "2026/05/28"
format.date(new Date('2026-05-28'), 'ar');     // "٢٨/٠٥/٢٠٢٦"
```

Implémentation : `Intl.NumberFormat` et `Intl.DateTimeFormat` natifs (zero dépendance, supportés tous navigateurs modernes).

---

## 🧪 TESTS E2E PAR LOCALE

### Playwright config
```typescript
// playwright.config.ts
export default {
  projects: [
    { name: 'fr-desktop', use: { locale: 'fr-FR', viewport: { width: 1920, height: 1080 } } },
    { name: 'en-desktop', use: { locale: 'en-US', viewport: { width: 1920, height: 1080 } } },
    { name: 'ru-desktop', use: { locale: 'ru-RU', viewport: { width: 1920, height: 1080 } } },
    { name: 'ar-desktop', use: { locale: 'ar', viewport: { width: 1920, height: 1080 } } },
    { name: 'fr-mobile', use: { locale: 'fr-FR', viewport: { width: 390, height: 844 } } },
    // ... 12 locales × 2 viewports = 24 projets
  ]
};
```

### Tests minimaux par locale
1. Page d'accueil charge sans erreur 500
2. Tagline est traduite (pas de clé brute `navlys.tagline`)
3. Disclaimers G1 sont présents et visibles
4. Language switcher affiche drapeau actif
5. Devise affichée correspond au format de la locale
6. Pour AR/HE : `dir="rtl"` sur `<html>`, texte aligné à droite

---

## 🔧 CONFIGURATION PROJET

### Patch `package.json`
Ajouter dépendances :
```json
"dependencies": {
  "next-intl": "^3.20.0",
  ...existing
}
```

### Patch `next.config.js`
Wrapper `withNextIntl` autour de la config existante. Le code complet est dans `_LANGUE_MODULE_LIVRAISON.md`.

### Nouveau fichier `i18n.ts` (racine projet)
Configuration locales + namespaces. Code complet livré.

### Nouveau fichier `middleware.ts` (racine projet)
Détection automatique locale + redirection. Code complet livré.

---

## 📋 CHECKLIST D'ACTIVATION (résumé)

1. ✅ Comparer 5 modules → décision `next-intl`
2. ✅ Comparer 5 TMS → décision `Crowdin`
3. ✅ Documenter routing `/[locale]/...`
4. ✅ Spécifier structure `messages/<locale>/<namespace>.json`
5. ✅ Spécifier composant `LanguageSwitcher` (12 drapeaux)
6. ✅ Spécifier gestion RTL (AR/HE)
7. ✅ Spécifier helpers Intl
8. ✅ Spécifier tests Playwright par locale
9. ⏳ Livrer le code (voir `_LANGUE_MODULE_LIVRAISON.md`)
10. ⏳ Activation Crowdin → action Bruno (création compte gratuit)

---

## 🚦 LIMITATIONS / DETTE TECHNIQUE

- **Crowdin gratuit** : limité à 60 000 mots. À ce volume, migration Lokalise nécessaire.
- **Fonts** : Cinzel et Cormorant Garamond ne supportent pas tous les scripts (pas de cyrillique étendu, pas d'arabe, pas de CJK). Pour AR/HE/ZH/JA, fallback vers : `Noto Sans Arabic`, `Noto Sans Hebrew`, `Noto Sans SC/TC`, `Noto Sans JP` (Google Fonts gratuits, charge automatique selon locale).
- **`teaser.html` actuel** : reste en HTML statique gate, sera migré en composant React multilingue **après** le 31 mai (post-lancement). D'ici là, ajouter seulement une bannière "Available soon in 12 languages" sur le teaser.

---

**Fin du spec v1.0 — Bruno Partouche & Claude QG · _NAVLYS_DISPATCH compatible**
