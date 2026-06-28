# 🔍 AUDIT COMPLET DES SITES LIVE — 2026-06-28

> Lecture en ligne de **14 URLs** (13 répondent, `brunopartouche-teaser` = 404 mort).
> But : préparer la consolidation sur **un seul site propre = navlys.com**.
> Aucune donnée inventée. Sert de base au plan `docs/PLAN-SITE-GLOBAL-NAVLYS.md`.

## A. Inventaire par site

### navlys.com (8 pages)
| Page | But | Charte | Conformité |
|---|---|---|---|
| `/` | Carte de l'univers (CORE + modules) | ❌ `#5fe0ff` (ancien) + polices Cormorant/Fraunces/Lora | Disclaimer OK · 18+ OK · `navlys-alive.js` |
| `/finance` | Cockpit/brief + simulateur 90/10 | ❌ `#5fe0ff` | Disclaimer fort OK · simulateur « illustration pédagogique » · watchlist nominative « suivi pas conseil » à surveiller |
| `/next-gen` | Écrire/dicter sa vie (gratuit→9,99€ HT) | ❌ `#5fe0ff` | Disclaimer OK · dictée vocale · paywall 5 chapitres |
| `/navlex` | Q/R juridique (3 offertes→9,99€ HT) | ❌ `#5fe0ff` | « pas un conseil d'avocat » OK · API `/api/navlex` |
| `/influenceurs` | Journal créateurs IA | ❌ `#5fe0ff` | Disclaimer OK · bloc « Flash partenaire » placeholder |
| `/tech` | Journal de l'IA | ❌ `#5fe0ff` | Disclaimer OK · liens sources |
| `/radio` | Lecteur YouTube/Spotify | ❌ `#5fe0ff` | Pas de 18+ / pas de disclaimer éducatif (page média) |
| `/bientot` | Placeholder noindex | ❌ `#5fe0ff` | noindex OK |

### Autres sites
| Site | But | Charte | Conformité |
|---|---|---|---|
| **navlys.io** | Vitrine famille + **19 partenaires affiliés** + studio | ✅ `#7DD3FC` + Cinzel/Cormorant/JetBrains | Disclaimer OK · pas de 18+ · liens `?ref=BP001` massifs · emails corp exposés · slogan « Votre argent · Votre tempo » |
| **navbiolife.com** | Landing NAVBIO + countdown | ✅ `#7DD3FC` | 🔴 « 1ᵉʳ juin minuit **Jérusalem** » (meta) · countdown expiré · WhatsApp exposé · pas de 18+ |
| **brunopartouche.com** | Hub perso (BRUNO COIN, 90/10, partenaires, FAQ) | ✅ `#7DD3FC` | Disclaimer OK · pas de 18+ · countdown 1ᵉʳ juin (passé) · slogan « Votre argent · Votre tempo » |
| **brunopartouche.com/bio** | Bio narrative (démo NAVBIO) | ✅ `#7DD3FC` | 🔴 « **+8 à 12 % par an** », « -17 % » (chiffre de rendement) |
| **navlys-teaser** | Teaser countdown | ❌ `#5fe0ff` violet/fuchsia | countdown **15 juin** (3ᵉ date !) · CTA → navlys.io |
| **brunopartouche-teaser** | — | **404 mort** | à supprimer |

### ⚠️ Point critique charte
- **Conforme** (`#7DD3FC` + Cinzel/Cormorant/JetBrains) : navlys.io, navbiolife, brunopartouche.
- **NON conforme** (`#5fe0ff` + Fraunces/Lora) : **TOUT navlys.com** + le teaser.
- → Ironie : le **site maître navlys.com n'est PAS à la charte officielle**.

## B. Doublons / chevauchements
1. Cartes « famille » répétées **3×** (navlys.io, brunopartouche, accueil navlys.com).
2. **19 partenaires en double** : navlys.io ET brunopartouche.com/partenaires (ambiguïté déperso).
3. Bio de Bruno en double (bruno/bio + profil navlys.io + hero brunopartouche).
4. NAVBIO présenté **4×** (dont un nœud dans le SVG de navlys.com → mélange marque).
5. **3 countdowns, 3 dates contradictoires** : 1ᵉʳ juin / 15 juin / (+ 1ᵉʳ juillet dans CLAUDE.md).
6. « Journal du jour » de /finance tease /tech et /influenceurs (redondance).
7. navlys.io « site builder » : rôle flou vs navlys.com.

## C. Sitemap unique recommandé — navlys.com
> brunopartouche.com et navbiolife.com restent **séparés** (liens sortants only).

| Page finale | Source | Action |
|---|---|---|
| `/` | accueil actuel | **Refonte charte `#7DD3FC` + Cinzel/JetBrains** ; retirer nœud NAVBIO du SVG (→ lien) |
| `/finance` | actuel | Conserver + charte |
| `/next-gen` | actuel | Conserver + charte |
| `/navlex` | actuel | Conserver + charte ; vérifier `/api/navlex` |
| `/journal` | fusion `/tech` + `/influenceurs` | Regrouper les 2 journaux |
| `/radio` | actuel | Conserver + charte |
| `/partenaires` | section navlys.io | **Rapatrier** sous marque déperso (affiliation transparente) |
| `/communaute` | Nas.io + CLAUDE.md | Page Équipage Navlys (manquante) |
| `/mentions` `/cgu` `/confidentialite` | à créer | **Manquant — obligatoire avant lancement** |
| `/bientot` | actuel | Garder (noindex fallback) |

## D. À retirer / rediriger
- **navlys-teaser** → débrancher + 301 vers navlys.com.
- **brunopartouche-teaser** → déjà 404 : supprimer le projet Vercel.
- **navlys.io** → recommandation : **fusionner dans navlys.com** puis rediriger navlys.io → navlys.com.
- **brunopartouche.com/partenaires** → ne garder qu'un renvoi vers navlys.com/partenaires.
- **SVG accueil navlys.com** → retirer le module NAVBIO (lien sortant only).

## E. Alertes conformité prioritaires
1. 🔴 « **Jérusalem** » dans navbiolife.com (meta) → retirer.
2. 🔴 « **+8 à 12 % par an** » / « -17 % » sur brunopartouche.com/bio → reformuler/supprimer (risque AMF).
3. 🔴 **Charte non conforme** sur tout navlys.com → aligner `#7DD3FC` + Cinzel/JetBrains.
4. 🟠 **Dates de lancement incohérentes** (1 juin / 15 juin / 1 juillet) → trancher + unifier.
5. 🟠 **« 18+ » absent** sur navlys.io, navbio, bruno, /radio, teaser → ajouter partout.
6. 🟠 **Slogan non figé** (« Votre argent · Votre tempo ») → « Ma méthode, ton argent, ton rythme ».
7. 🟠 **Affiliation `?ref=BP001` sous marque déperso** (navlys.io) → encadrer (Bruno invisible sur NAVLYS).

**Technique** : `navlys-alive.js` (voix) sur 7 pages navlys.com · `/api/navlex` · reconnaissance vocale /next-gen · iframe /radio · WebAudio bruno+teaser · scripts cockpit sur les sites à charte.
</content>
