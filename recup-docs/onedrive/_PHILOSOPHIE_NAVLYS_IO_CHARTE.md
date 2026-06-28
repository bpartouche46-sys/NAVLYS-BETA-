# ⚓ PHILOSOPHIE NAVLYS.IO — CHARTE MAÎTRESSE
_Document de référence — généralisation à tous les sites et apps de l'écosystème NAVLYS_
_Version 1.0 — 29 mai 2026_

> « navlys.io est génial avec les encadrés annonces à venir ou en construction et l'accès déjà à tout ce qui est validé... c'est la même philosophie pour tous les sites et applications à garder. » — Bruno, 29 mai 2026

---

## 1. PRINCIPE FONDATEUR — Honnêteté radicale + transparence + invitation

Le visiteur d'un site NAVLYS doit voir **en un coup d'œil, sans scroll** :
- 🟢 **Ce qui marche déjà** — accès immédiat, cliquable, signal vif.
- 🟡 **Ce qu'on construit en ce moment** — visible mais grisé, date prévue affichée.
- 🔵 **Ce qu'on prépare pour plus tard** — teaser, date estimée, halo Ice Blue pulsé.

C'est la **différence fondamentale** avec un site « bientôt » classique : ici, l'utilisateur voit la **croissance du système en temps réel**. Il devient témoin du chantier, pas spectateur d'une promesse.

Esprit maritime : *« Le port n'est pas la destination. Le port vivant montre les bateaux à quai, ceux en construction au chantier, et ceux annoncés sur le tableau d'affichage. »*

---

## 2. LES TROIS ÉTATS OFFICIELS

### 🟢 ÉTAT 1 — VIVANT / VALIDÉ
- **Sens** : Fonctionnalité accessible, testée, déployée.
- **Code couleur** : Or vif `#C9A961` (sites NAVLYS) ou Ice Blue `#7DD3FC` (apps) ou Or Crépuscule `#D49B5B` (Bruno Partouche).
- **Halo** : `glow-breath-gold` ou `glow-breath-ice` (5s/cycle, scale 1.015).
- **Badge** : « ⚓ ACCÈS LIBRE » ou « ✓ EN LIGNE ».
- **Comportement** : Clic = redirection directe vers la page/fonctionnalité.
- **Bordure** : `1.5px solid rgba(201,169,97,0.55)`.

### 🟡 ÉTAT 2 — EN CONSTRUCTION
- **Sens** : Travaux en cours, date de livraison prévue, démo possible.
- **Code couleur** : Bronze sourd `#7d5223` + Sage atténué.
- **Halo** : `glow-breath-bronze` faible (5.5s/cycle, opacité divisée par 2).
- **Badge** : « 🏗 EN CONSTRUCTION · LIVRAISON [DATE] ».
- **Comportement** : Clic = page de présentation + bouton « Être prévenu ».
- **Filtre visuel** : `filter: saturate(0.65) brightness(0.85)`.
- **Bordure** : `1px dashed rgba(184,115,51,0.4)`.

### 🔵 ÉTAT 3 — À VENIR / TEASER
- **Sens** : Idée validée, planning estimé, en réflexion détaillée.
- **Code couleur** : Ice Blue pulsé `#7DD3FC`.
- **Halo** : `glow-breath-ice` lent et subtil (7s/cycle, opacité 0.3).
- **Badge** : « ✨ À VENIR · [MOIS ANNÉE ESTIMÉE] ».
- **Comportement** : Clic = page d'attente avec countdown + formulaire d'intérêt.
- **Bordure** : `1px solid rgba(125,211,252,0.3)`.

---

## 3. COMPOSANT RÉUTILISABLE — `<NavlysCard>`

### 3.1 Version Web Component / HTML statique

```html
<div class="navlys-card" data-status="alive">
  <div class="navlys-card__badge">⚓ ACCÈS LIBRE</div>
  <div class="navlys-card__emoji">🧭</div>
  <h3 class="navlys-card__title">Mon Cap Rêvé</h3>
  <p class="navlys-card__desc">Définis ton cap financier en 5 minutes</p>
  <a href="/cap-reve" class="navlys-card__cta">Entrer →</a>
</div>

<div class="navlys-card" data-status="building" data-date="2026-06-02">
  <div class="navlys-card__badge">🏗 EN CONSTRUCTION · 2 JUIN 2026</div>
  <div class="navlys-card__emoji">🤖</div>
  <h3 class="navlys-card__title">NAV IA Chat</h3>
  <p class="navlys-card__desc">Assistant conversationnel personnalisé</p>
  <a href="/nav-ia/preview" class="navlys-card__cta">Découvrir →</a>
</div>

<div class="navlys-card" data-status="coming" data-date="2026-07-15">
  <div class="navlys-card__badge">✨ À VENIR · JUILLET 2026</div>
  <div class="navlys-card__emoji">📈</div>
  <h3 class="navlys-card__title">Trading Live</h3>
  <p class="navlys-card__desc">Exécution réelle via broker partenaire</p>
  <a href="/trading-live/teaser" class="navlys-card__cta">Être prévenu →</a>
</div>
```

