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

-- Rebascule ACTIVE vers Bruno : après l'avis quotidien du panel (cron
-- navlys_bible_avis à 7h15 UTC), pousser les avis bruts non lus sur sa WhatsApp
-- via la brique whatsapp ?mode=push_avis (qui les marque « vus » au passage).
-- Nécessite les secrets D360_API_KEY + BRUNO_WHATSAPP ; sinon renvoie envoye:false
-- proprement, sans marquer vus (retentés au prochain passage).
do $do$
begin
  if exists (select 1 from cron.job where jobname = 'navlys_avis_push_bruno') then
    perform cron.unschedule('navlys_avis_push_bruno');
  end if;
end
$do$;
select cron.schedule('navlys_avis_push_bruno', '30 8 * * *',
  $cmd$ select net.http_get(url:='https://hhrlgyvtqluxpywjiwkd.supabase.co/functions/v1/whatsapp?mode=push_avis'); $cmd$);

insert into public.journal (type, message)
values ('bible', 'Panel de contradiction multi-IA installé : familles distinctes, avis bruts dans core_avis_ia, rebascule active WhatsApp (cron navlys_avis_push_bruno 08:30 UTC).');
