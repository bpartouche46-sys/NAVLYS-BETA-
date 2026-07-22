-- =====================================================================
-- NAVLYS — Communication 100 % positive + validation en un clic
-- Demande de Bruno (2026-07-09) : « en un clic valider tout, et laisser
-- l'agent dialoguer/écouter/répondre avec ma philosophie, toujours
-- positive, sans le moindre terme négatif. »
-- Doc associée : docs/RESEAUX_SOCIAUX_SANS_RISQUE.md
-- =====================================================================

-- 1) Lexique positif : chaque terme négatif interdit -> remplacement positif
create table if not exists core_lexique_positif (
  id bigint generated always as identity primary key,
  negatif text not null unique,
  positif text not null,
  note text,
  created_at timestamptz not null default now()
);
alter table core_lexique_positif enable row level security;

insert into core_lexique_positif (negatif, positif, note) values
  ('problème',      'point à améliorer',            'orienté solution'),
  ('impossible',    'voici comment on peut faire',  'toujours une voie'),
  ('erreur',        'amélioration en cours',        'on apprend'),
  ('échec',         'étape d''apprentissage',       'philosophie Bruno'),
  ('panne',         'maintenance en cours',         'rassurant'),
  ('malheureusement','bonne nouvelle :',            'retourner la phrase'),
  ('refusé',        'à ajuster ensemble',           'jamais fermer la porte'),
  ('interdit',      'réservé pour l''instant',      'positif'),
  ('mauvais',       'perfectible',                  'constructif'),
  ('difficile',     'stimulant',                    'énergie positive'),
  ('bug',           'réglage en cours',             'technique -> humain'),
  ('retard',        'presque prêt',                 'anticipation'),
  ('non',           'oui, dès que possible',        'défaut OUI de Bruno'),
  ('prix',          'cotisation',                   'doctrine adhésion'),
  ('tarif',         'cotisation',                   'doctrine adhésion'),
  ('client',        'membre',                       'doctrine communauté')
on conflict (negatif) do nothing;

-- 2) navlys_positiver(texte) : réécrit un texte en remplaçant chaque terme
--    négatif du lexique par son équivalent positif (insensible à la casse).
create or replace function navlys_positiver(p_texte text)
returns text
language plpgsql
stable
set search_path = public
as $$
declare
  r record;
  t text := coalesce(p_texte, '');
begin
  for r in select negatif, positif from core_lexique_positif loop
    t := regexp_replace(t, '\m' || r.negatif || '\M', r.positif, 'gi');
  end loop;
  return t;
end;
$$;

-- 3) navlys_valider_tout() : Bruno valide TOUTES les missions a_valider en un clic
create or replace function navlys_valider_tout()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  n integer;
begin
  update missions set statut = 'fait' where statut = 'a_valider';
  get diagnostics n = row_count;
  if n > 0 then
    insert into journal (type, message)
    values ('validation', 'Bruno a TOUT validé en un clic : ' || n || ' mission(s)');
  end if;
  return n;
end;
$$;
-- Règle n°114 : SECURITY DEFINER qui écrit => jamais appelable par un anonyme
revoke execute on function navlys_valider_tout() from public, anon, authenticated;

-- 4) Doctrine gravée : règles permanentes + mémoire des agents de communication
select navlys_regle(
  'Gestion des réseaux sociaux par le CORE (dialogue, écoute, réponse)',
  'UNIQUEMENT via l''API officielle Meta ou un partenaire certifié Meta Business Partner (Meta Business Suite, Metricool, Buffer, ManyChat, Agorapulse) : moins de 0,5 % de risque de suspension, contre 15-30 % pour les bots non officiels. Répondre SEULEMENT aux interactions initiées par le membre (commentaire, réponse Story, message reçu) — jamais de prospection à froid automatisée, jamais de multi-compte, jamais de contournement de limites. Réf : docs/RESEAUX_SOCIAUX_SANS_RISQUE.md'
);
select navlys_regle(
  'Ton de toute communication externe des agents (réseaux sociaux, SAV, mails)',
  'Communication 100 % positive, philosophie de Bruno : jamais le moindre terme négatif — passer chaque livrable par navlys_positiver() avant publication (lexique core_lexique_positif). Tutoiement + prénom, chaleur, orienté solution, membre (jamais client), cotisation (jamais prix). Validation en un clic disponible : bouton « Tout valider » du cockpit / RPC navlys_valider_tout().'
);

select agent_note('NAVCOM',  'doctrine', 'Réseaux sociaux sans risque + ton positif',
  'Dialoguer/écouter/répondre uniquement via API officielle Meta ou partenaire certifié (Metricool, ManyChat, Buffer, Agorapulse, Meta Business Suite). Répondre seulement aux interactions initiées par le membre. Chaque réponse passe par navlys_positiver() : zéro terme négatif, philosophie positive de Bruno, tutoiement + prénom.', 'sql/communication_positive_valider_tout.sql');
select agent_note('NAVCOMU', 'doctrine', 'Réseaux sociaux sans risque + ton positif',
  'Idem NAVCOM : API officielle uniquement, réponses aux interactions initiées, ton 100 % positif via navlys_positiver(), accueil par prénom, jamais un mot négatif.', 'sql/communication_positive_valider_tout.sql');
