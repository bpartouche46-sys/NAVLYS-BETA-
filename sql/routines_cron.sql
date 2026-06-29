-- ─────────────────────────────────────────────────────────────────────────
-- NAVLYS CORE — Routines automatiques (pg_cron)
-- Crée seules les missions récurrentes, sans intervention de Bruno.
-- Idempotent : ré-exécutable sans danger. Garde anti-doublon intégrée.
-- ─────────────────────────────────────────────────────────────────────────

create extension if not exists pg_cron;

-- Enfile une mission de routine UNIQUEMENT s'il n'en existe pas déjà une
-- non terminée (a_faire / en_cours / a_valider) portant le même titre.
create or replace function public.enqueue_routine(
  p_dept text, p_titre text, p_consigne text, p_priorite int default 3)
returns void language plpgsql as $$
begin
  if not exists (
    select 1 from public.missions
    where titre = p_titre
      and statut in ('a_faire', 'en_cours', 'a_valider')
  ) then
    insert into public.missions (departement, titre, consigne, priorite, statut)
    values (p_dept, p_titre, p_consigne, p_priorite, 'a_faire');
  end if;
end;
$$;

-- Nettoie d'anciens jobs du même nom avant de (re)planifier.
do $$
declare j text;
begin
  for j in select jobname from cron.job where jobname like 'navlys_%'
  loop perform cron.unschedule(j); end loop;
end $$;

-- ── ROUTINES QUOTIDIENNES (heure UTC) ──
select cron.schedule('navlys_veille_bourse', '0 6 * * *', $$
  select public.enqueue_routine('NAVFI', 'Veille Bourse du jour',
    'Synthèse éducative des marchés du jour, statut simple citoyen, disclaimers d''office.', 3); $$);

select cron.schedule('navlys_veille_tech', '0 6 * * *', $$
  select public.enqueue_routine('NAVCOM', 'Veille Tech & IA du jour',
    'Repère 3 actus tech/IA marquantes et propose un angle de contenu NAVLYS.', 3); $$);

select cron.schedule('navlys_daily_brief', '0 7 * * *', $$
  select public.enqueue_routine('NAVMKT', 'Daily Brief',
    'Synthèse interne : état des missions, points d''attention, reste à faire.', 2); $$);

select cron.schedule('navlys_memoire', '0 1 * * *', $$
  select public.enqueue_routine('NAVME', 'Organiser la mémoire vive',
    'Range les souvenirs récents et grave les apprentissages dans navlys_memoire.', 4); $$);

-- ── ROUTINES HEBDOMADAIRES (lundi UTC) ──
select cron.schedule('navlys_secu_hebdo', '0 5 * * 1', $$
  select public.enqueue_routine('NAVPTE', 'Revue de sécurité hebdo',
    'Contrôle secrets exposés, RGPD, hygiène cloud. Alerte Bruno si risque.', 1); $$);

select cron.schedule('navlys_audit_core', '30 5 * * 1', $$
  select public.enqueue_routine('NAVMKT', 'Audit de cohérence du CORE',
    'Repère incohérences, uniformise et simplifie les textes du CORE.', 2); $$);

select cron.schedule('navlys_innovation', '0 6 * * 1', $$
  select public.enqueue_routine('NAVLAB', 'Veille innovation 7 jours',
    'Pipeline innovation : pistes, prototypes, opportunités des 7 derniers jours.', 3); $$);

-- Vérif : select jobname, schedule from cron.job where jobname like 'navlys_%';
