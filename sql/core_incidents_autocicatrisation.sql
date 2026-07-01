-- ─────────────────────────────────────────────────────────────────────────
-- NAVLYS — MOTEUR D'INCIDENTS AUTO-CICATRISANT
-- Tout bug / erreur / plainte / débit carte / alerte mail provider ->
--   navlys_incident()            : classe + route vers le bon agent ; si règle
--                                  connue -> AUTO-RÉSOLU.
--   navlys_incident_apprendre()  : grave la correction en règle permanente
--                                  (« plus jamais à y réfléchir »).
--   navlys_incidents_relance()   : ré-escalade auto (cron */30 min).
-- Appliqué en base le 2026-07-01 (migration core_incidents_autocicatrisation).
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.core_incident_rules (
  id bigserial primary key, motif text not null, source text, categorie text,
  agent text, action text, auto boolean default true, hits int default 0,
  created_at timestamptz default now()
);
create table if not exists public.core_incidents (
  id bigserial primary key, ts timestamptz default now(), source text,
  categorie text, severite int default 3, sujet text, contenu text,
  statut text default 'nouveau', agent text, rule_id bigint,
  resolution text, resolved_at timestamptz
);

create or replace function public.navlys_incident(
  p_source text, p_sujet text, p_contenu text default null,
  p_categorie text default null, p_severite int default null)
returns jsonb language plpgsql security definer as $$
declare txt text; cat text; sev int; ag text; rid bigint; ract text; iid bigint;
begin
  txt := lower(coalesce(p_sujet,'') || ' ' || coalesce(p_contenu,''));
  cat := coalesce(p_categorie, case
    when txt ~ '(débit|debit|carte|chargeback|paiement|payment|invoice|facture|refund|remboursement|stripe|paypal)' then 'paiement'
    when txt ~ '(sécurit|securit|faille|breach|leak|exposed|unauthorized|phishing|clé exposée)' then 'securite'
    when txt ~ '(plainte|complaint|litige|réclamation|reclamation|insatisfait|remboursez)' then 'plainte'
    when txt ~ '(rgpd|gdpr|juridique|legal|mise en demeure|dmca|cnil)' then 'juridique'
    else 'technique' end);
  sev := coalesce(p_severite, case
    when txt ~ '(urgent|critical|critique|down|panne|failed|échec|echec|breach|chargeback|fraud)' then 1
    when cat in ('paiement','securite','juridique') then 2 else 3 end);
  ag := case cat when 'paiement' then 'NAVFI' when 'securite' then 'NAVPTE'
    when 'plainte' then 'NAVDEM' when 'juridique' then 'NAVLEX' else 'NAVTECH' end;

  insert into public.core_incidents(source,categorie,severite,sujet,contenu,agent,statut)
  values (p_source, cat, sev, left(coalesce(p_sujet,''),300), left(coalesce(p_contenu,''),4000), ag, 'nouveau')
  returning id into iid;

  select id, action into rid, ract from public.core_incident_rules r
   where r.auto and (r.source is null or lower(r.source)=lower(p_source))
     and position(lower(r.motif) in txt) > 0
   order by length(r.motif) desc limit 1;

  if rid is not null then
    update public.core_incident_rules set hits = hits + 1 where id = rid;
    perform public.enqueue_routine(ag, 'Incident auto — ' || cat || ' #' || iid,
      'Règle connue à appliquer : ' || ract || ' (source ' || p_source || '). Correction déjà cataloguée, exécute-la.', 1);
    update public.core_incidents set statut='auto_resolu', rule_id=rid,
      resolution='Règle connue appliquée : ' || ract, resolved_at=now() where id=iid;
    insert into public.journal(type,message)
    values ('incident','Incident ' || cat || ' #' || iid || ' (' || p_source || ') AUTO-RÉSOLU par règle connue.');
    return jsonb_build_object('id',iid,'statut','auto_resolu','regle',rid,'agent',ag);
  end if;

  perform public.enqueue_routine(ag, 'Incident ' || cat || ' #' || iid || ' — ' || left(coalesce(p_sujet,'sans objet'),60),
    'RÉSOUS cet incident (' || p_source || ') : ' || left(coalesce(p_contenu,p_sujet,''),1500) ||
    '. Puis grave une règle permanente (navlys_incident_apprendre) pour qu''il soit AUTO-résolu à l''avenir. Statut simple citoyen.', 1);
  update public.core_incidents set statut='en_cours' where id=iid;
  insert into public.journal(type,message)
  values (case when sev<=2 then 'alerte' else 'incident' end,
    'Incident ' || cat || ' #' || iid || ' (' || p_source || ') → ' || ag || coalesce(' · ' || left(p_sujet,80),'') || '.');
  return jsonb_build_object('id',iid,'statut','en_cours','agent',ag,'severite',sev);
end $$;

create or replace function public.navlys_incident_apprendre(
  p_incident_id bigint, p_motif text, p_action text)
returns bigint language plpgsql security definer as $$
declare r bigint; s text; c text; a text;
begin
  select source, categorie, agent into s,c,a from public.core_incidents where id=p_incident_id;
  insert into public.core_incident_rules(motif, source, categorie, agent, action)
  values (p_motif, s, c, a, p_action) returning id into r;
  update public.core_incidents set statut='resolu', rule_id=r, resolved_at=now(),
    resolution = coalesce(resolution,'') || ' | Règle gravée : ' || p_motif where id=p_incident_id;
  insert into public.journal(type,message)
  values ('incident','Règle anti-récidive gravée (#' || r || ') : « ' || p_motif || ' » → ' || a || '. Plus jamais à y réfléchir.');
  return r;
end $$;

create or replace function public.navlys_incidents_relance() returns int language plpgsql security definer as $$
declare n int;
begin
  update public.core_incidents set severite = greatest(1, severite - 1)
   where statut in ('nouveau','en_cours') and ts < now() - interval '2 hours';
  get diagnostics n = row_count;
  if n > 0 then insert into public.journal(type,message)
    values ('incident','Relance : ' || n || ' incident(s) non résolu(s) ré-escaladé(s).'); end if;
  return n;
end $$;

do $$ begin perform cron.unschedule('navlys_incidents_relance'); exception when others then null; end $$;
select cron.schedule('navlys_incidents_relance', '*/30 * * * *', $$select public.navlys_incidents_relance();$$);

-- Règles de départ + drapeau + doctrine : voir migration. Idempotent.
-- Pont temps réel (mail provider -> incident) : Zapier / webhook -> RPC navlys_incident.
