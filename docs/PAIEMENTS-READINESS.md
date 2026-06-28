# 💳 PAIEMENTS — checklist « prêt à encaisser, sans blocage »

> Objectif de Bruno (2026-06-24) : **être sûr que les systèmes de paiement sont prêts**
> et **sans problème lié au fait d'être israélien** avec certains.
> ⚠️ Règle §3 : aucun paiement déclenché par un agent ; ici on **vérifie la capacité à ENCAISSER**.

## Canaux d'encaissement choisis (Équipage Navlys)
1. **Substack** (Stripe lié) — le Stripe actuellement connecté à Claude : `acct_1TYn17…` (« navlys2026.substack »).
2. **Stripe direct NAVLYS** — compte Stripe distinct, sur le site (onboarding « Chloe » repéré dans les mails).
3. **PayPal** — connecté à Claude, fonctionne (0 transaction récente).

## ⚠️ La règle qui crée 90 % des « problèmes » : entité ↔ banque de versement
- Stripe **verse** (payout) vers un **compte bancaire du même pays/zone** que le compte Stripe.
  - Stripe **France/UE** → exige une **banque SEPA** (Qonto/BNP FR). Une banque **israélienne** n'est
    en général **pas** acceptée pour un Stripe FR.
  - Stripe **Israël** → verse vers une **banque israélienne**, facture en ₪/$.
- Donc avec une **structure mixte FR + IL**, le risque n'est pas l'« israélien » en soi, mais un
  **mauvais appariement** : ex. Stripe FR sans banque FR pour recevoir l'argent. → c'est LE point à caler.

## Statut par fournisseur (à confirmer dans chaque dashboard — je ne le vois pas tout depuis l'API)
| Canal | Israélien OK ? | À vérifier (dashboard) | Statut |
|---|---|---|---|
| **Stripe (Substack)** | ✅ Stripe existe en IL | « Charges enabled » + « Payouts enabled » + **banque de versement** liée + identité vérifiée | ⏳ à vérifier |
| **Stripe direct NAVLYS** | ✅ | Le compte existe-t-il vraiment ? Sous quelle **entité/pays** ? Banque liée ? | ⏳ à clarifier |
| **PayPal** | ✅ PayPal en IL | Compte **Business** (pas perso) + vérifié + devise de retrait | ⏳ à vérifier |
| **Qonto** | ⚠️ UE only | Réservé à une **société UE** → OK seulement si **entité FR** ; sinon KYC bloqué | ⏳ dépend entité |
| **BNP Paribas** | ⚠️ FR | Ouverture non-résident difficile → OK surtout si **société/résidence FR** | ⏳ dossier en cours |

## ❓ Ce que j'attends de Bruno pour finaliser
1. **Explique la structure « mixte »** : as-tu une **société française** ? une **entité israélienne** ?
   les deux (holding + filiale) ? Qui facture les abonnés ?
2. Quel canal est **principal** vs secondaire (pour caler la banque de versement la plus sûre) ?

## Plan de vérification (dès que l'entité est claire)
- [ ] Stripe (chaque compte) : Dashboard → *Settings → Payouts* : pays, banque liée, payouts activés.
- [ ] Stripe : *Settings → Business* : entité, vérification d'identité (KYC) complète.
- [ ] PayPal : type de compte **Business** + vérifié + IBAN/banque de retrait.
- [ ] Décider Qonto/BNP **selon l'entité** (UE ⇒ utile ; sinon ⇒ banque israélienne pour le Stripe IL).
- [ ] Tester un **paiement de 1 €/$ en réel** sur chaque canal (✅ feu vert Bruno requis — règle §3).

---

# 🎯 ARCHITECTURE RETENUE (mise à jour 2026-06-24)

**Contexte clarifié par Bruno** : c'est la **société israélienne qui encaisse tout**.
L'entité française = **juste un compte bancaire** (aucune gestion / encaissement / dépense
dessus). Besoin : encaisser des **CB internationales comme n'importe quel magasin**, **ne
jamais être bloqué** par un intermédiaire, et que **les taxes (TVA) soient prélevées par le
prestataire** avant le versement.

## ✅ La solution qui coche TOUT : un **Merchant of Record (MoR)**
Un MoR (**Lemon Squeezy** — racheté par Stripe — ou **Paddle**) devient **le vendeur légal** :
1. **Checkout hébergé international** : Visa, Mastercard, Amex, cartes débit/crédit, Apple Pay,
   Google Pay, PayPal, méthodes locales → exactement « comme un magasin ».
2. **TVA / sales tax collectée ET reversée PAR EUX** (200+ juridictions) : la taxe est **déduite
   du versement** → tu reçois le **net**. ➜ répond à ta demande « taxes payées avant encaissement ».
3. **Risque de blocage réduit** : la conformité/fiscalité repose sur **eux** ; tu vends sous leur
   entité. (⚠️ aucun prestataire n'est blocage-zéro → voir garde-fous ci-dessous.)
4. **Encaisse pour la société israélienne** (versements vers la banque israélienne). L'entité FR
   **n'est pas touchée**. Gère les **abonnements** (Équipage Navlys) nativement.
- 💰 Coût : ~**5 % + 0,50 $**/transaction (inclut la conformité fiscale mondiale).
- ⚠️ À confirmer au KYC : que le MoR **verse bien à une société/banque israélienne** (souvent via
  Wise/Payoneer). Lemon Squeezy tourne sur les rails **Stripe** (déjà connecté à Claude).

## ⚠️ Distinction taxes (à ne pas confondre)
- Le MoR/PSP gère la **TVA / sales tax** (impôt sur la conso, payé par l'acheteur) → oui, prélevée à la source.
- Il **NE paie PAS** ton **impôt sur les sociétés** (ça reste à ta société israélienne / ton comptable).

## 🛡️ « Ne jamais être bloqué » — garde-fous réalistes (aucun n'est garanti à 100 %)
1. **MoR en principal** (la conformité pèse sur eux) + **PayPal en secours** (bascule immédiate).
2. **Vider les soldes** vers la banque régulièrement (ne pas laisser de gros montants chez le PSP).
3. **KYC complet** + positionnement clair **« éducation, non régulé »** (cohérent ZÉRO ORIAS/CIF) → profil propre.
4. **Chargebacks < 1 %** : descriptif clair, remboursements proactifs, support réactif.
5. Pas de pic de volume soudain non annoncé ; prévenir le prestataire en cas de montée en charge.

## 🔧 Qui fait quoi
- **Moi (Claude)** : je conçois le montage, prépare produits/prix, et **construis le checkout/les
  liens de paiement** dès que tu as un compte + credentials. Je peux préparer une page de paiement.
- **Toi (Bruno)** : choisir **Lemon Squeezy vs Paddle**, créer le compte **sous la société
  israélienne**, passer le **KYC**, relier la **banque israélienne**, donner le **feu vert go-live** (§3).
- ❌ Je ne crée aucun compte, n'engage aucun frais et ne passe rien en réel sans ton feu vert.

## Réponse directe à « faut-il un Stripe FR ? »
**Non, pas nécessaire.** Comme Israël encaisse tout, on encaisse via le **MoR (rails Stripe/IL)
+ PayPal**. Le **Stripe FR** n'est utile que si un jour tu veux encaisser **sous l'entité
française** — ce que tu ne veux PAS. Le compte bancaire FR (Revolut) reste juste un **réceptacle
euro** optionnel pour d'éventuelles opérations européennes.
