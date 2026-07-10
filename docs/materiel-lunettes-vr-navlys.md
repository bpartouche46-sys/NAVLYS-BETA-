# Matériel lunettes connectées + casque VR/MR pour l'univers NAVLYS — recherche factuelle (juillet 2026)

> Recherche demandée par Bruno : identifier du matériel **réellement achetable aujourd'hui**
> (juillet 2026), **indépendant de Meta** (pas de Ray-Ban Meta, pas d'écosystème fermé), avec
> un vrai SDK/API exploitable depuis **Python** pour construire un agent vocal porté (lunettes ou
> VR) capable de capter l'audio, déclencher un agent IA, afficher du texte, et à terme interagir
> avec le téléphone (appels). Bruno achète lui-même le matériel sur la base de cette recommandation.
> Aucune fonction de connexion externe non NAVLYS n'a été trouvée dans les SDK évalués — recherche
> purement documentaire (WebSearch), rien installé ni exécuté.

## 🎯 Recommandation finale

| Catégorie | Choix n°1 | Prix approx. |
|---|---|---|
| Lunettes connectées | **Brilliant Labs Halo** | 349 $ |
| Casque VR/MR | **Pico 4 Ultra** (avec réserve, voir §4) | ≈ 549-600 € / 600-700 $ |
| **Budget total** | | **≈ 950 – 1 050 $** (+ douane/import) |

**Pourquoi ce duo** : Halo est la seule option qui coche TOUTES les cases demandées — indépendante
de Meta, SDK Python **officiel et documenté** (`brilliant-ble` + `brilliant-msg`), micro **et**
haut-parleur (bone-conduction) intégrés, écran, et surtout **des preuves de faisabilité réelles et
publiques** (projets GitHub d'agents vocaux temps réel déjà branchés dessus, cf. §5). Pico 4 Ultra
est le casque VR standalone le plus proche de Quest en écosystème/prix tout en étant un acteur
différent (ByteDance/PICO Immersive), Android sous le capot donc compatible avec les mêmes
techniques de développement Python via Termux que Quest — **mais son achat/import en Israël via
canal officiel n'est pas garanti** (voir réserve §4), à vérifier avant de commander.

---

## 1. Lunettes connectées indépendantes de Meta

### 1.1 Brilliant Labs Halo — ★ recommandé n°1

- **Statut** : 2ᵉ génération de Brilliant Labs, successeur du Frame, lancement/expédition globale
  fin novembre 2025, toujours en vente mi-2026. **Modèle à diffusion limitée** comme le Frame (le
  Frame s'est déjà retrouvé en rupture de stock par le passé) → vérifier la disponibilité en
  direct sur `brilliant.xyz/products/halo` avant de payer.
- **Prix** : annoncé à 299 $ en précommande, actuellement listé à **349 $** (coloris Matte Black).
- **Matériel** : ~40 g, écran couleur microOLED en vision périphérique, **audio par conduction
  osseuse intégré** (contrairement au Frame qui nécessitait des écouteurs séparés), micro intégré,
  autonomie annoncée « all-day » en usage normal.
- **SDK/API** : 100 % open source (code + fichiers de conception sur GitHub, org `brilliantlabsAR`).
  SDK Python officiel en deux couches : `brilliant-ble` (connexion Bluetooth LE bas niveau via
  Bleak) et `brilliant-msg` (couche applicative : échange d'images, streaming audio, texte
  rastérisé). **Détection automatique Halo vs Frame** à la connexion — le même code Python
  fonctionne sur les deux appareils. Un émulateur logiciel (`halo-emulator`) permet de développer
  sans matériel. Documentation : docs.brilliant.xyz/halo/halo-sdk-python/.
- **Limites connues** : diffusion limitée (risque de rupture de stock) ; écosystème encore jeune
  (produit « tinkerer », pas grand public) ; pas de confirmation explicite d'expédition vers
  Israël dans la documentation publique — Brilliant Labs recommande de vérifier les taxes
  d'importation locales avant achat.

### 1.2 Brilliant Labs Frame — solution de repli n°1 (même écosystème)

- **Statut** : 1ʳᵉ génération, toujours en vente en parallèle du Halo, **349 $**.
- **Différence clé vs Halo** : pas d'audio bone-conduction intégré (nécessite des écouteurs
  séparés), écran plus limité (0,23″ microOLED 640×400, **champ de vision ~20°** — pas d'AR
  immersive, juste un affichage flottant transparent), le prisme de l'œil droit déforme
  légèrement la vision périphérique hors affichage de texte.
- **Autonomie réelle** (retours d'usage, pas juste la fiche produit) : ~6 h en usage actif
  (caméra/IA sollicitées), jusqu'à ~30 h en veille ; peut descendre à 2 h en usage intensif
  (reconnaissance de scène répétée).
- **SDK** : identique au Halo (même monorepo Python `frame-sdk`/`brilliant-ble`), donc **zéro
  risque de portage** si on bascule de l'un à l'autre.
- **Intérêt** : si le Halo est en rupture, le Frame reste un filet de sécurité fonctionnellement
  équivalent pour prototyper, avec un historique de retours d'expérience plus long (2024-2026).

### 1.3 Even Realities G1 / G2 — alternative sérieuse mais avec une vraie limite

- **G1** : toujours en vente, 599 $ (+150 $ verres correcteurs, +100 $ clip solaire).
- **G2** (nouvelle génération, lancée le 12/11/2025) : 599 $, **4 micros** captant la voix jusqu'à
  ~3 m, activation vocale « Hey Even », filtrage de bruit IA, écran monochrome vert 640×350,
  27,5° de champ de vision, jusqu'à 1200 nits, autonomie **> 2 jours**, boîtier de charge (+7
  recharges complètes), Bluetooth 5.2.
- **Limite majeure pour un agent vocal NAVLYS** : **le G2 n'a PAS de haut-parleur** (choix
  produit « vie privée » assumé par Even Realities) — un agent vocal ne peut donc PAS parler à
  l'utilisateur via les lunettes elles-mêmes ; il faudrait relayer la voix vers le téléphone ou
  un écouteur séparé. Pour NAVLYS (agent qui doit « rendre des services » à l'oral), c'est un vrai
  frein comparé à Halo (bone-conduction native).
- **SDK/API** : **pas de SDK officiel ouvert et stable au sens Brilliant Labs.** Even Realities
  publie un « Even Hub » développeur (hub.evenrealities.com/docs) mais l'essentiel du travail
  d'intégration exploitable aujourd'hui vient de la **communauté qui a rétro-ingénieré le
  protocole BLE** (dépôts `even-utils`, `awesome-even-realities-g1`, `awesome-even-realities-g2`,
  y compris un fichier de protocole BLE documenté dans le repo `AGiXT/mobile`). C'est utilisable
  en Python (protocole BLE Nordic UART, deux radios gauche/droite) mais **non officiellement
  supporté** — à traiter comme un risque de maintenance, pas comme un SDK de premier niveau.
- **Conclusion** : intéressant comme option d'appoint (design plus « lunettes normales », très
  bonne autonomie) mais pas le choix n°1 pour NAVLYS à cause de l'absence de haut-parleur (G2) et
  du SDK non officiel.

### 1.4 Vuzix Blade / M400 — option « pro », chère, écosystème Android classique

- **Prix** : M400 à **1 499,99 $** (souvent en rupture sur le store officiel, disponible chez des
  revendeurs pro comme Unbound VR, VR Expert, Channel XR).
- **Matériel** : IP67, caméra 12,8 MP / vidéo 4K, plateforme XR1 dédiée.
- **SDK** : développement **Android natif (Java/Kotlin)**, pas de SDK Python dédié trouvé. Un
  Python interagirait uniquement via une passerelle Android (ADB, app compagnon) — plus lourd à
  mettre en place que Brilliant Labs. `connectivity-sdk` et `hud-resources` sur GitHub
  (org `Vuzix`) permettent la connectivité avec un compagnon Android, mais rien de Python natif.
- **Conclusion** : trop cher et trop orienté « intégrateur pro Android » pour un premier
  prototype NAVLYS en Python.

### 1.5 INMO Air3 — pas encore réellement disponible pour un achat immédiat

- **Statut réel (pas juste annoncé)** : campagne Kickstarter (prix « super early bird » 899 $,
  MSRP annoncé 1 099 $), expédition annoncée à partir de **juin 2026** aux premiers contributeurs,
  avec des mises à jour d'expédition encore en cours mi-2026 sur la page Facebook officielle.
  **Ce n'est donc pas un achat immédiat garanti** — c'est une précommande avec risque de délai,
  contrairement à Halo/Frame qui sont en vente ferme.
- **SDK** : Android 14 sous le capot, SDK et documentation développeur annoncés, mais le seul SDK
  concret trouvé publiquement est un **SDK Unity** (`INMOXR/air3-unity-sdk` sur GitHub) — rien de
  Python officiel.
- **Conclusion** : à écarter pour un premier test à cause du délai de livraison incertain.

### 1.6 Xreal One Pro — à écarter pour ce cas d'usage précis

- Xreal est en réalité une **caméra/écran AR déporté** (lunettes reliées à un téléphone/PC via le
  chipset X1 propriétaire), pensé pour du rendu spatial (SDK XREAL 3.0, désormais branché sur
  l'écosystème Unity XR), pas pour capter l'audio et déclencher un agent vocal de façon autonome.
  Pas de micro/haut-parleur natif documenté pour un agent vocal type NAVLYS. **Écarté** pour ce
  projet précis (bon produit, mauvais cas d'usage).

### 1.7 Brique logicielle transverse à connaître : MentraOS

- **MentraOS** (`Mentra-Community/MentraOS` sur GitHub, licence MIT, 100 % open source) est un
  OS/SDK qui vise justement à unifier le développement d'apps de lunettes connectées
  **multi-fabricants** (Even Realities, Vuzix et d'autres compatibles), avec accès SDK à l'écran,
  au micro, à la caméra, et un **assistant vocal IA intégré**. Ce n'est pas un fabricant de
  matériel, mais une couche d'abstraction utile si NAVLYS veut, après le prototype Halo,
  supporter plusieurs marques de lunettes sans réécrire le code à chaque fois. À garder en veille
  NAVLAB, pas prioritaire pour le premier test.

---

## 2. Casques VR/MR pour développement Python/agent IA local

### 2.1 Pico 4 Ultra — ★ recommandé n°1 (indépendant de Meta), avec réserve

- **Fabricant** : PICO Immersive (ByteDance) — indépendant de Meta.
- **Prix** : lancé à **549 €** (Europe), ~600 $ équivalent en Chine (4 300 RMB). **Attention** :
  une hausse de prix générale est annoncée par PICO à partir du **1ᵉʳ juillet 2026** — le prix
  exact aujourd'hui doit être revérifié sur `picoxr.com/global` avant achat. La version
  « Enterprise » (support pro, mêmes specs) est à 699-850 $ chez des revendeurs comme bestware/
  Unbound XR.
- **Disponibilité réelle** : vendu officiellement en Europe et en Asie de l'Est ; **pas vendu par
  Pico aux États-Unis**, et **aucune confirmation trouvée d'une expédition officielle vers
  Israël**. Des revendeurs tiers (eBay, bestware.com en Europe) l'expédient à l'international,
  mais sans garantie officielle ni support local — **à vérifier concrètement avant commande**
  (contacter un revendeur EU pour confirmer l'envoi en Israël + estimer douane/import).
- **Matériel** : même puce que la Meta Quest 3 (Qualcomm Snapdragon XR2 Gen 2), 12 Go RAM,
  charge rapide 45 W, capture vidéo spatiale.
- **SDK développeur** : SDK Unity/Unreal/Native officiels, support OpenXR et WebXR. Pas de SDK
  Python officiel de haut niveau, mais **le système est un fork Android** — donc le même
  contournement que sur Quest (Termux + environnement proot Linux) est en pratique disponible,
  même si moins documenté par la communauté que pour Quest.
- **Limite honnête** : écosystème développeur et communauté (tutoriels, forums) nettement plus
  petits que celui de Meta Quest.

### 2.2 HTC Vive XR Elite / Vive Focus Vision — alternative « achat garanti », plus chère

- **Prix** : XR Elite **799 $**, Focus Vision **999 $** (999,99 $ au lancement).
- **Disponibilité** : vente officielle confirmée via le store HTC (`shop-us.vive.com`) et Amazon —
  achat plus prévisible qu'un import Pico non officiel.
- **SDK** : SDK OpenXR VIVE officiel, plugins Unity, conformité Khronos Group testée. Casques
  standalone Android sous le capot (WaveVR OS) — même logique de sideload/ADB que Quest/Pico,
  mais communauté de bidouille beaucoup plus restreinte (peu de retours concrets Termux/Python
  trouvés spécifiquement pour Vive, contrairement à Quest).
- **Focus Vision** : écran total 5K, eye/hand tracking natifs, batterie hot-swap.
- **Conclusion** : plus cher, écosystème dev plus petit que Pico/Quest, mais **le canal d'achat
  est le plus fiable des trois options non-Meta** si l'import Pico vers Israël s'avère
  compliqué — bon candidat de repli n°1.

### 2.3 Honnêteté requise : Meta Quest 3 / 3S reste objectivement le meilleur rapport
prix/écosystème dev

- **Prix** : Quest 3S autour de 299-330 $, très largement disponible, y compris en Israël via
  Amazon/revendeurs.
- **Écosystème dev pour exactement le besoin décrit** (agent vocal local en Python) : c'est,
  de loin, le mieux documenté — mode développeur officiel, ADB natif (drivers Meta), sideload via
  SideQuest, et surtout **Termux fonctionne bien sur Quest 3** (accès à un vrai environnement
  Linux/Python en ligne de commande, éventuellement complété par un proot d'une autre distribution
  pour plus d'outillage) — plusieurs guides communautaires confirment ce chemin, contrairement à
  Pico/Vive où c'est nettement moins documenté.
- **Verdict honnête** : si l'objectif est uniquement un **prototype de test technique interne**
  (pas un produit distribué sous marque Meta, pas de dépendance de l'utilisateur final à
  l'écosystème Meta), le Quest 3S est le choix le plus pragmatique et le moins cher. Mais Bruno a
  été explicite sur le refus de l'écosystème Meta pour l'univers NAVLYS — la recommandation
  principale reste donc Pico 4 Ultra (ou HTC en repli), le Quest 3S étant listé en tout dernier
  recours si l'import des deux premiers échoue vraiment.

---

## 3. Preuves de faisabilité réelle (pas du marketing)

Des développeurs indépendants ont déjà publié, publiquement, des projets connectant des lunettes
Brilliant Labs à un agent IA vocal/visuel en temps réel — c'est la meilleure preuve de faisabilité
trouvée pour ce projet :

- **`brilliantlabsAR/frame_realtime_gemini_voicevision`** (GitHub, officiel Brilliant Labs) :
  démonstrateur complet d'un assistant multimodal temps réel branché sur Frame — image streamée
  vers le modèle + métadonnées de conversation (tour de parole, interruptions), plusieurs voix
  Gemini Multimodal Live API sélectionnables. **C'est quasiment le squelette exact de ce que
  NAVLYS veut construire** (agent vocal + vision sur lunettes, en Python).
- **`CitizenOneX/frame_transcribe_googlespeech`** (GitHub, communautaire) : capture audio via le
  micro du Frame, transcription temps réel via Google Cloud Speech API, affichage du texte en
  streaming sur l'écran du Frame — preuve concrète de la chaîne micro → STT → affichage.
- **`brilliantlabsAR/frame-codebase`** : codebase complète (firmware nRF52840 inclus), donc
  possibilité d'aller jusqu'au firmware si besoin d'aller plus loin que le SDK haut niveau.
- **Even Realities** : preuve de faisabilité communautaire uniquement (rétro-ingénierie du
  protocole BLE, ex. `AGiXT/mobile` qui documente le protocole G1 en détail, `radioegor146/
  even-utils`), pas de démonstrateur officiel d'agent vocal complet trouvé.
- **MentraOS** : le dépôt principal revendique lui-même « talk to AI » comme fonctionnalité
  intégrée cross-device (Even Realities, Vuzix, etc.), à vérifier en pratique si NAVLYS explore
  cette voie plus tard.

**Aucun signe de code malveillant, de connexion externe cachée ou de texte dissimulé** n'a été
recherché ni trouvé dans ces dépôts — cette recherche s'est limitée aux résultats de recherche web
publics (titres, descriptions, extraits de documentation) ; **rien n'a été cloné ni exécuté**.
Si Bruno souhaite effectivement installer un de ces dépôts (ex. `frame_realtime_gemini_voicevision`)
pour prototyper, la règle n°111 du CLAUDE.md s'applique : passer le dépôt au scan `skill-scanner`
et à une revue manuelle avant toute exécution.

---

## 4. Réserves et incertitudes à ne pas cacher

1. **Brilliant Labs (Halo et Frame) fonctionne par « diffusion limitée »** — le Frame a déjà été
   en rupture de stock par le passé. **Vérifier la disponibilité en direct** sur le site avant
   d'annoncer un achat comme acquis.
2. **Aucune confirmation officielle d'expédition vers Israël** trouvée pour Brilliant Labs, Pico,
   ni Even Realities — chacun de ces sites recommande de vérifier soi-même les taxes d'import
   locales. **Ne pas déclarer « livrable en Israël » sans l'avoir vérifié au moment de la
   commande.**
3. **Even Realities G2 : pas de haut-parleur** — confirmé par plusieurs sources (choix produit
   « vie privée »), donc un agent vocal ne peut pas répondre à voix haute directement depuis les
   lunettes G2. C'est une limite réelle, pas une supposition.
4. **Pico 4 Ultra : hausse de prix annoncée au 1ᵉʳ juillet 2026** — le prix indiqué ici (549 €)
   date du lancement 2024 ; revérifier le prix courant avant achat.
5. **INMO Air3 : encore en phase de livraison Kickstarter mi-2026** — ne pas le traiter comme un
   achat immédiat et sans risque de délai.
6. **SDK Python natif pour VR** : aucun des casques VR trouvés (Pico, HTC, Quest) n'a de **SDK
   Python officiel de premier niveau** pour construire un agent vocal — la voie réaliste est
   Android sous-jacent + Termux/proot (bien documenté sur Quest, plus incertain sur Pico/HTC) ou
   un serveur Python sur PC/Mac qui communique avec le casque via OpenXR/réseau. À valider par un
   test technique réel une fois le matériel en main, pas supposé sur la seule base de cette
   recherche documentaire.

---

## 5. Sources principales

**Lunettes**
- [Frame – Brilliant Labs](https://brilliant.xyz/products/frame)
- [Halo – Brilliant Labs](https://brilliant.xyz/products/halo)
- [Frame SDK for Python](https://pypi.org/project/frame-sdk/)
- [GitHub – OkGoDoIt/frame-sdk-python](https://github.com/OkGoDoIt/frame-sdk-python)
- [Python | Brilliant Documentation (Halo)](https://docs.brilliant.xyz/halo/halo-sdk-python/)
- [Brilliant Labs Halo Price 2026 – PlayTechDeep VR](https://playtechdeep.blog/2026/05/01/brilliant-labs-halo-guide-349-open-source-ai-glasses-after-frame/)
- [Brilliant Labs Unveils Halo – Road to VR](https://roadtovr.com/brilliant-labs-halo-smart-glasses-price-release-date/)
- [Brilliant Labs Frame Review — Pocket-lint](https://www.pocket-lint.com/brilliant-labs-frame-ai-glasses-review/)
- [Frame Hardware Manual – Brilliant Documentation](https://docs.brilliant.xyz/frame/hardware/)
- [GitHub – brilliantlabsAR/frame_realtime_gemini_voicevision](https://github.com/brilliantlabsAR/frame_realtime_gemini_voicevision)
- [GitHub – CitizenOneX/frame_transcribe_googlespeech](https://github.com/CitizenOneX/frame_transcribe_googlespeech)
- [GitHub – brilliantlabsAR/frame-codebase](https://github.com/brilliantlabsAR/frame-codebase)
- [Even Hub – Even Realities developer portal](https://hub.evenrealities.com/)
- [Even Realities G2 — Knox Labs](https://www.knoxlabs.com/products/even-realities-g2-ai-glasses)
- [Buy Even G2 – Even Realities](https://www.evenrealities.com/products/g2-a)
- [Even Realities G1 — Tom's Guide review](https://www.tomsguide.com/computing/smart-glasses/even-realities-g1-smart-glasses-review)
- [GitHub – AGiXT/mobile (Even G1 BLE protocol)](https://github.com/AGiXT/mobile/blob/main/Even%20Realities%20G1%20BLE%20Protocol.txt)
- [GitHub – radioegor146/even-utils](https://github.com/radioegor146/even-utils)
- [Vuzix M400 – Vuzix Corporation](https://www.vuzix.com/products/m400-smart-glasses)
- [GitHub – Vuzix/connectivity-sdk](https://github.com/Vuzix/connectivity-sdk)
- [INMO Air3 – Kickstarter](https://www.kickstarter.com/projects/inmo-air3-ar-glasses/inmo-air3-smart-ar-glasses)
- [GitHub – INMOXR/air3-unity-sdk](https://github.com/INMOXR/air3-unity-sdk)
- [XREAL SDK Overview](https://docs.xreal.com/)
- [GitHub – Mentra-Community/MentraOS](https://github.com/Mentra-Community/MentraOS)

**Casques VR/MR**
- [PICO4 Ultra – PICO Global](https://www.picoxr.com/global/products/pico4-ultra)
- [Pico 4 Ultra: release date, price, features – Immersive Display](https://immersive-display.com/en/blog/pico-4-ultra-release-date-price-features-everything-you-need-to-know-b27.html)
- [Resources | PICO Developer](https://developer.picoxr.com/pico4-ultra/)
- [HTC Vive Focus Vision – Amazon](https://www.amazon.com/HTC-Vive-Focus-Vision-Controllers-Consumer/dp/B0DDRLX7V4)
- [HTC Vive Focus Vision vs Vive XR Elite (2026) – vreddie.com](https://www.vreddie.com/compare/htc-vive-focus-vision-vs-htc-vive-xr-elite)
- [VIVE OpenXR – Developer Resources](https://developer.vive.com/resources/openxr/)
- [Use ADB with Meta Quest | Meta Horizon OS Developers](https://developers.meta.com/horizon/documentation/native/android/ts-adb/)
- [How To Sideload Quest 3 – kiwidesign.com](https://www.kiwidesign.com/blogs/news-1/how-to-sideload-quest-3-in-11-easy-ways)

---

*Document rédigé le 2026-07-09 par recherche WebSearch factuelle. Rien n'a été installé ni exécuté.
Aucune connexion externe autre que la recherche documentaire n'a eu lieu. À reverifier au moment
de l'achat réel (stock, prix, expédition Israël) — les prix/statuts de disponibilité évoluent vite
sur ce marché.*
