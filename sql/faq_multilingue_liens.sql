-- FAQ multilingue + liens directs (ordre Bruno 2026-07-07 :
-- « les réponses au faq prêtes dans toutes les langues + liens directs »)
-- Appliqué en base via migration `faq_multilingue_et_liens` le 2026-07-07.
-- Les 264 traductions (88 fiches × EN/RU/HE) sont générées par
-- tools/faq-traductions.mjs (node tools/faq-traductions.mjs → faq-batch-*.sql).
ALTER TABLE core_faq ADD COLUMN IF NOT EXISTS lien text;
ALTER TABLE core_faq ADD COLUMN IF NOT EXISTS traductions jsonb DEFAULT '{}'::jsonb;
COMMENT ON COLUMN core_faq.lien IS 'Chemin direct sur navlys.com où amener la personne (ex. /next-gen)';
COMMENT ON COLUMN core_faq.traductions IS 'Traductions prêtes {en:{q,r},ru:{q,r},he:{q,r}} — FR = colonnes question/reponse';

-- Liens par catégorie
UPDATE core_faq SET lien = CASE categorie
  WHEN 'nextgen' THEN '/next-gen'
  WHEN 'finance' THEN '/finance'
  WHEN 'navlex' THEN '/navlex'
  WHEN 'copilote' THEN '/assistance'
  WHEN 'compte' THEN '/profil'
  WHEN 'paiement' THEN '/adhesion'
  WHEN 'confidentialite' THEN '/confidentialite'
  WHEN 'technique' THEN '/assistance'
  WHEN 'presse' THEN '/assistance'
  WHEN 'club' THEN '/club'
  ELSE '/' END
WHERE lien IS NULL;

-- Cas particuliers (amener au bon endroit précis)
UPDATE core_faq SET lien='/assistance' WHERE id IN (12, 87);
UPDATE core_faq SET lien='/adhesion' WHERE id IN (16, 18, 48);
