-- ============================================================================
-- FIX navlys_sante() — faux positif « santé rouge » (appliqué en base le 2026-07-05)
-- ============================================================================
-- Cause racine : la fonction comptait `status <> 'succeeded'` dans
-- cron.job_run_details. Or le contrôle santé tourne pile à :00/:30, au moment
-- exact où les autres crons démarrent : leurs lignes sont alors en
-- 'running'/'starting' et étaient comptées comme des ÉCHECS.
-- Preuve : 1863 runs sur 24 h, 100 % 'succeeded', zéro vrai échec — pourtant
-- « santé rouge — 2 cron(s) en échec 24h » au journal.
--
-- Règle gravée (core_reglement n°23) : un check de santé ne compte que les
-- états TERMINAUX en erreur (failed), jamais les états transitoires
-- (running/starting/pending).
-- ============================================================================

CREATE OR REPLACE FUNCTION public.navlys_sante()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'cron'
AS $function$
declare
  crons_ko int; miss_stuck int; jrn_age interval; runs_err int;
  niveau text; alertes text[] := '{}'; res jsonb;
begin
  select count(*) into crons_ko from cron.job_run_details
    where start_time > now()-interval '24 hours' and status = 'failed';
  select count(*) into miss_stuck from missions
    where statut in ('a_faire','en_cours')
      and coalesce(started_at, created_at) < now()-interval '2 hours';
  select now()-max(ts) into jrn_age from journal;
  select count(*) into runs_err from agent_runs
    where started_at > now()-interval '24 hours' and erreur is not null;

  if crons_ko > 0 then alertes := alertes || format('%s cron(s) en échec 24h', crons_ko); end if;
  if miss_stuck > 0 then alertes := alertes || format('%s mission(s) bloquée(s) >2h', miss_stuck); end if;
  if runs_err > 0 then alertes := alertes || format('%s agent_run(s) en erreur 24h', runs_err); end if;
  if jrn_age > interval '3 hours' then alertes := alertes || 'journal muet >3h'; end if;

  niveau := case when array_length(alertes,1) is null then 'vert' else 'rouge' end;
  res := jsonb_build_object(
    'niveau', niveau,
    'crons_echecs_24h', crons_ko,
    'missions_bloquees', miss_stuck,
    'agent_runs_erreurs_24h', runs_err,
    'journal_age_min', round(extract(epoch from coalesce(jrn_age, interval '0'))/60)::int,
    'alertes', to_jsonb(alertes),
    'ts', now()
  );
  insert into journal(ts, type, message)
    values (now(), 'sante', 'santé '||niveau||' — '||res::text);
  return res;
end $function$;
