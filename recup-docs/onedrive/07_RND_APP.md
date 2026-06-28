# 🔬 DÉPARTEMENT 07 — R&D APP (Recherche & Développement)

> Briefing autonome. Une conversation qui lit ceci explore, prototype et valide les apps & fonctions de l'écosystème (NAVLYS, NAVBIO, et la suite).
> Manager en chef : **le QG (Direction)**. Tout remonte au QG.

## 🎯 Mission
Inventer l'avenir des apps NAVLYS. Sortir des idées, en faire des **prototypes testables**, valider ou jeter vite, et nourrir la feuille de route — sans jamais casser ce qui tourne en prod.

## 🧰 Périmètre
- **Gère** : veille techno, idéation, maquettes, **proof-of-concept** (POC), specs produit, tests utilisateurs, recommandations d'architecture.
- **Ne gère pas** : la mise en prod (→ Dépt 02), la marque finale (→ 03), la pub (→ 04), Stripe (→ 05), l'infra (→ 06). Le R&D **propose**, les autres **industrialisent**.

## 🧪 Méthode (la boucle courte)
1. **Cap** : une question claire (« et si… ? »).
2. **Esquisse** : maquette HTML/JS jetable ou note de spec.
3. **POC** : la plus petite chose qui prouve l'idée.
4. **Verdict** : on garde (→ passe à 02 pour industrialiser) ou on jette (et on note pourquoi).
5. **CR au QG** en 5 lignes.

## 📚 Références
- `_NAVLYS_MASTER_INDEX.md` (écosystème) · `_NAVLYS_DISPATCH.md` (routeur) · `_NAVLYS_QG_COORDINATION.md` (décisions).
- `NAVBIO/_NAVBIO_MASTER.md` (le nouveau produit à faire grandir).
- Code vivant : `navlys/` (Next.js), les cockpits `cockpit3.html`, les teasers.

