# Capture du plan — escale 7

> Une bouteille à la mer scellée, qui contient le plan personnel du visiteur.

---

## Le moment de la capture

À la fin du parcours, le visiteur tient son plan. Pour qu'il l'emporte chez lui, on lui propose deux ports de sortie :

1. **L'email** — pour recevoir le plan complet en pièce jointe et garder une trace.
2. **WhatsApp** — pour partager le plan immédiatement à un proche.

---

## Ce qu'on demande

- **Email** : champ obligatoire, validation simple (regex sobre).
- **Consentement RGPD** : case à cocher claire, en langage simple.
  > « J'accepte de recevoir mon plan par email. Je peux me désinscrire à tout moment. »
- **Pas de téléphone, pas de nom complet** : on reste léger pour ne pas effrayer.

---

## Ce qu'on envoie

Email auto, langage maritime simple :

> Bonjour,
>
> Ton plan NAVLYS est prêt. Voici ton cap, ton délai accéléré, et ta partition 90/10.
>
> [Résumé du plan en texte simple]
>
> Garde cette bouteille à la mer précieusement.
>
> Disclaimer : Information pédagogique. Tu restes seul décideur. Teste en simulation avant tout engagement réel.

Pas d'image, pas de gros logo, pas d'engagement commercial agressif. Juste le plan.

---

## Le bouton WhatsApp

URL générée côté client :

```
https://wa.me/?text=<plan-encodé-URL>
```

Le texte du message contient :
- Le cap (objectif + montant)
- Le délai accéléré
- La partition 90/10
- Le disclaimer

Pas de lien sortant agressif, pas de tracking caché.

---

## Côté serveur

Route API : `app/api/plan-save/route.ts`

- Reçoit `{ plan: NavlysPlan, email: string, consent: boolean }`
- Valide le consentement (refus → 400)
- Sauve le plan dans une couche de persistance (placeholder, à brancher sur Supabase ou similaire)
- Envoie l'email via Resend (clé API en variable d'env)
- Renvoie `{ ok: true }` ou `{ ok: false, reason: string }`

Aucune donnée bancaire ou identifiante n'est stockée au-delà de l'email et du plan.

---

## Pied de page de la modale

> Information pédagogique. Tu restes seul décideur. Teste en simulation avant tout engagement réel.
