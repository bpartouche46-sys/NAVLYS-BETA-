# Sécurité locale — l'app moteur installée chez toi reste chez toi

> Aucune fuite, aucun appel sortant non explicite, aucune télémétrie cachée. La règle est dure et claire.

---

## Les six règles de sécurité du moteur local

### 1. Pas de réseau sortant par défaut
Le standalone HTML/JS du MOTOR ENGINE et de la Veille Premium ne fait **aucun appel HTTP** au démarrage ou pendant l'usage normal. Tout tourne dans le navigateur, sur ton disque.

### 2. Stockage local uniquement
La seule persistance est `localStorage` du navigateur (confirmation de majorité, préférences). Aucune base distante, aucun cookie tiers, aucun pixel de tracking.

### 3. Pas de télémétrie
Aucune métrique d'usage n'est envoyée à un serveur tiers. Aucune analyse comportementale.

### 4. Pas de mot de passe stocké
Le moteur ne stocke aucun identifiant ni mot de passe. Si un jour une intégration tierce est ajoutée (par exemple Resend pour email), la clé reste côté serveur Vercel et n'est jamais exposée au navigateur.

### 5. Chiffrement optionnel des plans sauvés
Si tu sauves ton plan en local, il peut être chiffré par une passphrase que toi seul connais (AES-256 côté navigateur, via Web Crypto API standard).

### 6. Sources de veille publiques et traçables
Toutes les sources listées sont publiques. Aucune source cachée, aucune fuite confidentielle. La méthode est reproductible par un tiers.

---

## Ce que ça veut dire pour toi

- Tu peux ouvrir l'app sans Internet, elle fonctionne.
- Tu peux la fermer, plus rien ne tourne.
- Tu peux la supprimer, plus aucune trace ne reste sur ton ordinateur (à part le `localStorage` que tu peux vider en un clic).
- Personne ne sait ce que tu fais avec.

---

## Disclaimer permanent

> Information pédagogique. Tu restes seul décideur. Teste en simulation avant tout engagement réel.
