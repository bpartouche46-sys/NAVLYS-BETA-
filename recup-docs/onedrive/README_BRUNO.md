# 📘 NAVBIO LIFE — Guide Bruno (Client #001)

> **Statut** : code complet · ready beta · clés à brancher.
> **Dossier** : `_SITES_MASTER/_APP_NAVBIO_v1/`
> **Cible** : BETA le 1ᵉʳ juin 2026 minuit Jérusalem.

---

## 🚀 Démarrage en 5 minutes

```bash
cd _SITES_MASTER/_APP_NAVBIO_v1
npm install
cp .env.template .env.local
# remplir .env.local avec les valeurs réelles (Supabase / R2 / Stripe / Anthropic)
npm run dev
# Ouvrir http://localhost:3001
```

---

## 🔑 Ce qu'il te reste à fournir (les 3 actions incontournables)

### 1. Comptes services à ouvrir sous `bruno@navlys.com`
| Service | Où | Quoi récupérer |
|---|---|---|
| **Supabase** | supabase.com | Project URL + anon key + service_role key |
| **Cloudflare R2** | dash.cloudflare.com | Account ID + Access Key + Secret + bucket `navbio-vault` |
| **Stripe** | dashboard.stripe.com (mode TEST) | sk_test_ + pk_test_ + webhook secret + 10 Price IDs |
| **Anthropic** | console.anthropic.com | API key (sk-ant-...) |
| **Resend** | resend.com | API key (re_...) |

### 2. Exécuter le schema SQL Supabase
- Ouvre Supabase → SQL Editor → colle `lib/supabase/schema.sql` → Run.
- Active Email magic link dans Auth → Providers.
- Redirect URL : `https://navbio.navlys.com/auth/callback` + `http://localhost:3001/auth/callback`.

### 3. Créer les 10 Stripe Prices (mode TEST)
Catalog → Products → 5 paliers + 5 add-ons. Note les Price IDs et colle dans `.env.local`.

---

## 🧭 Architecture

| Couche | Tech |
|---|---|
| Front | Next.js 14 App Router, TypeScript strict, Tailwind, Framer Motion |
| Auth | Supabase magic link |
| Storage | Cloudflare R2 (chiffré E2E AES-256-GCM, presigned URLs) |
| DB | Supabase Postgres (metadata uniquement, zero contenu en clair) |
| Paiement | Stripe Checkout one-shot (TEST en beta) |
| IA | Claude Sonnet 4.6 via Anthropic SDK |
| Crypto | WebCrypto natif, PBKDF2 600k, AES-GCM 256 |
| i18n | 12 langues, FR/EN actifs, autres fallback EN |
| PWA | next-pwa, manifest, service worker |

---

## 🔐 Zero-knowledge — comment ça marche

1. À la création d'une « vie », l'utilisateur choisit un mot de passe (min 12 c.) **qui ne quitte jamais son appareil**.
2. PBKDF2 (600k itérations + salt unique stocké en DB) dérive une clé AES-256.
3. Avant chaque upload, le fichier est chiffré en AES-GCM dans le navigateur.
4. R2 ne reçoit qu'un blob aléatoire. Supabase ne stocke que le pointeur + l'IV.
5. **Si Bruno perd l'accès au serveur** → personne ne peut lire les souvenirs.
6. **Si l'utilisateur oublie le mot de passe** → souvenirs perdus, c'est le prix du zero-knowledge.

> ⚠️ La synthèse IA exige que les transcriptions soient envoyées en clair à Claude. C'est pourquoi `ai_transcript` est un champ optionnel : l'utilisateur active la transcription **par souvenir**. Sans transcription, la bio s'appuie uniquement sur les tags (date/lieu/personnes/émotion).

---

## 🧪 Tests

```bash
npm run test:e2e         # 6 scénarios Playwright
npm run test:e2e:ui      # mode interactif
npm run typecheck        # TS strict
npm run lint
```

---

## 🚢 Déploiement Vercel

```bash
# CLI Vercel locale (méthode qui marche, cf. CLAUDE.md)
/tmp/vdir/node_modules/.bin/vercel deploy --prod --yes --token=$VT --scope navlys
```

**Domaine cible** : `navbio.navlys.com` (sous-domaine de navlys.com, garder les MX Google).

---

## ✅ Checklist mise en prod

- [ ] `.env.local` complet
- [ ] Schema SQL exécuté
- [ ] Stripe webhook configuré : `https://navbio.navlys.com/api/stripe/webhook`
- [ ] 10 Stripe Prices créés
- [ ] Test parcours : signup → checkout TEST → création vie → upload chiffré → timeline → synthèse IA
- [ ] Lighthouse mobile ≥ 90 sur les 4 axes
- [ ] axe-core a11y : 0 violation critique
- [ ] WCAG AA validé manuellement (contraste, focus, ARIA)
- [ ] PWA installable iOS + Android
- [ ] Bouton « BM » visible sur chaque page
- [ ] Tagline BM présente sur home + success
- [ ] Disclaimer G1 sur toutes les pages (vérifié dans `06-export-pdf.spec.ts`)

---

## 📞 Support technique

- Documentation détaillée : `AUDIT_FINAL.md` dans ce même dossier.
- Schéma DB : `lib/supabase/schema.sql`.
- Glossaire multilingue : `_SITES_MASTER/_GLOSSAIRE_MULTILINGUE_NAVLYS.md`.
- Tagline officielle : `_SITES_MASTER/_TAGLINE_BM_COMMUNICATIONS.md`.

---

*Ma méthode, Votre argent, Votre tempo !* — BM
