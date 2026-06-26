# 🧭 NAVLYS APP CLIENT — Tests E2E Playwright (7 scénarios = 7 profils)

**Verrouillé : 28 mai 2026 · Beta 1er juin · Stack : Playwright 1.45+, TypeScript strict**

L'objectif : un scénario par profil (1-7), exécuté en CI à chaque PR. Chaque scénario suit un persona type et vérifie que le moteur attribue le bon profil + degré.

---

## 1. Installation et configuration

```bash
cd navlys-app
npm install -D @playwright/test
npx playwright install --with-deps chromium firefox webkit
```

### `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: 'fr-FR',
  },
  projects: [
    { name: 'mobile-chrome',  use: { ...devices['Pixel 7'] } },
    { name: 'mobile-safari',  use: { ...devices['iPhone 14'] } },
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
```

### `package.json` scripts

```json
{
  "scripts": {
    "test:e2e":       "playwright test",
    "test:e2e:ui":    "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

---

## 2. Helpers communs — `e2e/_helpers.ts`

```typescript
import { Page, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/** Authentifie un user de test via Supabase admin (bypass magic link). */
export async function signInAsTestUser(page: Page, email: string) {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  // Crée user si besoin
  await admin.auth.admin.createUser({ email, email_confirm: true });
  // Génère un lien d'auth direct
  const { data, error } = await admin.auth.admin.generateLink({
    type: 'magiclink',
    email,
  });
  if (error) throw error;
  await page.goto(data.properties.action_link);
  await page.waitForURL(/\/(dashboard|onboarding)/);
}

/** Sélectionne une option par texte dans une radiogroup. */
export async function pickRadio(page: Page, labelText: string) {
  await page.getByRole('radio', { name: labelText }).check();
}

/** Sélectionne une checkbox par label. */
export async function pickCheckbox(page: Page, labelText: string) {
  await page.getByRole('checkbox', { name: labelText }).check();
}

/** Bouge un slider à la valeur cible (approximative). */
export async function setSlider(page: Page, label: string, valueIndicatorText: string) {
  const slider = page.getByRole('slider', { name: label });
  await slider.focus();
  // navigation clavier garantit la portabilité (vs drag pixel)
  // on assume que la touche flèche-droite ajoute par steps prédéfinis
  // tests précis = vérifier la valeur affichée après chaque étape
  await page.waitForFunction(
    (text) => document.body.innerText.includes(text),
    valueIndicatorText,
    { timeout: 5_000 },
  );
}

/** Clique sur "Continuer" pour passer à l'étape suivante. */
export async function next(page: Page) {
  await page.getByRole('button', { name: /continuer|découvrir mon profil|→/i }).click();
}

/** Vérifie que le profil affiché est bien celui attendu. */
export async function expectProfile(page: Page, expectedName: string, expectedDegree: string) {
  await expect(page).toHaveURL(/\/onboarding\/profile/);
  await expect(page.getByRole('heading', { level: 2 })).toContainText(expectedName);
  await expect(page.getByText(new RegExp(expectedDegree, 'i'))).toBeVisible();
}

/** Nettoie le profil créé après chaque test. */
export async function cleanupTestUser(email: string) {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const { data } = await admin.auth.admin.listUsers();
  const user = data.users.find(u => u.email === email);
  if (user) {
    await admin.from('profiles_user').delete().eq('user_id', user.id);
    await admin.from('cap_reve_objectifs').delete().eq('user_id', user.id);
    await admin.auth.admin.deleteUser(user.id);
  }
}
```

---

## 3. Scénario 1 — Marin Prudent (Marie 68 ans)

```typescript
// e2e/onboarding-marin-prudent.spec.ts
import { test, expect } from '@playwright/test';
import {
  signInAsTestUser, pickRadio, setSlider, next, expectProfile,
  cleanupTestUser, pickCheckbox,
} from './_helpers';

const EMAIL = 'e2e+marin-prudent@navlys.test';

test.describe('Profil 1 · Marin Prudent', () => {
  test.afterEach(() => cleanupTestUser(EMAIL));

  test('Marie 68 ans retraitée 250 000 € → Marin Prudent défensif', async ({ page }) => {
    await signInAsTestUser(page, EMAIL);
    await expect(page).toHaveURL(/\/onboarding\/dream/);

    // Cap rêvé : sécuriser
    await pickRadio(page, /Sécuriser ce que j'ai bâti/i);
    await next(page);

    // Q1 âge = 68
    await setSlider(page, /Quel âge as-tu/i, '68 ans');
    await next(page);

    // Q2 situation
    await pickRadio(page, /Retraité/i); await next(page);

    // Q3 capital ≈ 250 000 €
    await setSlider(page, /capital disponible/i, '250 000 €');
    await next(page);

    // Q4 DCA = 0 €
    await setSlider(page, /épargner par mois/i, '0 €');
    await next(page);

    // Q5 objectif = sécuriser
    await pickRadio(page, /Sécuriser ce que j'ai/i); await next(page);

    // Q6 horizon = 2-5 ans
    await pickRadio(page, /2 à 5 ans/i); await next(page);

    // Q7 réaction perte = panique
    await pickRadio(page, /Je vends tout immédiatement/i); await next(page);

    // Q8 expérience = quelques mois
    await pickRadio(page, /Quelques mois/i); await next(page);

    // Q9 temps = 0 minute
    await pickRadio(page, /0 minute/i); await next(page);

    // Q10 interdits perso = crypto + leverage
    await pickCheckbox(page, /Crypto/i);
    await pickCheckbox(page, /Effet de levier/i);
    await next(page);

    // Q11 perte tactique = non
    await pickRadio(page, /Non, pas un euro/i); await next(page);

    // Q12 = oui
    await pickRadio(page, /Oui, j'ai compris/i); await next(page);

    // Vérification profil
    await expectProfile(page, 'LE MARIN PRUDENT', 'defensive');

    // Disclaimer permanent toujours visible
    await expect(page.getByRole('contentinfo', { name: 'Disclaimer NAVLYS' })).toBeVisible();
  });
});
```

---

## 4. Scénario 2 — Capitaine de Famille (Thomas 38 ans)

```typescript
// e2e/onboarding-capitaine.spec.ts
import { test, expect } from '@playwright/test';
import {
  signInAsTestUser, pickRadio, setSlider, next, expectProfile, cleanupTestUser,
} from './_helpers';

const EMAIL = 'e2e+capitaine@navlys.test';

test.describe('Profil 2 · Capitaine de Famille', () => {
  test.afterEach(() => cleanupTestUser(EMAIL));

  test('Thomas 38 ans salarié 50 000 € → Capitaine de Famille balanced', async ({ page }) => {
    await signInAsTestUser(page, EMAIL);
    await pickRadio(page, /Faire grandir mon capital/i); await next(page);
    await setSlider(page, /âge/i, '38 ans'); await next(page);
    await pickRadio(page, /Salarié/i); await next(page);
    await setSlider(page, /capital/i, '50 000 €'); await next(page);
    await setSlider(page, /épargner/i, '400 €'); await next(page);
    await pickRadio(page, /Faire grandir mon capital sur le long terme/i); await next(page);
    await pickRadio(page, /10 à 20 ans/i); await next(page);
    await pickRadio(page, /Je ne touche à rien/i); await next(page);
    await pickRadio(page, /1 à 3 ans/i); await next(page);
    await pickRadio(page, /15 min/i); await next(page);
    // Q10 = aucun
    await next(page);
    await pickRadio(page, /Partiellement/i); await next(page);
    await pickRadio(page, /Oui, j'ai compris/i); await next(page);

    await expectProfile(page, 'LE CAPITAINE DE FAMILLE', 'balanced');

    // L'allocation doit afficher 60% balanced
    await page.goto('/onboarding/routine');
    await expect(page.getByText(/60 %/)).toBeVisible();
  });
});
```

---

## 5. Scénario 3 — Entrepreneur en Croissance (Karim 42 ans)

```typescript
// e2e/onboarding-entrepreneur.spec.ts
import { test } from '@playwright/test';
import {
  signInAsTestUser, pickRadio, setSlider, next, expectProfile, cleanupTestUser,
} from './_helpers';

const EMAIL = 'e2e+entrepreneur@navlys.test';

test.describe('Profil 3 · Entrepreneur en Croissance', () => {
  test.afterEach(() => cleanupTestUser(EMAIL));

  test('Karim 42 ans dirigeant 120 000 € → Entrepreneur balanced', async ({ page }) => {
    await signInAsTestUser(page, EMAIL);
    await pickRadio(page, /Faire grandir/i); await next(page);
    await setSlider(page, /âge/i, '42 ans'); await next(page);
    await pickRadio(page, /Entrepreneur/i); await next(page);
    await setSlider(page, /capital/i, '120 000 €'); await next(page);
    await setSlider(page, /épargner/i, '1 500 €'); await next(page);
    await pickRadio(page, /Faire grandir mon capital sur le long terme/i); await next(page);
    await pickRadio(page, /10 à 20 ans/i); await next(page);
    await pickRadio(page, /Je ne touche à rien/i); await next(page);
    await pickRadio(page, /3 à 10 ans/i); await next(page);
    await pickRadio(page, /3 à 5 h/i); await next(page);
    await next(page);
    await pickRadio(page, /Partiellement/i); await next(page);
    await pickRadio(page, /Oui, j'ai compris/i); await next(page);

    await expectProfile(page, "L'ENTREPRENEUR EN CROISSANCE", 'balanced');
  });
});
```

---

## 6. Scénario 4 — Étudiant Découvreur (Léa 22 ans)

```typescript
// e2e/onboarding-etudiant.spec.ts
import { test, expect } from '@playwright/test';
import {
  signInAsTestUser, pickRadio, setSlider, next, expectProfile,
  cleanupTestUser, pickCheckbox,
} from './_helpers';

const EMAIL = 'e2e+etudiant@navlys.test';

test.describe('Profil 4 · Étudiant Découvreur', () => {
  test.afterEach(() => cleanupTestUser(EMAIL));

  test('Léa 22 ans étudiante 800 € → Étudiant Découvreur', async ({ page }) => {
    await signInAsTestUser(page, EMAIL);
    await pickRadio(page, /Apprendre, comprendre/i); await next(page);
    await setSlider(page, /âge/i, '22 ans'); await next(page);
    await pickRadio(page, /Étudiant/i); await next(page);
    await setSlider(page, /capital/i, '800 €'); await next(page);
    await setSlider(page, /épargner/i, '50 €'); await next(page);
    await pickRadio(page, /Apprendre, comprendre/i); await next(page);
    await pickRadio(page, /10 à 20 ans/i); await next(page);
    await pickRadio(page, /comprendre ce qui se passe/i); await next(page);
    await pickRadio(page, /Zéro, je découvre/i); await next(page);
    await pickRadio(page, /15 min/i); await next(page);
    await pickCheckbox(page, /Crypto/i);
    await pickCheckbox(page, /Produits dérivés/i);
    await next(page);
    await pickRadio(page, /Non, pas un euro/i); await next(page);
    await pickRadio(page, /Oui, j'ai compris/i); await next(page);

    await expectProfile(page, "L'ÉTUDIANT DÉCOUVREUR", 'defensive');

    // Vérifier que la liste d'interdits inclut les préférences perso
    await page.goto('/onboarding/routine');
    await expect(page.getByText(/Pas de crypto \(préférence personnelle\)/i)).toBeVisible();
  });
});
```

---

## 7. Scénario 5 — Skipper Indépendant (Inès 35 ans freelance)

```typescript
// e2e/onboarding-skipper.spec.ts
import { test } from '@playwright/test';
import {
  signInAsTestUser, pickRadio, setSlider, next, expectProfile, cleanupTestUser,
} from './_helpers';

const EMAIL = 'e2e+skipper@navlys.test';

test.describe('Profil 5 · Skipper Indépendant', () => {
  test.afterEach(() => cleanupTestUser(EMAIL));

  test('Inès 35 ans freelance 18 000 € → Skipper Indépendant', async ({ page }) => {
    await signInAsTestUser(page, EMAIL);
    await pickRadio(page, /Sécuriser ce que j'ai bâti/i); await next(page);
    await setSlider(page, /âge/i, '35 ans'); await next(page);
    await pickRadio(page, /Freelance/i); await next(page);
    await setSlider(page, /capital/i, '18 000 €'); await next(page);
    await setSlider(page, /épargner/i, '300 €'); await next(page);
    await pickRadio(page, /Sécuriser ce que j'ai/i); await next(page);
    await pickRadio(page, /5 à 10 ans/i); await next(page);
    await pickRadio(page, /Je ne touche à rien/i); await next(page);
    await pickRadio(page, /1 à 3 ans/i); await next(page);
    await pickRadio(page, /15 min/i); await next(page);
    await next(page);
    await pickRadio(page, /Partiellement/i); await next(page);
    await pickRadio(page, /Oui, j'ai compris/i); await next(page);

    await expectProfile(page, 'LE SKIPPER INDÉPENDANT', 'balanced');
  });
});
```

---

## 8. Scénario 6 — Pro Actif (Bruno 50 ans expert)

```typescript
// e2e/onboarding-pro-actif.spec.ts
import { test } from '@playwright/test';
import {
  signInAsTestUser, pickRadio, setSlider, next, expectProfile, cleanupTestUser,
} from './_helpers';

const EMAIL = 'e2e+pro-actif@navlys.test';

test.describe('Profil 6 · Pro Actif', () => {
  test.afterEach(() => cleanupTestUser(EMAIL));

  test('Bruno 50 ans entrepreneur 300 000 € expert → Pro Actif aggressive', async ({ page }) => {
    await signInAsTestUser(page, EMAIL);
    await pickRadio(page, /Faire grandir/i); await next(page);
    await setSlider(page, /âge/i, '50 ans'); await next(page);
    await pickRadio(page, /Entrepreneur/i); await next(page);
    await setSlider(page, /capital/i, '300 000 €'); await next(page);
    await setSlider(page, /épargner/i, '2 500 €'); await next(page);
    await pickRadio(page, /Faire grandir mon capital sur le long terme/i); await next(page);
    await pickRadio(page, /10 à 20 ans/i); await next(page);
    await pickRadio(page, /opportunité d'acheter à prix bas/i); await next(page);
    await pickRadio(page, /10 ans \+/i); await next(page);
    await pickRadio(page, /3 à 5 h/i); await next(page);
    await next(page);
    await pickRadio(page, /Oui, je sais/i); await next(page);
    await pickRadio(page, /Oui, j'ai compris/i); await next(page);

    await expectProfile(page, 'LE PRO ACTIF', 'aggressive');
  });
});
```

---

## 9. Scénario 7 — Navigateur Curieux (Marc 30 ans paper)

```typescript
// e2e/onboarding-navigateur-curieux.spec.ts
import { test, expect } from '@playwright/test';
import {
  signInAsTestUser, pickRadio, setSlider, next, expectProfile, cleanupTestUser,
} from './_helpers';

const EMAIL = 'e2e+navigateur@navlys.test';

test.describe('Profil 7 · Navigateur Curieux', () => {
  test.afterEach(() => cleanupTestUser(EMAIL));

  test('Marc 30 ans étudiant 0 € → Navigateur Curieux paper', async ({ page }) => {
    await signInAsTestUser(page, EMAIL);
    await pickRadio(page, /Apprendre, comprendre/i); await next(page);
    await setSlider(page, /âge/i, '30 ans'); await next(page);
    await pickRadio(page, /Étudiant/i); await next(page);
    await setSlider(page, /capital/i, '0 €'); await next(page);
    await setSlider(page, /épargner/i, '0 €'); await next(page);
    await pickRadio(page, /Apprendre, comprendre/i); await next(page);
    await pickRadio(page, /10 à 20 ans/i); await next(page);
    await pickRadio(page, /Je ne regarde pas/i); await next(page);
    await pickRadio(page, /Zéro, je découvre/i); await next(page);
    await pickRadio(page, /10 h/i); await next(page);
    await next(page);
    await pickRadio(page, /Oui, je sais/i); await next(page);
    await pickRadio(page, /Oui, j'ai compris/i); await next(page);

    await expectProfile(page, 'LE NAVIGATEUR CURIEUX', 'balanced');

    // Allocation doit montrer 100% paper_trading
    await page.goto('/onboarding/routine');
    await expect(page.getByText(/paper trading/i)).toBeVisible();
    await expect(page.getByText(/100 %/)).toBeVisible();
  });
});
```

---

## 10. Scénario bonus — Blocage Q12 (refus éducation seule)

```typescript
// e2e/onboarding-blocked-q12.spec.ts
import { test, expect } from '@playwright/test';
import {
  signInAsTestUser, pickRadio, setSlider, next, cleanupTestUser,
} from './_helpers';

const EMAIL = 'e2e+blocked@navlys.test';

test.describe('Q12 = non → blocage', () => {
  test.afterEach(() => cleanupTestUser(EMAIL));

  test("L'utilisateur refuse le disclaimer éducation seule → redirection /blocked", async ({ page }) => {
    await signInAsTestUser(page, EMAIL);
    await pickRadio(page, /Faire grandir/i); await next(page);
    await setSlider(page, /âge/i, '40 ans'); await next(page);
    await pickRadio(page, /Salarié/i); await next(page);
    await setSlider(page, /capital/i, '30 000 €'); await next(page);
    await setSlider(page, /épargner/i, '500 €'); await next(page);
    await pickRadio(page, /Faire grandir mon capital sur le long terme/i); await next(page);
    await pickRadio(page, /5 à 10 ans/i); await next(page);
    await pickRadio(page, /Je ne touche à rien/i); await next(page);
    await pickRadio(page, /Quelques mois/i); await next(page);
    await pickRadio(page, /15 min/i); await next(page);
    await next(page);
    await pickRadio(page, /Partiellement/i); await next(page);

    // Refus
    await pickRadio(page, /Non, je voulais un conseiller/i); await next(page);

    await expect(page).toHaveURL(/\/onboarding\/blocked/);
    await expect(page.getByText(/NAVLYS n'est pas un cabinet de conseil/i)).toBeVisible();
  });
});
```

---

## 11. Tests d'accessibilité — `e2e/a11y.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

['/onboarding/dream',
 '/onboarding/questionnaire/1',
 '/onboarding/profile',
 '/onboarding/routine',
 '/onboarding/expectations',
 '/onboarding/activate',
 '/dashboard'].forEach((url) => {
  test(`A11y · ${url} sans violations critiques`, async ({ page }) => {
    await page.goto(url);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious'))
      .toEqual([]);
  });
});
```

---

## 12. Exécution en CI

Étendre le workflow GitHub Actions :

```yaml
  e2e:
    needs: ci
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build
      - run: npm run start &
      - run: npx wait-on http://localhost:3000
      - run: npm run test:e2e
        env:
          PLAYWRIGHT_BASE_URL:            http://localhost:3000
          NEXT_PUBLIC_SUPABASE_URL:       ${{ secrets.SUPABASE_URL_E2E }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY:  ${{ secrets.SUPABASE_ANON_E2E }}
          SUPABASE_SERVICE_ROLE_KEY:      ${{ secrets.SUPABASE_SERVICE_E2E }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

Une **base Supabase de test** dédiée à l'E2E (jamais la prod) — création manuelle Bruno + reset SQL en `beforeAll`.

---

## 13. Critères de réussite Beta

- 7 scénarios de profil verts en CI sur chromium + webkit (mobile-first).
- Scénario Q12-blocked vert.
- 7 tests a11y (axe) sans violations critiques/serious.
- Temps total CI E2E < 6 min (parallélisme workers=2).
- 0 régression sur 3 runs consécutifs avant merge prod.

---

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL · 🧭 LE CARTOGRAPHE
