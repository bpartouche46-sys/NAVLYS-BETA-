# 🛰️ Vérif lecture seule sites + DNS — 28-29 mai 2026 (nuit)
_Observation non-intrusive. Aucune modification. Snapshot à 18h04 UTC du 28/05._

## ✅ Sites UP (HTTP/2 200)

### navlys.com
- Statut : **HTTP/2 200** ✅
- `last-modified` : `Thu, 28 May 2026 07:57:36 GMT` (rafraîchi ce matin)
- `age` : 36 438 s (≈ 10h cache CDN)
- `cache-control: public, max-age=0, must-revalidate`
- Gate verrouillé : **non touché** (pas d'inspection contenu, juste header)

### brunopartouche.com
- Statut : **HTTP/2 200** ✅
- `last-modified` : `Thu, 28 May 2026 07:25:40 GMT`
- `age` : 38 355 s (≈ 10h)

### brunopartouche-teaser.vercel.app
- Statut : **HTTP/2 200** ✅
- `last-modified` : `Mon, 25 May 2026 04:55:31 GMT` (médaille bronze 3D déployée le 25)
- `age` : 306 565 s (≈ 3,5 jours — stable)

## ✅ MX Google `navlys.com` INTACTS
```
1  aspmx.l.google.com.
5  alt2.aspmx.l.google.com.
5  alt1.aspmx.l.google.com.
10 aspmx2.googlemail.com.
10 aspmx3.googlemail.com.
```
→ **5 enregistrements MX Google Workspace** présents et corrects. `bruno@navlys.com` reçoit toujours.

## ✅ A records DNS
| Domaine | A record | Conformité CLAUDE.md |
|---|---|---|
| navlys.com | `216.198.79.1` | ✅ Vercel anycast |
| brunopartouche.com | `216.198.79.1` | ✅ Vercel anycast |

➡️ Migration DNS Namecheap déjà effective (Bruno a basculé). Plus de Netlify résiduel actif sur ces domaines (vérifié : même IP Vercel sur les deux).

## 🚨 Vigilance
- **Pas de bascule MX** pendant le mandat nuit (interdit CLAUDE.md respecté).
- **Pas de redéploiement Vercel** lancé (interdit "déploiements rapprochés" respecté).
- **Pas d'inspection contenu page** (pas de `curl https://navlys.com` sans `-I`, juste les en-têtes).

## Snapshot taille moyenne fichiers `_SITES_MASTER/` (référence)
Pas exécuté pour ne pas surcharger la nuit. À faire au réveil si besoin (`du -sh _SITES_MASTER/`).

## Conclusion
**État online sain.** Rien de cassé. Tout est prêt pour J-3 lancement.
