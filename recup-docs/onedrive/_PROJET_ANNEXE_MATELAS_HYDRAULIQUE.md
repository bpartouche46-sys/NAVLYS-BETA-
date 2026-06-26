# 🛏 PROJET ANNEXE — Matelas connecté hydraulique vivant
*Invention Bruno Mark Partouche · 30 mai 2026 nuit · département "Projets Futurs hors NAVLYS"*

---

## 🎯 BRIEF BRUNO (verbatim)

> *« j'ai inventé un nouveau matelas connecté et véritablement vivant avec un système hydraulique précis et un cerveau contrôle qui existe sous python et est facilement programmable. Les pistons devront intégrer un système de monter ou descente du piston mais garder leur élasticité programmée. Chaque piston remplace les ressorts classiques du matelas et le fond du matelas devra être solide et léger à la fois pour accueillir toutes les systèmes hydrauliques petit et faiblement consommation. Trouver le système hydraulique automatique de 30 à 60 cm de haut connectable en série sur un cerveau central programmable par suspension suivant la programmation choisi par l'utilisateur. »*

> *« donne moi un plan simple pour faire le prototype avec un équivalent autocad et sélectionner l'usine de montage capable de le produire en un puis série à la commande. Il me faudra déposer les droits si possible en Chine ou tout du moins sur les pays que je livrerai. Un système de Ali Express sur le monde entier avec un sous-traitants sur place capable de stocker et livrer rapidement taxes comprises pour assurer la livraison chez le client ou point de retrait. »*

---

## 1. 🧠 SYNTHÈSE DU CONCEPT

**Nom de travail proposé** : **NAVMATTRESS** ou **NavSleep** (à valider, marque déposable cohérente avec écosystème)

### L'invention en 1 phrase
> Un matelas dont chaque « ressort » est un piston hydraulique miniature individuellement programmable, piloté par un cerveau Raspberry Pi sous Python, qui adapte la fermeté et la suspension de chaque zone en temps réel selon la position du dormeur et son profil personnalisé.

### Ce qui le rend "vivant"
- Capteurs de pression intégrés sous chaque piston → détectent où le corps appuie
- Le cerveau central recalcule la suspension toutes les **0.5 secondes**
- L'utilisateur définit son profil (mal de dos, hanches, posture latérale/dorsale) via app mobile
- Le matelas **respire** doucement la nuit (micro-cycles 13s, cohérence Ice Blue NAVLYS)

---

## 2. 🔧 ARCHITECTURE TECHNIQUE PROPOSÉE

### Couche 1 — Pistons hydrauliques individuels
- **Type** : actuateurs hydrauliques **micro-cylindres compacts**
- **Hauteur** : 30 à 60 cm (réglable à la fabrication selon gamme)
- **Diamètre** : ~5 cm chacun
- **Course (déplacement)** : 0 à 8 cm
- **Élasticité programmée** : ressort de rappel mécanique intégré + valve servo pour amortissement variable
- **Consommation** : faible (mode statique = 0 W ; déplacement = ~2 W par piston)
- **Densité matelas Queen 160×200** : 8 × 10 = **80 pistons** par matelas
- **Fournisseurs candidats** :
  - **SMC Pneumatics** (Japon) — gamme micro-actuateurs CXSM/CDM2
  - **Festo** (Allemagne) — gamme DSNU compacts
  - **Bimba** (USA) — Series H NSM
  - **Chinois OEM** (Wuxi, Shanghai) — pour version coût-optimisée série

### Couche 2 — Circuit hydraulique
- **Fluide** : huile minérale ou polyglycol (non toxique, biodégradable)
- **Pompe centrale** : 12V DC silencieuse (moins de 25 dB)
- **Distributeur multivoie** : 80 électrovannes Festo ou équivalent chinois
- **Pression de service** : 4-6 bar (faible, sécurité utilisateur)
- **Réservoir** : intégré au fond du matelas, ~3 litres

