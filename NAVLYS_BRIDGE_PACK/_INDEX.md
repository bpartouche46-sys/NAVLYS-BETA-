# NAVLYS_BRIDGE_PACK — Index

Le pont entre les 3 modules NAVLYS. Un parcours unique en 7 escales, de l'objectif au plan personnel reçu par email.

---

## 🇫🇷 Section française

### Documentation
- [`fr/01_PARCOURS_UNIFIE.md`](fr/01_PARCOURS_UNIFIE.md) — Story complète du visiteur en 7 escales imagées
- [`fr/02_DASHBOARD_UNIFIE.md`](fr/02_DASHBOARD_UNIFIE.md) — Specs du tableau de bord final qui consomme les 3 modules
- [`fr/03_CONTRATS_DONNEES.md`](fr/03_CONTRATS_DONNEES.md) — Schéma des données partagées (typées)
- [`fr/04_CAPTURE_LEAD.md`](fr/04_CAPTURE_LEAD.md) — Specs capture email pour envoyer le plan complet
- [`fr/05_INTEGRATION_VERCEL.md`](fr/05_INTEGRATION_VERCEL.md) — Guide intégration au repo NAVLYS-HUB

### Démo
- [`presentation/fr/PARCOURS_DEMO.html`](presentation/fr/PARCOURS_DEMO.html) — Démo HTML auto-contenue, Ice Blue

---

## 🇬🇧 English section

### Documentation
- [`en/01_UNIFIED_JOURNEY.md`](en/01_UNIFIED_JOURNEY.md) — Full visitor story in 7 imaged ports of call
- [`en/02_UNIFIED_DASHBOARD.md`](en/02_UNIFIED_DASHBOARD.md) — Final dashboard specs consuming the 3 modules
- [`en/03_DATA_CONTRACTS.md`](en/03_DATA_CONTRACTS.md) — Shared typed data contracts
- [`en/04_LEAD_CAPTURE.md`](en/04_LEAD_CAPTURE.md) — Email capture to send the complete plan
- [`en/05_VERCEL_INTEGRATION.md`](en/05_VERCEL_INTEGRATION.md) — NAVLYS-HUB Vercel integration guide

### Demo
- [`presentation/en/PARCOURS_DEMO.html`](presentation/en/PARCOURS_DEMO.html) — Self-contained HTML demo, Ice Blue

---

## Code source partagé / Shared source code

- `lib/navlysBridge.ts` — Types TypeScript stricts partagés
- `lib/planComposer.ts` — Fonction pure qui compose le plan unifié
- `lib/leadCapture.ts` — Helpers capture/envoi plan
- `components/NavlysParcours.tsx` — Orchestrateur du parcours 7 escales
- `components/PlanUnifieCard.tsx` — Card finale du plan unifié
- `components/SaveAndShareModal.tsx` — Modale email + bouton WhatsApp
- `app/mon-plan/page.tsx` — Page Next.js FR
- `app/en/my-plan/page.tsx` — Page Next.js EN
- `app/api/plan-save/route.ts` — API sauve plan + envoie email (Resend placeholder)
- `schemas/parcours_7_etapes.svg` — SVG du parcours en bouée à 7 ports
- `schemas/dashboard_unifie.svg` — SVG du tableau de bord final

---

## Disclaimer permanent

> Information pédagogique. Tu restes seul décideur. Teste en simulation avant tout engagement réel.

> Educational information. You remain the sole decision-maker. Test in simulation before any real commitment.
