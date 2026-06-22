# CORRECTIONS CONFORMITÉ — validées par Bruno le 2026-06-19

> Statut : **VALIDÉES** (feu vert « vas y oui »). À appliquer à la source puis
> à redéployer **uniquement après feu vert prod explicite**. Les sites live ne
> sont PAS encore modifiés (aucun déploiement effectué).
>
> ✅ **Re-vérifié le 2026-06-22** (fetch Vercel, lecture seule) : les 4 corrections
> C-01→C-04 et les 404 /cgu /privacy sont **toujours présents en prod**.
> **Fichiers corrigés prêts à déployer** : `corrections-pretes/` (NON déployés).
> Date d'ouverture confirmée : **1ᵉʳ juillet 2026, 00:00 (heure de Paris)** →
> compte à rebours recalé sur `2026-06-30T22:00:00Z` (remplace la cible périmée du 1ᵉʳ juin).

## C-01 · navbiolife.com — retirer « Jérusalem » (meta description publique)
- **Avant** : `<meta name="description" content="NAVBIO · biographie vivante. Découverte officielle le 1ᵉʳ juin 2026 minuit Jérusalem.">`
- **Après** : `<meta name="description" content="NAVBIO · biographie vivante. Ta vie racontée, gardée, transmise.">`
- Raison : interdiction de mentionner Israël / Jérusalem en public + date périmée.

## C-02 · navbiolife.com — retirer « Jérusalem » (commentaire JS servi)
- **Avant** : `const TARGET = Date.parse('2026-05-31T21:00:00Z'); // 1 juin 00:00 Jérusalem`
- **Après** : `const TARGET = Date.parse('2026-05-31T21:00:00Z'); // date/heure de lancement`
- Note : timestamp inchangé (logique non touchée). ⚠️ Date à mettre à jour (périmée).

## C-03 · brunopartouche.com/bio — retirer la promesse de rendement
- **Avant** : `<p>Sur 5 ans de prix réels, ça donne une fourchette honnête : <strong>+8 à 12% par an, sans garantie</strong>, avec des semaines à -17% sur la pire fenêtre d'entrée.</p>`
- **Après** : `<p>Sur 5 ans de prix réels, ce qui compte n'est pas un chiffre promis : <strong>aucun rendement n'est garanti</strong>. Il y a des phases qui montent, d'autres franchement dans le rouge — et une méthode qui ne dévie pas quand le marché secoue.</p>`
- Raison : « +8 à 12% par an » = promesse de rendement (ligne rouge).

## C-04 · brunopartouche.com/bio — ajouter le disclaimer obligatoire (absent)
- Insérer avant le contenu du `<footer>` :
```html
<div style="max-width:780px;margin:0 auto;padding:18px 24px 0;font-style:italic;color:#7c8b95;font-size:14px;line-height:1.7;text-align:left">
NAVLYS est un projet d'éducation et de veille à vocation informative uniquement. Les contenus ne constituent en aucun cas un conseil personnalisé en investissement, ni une recommandation d'achat ou de vente. Chacun reste seul responsable de ses décisions financières.
</div>
```

## Reste à faire (non bloquant pour ces 4 corrections)
- ✅ Créer `/cgu` et `/privacy` sur navbiolife.com → **fichiers prêts** dans
  `corrections-pretes/navbiolife.com/` (à compléter : mentions éditeur, hors Git public).
- ✅ Compte à rebours navbiolife recalé sur le **1ᵉʳ juillet 2026** (fichier prêt).
  ⚠️ Reste à traiter les comptes à rebours des autres sites/teasers.
- Vérifier la home brunopartouche.com en entier (fetch tronqué) : aucun « Jérusalem/Israël/Ashkelon » résiduel.
- Confirmer policy RLS Supabase `inscriptions` = INSERT-only anon (pas de SELECT public).