### Couche 3 — Cerveau central
- **Hardware** : Raspberry Pi 5 (8 Go RAM) — ~80 € unité
- **OS** : Raspberry Pi OS Bookworm 64-bit
- **Langage** : Python 3.12 (comme demandé par Bruno)
- **GPIO** : interface vers les 80 servo-valves via 5 modules I2C/PCA9685
- **Wi-Fi** : intégré, connexion app mobile via BLE + Wi-Fi
- **Sécurité** : encryption AES-256 des communications, OTA updates signés
- **Backup batterie** : 4h d'autonomie en cas de coupure secteur

### Couche 4 — Fond du matelas
- **Matériau** : sandwich **fibre de carbone + nid d'abeille polypropylène + bambou compressé**
- **Épaisseur** : 4 cm
- **Poids** : ~8 kg pour 160×200
- **Solidité** : résiste à 500 kg de charge dynamique
- **Légèreté** : 70% plus léger qu'un sommier traditionnel
- **Accueil** : logements moulés pour chaque piston + canaux hydrauliques intégrés

### Couche 5 — Surface
- **Mousse mémoire à cellules ouvertes** au-dessus des pistons (5 cm)
- **Coutil** déhoussable lavable à 60°C
- **Capteurs textiles** intégrés (température, humidité, fréquence cardiaque optionnelle)

### Couche 6 — App mobile (NavSleep)
- Compatible iOS + Android
- Connexion Bluetooth LE
- **Profils utilisateurs** :
  - Repos profond (suspension molle homogène)
  - Mal de dos (renforcement lombaire)
  - Côté gauche / droit (asymétrie)
  - Convalescence post-op (adaptable médecin)
- **Mode jour / nuit** : matelas plus ferme le jour, plus moelleux la nuit
- **Massage doux** : ondulations programmables pour soulager les points de pression

---

## 3. 📐 PLAN PROTOTYPE — Équivalent AutoCAD

### Outils logiciels gratuits/abordables
- **FreeCAD** (gratuit, open-source) — équivalent AutoCAD pour les plans 3D
- **Fusion 360** (~$60/mois personnel — gratuit pour startup <$100k revenus) — plus puissant
- **OnShape** (gratuit version cloud publique) — collaboratif

### Plans à produire (livrables FreeCAD)
1. **Plan 3D global** du matelas (vue éclatée)
2. **Plan détaillé piston** (coupe + matériaux + tolérances)
3. **Schéma hydraulique** (réseau distribution)
4. **PCB cerveau** (Raspberry + extension I2C custom)
5. **Plan fond carbone** (découpes + canaux)
6. **Plan d'assemblage** (étapes 1 à 12)

### Time-to-prototype
- **Semaine 1-2** : conception FreeCAD complète
- **Semaine 3-4** : commande composants (SMC + Raspberry + matériaux fond)
- **Semaine 5-6** : assemblage manuel proto unique
- **Semaine 7-8** : tests + ajustements + dépôt brevet provisoire
- **Total** : **2 mois** pour un proto fonctionnel

### Coût prototype estimé
| Poste | Coût |
|---|---|
| 80 pistons SMC | ~4000 € |
| Pompe + électrovannes | ~600 € |
| Raspberry Pi + PCB custom | ~300 € |
| Fond carbone/bambou | ~500 € |
| Mousse + coutil | ~250 € |
| Fluide + accessoires | ~150 € |
| Outils + main d'œuvre | ~1500 € |
| **Total proto unique** | **~7300 €** |

---

## 4. 🏭 USINES DE MONTAGE — Candidates

### Pour proto unitaire (Europe)
- **Atelier Hervé Marquage 3D** (Lyon, FR) — proto sur mesure mécatronique
- **Innovation Plasturgie Composites** (Bourgogne, FR) — fond carbone
- **Festo Lyon** ou **SMC France** — assistance pour les pistons

### Pour série (Asie compétitive)
- **Foshan Shunde Furniture Industrial Zone** (Chine, Guangdong) — capitale mondiale matelas
- **Ningbo Region** (Chine, Zhejiang) — assembleur hydraulique + meuble
- **Suzhou Industrial Park** (Chine, Jiangsu) — high-tech + hydraulique
- **Vietnam (Binh Duong)** — alternative anti-tarifs USA si nécessaire

