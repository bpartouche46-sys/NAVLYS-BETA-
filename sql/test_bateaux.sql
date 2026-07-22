-- NAVLYS — Application Test Bateaux (gravé 2026-07-08) — copie repo de la
-- migration « navlys_test_bateaux » appliquée en base.
-- Les gens envoient dossier + photos → rapport d'expertise NAVLYS (éducatif,
-- jamais « expert », ne remplace jamais un expert maritime) publié sur une
-- page dédiée : lien TEMPORAIRE (30 j) par défaut, PERMANENT pour les membres.
--
-- Circuit : /bateau-test (page) → edge « bateau » POST (photos → bucket
-- « bateaux », dossier → core_bateau_dossiers, mission → NAVTECH) → Bruno
-- valide → select navlys_bateau_publier(id, rapport, [acces]) → la page
-- /bateau-rapport?d=<jeton> sert le rapport (edge « bateau » GET ?d=).

create table if not exists core_bateau_dossiers (
  id bigserial primary key,
  jeton text not null unique,
  prenom text not null default '',
  email text not null,
  telephone text not null default '',
  bateau text not null default '',
  annee text not null default '',
  lieu text not null default '',
  description text not null,
  photos jsonb not null default '[]'::jsonb,
  statut text not null default 'recu' check (statut in ('recu','en_analyse','publie')),
  acces text not null default 'temporaire' check (acces in ('temporaire','permanent')),
  expire_le timestamptz,
  rapport text,
  mission_id bigint,
  created_at timestamptz not null default now()
);
create index if not exists core_bateau_dossiers_jeton_idx on core_bateau_dossiers (jeton);
alter table core_bateau_dossiers enable row level security; -- accès service_role uniquement (edge)

-- Bucket public pour les photos des bateaux
insert into storage.buckets (id, name, public)
values ('bateaux','bateaux', true)
on conflict (id) do nothing;

-- Publication du rapport (appelée par Bruno/CORE après validation)
create or replace function navlys_bateau_publier(p_id bigint, p_rapport text, p_acces text default null)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_jeton text;
  v_acces text;
begin
  select jeton, acces into v_jeton, v_acces from core_bateau_dossiers where id = p_id;
  if v_jeton is null then
    return 'introuvable';
  end if;
  if p_acces in ('temporaire','permanent') then
    v_acces := p_acces;
  end if;
  update core_bateau_dossiers
     set rapport = p_rapport,
         statut = 'publie',
         acces = v_acces,
         expire_le = case when v_acces = 'permanent' then null else now() + interval '30 days' end
   where id = p_id;
  insert into journal (type, message)
  values ('bateau_rapport', 'Rapport Test Bateaux publié — dossier #' || p_id || ' (' || v_acces || ') : https://navlys.com/bateau-rapport?d=' || v_jeton);
  return 'https://navlys.com/bateau-rapport?d=' || v_jeton;
end;
$$;

-- ============================================================
-- V2 PRO (2026-07-09) — copies repo des migrations appliquées :
--   navlys_bateau_expertise_pro, navlys_bateau_savoir_seed,
--   navlys_bateau_expertiser_v2_matching, navlys_bateau_expertiser_v3_numerique
-- En base (source de vérité) :
--   core_bateau_savoir  : défauts connus + contrôles par modèle (~40 seed,
--                         enrichie CHAQUE JOUR par le cron navlys_bateau_savoir_veille 06:50 → NAVLAB)
--   core_bateau_zones   : 16 zones (humidité, temp. eau, salinité, facteur osmose,
--                         catastrophes naturelles datées)
--   navlys_bateau_expertiser(annee, vie_eau, zone, eau, marque_modele) → jsonb
--                       : score osmose /100 + niveau + facteurs, défauts du modèle
--                         (reconnaissance tolérante variantes « A / B »), événements
--                         de zone survenus du vivant du bateau
--   core_bateau_dossiers.expertise : analyse stockée au dépôt, servie par GET
-- Règle n°134 : toute connaissance bateau va dans core_bateau_savoir, jamais en dur.
-- ============================================================
