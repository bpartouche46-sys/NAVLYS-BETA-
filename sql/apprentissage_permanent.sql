-- NAVLYS — Apprentissage permanent : la base devient un corps vivant qui grandit.
-- consolider_apprentissage() distille les livrables de recherche des agents
-- dans core_knowledge (par domaine), une seule fois chacun.
create or replace function public.consolider_apprentissage() returns integer
language plpgsql security definer as $$
declare n integer;
begin
  insert into public.core_knowledge (id, section, titre, contenu, updated_at)
  select 'appr-m'||m.id,
         case m.departement
           when 'NAVLEX' then 'juridique' when 'NAVMKT' then 'marketing'
           when 'NAVDEM' then 'organisation' when 'NAVFI' then 'finance'
           when 'NAVLAB' then 'innovation' when 'NAVME' then 'memoire'
           when 'NAVTECH' then 'technique' else lower(coalesce(m.departement,'general')) end,
         left(coalesce(m.titre,'Apprentissage'),200), left(m.resultat,8000), now()
  from public.missions m
  where m.statut='fait' and m.resultat is not null and length(m.resultat) > 80
    and not exists (select 1 from public.core_knowledge k where k.id='appr-m'||m.id)
  on conflict (id) do nothing;
  get diagnostics n = row_count;
  if n>0 then insert into public.journal(type,message)
    values ('apprentissage','Base enrichie : +'||n||' apprentissages (corps vivant).'); end if;
  return n;
end $$;

-- Veille permanente : juridique / marketing / organisation + consolidation quotidienne.
select cron.schedule('navlys_veille_juridique','45 5 * * *', $$select public.enqueue_routine('NAVLEX','Veille juridique du jour','Évolutions juridiques utiles à NAVLYS (RGPD, CGV, droit conso, IA Act, mentions légales). Info générale, simple citoyen.',2);$$);
select cron.schedule('navlys_veille_marketing','50 5 * * *', $$select public.enqueue_routine('NAVMKT','Veille marketing du jour','Meilleures tactiques acquisition, canaux, growth/SEO/social pour multiplier les vues à coût maîtrisé.',2);$$);
select cron.schedule('navlys_veille_organisation','55 5 * * *', $$select public.enqueue_routine('NAVDEM','Veille organisation entreprise','Meilleures pratiques organisation, process, outils, automatisations — reproductibles.',2);$$);
select cron.schedule('navlys_apprentissage','30 8 * * *', $$select public.consolider_apprentissage();$$);