### Critères de sélection usine
- Capacité production initiale **100 unités/mois** → scaling **1000/mois**
- Certification ISO 9001 + ISO 13485 (medical-grade si visée médicale)
- Capacité d'assemblage mécatronique (rare !)
- Accord NDA + propriété intellectuelle
- Délai livraison usine → port : <15 jours
- **Modèle "1 puis série à la commande"** : possibilité MOQ 1 (Minimum Order Quantity = 1 pour prototype) puis MOQ 100 série

### Approche recommandée Bruno
1. Voyage Foshan + Ningbo (5-7 jours, ~1500 € + vols)
2. Visite 3-5 usines présélectionnées (introductions via Alibaba Gold Supplier)
3. NDA signé avant tout partage de plans
4. Négocier MOQ + délai + prix unitaire série
5. **Conserver l'assemblage final + intégration cerveau Python en France** (différenciateur "Made-in-France-Tech-In-China")

---

## 5. 📜 PROTECTION INTELLECTUELLE

### Stratégie de dépôt
- **France/EU** : Brevet **INPI + EPO** (Office Européen des Brevets)
  - Brevet d'invention : ~5-8 k€, durée 20 ans
  - Modèle déposé : ~500 € (design)
  - Marque NavMattress/NavSleep : ~800 € (INPI + EUIPO)
- **Chine** : Brevet **CNIPA** (China National IP Administration) — **OBLIGATOIRE** car production sur place
  - Brevet utilité (Utility Model) : ~3-5 k€, 10 ans
  - Brevet design : ~1500 €
  - Marque chinoise : ~2000 € (toujours déposer en caractères latins + chinois)
- **USA** : USPTO si commercialisation US (~10 k€)
- **Autres pays livrés** : PCT (Patent Cooperation Treaty) couvre 150+ pays — ~5 k€ phase internationale puis taxes par pays

### Conseils stratégiques
- **Dépôt provisoire France d'abord** (~200 €) pour bloquer la date
- Puis dépôt PCT dans les 12 mois pour internationaliser
- Cabinets recommandés : **Beau de Loménie** (Paris), **Mark & Clerk** (Londres), **CCPIT** (Pékin)
- **Critique** : déposer AVANT toute publication ou présentation publique

### Stratégie défensive Chine
- **Déposer à Hong Kong** en parallèle (juridiction plus solide)
- Faire signer NDA + non-compete à TOUTES les usines visitées
- Garder les **plans cerveau Python en France** (jamais transmis)
- Encoder firmware de manière qu'aucun reverse-engineering Chinois ne donne accès au code

---

## 6. 🚚 LOGISTIQUE MONDIALE — Modèle AliExpress

### Architecture proposée
- **Production centralisée Asie** (Foshan) → conteneurs maritimes
- **3 hubs régionaux de stockage** :
  1. **Europe** : Rotterdam (Pays-Bas) ou Anvers — couverture EU
  2. **Amériques** : Newark (USA) ou Tijuana (Mexique) — couverture US/Canada/LatAm
  3. **Asie-Pacifique** : Singapour — couverture SEA/Australie/Inde
- **Sous-traitants logistiques sur place** :
  - **EU** : DPD / DHL / Colissimo / La Poste
  - **USA** : FedEx / UPS / OnTrac
  - **Asie** : Lazada / Shopee Express / Singapore Post

### Modèle "taxes comprises"
- Utiliser un service **Delivered Duties Paid (DDP)** :
  - Tarifs douaniers calculés et payés à l'avance par NAVMATTRESS
  - Client final ne voit qu'un prix tout compris
- **TVA EU IOSS** (Import One-Stop Shop) pour expéditions <150 €
- **TVA EU classique** pour >150 € via représentant fiscal pays par pays
- **USA Sales Tax** : services comme **Avalara** ou **TaxJar**

### Livraison client
- **Point relais** : Mondial Relay (EU), USPS (US), 7-Eleven (Asie)
- **Domicile** : transporteur classique avec rdv
- **Délai cible** : 3-5 jours après expédition hub régional
- **Tracking** : intégré dans l'app NavSleep + email + SMS

### Prix de vente cible
| Marché | Prix conseillé | Marge brute |
|---|---|---|
| **Premium EU/US** | 2490 € / $2890 | ~55% |
| **Standard EU/US** | 1490 € / $1690 | ~40% |
| **Économique Asie** | 990 $ équivalent | ~30% |