## 🛠️ Chantiers ouverts
- **NAVBIO** : transformer la promesse en produit (voir `NAVBIO/_NAVBIO_MASTER.md`). Premier POC : la page-teaser cockpit déclinée à NAVBIO + le cœur de l'offre « Live Bio ».
- **Cockpit 2.0** : fonds **photo-réels** par véhicule (si Bruno fournit des images libres de droit) + version vidéo MP4 légère.
  - 🆕 **MAJ 7 juin 2026 (nuit)** — 2 prototypes POC livrés à la racine Downloads, charte stricte, bilingues, **inspirés Virtual Regatta** (mouvements caméra & présentation bateau, sans copie d'assets) :
    - `NAVLYS-COCKPIT-360.html` — **vue à la barre** (1ère personne), pivot caméra 360° (drag + boutons AVANT/TRIBORD/ARRIÈRE/BÂBORD + orbite auto), grand mât avec génoa 90% à l'avant, artimon plus petit 10% à l'arrière, helm wheel fixe.
    - `NAVLYS-COCKPIT-v2.html` — **timonerie moderne** : ketch vu d'en haut, caméra orbite+zoom autour de la coque, filets de vent animés, sillage, + console à **3 écrans Canvas animés** (Rythme travail/jeu, Cap & vent, Activité en ligne).
    - Calque `.photo` prêt à recevoir une vraie photo (sources libres Unsplash/Pexels listées dans le CR INBOX).
    - **Attente Bruno** : 2-3 captures Virtual Regatta pour caler le cadrage caméra au pixel · décision d'industrialisation par Dépt 02 dans `navlys/public/cockpit-v2.html`.
    - CR détaillé : `_NAVLYS_INBOX/claude-cockpit-2026-06-07.md`.
- **Moteur partagé** : factoriser le teaser cockpit en 1 brique réutilisable pour tous les sites (NAVLYS, Bruno, NAVBIO).

## 📍 Règles gravées (héritées)
Marque NAVLYS dépersonnalisée · ni conseil ni placement · gate NAVLYS verrouillé jusqu'au 1er juin · partenaires = carburant SEO · zéro bot · langage simple maritime · aucun secret en clair · rien supprimé sans OK Bruno. **Tout passe par le QG.**

## 🤝 Compte-rendu au QG (5 lignes) : fait / à faire / bloqué / décision / prochaine action.

## 🇬🇧 EN
R&D dept: ideate, prototype, validate new apps/features for the NAVLYS ecosystem (NAVLYS, NAVBIO, next). Short loop: question → sketch → POC → verdict → 5-line report to HQ. It proposes; Dept 02 industrializes. Open work: grow NAVBIO from promise to product, photoreal cockpit 2.0, shared reusable cockpit brick. Inherits all carved rules; everything routes through HQ (chief manager).

---
> *« Un cap, une main, un jour. »* · ⚠️ Information pédagogique, pas un conseil personnalisé. · Educational information only.

---

## 🧾 CR DE QUART — 25 mai 2026 (Dépt 07 R&D → QG)
- **FAIT** : recherche des 2 prestataires « one-clic » livrée (`NAVBIO/RnD/PRESTATAIRES_IA_ONE_CLICK.md`) → **#1 fal.ai** (1 API multi-modèles : Nano-Banana/FLUX image + Kling/Runway/Luma/Veo image→vidéo, white-label, à l'usage, montable en 1 jour) · **#2 OpenAI** (assistant « GPT Plus » white-label) · alternative mono-vendeur **Google Gemini/Veo**. + **échantillon one-clic RÉEL** livré (`NAVBIO/02_site_app/navbio_oneclic_demo.html`) : charge une image → 1 clic l'anime (couleur chaude/zoom/lumière/particules/grain) → 1 clic crée une **vraie vidéo téléchargeable** (MediaRecorder, 100 % local, zéro dépendance). Esprit NAVLYS (chaleur + clarté), responsive Android/Windows.
- **À FAIRE** : brancher les vraies clés (fal + OpenAI, en env, côté serveur) derrière le même bouton ; vérifier CGU white-label/revente ; logo NAVBIO (→ Dépt 03).
- **BLOQUÉ** : pas de clés API ni d'accès réseau externe au QG → la vidéo IA réelle attend les clés de Bruno (l'échantillon local, lui, tourne déjà).
- **DÉCISION (Bruno)** : prestataires = **fal.ai + OpenAI** (reco) OU **Google + OpenAI** ? + budget mensuel plafond par palier d'abonné.
- **PROCHAINE ACTION** : sur clés → micro-service one-clic (route serveur) qui traduit 1 clic → appel modèle → rendu dans NAVBIO.

---
## 📥 ORDRE QG @ALL — 25 mai 2026 · 22:00 (Nash NAVLYS)
- Lire `navlys/docs/MOTEUR_CALCUL_NASH.md` (spec 8 facteurs) — c'est ta feuille de route.
- **Encyclopédie** : le QG a posé 5 fiches (`martingale`, `kelly`, `stop-loss`, `slippage`, `risk-budget-jour`). À toi de finir les 5 autres : `volatilite-vix`, `correlation-crypto-actions`, `oracles-fed-bce`, `alpaca-api`, `alpaca-ai`.
- **Code** : implémenter l'optimiseur Top-3 (§5) + le modèle de slippage (§3, calibrage Alpaca paper) + la mécanique DailyTarget verrouillée (§8).
- Pas de clé externe nécessaire pour avancer sur le code et les fiches — tu peux foncer.

---

## 🧾 CR DE QUART — 7 juin 2026 (Dépt 07 R&D → QG)

**Deux livrables R&D ce jour, indépendants et coordonnés avec MASTERNAV :**

