# NAVLYS — COCKPIT IMMERSIF PACK

> *« Le vent du marché tourne sans cesse. Ton cap, lui, ne bouge pas. »*
> Pièce maîtresse visuelle de NAVLYS — le poste de barre immersif d'un ketch deux mâts.

---

## 📦 Contenu

```
NAVLYS_COCKPIT_IMMERSIF_PACK/
├── cockpit/
│   ├── cockpit_immersif.html   ← PROTOTYPE PRINCIPAL (ouvre en double-clic, mobile-first)
│   └── cockpit_immersif.tsx    ← Composant Next.js autonome (iframe srcDoc, TS strict)
├── integration/
│   └── NOTES_INTEGRATION.md    ← ce qui a été branché dans l'app navlys/
├── DOMAINE_DNS_A_FAIRE.md      ← DNS Namecheap pour navlys.com (FR + EN)
└── README.md
```

---

## ▶️ Ouvrir le cockpit (sans rien installer)

Double-clique sur **`cockpit/cockpit_immersif.html`**. C'est un fichier autonome, hors-ligne, optimisé mobile.

### Comment on pilote
- **La mer avance** en continu : sensation de naviguer vers l'avant.
- **Tourner la tête à 360°** : *glisse le doigt* horizontalement (ou bouton **⌖ Gyro** sur mobile pour le gyroscope).
  - **Devant** = ton cap : l'étoile-objectif, le grand mât (**Forteresse 90 %**, ~5 %/an), le rotor Flettner (la curation).
  - **Derrière** = ton sillage : la courbe de résultats, l'artimon (**Jeu Actif 10 %**).
- **HUD en bas (6 instruments tappables)** : Marché mondial · Tendance · Amplitude du jour · Cap · Objectif · Marge de protection. **Tape** → une **bulle** s'ouvre (détail + réglages).
- **Boussole centrale (pièce bronze NAVLYS)** : *tourne-la* pour régler ton **cap = allocation** 90 / 10.
- **Winchs** (dans les bulles) : Voilure (prudent/équilibré/agressif), Réaffectation des gains, Versement mensuel, Allure de la mer.
- **« Mois suivant ⚓ »** (bulle Objectif) : fait avancer la simulation, les chiffres se recalculent, le sillage s'allonge.

> **Données de DÉMONSTRATION uniquement.** Aucun marché réel, aucun chiffre d'algorithme, aucun conseil financier.

---

## 🎨 Charte

- **Palette stricte** : BRONZE `#B87333` × ICE BLUE `#7DD3FC` × NUIT `#02040a` (+ cuivre `#D49B5B`, corail `#e07a5f` réservé à la « baisse »).
- **Typo** : serif (Cormorant/Georgia) pour les titres, sans-serif système pour l'UI. Aucune police externe (hors-ligne).
- **Mouvement marin** : lent, respirant. *Rien ne clignote, rien ne crie.* Cible 60 fps mobile.

---

## 🔌 Intégration dans l'app `navlys/`

Le cockpit est branché dans l'app Next.js :
- Servi en plein cadre via `navlys/public/cockpit-immersif.html` + composant `navlys/components/CockpitImmersif.tsx`.
- Page **`/cockpit`** (`navlys/app/cockpit/page.tsx`).
- Lien ajouté à la navigation.

Voir `integration/NOTES_INTEGRATION.md` pour le détail (contenus branchés derrière le gate, statut du verrou, redéploiement).

---

## ⚠️ Disclaimer

NAVLYS partage des informations générales et pédagogiques. Ce n'est pas un conseil financier personnalisé. Tu décides tout, tu gères tout. Les performances passées ne préjugent pas des performances futures ; le trading comporte un risque de perte en capital.
