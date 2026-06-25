# 🦙 NAVLYS × Alpaca — Intégration brokerage (étape 1)

> Dépt 07 R&D · 26 mai 2026 · première brique de l'app NAVLYS connectée à un partenaire broker.
> **Principe directeur (corrigé 26/05)** : NAVLYS = **éditeur de contenu pédagogique** (pas CIF, pas ORIAS, pas IOBSP — Bruno n'est PAS enregistré). Posture identique à un média finance / un YouTuber finance / Boursorama articles. Alpaca exécute. L'utilisateur garde **toute** la main. NAVLYS ne **recommande** rien, NAVLYS **montre** et **explique** ce qui existe.

---

## 1. Pourquoi Alpaca en premier

| Critère | Alpaca |
|---|---|
| **API** | REST + WebSocket exemplaires, doc claire (`docs.alpaca.markets`). |
| **OAuth 2.0** | Disponible et propre — l'utilisateur autorise NAVLYS depuis son compte. |
| **Paper trading** | Mode démo gratuit illimité → on développe sans risque. |
| **Couverture produits** | Actions US (NYSE/Nasdaq), ETF, options, crypto. Pas d'actions EU. |
| **Régulation** | FINRA / SEC US. Couverture SIPC 500 k$ par compte. |
| **Frais** | 0 commission sur actions/ETF. Spread sur crypto. |
| **Affiliation** | Programme d'apporteur d'affaires (lien partenaire trackable) → revenu pour NAVLYS sans toucher au trade. |

**Limite franche à connaître** : Alpaca accepte les résidents US, plus une liste d'autres pays (UK, certains UE, IL, Israël OK). À vérifier au cas par cas pour la France métropolitaine — peut nécessiter passage par Apex Clearing International ou redirection vers un partenaire EU plus tard (Trade Republic, Saxo).

---

## 2. Cadre légal — ce que NAVLYS PEUT et NE PEUT PAS faire

**Bruno n'est ni CIF, ni IOBSP, ni inscrit ORIAS.** NAVLYS est donc juridiquement un **éditeur de contenu pédagogique** au sens « presse / média finance » — exactement comme un blog Boursorama, une chaîne YouTube finance, ou Café de la Bourse. Cette posture est libre d'agrément en France, à condition de **ne jamais donner de conseil personnalisé** ni recevoir d'ordre.

### ✅ Autorisé via NAVLYS (posture éditeur)
- Afficher en read-only le portefeuille Alpaca de l'utilisateur (avec son consentement OAuth).
- **Décrire** trois allocations théoriques génériques (Prudent / Équilibré / Énergique) — **identiques pour tous les visiteurs**, sans adaptation au profil individuel, sans recommandation personnalisée.
- Montrer **factuellement** l'écart entre le portefeuille de l'utilisateur et chacun des 3 profils théoriques. Aucune phrase du type « tu devrais », « il faut », « je te conseille ».
- Fournir un **deep-link** vers Alpaca où l'utilisateur, **de son propre chef**, peut passer un ordre. NAVLYS ne place jamais d'ordre.
- Toucher une **commission de publisher** sur l'ouverture de compte Alpaca via lien d'affiliation classique (légal sans agrément, comme tout site web qui pose un lien affilié Amazon/eToro/Trade Republic). C'est du **CPA marketing**, pas de l'apport d'affaires IOBSP.

### ❌ Interdit (et c'est non négociable)
- Toute formulation qui ressemble à un **conseil personnalisé** (« vu ton portefeuille, tu devrais… »).
- **RTO** : passer un ordre à la place de l'utilisateur (agrément requis).
- **Apport d'affaires sur produits réglementés** (assurance-vie, contrats financiers, etc.) — agrément IOBSP/ORIAS requis. NAVLYS ne cible PAS ce segment.
- Recevoir un flux d'investissement client. Encaisser une commission per-trade.
- Promettre rendement, garantir capital, qualifier un risque pour un individu donné.
- Mot « gestion » au sens AMF. Mot « conseil » au sens CIF. Mot « recommandation » personnalisée.

### Vocabulaire de remplacement (à utiliser partout)
| Mot interdit | Mot autorisé |
|---|---|
| « Je te conseille » | « Voici ce que prévoit le profil X » |
| « Tu devrais rééquilibrer » | « Le profil Équilibré porte X % d'actions. Tu en as Y % » |
| « Mon conseil » | « Repère pédagogique » |
| « Recommandation » | « Information générale », « cas d'école » |
| « Profil personnalisé » | « Choisis le profil le plus proche de ta sensibilité (générique) » |

### Disclaimer obligatoire sur chaque écran connecté
> *« NAVLYS est un éditeur de contenu pédagogique. NAVLYS ne fournit aucun conseil personnalisé en investissement, ne passe aucun ordre, et ne reçoit aucun fonds d'investissement. Les 3 profils présentés sont des cas d'école génériques, identiques pour tous les visiteurs. Toute décision d'investissement est prise par vous, exécutée chez votre broker, sous votre responsabilité. »*

---

## 3. Architecture — flux de bout en bout

```
 ┌──────────────┐                          ┌──────────────┐
 │  Utilisateur │ ───── (1) OAuth ──────── │   Alpaca     │
 │  navlys.com  │ ◄──── (2) access_token ──│   OAuth      │
 └──────┬───────┘                          └──────┬───────┘
        │                                          │
        │ (3) Save token chiffré côté Vercel ENV   │
        ▼                                          │
 ┌──────────────┐    (4) GET /v2/account, /v2/positions, /v2/orders
 │  NAVLYS API  │ ──────────────────────────────────►
 │  /api/alpaca │ ◄──────── JSON portefeuille ──────
 └──────┬───────┘
        │ (5) Analyse moteur Nash (3 profils)
        ▼
 ┌──────────────┐
 │  NAVLYS UI   │  → diagnostic pédagogique + cibles théoriques
 │  /portfolio  │  → bouton « Exécuter chez Alpaca » (deep-link)
 └──────────────┘
```

### Endpoints Alpaca utilisés (Phase 1, READ-ONLY)

| Endpoint | Usage |
|---|---|
| `POST https://api.alpaca.markets/oauth/token` | Échange code → access_token |
| `GET  /v2/account` | Solde cash, valeur portefeuille, statut compte |
| `GET  /v2/positions` | Toutes les positions ouvertes (titres, qté, prix moyen, P&L) |
| `GET  /v2/orders?status=all&limit=100` | Historique 100 derniers ordres |
| `GET  /v2/account/portfolio/history?period=1Y&timeframe=1D` | Courbe perf 1 an |

### Phase 2 (à n'activer qu'après audit ORIAS) — deep-link execution
- Pas d'API order POST côté NAVLYS.
- Bouton UI génère une URL Alpaca avec paramètres pré-remplis (`app.alpaca.markets/trade/AAPL?qty=10&side=buy&type=market`).
- L'utilisateur clique → arrive chez Alpaca déjà connecté → valide.

---

## 4. OAuth 2.0 — flux concret

### 4.1 Pré-requis (action Bruno)
1. Créer un compte développeur Alpaca → `app.alpaca.markets/oauth/applications/new`
2. Renseigner :
   - **Application name** : NAVLYS NEXT GEN INVEST
   - **Redirect URI** : `https://navlys.com/api/alpaca/callback`
   - **Logo** : `NAVLYS_LOGO_ANIME_PRO_PACK/logo_anime/navlys-logo-square.png`
   - **Description** : *« Outil d'éducation financière qui aide l'utilisateur à comparer son portefeuille à 3 allocations pédagogiques (Prudent / Équilibré / Énergique). Read-only. »*
3. Récupérer **Client ID** + **Client Secret** → poser en ENV Vercel **uniquement** :
   - `ALPACA_CLIENT_ID`
   - `ALPACA_CLIENT_SECRET`
   - `ALPACA_REDIRECT_URI=https://navlys.com/api/alpaca/callback`
4. (Optionnel) Programme apporteur Alpaca → demander code partenaire pour le lien d'ouverture de compte affilié.

### 4.2 Bouton « Connecter mon Alpaca »
URL d'autorisation que NAVLYS génère côté client :
```
https://app.alpaca.markets/oauth/authorize
  ?response_type=code
  &client_id={ALPACA_CLIENT_ID}
  &redirect_uri=https://navlys.com/api/alpaca/callback
  &scope=account:write%20trading
  &state={csrf_token_aléatoire_stocké_en_session}
```
*Note : scope `account:write trading` te donne read partout + (plus tard) write trading. Pour Phase 1 read-only on peut se limiter à `account:read trading:read` si Alpaca le supporte au moment T.*

### 4.3 Callback `/api/alpaca/callback`
Vercel function (TypeScript) :
```ts
// /app/api/alpaca/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { encrypt } from '@/lib/crypto';   // AES-256-GCM, clé en ENV
import { saveUserToken } from '@/lib/db';

export async function GET(req: NextRequest){
  const code  = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');
  // 1. Vérifier le state (anti-CSRF)
  if(!await checkState(req, state)) return NextResponse.json({error:'bad_state'}, {status:400});

  // 2. Échange code → access_token
  const r = await fetch('https://api.alpaca.markets/oauth/token', {
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code!,
      client_id: process.env.ALPACA_CLIENT_ID!,
      client_secret: process.env.ALPACA_CLIENT_SECRET!,
      redirect_uri: process.env.ALPACA_REDIRECT_URI!
    })
  });
  const tok = await r.json();
  // tok = { access_token, token_type, scope }

  // 3. Sauvegarder CHIFFRÉ côté serveur, jamais en clair, jamais côté client
  const userId = await getCurrentUserId(req);
  await saveUserToken(userId, 'alpaca', encrypt(tok.access_token));

  // 4. Rediriger UI
  return NextResponse.redirect(new URL('/portfolio?connected=alpaca', req.url));
}
```

### 4.4 Appels API authentifiés
```ts
// /lib/alpaca.ts
export async function getPositions(userToken: string){
  const r = await fetch('https://api.alpaca.markets/v2/positions', {
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  if(!r.ok) throw new Error('Alpaca API ' + r.status);
  return await r.json();
}
```

---

## 5. UI — page `/portfolio` (Phase 1)

### Section 1 : État de la connexion
- Pas connecté → bouton bronze **« Connecter mon Alpaca »** + texte *« 1 clic. Read-only. Tu peux te déconnecter quand tu veux. »*
- Connecté → badge vert *« Alpaca · connecté · synchro il y a 12 s »* + bouton « Déconnecter ».

### Section 2 : Portefeuille brut (ce qu'Alpaca renvoie)
- Solde cash · valeur totale · P&L jour · P&L total.
- Liste positions : ticker · qté · prix moyen · prix actuel · % allocation · P&L.

### Section 3 : Diagnostic NAVLYS (le cœur pédagogique)
```
🧭 Ton allocation actuelle vs ton profil Équilibré

    Actions US     78 % ████████████░░░░  vs cible 55 % ⚠️ trop exposé
    Cash           12 % ███░░░░░░░░░░░░░  vs cible 20 % ⚠️ peu de marge
    Crypto         10 % ██░░░░░░░░░░░░░░  vs cible 5 %  ⚠️ volatilité élevée
    Obligations    0  % ░░░░░░░░░░░░░░░░  vs cible 20 % ❌ absent

  Lecture pédagogique :
  Ton portefeuille porte le profil d'un investisseur "Énergique" (acceptation
  forte de la volatilité). C'est cohérent si tu as un horizon long (>10 ans)
  et un coussin de précaution séparé. Ce n'est pas un conseil personnalisé.
```

### Section 4 : Pistes pédagogiques
3 cartes :
- *« Et si je rééquilibrais vers Équilibré ? »* → simulation au moteur Nash, prête à imprimer.
- *« Et si je conservais en l'état ? »* → projection volatilité 10 ans.
- *« Et si je passais Prudent ? »* → simulation conservation capital.

Chaque carte termine par : *« Pour passer un ordre, ouvre ton Alpaca. NAVLYS ne place jamais d'ordre. »*

---

## 6. Sécurité — non négociable

- Tokens utilisateurs **chiffrés AES-256-GCM** en base, clé maître dans ENV Vercel.
- Pas de log de tokens (même tronqué).
- HTTPS only, HSTS activé sur `navlys.com`.
- Rate limit 60 req/min par utilisateur sur `/api/alpaca/*`.
- Refresh token : rotation toutes les 24 h.
- En cas de fuite : révocation immédiate via Alpaca dashboard + email utilisateur.
- Le client peut **révoquer NAVLYS** directement depuis son Alpaca → on intercepte le 401 et nettoie côté NAVLYS.

---

## 7. Monétisation — comment NAVLYS gagne sur Alpaca

| Levier | Détail | Statut légal |
|---|---|---|
| **Lien affilié publisher** | Lien d'ouverture de compte Alpaca via code partenaire NAVLYS (CPA simple par signup ou revenu-share publisher). | **Libre d'agrément** — c'est du marketing affilié classique, comme tout site qui pose un lien Amazon. Mention « lien affilié » obligatoire. |
| **Abonnement NAVLYS Next Gen Invest** | La connexion Alpaca = fonctionnalité **premium** réservée aux abonnés 49 €/mo (les comptes free voient une démo paper trading). | Vente d'un service d'information / accès à un calculateur. Libre. |
| **Pas de commission par trade** | Pas autorisé (RTO = agrément). Pas envisagé. | — |
| **Pas d'apport d'affaires IOBSP** | NAVLYS ne propose AUCUN produit financier réglementé (assurance-vie, PER, contrats…). | Évite tout chevauchement avec l'agrément ORIAS. |

---

## 8. Plan d'exécution — 7 jours

| Jour | Tâche | Resp |
|---|---|---|
| **J1 (27 mai)** | Création app Alpaca dev + récupération Client ID/Secret | Bruno |
| **J1** | Pose ENV Vercel `ALPACA_*` | Dépt 06 |
| **J2** | Code route `/api/alpaca/callback` + `/api/alpaca/positions` | Dépt 07 |
| **J3** | UI `/portfolio` page de connexion + section 1 | Dépt 02 |
| **J4** | UI section 2-3 + brancher moteur Nash | Dépt 02 + 07 |
| **J5** | Tests paper trading (5 cas : compte vide, mono-position, multi-position, crypto, perte > 30 %) | Dépt 07 |
| **J6** | Audit conformité : disclaimer présent partout, pas de promesse, ORIAS canal séparé | Bruno + Dépt 01 |
| **J7** | Mise en prod derrière le gate, ouverture aux abonnés à partir du 1ᵉʳ juin | Dépt 06 |

---

## 9. Roadmap partenaires suivants (file d'attente)

Une fois Alpaca stable, on enchaîne **un par un**, jamais en parallèle, pour garder la maîtrise :

| Ordre | Partenaire | Spécificité | Difficulté |
|---|---|---|---|
| **#2** | **Trade Republic** | Broker EU mobile, API limitée, OAuth récent. Crucial pour FR. | Moyenne |
| **#3** | **Saxo Bank** | API solide, multi-actifs. Cible épargnant FR/EU averti. | Faible (OpenAPI mature) |
| **#4** | **eToro** | API privée. Programme affilié CPA fort. CopyTrade interdit côté NAVLYS. | Moyenne |
| **#5** | **Interactive Brokers** | API puissante mais complexe. Cible avancée. | Élevée |
| **#6** | **Boursorama / BoursoBank** | Pas d'API publique → scrape interdit. À traiter en **lien éducatif** uniquement (pas d'intégration data). | N/A |
| **#7** | **Revolut Trading / N26 Trade** | API en évolution, suivre la sortie d'OpenAPI. | À surveiller |

Chaque ajout suit la même grille : statut légal → API → OAuth → endpoints read-only → UI diagnostic → audit ORIAS → prod.

---

## 10. Risques & points de vigilance

| Risque | Mitigation |
|---|---|
| Régulateur AMF interpelle sur conseil non agréé | Disclaimer omniprésent + 3 profils strictement génériques (jamais personnalisés) + zéro POST d'ordre + vocabulaire éditeur (§2) + audit avocat presse/finance avant prod |
| Alpaca refuse les comptes FR | Plan B : démarrer avec utilisateurs US/UK/IL d'abord, brancher Trade Republic en #2 pour FR |
| Fuite de tokens | Chiffrement AES-256-GCM + rotation 24 h + révocation côté Alpaca |
| Utilisateur croit que NAVLYS trade pour lui | Disclaimer obligatoire écran par écran + tutoriel d'onboarding qui montre le « clic chez Alpaca » |
| Charge serveur (websocket Alpaca) | Phase 1 = REST polling 30 s. Websocket en Phase 3 si volume. |

---

## 11. Décisions Bruno (réponds en 1 ligne)

1. **Création compte dev Alpaca** : tu le fais aujourd'hui ou demain ?
2. **Limite géographique** : on lance Alpaca pour tous, ou on réserve aux comptes US/UK/IL au début ?
3. **Audit avocat « presse/édition finance »** (PAS CIF, PAS ORIAS) : on consulte un avocat spécialisé média finance avant la prod pour valider le vocabulaire éditeur et le caractère générique des 3 profils ? Recommandé.
4. **Lien d'affiliation publisher Alpaca** : tu t'inscris au programme partenaire dès aujourd'hui (mention « lien affilié » obligatoire côté UI) ?

---

> *« On observe, on explique, on laisse l'utilisateur tenir la barre. »*
> ⚠️ NAVLYS = éditeur de contenu pédagogique. Aucun ordre passé par NAVLYS. Aucun conseil personnalisé. NAVLYS n'est PAS CIF, n'est PAS sur ORIAS, n'est PAS IOBSP. Posture identique à un média finance. Mention « lien affilié » sur chaque lien partenaire.
