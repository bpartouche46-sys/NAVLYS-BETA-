# ⏱️ PLAN D'ACTION 48H · J-3 LANCEMENT NAVLYS
_29 mai 2026, 10h15 → 31 mai 2026, 23h59 (Méditerranée)_

> **Objectif** : avoir bouclé toutes les actions juridiques nécessaires avant minuit le 31 mai pour un lancement BETA serein le 1ᵉʳ juin à 00h00 (heure de Jérusalem).

---

## 👤 ACTIONS BRUNO (3 actions, ~1h45 total)

### 🟢 Action B1 — Vérification manuelle INPI + EUIPO (4 minutes)
**Quand** : aujourd'hui 29/05 avant 18h.
**Comment** :
1. Ouvrir https://data.inpi.fr → onglet **Marques** → champ libre : `NAVLYS` → ENTRÉE.
2. Capture d'écran du résultat (vide ou contenant des dépôts).
3. Ouvrir https://www.euipo.europa.eu/eSearch/#advanced/trademarks → champ **Trade mark name** : `NAVLYS` → SEARCH.
4. Capture d'écran du résultat.
5. M'envoyer les 2 captures dans la conversation.

**Décision sur ces résultats** :
- ✅ Vides → GO dépôt INPI immédiat (Action B2).
- ⚠️ Un dépôt apparaît → on bascule en analyse Scénario 2 / 3 dans la journée.

### 🟢 Action B2 — Dépôt INPI marque verbale NAVLYS (1 heure)
**Quand** : 30 mai (vendredi) ou 31 mai (samedi soir si Bruno est libre).
**Comment** :
1. Aller sur https://procedures.inpi.fr/?/marques/ → formulaire **M712** Dépôt de marque française.
2. Renseigner :
   - **Marque** : `NAVLYS` (lettres majuscules, marque verbale).
   - **Titulaire** : Bruno Mark Partouche, n° SIREN [à compléter si Bruno a une structure], adresse [à compléter].
   - **Classes Nice** : 9, 35, 36, 38, 41, 42, 45.
   - **Libellés** (templates ci-dessous dans la section "annexe libellés").
3. Régler 430 € carte bancaire (190 € + 6×40 €).
4. Récupérer le n° de dépôt INPI (généré à la fin du formulaire) et **me l'envoyer dans la conversation**.

### 🟡 Action B3 — Optionnel : pré-réservation 3 domaines de secours (5 minutes, 45 €)
**Quand** : aujourd'hui 29/05 ou demain 30/05.
**Pourquoi** : assurance bon marché contre le pire scénario (pivot de marque). Si non utilisés, on les revend ou on les laisse expirer dans 1 an.
**Comment** :
1. Aller sur https://www.namecheap.com (ou OVH si Bruno préfère FR).
2. Ajouter au panier :
   - `navelys.com` (~12-15 €/an)
   - `navoleos.com` (~12-15 €/an)
   - `navelia.com` (~12-15 €/an)
3. Total ~45 €.
4. Confirmation reçue → forward du mail dans la conversation pour traçabilité.

### 🔴 Action B4 — Conditionnelle (uniquement si B1 révèle un dépôt tiers actif)
**Si et seulement si** la vérif INPI ou EUIPO révèle un dépôt actif :
- Commander un audit pro chez un cabinet PI : appeler ou écrire à :
  - Cabinet Plasseraud — https://www.plasseraud.com — devis express 24h
  - Cabinet Dreyfus — https://www.dreyfus.fr — réactivité forte
  - IPzen — alternative digitale moins chère
- Budget audit : 500-1 200 € HT (consultation initiale).
- Décision opposition / coexistence / pivot dans les 5 jours suivants.

---

## 🤖 ACTIONS CLAUDE (3 actions, ~2h total)

