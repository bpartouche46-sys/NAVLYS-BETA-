# 🌙 RAPPORT NUIT NAVLYS — 26→27 mai 2026
*Audit + travail autonome IA · Tous sites & apps · FR + EN*
*Démarré : 26 mai 2026, soir · Mise à jour continue*

---

## 📊 ÉTAT DES LIEUX — AUDIT LIVE

### Domaines + SSL (HTTPS) — 1/8 OK

| Domaine | DNS | HTTP | HTTPS | Vercel project | Statut |
|---|---|---|---|---|---|
| 🌊 **navlys.com** | ✅ | ✅ 200 | ✅ **200** | navlys-app | **LIVE** |
| 🌊 navlys.app | ✅ | ❌ 404 | ❌ 000 | — | ⚠️ pas attaché à projet Vercel |
| 🌊 navlys.io | ✅ | ❌ 404 | ❌ 000 | — | ⚠️ pas attaché à projet Vercel |
| 🌊 navlys.net | ✅ | ❌ 404 | ❌ 000 | — | ⚠️ pas attaché à projet Vercel |
| 🌊 navlys.org | ✅ | ❌ 404 | ❌ 000 | — | ⚠️ pas attaché à projet Vercel |
| 🧬 navbiolife.com | ✅ | ✅ 200 | ❌ 000 | navbio | ⏳ SSL en attente |
| 🧬 navbiolive.com | ✅ | ✅ 200 | ❌ 000 | navbio (alias) | ⏳ SSL + redirect à config |
| ⚓ brunopartouche.com | ✅ | ✅ 200 | ❌ 000 | brunopartouche | ⏳ SSL en attente |

**Conclusion DNS/SSL** :
- ✅ DNS propagé sur les 8 domaines (216.198.79.1)
- ⏳ 3 domaines (navbiolife, navbiolive, brunopartouche) attendent Let's Encrypt (auto, 10-30 min en général)
- 🔴 4 domaines (navlys.app/io/net/org) **ne sont pas encore attachés à un projet Vercel** → c'est pourquoi ils 404 même en HTTP. Action requise : ajout via API Vercel (besoin token).

---

### Pages clés navlys.com

| Page | Statut | Taille |
|---|---|---|
| `/` (home gate) | ✅ 200 | 753 KB |
| `/fr/methode` | ✅ 200 | 16.6 KB |
| `/en/method` | ✅ 200 | 15.5 KB |
| `/fr/histoire-bourse` | ✅ 200 | 17.6 KB |
| `/en/history` | ❌ 404 | — |
| `/en/stock-history` | ❌ 404 | — |
| `/univers` | ❌ 404 | — |
| `/univers.html` | ❌ 404 | — |
| `/cockpit3` | ❌ 404 | — |
| `/cockpit3.html` | ⚠️ 308 → 404 | — |
| `/simulation` | ❌ 404 | — |
| `/simulation.html` | ⚠️ 308 → 404 | — |
| `/resultats` | ❌ 404 | — |
| `/cockpit.js` (widget) | ✅ 200 | 15.5 KB |
| `/launch-offer.js` (widget) | ✅ 200 | 4.8 KB |
| `/nav-pyramid.js` (widget) | ✅ 200 | 3.8 KB |

**Conclusion navlys.com** :
- ✅ Home + encyclopédie FR complète + méthode EN
- ❌ **Encyclopédie EN manquante** : pas de `/en/history` (équivalent de `/fr/histoire-bourse`)
- ❌ **4 pages cockpit/univers/simulation/resultats mentionnées dans CLAUDE.md** → 404, jamais déployées (ou supprimées). À recréer si demandées.

---

### Widgets présents sur les sites

| Widget | navlys.com | navbiolife.com | brunopartouche.com |
|---|---|---|---|
| FR/EN switcher | ✅ (4 markers) | ❌ | ❌ |
| Pyramide widget | ✅ | ❌ **MANQUE** | ❌ **MANQUE** |
| Cockpit animé | ✅ (4 refs) | ⚠️ 1 ref seulement | ✅ (4 refs) |
| Launch offer escalator | ✅ | ✅ | ✅ |