### 3.2 CSS (à coller dans la feuille globale)

```css
.navlys-card{
  position:relative;
  padding:28px 24px 24px;
  background:rgba(2,4,10,0.65);
  backdrop-filter:blur(8px);
  border-radius:14px;
  transition:all .4s ease;
  text-decoration:none;
  color:var(--perle,#e7eef2);
  display:flex;flex-direction:column;gap:10px;
  min-height:200px;
}
.navlys-card__badge{
  font-family:'Cinzel',serif;
  font-size:10px;letter-spacing:.22em;text-transform:uppercase;
  padding:5px 10px;border-radius:12px;align-self:flex-start;
}
.navlys-card__emoji{font-size:34px;line-height:1}
.navlys-card__title{
  font-family:'Cormorant Garamond',serif;font-weight:500;
  font-size:22px;color:var(--perle,#e7eef2);margin:0
}
.navlys-card__desc{
  font-family:'Cormorant Garamond',serif;font-style:italic;
  color:rgba(231,238,242,0.75);font-size:15.5px;line-height:1.5;margin:0;flex:1
}
.navlys-card__cta{
  font-family:'Cinzel',serif;font-size:12px;letter-spacing:.18em;
  text-transform:uppercase;align-self:flex-start;text-decoration:none;
  padding-top:6px;border-top:1px dashed rgba(255,255,255,0.08);
}

/* 🟢 VIVANT */
.navlys-card[data-status="alive"]{
  border:1.5px solid rgba(201,169,97,0.55);
  box-shadow:0 0 20px rgba(201,169,97,0.18);
  animation:nc-breathe-gold 5s ease-in-out infinite;
}
.navlys-card[data-status="alive"] .navlys-card__badge{
  background:linear-gradient(135deg,#C9A961,#D49B5B);
  color:#02040a;
}
.navlys-card[data-status="alive"] .navlys-card__cta{color:#C9A961}
.navlys-card[data-status="alive"]:hover{
  transform:translateY(-4px);
  box-shadow:0 14px 40px rgba(201,169,97,0.35);
  border-color:rgba(201,169,97,0.85);
}

/* 🟡 EN CONSTRUCTION */
.navlys-card[data-status="building"]{
  border:1px dashed rgba(184,115,51,0.45);
  background:rgba(8,11,16,0.7);
  filter:saturate(0.7) brightness(0.88);
  animation:nc-breathe-bronze 5.5s ease-in-out infinite;
}
.navlys-card[data-status="building"] .navlys-card__badge{
  background:rgba(184,115,51,0.18);
  color:#D49B5B;border:1px solid rgba(184,115,51,0.35);
}
.navlys-card[data-status="building"] .navlys-card__cta{color:#7d5223}
.navlys-card[data-status="building"]:hover{
  filter:saturate(1) brightness(1);
  border-color:rgba(184,115,51,0.7);
}

/* 🔵 À VENIR */
.navlys-card[data-status="coming"]{
  border:1px solid rgba(125,211,252,0.3);
  background:rgba(2,4,10,0.55);
  animation:nc-breathe-ice 7s ease-in-out infinite;
}
.navlys-card[data-status="coming"] .navlys-card__badge{
  background:rgba(125,211,252,0.12);
  color:#a8e3ff;border:1px solid rgba(125,211,252,0.35);
}
.navlys-card[data-status="coming"] .navlys-card__cta{color:#7DD3FC}
.navlys-card[data-status="coming"]:hover{
  transform:translateY(-3px);
  border-color:rgba(125,211,252,0.65);
  box-shadow:0 12px 30px rgba(125,211,252,0.22);
}

@keyframes nc-breathe-gold{
  0%,100%{box-shadow:0 0 18px rgba(201,169,97,.18)}
  50%    {box-shadow:0 0 30px rgba(201,169,97,.38)}
}
@keyframes nc-breathe-bronze{
  0%,100%{box-shadow:0 0 12px rgba(184,115,51,.10)}
  50%    {box-shadow:0 0 22px rgba(184,115,51,.22)}
}
@keyframes nc-breathe-ice{
  0%,100%{box-shadow:0 0 14px rgba(125,211,252,.10)}
  50%    {box-shadow:0 0 28px rgba(125,211,252,.30)}
}

@media (prefers-reduced-motion: reduce){
  .navlys-card{animation:none !important}
}
```

### 3.3 Version React/TSX (pour les apps Next.js)