### 🟢 Action C1 — Captures de preuve d'antériorité (15 min, dès aujourd'hui 29/05)
- Récupérer une capture HTML horodatée de https://navlys.com (état du 29/05/2026, 09h45) → archive locale dans `_SITES_MASTER/_JURIDIQUE_PREUVES_ANTERIORITE/navlys_com_2026-05-29.html`.
- Soumettre la sauvegarde Wayback Machine : https://web.archive.org/save → URL `https://navlys.com` (action manuelle requise par Bruno via navigateur OU par Claude via Chrome MCP s'il est connecté).
- Archiver le lien Wayback dans `_SITES_MASTER/_JURIDIQUE_PREUVES_ANTERIORITE/wayback_navlys_2026-05-29.txt`.
- Faire de même pour `brunopartouche.com` et `brunopartouche-teaser.vercel.app`.

### 🟢 Action C2 — Mise à jour des mentions légales avec n° de dépôt (30 min, après Action B2)
**Déclencheur** : Bruno envoie le n° de dépôt INPI.
**Tâche** :
- Mettre à jour le pied de page `navlys.com/index.html` :
  > **© 2026 NAVLYS™** — Marque française en cours de dépôt (INPI n° [XX] · déposée le 30 mai 2026). Tous droits réservés.
- Mettre à jour la page mentions légales détaillée si elle existe (sinon la créer en quick fix).
- Idem pour `brunopartouche.com` et `brunopartouche-teaser.vercel.app` (mention "marque associée NAVLYS™").
- Versionner FR + EN.

### 🟢 Action C3 — Kit de communication "marque déposée" (45 min, livré pour le 1ᵉʳ juin)
**Tâche** : préparer le mini-pack qui accompagne le lancement BETA :
- Post LinkedIn de Bruno (FR + EN) : *"NAVLYS est désormais déposée à l'INPI. La méthode, l'argent, le rythme — tout est consigné."* (200 mots max, ton notaire de bord)
- Story Instagram (visuel sceau bronze + texte "NAVLYS™ marque déposée le [date]")
- Tweet de lancement (240 caractères max)
- Mail à éventuels partenaires brokers/banques annonçant le dépôt
- Tout dans `_SITES_MASTER/_COMM_LANCEMENT_BETA/`

### 🟡 Action C4 — Monitor automatique nouvelles publications BOPI (1 heure, livré sous 7 jours)
**Tâche** : mettre en place une veille hebdomadaire automatisée :
- Script ou tâche planifiée (Bash + cron sur Vercel/Netlify) qui :
  - Tous les vendredis 9h, récupère les publications BOPI INPI de la semaine
  - Cherche les marques contenant `navlys`, `navly`, `navelys`, `navilys`, `navbio`, `navia`, `navwebia` (regex flexible)
  - Si match → email à `bruno@navlys.com` + note `_JURIDIQUE_VEILLE_BOPI_AAAA-MM-DD.md`
- Compléter la tâche `veille-infra-navlys` existante avec ce nouveau check.

### 🔴 Action C5 — Conditionnelle : kit de pivot rebranding (si Action B4 confirme un blocage)
**Si et seulement si** un blocage juridique est confirmé après audit cabinet PI :
- Préparer en parallèle : nouveau logo, textes du site avec nouveau nom (sur les 3 candidats pré-réservés), DNS de bascule, redirections 301 prêtes à activer.
- Plan de migration sous 5 jours.
- Communication "évolution de marque" (jamais "changement obligé") en mode positif.

---

## 📊 TABLEAU DE BORD DES 48H

| Heure | Owner | Action | Statut |
|---|---|---|---|
| **J0 (29/05) 10h00-18h00** | Bruno | B1 — Vérif manuelle INPI + EUIPO (4 min) | ⏳ À faire |
| **J0 (29/05) 10h00-11h00** | Claude | C1 — Captures preuve antériorité (15 min) | ⏳ À faire |
| **J0 (29/05) 10h00-18h00** | Bruno | B3 — Pré-réservation 3 domaines secours (5 min, optionnel) | ⏳ À faire |
| **J+1 (30/05) 9h00-12h00** | Bruno | B2 — Dépôt INPI marque verbale (1 h, 430 €) | ⏳ Bloqué par B1 |
| **J+1 (30/05) 14h00-15h00** | Claude | C2 — Mise à jour mentions légales avec n° dépôt | ⏳ Bloqué par B2 |
| **J+1 (30/05) 15h00-16h00** | Claude | C3 — Kit communication lancement BETA | ⏳ À faire |
| **J+2 (31/05) toute la journée** | Bruno + Claude | Revue finale du site + tests + checklist J0 | ⏳ À faire |
| **J+2 (31/05) 23h59 Méditerranée** | — | 🚀 **Activation lancement BETA NAVLYS** | 🎯 Objectif |
| **J+7 (5/06) 9h00** | Claude | C4 — Premier rapport de veille BOPI automatisé | ⏳ À planifier |

