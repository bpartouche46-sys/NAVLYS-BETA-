# 🪶 ADAGES DU JOUR — Bruno Mark Partouche
*Trois piliers de pensée à faire tourner sur les 4 sites NAVLYS, signés BM, en alternance quotidienne.*

---

## ✨ ADAGE 1 — LA CIBLE QUOTIDIENNE
*(Source originale : "Life and love are the DAILY target")*

**FR — versions courtes percutantes**
1. **Vie et amour. La cible du jour.**
2. **Vivre. Aimer. Chaque jour.**
3. **La vie. L'amour. Voilà ma cible.**
4. **Aimer. Vivre. Recommencer.**

**EN — versions courtes percutantes**
1. **Life and love. The daily target.**
2. **Live. Love. Every day.**
3. **Life. Love. That's my target.**
4. **Love. Live. Begin again.**

**🎯 Version officielle retenue** (la plus radicale, charte condensée) :
> **« Vie et amour. La cible du jour. »** — BM
> **« Life and love. The daily target. »** — BM

---

## 🐎 ADAGE 2 — LE TEMPS
*(Source originale : "Time is the horse to drive forget and accept")*

**FR — versions courtes percutantes**
1. **Le temps est ton cheval. Mène-le.**
2. **Mène ton temps. Oublie. Accepte.**
3. **Le temps galope. Tiens les rênes.**
4. **Ton temps t'attend. Saisis-le.**

**EN — versions courtes percutantes**
1. **Time is your horse. Ride it.**
2. **Ride your time. Forget. Accept.**
3. **Time gallops. Hold the reins.**
4. **Your time awaits. Seize it.**

**🎯 Version officielle retenue** :
> **« Le temps est ton cheval. Mène-le. »** — BM
> **« Time is your horse. Ride it. »** — BM

---

## 🪞 ADAGE 3 — L'EGO
*(Source originale : "Ego is the artifice enemy you are the only one capable to erase and replace by harmony and pleasure in life")*

**FR — versions courtes percutantes**
1. **L'ego est l'artifice. Efface-le.**
2. **Ton seul ennemi : ton ego. Remplace-le par l'harmonie.**
3. **L'ego ment. L'harmonie reste.**
4. **Efface l'ego. Choisis le plaisir.**

**EN — versions courtes percutantes**
1. **Ego is the artifice. Erase it.**
2. **Your only enemy: your ego. Replace it with harmony.**
3. **Ego lies. Harmony stays.**
4. **Erase the ego. Choose pleasure.**

**🎯 Version officielle retenue** :
> **« L'ego est l'artifice. Efface-le. Choisis l'harmonie. »** — BM
> **« Ego is the artifice. Erase it. Choose harmony. »** — BM

---

## 🕊 ADAGE 4 — LA CULPABILITÉ
*(Source originale : "and the feeling of guilt is the first and only huge enemy you must destroy to be in real peace in mind. no matter what person what action what reason... no one have the right to make you feel guilty. even your closest and most loved by you")*

**FR — versions courtes percutantes**
1. **Aucun être n'a le droit de te culpabiliser. Pas même les tiens.**
2. **Refuse la culpabilité. Garde la paix.**
3. **La culpabilité est ton seul vrai ennemi. Détruis-la.**
4. **Personne ne mérite ta culpabilité. Personne.**
5. **La culpabilité ment. La paix reste.**

**EN — versions courtes percutantes**
1. **No one has the right to make you guilty. Not even those you love.**
2. **Refuse the guilt. Keep the peace.**
3. **Guilt is your only true enemy. Destroy it.**
4. **No one deserves your guilt. No one.**
5. **Guilt lies. Peace stays.**

**🎯 Version officielle retenue** :
> **« Aucun être n'a le droit de te culpabiliser. Pas même les tiens. »** — BM
> **« No one has the right to make you guilty. Not even those you love. »** — BM

---

# 🎡 SYSTÈME DE ROTATION SUR LES 4 SITES

## Principe
- 4 adages × 4 sites = chaque site affiche un adage différent chaque jour
- Rotation déterministe basée sur le jour de l'année (% 4) pour cohérence
- Affichage en bandeau permanent + page dédiée /adages
- Avec 4 adages et 4 sites, sur un cycle de 4 jours, chaque adage tourne sur chaque site

## Calendrier d'alternance (cycle 4 jours puis répétition)

| Jour | navlys.com | navbiolife.com | navlys.io | brunopartouche.com |
|---|---|---|---|---|
| 1 | Adage 1 (Vie/Amour) | Adage 2 (Temps) | Adage 3 (Ego) | Adage 4 (Culpabilité) |
| 2 | Adage 2 (Temps) | Adage 3 (Ego) | Adage 4 (Culpabilité) | Adage 1 (Vie/Amour) |
| 3 | Adage 3 (Ego) | Adage 4 (Culpabilité) | Adage 1 (Vie/Amour) | Adage 2 (Temps) |
| 4 | Adage 4 (Culpabilité) | Adage 1 (Vie/Amour) | Adage 2 (Temps) | Adage 3 (Ego) |
| 5 | (cycle reprend Jour 1) | | | |

