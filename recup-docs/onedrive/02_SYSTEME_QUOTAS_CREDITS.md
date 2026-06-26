# 📊 02 · SYSTÈME QUOTAS & CRÉDITS

_Spec technique · 29 mai 2026 · v1 · cible Supabase + Stripe + Next.js 14_

> Objectif : compteurs **transparents, équitables, non-piégeux** (G1 user-experience). L'utilisateur voit son compteur, sait quand il atteint 80 %, choisit librement entre attente ou achat de crédits. Aucun shadow throttling.

---

## 0. Principes G1 quotas

1. **Visibilité temps réel** : chaque compteur consommé incrémente immédiatement la valeur affichée à l'utilisateur (dashboard `07`).
2. **Aucune pénalité cachée** : ce qui n'est pas dans le compteur n'est pas facturé. Pas de "frais d'overage" surprise.
3. **Choix utilisateur explicite** : à 100 % du quota, on bloque l'usage en proposant 3 options : attendre le 1ᵉʳ du mois suivant, acheter un pack de crédits, upgrader la formule.
4. **Crédits non expirables avant 12 mois** : validité 12 mois glissants à compter de l'achat.
5. **Remboursement compte clôturé** : pro rata des crédits non utilisés (cf. `06_RGPD_QUOTAS_TRANSPARENCE.md`).

---

## 1. Schéma Supabase

### 1.1 Table `user_quotas`

```sql
-- Compteurs mensuels par utilisateur, par catégorie.
CREATE TABLE IF NOT EXISTS public.user_quotas (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  navbio_formula    text NOT NULL CHECK (navbio_formula IN ('solo','couple','premium','cinema','pro')),
  period_month      date NOT NULL,                       -- 1er du mois (ex 2026-06-01)
  -- Catégories de quotas
  memories_used     integer NOT NULL DEFAULT 0,
  memories_limit    integer NOT NULL,                    -- 50, 100, 250, 1000, NULL=illimité
  video_minutes_used numeric(5,2) NOT NULL DEFAULT 0,    -- décimales pour rester précis
  video_minutes_limit numeric(5,2) NOT NULL DEFAULT 5,   -- 0 si pas de NEXT GEN APP
  voice_minutes_used numeric(5,2) NOT NULL DEFAULT 0,
  voice_minutes_limit numeric(5,2) NOT NULL DEFAULT 30,
  bio_syntheses_used integer NOT NULL DEFAULT 0,
  bio_syntheses_limit integer NOT NULL DEFAULT 4,        -- 4/mois quel que soit le palier
  -- Métadonnées
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, period_month)
);

CREATE INDEX idx_user_quotas_user_period ON public.user_quotas(user_id, period_month DESC);

-- RLS : user voit ses propres quotas, service_role écrit
ALTER TABLE public.user_quotas ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_quotas_select_own ON public.user_quotas
  FOR SELECT USING (auth.uid() = user_id);
```

### 1.2 Table `user_credits`

```sql
-- Soldes de crédits achetés one-shot, additionnels au quota mensuel.
CREATE TABLE IF NOT EXISTS public.user_credits (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  credit_type       text NOT NULL CHECK (credit_type IN ('memories','video_minutes','voice_minutes')),
  balance           numeric(10,2) NOT NULL DEFAULT 0,    -- crédit restant
  total_purchased   numeric(10,2) NOT NULL DEFAULT 0,    -- historique cumulé
  last_purchase_at  timestamptz,
  expires_at        timestamptz NOT NULL,                -- last_purchase_at + 12 mois
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, credit_type)
);

ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_credits_select_own ON public.user_credits
  FOR SELECT USING (auth.uid() = user_id);
```

### 1.3 Table `user_credit_purchases`

```sql
-- Journal des achats (audit + remboursement pro rata)
CREATE TABLE IF NOT EXISTS public.user_credit_purchases (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id text UNIQUE NOT NULL,
  stripe_price_id   text NOT NULL,
  credit_type       text NOT NULL,
  amount_eur        numeric(10,2) NOT NULL,
  units_purchased   numeric(10,2) NOT NULL,
  purchased_at      timestamptz NOT NULL DEFAULT now(),
  expires_at        timestamptz NOT NULL
);

CREATE INDEX idx_credit_purchases_user ON public.user_credit_purchases(user_id, purchased_at DESC);

ALTER TABLE public.user_credit_purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY credit_purchases_select_own ON public.user_credit_purchases
  FOR SELECT USING (auth.uid() = user_id);
```

### 1.4 Table `user_quota_alerts`

