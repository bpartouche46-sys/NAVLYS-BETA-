-- NAVLYS — Test Bateaux « L'ÂME & LA VISITE » (gravé 2026-07-11)
-- Ce que les rapports-robots (ChatGPT & co) ne donnent JAMAIS : l'histoire
-- humaine du bateau, une visite RÉELLE en vidéo (intérieur/extérieur, à regarder
-- sur mobile), et ce qu'on ressent en montant à bord — pas seulement des chiffres
-- d'osmose recopiés partout à l'identique.
--
-- Règle n°134 : toute connaissance bateau va en base, jamais en dur.
-- Lecture publique par la page /bateau-rapport via RPC navlys_bateau_ame().
-- Les vidéos sont vérifiées (oEmbed 200 + titre/auteur réels) avant insertion.
-- Idempotent.

create table if not exists core_bateau_ame (
  id bigserial primary key,
  marque text not null default '',
  modele text not null default '',
  annees text not null default '',
  accroche text not null default '',            -- une phrase humaine d'accroche
  ame text not null default '',                 -- l'histoire du bateau/du modèle
  philosophie text[] not null default '{}',     -- l'esprit de conception (humain)
  regarder text[] not null default '{}',        -- ce qu'on RESSENT/regarde à bord (non technique)
  videos jsonb not null default '[]'::jsonb,     -- [{yt,titre,auteur,angle,note}]
  differenciateur text not null default '',      -- ce qu'un robot ne te dira jamais
  source text not null default '',
  created_at timestamptz not null default now()
);
alter table core_bateau_ame enable row level security;
-- lecture publique (contenu éditorial non sensible) ; écriture = service_role only
drop policy if exists core_bateau_ame_lecture on core_bateau_ame;
create policy core_bateau_ame_lecture on core_bateau_ame for select using (true);

-- Lecteur tolérant (reconnaît « Amel Maramu 46 », « maramu », « Amel 46 »…)
-- SECURITY INVOKER : la lecture passe par la policy publique de la table
-- (pas de SECURITY DEFINER exposé à anon — audit get_advisors clean, règle n°114).
create or replace function navlys_bateau_ame(p_marque_modele text)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  select to_jsonb(a) - 'id' - 'created_at' - 'source'
  from core_bateau_ame a
  where p_marque_modele <> ''
    and (
      lower(p_marque_modele) like '%'||lower(a.modele)||'%'
      or lower(p_marque_modele) like '%'||lower(a.marque)||'%'
    )
  order by
    (lower(p_marque_modele) like '%'||lower(a.modele)||'%') desc,  -- match modèle prioritaire
    length(a.modele) desc
  limit 1;
$$;
revoke all on function navlys_bateau_ame(text) from public;
grant execute on function navlys_bateau_ame(text) to anon, authenticated, service_role;

-- ── Semence : Amel Maramu (1978-1989) — histoire + 3 vidéos vérifiées ──
insert into core_bateau_ame (marque, modele, annees, accroche, ame, philosophie, regarder, videos, differenciateur, source)
select
  'Amel', 'Maramu', '1978-1989',
  'Ton bateau a une histoire, pas seulement une coque. Voici l''homme et l''esprit derrière lui — et une vraie visite, comme si tu montais à bord.',
  'Le Maramu n''est pas sorti d''un logiciel : il est né de la tête d''Henri Amel (de son vrai nom Henri Tonet, 1913), un homme qui a construit ses voiliers à La Rochelle à partir de 1964. Et voici ce qui change tout : Henri Amel était devenu aveugle pendant une grande partie de sa carrière. Il n''a jamais lâché son rêve — construire des bateaux robustes, sûrs, faciles à mener seul ou en couple. Il a même co-conçu le Maramu avec Jacques Carteau par radio, à longue distance, pendant qu''il traversait lui-même l''Atlantique vers Tahiti (1975-76). Ton millésime 1989 est l''un des tout derniers Maramu construits — la version la plus aboutie, juste avant que le Super Maramu ne prenne la relève.',
  array[
    'Conçu par un homme aveugle : tout se trouve « à la main », sans avoir à voir — balcon rigide tout autour, commandes regroupées dans le cockpit central.',
    'Fait pour la sécurité avant la vitesse : cockpit central bien abrité entre les deux mâts, on reste au sec et au centre du bateau par gros temps.',
    'Pensé pour deux personnes, pas pour un équipage : un couple doit pouvoir tout faire — d''où les enrouleurs de voiles et la « conduite par les chiffres ».',
    'Un système de voyage complet, pas juste un voilier : chaque détail (cloisons étanches, peu de passe-coques, transmission Amel) sert à partir loin et longtemps.'
  ],
  array[
    'Assieds-toi dans le cockpit central et imagine une nuit de mer : tu es abrité, tout est à portée de main. C''est ça, l''idée d''Henri Amel.',
    'Passe la main sur le balcon et les filières : sur un Amel, on se déplace en se tenant partout, comme un aveugle qui connaît sa maison.',
    'Descends à l''intérieur : sens le volume, les rangements, la lumière des hublots. Un Maramu, c''est une maison de voyage, pas un bateau de course.',
    'Écoute le silence de la coque épaisse : ces bateaux sont lourds et rassurants — le confort de mouvement avant la performance.'
  ],
  '[
    {"yt":"mNqTNyWqhOU","titre":"Visite intérieure complète d''un Amel Maramu 46","auteur":"Yacht Ibis","angle":"Intérieur · quasi ton modèle","note":"Un Maramu 46 de 1986, presque identique à ton 1989 : parcours le carré, les cabines, la table à cartes — tu vois exactement l''intérieur de ton bateau."},
    {"yt":"GUBK-MKCEVs","titre":"Le pont et la salle machine d''un Amel","auteur":"EZIYACHT","angle":"Extérieur · pont & systèmes","note":"Le pont, le cockpit central et surtout la fameuse salle machine Amel : regarde comme tout est accessible et pensé pour l''entretien à bord."},
    {"yt":"4m23OfoRqPU","titre":"La vraie vie à bord d''un Amel, en famille","auteur":"Mothership Adrift","angle":"La vie à bord (humain)","note":"Pas une fiche technique : une famille qui vit à bord. Pour sentir ce que ça fait, au quotidien, d''habiter ce bateau."}
  ]'::jsonb,
  'Un rapport-robot te récite des chiffres d''osmose que tout le monde recopie. Nous, on te raconte d''abord QUI a fait ce bateau et POURQUOI il est comme ça — puis on te fait monter à bord en vidéo. Tu n''achètes pas une coque : tu reprends le rêve d''un homme qui a construit pour la mer, à l''aveugle.',
  'NAVLYS 2026-07-11 — histoire vérifiée (amel.fr, Wikipédia Chantiers Amel) ; 3 vidéos vérifiées oEmbed (Yacht Ibis, EZIYACHT, Mothership Adrift).'
where not exists (
  select 1 from core_bateau_ame where marque='Amel' and modele='Maramu'
);
