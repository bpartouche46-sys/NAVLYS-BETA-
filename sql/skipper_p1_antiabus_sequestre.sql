-- NAVLYS — SKIPPER P1 : anti-abus (rate-limit IP) + rail séquestre Stripe (INERTE)
-- ⚠️ Migration NON appliquée automatiquement dans la session Claude Code (branche + PR).
--    Bruno l'applique quand il valide (apply_migration), puis redéploie l'edge `skipper`
--    (verify_jwt=false, règle n°98) et relance get_advisors(security)+(performance).
--
-- Garde-fous respectés :
--  - Aucune fonction SECURITY DEFINER ici (piège règle n°114 évité, comme le reste de skipper).
--  - Tables verrouillées RLS SANS policy -> deny-total anon/authenticated ; accès uniquement
--    via l'edge `skipper` en service_role (même design que skipper_annonces/messages/...).
--  - AUCUN vrai débit : le rail Stripe reste inerte tant que Bruno n'a pas posé la clé ET
--    qu'un admin (token=cockpit_pass) n'a pas explicitement lancé la mise en séquestre.
--    `reserver` ne touche JAMAIS Stripe (reste statut a_valider, Bible §6).

-- ============================================================
-- 1) Anti-abus : compteur de requêtes par IP + action (fenêtre glissante)
-- ============================================================
create table if not exists skipper_ratelimit (
  id bigserial primary key,
  ip text not null default '',
  action text not null default '',
  created_at timestamptz not null default now()
);
alter table skipper_ratelimit enable row level security;  -- deny-total (aucune policy) : service_role only
create index if not exists skipper_ratelimit_lookup_idx on skipper_ratelimit (ip, action, created_at desc);

comment on table skipper_ratelimit is 'SKIPPER — anti-abus : 1 ligne par requête sensible (message/avis/reserver/deposer) horodatée par IP. Lue/écrite uniquement par l''edge skipper (service_role). Purge : voir cron navlys_skipper_ratelimit_purge.';

-- Purge automatique des lignes > 24 h (évite que la table gonfle). Cron pg_cron.
-- (idempotent : remplace le job s'il existe déjà)
do $$
begin
  if exists (select 1 from pg_extension where extname='pg_cron') then
    perform cron.unschedule('navlys_skipper_ratelimit_purge')
      where exists (select 1 from cron.job where jobname='navlys_skipper_ratelimit_purge');
    perform cron.schedule('navlys_skipper_ratelimit_purge','17 4 * * *',
      $q$ delete from skipper_ratelimit where created_at < now() - interval '24 hours'; $q$);
  end if;
end $$;

-- ============================================================
-- 2) Rail séquestre Stripe (INERTE) : traçabilité du PaymentIntent
-- ============================================================
-- Colonnes ajoutées à skipper_transactions pour, LE JOUR OÙ Bruno active Stripe,
-- rattacher un PaymentIntent (capture_method=manual = autorisation/blocage, PAS capture).
-- La capture réelle (= vrai débit) reste une action validée par Bruno/NAVFI, jamais auto.
alter table skipper_transactions add column if not exists stripe_payment_intent text;
alter table skipper_transactions add column if not exists stripe_status text;   -- ex: requires_capture, canceled, succeeded
alter table skipper_transactions add column if not exists sequestre_par text;    -- qui a lancé la mise en séquestre (admin)
comment on column skipper_transactions.stripe_payment_intent is 'ID PaymentIntent Stripe (capture_method=manual). Rempli uniquement quand un admin lance sequestre_init ET que STRIPE_SECRET_KEY est posée. Inerte sinon.';
