# ⚓ SPEC INTÉGRATION JURIDIQUE — `_APP_NAVBIO_v1/`
_Integration spec for NAVBIO app · 29 mai 2026 · à transmettre à l'équipe dev_

---

## 1. Vue d'ensemble / Overview

L'app NAVBIO LIFE (Next.js 14, `_APP_NAVBIO_v1/`) doit intégrer **6 pages légales**, **2 modaux de signature**, **1 composant footer global**, et **1 composant `<RuleReminder />` réutilisable**. Tous les textes sont déjà rédigés dans les fichiers `01_*.md` à `09_*.md` du présent dossier `_JURIDIQUE_NAVBIO/`.

---

## 2. Arborescence cible / Target tree

```
_APP_NAVBIO_v1/
├── app/
│   ├── [locale]/                  # i18n FR | EN à minima
│   │   ├── legal/
│   │   │   ├── page.tsx           # /legal — index de tous les docs
│   │   │   ├── cgu/page.tsx       # /legal/cgu   → render 01_CGU_NAVBIO_v1.md
│   │   │   ├── confidentialite/page.tsx  # → 02
│   │   │   ├── bonne-conduite/page.tsx   # → 03
│   │   │   ├── decharge/page.tsx         # → 05
│   │   │   ├── photos-guide/page.tsx     # → 07
│   │   │   ├── bible/page.tsx            # → 08
│   │   │   ├── faq/page.tsx              # → 09
│   │   │   └── dsa-notice/page.tsx       # formulaire signalement DSA art.16
│   │   ├── signup/
│   │   │   └── (avec modal acceptation CGU + signature contrat)
│   │   └── ...
├── components/
│   └── legal/
│       ├── LegalBible.tsx           # footer global short/long
│       ├── LegalIndex.tsx           # liste tous docs avec versioning
│       ├── RuleReminder.tsx         # rappel avant action sensible
│       ├── ConsentModal.tsx         # case à cocher signup
│       ├── SignatureLedger.ts       # génération SHA-256 + storage
│       ├── ReportModal.tsx          # signalement DSA reçu
│       ├── FaceBlurPreview.tsx      # preview floutage (cf. doc 04)
│       └── DataExportButton.tsx    # export RGPD art.20
├── lib/
│   ├── legalContent.ts             # imports markdown → render
│   ├── faceBlur.ts                 # MediaPipe + OpenCV.js
│   └── signature.ts                # hashing + horodatage
└── public/
    └── legal/                      # PDFs imprimables des CGU
```

---

## 3. Pages à créer / Pages to create

| Route | Source | Notes |
|---|---|---|
| `/[locale]/legal` | `LegalIndex` component | Liste 9 docs + versions + dates |
| `/[locale]/legal/cgu` | `01_CGU_NAVBIO_v1.md` | Render markdown, anchor par article |
| `/[locale]/legal/confidentialite` | `02_POLITIQUE_CONFIDENTIALITE_NAVBIO.md` | + bouton "Exercer mes droits RGPD" |
| `/[locale]/legal/bonne-conduite` | `03_CONTRAT_BONNE_CONDUITE_NAVBIO.md` | Affichage avec date de signature de l'Utilisateur connecté |
| `/[locale]/legal/decharge` | `05_DECHARGE_LIABILITY_NAVLYS.md` | |
| `/[locale]/legal/photos-guide` | `07_GUIDE_PHOTOS_PERSONNES_CONNUES.md` | Guide visuel arbre de décision |
| `/[locale]/legal/bible` | `08_BIBLE_JURIDIQUE_UNIFIEE_NAVLYS.md` | Pour transparence du footer |
| `/[locale]/legal/faq` | `09_FAQ_JURIDIQUE_PUBLIC.md` | Accordéon avec 20 Q/R |
| `/[locale]/legal/dsa-notice` | Formulaire signalement DSA art.16 | Email vers `legal@navlys.com` |
| `/[locale]/legal/cookies` | Page courte (NAVBIO utilise uniquement cookies techniques) | |
| `/[locale]/legal/mentions` | Mentions légales art. 6 LCEN | |

---

## 4. Modal signup / Signup acceptance modal

**Localisation :** dans le flow signup, après email + mot de passe, avant accès à l'app.

