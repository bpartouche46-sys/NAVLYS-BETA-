# 🎁 PLAFONDS GRATUITS BETA — Tableau de référence
*29 mai 2026 · règles techniques + affichage utilisateur · validé Bruno*

---

## 📊 TABLEAU MAÎTRE — Limites par app

| App | Catégorie | Plafond gratuit BETA | Mode | Coût utilisateur |
|---|---|---|---|---|
| **NAVBIO** | Photos | **10** | Stockage R2 chiffré E2E | 0 € |
| **NAVBIO** | Vidéos | **10** (60 sec max chacune) | Idem | 0 € |
| **NAVBIO** | Documents | **10** (10 Mo max chacun) | Idem | 0 € |
| **NAVBIO** | Messages vocaux | **10** (3 min max chacun) | Transcription Whisper | 0 € |
| **NAVBIO** | Récits générés | **1 par mois** | Livre + film + audio avec filigrane BETA | 0 € |
| **NAVBIO** | Partages | **Illimité** (effet viral souhaité) | WhatsApp, IG, TikTok, lien public | 0 € |
| **NAVLYS NEXT GEN INVEST** | Portefeuille virtuel | **$1000** | Paper trading uniquement | 0 € |
| **NAVLYS NEXT GEN INVEST** | Simulations/jour | **3** | Backtest 5 ans max par simulation | 0 € |
| **NAVLYS NEXT GEN INVEST** | Voix NAV IA | **10 questions/jour** | Voix neutre BETA, voix Bruno post-J0 | 0 € |
| **NAVLYS NEXT GEN INVEST** | Exécution réelle | **❌ DÉSACTIVÉE** | Jamais en BETA | — |
| **NAVLYS.IO** | Sites créés | **1 site** | Sous-domaine `*.navlys.io` | 0 € |
| **NAVLYS.IO** | Briefs vocaux | **3 / site / jour** | Whisper + Claude génération | 0 € |
| **NAVLYS.IO** | Domaine perso | **❌ Réservé Premium** | Activation post-J0 | — |
| **brunopartouche.com** | Lecture | **Illimité** | Pas d'inscription nécessaire | 0 € |
| **brunopartouche.com** | Newsletter | **1 abonnement** | Resend, 1 mail/semaine | 0 € |
| **brunopartouche.com** | Session "Q&R Bruno" | **50 places BETA** | Premier arrivé, premier servi | 0 € |

---

## ⚠ FILIGRANE BETA — Visible mais discret

### Sur tous les livrables NAVBIO
- **Vidéo** : médaille bronze + texte "BETA" coin bas droit, opacité 70%
- **PDF livre** : bandeau footer toutes pages *« Généré en BETA — version officielle dès le 1ᵉʳ juin »*
- **Audio MP3** : voix annonce 2 secondes en début *« Récit BETA NAVBIO »*

### Sur sites NAVLYS.IO BETA
- Footer permanent : *« Propulsé en BETA par NAVLYS.IO — passe Premium pour retirer ce bandeau »*

### Sur dashboard NAVLYS INVEST BETA
- Watermark diagonal très discret au centre : "PAPER TRADING BETA"
- Barre d'info en haut : *« 🎁 BETA gratuite — portefeuille virtuel uniquement »*

---

## 🔓 DÉPASSEMENT DE PLAFOND — Comportement UX

Quand l'utilisateur atteint un plafond, **JAMAIS de blocage brutal**.

Au lieu de ça :
1. **Toast doux** (notif douce) : *« Bravo Marie, tu as utilisé tes 10 photos BETA. »*
2. **Choix proposé** :
   - 💎 **Réserver lancement officiel** (gratuit, notif J0)
   - ⭐ **Passer Premium maintenant** (€39 one-shot, déverrouille tout)
   - 🗑 **Remplacer une photo existante** (la supprimer libère 1 slot)
3. **Jamais de message culpabilisant** ("Vous avez atteint votre limite !")

---

## 🛡 PROTECTION TECHNIQUE (Supabase RLS)

```sql
-- Trigger BEFORE INSERT sur user_navbio_media
CREATE FUNCTION enforce_navbio_quota() RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM user_navbio_media 
      WHERE user_id = NEW.user_id 
      AND category = NEW.category
      AND deleted_at IS NULL) >= 10 THEN
    RAISE EXCEPTION 'NAVBIO_QUOTA_BETA_REACHED'
      USING HINT = 'Reserve lancement J0 ou passe Premium pour deverrouiller';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- RLS policy : aucune écriture au-delà du quota
CREATE POLICY navbio_quota_check ON user_navbio_media
  FOR INSERT WITH CHECK (
    (SELECT COUNT(*) FROM user_navbio_media 
     WHERE user_id = auth.uid() 
     AND category = NEW.category
     AND deleted_at IS NULL) < 10
  );
```

---

## 📈 OBJECTIFS BETA (J0 → J+30)

- 🎯 1000 inscrits NAVBIO en 7 jours
- 🎯 500 récits générés en 7 jours
- 🎯 100 partages WhatsApp/Instagram/TikTok en 7 jours
- 🎯 10% de conversion vers réservation lancement
- 🎯 2% de conversion vers Premium pré-commande

---

## 🚀 OUVERTURE POST-J0 — Plans payants

| Plan | NAVBIO | NAVLYS INVEST | NAVLYS.IO | Prix |
|---|---|---|---|---|
| **BETA permanente** | 10/cat | $1000 virtuel | 1 sous-domaine | Gratuit à vie |
| **Solo** | 100/cat | $5k virtuel + 1 simulation réelle/mois | 3 sites + 1 domaine | €19/an |
| **Couple** | 200/cat × 2 utilisateurs | $10k virtuel + 5 simu/mois | 5 sites | €29/an |
| **Premium** | 1000/cat | $50k virtuel + simu illimité | 10 sites + 3 domaines | €39 one-shot |
| **Pro / Cinéma** | 10000/cat + édition collaborative | Toutes fonctionnalités | Illimité + agence | €149-199 |

---

🎁 *Plafonds officiels BETA · Le Notaire de Bord · 29 mai 2026 nuit*
