# ✅ 09 — PLAN D'ACTION BRUNO (checklist barricade)

**Mission Le Veilleur de Coffre + Le Sémaphore · 29 mai 2026 · Temps cumulé Bruno : ~3h étalé sur 10 jours**

> Chaque action est ordonnée, chronométrée, indépendante. Bruno coche au fur et à mesure. Les 5 premières (DNSSEC + DNS NAVLYS) sont les plus urgentes : **15 min cumulé**, déblocage A+ immédiat.

---

## 🎯 EFFETS APRÈS EXÉCUTION

| Avant | Après |
|---|---|
| SSL grade B | **A+** |
| Mozilla Observatory 50 | **130/100 (A+)** |
| DMARC absent | **DMARC quarantine puis reject** |
| Spam reputation inconnue | **Google Postmaster High** |
| Pas de WAF | **OWASP CRS + Bot Fight Pro** |
| Pas de monitoring | **Cron hebdo + alertes SMS** |
| Présence non vérifiée | **10 plateformes vérifiées** |

---

## 📋 LES 11 ÉTAPES (ordre exact)

---

### ✅ ÉTAPE 1 — Activer DNSSEC sur Cloudflare (5 min, gratuit)

**Pour chaque des 4 domaines** (navlys.com, navbiolife.com, navlys.io, brunopartouche.com) :

1. Aller sur https://dash.cloudflare.com → choisir domaine
2. Menu **DNS** → onglet **Settings** → section **DNSSEC**
3. Cliquer **Enable DNSSEC**
4. **Copier le DS Record** complet affiché
5. Aller chez **Namecheap** → Domain List → domaine → **Advanced DNS** → **DNSSEC**
6. Coller : Key Tag, Algorithm (13), Digest Type (2), Digest
7. Save

**Temps total 4 domaines** : **20 min**.

**Validation J+2** : https://dnsviz.net/d/navlys.com/dnssec/ → tout vert.

---

### ✅ ÉTAPE 2 — Ajouter 8 enregistrements DNS pour navlys.com (10 min)

Cloudflare → navlys.com → **DNS** → onglet **Records** → Add record.

Copier-coller chaque ligne (voir détails dans fichier `01_SECURITE_EMAIL_NAVLYS.md`) :

| Type | Nom | Valeur | TTL |
|---|---|---|---|
| TXT | `@` | `v=spf1 include:_spf.google.com include:_spf.resend.com -all` | Auto |
| TXT | `google._domainkey` | (clé depuis Google Admin → Gmail → Authentifier) | Auto |
| TXT | `resend._domainkey` | (clé depuis Resend dashboard) | Auto |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc-reports@navlys.com; adkim=s; aspf=s` | Auto |
| TXT | `_smtp._tls` | `v=TLSRPTv1; rua=mailto:tls-reports@navlys.com` | Auto |
| TXT | `_mta-sts` | `v=STSv1; id=20260529v1` | Auto |
| CAA | `@` | flag 0, tag issue, value `letsencrypt.org` | Auto |
| CAA | `@` | flag 0, tag iodef, value `mailto:security@navlys.com` | Auto |

---

### ✅ ÉTAPE 3 — Idem navbiolife.com (10 min)

Mêmes 8 enregistrements pour `navbiolife.com`, en adaptant uniquement les boîtes d'envoi DMARC/TLS-RPT si on veut les segmenter (sinon laisser `dmarc-reports@navlys.com` pour centraliser).

---

### ✅ ÉTAPE 4 — Idem navlys.io (10 min)

Idem que ci-dessus pour navlys.io.

---

### ✅ ÉTAPE 5 — Idem brunopartouche.com (10 min)

Idem que ci-dessus pour brunopartouche.com.

**Note** : MX brunopartouche.com pointe aussi vers Google Workspace de Bruno → préserver les MX, ne pas casser.

---

### ✅ ÉTAPE 6 — Activer Bot Fight Pro sur Cloudflare (5 min, 20 $/mois)

**Pour navlys.com en priorité** (le revenue-critical) :

1. Cloudflare → navlys.com → **Plans**
2. Upgrade au plan **Pro** : 20 $/mois
3. Confirmer paiement (Bruno utilise carte société NAVLYS quand l'IBAN sera ouvert)
4. Menu **Security → Bots** → **Super Bot Fight Mode** : Enable
5. Régler :
   - Definitely automated : **Block**
   - Likely automated : **Managed Challenge**
   - Verified bots : **Allow**

**Optionnel J+30** : passer les 3 autres domaines en Pro (= 80 $/mois total) si ROI prouvé.

---

### ✅ ÉTAPE 7 — Google Search Console × 4 domaines (15 min)

URL : https://search.google.com/search-console

Pour chaque domaine :
1. Add property → **Domain** (pas URL prefix)
2. Coller le domaine
3. Google fournit un TXT à poser dans Cloudflare DNS (~3 min de propagation)
4. Verify
5. Soumettre sitemap : `https://<domaine>/sitemap.xml`

**Temps 4 domaines** : 15 min total.

---

### ✅ ÉTAPE 8 — Google Postmaster Tools × 4 (15 min)

URL : https://postmaster.google.com

