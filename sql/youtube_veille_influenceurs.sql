-- ─────────────────────────────────────────────────────────────────────────
-- NAVLYS — Veille YouTube influenceurs (brique interne, zéro connecteur)
-- Bruno suit des créateurs : la brique « youtube » (Edge Function) lit leurs
-- vidéos (description + transcription) et bancarise tous les liens partagés.
-- Idempotent : ré-exécutable sans danger.
-- ─────────────────────────────────────────────────────────────────────────

-- Chaînes suivies (un envoi de lien vidéo par Bruno = chaîne suivie).
create table if not exists public.core_youtube_chaines (
  channel_id text primary key,
  nom        text,
  handle     text,
  actif      boolean not null default true,
  ajoute_le  timestamptz not null default now()
);

-- Vidéos déjà lues (anti-doublon du scan RSS).
create table if not exists public.core_youtube_videos (
  video_id   text primary key,
  channel_id text references public.core_youtube_chaines(channel_id) on delete cascade,
  titre      text,
  publie_le  timestamptz,
  traite_le  timestamptz not null default now()
);

-- Les liens récoltés (le livrable).
create table if not exists public.core_youtube_liens (
  id         bigint generated always as identity primary key,
  video_id   text not null,
  channel_id text,
  url        text not null,
  source     text not null default 'description',  -- description | transcription
  contexte   text,
  trouve_le  timestamptz not null default now(),
  unique (video_id, url)
);

-- Accès service_role uniquement (RLS sans policy ; service_role passe outre).
alter table public.core_youtube_chaines enable row level security;
alter table public.core_youtube_videos  enable row level security;
alter table public.core_youtube_liens   enable row level security;

-- Scan automatique toutes les 6 h (flux RSS publics, gratuit).
do $do$
begin
  if exists (select 1 from cron.job where jobname = 'navlys_youtube_veille') then
    perform cron.unschedule('navlys_youtube_veille');
  end if;
end
$do$;
select cron.schedule('navlys_youtube_veille', '15 */6 * * *',
  $cmd$ select net.http_get(url:='https://hhrlgyvtqluxpywjiwkd.supabase.co/functions/v1/youtube?mode=scan'); $cmd$);

insert into public.journal (type, message)
values ('youtube', 'Brique veille YouTube installée : chaînes suivies, scan RSS 4×/jour, liens bancarisés dans core_youtube_liens.');