```tsx
// components/shared/NavlysCard.tsx
type Status = 'alive' | 'building' | 'coming';

export interface NavlysCardProps {
  status: Status;
  title: string;
  description: string;
  emoji?: string;
  href: string;
  estimatedDate?: string; // ex "2 juin 2026" / "juillet 2026"
  ctaLabel?: string;
}

const BADGE: Record<Status, (d?: string) => string> = {
  alive:    () => '⚓ ACCÈS LIBRE',
  building: (d) => `🏗 EN CONSTRUCTION${d ? ' · ' + d.toUpperCase() : ''}`,
  coming:   (d) => `✨ À VENIR${d ? ' · ' + d.toUpperCase() : ''}`,
};

const DEFAULT_CTA: Record<Status, string> = {
  alive: 'Entrer →',
  building: 'Découvrir →',
  coming: 'Être prévenu →',
};

export default function NavlysCard({
  status, title, description, emoji = '⚓',
  href, estimatedDate, ctaLabel
}: NavlysCardProps) {
  return (
    <a href={href} className="navlys-card" data-status={status}>
      <div className="navlys-card__badge">{BADGE[status](estimatedDate)}</div>
      <div className="navlys-card__emoji" aria-hidden="true">{emoji}</div>
      <h3 className="navlys-card__title">{title}</h3>
      <p className="navlys-card__desc">{description}</p>
      <span className="navlys-card__cta">{ctaLabel ?? DEFAULT_CTA[status]}</span>
    </a>
  );
}
```

---

## 4. RÈGLE OBLIGATOIRE D'AFFICHAGE

> **Sur chaque page principale**, au minimum **une carte de chaque état** doit être visible.

Si une section n'a que des fonctionnalités vivantes, ajouter délibérément une carte « 🏗 EN CONSTRUCTION » ou « ✨ À VENIR » pour entretenir le sentiment d'écosystème en mouvement. C'est non négociable.

---

## 5. CONFIG CENTRALISÉE DES DATES

Toutes les dates de livraison estimées sont stockées dans un fichier unique :

```js
// _SITES_MASTER/_NAVLYS_ROADMAP_DATES.js
export const ROADMAP = {
  'nav-ia-chat':        { date: '2026-06-02', status: 'building' },
  'strategies-actives': { date: '2026-06-15', status: 'building' },
  'cinema-video-bio':   { date: '2026-06-20', status: 'building' },
  'studio-ia':          { date: '2026-06-25', status: 'building' },
  'transmission-heritiers': { date: '2026-07-05', status: 'building' },
  'podcast-bruno':      { date: '2026-07-10', status: 'coming' },
  'trading-live':       { date: '2026-07-15', status: 'coming' },
  'pipeline-generation-auto': { date: '2026-07-20', status: 'coming' },
  'videos-youtube':     { date: '2026-08-01', status: 'coming' },
  'livre-papier':       { date: '2026-09-15', status: 'coming' },
};
```

Toute mise à jour d'un état (alive ↔ building ↔ coming) se fait UNIQUEMENT dans ce fichier, **jamais** dans les pages elles-mêmes. Les pages lisent la config.

---

## 6. CHARTE COULEUR PAR SITE (rappel)

| Site | État alive | État building | État coming |
|---|---|---|---|
| navlys.com, navlys.io, navbiolife | Or `#C9A961` | Bronze sourd `#7d5223` | Ice Blue `#7DD3FC` |
| brunopartouche.com, bp-mobile-zen | Or Crépuscule `#D49B5B` | Bronze rouille `#8b3a1e` | Ice Blue tamisé `#5fa8c9` |
| apps Next.js (intra) | Ice Blue `#7DD3FC` | Bronze sourd `#7d5223` | Or pâle `#f3e4c4` (clignote subtilement) |

---

## 7. ACCESSIBILITÉ — NON NÉGOCIABLE

- `prefers-reduced-motion: reduce` → toutes les animations off, halo statique conservé.
- Contraste WCAG AA minimum : texte sur fond `> 4.5:1` (testé pour chaque combinaison).
- Badge lisible sans la couleur (icône emoji + texte distinctif).
- Focus visible : outline `2px solid var(--ice)` sur `:focus-visible`.
- Aria : `aria-label` sur la carte indique l'état (« Fonctionnalité disponible » / « en construction » / « à venir »).

---

## 8. INTÉGRATION SITE PAR SITE

Voir document compagnon : **`_PHILOSOPHIE_NAVLYS_IO_CATALOGUE_INITIAL.md`** pour le catalogue des cartes à afficher sur chaque site, avec leur état actuel et leur date estimée.

---

## 9. ÉVOLUTION

Cette charte est vivante. Toute modification se fait dans ce fichier, jamais en pages isolées. Les sites lisent les conventions, les apps importent le composant. **Une seule source de vérité.**

⚓ Bon vent.
