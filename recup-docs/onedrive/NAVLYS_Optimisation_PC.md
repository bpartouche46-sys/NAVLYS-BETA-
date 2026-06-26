# 🖥️ NAVLYS — Optimiser le PC (Dell E7450) sans casser les visuels
*Ordre d'impact. La RAM reste le ×10 ; le reste, c'est du gain immédiat et sûr. 1 juin 2026.*

---

## 🥇 #1 — LA RAM (le vrai multiplicateur)
4 Go saturés → le PC pagine sur le disque (100 %) = lent. **+4 Go = 8 Go** transforme tout. (Réf : DDR3L-1600 PC3L-12800 SO-DIMM — vu hier.) Le reste ci-dessous aide, mais ne remplace pas ça.

## 🥈 #2 — Alléger le DÉMARRAGE (gain immédiat sur 4 Go)
Beaucoup de programmes se lancent au démarrage et mangent ta RAM en permanence. À **désactiver** (Gestionnaire des tâches → onglet **Démarrage** → clic droit → Désactiver) :
- **Dropbox, Google Drive, OneDrive** (garde-en UN seul si tu y tiens)
- **Acrobat / Adobe updater**, **ASUS** (HiPost, Live Update, Splendid…), **Java updater**
- **Spotify**, **WhatsApp** (tu l'ouvres quand tu veux)
- Tout ce qui a un impact « Élevé » et que tu n'utilises pas en continu
→ Garde : antivirus, audio, pilote tactile. **Ne touche pas à la sécurité.**

## 🥉 #3 — NETTOYAGE disque (le script joint)
Lance **`NAVLYS_Nettoyage_PC.ps1`** (clic droit → Exécuter avec PowerShell) : vide temp, corbeille, caches, cache Windows Update. 100 % sûr. Puis redémarre.
+ Optionnel : **Nettoyage de disque** (cleanmgr) → coche « Fichiers temporaires », « Corbeille », « Anciennes installations Windows ».

## 4 — EFFETS VISUELS (on garde ce qu'il faut pour les sites)
Important : les **effets de tes sites/apps tournent dans le NAVIGATEUR (Chrome)** — ils ne dépendent PAS des animations de Windows. Donc tu peux **alléger les animations de Windows** sans rien perdre côté NAVLYS :
- Paramètres → Système → Informations → Paramètres système avancés → Performances → **« Ajuster afin d'obtenir les meilleures performances »**, puis **re-coche seulement** : « Lisser les polices écran » + « Afficher l'aperçu des miniatures ».
→ Windows plus rapide, tes sites toujours aussi beaux.

## 5 — NAVIGATEUR (là où vivent tes sites)
- Dans Chrome : limite les **onglets ouverts** (chaque onglet mange de la RAM), désactive les **extensions** inutiles.
- Active **« Économiseur de mémoire »** (Chrome → Paramètres → Performances).

## 6 — À ÉVITER (je ne le ferai jamais)
- ❌ Désactiver l'antivirus / le pare-feu / Windows Defender
- ❌ Nettoyeurs de registre agressifs
- ❌ Supprimer des fichiers système

---

## 👉 CE QU'ON FAIT
- **Toi maintenant** : lance le script + désactive les démarrages (5 min) + redémarre.
- **Moi** : dès que le PC respire (ou après la RAM), je **reprends la main en direct** pour finir l'optimisation et vérifier.

Quand tu auras fait ça, le PC sera déjà bien plus vif — et avec les 8 Go demain, il volera. 🚀
