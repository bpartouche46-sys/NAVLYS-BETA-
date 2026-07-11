-- NAVLYS — Panel de contradiction multi-IA (doctrine Bruno 2026-07-11)
-- « Jamais toutes les billes dans le même panier » : plusieurs IA de familles
-- différentes jugent le site chaque jour, et leurs conclusions BRUTES sont
-- rebasculées telles quelles à Bruno (cette table) ET au CORE (pipeline ingerer).
--
-- Table PRIVÉE : les critiques brutes ne doivent jamais fuiter vers un visiteur
-- anonyme. RLS activée SANS policy pour anon/authenticated → seul service_role
-- (l'Edge Function bible) lit/écrit. Idempotente : rejouable sans casse.
-- Migration versionnée dans le repo, appliquée en base par le workflow LIVE.

create table if not exists public.core_avis_ia (
  id            bigserial primary key,
  cree_le       timestamptz not null default now(),
  jour          date        not null default ((now() at time zone 'utc'))::date,
  fournisseur   text        not null,              -- anthropic | openrouter | nvidia
  modele        text        not null,              -- ex : meta-llama/llama-3.3-70b-instruct:free
  famille       text        not null,              -- anthropic | meta-llama | mistral | qwen | deepseek | google
  note          numeric(3,1),                      -- NOTE_GLOBALE /10 extraite, décimale ok (null si absente)
  avis          text        not null,              -- conclusion BRUTE, intégrale (jamais résumée)
  vu_par_bruno  boolean     not null default false
);

comment on table public.core_avis_ia is
  'Avis bruts quotidiens du panel de contradiction multi-IA sur navlys.com. Privé (service_role only). Rebascule vers Bruno via ?mode=avis_bruno.';

-- Accès rapides : les non-lus de Bruno, et l''historique par jour/famille.
create index if not exists idx_core_avis_ia_non_vus on public.core_avis_ia (vu_par_bruno, cree_le desc);
create index if not exists idx_core_avis_ia_jour     on public.core_avis_ia (jour desc, famille);

-- Verrouillage : RLS active, aucune policy publique → anon/authenticated = zéro accès.
alter table public.core_avis_ia enable row level security;
revoke all on public.core_avis_ia from anon, authenticated;