**Conclusion widgets** :
- 🔴 **Pyramide widget à propager** sur navbiolife.com + brunopartouche.com
- 🔴 **Switch FR/EN à ajouter** sur navbiolife.com + brunopartouche.com
- ⚠️ **Cockpit navbiolife à enrichir** (1 seule référence = probablement pas le widget complet)

---

## 🛠️ TRAVAIL EN COURS (autonome, sans token Vercel)

### ✅ Fait
- Audit live de tous les domaines
- Audit pages clés navlys.com
- Audit widgets sur les 3 sites principaux
- Audit traductions FR/EN

### 🔄 En cours (cette nuit)
1. **Préparer enrichissement cockpit.js v3** : ajout étoiles filantes + oiseaux + halo lune + vagues sur les 4 thèmes (voilier/avion/voiture/vaisseau)
2. **Préparer page `/en/history`** = traduction EN de `/fr/histoire-bourse`
3. **Préparer navbiolife.com v2** = ajout pyramide widget + FR/EN switcher + cockpit complet
4. **Préparer brunopartouche.com patch** = ajout pyramide widget + FR/EN switcher
5. **Préparer hreflang SEO** sur navlys.com (pour bons signaux Google)

### ⏸ Bloqué (besoin Vercel token in-session)
- Attacher navlys.app/io/net/org au projet navlys-app + redirect 308 → .com
- Configurer navbiolive.com en redirect 308 → navbiolife.com
- Pousser tous les patches préparés ci-dessus
- Force renew SSL si bloqué

---

## 🎯 LES 5 ACTIONS BRUNO POUR DÉBLOQUER

1. **Reposter le Vercel token in-session** → débloquer tous les déploiements
2. **DNS chez autres registrars** : navlys.co.il + .fr + .us (mêmes 2 lignes A `@`→216.198.79.1 + CNAME www→cname.vercel-dns.com.)
3. **Patienter SSL Let's Encrypt** sur navbiolife/navbiolive/brunopartouche (auto, 10-30 min)
4. **OAuth Google + Facebook** (~10 min, débloque inscriptions sociales)
5. **Signer IA partenaires** (critique pour NAVWEBIA)

---

## 🐛 BUGS / CORRECTIONS DÉTECTÉS

### Critiques
- **navbiolife.com** = site très minimal (9.9 KB), bien plus pauvre que navlys.com (753 KB). Manque : navigation, header complet, footer, /fr-/en, méthode, encyclopédie, pyramide.
- **navlys.app/io/net/org** = 404 universel, pas dans Vercel. Risque : si quelqu'un les tape, mauvaise première impression.

### Moyennes
- **Encyclopédie EN incomplète** : `/en/history` manquant alors que `/fr/histoire-bourse` existe → asymétrie linguistique.
- **Pages cockpit/univers/simulation orphelines** : référencées en mémoire mais 404 en prod.
- **navbiolive.com sert le même contenu que navbiolife.com** : devrait être un redirect 308 pour SEO.

### Mineures
- **Pas de hreflang** sur navlys.com → Google peut mal indexer FR vs EN.
- **Pas de sitemap.xml visible** → SEO sous-optimal.

---

## 🌐 AUDIT TRADUCTIONS FR ↔ EN

### `/fr/methode` ↔ `/en/method` — ✅ ALIGNÉ
- 1076 mots FR / 994 mots EN (delta 8% — normal compression FR→EN)
- Headings 1:1 :
  - 90 — La Forteresse → 90 — The Fortress
  - 10 — Le Cap Plaisir → 10 — The Pleasure Cape
  - Dimensionner façon Kelly fractionné → Size it the fractional-Kelly way
  - Étaler sur plusieurs valeurs → Spread across several names
  - Le stop discipliné — et ses limites → The disciplined stop — and its limits
  - Trois interdits absolus → Three absolute bans
- **Verdict : translation quality OK, pas de retouche urgente.**

### `/fr/histoire-bourse` ↔ `/en/history` — ❌ EN ABSENT
- 1352 mots FR, 10 H2 sections + 5 H3 takeaways
- Sections FR à traduire :
  1. L'invention de l'action
  2. La folie a précédé la science
  3. Le hasard entre dans l'équation
  4. Le krach et la règle
  5. Le risque devient une mathématique
  6. La formule qui créa un monde
  7. L'efficience et la turbulence
  8. Pourquoi prédire s'auto-détruit
  9. La finance redevient comportementale
  10. Indices, algorithmes, décentralisation
