-- NAVLYS — Espace membre : mini-site public de chaque membre à navlys.com/membres/<slug>.
-- Découverte gratuite ('decouverte'), passe 'actif' au paiement. Écriture via la fonction
-- edge `membre` (service_role) ; lecture publique de la vitrine. Idempotent.
alter table public.membres add column if not exists slug text;
create unique index if not exists membres_slug_uidx on public.membres(slug) where slug is not null;

create table if not exists public.core_membre_site (
  slug        text primary key,
  email       text not null,
  prenom      text,
  titre       text,
  bio         text,
  photo_url   text,
  liens       jsonb not null default '[]'::jsonb,   -- [{label,url}] — filtrés http(s) côté fonction
  statut      text not null default 'decouverte',   -- decouverte | actif
  vues        integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists core_membre_site_email_idx on public.core_membre_site(email);

alter table public.core_membre_site enable row level security;
drop policy if exists membre_site_public_read on public.core_membre_site;
create policy membre_site_public_read on public.core_membre_site for select to anon, authenticated using (true);

comment on table public.core_membre_site is 'Mini-site public de chaque membre (navlys.com/membres/<slug>). Découverte gratuite ; actif au paiement. Écrit par la fonction membre (service_role).';
