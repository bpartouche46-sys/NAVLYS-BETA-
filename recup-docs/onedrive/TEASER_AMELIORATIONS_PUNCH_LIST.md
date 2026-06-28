# 🎨 Améliorations TEASERS — punch list

> Dépt 02 Site/Produit · ordre QG du 26 mai 2026 · décision Bruno : **on garde le teaser actuel et on l'améliore au maximum**.
> Cible : `navlys.com` (gate cockpit) + `brunopartouche-teaser.vercel.app` (médaille 3D).
> Code preview personnel Bruno : **`CAP-CAPITAINE-7K3M2A`** — bookmark-le, c'est ton passe-droit permanent.

---

## 1. 12 améliorations classées par impact / effort

| # | Amélioration | Impact | Effort | Statut |
|---|---|---|---|---|
| **1** | **Cookie `gate_unlock` 30 j + bypass `?k=CAP2027`** — Bruno ne retape plus le code (cf. `06_INFRA_VEILLE_PATCHES/GATE_PERSISTANT_ET_DISCRETION.md`) | 🔥🔥🔥 | 30 min | À faire |
| **2** | **Code preview privé `CAP-CAPITAINE-7K3M2A`** — Bruno voit l'évolution post-lancement sans déverrouiller le gate public | 🔥🔥🔥 | 15 min | À faire |
| **3** | **Robots noindex + robots.txt dynamique** — public n'indexe plus le teaser | 🔥🔥 | 10 min | À faire |
| **4** | **Compte à rebours plus dense** — j:h:m:s en JetBrains Mono lumineux, pulse à chaque seconde, lecture Asia/Jerusalem précise | 🔥🔥 | 45 min | À faire |
| **5** | **Bandeau « VAGUE LANCEMENT JUIN »** prêt à activer (caché par défaut) — switch flag `NEXT_PUBLIC_LAUNCH_VAGUE` qui bascule au 1ᵉʳ juin minuit | 🔥🔥 | 30 min | À faire |
| **6** | **Fond espace plus dense + parallax mousemove subtil** — 3 couches d'étoiles déjà OK, ajout parallax 10 % au survol | 🔥 | 30 min | À faire |
| **7** | **Médaille 3D BP : son léger d'ambiance optionnel** — bouton mute par défaut, son maritime court 8 s, jamais autoplay | 🔥 | 1 h | Optionnel |
| **8** | **Cartes « essayer » NAVLYS : preview en hover** — survol = mini-vidéo 3 s du contenu locked, avec icône cadenas | 🔥🔥 | 1 h | À faire |
| **9** | **Cockpit : sélecteur sticky-discret** — petit dock en bas-droite, on change de cockpit même après gate déverrouillé | 🔥 | 45 min | Optionnel |
| **10** | **Page `/preview` cachée** — accessible uniquement avec cookie `CAP-CAPITAINE-7K3M2A`, montre les 3 profils Prudent/Équilibré/Énergique en vrai | 🔥🔥🔥 | 2 h | À faire |
| **11** | **Bouton « être prévenu·e »** — input email avant la médaille/cockpit, envoie vers `bruno@navlys.com` via Formspree ou Resend. Construit la liste avant le 1ᵉʳ juin | 🔥🔥🔥 | 1 h | À faire |
| **12** | **i18n FR/EN propre** — toggle drapeau en haut-droite, persist `localStorage.lang`. Navlys déjà FR/EN, à harmoniser sur Bruno | 🔥 | 1 h | À faire |

---

## 2. Bloc d'améliorations « ouverture progressive » (décision Bruno : « on s'ouvre peu à peu si c'est validé »)

Logique : aujourd'hui = gate complet. Si une étape se passe bien, on **ouvre une porte de plus** sans dévoiler tout :

| Étape | Quand | Ce qui s'ouvre |
|---|---|---|
| **J-5 (27 mai)** | maintenant | Page `/preview` accessible avec code `CAP-CAPITAINE-7K3M2A` pour Bruno + 2-3 testeurs proches |
| **J-3 (29 mai)** | si retours OK | Le compte à rebours **passe en gros** et **annonce la vague −50 %** (sans déverrouiller le reste) |
| **J-1 (31 mai 19:00)** | mailing FR | Bandeau s'allume avec animation « demain à 23 h Paris » |
| **J0 (1ᵉʳ juin 00:00 Jérusalem)** | flag bascule | `NEXT_PUBLIC_LAUNCH_UNLOCKED=true` + bannière `CAP50` active |
| **J+1 à J+30** | campagne juin | Découvrir les 4 vagues à mesure (cf. `04_MARKETING_CAMPAGNES/CAMPAGNE_LANCEMENT_JUIN2026.md`) |

Aucune ouverture n'est faite **sans validation Bruno** la veille.

---

## 3. Lots d'exécution proposés (à valider)

**LOT A — ce soir (1-3 h)** :
- Améliorations **1, 2, 3** (cookie gate + preview + noindex) → tu ne retapes plus le code, le public n'indexe plus, tu as ton lien preview perso.
- Page Netlify minimaliste de `brunopartouche.com` (livrée juste maintenant : `brunopartouche_NETLIFY_MINIMALISTE/`).

**LOT B — demain (½ journée)** :
- Améliorations **4, 5, 11** (countdown dense + bandeau vague caché + bouton email opt-in). On commence à construire la liste de pré-inscrits.

**LOT C — 28-29 mai (½ journée)** :
- Améliorations **8, 10, 12** (hover cards + page preview privée + i18n).

**LOT D — optionnel, après lancement** :
- Améliorations **6, 7, 9** (parallax + son ambiance + cockpit sticky).

---

## 4. Garde-fous

- ❌ **Ne jamais déverrouiller** `NEXT_PUBLIC_LAUNCH_UNLOCKED=true` avant le 1ᵉʳ juin 00:00 Jérusalem.
- ❌ **Aucun secret en clair** dans le repo. `GATE_SECRET` et `GATE_CODES` posés via `vercel env add` uniquement.
- ❌ **Pas deux déploiements rapprochés** (rappel CLAUDE.md) — un seul à la fois, attendre READY.
- ✅ Sauvegarde `teaser.html` avant chaque modif : `cp teaser.html teaser_$(date +%F).bak.html`.
- ✅ Tests sur preview Vercel (URL `*.vercel.app`) avant prod.

---

## 5. Tes 3 décisions (réponds en 1 ligne)

1. **Lot A ce soir** — je lance (cookie + preview + noindex + Netlify mini) ?
2. **Bouton « être prévenu·e »** dans le Lot B — tu valides ? (Formspree ou Resend, gratuit jusqu'à 100 inscrits/mois.)
3. **Page `/preview` privée Lot C** — j'y montre quoi exactement ? (a) les 3 profils Prudent/Équilibré/Énergique en vrai, (b) le calcul Nash en démo, (c) la version post-lancement complète. Choix multiple OK.

---

> *« Un cap, une main, un jour — et le sablier qui reconnaît son capitaine. »*
> Code preview Bruno : **`CAP-CAPITAINE-7K3M2A`** · bookmark à conserver.
