-- ─────────────────────────────────────────────────────────────────────────
-- NAVLYS — AUTO-TEST + AUTO-AMÉLIORATION RÉCURSIVE
-- Le corps vivant se teste seul chaque jour et s'améliore « un peu plus ».
--
--   navlys_autotest()          -> score /100 sur 5 dimensions + point faible
--   navlys_auto_amelioration() -> enfile une mission ciblée + banque les acquis
--   navlys_cycle_recursif()    -> test puis amélioration (planifié pg_cron)
--
-- Idempotent. Appliqué en base le 2026-06-30 (migrations
-- auto_amelioration_recursive + auto_amelioration_recalibrage).
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.navlys_autotest (
  id          bigserial primary key,
  ts          timestamptz not null default now(),
  niveau      integer not null default 1,
  score       numeric(5,2) not null default 0,
  dimensions  jsonb not null default '{}'::jsonb,
  point_faible text,
  action      text
);

-- ── 1) AUTO-TEST QUOTIDIEN ──
create or replace function public.navlys_autotest() returns jsonb
language plpgsql security definer as $$
declare
  c_act int; c_app int; runs int; errs int; c_mem int; c_con int;
  s_act int; s_app int; s_fia int; s_mem int; s_con int;
  glob numeric; faible text; niv int; dims jsonb;
begin
  -- ACTIVITÉ : missions traitées sur 24 h (cible 10 = 100)
  select count(*) into c_act from public.missions
    where coalesce(updated_at, created_at) > now() - interval '24 hours'
      and statut in ('fait','a_valider');
  s_act := least(100, c_act * 10);

  -- APPRENTISSAGE : savoirs gravés sur 24 h (cible ~8 = 100)
  select count(*) into c_app from public.core_knowledge
    where updated_at > now() - interval '24 hours';
  s_app := least(100, c_app * 12);

  -- FIABILITÉ : taux de réussite des agents sur 24 h
  select count(*) into runs from public.agent_runs where started_at > now() - interval '24 hours';
  select count(*) into errs from public.agent_runs
    where started_at > now() - interval '24 hours' and (erreur is not null or statut = 'erreur');
  s_fia := case when runs = 0 then 70 else greatest(0, round(100 * (1 - errs::numeric / runs))) end;

  -- MÉMOIRE : souvenirs gravés sur 7 j (dynamique, cible ~8 = 100)
  select count(*) into c_mem from public.navlys_memoire
    where coalesce(updated_at, created_at) > now() - interval '7 days';
  s_mem := least(100, c_mem * 12);

  -- CONTENU : livrables terminés sur 7 j (cible ~13 = 100)
  select count(*) into c_con from public.missions
    where statut = 'fait' and coalesce(finished_at, updated_at, created_at) > now() - interval '7 days';
  s_con := least(100, c_con * 8);

  glob := round((s_act + s_app + s_fia + s_mem + s_con) / 5.0, 2);

  select d into faible from (values
      ('activite', s_act), ('apprentissage', s_app), ('fiabilite', s_fia),
      ('memoire', s_mem), ('contenu', s_con)
    ) as t(d, v) order by v asc, d asc limit 1;

  select coalesce(max(niveau), 0) + 1 into niv from public.navlys_autotest;

  dims := jsonb_build_object('activite', s_act, 'apprentissage', s_app,
                             'fiabilite', s_fia, 'memoire', s_mem, 'contenu', s_con);

  insert into public.navlys_autotest(niveau, score, dimensions, point_faible)
  values (niv, glob, dims, faible);

  insert into public.journal(type, message)
  values ('autotest', 'Auto-test #' || niv || ' — score ' || glob || '/100, point faible : ' || faible || '.');

  insert into public.core_config(key, value, updated_at) values
    ('recursive_growth_level', niv::text, now()),
    ('last_autotest_score', glob::text, now()),
    ('last_autotest_weak', faible, now())
  on conflict (key) do update set value = excluded.value, updated_at = now();

  return jsonb_build_object('niveau', niv, 'score', glob, 'point_faible', faible, 'dimensions', dims);
