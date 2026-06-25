# Intégration au repo NAVLYS-HUB sur Vercel

> Comment amarrer ce pack au navire principal.

---

## Étapes en image

1. **Cloner le pont sur le navire** : copier le dossier `NAVLYS_BRIDGE_PACK/` dans le repo NAVLYS-HUB, à la racine `apps/web/` (ou équivalent Next.js App Router).
2. **Aligner les routes** : les fichiers `app/mon-plan/page.tsx` et `app/en/my-plan/page.tsx` viennent compléter l'arborescence Next.js existante.
3. **Brancher l'API** : `app/api/plan-save/route.ts` se branche tout seul, c'est une route Next 14 conforme.
4. **Importer les types partagés** : `lib/navlysBridge.ts` est importable depuis n'importe quel composant du repo.

---

## Variables d'environnement

À ajouter dans Vercel → Project Settings → Environment Variables :

| Clé | Valeur exemple | Sens |
|---|---|---|
| `RESEND_API_KEY` | `re_xxx` | Clé API Resend pour envoyer l'email |
| `RESEND_FROM_EMAIL` | `plan@navlys.app` | Adresse expéditeur |
| `NAVLYS_DASHBOARD_BASE_URL` | `https://navlys.app` | URL canonique pour les liens email |

Toutes optionnelles : si non définies, l'API renvoie un placeholder simulé.

---

## Tests rapides après déploiement

1. Aller sur `/mon-plan` → le parcours doit démarrer à l'escale 1.
2. Compléter les 7 escales → le dashboard doit s'afficher.
3. Soumettre l'email → un toast confirme la réception.
4. Vérifier la version EN sur `/en/my-plan`.

---

## Bascule FR / EN

Le composant `NavlysParcours` reçoit une prop `locale: 'fr' | 'en'`. La traduction est faite par dictionnaire interne (pas de dépendance i18next pour rester léger).

---

## Compatibilité

- Next.js 14+ (App Router)
- React 18+
- TypeScript strict
- Tailwind CSS (les classes sont compatibles, sinon adapter)
- Aucune dépendance lourde supplémentaire

---

## Disclaimer permanent dans le footer global

Le footer du site NAVLYS-HUB doit afficher en permanence :

> Information pédagogique. Tu restes seul décideur. Teste en simulation avant tout engagement réel.