### 1) NAVLYS Martingale Lab v8 (anciennement NOVA) — laboratoire de paramétrage
- **FAIT** : pack build standalone livré dans `Downloads/` (`BUILD_NAVLYS_v8.bat` ← renommé NOVA→NAVLYS par Bruno + `build_nova_v8.py` + `inject_vba_v8.ps1`). Tampons réécrits MASTERNAV. Génère `NOVA_Martingale_Lab_v8.xlsm` (nom fichier conservé) avec 9 onglets — **Configuration** (col C explicative + fond noir), **Sequence_Mises** (table dynamique pour visualiser les mises exactes coup par coup), **Indicateurs**, **Monte_Carlo**, **Sensibilite** (matrice p × cap_max pour calibrer le risque), **Comparatif** (Recovery v8 vs ½ Kelly vs Mise fixe, 1000 runs Python), **Kelly** (formule + explication), **Backtest_Live** (fetch Binance BTCUSDT 1h ou fallback random walk), **Macro_VBA_Code** (backup VBA). Logique remplacée : **récupération calibrée** `mise_n+1 = (cumul_perdu + gain_cible_€) / payoff_ratio` au lieu du x2 exponentiel. Cap max 10 coups → fallback mise fixe 1 %. Thème dark intégral (fond noir, accents or/fuchsia). Bug v6 placeholder OneDrive contourné (try/except → fresh workbook).
- **À FAIRE** : Bruno valide les chiffres concrets et conclusions (test promis). Si OK, intégrer comme module éducatif sur le futur portail NAVLYS membre (lien depuis `app.navlys.com`).
- **BLOQUÉ** : computer-use Cowork timeout permanent dans cette session (request_access expire à 60 s sans dialogue) — Bruno doit double-cliquer le .bat lui-même.
- **DÉCISION Bruno** : v8 conservé comme outil pédagogique interne, ou packagé comme bonus abonnés NAVLYS NEXT GEN INVEST 490 €/an ?
- **PROCHAINE ACTION** : attendre retours chiffrés de Bruno (test en cours), puis si validé, exporter une version HTML/JS jouable en ligne sur le portail.

### 2) LÉGENDE — concept biographie IA luxe (R&D pure, hors écosystème NAVLYS finance)
- **FAIT** : recherche concurrentielle livrée (StoryWorth, Remento, Storii, Autobiographer, Life Story AI, StoriedLife). **Angle mort identifié** : aucun ne fait du multimédia tissé (photos + vidéos + docs + voix) en récit cinéma luxe. Mockup HTML responsive livré `LEGENDE_app_mockup.html` (single-file, dark mauve/fuchsia/bleu nuit, Cormorant Garamond + Inter, 6 thèmes signatures cliquables dont *Le Navigateur* qui colle au profil Bruno, 4-étapes process, 3 tiers tarifaires 149 / 449 / 1 290 €, FAQ dépliable, footer 4 colonnes, mobile-first). Brief produit complet `LEGENDE_concept.md` (positionnement, économie unitaire, stack Next.js + Claude/GPT + Whisper + ElevenLabs + Remotion + Stripe + Blurb/Lulu, roadmap 5 phases, risques RGPD).
- **À FAIRE** : Bruno arbitre **naming** (LÉGENDE / SILLAGE / OPUS VITA / HÉRITAGE / RÉCIT) et **statut** (produit autonome sous nouvelle marque ? ou ligne « Studio » sous NAVLYS Studio ? ou rien — projet enterré ?). Si validé, phase 1 = landing live + 50 préinscriptions pour valider l'appétit avant code.
- **BLOQUÉ** : décision stratégique Bruno (LÉGENDE n'est pas dans le périmètre NAVLYS finance — il faut décider si on disperse l'énergie ou non, surtout en pleine phase BETA).
- **DÉCISION Bruno** : on garde LÉGENDE en R&D dormante, on l'industrialise vite (3-6 mois), ou on l'écarte ?
- **PROCHAINE ACTION** : si feu vert post-15 juin (ALCAPA validé), monter une landing Vercel dédiée et tester l'appétit. Sinon mettre en `_PARKING_RD/`.

**Coordination MASTERNAV** : ces deux livrables n'altèrent ni le `_MASTER_NAVLYS_NOW.md` (sacré, phase BETA) ni le cap immédiat (Top 3 Bruno = portail PWA + audit ALCAPA + annonce sociale). Ils sont rangés ici en R&D, en attente d'arbitrage Bruno post-J+15.