end $$;

-- ── 2) AUTO-AMÉLIORATION CIBLÉE ──
create or replace function public.navlys_auto_amelioration() returns jsonb
language plpgsql security definer as $$
declare faible text; niv text; dept text; titre text; consigne text; appr int;
begin
  select point_faible into faible from public.navlys_autotest order by id desc limit 1;
  select value into niv from public.core_config where key = 'recursive_growth_level';
  if faible is null then faible := 'apprentissage'; end if;

  -- Banque les nouveaux acquis (corps vivant qui grandit)
  begin appr := public.consolider_apprentissage(); exception when others then appr := 0; end;

  dept := case faible
    when 'activite'      then 'NAVDEM'
    when 'apprentissage' then 'NAVLAB'
    when 'fiabilite'     then 'NAVTECH'
    when 'memoire'       then 'NAVME'
    when 'contenu'       then 'NAVMKT'
    else 'NAVLAB' end;

  titre := 'Auto-amélioration · ' || faible || ' (niveau ' || coalesce(niv, '1') || ')';
  consigne := 'Améliore le point faible « ' || faible || ' » UN PEU PLUS QU''HIER : une action concrète, '
           || 'mesurable et reproductible, gravée dans core_knowledge ou navlys_memoire. '
           || 'Statut simple citoyen, charte respectée. Objectif corps vivant : chaque jour un cran de mieux.';

  perform public.enqueue_routine(dept, titre, consigne, 1);

  insert into public.journal(type, message)
  values ('auto_amelioration', 'Cap d''amélioration posé sur « ' || faible || ' » → ' || dept
          || ' (niveau ' || coalesce(niv, '1') || '). +' || appr || ' acquis bancarisés.');

  return jsonb_build_object('point_faible', faible, 'departement', dept, 'apprentissages', appr);
end $$;

-- ── 3) CYCLE RÉCURSIF : test -> amélioration ──
create or replace function public.navlys_cycle_recursif() returns jsonb
language plpgsql security definer as $$
declare t jsonb; a jsonb;
begin
  t := public.navlys_autotest();
  a := public.navlys_auto_amelioration();
  return jsonb_build_object('test', t, 'amelioration', a);
end $$;

-- ── PLANIFICATION QUOTIDIENNE (UTC) ──
do $$ begin perform cron.unschedule('navlys_cycle_recursif'); exception when others then null; end $$;
select cron.schedule('navlys_cycle_recursif', '10 9 * * *', $$select public.navlys_cycle_recursif();$$);

-- ── DRAPEAUX DE DOCTRINE ──
insert into public.core_config(key, value, updated_at) values
  ('auto_test', 'true', now()),
  ('auto_amelioration', 'true', now()),
  ('recursive_growth', 'true', now())
on conflict (key) do update set value = excluded.value, updated_at = now();

-- ── DOCTRINE GRAVÉE EN MÉMOIRE VIVE ──
insert into public.navlys_memoire(type, titre, contenu, tags, source, importance)
select 'doctrine',
  'Auto-test + auto-amélioration récursive (chaque jour un peu plus)',
  'NAVLYS se teste seul chaque jour (navlys_autotest) sur 5 dimensions — activité, apprentissage, fiabilité, mémoire, contenu — calcule un score /100, repère son point faible, puis enfile une mission d''amélioration ciblée (navlys_auto_amelioration) « un cran de mieux qu''hier ». Cron quotidien navlys_cycle_recursif. Corps vivant 100% autonome et récursif.',
  array['doctrine','autonomie','apprentissage','recursif'], 'CLAUDE_CODE', 5
where not exists (
  select 1 from public.navlys_memoire
  where titre = 'Auto-test + auto-amélioration récursive (chaque jour un peu plus)'
);

-- Vérif : select niveau, score, point_faible, dimensions from navlys_autotest order by id desc;
