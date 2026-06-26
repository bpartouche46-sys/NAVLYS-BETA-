# 🚨 08 — MONITORING & PLAN D'INCIDENT

**Mission Le Veilleur de Coffre · 29 mai 2026 · 4 yeux ouverts, 24/7**

> Trois piliers : **observer** (logs centralisés), **détecter** (alertes seuil), **réagir** (runbook par sévérité). Aucun incident sans trace, aucune trace sans procédure.

---

## 🎯 STACK MONITORING (Beta → V1)

| Outil | Rôle | Coût |
|---|---|---|
| **Cloudflare Analytics** | Trafic + attaques bloquées | 0 € (inclus) |
| **Sentry** | Erreurs applicatives temps réel | 0 € (free tier 5k events/mois) |
| **Supabase Logs** | Logs DB + Auth + Edge Functions | 0 € (inclus) |
| **Vercel Logs** | Logs runtime + build | 0 € (Hobby) → 20 $/mois (Pro) |
| **Logflare** (optionnel) | Centralisation logs Supabase → BigQuery | 0 € (free tier) |
| **CrowdSec** (optionnel) | Protection collaborative anti-IPs malveillantes | 0 € (community) |
| **Uptime Robot** | Ping uptime + alerte SMS | 0 € (50 monitors free) |
| **Slack Webhook** ou **Resend** | Canal d'alerte | 0 € |

**Total V1** : 0 €/mois. **V2 stable** : ~50 €/mois (Vercel Pro + Sentry Team).

---

## 1️⃣ Cloudflare Analytics

Dashboard Cloudflare → **Analytics & Logs**

### Métriques surveillées en continu

- Requests / second
- Bandwidth
- WAF actions (block / challenge / allow)
- Bot Fight Mode actions
- Threats blocked
- Cache hit ratio
- Origin response time

### Alertes Cloudflare (Notifications)

Settings → Notifications → Add :

| Trigger | Email |
|---|---|
| **Origin Error Rate Alert** > 1% sur 5 min | security@navlys.com |
| **HTTP 5xx Spike** | security@navlys.com |
| **DDoS Attack** detected | security@navlys.com + SMS Bruno |
| **WAF Block Spike** > 100/min | security@navlys.com |
| **Universal SSL Cert Issuance/Renewal** | infra@navlys.com |

---

## 2️⃣ Sentry — erreurs applicatives

### Setup

1. https://sentry.io → créer compte, créer projet « navlys-app »
2. Type : **Next.js**
3. Installer : `npm install @sentry/nextjs`
4. `npx @sentry/wizard@latest -i nextjs` (wizard auto-config)
5. Ajouter ENV Vercel :
   - `SENTRY_DSN`
   - `SENTRY_AUTH_TOKEN`
   - `NEXT_PUBLIC_SENTRY_DSN`

### Configuration `sentry.client.config.ts`

```ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1, // 10% des transactions
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 1.0, // 100% replay si erreur
  environment: process.env.VERCEL_ENV ?? 'development',
  beforeSend(event) {
    // Anonymisation PII (RGPD)
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }
    return event;
  },
});
```

### Alertes Sentry

- **Issues escalating** : email + Slack
- **Performance regression** > 20% : email
- **Crash free session rate** < 99% : SMS Bruno

---

## 3️⃣ Uptime Robot — ping externe

### Setup

1. https://uptimerobot.com → free 50 monitors
2. Créer 4 monitors HTTPS :
   - `https://navlys.com` (every 5 min)
   - `https://navbiolife.com` (every 5 min)
   - `https://navlys.io` (every 5 min)
   - `https://brunopartouche.com` (every 5 min)
