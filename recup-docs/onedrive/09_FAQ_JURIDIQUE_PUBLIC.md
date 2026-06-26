# ⚓ FAQ JURIDIQUE NAVBIO LIFE — 20 questions / 20 réponses
_Public FAQ · Bilingue FR / EN · 29 mai 2026_

> **Objectif.** Rassurer l'utilisateur prudent en répondant aux questions les plus fréquentes en langage clair, sans jargon, en restant juridiquement précis.

---

## 1. Puis-je publier des photos de ma famille ? / Can I publish family photos?

**FR.** Oui, à condition d'avoir l'accord des personnes adultes visibles et l'autorisation parentale pour les mineurs. Pour vos enfants, vous en êtes le représentant légal (jusqu'à 18 ans).

**EN.** Yes, with adult subjects' consent and parental authorization for minors. You are the legal representative for your own children (under 18).

---

## 2. Mes données sont-elles vendues à des tiers ? / Is my data sold to third parties?

**FR.** **Non, jamais.** NAVLYS ne vend, ne loue, ne cède aucune donnée à des courtiers, annonceurs ou plateformes publicitaires. Notre modèle économique est l'abonnement et la vente unitaire, pas la publicité.

**EN.** **No, never.** NAVLYS does not sell, rent, or transfer data to brokers or ad platforms. Our model is subscription + one-shot purchase, not advertising.

---

## 3. NAVLYS peut-il lire mes photos ? / Can NAVLYS read my photos?

**FR.** **Non, techniquement impossible.** Vos photos sont chiffrées sur votre appareil avant tout envoi (AES-256-GCM). La clé reste avec vous (dérivée de votre mot de passe maître). NAVLYS ne reçoit que des blocs binaires illisibles. Architecture *zero-knowledge*.

**EN.** **No, technically impossible.** Photos encrypted on your device before upload (AES-256-GCM). Key stays with you. NAVLYS only sees unreadable binary blobs. Zero-knowledge architecture.

---

## 4. Que se passe-t-il si je meurs ? / What happens if I die?

**FR.** Vous pouvez désigner jusqu'à 3 légataires NAVBIO. Ils accèdent à votre dossier sur présentation d'un acte de décès, d'une pièce d'identité, et de la clé partielle que vous leur aurez confiée (système Shamir 2 parts sur 3). Sans légataire désigné, le compte est archivé chiffré 5 ans, puis supprimé. Conforme à l'art. 85 de la Loi Informatique et Libertés (FR) et au RUFADAA (USA).

**EN.** You can designate up to 3 NAVBIO legatees. They access your dossier with death certificate + ID + the partial Shamir key (2-of-3) you entrusted to them. Without a legatee, encrypted archive for 5 years, then deletion. Per FR LIL art. 85 / US RUFADAA.

---

## 5. Que faire si quelqu'un signale mon contenu ? / What if someone reports my content?

**FR.** Vous recevez une notification de signalement (procédure DSA art. 16). Vous disposez de **48 heures** pour répondre : contester, retirer volontairement, ou ne rien faire. Sans réponse, NAVLYS examine la notification et peut retirer le contenu si elle apparaît fondée. Vous pouvez toujours contester par voie interne ou judiciaire.

**EN.** You get a report notification (DSA art. 16). You have **48 hours** to respond: contest, voluntarily remove, or do nothing. Without response, NAVLYS reviews and may remove if justified. You retain contest rights.

---

## 6. Le floutage automatique est-il toujours fiable ? / Is auto-blur always reliable?

**FR.** Non, aucune IA n'est parfaite. L'algorithme peut rater certains visages (profil partiel, faible luminosité, vieille photo) ou flouter par erreur des objets ressemblants. **Vous restez responsable du contrôle final**. Vous pouvez flouter manuellement les visages oubliés.

**EN.** No, no AI is perfect. The algorithm may miss faces (partial profile, low light, old photo) or wrongly blur similar objects. **You remain responsible for the final check.** You can blur missed faces manually.

---

## 7. Puis-je publier des photos de personnes décédées ? / Can I publish deceased persons' photos?

