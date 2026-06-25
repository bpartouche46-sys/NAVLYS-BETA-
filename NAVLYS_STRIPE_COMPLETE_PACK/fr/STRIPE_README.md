# NAVLYS — Stripe README (FR)

> Guide pas-à-pas pour Bruno. Aucun jargon inutile, langage maritime simple.

## 1. Ouvre ton compte Stripe France

1. Va sur `https://dashboard.stripe.com/register`.
2. Crée le compte avec l'email NAVLYS (séparé de ton mail perso).
3. Active le mode **Live** une fois les pièces fournies (KBIS, IBAN, ID).
4. Configure la TVA française : Settings → Tax → activer **France 20%**.

## 2. Récupère tes clés (Test d'abord)

Dashboard → Developers → API keys :
- **Publishable key** : `pk_test_...`
- **Secret key** : `sk_test_...`

Tu mets ces clés dans Vercel (jamais en clair côté client).

## 3. Variables d'environnement Vercel

Ajoute ces 4 variables dans Vercel → Settings → Environment Variables :

```
STRIPE_SECRET_KEY        = sk_test_...      (ou sk_live_... en prod)
STRIPE_PUBLISHABLE_KEY   = pk_test_...      (ou pk_live_... en prod)
STRIPE_WEBHOOK_SECRET    = whsec_...        (donné après création webhook)
NAVLYS_BASE_URL          = https://navlys.com   (ou domaine Vercel)
NAVLYS_ADMIN_TOKEN       = (génère un secret aléatoire 32 caractères)
NAVLYS_WORKSHOP_EMAIL    = fulfillment@navlys.com
```

## 4. Provisionne les produits Stripe

### Sous macOS / Linux
```bash
chmod +x setup/setup_stripe_navlys.sh
./setup/setup_stripe_navlys.sh
```

### Sous Windows PowerShell
```powershell
.\setup\setup_stripe_navlys.ps1
```

Le script crée :
- 3 produits (Mensuel 49 € / Annuel 490 € / Bio Live 39 €)
- 5 coupons Vibez (escalier promo)
- 1 endpoint webhook pointant vers `NAVLYS_BASE_URL/api/stripe/webhook`

## 5. Récupère le secret du webhook

À la fin du script, copie le `whsec_...` retourné par Stripe et colle-le dans Vercel comme `STRIPE_WEBHOOK_SECRET`.

## 6. Test bout-en-bout

```bash
./setup/seed_test_customers.sh
stripe trigger checkout.session.completed
stripe trigger invoice.paid
```

Vérifie :
- Email bienvenue envoyé (console serveur en dev).
- Si plan annuel : bon de commande pièce de bronze loggué.

## 7. Pages publiques connectées

- FR : `https://navlys.com/rejoindre-equipage`
- EN : `https://navlys.com/en/join-the-crew`
- Confirmation FR : `/succes`
- Confirmation EN : `/en/success`
- Portal client (gestion abo) : POST `/api/stripe/portal` avec `{ email }`

## 8. Pièce de bronze — protocole opérationnel

Voir `fulfillment/fr/PROTOCOLE_PIECE_BRONZE.md`. En résumé :
1. Stripe confirme un paiement annuel → webhook → bon de commande auto.
2. Bruno valide dans le back-office.
3. Atelier frappe la pièce numérotée.
4. Bruno reçoit, contrôle, embale, expédie UPS.
5. Membre reçoit sa pièce sous 3-5 semaines.

## 9. Sécurité essentielle

- **JAMAIS** de clé secrète Stripe côté client.
- Webhook **toujours** signature-vérifié (déjà géré dans `webhook/route.ts`).
- Rate limit `/api/stripe/*` géré par middleware Vercel (voir VERCEL_FIX_PACK).
- Pas de PII dans les logs serveurs.

## 10. Aller en production

1. Bascule en `sk_live_...` et `pk_live_...` côté Vercel (env Production).
2. Re-run `setup_stripe_navlys.sh` en mode Live (les coupons/produits sont par mode).
3. Mets à jour `NAVLYS_BASE_URL` avec le domaine final.
4. Active 3D Secure 2 (déjà activé par défaut côté Stripe Europe).
5. Test une vraie transaction 49 €, vérifie virement IBAN J+7.

---

*« On ne navigue pas contre le vent, on ajuste les voiles. »*
— NAVLYS NEXT GEN INVEST
