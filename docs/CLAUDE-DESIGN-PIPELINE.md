# 🎨 CHAÎNE DE DESIGN « CLAUDE DESIGN » — recette réutilisable

> But (principe ZÉRO RÉPÉTITION) : ne plus jamais redécouvrir comment produire un
> visuel fini NAVLYS. Cette recette a été **testée le 2026-06-24** et fonctionne.

---

## 1. Ce que Claude PEUT faire (capacité confirmée)

Claude peut **créer un visuel fini en HTML autonome** (charte NAVLYS) puis l'**envoyer
comme document éditable** vers **Adobe Express** (compte Adobe `bpartouche46@gmail.com`,
type `auth` = complet → l'export fonctionne). Connecteurs aussi disponibles : **Vercel,
Figma, Canva**.

⚠️ **Ce que Claude NE peut PAS faire** : ouvrir un lien de partage `claude.ai/design/p/…`
(page protégée, navigateur humain uniquement). Pour exploiter un design fait dans
l'app Claude Design, il faut utiliser le menu **« Send to → Adobe Express »** côté
claude.ai (qui appelle `import-claude-design-from-url`), pas coller le lien dans le chat.

## 2. Format « canvas fixe » vs « site web »

| Type | Outil | Exemple |
|------|-------|---------|
| **Canvas fixe** (visuel à poster/imprimer) | Adobe Express (cette recette) | carte réseaux sociaux, flyer, slide, story |
| **Site web responsive** | rester en HTML / Vercel | les 4 maquettes `sites/*` (PAS Express) |

Les pages des sites NAVLYS sont **responsives** → elles ne passent pas par Express ;
elles restent du HTML déployé (Vercel). Express = pour les **visuels marketing**.

## 3. La recette (étapes testées)

1. `adobe_mandatory_init` (obligatoire avant tout outil Adobe).
2. `create_visual_design_express_skill` → lire le playbook (canvas fixe).
3. `get_account_type` → doit être `auth` (sinon : reconnecter le connecteur Adobe).
4. `font_recommend` (⚠️ params = **chaînes**, ex. `moods: "elegant, cinematic"`, PAS des listes).
5. `get_fontkit_embed_url` avec des **PostScript names** (ex. `AGaramondPro-Regular`).
   → si un nom est introuvable, l'appel échoue **en entier** : retirer/remplacer le fautif.
6. Écrire un HTML **autonome** : canvas fixe (px), `<meta hz:slide-selector>` +
   `hz:canvas-width/height` + `data-canvas-*`, polices appliquées **sur les éléments**,
   **aucun JS / aucune animation** (Express fige une seule image), CSS simple.
7. `html_export_readiness_skill` → relire la checklist (obligatoire **avant chaque** export).
8. `export_html_to_express` → renvoie l'URL Adobe Express éditable.

## 4. Polices NAVLYS validées sur Adobe Fonts

- **Titres (cinéma / Garamond)** : `AGaramondPro-Regular`, `AGaramondPro-Bold` → famille CSS `"adobe-garamond-pro"`.
- **Textes / labels (sans net)** : `FiraSans-Light`, `FiraSans-Regular` → famille CSS `"fira-sans"`.
- Kit Typekit utilisé : `https://use.typekit.net/arx8can.css`.
- Accent charte : **Ice Blue `#7DD3FC`** sur fond cinéma sombre.

## 5. Conformité (ERR-003) — OBLIGATOIRE sur tout visuel de marque

Avant export, vérifier le contenu : **zéro promesse de rendement / zéro chiffre %**,
pas d'« Israël / Jérusalem / Ashkelon », **disclaimer présent** (« éducation & veille,
informatif uniquement, aucun conseil personnalisé »), pas de « CIF / ORIAS ».
Le visuel n'est pas public (doc dans le compte Adobe) mais on garde la discipline.

## 6. Premier livrable produit (référence)

- Fichier source : **`designs/navlys-teaser-card.html`** (carré 1080×1080).
- Contenu : « Ouverture 1ᵉʳ juillet 2026 », slogan officiel, « Méthode 90/10 », disclaimer.
- Testé le 2026-06-24 : import Adobe Express **OK** (1 slide, tout fidèle ;
  seule micro-perte : l'exposant « er » devenu texte normal).