**FR.** Oui, dans le cadre privé NAVBIO, avec une recommandation forte d'obtenir l'accord des ayants droit (jurisprudence Mitterrand 1996). Le droit à l'image ne s'éteint pas totalement au décès. Voir le guide pratique `07_GUIDE_PHOTOS_PERSONNES_CONNUES.md`.

**EN.** Yes, in private NAVBIO context, strongly recommend obtaining heirs' consent (Mitterrand case law 1996). Image rights do not fully extinguish on death. See guide `07`.

---

## 8. Que se passe-t-il si j'oublie mon mot de passe ? / What if I forget my password?

**FR.** ⚠️ **NAVLYS ne peut pas le récupérer.** C'est le revers du chiffrement zero-knowledge. Notez précieusement votre **phrase de récupération à 12 mots** (BIP-39) lors de l'inscription et conservez-la hors ligne (papier, coffre). Sans elle, vos données sont définitivement perdues.

**EN.** ⚠️ **NAVLYS cannot recover it.** Trade-off of zero-knowledge. Save the **12-word recovery phrase** (BIP-39) at signup, offline (paper, safe). Without it, data is permanently lost.

---

## 9. NAVBIO est-il conforme RGPD ? / Is NAVBIO GDPR-compliant?

**FR.** Oui. Politique de confidentialité dédiée (`02_POLITIQUE_CONFIDENTIALITE_NAVBIO.md`). DPO joignable à `dpo@navlys.com`. Vous disposez de l'ensemble des droits articles 15 à 22 du RGPD : accès, rectification, effacement, portabilité, opposition, limitation.

**EN.** Yes. Dedicated privacy policy. DPO at `dpo@navlys.com`. All GDPR rights (arts. 15-22): access, rectification, erasure, portability, objection, restriction.

---

## 10. Puis-je exporter toutes mes données ? / Can I export all my data?

**FR.** Oui, droit à la portabilité (RGPD art. 20). Export disponible dans les paramètres NAVBIO en format JSON (métadonnées) + ZIP des blobs chiffrés (vous pourrez les déchiffrer avec votre clé même hors NAVBIO).

**EN.** Yes, portability right (GDPR art. 20). Export in settings: JSON metadata + ZIP of encrypted blobs (decryptable with your key outside NAVBIO).

---

## 11. Qui voit mes contenus à part moi ? / Who else sees my content?

