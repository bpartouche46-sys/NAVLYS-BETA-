-- ============================================================================
-- NAVLYS CORE — Cerveau rangé, recherche instantanée
-- Migration : navlys_cerveau_recherche_instantanee_v2
-- Gravé le 2026-07-09 (ordre de Bruno : « apprends à ranger tout ton cerveau
--   CORE et à chercher où il faut suivant des repères mots-clés pour trouver à
--   l'instant les informations sur ton CORE local »).
--
-- BUT : un seul point d'entrée `navlys_chercher(terme, limite)` qui cherche EN
--   MÊME TEMPS dans les 5 mémoires du CORE — règles, leçons de bible, mémoire
--   par agent, mémoire centrale, livrables — en plein texte français (tsvector
--   + index GIN), classé par pertinence.
--
-- Ce fichier REFLÈTE l'état réel appliqué en base (projet navlys-core,
--   hhrlgyvtqluxpywjiwkd). Il est idempotent : rejouable sans casse.
--   Réf. carte du repo : CLAUDE.md § « Cerveau CORE rangé — recherche instantanée ».
-- ============================================================================

-- ── 1) Colonne tsvector `recherche` sur les 5 mémoires ──────────────────────
alter table public.core_reglement    add column if not exists recherche tsvector;
alter table public.core_bible_bugs   add column if not exists recherche tsvector;
alter table public.agent_memoire     add column if not exists recherche tsvector;
alter table public.navlys_memoire    add column if not exists recherche tsvector;
alter table public.core_knowledge    add column if not exists recherche tsvector;

-- ── 2) Fonction trigger : recalcule `recherche` à chaque insert/update ──────
--    Une seule fonction, aiguillée par TG_TABLE_NAME → chaque table nourrit son
--    tsvector avec ses propres colonnes utiles. Aucune maintenance ensuite.
create or replace function public.navlys_recherche_maj()
returns trigger
language plpgsql
set search_path to 'public'
as $function$
begin
  if TG_TABLE_NAME = 'core_reglement' then
    new.recherche := to_tsvector('french', coalesce(new.situation,'') || ' ' || coalesce(new.decision,''));
  elsif TG_TABLE_NAME = 'core_bible_bugs' then
    new.recherche := to_tsvector('french', coalesce(new.bug,'') || ' ' || coalesce(new.cause,'') || ' ' || coalesce(new.regle,'') || ' ' || coalesce(new.departement,''));
  elsif TG_TABLE_NAME = 'agent_memoire' then
    new.recherche := to_tsvector('french', coalesce(new.sujet,'') || ' ' || coalesce(new.contenu,'') || ' ' || coalesce(new.agent_code,''));
  elsif TG_TABLE_NAME = 'navlys_memoire' then
    new.recherche := to_tsvector('french', coalesce(new.titre,'') || ' ' || coalesce(new.contenu,'') || ' ' || coalesce(array_to_string(new.tags,' '),''));
  elsif TG_TABLE_NAME = 'core_knowledge' then
    new.recherche := to_tsvector('french', coalesce(new.titre,'') || ' ' || coalesce(new.contenu,'') || ' ' || coalesce(new.section,''));
  end if;
  return new;
end;
$function$;

-- ── 3) Triggers BEFORE INSERT OR UPDATE sur chaque table ────────────────────
drop trigger if exists trg_recherche_core_reglement  on public.core_reglement;
create trigger trg_recherche_core_reglement  before insert or update on public.core_reglement
  for each row execute function public.navlys_recherche_maj();

drop trigger if exists trg_recherche_core_bible_bugs on public.core_bible_bugs;
create trigger trg_recherche_core_bible_bugs before insert or update on public.core_bible_bugs
  for each row execute function public.navlys_recherche_maj();

drop trigger if exists trg_recherche_agent_memoire   on public.agent_memoire;
create trigger trg_recherche_agent_memoire   before insert or update on public.agent_memoire
  for each row execute function public.navlys_recherche_maj();

drop trigger if exists trg_recherche_navlys_memoire  on public.navlys_memoire;
create trigger trg_recherche_navlys_memoire  before insert or update on public.navlys_memoire
  for each row execute function public.navlys_recherche_maj();