```sql
-- Pour audit + idempotence des notifications
CREATE TABLE IF NOT EXISTS public.user_quota_alerts (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  period_month      date NOT NULL,
  category          text NOT NULL,                       -- memories / video / voice / bio_syntheses
  threshold_pct     integer NOT NULL CHECK (threshold_pct IN (80,100)),
  notified_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, period_month, category, threshold_pct)
);
```

---

## 2. Quotas par formule (référence)

| Formule | Souvenirs/mois | Vidéo IA min/mois | Voix IA min/mois | Synthèses bio/mois |
|---|---|---|---|---|
| Solo (sans NEXT GEN APP) | 50 | 0 | 0 | 4 |
| Solo + NEXT GEN APP option | 50 | 5 | 30 | 4 |
| Couple (sans NEXT GEN APP) | 100 | 0 | 0 | 4 |
| Couple + NEXT GEN APP option | 100 | 5 | 30 | 4 |
| **Premium (NEXT GEN APP inclus)** | **250** | **5** | **30** | **4** |
| **Cinéma (NEXT GEN APP inclus)** | **1 000** | **5** | **30** | **4** |
| **Pro (NEXT GEN APP inclus)** | **∞** | **5** | **30** | **4** |

> Les synthèses bio sont volontairement limitées même pour Pro (4/mois) car coût compute API Claude/GPT élevé. Ajustable V1.1.

---

## 3. Reset mensuel — Cron Supabase

Edge function `reset-quotas-monthly` déclenchée par Supabase Cron le **1ᵉʳ de chaque mois à 00:00 UTC**.

```sql
-- supabase/migrations/2026XXXX_quota_reset_fn.sql
CREATE OR REPLACE FUNCTION public.reset_user_quotas()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  rec record;
BEGIN
  FOR rec IN
    SELECT DISTINCT user_id, navbio_formula
    FROM public.user_quotas
    WHERE period_month = date_trunc('month', now())::date - interval '1 month'
  LOOP
    INSERT INTO public.user_quotas (
      user_id, navbio_formula, period_month,
      memories_limit, video_minutes_limit, voice_minutes_limit
    ) VALUES (
      rec.user_id,
      rec.navbio_formula,
      date_trunc('month', now())::date,
      CASE rec.navbio_formula
        WHEN 'solo'    THEN 50
        WHEN 'couple'  THEN 100
        WHEN 'premium' THEN 250
        WHEN 'cinema'  THEN 1000
        WHEN 'pro'     THEN 2147483647
      END,
      CASE WHEN rec.navbio_formula IN ('premium','cinema','pro')
              OR EXISTS (SELECT 1 FROM public.user_addons WHERE user_id = rec.user_id AND addon = 'nextgen_app')
           THEN 5 ELSE 0 END,
      CASE WHEN rec.navbio_formula IN ('premium','cinema','pro')
              OR EXISTS (SELECT 1 FROM public.user_addons WHERE user_id = rec.user_id AND addon = 'nextgen_app')
           THEN 30 ELSE 0 END
    )
    ON CONFLICT (user_id, period_month) DO NOTHING;
  END LOOP;
END;
$$;

-- Schedule via pg_cron (Supabase)
SELECT cron.schedule(
  'reset-quotas-monthly',
  '0 0 1 * *',           -- minuit le 1er de chaque mois UTC
  $$ SELECT public.reset_user_quotas(); $$
);
```

---

## 4. Notifications utilisateur — règles

### 4.1 Seuil 80 %

- Bannière in-app `<QuotaWarning level="warning" />` orange visible jusqu'à fin de mois ou achat crédits.
- Email Resend automatique (template FR/EN) : "Tu approches la limite du mois. Choisis ton cap : attendre, acheter, upgrader."
- Idempotence : 1 notif max par mois et par catégorie via table `user_quota_alerts`.

### 4.2 Seuil 100 %

- Blocage doux : refus de la prochaine opération qui dépasserait le quota.
- Modal `<UpgradeOrCredit />` (cf. `04_CODE_INTEGRATION_QUOTAS_CREDITS.md`) avec 3 boutons :
  1. **Acheter un pack de crédits** → Stripe Checkout one-shot
  2. **Upgrader vers la formule supérieure** → Stripe Checkout sub upgrade (delta calculé)
  3. **Attendre le 1ᵉʳ du mois** → ferme la modale, l'opération bloquée n'est pas exécutée
- Email Resend automatique post-blocage : "Ton mois NAVBIO a atteint son sommet. Voici 3 caps possibles."