**FR.** Personne, sauf :
- Vous-même ;
- Les personnes à qui vous partagez explicitement (lien temporaire, 7 jours par défaut) ;
- Vos légataires post-mortem si configurés ;
- Une autorité judiciaire qui obtiendrait votre clé (qu'elle ne peut techniquement obtenir que de vous).

**EN.** Nobody, except: yourself; people you explicitly share with (7-day temporary link); post-mortem legatees if set; judicial authority obtaining your key (technically only obtainable from you).

---

## 12. NAVBIO peut-il être attaqué par un hacker ? / Could NAVBIO be hacked?

**FR.** Tout système peut être attaqué. Cependant, même en cas de fuite de la base, les attaquants ne récupéreraient que des **blobs chiffrés inutilisables sans votre clé**. C'est précisément la vertu du zero-knowledge : le serveur ne contient rien d'exploitable. Audits sécurité indépendants prévus T3 2026 + bug bounty privé.

**EN.** Any system can be attacked. But even if the database leaked, attackers would only get **encrypted blobs unusable without your key**. That's the zero-knowledge virtue. Independent security audits planned Q3 2026 + private bug bounty.

---

## 13. Puis-je utiliser NAVBIO en dehors de la France ? / Can I use NAVBIO outside France?

**FR.** Oui, partout dans le monde. Vous devez cependant respecter la loi de votre pays de résidence. Certains pays ont des règles spécifiques (Chine PIPL, Russie Loi 152-ФЗ, Inde DPDP Act). En cas de doute, consultez un avocat local.

**EN.** Yes, worldwide. You must respect your country's law (China PIPL, Russia 152-ФЗ, India DPDP Act, etc.). When in doubt, consult a local lawyer.

---

## 14. Puis-je transférer mon compte à un proche ? / Can I transfer my account to a relative?

**FR.** Non, pas de transfert direct (un compte = un titulaire). Pour partager du contenu, utilisez la fonction « Partage » ou désignez la personne comme légataire. Pour les couples, l'offre NAVBIO Couple (29 €) permet deux titulaires.

**EN.** No direct transfer (one account = one holder). Use Sharing function or designate as legatee. For couples, NAVBIO Couple (€29) allows two holders.

---

## 15. NAVBIO m'enverra-t-il de la publicité ? / Will NAVBIO send me ads?

**FR.** Non. Pas de publicité tierce dans l'app. Communications NAVLYS limitées à : transactionnel (paiement, sécurité) + newsletter si vous optez explicitement (opt-in). Désabonnement en un clic.

**EN.** No. No third-party ads. NAVLYS communications: transactional only (payment, security) + opt-in newsletter. One-click unsubscribe.

---

## 16. Que se passe-t-il si NAVLYS ferme ? / What if NAVLYS shuts down?

**FR.** Procédure de continuité prévue : préavis 6 mois, export massif automatique aux Utilisateurs avec leurs clés, archives chiffrées disponibles 1 an supplémentaire. Engagement contractuel inscrit dans les CGU.

**EN.** Continuity plan: 6-month notice, automated mass export with keys, encrypted archives available +1 year. Contractually committed in Terms.

---

## 17. Combien de temps avant suppression définitive ? / How long until permanent deletion?

**FR.** Sur demande Utilisateur : **30 jours maximum** pour les contenus. Les factures sont conservées 10 ans (obligation comptable). Les logs techniques 12 mois (obligation CPCE).

**EN.** On User request: **30 days max** for content. Invoices kept 10 years (accounting law). Tech logs 12 months (FR CPCE).

---

## 18. NAVBIO modère-t-il mes contenus ? / Does NAVBIO moderate my content?

**FR.** **Non, c'est impossible techniquement** (chiffrement E2E). NAVBIO n'agit qu'en aval sur **notification valide** d'un tiers (procédure DSA art. 16). Vous êtes seul responsable de la légalité de ce que vous déposez.

**EN.** **No, technically impossible** (E2E). NAVBIO acts downstream only on **valid third-party notice** (DSA art. 16). You're solely responsible.

---

## 19. Mes contenus seront-ils utilisés pour entraîner une IA ? / Will my content be used to train AI?

**FR.** **Non, jamais.** NAVLYS ne peut pas lire vos contenus (zero-knowledge), donc ne peut pas les utiliser pour l'entraînement. Les fonctionnalités IA tournent **soit côté client**, **soit avec des modèles éphémères sans rétention** (Anthropic, OpenAI : DPA garantissant non-entraînement).

**EN.** **No, never.** NAVLYS cannot read content (zero-knowledge), so cannot use it for training. AI features run **client-side** or with **ephemeral non-training models** (Anthropic, OpenAI: DPA prevents training).

---

## 20. À qui m'adresser pour une réclamation ? / Whom do I contact for complaints?

**FR.**
1. **NAVLYS** : `support@navlys.com` (général) ou `legal@navlys.com` (juridique).
2. **DPO NAVLYS** : `dpo@navlys.com` (RGPD).
3. **Médiateur consommateur** : CMAP — https://www.cmap.fr — gratuit, 60 jours.
4. **CNIL** (FR) : https://www.cnil.fr/fr/plaintes (RGPD).
5. **Justice** : Tribunal Judiciaire de Paris (par défaut FR/UE).

**EN.**
1. **NAVLYS:** `support@navlys.com` / `legal@navlys.com`.
2. **DPO:** `dpo@navlys.com`.
3. **Consumer mediation:** CMAP — https://www.cmap.fr — free, 60 days.
4. **Authority:** CNIL (FR) / ICO (UK) / DPC (IE) / FTC (US).
5. **Court:** Paris (FR/EU default).

---

*Document interne — FAQ utilisateur — à publier sur `/help/legal`. — Le Notaire de Bord NAVLYS.*
