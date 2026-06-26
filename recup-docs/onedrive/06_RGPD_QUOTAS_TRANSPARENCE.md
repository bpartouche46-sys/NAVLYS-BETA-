# 🛡️ 06 · RGPD & TRANSPARENCE QUOTAS

_Conformité légale + politique éthique · 29 mai 2026 · v1 · à valider avocat partenaire_

> Document maître pour les CGV/CGU NAVLYS × NAVBIO concernant **quotas, crédits et option NEXT GEN APP**. Bruno doit faire valider la version finale par un avocat français (Mizrahi IL en phase 2) avant mise en production LIVE.

---

## 0. Engagements G1 transparence

| Engagement | Concrétisation technique |
|---|---|
| Compteurs visibles temps réel | Dashboard `/dashboard/quotas` + API SWR refresh 30s |
| Pas de shadow throttling | Bloc explicite à 100 %, jamais de "dégradation silencieuse" |
| Pas de "frais surprises" | Stripe Checkout = prix final affiché avant clic confirmer |
| Facture automatique | Stripe envoie reçu + facture conforme art. 286 CGI |
| Réversibilité achats add-ons | Hébergement long terme + notarial = remboursement 14j si non exécuté |
| Suppression compte = remboursement crédits valides | Pro rata calculé sur dernier achat, sous 14 j ouvrés |

---

## 1. Bases légales (RGPD article 6)

### 1.1 Traitement compteurs `user_quotas`

- **Base légale** : exécution du contrat (article 6.1.b) — sans le compteur, pas de service.
- **Durée de conservation** : 12 mois glissants pour audit + reset mensuel.
- **Destinataires** : utilisateur (lui-même), Bruno Partouche (admin), Supabase EU (hébergement).

### 1.2 Traitement `user_credits` + `user_credit_purchases`

- **Base légale** : exécution du contrat + obligation comptable (10 ans, article L123-22 Code de commerce).
- **Anonymisation après 10 ans** : montant et date conservés, lien `user_id` rompu.

### 1.3 Données biométriques NEXT GEN APP (voix clonée + avatar)

- **Catégorie particulière** : article 9.2.a RGPD = **consentement explicite obligatoire**.
- **Stockage** : voiceprints chez ElevenLabs (US, SCC EU) + avatars HeyGen (US, SCC EU). DPA signés à fournir.
- **Droit de retrait** : suppression voiceprint + avatar à la demande, effet immédiat + propagation API tiers sous 48 h.
- **Conservation par défaut** : durée de l'abonnement / utilisation NAVBIO. Suppression automatique à clôture compte.

> ⚠️ Bruno doit signer DPAs ElevenLabs + HeyGen AVANT activation LIVE. Sinon NEXT GEN APP reste TEST uniquement.

---

## 2. Politique compteur transparent

### 2.1 Ce que l'utilisateur voit

À tout moment, depuis `/dashboard/quotas` :
1. Compteur exact (ex : `42 / 50 souvenirs`)
2. % atteint en barre visuelle (bronze → or → ambre → rouge)
3. Solde de crédits achetés en plus (ex : `+ 25 crédits`)
4. Date de reset (1ᵉʳ du mois suivant) avec timezone utilisateur
5. Bouton "Acheter des crédits" toujours visible (pas seulement à 80 %)
6. Historique 12 mois (table déroulante, export CSV possible)

### 2.2 Ce qui est interdit

- ❌ Compteur déformé / rounding agressif à l'avantage de l'éditeur.
- ❌ "Dégradation silencieuse" (réduire qualité après quota sans le dire).
- ❌ Bonus surprise opaque (genre "tu as eu 5 crédits cadeau" sans traçabilité).
- ❌ Pré-achat forcé de crédits dans le panier sans coche claire.

### 2.3 Algorithme de comptage public

```
Pour chaque opération qui consomme un quota :
  IF mensual_used < mensual_limit:
     consommer 1 sur mensual_used
     log: { user, category, source: 'monthly', delta: 1 }
  ELSE:
     IF credits_balance > 0:
        consommer 1 sur credits_balance
        log: { user, category, source: 'credits', delta: 1 }
     ELSE:
        bloquer + modal UpgradeOrCredit
        log: { user, category, source: 'blocked', delta: 0 }
```

Le log est consultable par l'utilisateur via `/parametres/historique-quotas` (export JSON + CSV).