### 4.3 Texte FR / EN

**80 % FR.** « Tu as utilisé X % de tes Y souvenirs ce mois. Tu peux attendre le 1ᵉʳ du mois prochain, acheter un pack de crédits (Z € = N souvenirs supplémentaires), ou passer à la formule supérieure. Ton choix, on reste à bord. »

**80 % EN.** "You've used X % of your Y memories this month. Wait until the 1st, buy a credit pack (€Z = N more memories), or upgrade. Your call, we stay on board."

**100 % FR.** « Cap atteint pour ce mois sur les souvenirs. Choisis ta route : acheter, upgrader, ou attendre. Ce que tu as déjà déposé reste à bord. »

**100 % EN.** "Monthly cap reached for memories. Choose your course: buy, upgrade, or wait. What you've already uploaded stays on board."

---

## 5. Compteurs — règles de comptage

### 5.1 Souvenirs uploadés (catégorie `memories`)

- **1 fichier média = 1 souvenir** quelle que soit la taille.
- **1 enregistrement audio ou vidéo natif** capté via l'app = 1 souvenir.
- **1 entrée de texte ≥ 200 caractères** = 1 souvenir.
- < 200 caractères = bouts de phrase, **non comptés** (équité G1).

### 5.2 Minutes vidéo IA (catégorie `video_minutes`)

- Arrondi à la seconde supérieure (ex 1 min 12 s = 1.20 min).
- Génération annulée avant complétion = non décomptée.
- Génération erreur côté API HeyGen = non décomptée (crédit auto-refund).

### 5.3 Minutes voix IA (catégorie `voice_minutes`)

- Idem vidéo : arrondi à la seconde supérieure, refund auto sur erreur.

### 5.4 Synthèses bio (catégorie `bio_syntheses`)

- 1 synthèse complète déclenchée = 1 décompte.
- Régénération à l'identique dans la même session (< 30 min) **non décomptée** (UX).
- Régénération > 30 min ou avec changement de paramètres = nouvelle synthèse comptée.

---

## 6. Algorithme de consommation (pseudocode)

```ts
async function consume(userId: string, category: QuotaCategory, units: number) {
  const quota   = await fetchCurrentQuota(userId);
  const credits = await fetchCredits(userId, category);

  const monthlyRemaining = quota[`${category}_limit`] - quota[`${category}_used`];
  const totalAvailable   = monthlyRemaining + credits.balance;

  if (units > totalAvailable) {
    throw new QuotaExceededError(category, totalAvailable);
  }

  // 1. Consommer d'abord le quota mensuel
  const fromMonthly = Math.min(units, monthlyRemaining);
  // 2. Puis les crédits achetés
  const fromCredits = units - fromMonthly;

  await sb.from('user_quotas')
    .update({ [`${category}_used`]: quota[`${category}_used`] + fromMonthly })
    .eq('user_id', userId).eq('period_month', currentMonth);

  if (fromCredits > 0) {
    await sb.from('user_credits')
      .update({ balance: credits.balance - fromCredits })
      .eq('user_id', userId).eq('credit_type', category);
  }

  // Trigger notifications à 80 % / 100 %
  await checkAndNotifyThresholds(userId, category, quota);
}
```

Le quota mensuel est **toujours consommé en premier**. Les crédits achetés ne sont entamés que si le mensuel est épuisé. Cela garantit que les crédits restent utilisables le mois suivant si l'utilisateur ne touche pas son nouveau quota.

---

## 7. Validité des crédits & rollover

- Achat le 15 juin 2026 → expire le **15 juin 2027** (12 mois glissants).
- Si non utilisés avant expiration → expirent sans remboursement (mentionné CGV).
- Si l'utilisateur clôture son compte → remboursement pro rata des crédits valides restants sous 14 jours (RGPD `06`).

---

## 8. Limites techniques

| Limite | Valeur |
|---|---|
| Taille fichier upload souvenir | 100 MB (vidéo) / 50 MB (audio) / 20 MB (image/PDF) |
| Durée max vidéo IA générée | 3 min par génération (HeyGen API limit) |
| Durée max voix IA générée | 5 min par génération (ElevenLabs limit) |
| Concurrence requêtes IA par utilisateur | 1 (queue, pas de parallèle) |
| Rate limit API quotas (Next.js) | 60 req/min/user |

---

> ⚓ Un quota équitable, c'est un quota lisible. L'utilisateur sait, l'utilisateur choisit, l'utilisateur reste maître de sa main. Pas de piège, pas de petits caractères.
