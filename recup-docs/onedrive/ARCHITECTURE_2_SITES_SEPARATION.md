# 🧱 ARCHITECTURE FINALE — 2 SITES, CLOISONNÉS (pare-feu Bruno ↔ NAVLYS)
> 22 mai 2026 · Décision Bruno : **tout concentrer sur DEUX sites**, et **supprimer tout lien entre Bruno Partouche et NAVLYS**. ⚠️ Ceci **remplace** l'ancienne doctrine « brunopartouche.com pointe vers NAVLYS ».

---

## Les deux sites (et rien d'autre)

### 🔵 SITE 1 — `brunopartouche.com` = **l'Homme**
Le phare personnel. Bruno, son parcours, sa crédibilité, sa vie.
- Biographie · Parcours / CV · Crédibilité / références · Galerie (voilier, Méditerranée) · Journal de bord · Musique / skipper / art de vivre · Contact.
- Logo : **la médaille bronze BRUNO PARTOUCHE** (ton portrait).
- ❌ **AUCUNE** mention de NAVLYS, aucune méthode 90/10, aucune offre, aucun simulateur, aucun lien vers navlys.com.

### 🟢 SITE 2 — `navlys.com` = **la Méthode** (impersonnel)
La marque produit dépersonnalisée. Éducation + outils.
- Méthode 90/10 · Trading Lab (argent virtuel) · Backtest interactif · Formules F1/F2/F3 · Communauté · Veille · Partenaires brokers · NOVA Live Bio (NAVBIO) · Évolutions.
- Logo : **la pièce bronze NAVLYS** (archère/Diane).
- ❌ **AUCUNE** mention de Bruno Partouche : ni nom, ni photo, ni biographie, ni « fondateur ». Aucun lien vers brunopartouche.com.

---

## Pourquoi ce pare-feu (et pourquoi c'est sain)
- Tu n'es **pas conseil en investissement**. En gardant ton **identité hors de NAVLYS**, NAVLYS reste un projet d'**éducation impersonnel** → tu te protèges juridiquement.
- brunopartouche.com peut parler de toi librement (l'homme) **sans** déclencher les obligations liées à une marque qui « montre comment gérer son argent ».
- Deux marques nettes = deux messages clairs, pas de confusion NOVA/NAVLYS/Bruno.

---

## 🔧 À FAIRE concrètement (pour le service WEB & TECH — quand tu valides)
Sur le **master brunopartouche.com** (actuel `subtle-cheesecake`) → **retirer et déplacer vers navlys.com** :
- les sections **NOVA / NAVLYS**, les **offres** (Zen/Précision/Boost ou F1/F2/F3), le **simulateur**, le **cockpit**, le **backtest**, les **partenaires brokers**, tout bouton « Découvrir NOVA ».
- les **liens sortants** vers navlys.com (nav, footer, CTA).

Sur le **master navlys.com** (actuel `ubiquitous-sherbet`, déjà propre) → **vérifier et retirer** :
- toute trace nominative de Bruno (page `/equipe`, « fondateur », photo, signature personnelle).
- tout lien vers brunopartouche.com.
- ⚠️ retirer aussi partout : **CIF / ORIAS / DFENSER** + **promesses de rendement** (voir `METHODE_RETENUE_ET_CALCULS.md` §3).

---

## Conformité commune (les deux sites)
- Mention « éducation / information uniquement, pas de conseil personnalisé, chacun responsable ».
- Aucune promesse de rendement ; chiffres présentés comme **illustrations** ou **potentiel**, jamais « acquis ».
- Apprentissage en **argent virtuel d'abord** (Trading Lab), passage au réel à la seule discrétion du membre majeur.

---

## Statut
🛑 **Rien n'est encore modifié ni déployé.** Ce document fixe la cible. Sur ton « go », je consolide les deux masters (BP nettoyé + NAVLYS vérifié) **en local d'abord**, tu valides, puis on déploie et on branche les DNS.

---
*Généré par l'assistant — à relire avant exécution. Information éducative, pas un conseil juridique ni financier.*