---

## 3. Facturation Stripe

### 3.1 Facture automatique

- Chaque paiement (abonnement, one-shot, crédits) génère une **facture Stripe conforme art. 286 CGI**.
- Lien direct dans l'email Stripe + accessible depuis `/parametres/facturation`.
- Mention obligatoire : « Bruno Mark Partouche, éditeur de contenu pédagogique, SIRET XXX, TVA non applicable art. 293 B CGI » (si auto-entrepreneur en franchise).

### 3.2 Si dépassement franchise TVA

Bruno doit basculer en TVA dès dépassement seuils (94 300 € HT services 2026). Toutes les factures Stripe deviennent alors **TVA 20 % France**. Adaptation automatique via Stripe Tax si activé.

---

## 4. Remboursement & droit de rétractation

### 4.1 Abonnement NAVLYS NEXT GEN INVEST

- **Droit de rétractation 14 jours** (article L221-18) à la signature, mais...
- ...Si l'utilisateur commence à utiliser le service (consulter contenu, paper trading…) **avant** 14 j, il **renonce** explicitement (case à cocher signup) → conforme article L221-28.
- Annulation libre à tout moment depuis `/parametres/abonnement` → effet fin de période en cours, aucun pro rata.

### 4.2 NAVBIO one-shot

- **Pas de rétractation par défaut** : contenu numérique exécuté immédiatement (case à cocher signup obligatoire, conforme L221-28).
- **Si l'utilisateur n'a rien uploadé sous 14 j** : remboursement intégral à demande (geste commercial Bruno, mention CGV §X).

### 4.3 Crédits achetés

- **Non remboursables** si déjà consommés.
- **Remboursables pro rata des unités restantes** si :
  - Clôture compte volontaire de l'utilisateur
  - Suspension service > 30 jours de notre fait
  - Bug technique avéré ayant consommé crédits

### 4.4 Add-ons NAVBIO

| Add-on | Remboursable |
|---|---|
| Hébergement 5 ans | Oui pro rata années restantes |
| Hébergement 10 ans | Oui pro rata années restantes |
| Hébergement perpétuel | Oui dans les 14 j ; après = engagement total |
| Notarial transmission | Oui si service notarial non engagé |
| Traduction bio | Non si traduction délivrée |
| Livre papier 50 ex | Non après envoi imprimeur |

---

## 5. Suppression de compte — workflow

```
1. User → /parametres/suppression-compte
2. Confirmation avec re-saisie email + délai 7 j (réversible)
3. À J+7 (job cron) :
   a. Listage des crédits valides + add-ons non exécutés
   b. Calcul pro rata remboursement
   c. Stripe refund automatique
   d. Suppression données utilisateur :
      - auth.users (RLS cascade → tout)
      - storage Supabase fichiers chiffrés
      - voiceprints ElevenLabs (API DELETE)
      - avatars HeyGen (API DELETE)
   e. Conservation données comptables (anonymisées) 10 ans
   f. Email confirmation suppression effective
4. Toujours possible : annuler la demande tant qu'à J<7
```

### 5.1 Script de suppression (extrait)

