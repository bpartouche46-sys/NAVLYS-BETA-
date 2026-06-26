# _NAVLYS_INDEX — Index des 4 packs de la session pivot (v2 dépersonnalisée)

> ⚓ **Ce fichier est un sous-index local de la session pivot.**
> Source de vérité globale : `_MASTER_NAVLYS_NOW.md` puis `_NAVLYS_DISPATCH.md`.
> Coordination QG de cette session : `_MASTERNAV_COORDINATION_2026-06-07_DEPERSO.md`.
>
> NAVLYS INFINITE · pivot v2.0 · session du 2026-06-07
> ⚠️ NAVLYS = **marque produit dépersonnalisée** (règle gravée n°1 du DISPATCH).
> Aucun lien avec Bruno Partouche sur navlys.fr ni sur les réseaux NAVLYS.
> Bruno reste sur brunopartouche.com pour sa vie, son CV, ses références.

---

## 🇫🇷 SECTION FR

### Source de vérité

Avant tout : **lis `_NAVLYS_POSITIONING.md`** — toutes les règles du pivot y sont.

### Packs livrés (dans le même dossier)

#### 1. NAVLYS_OBJECTIF_PACK/  ← **NOUVEAU pack central**

La page d'accueil NAVLYS. Simulateur d'objectif en 3 modes interchangeables.

- `fr/SYNTHESE.md` · `en/SYNTHESE.md`
- `components/SimulateurObjectif.tsx` — l'outil principal de la home
- `lib/objectif.ts` — les calculs (intérêts composés, mensualité, durée)
- `app/page.tsx` — la page d'accueil prête

Prochaine action : copier les 3 fichiers TS/TSX dans le projet Next.js NAVLYS, déployer sur Vercel à l'URL `/` (racine).

#### 2. CHEVAL_TROIE_PACK/

Calculateur Marge Révélée + 30 questions publiques + 5 fiches banques.
**Mis à jour** : CTA "audit privé" supprimé, redirige maintenant vers la page d'accueil simulateur. Langage simplifié grand public.

- `fr/SYNTHESE.md` · `en/SYNTHESE.md`
- `fr/questions_30.md` · `en/questions_30.md` (réécrits en langage simple)
- `fr/banques/` et `en/banques/` (BNP, CA, SG, LCL, La Banque Postale)
- `components/MargeRevelee.tsx` (CTA dépersonnalisé)
- `lib/margins.ts`
- `app/page.tsx`

Prochaine action : déployer à `/marge-revelee`. Page secondaire.

#### 3. NAVLYS_BRAND_KIT/

Routine 1 clic 13 réseaux + bios FR + EN **entièrement dépersonnalisées** + Publer setup.

- `fr/SYNTHESE.md` · `en/SYNTHESE.md`
- `fr/bios_fr.md` (13 bios FR au "tu", aucun "je") · `en/bios_en.md`
- `one_click/open_all_signups.html` (bios courtes mises à jour)
- `publer_setup/publer_setup.md`

Prochaine action : ouvrir le HTML, créer les 13 comptes NAVLYS.

#### 4. STRATEGIE_NAVLYS_PACK/

Plan social (Pilier 1 public) + back-office privé Alpaca (Pilier 2 = hors NAVLYS).
**Mis à jour** : SYNTHESE clarifie que le bot Alpaca est un usage personnel privé, non lié à la marque NAVLYS.

---

## 🇬🇧 EN SECTION

### Source of truth

First: **read `_NAVLYS_POSITIONING.md`** — all the pivot rules are there.

### Delivered packs (same folder)

#### 1. NAVLYS_OBJECTIF_PACK/  ← **NEW central pack**

The NAVLYS homepage. Goal simulator with 3 interchangeable modes.

- `fr/SYNTHESE.md` · `en/SYNTHESE.md`
- `components/SimulateurObjectif.tsx` — homepage primary tool
- `lib/objectif.ts` — math (compound interest, monthly, duration)
- `app/page.tsx` — ready-to-go homepage

Next action: copy the 3 TS/TSX files into the NAVLYS Next.js project, deploy on Vercel at `/`.

#### 2. CHEVAL_TROIE_PACK/

Margin Revealed calculator + 30 public questions + 5 bank briefs.
**Updated**: "private audit" CTA removed, now redirects to homepage simulator. Mass-market language.

- `fr/SYNTHESE.md` · `en/SYNTHESE.md`
- `fr/questions_30.md` · `en/questions_30.md` (rewritten in plain language)
- `fr/banques/` and `en/banques/` (BNP, CA, SG, LCL, La Banque Postale)
- `components/MargeRevelee.tsx` (depersonalized CTA)
- `lib/margins.ts`
- `app/page.tsx`

Next action: deploy at `/margin-revealed`. Secondary page.

#### 3. NAVLYS_BRAND_KIT/

One-click 13 networks routine + **fully depersonalized** FR + EN bios + Publer setup.

- `fr/SYNTHESE.md` · `en/SYNTHESE.md`
- `fr/bios_fr.md` (13 FR bios in "tu" form, no "I") · `en/bios_en.md`
- `one_click/open_all_signups.html` (updated short bios)
- `publer_setup/publer_setup.md`

Next action: open HTML, create the 13 NAVLYS accounts.

#### 4. STRATEGIE_NAVLYS_PACK/

Social plan (Pillar 1 public) + private Alpaca back-office (Pillar 2 = outside NAVLYS).
**Updated**: SYNTHESE clarifies the Alpaca bot is a private personal usage, unrelated to the NAVLYS brand.
