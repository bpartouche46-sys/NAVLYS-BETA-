# live-source/app-config/ — configs rapatriées du Drive « navlys juin vrac md » (2026-06-25)

Copies de **référence** (à re-vérifier sur l'original au déploiement) :
- `globals.css` — charte CSS (#7DD3FC, bronze/or/nuit/perle, focus WCAG, NavlysCard).
- `tailwind.config.js` — couleurs + polices (Cinzel/Cormorant/JetBrains) verrouillées.
- `next.config.js` — next-intl (12 langues) + headers sécurité.

## ⏳ Restant dans le Drive (NON rapatrié ici — à tirer au déploiement)
Routage impossible/non pertinent via le chat à ce stade :
- `_APP_CLIENT_SUPABASE_SCHEMA.sql` (~21 Ko) — schéma DB. Contenu connu, à appliquer côté Supabase.
- **HTML brunopartouche** (~500 Ko ×3) : `_BRUNOPARTOUCHE_TEASER_v2_compact.html`,
  `_BRUNOPARTOUCHE_AVEC_PARTENAIRES.html`, `_BRUNOPARTOUCHE_TEASER_avec_anim.html`
  → trop gros pour transiter par l'assistant ; à uploader directement sur GitHub au moment du lien Vercel.
- 🔴 `_VOIX_BRUNO_OFFICIEL.md` — contient le **VOICE_ID** → reste **hors Git** (quarantaine).
