# 🗺️ CONSOLIDATION NAVLYS — carte + plan d'intégration (1 site, 1 base)

> But : fondre tout dans **UN site central navlys.com** + **UNE base** `hhrlgyvtqluxpywjiwkd`.
> Établi le 2026-06-28. Source de vérité pour l'import.

---

## ✅ LE SITE CANONIQUE (Drive, 26 juin — dossier `1pNB92d69qOQv34UCNJfpr64LE7Kpkg4g`)
C'est le vrai navlys.com complet et à jour (accueil = cerveau hybride humain/IA animé + constellation, modèle gratuit 0 €). **À importer dans `site/`** :

| Page | fileId Drive |
|---|---|
| index.html | `1FlsuUvePbIR9cCd3U6L0KQOILCB9Ge6A` |
| finance.html | `1_edCZStTvoz7BaZB7PUKiZiMkJ_3zRCW` |
| next-gen.html | `1Etar8HxCmfdxn0QlPO_jlVIemDIwMGsg` |
| navlex.html | `1F5tM3RGS1EKWREXXO6AT6CdoH3Fb4tdk` |
| influenceurs.html | `1P7Hlf2bn48c4mdd77-RrTm4JA4inpFyI` |
| tech.html (Journal IA) | `1rPBHu9mjQ5P2O0s3PgNtQEYfm_wk0oLz` |
| radio.html | `1ZHJIC1iNIbzfE1iLq-hTyy0YzaVXrid7` |
| core-energie.html | `1OaNt3oahL9Js0U3wziAs5TVlSbmWxymu` |
| adn-vivant.html | `1Z0zJWy4s8BgxnT9IUtcuMGfOzF3YUqWA` |
| cerveau-hero.html | `1Tl7khAB1QKtpwNOxER4FWqIBkEfwHFsL` |
| bientot.html | `1Os7rAmrrVC8IBcc0P4ENCrf9ZdM20yJs` |

## 🆕 APPS BÊTA (Drive, 28 juin — dossier Downloads `13ySJp6J2Xfsg8Ao6IrcLarMbcknVeKis`)
Dernières versions des apps Finance & Next Gen (thème « glacier »).
| App | fileId |
|---|---|
| navfin-beta.html | `1Wt-Gf43QFVm508EWJ7smTJm_26j2VJmD` |
| navfin-beta-glacier.html | `1jB-xUMSWZeuGgtpEkXL7oXXzO341cpD2` |
| navlys-next-gen-beta.html | `1YiYp4HkKo0o5HiEmKfN2mHMt86jgYZpO` |
| navlys-next-gen-beta-glacier.html | `1ednh5zIhTBP8Q50OpkOwlsfcMhZvHMRn` |

## 📄 LÉGAL / ANNEXES
| Page | fileId |
|---|---|
| cgu.html | `1Md7eMpP-d6-KWi6YJEaySlwa8JXmkDMD` |
| privacy.html | `1zfyQNJ8Qker8AoN8gHGq0vVRzS1ZB7FG` |
| bio.html | `1ZjJFgBnkvDjKM-WVYo8AQ8q5sPTZpzfe` |

## 🗑️ À IGNORER (doublons / vieux / autre marque)
`NOVA_*`, `37__/38__/70-73__index`, `index (1..4)`, vieux `cockpit*`, `*martingale*`, `teaser_*`, `_BRUNOPARTOUCHE_*`, `brunopartouche*.html`, `bruno_wikipedia_*`, logos showcase. → brunopartouche.com est un **site séparé** (Bruno visible) : ne pas fusionner.

---

## 🧩 PROCÉDURE D'IMPORT (par page)
1. `mcp__Google_Drive__download_file_content(fileId)` → base64.
2. Décoder le base64 → écrire dans `/home/user/NAVLYS-BETA-/site/<nom>.html`.
   *(ou `read_file_content` puis dé-échapper `\< → <`, `\> → >`, `\& → &`, `\# → #`, `\* → *`.)*
3. Vérifier que le fichier commence par `<!DOCTYPE html>`.
4. Une fois les 11 pages dans `site/` : remplacer les liens `/finance` etc. par `finance.html` si déploiement statique, OU garder les chemins si rewrites Vercel.

## 🧠 BASE UNIQUE
Tout sur **`hhrlgyvtqluxpywjiwkd`** (le cerveau complet : agents, core_knowledge, NAVBIO, inscriptions). Variables site :
- `SUPABASE_URL = https://hhrlgyvtqluxpywjiwkd.supabase.co`
- `SUPABASE_ANON_KEY = <clé anon publique>` (policy `core_knowledge_read` = lecture publique OK).

## ⛔ BLOCAGES ACTUELS (côté Bruno)
1. **Vercel 2FA** (passkey indisponible sur mobile) → impossible de déployer / changer les env vars. *Déblocage : recovery code, ou login depuis le Dell.*
2. **2 autres bases Supabase** (orgs « NAVLYS » Free et « Navlys » Pro) hors de mon accès — à consolider/fermer.
3. Validation des commandes multi-agents impossible sur mobile.

## ▶️ PROCHAINES ÉTAPES
1. Bruno récupère l'accès Vercel.
2. Import des 11 pages canoniques dans `site/` (1 passe).
3. Brancher base unique + SAV (`/api/sav` → `hhrlgyvtqluxpywjiwkd`).
4. Brancher le repo à Vercel (auto-déploiement) → un seul site vivant.
5. Supprimer les 2 teasers Vercel + l'abo Pro inutile.

⚓ « L'IA est le vent, c'est toi qui tiens la barre. »
