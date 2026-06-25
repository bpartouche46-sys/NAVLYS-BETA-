# NAVLYS — Put the teaser LIVE tomorrow morning (≤ 10 min)

> Tomorrow we raise the sail. The blurred teaser goes live, the clock counts down
> to May 31. Here is the maneuver, step by step. Nothing to install.

---

## Before you start (30 s)

- The page to publish is **`index.html`** at the root of the pack (bilingual FR/EN with a toggle).
- It is **self-contained**: the logo is embedded inside it (base64), no external dependency except Google Fonts.
- You can deploy the **whole folder** `NAVLYS_TEASER_LAUNCH_PACK/` or just the ZIP.

---

## Path A — Drag & drop to Vercel (simplest, ~5 min)

1. Go to **`vercel.com/new`** (sign in, the free plan is enough).
2. Find **“Deploy” → “Upload”** (or go straight to **`vercel.com/new/upload`**).
3. **Drag** the **`NAVLYS_TEASER_LAUNCH_PACK.zip`** file (or the unzipped folder) into the drop zone.
4. **Project Name**: `navlys-teaser` (or `navlys-portal`).
5. **Framework Preset**: **Other** (static HTML, nothing to build).
6. **Root Directory**: leave the root (where `index.html` lives).
7. Click **Deploy**. Wait ~30 s.
8. Vercel gives you a URL like **`navlys-teaser.vercel.app`** → **open it** and check:
   - the bronze coin turns and shines,
   - the clock runs **backwards**,
   - the counter ticks down to May 31,
   - the **FR / EN** toggle works,
   - the email field shows “You're aboard” after submitting.

✅ It's live.

---

## Path B — You already have the `navlys-portal` project on Vercel

1. Open the project at **`vercel.com/dashboard`**.
2. **Deployments** tab → **“…” → Redeploy**, or
3. Cleaner: just replace the project's **`index.html`** with the one from this pack
   (via Git if the project is linked to a repo, or re-upload the folder).
4. **Deploy**. Check the URL.

---

## Path C — Command line (if you like the terminal)

```bash
npm i -g vercel        # once
cd NAVLYS_TEASER_LAUNCH_PACK
vercel                 # follow the prompts → preview
vercel --prod          # ship to production
```

---

## Wire up the `navlys.com` domain (optional, take your time)

1. On Vercel: project → **Settings → Domains → Add** → type `navlys.com`.
2. Vercel shows the DNS records to set (an `A` or a `CNAME`).
3. Enter them at your registrar (the already-delivered **DNS pack** has the values).
4. Wait for propagation (minutes to a few hours).

No rush: the `*.vercel.app` URL is enough to announce the teaser tomorrow.

---

## Launch day — May 31: lift the fog

When the real site is ready, two options:
- **Simplest**: replace `index.html` with the real homepage and redeploy.
- **Tailored**: in `index.html`, the blur is one CSS line:
  `filter: blur(14px) ...` in the **`.blur-bg`** class. Set `blur(0px)` and remove
  the darkening (`brightness(.72)`) to reveal the mockup.

---

## If something snags

- **Blank page**: make sure `index.html` is at the deployed root.
- **Missing logo**: a version without the base64 was deployed — use the `index.html` from THIS pack.
- **Generic fonts**: that's just Google Fonts loading; refresh.
- **Frozen counter**: clear cache (Ctrl/Cmd + Shift + R).

> *“One bearing, one hand, one day. NAVLYS guides you to your goal with a single move.”*
