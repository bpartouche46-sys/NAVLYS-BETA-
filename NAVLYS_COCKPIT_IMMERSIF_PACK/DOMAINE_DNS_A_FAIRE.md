# NAVLYS — Domaine `navlys.com` · DNS à régler chez Namecheap
**À faire par Bruno — ce qui est déjà fait par Claude est indiqué.**
_Last updated: 2026-05-21_

---

## 🇫🇷 Français

### Ce qui est DÉJÀ fait ✅
- `navlys.com` **et** `www.navlys.com` sont **déjà ajoutés** au projet Vercel `navlys-app` (via API).
- Il ne reste plus qu'à **pointer le DNS** chez **Namecheap**.

### Ce que TU dois faire chez Namecheap (5 minutes)
Va sur **Namecheap → Domain List → `navlys.com` → Manage → Advanced DNS**.

1. **Enregistrement A (la racine du domaine)**
   - Type : `A Record`
   - Host : `@`
   - Value : `216.198.79.1`
   - TTL : `Automatic`
   - _(Adresse alternative acceptée par Vercel si besoin : `76.76.21.21`)_

2. **Enregistrement CNAME (le sous-domaine www)**
   - Type : `CNAME Record`
   - Host : `www`
   - Value : `cname.vercel-dns.com`  *(⚠️ avec le point final si Namecheap l'exige)*
   - TTL : `Automatic`

3. **⚠️ TRÈS IMPORTANT — NE PAS TOUCHER aux e-mails Google**
   - **GARDE** tous tes enregistrements **MX** existants (Google Workspace / Gmail). Exemple typique à conserver :
     - `@  MX  1  smtp.google.com`  *(ou les 5 anciens : aspmx.l.google.com, alt1…alt4.aspmx.l.google.com)*
   - **GARDE** aussi les enregistrements `TXT` SPF/DKIM/DMARC s'ils existent (ex. `v=spf1 include:_spfgoogle.com ~all`).
   - 👉 Le A et le CNAME ci-dessus servent **uniquement au site web**. Les MX servent **aux e-mails**. Les deux cohabitent sans conflit.

4. **Supprimer les parasites éventuels**
   - Si Namecheap a mis un **`URL Redirect`** ou un **`CNAME @ → parkingpage`** ou un **A `@` → 199.x (parking)**, **supprime-le** : il entre en conflit avec le A de Vercel.
   - Désactive le **« Namecheap Parking »** si actif.

### Après la bascule
- La propagation DNS prend de **quelques minutes à 24 h** (souvent < 1 h).
- Vérifie le statut dans **Vercel → Project `navlys-app` → Settings → Domains** : les pastilles doivent passer au **vert** (« Valid Configuration »).
- Le HTTPS (certificat SSL) est **automatique** une fois le DNS validé.

---

## 🇬🇧 English

### Already DONE ✅
- `navlys.com` **and** `www.navlys.com` are **already attached** to the Vercel project `navlys-app` (via API).
- All that's left is to **point the DNS** at **Namecheap**.

### What YOU do at Namecheap (5 minutes)
Go to **Namecheap → Domain List → `navlys.com` → Manage → Advanced DNS**.

1. **A Record (root domain)**
   - Type: `A Record` · Host: `@` · Value: `216.198.79.1` · TTL: `Automatic`
   - _(Alternative Vercel IP if needed: `76.76.21.21`)_

2. **CNAME Record (www subdomain)**
   - Type: `CNAME Record` · Host: `www` · Value: `cname.vercel-dns.com` · TTL: `Automatic`

3. **⚠️ CRITICAL — DO NOT TOUCH Google email**
   - **KEEP** all existing **MX** records (Google Workspace / Gmail).
   - **KEEP** any `TXT` SPF/DKIM/DMARC records.
   - 👉 The A + CNAME are **for the website only**; the MX records are **for email**. They coexist without conflict.

4. **Remove conflicting junk**
   - Delete any `URL Redirect`, parking `CNAME @`, or parking `A @ → 199.x` record — it conflicts with Vercel's A record.
   - Turn off **Namecheap Parking** if enabled.

### After the switch
- DNS propagation: a **few minutes to 24h** (often < 1h).
- Check **Vercel → `navlys-app` → Settings → Domains** — badges should turn **green** ("Valid Configuration").
- HTTPS/SSL is **automatic** once DNS validates.

---

### Récapitulatif express / Quick table

| Type  | Host | Value                  | Rôle / Role        |
|-------|------|------------------------|--------------------|
| A     | `@`  | `216.198.79.1`         | site web / website |
| CNAME | `www`| `cname.vercel-dns.com` | site web / website |
| MX    | `@`  | *(Google — NE PAS TOUCHER / DO NOT TOUCH)* | e-mail |
| TXT   | `@`  | *(SPF/DKIM/DMARC Google — garder / keep)*  | e-mail |
