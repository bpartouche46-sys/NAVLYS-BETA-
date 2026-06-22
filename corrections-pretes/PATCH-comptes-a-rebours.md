# PATCH — comptes à rebours périmés (autres sites)

> Vérifié en live le 2026-06-22. Date d'ouverture de référence :
> **1ᵉʳ juillet 2026, 00:00 (heure de Paris)**.
> ⚠️ À appliquer **à la source** (ancien PC) puis redéployer, **après feu vert prod**.
> Rien n'est déployé. Changements minimes et déterministes (pas de reproduction de fichier).

---

## Récap de l'audit live (2026-06-22)

| Site | Compteur | Autre |
|------|----------|-------|
| navlys-teaser.vercel.app | 🔴 périmé (`2026-06-15`) | Ice Blue **ancien `#5fe0ff`** (à aligner sur `#7DD3FC`) |
| brunopartouche.com (home) | 🔴 périmé (« 1ᵉʳ juin 2026 ») | Ice Blue OK, conformité OK |
| navlys.io | 🟢 pas de compteur dur | mentions « BETA juin S2 » (soft, optionnel) |
| brunopartouche-teaser.vercel.app | ⚪ 404 (non-live) | — |

---

## P-01 · navlys-teaser.vercel.app — recaler le compte à rebours

Dans le `<script>` en bas de page :

- **Avant** : `var LAUNCH=new Date('2026-06-15T00:00:00').getTime();`
- **Après** : `var LAUNCH=new Date('2026-07-01T00:00:00').getTime();`

> Heure locale du visiteur (FR ≈ Paris), cohérent avec le style existant du fichier.

### P-01b (optionnel, cohérence charte) — Ice Blue
Aligner la couleur d'accent sur la valeur de référence `#7DD3FC` (= `rgb(125,211,252)`) :
- remplacer `--ice:#5fe0ff` → `--ice:#7DD3FC`
- remplacer toutes les occurrences `rgba(95,224,255, …)` → `rgba(125,211,252, …)`
- (laisser `--ice2:#7af0ff` et `#5fe0ff` éventuels dans les dégradés `.orch`/`.cta` au choix —
  ce sont des reflets clairs ; non bloquant)

---

## P-02 · brunopartouche.com (home) — recaler la date d'ouverture

Trois endroits (visibles + compteur) :

1. **CTA héro** — `<a href="#lancement" class="btn-big primary">✨ Lancement 1ᵉʳ juin</a>`
   → `✨ Lancement 1ᵉʳ juillet`
2. **Carte lancement** — `<h3>navlys.com<br><em>1ᵉʳ juin 2026</em></h3>`
   → `<h3>navlys.com<br><em>1ᵉʳ juillet 2026</em></h3>`
3. **Compteur (script en bas de page)** : la date cible du compte à rebours (actuellement
   réglée sur le 1ᵉʳ juin 2026) doit être fixée au **1ᵉʳ juillet 2026 00:00 (Paris)**.
   Dans le `<script>` final, repérer la date de lancement (valeur `2026-06-…` / « juin »)
   et la remplacer par `2026-07-01T00:00:00` (ou `2026-06-30T22:00:00Z` en UTC, équivalent).

> ℹ️ Le `<script>` final de cette page dépasse la taille récupérable par l'outil de fetch :
> le patch ci-dessus se fait directement sur le fichier source (ancien PC).

---

## P-03 · navlys.io — soft (optionnel)
Pas de compte à rebours daté. Mentions « BETA JUIN S2 » / « EN ÉTUDE · JUIN-JUILLET »
à rafraîchir si l'on veut, mais **non urgent** et non bloquant.

---

## P-04 · navbiolife.com — `launch-offer.js` (conformité + date) 🔴

Fichier `launch-offer.js` (chargé par la home navbiolife). Deux problèmes :

1. **« Jérusalem » servi au public** (cf. ERR-003 / ERR-005) :
   - **Avant** (commentaire) : `var T0=Date.parse('2026-05-31T21:00:00Z'); // 1er juin 00:00 Asia/Jerusalem (UTC+3)`
   - **Avant** (1ère ligne, commentaire) : `/* … du 1er juin (minuit Asia/Jerusalem) au 1er juillet */`
   - **Avant** (texte affiché état *before*) : `'1ᵉʳ juin 2026 · minuit, heure de Jérusalem'`
2. **Escalator ancré au 1ᵉʳ juin** (périmé).

**Après** (réancrer sur le 1ᵉʳ juillet 2026 00:00 Paris + retirer toute mention « Jérusalem ») :
- `var T0=Date.parse('2026-06-30T22:00:00Z'); // 1ᵉʳ juillet 2026, 00:00 (heure de Paris)`
- commentaire d'en-tête : `/* … du 1ᵉʳ juillet au 31 juillet */` (sans « Jerusalem »)
- texte affiché : `'1ᵉʳ juillet 2026 · minuit, heure de Paris'`
- ⚠️ Vérifier la cohérence du libellé « Au 1ᵉʳ juillet : tarif plein » → si l'offre dure
  30 j à partir du 1ᵉʳ juillet, ajuster en « Au 31 juillet : tarif plein ».

> Le fichier brut est sauvegardé dans `sauvegarde-sites/_assets-moteur/launch-offer.js`.

---

## Après application (rappel checklist)
- Diff contre la prod (seuls ces points doivent changer).
- Vérifier le compteur en prod (qu'il décompte bien vers le 1ᵉʳ juillet).
- Mettre à jour `docs/ETAT-DES-LIEUX.md`.