3. Créer 4 monitors « Keyword » (vérifier qu'un mot-clé du contenu est présent — détecte les pages blanches)
4. Alertes : email + SMS Bruno (option payante 4 $/mois pour SMS, sinon Twilio webhook)

### Public status page

Uptime Robot fournit une status page gratuite : `https://stats.uptimerobot.com/navlys`
À embarquer sur `https://navlys.com/status` pour transparence client.

---

## 4️⃣ Logs centralisés (V2)

### Logflare (free tier, jusqu'à Supabase Pro)

1. https://logflare.app → créer compte
2. Connecter Supabase → Settings → Logs → Logflare integration
3. Connecter Vercel → Logs → Drains → Logflare
4. Dashboard unifié : recherche full-text, filtrage par service

### Audit log table (DB Supabase)

Créer une table dédiée pour log audit applicatif (qui a fait quoi quand) :

```sql
create table public.audit_log (
  id            uuid primary key default gen_random_uuid(),
  ts            timestamptz not null default now(),
  user_id       uuid references auth.users(id),
  action        text not null,         -- 'auth.sign_in', 'profile.update', etc.
  resource      text,                  -- 'user:abc', 'subscription:xyz'
  ip            inet,
  user_agent    text,
  metadata      jsonb,
  severity      text default 'info'    -- 'info' | 'warn' | 'error' | 'critical'
);

create index on audit_log (ts desc);
create index on audit_log (user_id);
create index on audit_log (severity);

-- RLS : seul un service_role peut écrire/lire
alter table audit_log enable row level security;
```

À écrire depuis les Server Actions / API routes :

```ts
import { createServiceClient } from '@/lib/supabase/server';
const supabase = createServiceClient();
await supabase.from('audit_log').insert({
  user_id, action: 'auth.sign_in', resource: 'session', ip, user_agent,
  metadata: { provider: 'magic_link' }, severity: 'info'
});
```

---

## 5️⃣ CrowdSec (optionnel, V2)

Protection collaborative anti-IPs malveillantes. Communauté partage les IPs attaquantes en temps réel.

**Setup** :
- `npm install @crowdsec/cs-nextjs-bouncer` (ou middleware Cloudflare Worker)
- Connect à API CrowdSec Central
- Souscription gratuite Community

**Bénéfice** : bloquer des IPs déjà identifiées comme malveillantes par d'autres sites avant qu'elles t'attaquent.

---

## 6️⃣ PLAN D'INCIDENT — Runbook par sévérité

### Sévérité P0 (CRITIQUE) — réaction immédiate

**Définition** : compromission active, fuite de données, indisponibilité totale, prise de contrôle compte.

**Exemples** :
- HIBP signale fuite emails @navlys.com
- Sentry détecte exécution de code malveillant
- Cloudflare bloque DDoS > 10 Gbps
- Cert Spotter détecte certificat non autorisé
- Compte admin compromis

**Procédure** :

```
1. CONTAINMENT (< 5 min)
   - Couper l'accès : Vercel pause deployment, Supabase pause auth, Cloudflare Under Attack Mode
   - Révoquer toutes les sessions actives : `update auth.sessions set deleted_at = now()`
   - Forcer rotation des secrets : Vercel ENV regen
   - Notifier Bruno : SMS + appel

2. ERADICATION (< 1h)
   - Identifier le vecteur : logs Sentry + Supabase + Cloudflare
   - Patcher la faille
   - Audit DB : `select * from audit_log where ts > now() - interval '24h' order by ts desc`
   - Rotation complète : tous les tokens, toutes les clés DKIM, toutes les API keys

3. RECOVERY (< 4h)
   - Rétablir l'accès progressivement (admin → équipe → utilisateurs)
   - Communiqué public si données utilisateurs touchées (RGPD : sous 72h à la CNIL)
   - Status page mise à jour

4. LESSONS LEARNED (< 7 jours)
   - Postmortem markdown dans `_SECURITE_BUNKER/incidents/YYYY-MM-DD_<titre>.md`
   - Patch préventif + test pour qu'il ne se reproduise pas
   - Update de ce runbook
```

### Sévérité P1 (URGENT) — < 1h

**Exemples** : dégradation SSL grade, augmentation 5xx > 1%, blacklist email, déclassement SEO majeur.

**Procédure** : alerte Slack + email Bruno · diagnostic < 30 min · fix < 1h · ticket d'audit dans `audit_log` · pas de communiqué public sauf si user-facing.

### Sévérité P2 (NORMAL) — < 24h

**Exemples** : warning Hardenize, faux positif WAF, alerte capacity.

**Procédure** : ticket dans backlog 06 Infra & Veille · fix dans la semaine.

### Sévérité P3 (LOW) — backlog

**Exemples** : optimisation potentielle, suggestion d'amélioration, dette technique sécurité.

**Procédure** : backlog Q+1.

---

## 7️⃣ Communication d'incident

### Canaux

| Sévérité | Canal | Audience |
|---|---|---|
| P0 | SMS Bruno + Status Page + Email users si data leak | Capitaine + utilisateurs |
| P1 | Email Slack #incidents | Équipe interne |
| P2 | Ticket audit | Équipe interne |
| P3 | Backlog | 06 Infra & Veille |

### Template de communiqué utilisateur (P0 user-facing)

```
Sujet : NAVLYS — Action de sécurité (action requise)

Bonjour,

Le [DATE], nous avons détecté [DESCRIPTION FACTUELLE]. Par mesure de précaution,
nous t'invitons à :
  1. Te reconnecter à NAVLYS et générer un nouveau lien magique.
  2. Vérifier l'activité récente sur ton compte (page « Sessions »).
  3. Activer la double authentification si ce n'est pas déjà fait.

Aucun mot de passe NAVLYS n'a fuité (nous n'en stockons pas).
Aucune transaction financière n'a été affectée.

Bien à toi,
L'équipe NAVLYS
security@navlys.com
```

### Obligation RGPD

Si donnée personnelle fuite → notification CNIL sous 72h via https://notifications.cnil.fr.
Modèle de déclaration archivé dans `_SECURITE_BUNKER/incidents/templates/cnil-notification.md`.

---

## 8️⃣ Contacts d'urgence

| Rôle | Personne | Email | Téléphone |
|---|---|---|---|
| Capitaine | Bruno Mark Partouche | bruno@navlys.com | +33 ... (Bruno fournit) |
| QG / Le Veilleur | Claude (chef de cabinet) | n/a | n/a |
| Support Cloudflare | Pro plan → 24/7 chat | n/a | n/a |
| Support Supabase | Pro plan (V1.1) | n/a | n/a |
| Support Vercel | Pro plan → email 1h SLA | n/a | n/a |
| CNIL (RGPD) | n/a | n/a | 01 53 73 22 22 |
| ANSSI (cyber) | n/a | cert-fr@certfr.eu | 0800 200 000 |

---

## ✅ CHECKLIST DÉPLOIEMENT MONITORING

- [ ] Cloudflare Notifications configurées pour les 4 domaines
- [ ] Sentry installé et test event reçu
- [ ] Uptime Robot 4 monitors HTTPS + 4 keyword
- [ ] Status page publique sur navlys.com/status
- [ ] Table `audit_log` créée et alimentée
- [ ] HIBP Domain Search activé
- [ ] Cert Spotter SSLMate configuré
- [ ] Runbook P0/P1/P2/P3 imprimé et affiché « au-dessus du coffre »
- [ ] Template CNIL préparé en amont
- [ ] Contact d'urgence à jour

---

> *« Tu ne peux pas réagir à ce que tu ne vois pas. On voit tout, on note tout, on agit vite. »*
> — Le Veilleur de Coffre