```tsx
// components/legal/ConsentModal.tsx
export function ConsentModal({ onAccept, onRefuse }) {
  const [cgu, setCgu] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [conduct, setConduct] = useState(false);

  const allChecked = cgu && privacy && conduct;

  const handleAccept = async () => {
    const docs = await Promise.all([
      fetchDocHash("/legal/cgu"),
      fetchDocHash("/legal/confidentialite"),
      fetchDocHash("/legal/bonne-conduite"),
    ]);
    const signature = await generateSignatureLedger({
      user_id: currentUserId,
      docs_sha256: docs,
      signed_at_utc: new Date().toISOString(),
      version: "1.0",
      locale: currentLocale,
    });
    await persistSignature(signature);
    onAccept();
  };

  return (
    <Modal title="⚓ Bienvenue à bord de NAVBIO LIFE">
      <p>Avant de commencer, lisez et acceptez nos trois documents fondateurs :</p>
      <Checkbox checked={cgu} onChange={setCgu}>
        J'ai lu et j'accepte les <a href="/legal/cgu">Conditions Générales d'Utilisation</a>
      </Checkbox>
      <Checkbox checked={privacy} onChange={setPrivacy}>
        J'ai lu et j'accepte la <a href="/legal/confidentialite">Politique de Confidentialité</a>
      </Checkbox>
      <Checkbox checked={conduct} onChange={setConduct}>
        Je m'engage solennellement au <a href="/legal/bonne-conduite">Contrat de Bonne Conduite</a>
      </Checkbox>
      <Button disabled={!allChecked} onClick={handleAccept}>
        Je signe et j'embarque
      </Button>
      <Button variant="ghost" onClick={onRefuse}>Refuser et quitter</Button>
    </Modal>
  );
}
```

**Persistance signature :** `signatures.ledger.json` côté serveur (table `legal_signatures`) :
```json
{
  "user_id": "uuid",
  "doc_hashes": {
    "cgu": "sha256:...",
    "privacy": "sha256:...",
    "conduct": "sha256:..."
  },
  "signed_at_utc": "2026-06-01T08:42:13Z",
  "ip_redacted_after": "2027-06-01",
  "user_agent_hash": "sha256:...",
  "version": "1.0",
  "locale": "fr-FR"
}
```

---

## 5. Composant `<RuleReminder />` / Reusable reminder

```tsx
// components/legal/RuleReminder.tsx
type Variant = "upload" | "share" | "delete" | "legacy" | "bulk" | "publication";

const REMINDERS = {
  upload: {
    fr: {
      title: "🛟 Avant d'uploader",
      body: "Vous restez seul responsable de la légalité de vos contenus.",
      checklist: [
        "Je détiens les droits ou j'ai l'autorisation",
        "Les personnes visibles ont consenti",
        "Aucun mineur sans autorisation parentale écrite",
        "Aucune photo de presse / célébrité trouvée en ligne",
      ],
    },
    en: { /* ... */ },
  },
  share: { /* ... */ },
  // ... voir 06_AVERTISSEMENTS_UI_NAVBIO.md
};

export function RuleReminder({ variant, locale }: Props) {
  const content = REMINDERS[variant][locale];
  return (
    <Alert variant="info" data-test={`rule-reminder-${variant}`}>
      <AlertTitle>{content.title}</AlertTitle>
      <AlertDescription>{content.body}</AlertDescription>
      {content.checklist && (
        <ul>
          {content.checklist.map(item => <li key={item}>☐ {item}</li>)}
        </ul>
      )}
      <a href={`/${locale}/legal/cgu`}>📖 Lire les règles complètes →</a>
    </Alert>
  );
}
```

**Trigger points dans l'app :**
- Page `/upload` → `<RuleReminder variant="upload" />` permanent en haut
- Modal pré-upload → checklist 4 items obligatoire
- Page `/share` → `<RuleReminder variant="share" />`
- Settings → suppression → `<RuleReminder variant="delete" />`
- Settings → légataires → `<RuleReminder variant="legacy" />`

---

## 6. Composant `<LegalBible />` / Global footer

```tsx
// components/legal/LegalBible.tsx
type BibleVariant = "short" | "long";

export function LegalBible({ variant = "short", locale }: Props) {
  if (variant === "short") {
    return (
      <footer className="legal-bible-short" role="contentinfo">
        <p>
          NAVLYS — Éditeur de contenu pédagogique financier · Bruno Mark Partouche<br/>
          PAS CIF · PAS ORIAS · Vocation éducative uniquement<br/>
          NAVBIO LIFE = hébergeur technique, contenus chiffrés E2E
        </p>
        <nav>
          <a href={`/${locale}/legal/cgu`}>CGU</a>
          <a href={`/${locale}/legal/confidentialite`}>Confidentialité</a>
          <a href={`/${locale}/legal/mentions`}>Mentions</a>
          <a href={`/${locale}/legal/cookies`}>Cookies</a>
          <a href={`/${locale}/legal/dsa-notice`}>DSA</a>
          <a href={`/${locale}/legal/faq`}>FAQ</a>
        </nav>
        <p>
          <a href="mailto:contact@navlys.com">contact@navlys.com</a> ·
          <a href="mailto:legal@navlys.com">legal@navlys.com</a> ·
          <a href="mailto:dpo@navlys.com">dpo@navlys.com</a>
        </p>
      </footer>
    );
  }
  // variant === "long" → rendu complet de 08_BIBLE_JURIDIQUE_UNIFIEE_NAVLYS.md
}
```

