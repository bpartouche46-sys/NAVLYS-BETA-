# ⚖️ RENFORCEMENT — 06. LÉGAL & CONFORMITÉ

> Consolidé 2026-06-25 (`recup-docs/onedrive/`). Rien de public déclenché. Décisions = Bruno.
> 🔐 Aucun secret / entité juridique précise / SIREN n'est recopié ici (règle gravée 7).

---

## 📍 ÉTAT ACTUEL

### Conformité finfluenceur
- **NAVLYS = éditeur de contenu pédagogique.** PAS CIF, PAS ORIAS, PAS IOBSP, pas d'intermédiaire.
- **Disclaimer obligatoire** en pied de page sur tous les sites + apps (texte type) :
  *« NAVLYS — éducation, pas conseil. Bruno Mark Partouche n'est ni CIF, ni ORIAS, ni IOBSP. Vocation
  pédagogique uniquement, pas de conseil personnalisé, pas de garantie de rendement. Performances
  passées ≠ futures. Avant toute décision, consultez un professionnel agréé. »*
- **Affiliations** = mode **CPA publisher** (signalé « lien partenaire »), pas apport d'affaires.

### Voix clonée — cadre légal
- **IA Act art. 50** (transparence) : mention « voix générée par IA » sous chaque lecteur.
- **RGPD art. 9** (donnée biométrique) : consentement explicite **signé** de Bruno, révocable (~30 j).
- **Anti-deepfake R1→R7** : la voix lit uniquement du texte NAV IA (G1) ou pré-rédigé Bruno ; jamais
  d'input utilisateur libre ; refus des sujets interdits ; `VOICE_ID` côté serveur ; logs ; réponse
  transparente « c'est une IA ». Page `/legal/ai-voice` recommandée.
- **CGU ElevenLabs / HeyGen** : DPA à signer **avant** activation LIVE.

### Bible juridique unifiée (footer commun)
7 blocs : identification éditeur · G1 conformité finance · statut hébergeur NAVBIO (chiffrement E2E) ·
liens docs légaux · affiliations CPA · propriété intellectuelle · contact réquisitions. Composant
`<LegalBible>` sur les 4 sites + 2 apps.

### NAVBIO — CGU / Confidentialité / Décharge / Bonne conduite
- Statut **hébergeur technique** (LCEN), chiffrement **E2E** (NAVLYS ne lit pas les contenus), RGPD
  complet (DPO), décharge de responsabilité, contrat « 10 règles d'or » signé au signup, **kit
  floutage automatique** des visages (mineurs / personnes non consentantes / personnes connues).

### Entité juridique — AMBIGUÏTÉ
- **À trancher** : FR auto-entrepreneur (franchise TVA) vs **société IL** (banque Mizrahi) vs **[entité — hors dépôt]
  LTD** (mentionné côté contrat). Impacte Stripe, factures, mentions légales, contrats partenaires.

### À RETIRER du public (rappel ERR-003 / ERR-005)
- Toute mention **« Israël / Jérusalem / Ashkelon »** (garder le fuseau horaire en interne seulement),
  numéro **+972**, mentions résiduelles **« NOVA » / « [entité — hors dépôt] »**, et toute trace **CIF/ORIAS**.

_Sources : `08_BIBLE_JURIDIQUE_UNIFIEE_NAVLYS.md`, `08_CONFORMITE_LEGALE_VOIX_CLONEE.md`,
`01_CGU_NAVBIO_v1.md`, `02_POLITIQUE_CONFIDENTIALITE_NAVBIO.md`, `03_CONTRAT_BONNE_CONDUITE_NAVBIO.md`,
`05_DECHARGE_LIABILITY_NAVLYS.md`, `04_KIT_FLOUTAGE_AUTOMATIQUE.md`, `07_GUIDE_PHOTOS_PERSONNES_CONNUES.md`,
`06_RGPD_QUOTAS_TRANSPARENCE.md`, `_DEPARTEMENT_JURIDIQUE_charte.md`, `_INDEX.md`._

---

## 💪 FORCES

- **Positionnement éditeur** = base légale solide (vs conseiller non agréé).
- **Corpus juridique déjà rédigé** (CGU, confidentialité, décharge, bible, FAQ juridique, kit floutage).
- **Cadre voix exemplaire** (IA Act + RGPD + anti-deepfake + consentement révocable).
- **Chiffrement E2E NAVBIO** = atout défensif majeur (NAVLYS ne peut pas lire les contenus).

---

## ⚠️ FAIBLESSES / GAPS

- **0 validation avocat** à ce jour (corpus = brouillon prêt à relire).
- **Entité juridique non figée** → bloque tout le reste (Stripe, factures, contrats).
- **AIPD** (analyse d'impact RGPD biométrie) à faire avant le droit-à-l'oubli / floutage en prod.
- **DPA ElevenLabs/HeyGen** non signés → NEXT GEN APP doit rester en TEST tant que non fait.
- **Résidus public** à nettoyer (Israël/Jérusalem/+972/NOVA/[entité — hors dépôt]/CIF).

---

## 🔧 RENFORCEMENTS CONCRETS

1. **Checklist conformité pré-publication** (réutilisable, dérivée des 8 règles gravées + ERR-003/005) :
   grep termes interdits sur **HTML + JS + CSS** · disclaimer présent · 0 promesse de rendement ·
   0 « Israël/Jérusalem/Ashkelon » · deperso respectée · couleur `#7DD3FC` · date publique unique.
2. **Cadrage martingale (légal)** : ne jamais la présenter comme stratégie ; uniquement « hypothèse
   invalidée par le Labo » (relié à `04-calculs-finance.md` et `05-faq-sav-navia.md`).
3. **Préparer le dossier avocat NTIC** : regrouper les drafts pour une relecture unique (budget = Bruno).
4. **Page `/legal/ai-voice`** + consentement voix signé avant tout usage public de la voix.
5. **Plan de nettoyage public** des mentions sensibles (liste, pas suppression brutale — règle 8).

---

## ⚖️ DÉCISIONS BRUNO (ce domaine)

- [ ] **Entité juridique** définitive (FR auto-entrepreneur / société IL / [entité — hors dépôt] LTD).
- [ ] **Mandater un avocat NTIC** pour relecture du corpus (décision budget = Bruno seul).
- [ ] **Signer le consentement voix** + **DPA ElevenLabs/HeyGen** avant LIVE.
- [ ] Lancer l'**AIPD** avant droit-à-l'oubli / floutage en prod.
- [ ] Feu vert pour le **nettoyage public** (Israël/+972/NOVA/[entité — hors dépôt]/CIF).