drop trigger if exists trg_recherche_core_knowledge  on public.core_knowledge;
create trigger trg_recherche_core_knowledge  before insert or update on public.core_knowledge
  for each row execute function public.navlys_recherche_maj();

-- ── 4) Backfill des lignes existantes (recalcule `recherche` partout) ───────
update public.core_reglement  set recherche = to_tsvector('french', coalesce(situation,'') || ' ' || coalesce(decision,''));
update public.core_bible_bugs set recherche = to_tsvector('french', coalesce(bug,'') || ' ' || coalesce(cause,'') || ' ' || coalesce(regle,'') || ' ' || coalesce(departement,''));
update public.agent_memoire   set recherche = to_tsvector('french', coalesce(sujet,'') || ' ' || coalesce(contenu,'') || ' ' || coalesce(agent_code,''));
update public.navlys_memoire  set recherche = to_tsvector('french', coalesce(titre,'') || ' ' || coalesce(contenu,'') || ' ' || coalesce(array_to_string(tags,' '),''));
update public.core_knowledge  set recherche = to_tsvector('french', coalesce(titre,'') || ' ' || coalesce(contenu,'') || ' ' || coalesce(section,''));

-- ── 5) Index GIN (recherche plein texte instantanée) ────────────────────────
create index if not exists idx_core_reglement_recherche  on public.core_reglement  using gin (recherche);
create index if not exists idx_core_bible_bugs_recherche on public.core_bible_bugs using gin (recherche);
create index if not exists idx_agent_memoire_recherche   on public.agent_memoire   using gin (recherche);
create index if not exists idx_navlys_memoire_recherche  on public.navlys_memoire  using gin (recherche);
create index if not exists idx_core_knowledge_recherche  on public.core_knowledge  using gin (recherche);

-- ── 6) Point d'entrée unique : navlys_chercher(terme, limite) ───────────────
--    Cherche en même temps dans les 5 mémoires, classe par pertinence (ts_rank).
--    SECURITY INVOKER (défaut) : les RLS des tables s'appliquent à l'appelant.
--    Exposée en REST via /rest/v1/rpc/navlys_chercher.
create or replace function public.navlys_chercher(p_terme text, p_limite integer default 15)
returns table(source text, id text, titre text, extrait text, pertinence real, cree_le timestamptz)
language sql
stable
set search_path to 'public'
as $function$
  with q as (select plainto_tsquery('french', p_terme) as tsq),
  tout as (
    select 'regle'::text as source, r.id::text as id, left(r.situation,140) as titre, left(r.decision,300) as extrait,
           ts_rank(r.recherche, q.tsq) as pertinence, r.created_at as cree_le
      from core_reglement r, q where r.recherche @@ q.tsq
    union all
    select 'bible_bug', b.id::text, left(b.bug,140), left(b.regle,300),
           ts_rank(b.recherche, q.tsq), b.cree_le
      from core_bible_bugs b, q where b.recherche @@ q.tsq
    union all
    select 'agent_memoire', m.id::text, left(m.sujet,140), left(m.contenu,300),
           ts_rank(m.recherche, q.tsq), m.ts
      from agent_memoire m, q where m.recherche @@ q.tsq
    union all
    select 'navlys_memoire', nm.id::text, left(nm.titre,140), left(nm.contenu,300),
           ts_rank(nm.recherche, q.tsq), nm.created_at
      from navlys_memoire nm, q where nm.recherche @@ q.tsq
    union all
    select 'connaissance', k.id::text, left(k.titre,140), left(k.contenu,300),
           ts_rank(k.recherche, q.tsq), k.updated_at
      from core_knowledge k, q where k.recherche @@ q.tsq
  )
  select * from tout order by pertinence desc limit p_limite;
$function$;

-- ── Vérification en direct (exemple) ────────────────────────────────────────
-- select * from navlys_chercher('positionnement finance');
--   → retrouve en un appel la règle n°76, les leçons de bible liées et la
--     mémoire NAVMKT concernée, classées par pertinence.