Pour chaque domaine :
1. Add domain
2. Verification TXT (différent de Search Console) → poser dans Cloudflare
3. Verify
4. Attendre 48h pour les premières stats reputation

---

### ✅ ÉTAPE 9 — Facebook Business Domain Verification × 4 (10 min)

URL : https://business.facebook.com → Brand Safety → Domains

1. Créer Business Manager si pas encore fait (nom : « NAVLYS »)
2. Add domain pour chacun des 4
3. Méthode : **DNS verification** (recommandée)
4. Poser le TXT `facebook-domain-verification=...` dans Cloudflare
5. Verify

---

### ✅ ÉTAPE 10 — LinkedIn Page verification (15 min)

URL : https://linkedin.com/company/setup/new

1. Créer la Company Page **NAVLYS** (si pas encore fait)
2. Ajouter le site web `https://navlys.com`
3. Page Admin → **About** → Page verification → demande envoyée
4. LinkedIn email à `bruno@navlys.com` → cliquer le lien de confirmation
5. (Optionnel premium V1.1) Verified Identity via Microsoft Entra : prouver propriété juridique NAVLYS SAS

---

### ✅ ÉTAPE 11 — (Différé J+30) Acheter VMC pour BIMI premium (~1500 €/an)

**Prérequis avant achat** :
- ✅ Marque NAVLYS déposée à l'INPI (étage 5 Notaire de Bord en cours)
- ✅ DMARC en `p=reject` actif depuis au moins 2 semaines
- ✅ Logo BRUNO COIN bronze en SVG Tiny PS (étage 3 Marque & Studio)

**Procédure** :
1. https://www.entrust.com → Verified Mark Certificates → 1295 €/an
2. (Alternative DigiCert : 1499 €/an)
3. Fournir : KBIS NAVLYS SAS + n° INPI marque + SVG Tiny PS + DNS contact
4. Validation Entrust : 2 semaines
5. Récupérer le `.pem`, l'héberger sur `https://navlys.com/.well-known/bimi/navlys-vmc.pem`
6. Activer le record BIMI dans Cloudflare (voir fichier 01)
7. Tester : envoyer un email à gmail.com → logo NAVLYS apparaît à côté du nom

---

## 🗓 CALENDRIER RECOMMANDÉ

```
Lun J0   : Étapes 1 à 5 (DNSSEC + DNS 4 domaines)            ~55 min
Mar J1   : Étapes 6 (Bot Fight Pro) + 7 (Search Console)     ~20 min
Mer J2   : Étapes 8 (Postmaster) + 9 (Facebook)              ~25 min
Jeu J3   : Étape 10 (LinkedIn)                                ~15 min
Ven J4   : Vérifier propagation DNS / scores                  ~10 min
Sem 2    : Étapes complémentaires Bing, Pinterest, Apple…    ~1 h
J+30     : Étape 11 (VMC BIMI) après INPI confirmation        ~2 h (procédure)
```

**Total temps Bruno** : ~3h cumulé sur 10 jours. Aucune session > 30 min.

---

## 💰 BUDGET RÉCAP

| Poste | Coût |
|---|---|
| DNSSEC (Cloudflare + Namecheap) | **0 €** |
| 32 TXT DNS | **0 €** |
| Cloudflare Pro navlys.com | **20 €/mois** |
| Cloudflare Free × 3 autres | **0 €** |
| Google Search Console, Postmaster | **0 €** |
| Facebook, LinkedIn, Bing, Pinterest | **0 €** |
| Apple Business Connect | **0 €** |
| VMC BIMI (an 1) | **1295 € one-shot/an** |
| Sentry free, Uptime Robot free, HIBP free | **0 €** |
| **TOTAL J+30** | **20 €/mois + 1295 € one-shot/an** |

---

## ✅ CASES À COCHER PAR BRUNO

```
[ ] 1. DNSSEC sur les 4 domaines (Cloudflare + Namecheap)
[ ] 2. DNS NAVLYS — 8 records
[ ] 3. DNS NAVBIOLIFE — 8 records
[ ] 4. DNS NAVLYS.IO — 8 records
[ ] 5. DNS BRUNOPARTOUCHE — 8 records
[ ] 6. Cloudflare Pro + Bot Fight Pro sur navlys.com
[ ] 7. Google Search Console × 4
[ ] 8. Google Postmaster Tools × 4
[ ] 9. Facebook Business × 4
[ ] 10. LinkedIn Page verification NAVLYS
[ ] 11. VMC BIMI (J+30, après INPI)
```

À cocher dans `_SECURITE_BUNKER/RAPPORT_AVANCEMENT_BRUNO.md` (à créer par Bruno au fur et à mesure).

---

## 🔄 APRÈS EXÉCUTION

Quand 1 à 10 sont coché :
1. Lancer les tests externes (fichier 07)
2. Reporter le score au QG (compte-rendu 5 lignes)
3. Le Veilleur passe DMARC `none → quarantine`
4. Attendre 2 semaines, vérifier rapports DMARC propres
5. Le Veilleur passe DMARC `quarantine → reject`
6. **A+ atteint sur les 4 sites.**

---

> *« Onze étapes, trois heures, le coffre est blindé. Un capitaine méthodique vaut mieux qu'un capitaine pressé. »*
> — Le Veilleur de Coffre
