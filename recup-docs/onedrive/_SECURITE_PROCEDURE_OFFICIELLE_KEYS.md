# 🔐 PROCÉDURE OFFICIELLE — Gestion des clés API NAVLYS
*Validée par Le Veilleur de Coffre + La Direction Générale · 29 mai 2026*
*Cette procédure est la SEULE autorisée pour toute clé API du groupe NAVLYS.*

---

## ⚖ LA RÈGLE D'OR — 3 INTERDICTIONS ABSOLUES

❌ **JAMAIS dans le chat Cowork** *(= ce que tu as failli faire avec Anthropic)*
❌ **JAMAIS par mail / WhatsApp / SMS / Telegram / Slack**
❌ **JAMAIS en photo / capture d'écran / vidéo**

Si une clé apparaît dans l'un de ces canaux, elle est **considérée comme compromise** et doit être révoquée immédiatement.

---

## ✅ LA SEULE PROCÉDURE AUTORISÉE — Mode opératoire en 4 étapes

### Étape 1 — Tu créés la clé sur le service
Sur le site officiel (jamais un revendeur), tu génères ta clé. Elle s'affiche **une seule fois**.

### Étape 2 — Tu copies la clé dans ton presse-papier
Sélectionne tout, **Ctrl+C** *(ou clique l'icône "copy")*. La clé est dans ton presse-papier.

### Étape 3 — Tu colles DIRECTEMENT dans Vercel
Ouvre **vercel.com → ton projet → Settings → Environment Variables → Add New** :
- **Name** : le nom exact attendu par le code (voir tableau ci-dessous)
- **Value** : Ctrl+V *(la clé que tu viens de copier)*
- **Environments** : coche les 3 (Production / Preview / Development)
- **Save**

### Étape 4 — Tu me préviens ici
Écris simplement : **"clé X en place dans Vercel"** *(remplace X par le nom du service)*.

Je n'ai pas besoin de voir la clé. Mon code y accédera via `process.env.NOM_DE_LA_CLE` *(= variable d'environnement)*.

---

## 📋 NOMS EXACTS DES VARIABLES VERCEL (à copier-coller dans le champ "Name")

| Service | Nom de variable Vercel | Format de la clé | Où la créer |
|---|---|---|---|
| **Anthropic Claude** | `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | console.anthropic.com → Settings → API Keys |
| **ElevenLabs** | `ELEVENLABS_API_KEY` | `sk_...` | elevenlabs.io → Profile → API Key |
| **ElevenLabs Voice ID** | `ELEVENLABS_VOICE_ID_BRUNO` | UUID court | elevenlabs.io → Voice Lab → ton clone |
| **HeyGen** | `HEYGEN_API_KEY` | clé hex | heygen.com → API → API Token |
| **HeyGen Avatar ID** | `HEYGEN_AVATAR_ID_BRUNO` | UUID | heygen.com → ton Avatar custom |
| **Stripe** | `STRIPE_SECRET_KEY` | `sk_test_...` ou `sk_live_...` | dashboard.stripe.com → Developers → API keys |
| **Stripe Webhook** | `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe → Developers → Webhooks → ton endpoint |
| **Stripe Publishable** | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` ou `pk_live_...` | Stripe → API keys |
| **Supabase URL** | `NEXT_PUBLIC_SUPABASE_URL` | https://xxx.supabase.co | supabase.com → Settings → API |
| **Supabase Anon** | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | eyJh... long | Supabase → API |
| **Supabase Service Role** | `SUPABASE_SERVICE_ROLE_KEY` | eyJh... long ⚠️ super secret | Supabase → API |
| **Crisp Website ID** | `NEXT_PUBLIC_CRISP_WEBSITE_ID` | UUID *(déjà en place)* | crisp.chat → Settings |
| **Resend** | `RESEND_API_KEY` | `re_...` | resend.com → API Keys |
| **Cloudflare R2 Account ID** | `CLOUDFLARE_R2_ACCOUNT_ID` | hex | dash.cloudflare.com → R2 |
| **Cloudflare R2 Access Key** | `CLOUDFLARE_R2_ACCESS_KEY_ID` | hex | Cloudflare R2 → API Tokens |
| **Cloudflare R2 Secret** | `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | hex | Cloudflare R2 → API Tokens |
| **Alpaca Paper Key** | `ALPACA_PAPER_API_KEY` | hex | alpaca.markets → Paper Trading |
| **Alpaca Paper Secret** | `ALPACA_PAPER_API_SECRET` | hex | alpaca.markets → Paper Trading |
| **Make.com Webhook** | `MAKE_WEBHOOK_URL` | https://hook.eu... | make.com → ton scénario |