---

## 🚨 SIGNAUX D'ALERTE QUI DÉCLENCHENT UNE ESCALADE IMMÉDIATE

Si l'un de ces signaux apparaît, **on stoppe le plan normal et on passe en mode urgence** :

- 🚨 Un dépôt INPI ou EUIPO actif est trouvé dans nos classes 36, 41 ou 42.
- 🚨 Une mise en demeure est reçue par mail ou courrier d'ici le 1ᵉʳ juin.
- 🚨 Le domaine `navlys.com` se met à afficher autre chose que le site de Bruno (intrusion / piratage / squat).
- 🚨 Un troll sur LinkedIn / X publie une prétention de propriété de la marque NAVLYS avec captures à l'appui.

**Procédure en cas d'alerte** :
1. Bruno me ping immédiatement (chat, WhatsApp).
2. On retire les actions B2, B3 du planning.
3. On audit la prétention en 24h.
4. Décision GO / NO-GO / REPORT publiée le 31/05 au plus tard.

---

## 📎 ANNEXE — LIBELLÉS DES CLASSES NICE (templates pour le formulaire INPI)

À copier-coller directement dans le formulaire M712 lors du dépôt.

### Classe 9
> Logiciels téléchargeables ; applications logicielles pour téléphones mobiles, tablettes et ordinateurs dans le domaine de l'éducation financière ; supports numériques de formation ; publications électroniques téléchargeables.

### Classe 35
> Services de publicité en ligne ; gestion de programmes d'affiliation commerciale dans le domaine bancaire, financier, assurantiel et de l'investissement ; services de marketing direct ; mise en relation commerciale via des sites Internet et applications mobiles ; gestion d'affaires commerciales pour le compte de tiers.

### Classe 36
> Services d'information financière à vocation éducative et pédagogique ; information sur les marchés boursiers à des fins de formation ; comparaison de produits financiers à des fins d'information non personnalisée ; à l'exclusion expresse de tout conseil personnalisé en investissement, de toute gestion d'actifs pour compte de tiers, et de toute activité réglementée nécessitant un agrément ACPR, AMF ou ORIAS.

### Classe 38
> Services de transmission électronique d'informations à vocation pédagogique ; messagerie électronique ; transmission de bulletins d'information par réseaux numériques ; services de notifications poussées via applications mobiles.

### Classe 41
> Éducation ; formation ; services de formation en matière financière à vocation pédagogique ; publication électronique de contenus pédagogiques ; organisation et conduite de webinaires, conférences et séminaires ; production audiovisuelle à vocation éducative ; informations en matière d'éducation.

### Classe 42
> Conception et développement de logiciels ; hébergement de sites informatiques ; conception, création et hébergement de sites web pour le compte de tiers ; mise à disposition temporaire de logiciels en ligne non téléchargeables (SaaS) ; conseils techniques dans le domaine du développement logiciel et des sites web.

### Classe 45
> Services de transmission successorale dématérialisée ; archivage à long terme de biographies et de documents personnels à des fins de transmission familiale ; services d'authentification de documents biographiques ; services juridiques et notariaux dématérialisés en lien avec la transmission de patrimoine immatériel.

---

> ⚓ Tous les ordres de manœuvre sont passés. Le pont de commandement attend tes vérifs Bruno (4 minutes), puis le dépôt INPI (1 heure). Après quoi le navire est paré pour appareiller le 1ᵉʳ juin à minuit.