```ts
// app/api/account/delete/route.ts
async function processDeletion(userId: string) {
  const sb = createServiceRoleClient();

  // 1. Calculer remboursement crédits valides
  const { data: credits } = await sb.from('user_credits')
    .select('*').eq('user_id', userId).gt('expires_at', new Date().toISOString());

  for (const c of credits ?? []) {
    if (c.balance > 0) {
      // Retrouver dernier achat + faire refund pro rata
      const { data: lastPurchase } = await sb.from('user_credit_purchases')
        .select('*').eq('user_id', userId).eq('credit_type', c.credit_type)
        .order('purchased_at', { ascending: false }).limit(1).single();
      if (lastPurchase) {
        const ratio = c.balance / lastPurchase.units_purchased;
        const refundAmount = Math.round(lastPurchase.amount_eur * 100 * ratio); // cents
        await stripe.refunds.create({
          payment_intent: await getPaymentIntentFromSession(lastPurchase.stripe_session_id),
          amount: refundAmount,
          reason: 'requested_by_customer',
          metadata: { reason: 'account_deletion_credit_unused' },
        });
      }
    }
  }

  // 2. Supprimer voiceprints / avatars
  await fetch(`https://api.elevenlabs.io/v1/voices/${userId}`, {
    method: 'DELETE',
    headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY! }
  });
  // ... HeyGen pareil

  // 3. Anonymiser comptabilité (10 ans)
  await sb.from('user_credit_purchases')
    .update({ user_id: null, anonymized_at: new Date().toISOString() })
    .eq('user_id', userId);

  // 4. Supprimer user (RLS cascade)
  await sb.auth.admin.deleteUser(userId);
}
```

---

## 6. Audit RGPD — checklist déploiement

| Item | Statut requis avant LIVE |
|---|---|
| Politique confidentialité publiée | ✅ |
| CGV/CGU publiées | ✅ |
| DPO désigné (ou Bruno si < 250 employés) | ✅ |
| Registre traitements à jour | ✅ |
| DPA Supabase signé (EU) | ✅ |
| DPA Stripe signé | ✅ |
| DPA Resend signé | ✅ |
| DPA ElevenLabs signé (SCC) | ⚠️ avant activation LIVE |
| DPA HeyGen signé (SCC) | ⚠️ avant activation LIVE |
| AIPD (analyse d'impact) données biométriques | ⚠️ obligatoire NEXT GEN APP |
| Bandeau cookies fonctionnels uniquement | ✅ |
| Bouton export RGPD `/api/rgpd/export` | ✅ déjà dans NAVBIO |
| Bouton suppression compte | ✅ |

---

## 7. Mentions à intégrer dans CGV section "Quotas et crédits"

### 7.1 Version FR

> **Article X — Quotas mensuels et crédits supplémentaires (NAVBIO)**
>
> 1. Chaque formule NAVBIO inclut un quota mensuel défini dans la grille tarifaire publiée sur navbio.navlys.com. Les quotas sont remis à zéro le 1ᵉʳ de chaque mois à 00:00 UTC.
> 2. L'utilisateur peut acheter des crédits supplémentaires en cas de dépassement. Ces crédits sont valables 12 mois à compter de leur achat et ne sont pas remboursables une fois consommés.
> 3. Les compteurs sont visibles à tout moment depuis l'espace utilisateur. Aucun ralentissement caché n'est pratiqué.
> 4. En cas de clôture de compte, les crédits achetés non utilisés sont remboursés au prorata sous 14 jours ouvrés.
> 5. L'option NEXT GEN APP (clonage voix + avatar IA) repose sur des données biométriques. Son activation requiert un consentement explicite RGPD (article 9.2.a). L'utilisateur peut retirer ce consentement à tout moment ; les données biométriques sont alors supprimées sous 48 heures auprès des sous-traitants ElevenLabs et HeyGen.

### 7.2 Version EN

> **Article X — Monthly quotas and top-up credits (NAVBIO)**
>
> 1. Each NAVBIO plan includes a monthly quota set in the pricing grid published on navbio.navlys.com. Quotas reset on the 1st of each month at 00:00 UTC.
> 2. Users may purchase additional credits in case of overage. Credits are valid for 12 months from purchase and are non-refundable once consumed.
> 3. Counters are visible at all times in the user account. No silent throttling is applied.
> 4. Upon account closure, unused purchased credits are refunded pro rata within 14 working days.
> 5. The NEXT GEN APP option (voice cloning + AI avatar) relies on biometric data. Activation requires explicit GDPR consent (article 9.2.a). Users may withdraw consent at any time; biometric data are deleted within 48 hours from ElevenLabs and HeyGen sub-processors.

---

## 8. Plan d'action Bruno

1. **Signer DPAs** ElevenLabs + HeyGen (envoyer demande à leur DPO).
2. **Rédiger AIPD** (Analyse d'Impact sur la Protection des Données) pour NEXT GEN APP — template CNIL disponible. Délai : 2 semaines avant LIVE.
3. **Mettre à jour CGV** avec articles §7 ci-dessus. Validation avocat partenaire.
4. **Publier politique confidentialité v2** mentionnant les données biométriques.
5. **Activer Stripe Tax** si dépassement franchise TVA approche.
6. **Configurer cron suppression compte** Supabase (job hebdomadaire).

---

> ⚓ La transparence n'est pas un slogan. C'est un compteur visible, un bouton de sortie clair, et un remboursement automatique quand on quitte le bord. Le reste suit.
