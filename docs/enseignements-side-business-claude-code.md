# Side business avec Claude Code (vidéo « Les Wizards », juillet 2026) — enseignements pour NAVLYS

> Note d'apprentissage. Source : vidéo YouTube suivie par Bruno le 2026-07-10 —
> **« Les meilleurs SIDE BUSINESS à lancer avec CLAUDE CODE en 2026 »**, chaîne
> **Les Wizards** ([youtu.be/-Qmm47-nS7g](https://youtu.be/-Qmm47-nS7g)).
>
> **Limite de méthode assumée (doctrine : preuve avant parole, rien d'inventé)** :
> l'API player et l'oEmbed YouTube renvoient un 403 depuis cet environnement
> (règle n°45 — verrouillage anti-robot pour toute IP datacenter). Je n'ai donc
> **pas** la transcription mot à mot de la vidéo. Ce document s'appuie sur la
> synthèse de recherche web (titre confirmé, chaîne, blog public `leswizards.com`)
> — pas sur l'audio intégral. Là où un point n'est pas certain, c'est dit.
>
> **Sécurité (règle n°111)** : rien à « installer » techniquement ici. La vidéo
> promeut une formation payante (« Wizards Academy ») — **aucune inscription,
> aucune connexion externe ouverte** (seule connexion autorisée = Bruno). On ne
> retient que les conseils, filtrés par la doctrine NAVLYS.

---

## 1. Ce que dit la vidéo (modèle « Wizards »)

La chaîne enseigne un modèle de revenus en ligne : **sites de niche SEO** dont la
production est **automatisée avec Claude Code** (prompts + scripts prêts à l'emploi),
monétisés par :

1. **Affiliation** — présentée comme le levier phare : anonymat, revenu passif, pas
   de stock, « on lance un site et le revenu tombe ».
2. **Vente de liens** sur sites d'autorité — jusqu'à ~3 000 €/article annoncés.
3. **YouTube** comme canal d'acquisition.
4. **Automatisation Claude Code** — télécharger des prompts, « installer son serveur
   100 % automatiquement », produire des sites de niche à l'échelle sans compétence
   technique avancée.

---

## 2. Le tri par la doctrine NAVLYS (retenu / adapté / rejeté)

| Conseil de la vidéo | Verdict NAVLYS | Raison |
|---|---|---|
| **Affiliation = revenu passif, sans stock** | ✅ **Aligné, déjà en route** | NAVLYS a déjà `/ambassadeur`, `/booster`, l'onglet « 🎁 Cadeaux », et la **commission à vie sur les abonnés enrôlés** (commit `330d8a6`). La vidéo valide la direction — pas une nouveauté, un renfort. |
| **SEO / sites d'autorité** | ✅ **Retenu — c'est le vrai levier** | Rejoint le chantier « zéro erreur navlys.com » et surtout le **problème d'indexation** déjà identifié par la Bible (règle n°76 : domaine récent, peu de backlinks — pas une panne). Action concrète qui dépend de Bruno : soumettre `sitemap.xml` à Google Search Console + Bing Webmaster Tools. |
| **Automatiser la production avec Claude Code** | ✅ **Déjà notre cœur** | C'est exactement la doctrine NAVLYS : orchestrer les IA (14 agents + edge functions + pg_cron 24/7). La vidéo décrit à petite échelle ce que le CORE fait déjà. Aucune brique tierce à ajouter. |
| **YouTube comme canal** | ✅ **Adapté** | Cohérent avec la doctrine Manus « montrer, pas raconter » (règle n°113) et la **veille YouTube influenceurs** déjà en place (brique `youtube`, cron). Une démo courte qui montre l'agent *faire*, un seul CTA. |
| **Vente de liens (~3 000 €/article)** | ❌ **Rejeté** | Incompatible **statut simple citoyen** + doctrine d'**accessibilité (0 €, cotisation jamais prix)** + charte anti-rareté-payante (règle n°113). NAVLYS ne vend pas de placement. |
| **Wizards Academy (formation payante)** | ⏸️ **Non souscrit** | Doctrine « seule connexion = Bruno » (règle n°111) + Bible §6 (aucun débit sans validation d'UNE ligne). Rien à acheter, rien à connecter. |

---

## 3. Actions concrètes qui en découlent (sans rien réinventer)

Ces enseignements **ne créent pas de nouveau chantier** — ils **confirment et
priorisent** ce qui est déjà gravé :

1. **SEO/indexation = priorité de croissance.** Le levier n°1 de la vidéo pointe le
   même mur que la Bible : NAVLYS répond 200 OK, robots.txt ouvert — le sujet est
   l'**indexation**, pas la technique. → Dépend de Bruno : vérif de propriété du
   domaine + soumission sitemap (Search Console / Bing). Signalé, pas simulé.
2. **Affiliation déjà armée** — continuer d'affiner `/ambassadeur` + `/booster`
   (clés i18n manquantes, capter le `?code=` de parrainage à l'inscription — déjà
   au fil rouge cap 1000→1M).
3. **Contenu « montrer pas raconter »** — toute future vidéo/short NAVLYS montre un
   geste réel (une phrase dite → un résultat visible), un seul CTA (règle n°113).
4. **Rien de la partie « payant/vente de liens » n'est retenu** — hors doctrine.

---

## 4. À graver en base (quand le CORE est joignable)

Pour ne pas re-trier ces conseils à la prochaine vidéo du même type, ingérer ce
retour par le pipeline habituel `bible` (`POST {source:'youtube-wizards', texte:…}`)
et, le cas échéant, `navlys_regle()` : **« Conseils SEO/affiliation/automatisation
Claude Code externes → aligner sur la doctrine existante ; rejeter systématiquement
vente de liens et rareté payante (statut simple citoyen + accessibilité). »**