**Préfixe `NEXT_PUBLIC_`** = visible côté navigateur (uniquement pour les clés non-secrètes, comme l'URL Supabase ou la clé Stripe publishable). Toutes les autres clés sont serveur-uniquement.

---

## 🔄 ROTATION COMPLÈTE AVANT J0 (1ᵉʳ JUIN MINUIT JÉRUSALEM)

Bruno a validé : **toutes les clés actuelles seront révoquées et regénérées avant le lancement officiel.**

### Calendrier de rotation

| Date | Action | Service |
|---|---|---|
| ✅ **MAINTENANT** | Révoque clé Anthropic compromise + nouvelle | Anthropic |
| 🟧 **30 mai matin** | Créer toutes les nouvelles clés en mode TEST | Tous les services |
| 🟧 **31 mai matin** | Tester l'intégration sur Vercel preview | NAV IA + voix + paper trading |
| 🟧 **31 mai soir** | Audit complet du Veilleur de Coffre | Tous |
| 🟥 **1ᵉʳ juin 00:00 Jérusalem** | Bascule des clés TEST en LIVE (Stripe) | Stripe uniquement |
| ✅ **1ᵉʳ juin 00:01** | LANCEMENT OFFICIEL avec clés blindées | Tous opérationnels |

### Clés à régénérer obligatoirement avant J0 (même si pas compromises)
- ✅ Anthropic (déjà compromise → à révoquer maintenant)
- ⚠️ Toutes les autres : créées en mode TEST cette semaine, à régénérer en mode LIVE le 31 mai soir

Pourquoi : on sait qu'aucune trace ne traîne dans les logs/historiques d'aucun système.

---

## 🛡 PROTECTIONS SUPPLÉMENTAIRES MISES EN PLACE

### Côté code
- ✅ Toutes les clés en `process.env.X` *(= variable d'environnement, jamais en dur dans le code)*
- ✅ `.env*` dans `.gitignore` *(= ne sera jamais committé sur Git)*
- ✅ Pre-commit hook qui bloque tout fichier contenant `sk-ant-api`, `sk_test_`, `sk_live_`, etc.
- ✅ Audit `npm audit` + `git-secrets` sur chaque déploiement

### Côté Vercel
- ✅ Variables chiffrées au repos (AES-256)
- ✅ Accès limité au compte propriétaire + équipe
- ✅ Logs d'accès aux variables
- ✅ Rotation possible sans redéploiement

### Côté monitoring
- ✅ Alerte Sentry si appel API échoue (= clé invalide ou révoquée)
- ✅ Dashboard Cloudflare pour anomalies de trafic
- ✅ Alertes spend Anthropic/ElevenLabs/HeyGen si dépassement seuil

---

## 🆘 EN CAS DE DOUTE OU FUITE SOUPÇONNÉE

1. Va sur le dashboard du service concerné
2. **Revoke** la clé immédiatement *(= bouton qui invalide la clé)*
3. Crée une nouvelle clé
4. Mets-la dans Vercel selon la procédure ci-dessus
5. Préviens-moi par "clé X tournée"

→ Aucune punition, aucune honte. Une fuite traitée en < 5 min = aucun dégât. **Mieux vaut révoquer 10 fois par excès de prudence qu'attendre par crainte de "déranger".**

---

## ⚓ POSITION OFFICIELLE DE LA DIRECTION GÉNÉRALE

**Je prends la main complète sur la sécurité jusqu'à J0.**

Toutes les clés passeront par cette procédure exclusivement. Aucune dérogation. Aucune exception. Cowork chat = uniquement des **confirmations** ("clé X en place dans Vercel"), jamais des **valeurs**.

🔐 *Validé Le Veilleur de Coffre · 29 mai 2026 · révision avant tout lancement majeur*