---

## 7. 🛣 ROADMAP RÉALISTE 18 MOIS

| Mois | Étape |
|---|---|
| **M1-M2** | Plans FreeCAD complets + dépôt brevet provisoire FR |
| **M3-M4** | Achat composants + assemblage prototype #1 (Lyon) |
| **M5** | Tests utilisateurs (50 nuits sur prototype, mesures objectives) |
| **M6** | Ajustements + dépôt PCT international + voyage Chine |
| **M7-M8** | Sélection usine Foshan, NDA, plans transférés sécurisé |
| **M9** | Prototype usine #1 produit en Chine (validation conformité) |
| **M10** | Production pré-série 50 unités |
| **M11** | Tests bêta-clients (50 utilisateurs sélectionnés) |
| **M12** | Production série 200 unités/mois |
| **M13-M15** | Lancement EU + hubs Rotterdam |
| **M16-M18** | Lancement US + Asie + hub Newark + Singapour |

---

## 8. 💰 BUDGET PRÉVISIONNEL

| Phase | Coût |
|---|---|
| Prototype #1 France | 7 500 € |
| Dépôts brevets FR + PCT + CN + US | 25 000 € |
| Voyage Chine + due diligence | 5 000 € |
| Outillage moules usine | 60 000 € |
| Pré-série 50 unités | 35 000 € |
| Marketing lancement (website, vidéo, presse) | 30 000 € |
| Stocks hubs régionaux | 100 000 € (rotation) |
| **TOTAL approximatif M0-M18** | **~260 000 €** |

### Sources de financement possibles
- BPI France (subvention innovation jusqu'à 50%)
- Crowdfunding Kickstarter (preuve marché)
- Investisseurs love-money + business angels (50-100 k€)
- Pré-commandes site web NavSleep dès M6 (10% remise early-bird)

---

## 9. ⚠ RISQUES & MITIGATION

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Copie chinoise non autorisée | Élevée | Élevé | NDA strict + brevet CN avant production + cerveau Python en FR |
| Coût composants supérieur estimation | Moyenne | Moyen | Marges 40-55% donnent buffer |
| Régulation matelas médical (UE MDR) | Faible | Élevé | Positionner "confort", PAS "médical" (esquiver MDR) |
| Bruit pompe nuit | Moyenne | Élevé | Choisir pompes <25 dB + tests acoustiques avant prod |
| Fuite hydraulique | Faible | Élevé | Tests pression 6 mois + fluide non toxique |
| Cyber attaque sur cerveau | Faible | Moyen | Encryption AES + signature OTA + bug bounty |

---

## 10. 🔗 LIEN AVEC NAVLYS (cohérence écosystème)

- **App NavSleep** = même charte visuelle (Ice Blue, bronze, Cinzel/Cormorant)
- **Bracelet capteur fréquence cardiaque** optionnel = clin d'œil cohérent
- **Cycle respiration 13s** = cohérent avec animations NAVLYS
- **Mission égalisation** : version économique 990 € accessible à plus large public
- **Possible passerelle NAVBIO** : "écouter son livre la nuit pendant qu'on dort dans le matelas vivant"

---

## 11. 🎯 ACTIONS IMMÉDIATES PROPOSÉES (validation Bruno)

1. ⚪ Valider le nom (NavMattress / NavSleep / autre)
2. ⚪ Valider l'investissement initial proto (~7500 €)
3. ⚪ Mandater un ingénieur freelance FreeCAD (estimation 3-5 k€ pour M1-M2)
4. ⚪ Contacter cabinet **Beau de Loménie** pour stratégie brevet
5. ⚪ Réserver les domaines `navsleep.com` + `navmattress.com` (à vérifier dispo)
6. ⚪ Lancer recherche sourcing SMC + alternative chinoise

**Tout ça reste en BASSE PRIORITÉ tant que NAVLYS BETA n'est pas validé.**

---

🛏 *Projet annexe consigné · Le Cartographe + Le Maître d'Œuvre · 30 mai 2026 nuit*
*Statut : concept validé Bruno, en attente arbitrage post-BETA NAVLYS*