Chaque jour, **chaque visiteur voit un adage différent par site** — et chaque site tourne sur les 4 adages tous les 4 jours.

## Position d'affichage recommandée
- **Bandeau permanent** (fixed top under nav, ou pied de page sticky)
- **Page dédiée** `/adages` qui les affiche tous les 3 avec leur histoire
- Police : **Fraunces 300 italic** *(noble, philosophique)*
- Couleur : **Or `#C9A961`** sur fond nuit
- Signature **« — BM »** en plus petit, opacité 0.7
- Animation : apparition fade-in lent (3 secondes), respiration breath gold subtle

---

# 💻 CODE D'INTÉGRATION

## Composant HTML/CSS prêt à coller

```html
<div class="bm-adage" data-site="navlys.com" aria-label="Adage du jour">
  <p class="bm-adage__fr" data-lang="fr"></p>
  <p class="bm-adage__en" data-lang="en"></p>
  <span class="bm-adage__sig">— BM</span>
</div>

<style>
.bm-adage {
  position: relative;
  max-width: 720px;
  margin: 32px auto;
  padding: 24px 28px;
  text-align: center;
  font-family: 'Fraunces', 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 300;
  color: #C9A961;
  background: linear-gradient(180deg, rgba(2,4,10,0) 0%, rgba(201,169,97,0.04) 50%, rgba(2,4,10,0) 100%);
  border-top: 1px solid rgba(201,169,97,0.18);
  border-bottom: 1px solid rgba(201,169,97,0.18);
  animation: bm-adage-breath 8s ease-in-out infinite;
}
.bm-adage__fr, .bm-adage__en {
  font-size: clamp(20px, 3vw, 28px);
  line-height: 1.4;
  margin: 0 0 8px 0;
  letter-spacing: 0.01em;
  opacity: 0;
  animation: bm-adage-fadein 3s ease-out forwards;
}
.bm-adage__fr { animation-delay: 0.3s; }
.bm-adage__en { animation-delay: 0.8s; font-size: clamp(16px, 2.4vw, 22px); opacity: 0.85; }
.bm-adage__sig {
  display: inline-block;
  margin-top: 8px;
  font-size: 0.85em;
  letter-spacing: 0.15em;
  opacity: 0.7;
}
@keyframes bm-adage-breath {
  0%, 100% { box-shadow: 0 0 12px rgba(201,169,97,0.08); }
  50% { box-shadow: 0 0 24px rgba(201,169,97,0.18); }
}
@keyframes bm-adage-fadein {
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .bm-adage, .bm-adage__fr, .bm-adage__en {
    animation: none !important;
    opacity: 1 !important;
  }
}
</style>

<script>
(function() {
  const ADAGES = [
    {
      fr: "Vie et amour. La cible du jour.",
      en: "Life and love. The daily target."
    },
    {
      fr: "Le temps est ton cheval. Mène-le.",
      en: "Time is your horse. Ride it."
    },
    {
      fr: "L'ego est l'artifice. Efface-le. Choisis l'harmonie.",
      en: "Ego is the artifice. Erase it. Choose harmony."
    },
    {
      fr: "Aucun être n'a le droit de te culpabiliser. Pas même les tiens.",
      en: "No one has the right to make you guilty. Not even those you love."
    }
  ];
  const SITES = ['navlys.com', 'navbiolife.com', 'navlys.io', 'brunopartouche.com'];
  // Jour de l'année (1-365)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000);
  // Index site
  const siteEl = document.querySelector('.bm-adage');
  if (!siteEl) return;
  const siteName = siteEl.dataset.site;
  const siteIdx = SITES.indexOf(siteName);
  // Calcul de l'adage du jour pour ce site (modulo 4 maintenant)
  const adageIdx = (dayOfYear + siteIdx) % 4;
  const adage = ADAGES[adageIdx];
  siteEl.querySelector('.bm-adage__fr').textContent = adage.fr;
  siteEl.querySelector('.bm-adage__en').textContent = adage.en;
})();
</script>
```

## Où l'intégrer sur chaque site
- **navlys.com** : entre hero (= bloc d'accueil avec compte à rebours) et section méthode
- **navbiolife.com** : entre prelude Star Wars et section témoignages
- **navlys.io** : entre vitrine partenariats et section pricing
- **brunopartouche.com** : entre journal et section partenaires

Modifier juste `data-site="..."` pour chaque site et le composant calcule automatiquement l'adage du jour.

---

# 📜 ENRICHISSEMENT FUTUR

À terme, on pourra :
- Ajouter 7 adages supplémentaires (cycle 10 jours)
- Multilingue 12 langues (FR/EN/RU/ES/DE/IT/NL/PT-BR/AR/HE/ZH/JA)
- Page `/adages` complète avec contexte de chaque pensée par Bruno
- Posts sociaux automatiques chaque jour avec l'adage du jour
- Newsletter quotidienne "Adage du jour BM"

---

🪶 *Adages Bruno Mark Partouche — Charte officielle NAVLYS, 29 mai 2026*
