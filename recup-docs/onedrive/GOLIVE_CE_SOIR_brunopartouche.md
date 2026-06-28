# 🚀 GO-LIVE CE SOIR — brunopartouche.com + NAVLYS

> Checklist mobile-friendly. Coche au fur et à mesure. Lancement officiel : 31 mai.
> Mise à jour : ce soir. Les étapes 🔵 sont faisables par Claude ; les 🟢 sont à toi (comptes, clés, DNS).

---

## ✅ DÉJÀ FAIT (par Claude, ce soir)

- [x] **Correction de la promesse dangereuse** sur `brunopartouche_index_MASTER.html` : la phrase « la formule est viable » → reformulée en « simulateur pédagogique, 70,5 % UNIQUEMENT sous hypothèse 55 %, à 50/50 l'avantage est nul ». (Sauvegarde : `brunopartouche_index_MASTER.BACKUP_*.html`)
- [x] **Audit conformité** du dossier de déploiement `brunopartouche-DEPLOY-v13` : disclaimers présents, mentions « garanti / sans risque » toutes légitimes.

---

## 🟢 ÉTAPE 0 — À VÉRIFIER PAR TOI (5 min, CRITIQUE avant publication)

- [ ] Ouvre `time-machine.html` et `offres.html` : elles disent « données réelles Yahoo Finance ».
  - Si les chiffres viennent VRAIMENT de Yahoo → OK, on garde.
  - Si c'est le jeu **simulé** (cf. `NAVLYS_BACKTEST_5ANS_PACK/data/SOURCE_DONNEES.txt` = « données calibrées simulées ») → **dis-le moi, je remplace « données réelles » par « simulation pédagogique »** sur toutes les pages. Sinon = promotion trompeuse.

---

## 🟢 ÉTAPE 1 — METTRE LE SITE EN LIGNE (15 min)

Le site est un dossier statique → le plus rapide = **Netlify Drop** (pas de code).

- [ ] Va sur **app.netlify.com/drop** (connecté à ton compte Netlify)
- [ ] Glisse le dossier `brunopartouche-DEPLOY-v13-seo-polish_1/brunopartouche.com/`
- [ ] Le site est en ligne sur une URL `xxxx.netlify.app` → vérifie qu'il s'affiche
- [ ] Dans **Site settings → Domain management → Add custom domain** : `brunopartouche.com`

> 🔵 Claude peut te préparer un ZIP propre prêt à glisser si tu veux (demande-le).

---

## 🟢 ÉTAPE 2 — DNS NAMECHEAP (10 min, propagation jusqu'à 24 h)

- [ ] Namecheap → Domain List → `brunopartouche.com` → **Manage → Advanced DNS**
- [ ] Ajoute les enregistrements donnés par Netlify :
  - `A` record `@` → IP Netlify (75.2.60.5 par défaut, **suis ce que Netlify affiche**)
  - `CNAME` `www` → `xxxx.netlify.app`
- [ ] Idem pour **navlys.com** (pointer vers son hébergement)
- [ ] Active **HTTPS / SSL** dans Netlify (Let's Encrypt, automatique une fois le DNS propagé)

---

## 🟢 ÉTAPE 3 — RÉFÉRENCEMENT / SEO (20 min) — pour apparaître en recherche

- [ ] **Google Search Console** (search.google.com/search-console) → Ajouter la propriété `brunopartouche.com`
- [ ] Vérifier la propriété (via DNS TXT Namecheap ou balise HTML)
- [ ] Soumettre le **sitemap** : `brunopartouche.com/sitemap.xml` (vérifie qu'il existe dans le dossier ; sinon 🔵 Claude le génère)
- [ ] **Demander l'indexation** de la page d'accueil (bouton « Inspecter l'URL » → « Demander l'indexation »)
- [ ] Idem pour **navlys.com**
- [ ] Vérifier les balises `<title>`, `<meta description>`, Open Graph (🔵 Claude peut auditer/compléter)

---

## 🟢 ÉTAPE 4 — CONNEXION ALPACA (paper) (5 min) — données live + démo virtuelle

- [ ] Crée/ouvre ton compte **alpaca.markets** → génère une clé **Paper Trading**
- [ ] Dans l'app NAVLYS / page `app.html` → « Connecte Alpaca » → colle **TA** clé (stockée chiffrée en local, Claude n'y touche pas)
- [ ] Lance une session paper → c'est ça, ton vrai test « argent virtuel, marché réel »

> ⚠️ Claude ne saisit JAMAIS tes clés API ni mots de passe (règle de sécurité). Ces 5 min sont à toi.

---

## 🔵 CE QUE CLAUDE PEUT ENCHAÎNER MAINTENANT (sans attendre)

- [ ] Générer un **ZIP propre** prêt pour Netlify Drop
- [ ] Auditer/compléter les **balises SEO** (title, meta, OG, sitemap, robots.txt) de toutes les pages
- [ ] Reformuler les pages si Étape 0 = données simulées
- [ ] Préparer le **backtest honnête jour/semaine/mois/an** dès que tu fournis un CSV réel ou la session Alpaca

---

## 🧭 RAPPEL DE POSITIONNEMENT (ton angle qui VEND sans risque juridique)

NAVLYS = **protection du capital d'abord** : 90 % à l'abri (bons du Trésor ~5 %/an), 10 % en poche active disciplinée et plafonnée. Une méthode pédagogique, un cap par jour, une main humaine. **Pas** « un algorithme martingale qui gagne ». C'est honnête, c'est rare, et ça rassure — c'est ça qui convertit.