- Take-aways FR (à traduire aussi) :
  - La Bourse transfère la richesse de l'impatient vers le patient
  - Le cycle de la peur et de l'avidité ne change jamais
  - On ne prévoit pas la direction — on gère le risque
  - L'humilité est la seule vertu rentable à long terme
  - La machine gère les dés, l'humain choisit la partie
- **Action prép : traduction EN à écrire (~1300 mots), même structure HTML, déploiement quand token reçu.**

### navbiolife.com & brunopartouche.com — ❌ MONOLINGUES
- Aucun marker FR/EN détecté sur les 2 sites.
- navbiolife.com = 9.9 KB seulement (très pauvre vs navlys.com 753 KB)
- brunopartouche.com = 490 KB (riche en visuel mais monolingue)
- **Action prép : ajouter switcher FR/EN inline (toggle simple) + duplication contenu.**

---

## 🎨 ENRICHISSEMENT COCKPITS v3 (préparation)

Cockpit v2 actuel = `cockpit.js` 15.5 KB, 4 thèmes (voiture/avion/voilier/vaisseau).

**v3 à préparer** (ajouts par thème) :
- 🚗 **Voiture** : phares qui balayent + reflets pluie + sillage néon
- ✈️ **Avion** : nuages traversants + trainée vapeur + horizon courbe
- ⛵ **Voilier** : oiseaux silhouettes + vagues animées + halo lune dansant
- 🚀 **Vaisseau** : étoiles filantes accélérées + nébuleuses + cockpit HUD style

**Optimisations transverses** :
- Particules canvas Retina-ready (devicePixelRatio)
- Crossfade entre cockpits plus fluide (1s ease-in-out)
- Persistance choix utilisateur (localStorage `cockpit-chosen`)
- Bouton "muet animations" (accessibilité)

---

## 📁 ASSETS PRÊTS POUR DÉPLOIEMENT (matin)

Une fois le Vercel token reposté :

| Asset | Cible | Action |
|---|---|---|
| `/en/history.html` | navlys.com | upload + add to vercel.json cleanUrls |
| `nav-pyramid.js` (déjà déployé) | navbiolife + brunopartouche | inject `<script>` tags dans index |
| `cockpit.js` v3 | navlys + navbiolife + brunopartouche | replace file |
| FR/EN switcher | navbiolife + brunopartouche | inject dans header |
| Redirect navbiolive→navbiolife | Vercel project navbio | API call alias + redirect |
| Add 4 variants à navlys-app | navlys.app/io/net/org | API call domain attach |
| hreflang tags | navlys.com FR/EN pages | inject `<link rel=alternate>` |

---

## 🚦 STATUT BOTTLENECK

**Bottleneck unique = Vercel token in-session.**

Sans lui, ce qui est fait :
- ✅ Audit live complet
- ✅ Rapport détaillé
- ✅ Plan d'action priorité
- ⏳ Préparation assets (en cours)

Avec lui, débloque immédiatement :
- 🚀 Déploiement /en/history.html (5 min)
- 🚀 Attache 4 variants .net/.org/.app/.io (5 min)
- 🚀 Redirect navbiolive → navbiolife (3 min)
- 🚀 Patch navbiolife.com v2 (15 min)
- 🚀 Patch brunopartouche.com (10 min)
- 🚀 Déploiement cockpit v3 (10 min)

**Total : 1h de déploiement chaîné dès token reçu.**

---

## 📝 PROCHAINES MISES À JOUR

Ce fichier est enrichi en continu pendant la nuit :
- ⏳ Traduction EN de histoire-bourse (en cours d'écriture)
- ⏳ navbiolife.com v2 prep (en cours)
- ⏳ Cockpit v3 prep
- ⏳ Captures Chrome (si Chrome MCP activé)
- ⏳ Liens cassés / 404 internes inventaire

---

*Dernière mise à jour : 26 mai 2026, ~17h30 UTC · audit + plan complets · prep assets en cours*