**À placer :** dans `app/[locale]/layout.tsx` pour qu'il apparaisse sur toutes les pages.

---

## 7. Schéma de données / Data schema (Supabase / Postgres)

```sql
-- Signatures juridiques (CGU/Privacy/Conduct)
CREATE TABLE legal_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  doc_kind TEXT NOT NULL CHECK (doc_kind IN ('cgu','privacy','conduct')),
  doc_version TEXT NOT NULL,
  doc_sha256 TEXT NOT NULL,
  signed_at_utc TIMESTAMPTZ NOT NULL DEFAULT now(),
  locale TEXT NOT NULL,
  ip_redacted_at TIMESTAMPTZ,
  user_agent_hash TEXT
);

-- Décisions de floutage par photo (audit trail)
CREATE TABLE face_blur_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  blob_id UUID NOT NULL,
  face_index INT NOT NULL,
  estimated_age INT,
  decision TEXT NOT NULL CHECK (decision IN ('blur','unblur_with_consent','blur_forced_minor','blur_forced_erasure')),
  consent_proof TEXT,  -- hash du justificatif fourni
  decided_at_utc TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Signalements DSA reçus
CREATE TABLE dsa_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref TEXT UNIQUE NOT NULL,  -- "NAV-RPT-2026-001234"
  reporter_email TEXT,
  target_user_id UUID,
  target_blob_id UUID,
  motif TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending|user_responding|removed|rejected
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);
```

---

## 8. Tests E2E à ajouter (Playwright) / E2E tests

```ts
// tests/legal.spec.ts
test("Signup requires accepting all 3 documents", async ({ page }) => {
  await page.goto("/fr/signup");
  // fill email + password
  await page.getByRole("button", { name: /signe et embarque/i }).should("be.disabled");
  // check all 3
  await page.getByLabel(/Conditions Générales/).check();
  await page.getByLabel(/Politique de Confidentialité/).check();
  await page.getByLabel(/Contrat de Bonne Conduite/).check();
  await page.getByRole("button", { name: /signe et embarque/i }).should("be.enabled");
});

test("RuleReminder appears on upload page", async ({ page, login }) => {
  await login();
  await page.goto("/fr/upload");
  await expect(page.getByTestId("rule-reminder-upload")).toBeVisible();
});

test("Footer bible appears on every page", async ({ page }) => {
  for (const route of ["/fr", "/fr/dashboard", "/fr/legal/cgu", "/fr/upload"]) {
    await page.goto(route);
    await expect(page.locator(".legal-bible-short")).toBeVisible();
  }
});

test("Auto-blur applied to minor faces", async ({ page, login }) => {
  // fixture: photo containing 1 detected face age 8
  await login();
  await page.goto("/fr/upload");
  await page.setInputFiles("input[type=file]", "tests/fixtures/photo_with_minor.jpg");
  await expect(page.getByText(/MINEUR DÉTECTÉ/i)).toBeVisible();
  await expect(page.getByText(/flouté par défaut/i)).toBeVisible();
});
```

---

## 9. Cadence de revue / Review cadence

| Cadence | Action | Responsable |
|---|---|---|
| À chaque release | Test E2E `tests/legal.spec.ts` | CI |
| Hebdo (vendredi) | Veille DSA / CNIL / AMF | Le Notaire de Bord |
| Trimestriel | Revue versions docs + hashes | Le Notaire de Bord + avocat NTIC |
| Annuel | Audit complet (RGPD, DSA, AI Act) | Cabinet PI |

---

## 10. Critères "Definition of Done" / DoD

- [ ] 11 routes `/legal/*` livrées et accessibles
- [ ] Modal `ConsentModal` bloque le signup sans 3 cases cochées
- [ ] `signatures.ledger.json` persiste avec SHA-256 + horodatage
- [ ] `<LegalBible variant="short" />` rendu sur 100% des pages
- [ ] `<RuleReminder />` sur les 5 trigger points
- [ ] Pipeline floutage MediaPipe opérationnel (perf cibles doc 04)
- [ ] Bilingue FR/EN complet
- [ ] Tests E2E green
- [ ] Audit accessibility WCAG 2.1 AA OK
- [ ] PR validée par Bruno + (à terme) avocat NTIC
- [ ] Hash de version footer cohérent sur les 6 surfaces

---

*Document interne — spec d'intégration — à exécuter par l'équipe dev NAVBIO. — Le Notaire de Bord NAVLYS.*
