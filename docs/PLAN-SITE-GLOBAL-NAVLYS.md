# 🧭 PLAN — navlys.com propre & global (consolidation, 2026-06-28)

> **Décision Bruno (2026-06-28)** : *« Je veux un site propre navlys.com qui reprend tous les
> autres sites en vrac et réorganise tout sur navlys.com. Partir sur un système clair et propre. »*
>
> Règle gravée respectée : **dépersonnalisation** → `brunopartouche.com` (perso) et **NAVBIO**
> (produit distinct) restent des sites **séparés**, simplement **reliés** depuis navlys.com.

---

## 1. Ce qui existe aujourd'hui (audit live 2026-06-28)

| Site | Rôle réel | Sort dans le plan |
|------|-----------|-------------------|
| **navlys.com** (navlys-app) | Site maître : Finance, Next Gen, NAVLEX, Influenceurs, Journal IA, Radio + voix `navlys-alive.js` | ✅ **devient LE site global** |
| **navlys.io** | Vitrine « phare » : 19 partenaires + profils + studio | ➡️ **absorbé** dans navlys.com puis **redirigé** |
| **navlys-teaser** | Vieux teaser (sans domaine) | ➡️ **retiré / redirigé** vers navlys.com |
| **brunopartouche-teaser** | Vieux teaser (pas live) | ➡️ **retiré / redirigé** vers brunopartouche.com |
| **navbiolife.com** (navbio) | Produit biographie distinct | 🔗 **reste séparé**, relié en pied de page |
| **brunopartouche.com** | Site perso de Bruno | 🔗 **reste séparé** (règle déperso), relié |

> ⚠️ Constat : `live-source/` (dans ce dépôt) contient la source de navlys.com **déjà corrigée
> à la charte `#7DD3FC`**, mais le **live affiche encore l'ancien `#5fe0ff`** → la version
> propre **n'a jamais été déployée**. Le déploiement propre corrige déjà ça.

---

## 2. Structure cible de navlys.com (sitemap propre)

```
navlys.com/
├── /              Accueil — CORE + univers (charte #7DD3FC, slogan figé)
├── /finance       NAVLYS Finance (gratuit 0 €)
├── /next-gen      NAVLYS Next Gen (gratuit 0 €)
├── /navlex        NAVLEX (droit)
├── /partenaires   ⭐ NOUVEAU — les 19 partenaires (repris de navlys.io)
├── /influenceurs  Journal influenceurs
├── /tech          Journal de l'IA
├── /radio         Radio
└── pied de page   Famille NAVLYS → NAVBIO (navbiolife.com) · Bruno (brunopartouche.com)
                   + liens légaux + disclaimer (règle gravée 6)
```

**Slogan figé à appliquer partout** : *« Ma méthode, ton argent, ton rythme. »* (tutoiement).
Remplacer les variantes résiduelles (« Votre argent · Votre tempo » de navlys.io).

---

## 3. Consolidation — où va chaque chose

| Contenu source | Vient de | Va dans navlys.com |
|----------------|----------|--------------------|
| **19 partenaires** (affiliation BP001) | navlys.io §partenariats | **/partenaires** (nouvelle page) |
| Profils / e-mails corporate | navlys.io §profils | pied de page « contact » (sobre) |
| Projets « studio » (apps en build) | navlys.io §studio | **/tech** ou bloc « bientôt » de l'accueil |
| Liens famille (NAVBIO, Bruno) | navlys.io nav | **pied de page** de navlys.com |

### Liste des partenaires capturée (à re-vérifier : page annonce « 19 », 15 listés)
- **Brokers actions & ETF** : Alpaca (BP001), eToro (BP001), Trade Republic, Bourse Direct
- **Crypto** : Bybit (BP001), OKX (BP001), Kraken
- **Néo-banques & cash** : Revolut (BP001), Wise (BP001), BoursoBank
- **Outils & communauté** : Nas.io, Notion (BP001), Vercel (BP001), Stripe
> ❓ 4 partenaires manquants pour atteindre 19 → à retrouver (autre page / mémoire). Ne pas inventer.

---

## 4. Redirections (les sites « en vrac » pointent vers le propre)

| Ancien | Redirige vers |
|--------|---------------|
| navlys.io (tout) | navlys.com (et /partenaires pour la section partenaires) |
| navlys-teaser.vercel.app | navlys.com |
| brunopartouche-teaser.vercel.app | brunopartouche.com |

> Mise en place via `vercel.json` (redirects) ou domaine pointé. **Ne rien supprimer** (règle
> gravée 8) : on **redirige**, on archive, on n'efface pas sans OK Bruno + backup.

---

## 5. Ordre de construction (sûr, étape par étape)

1. ✅ **Source déjà présente** (`live-source/`) + navlys.io audité (partenaires identifiés).
2. ⬜ **Bâtir `/partenaires`** sur navlys.com (charte, disclaimer, mention affiliation).
3. ⬜ **Nettoyer l'accueil** : appliquer slogan figé + relier famille en pied de page.
4. ⬜ **Contrôle conformité (gardien)** : zéro promesse, disclaimer partout, pas de termes
   interdits (grep HTML+JS+CSS), charte `#7DD3FC`, dépersonnalisation OK.
5. ⬜ **Déployer en PREVIEW** sur Vercel → Bruno regarde le lien (mobile/PC).
6. ⬜ **Promouvoir en PRODUCTION** (Claude autonome, après gardien — cf. `AUTONOMIE-CLAUDE.md`).
7. ⬜ **Brancher les redirections** des anciens sites.
8. ⬜ **Archiver/retirer** les doublons (repos NOVA-HUB-1, gdp-dashboard-1/2…) — OK Bruno + backup.

> 🛟 Filet : le dernier déploiement navlys-app est « rollback candidate » → retour arrière en 1 geste.
> 💰 Argent / ⚖️ juridique = Bruno (inchangé). Un seul déploiement à la fois (règle gravée 7).
</content>
