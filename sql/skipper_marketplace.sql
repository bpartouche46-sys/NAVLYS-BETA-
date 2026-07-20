-- NAVLYS — SKIPPER : place de marché nautique (acheteurs↔vendeurs)
-- Copie repo des migrations appliquées en base (source de vérité = base) :
--   skipper_marketplace_v1  +  skipper_avis_enable_rls
--
-- Tables verrouillées RLS (accès service_role uniquement, via edge « skipper »).
-- skipper_annonces.bateau_dossier_id -> core_bateau_dossiers.id = l'expertise
-- Test Bateaux (osmose + défauts modèle) attachée à l'annonce (différenciateur NAVLYS).
-- Aucune fonction SECURITY DEFINER d'écriture ici (évite le piège règle n°114).
-- Garde-fou : une nouvelle annonce naît en statut 'a_valider' ; seul 'publiee'
-- est servi au public (règle d'or n°2, aucune publication sans validation Bruno).

create table if not exists skipper_annonces (
  id bigserial primary key,
  jeton text not null unique default encode(gen_random_bytes(12),'hex'),
  vendeur_prenom text not null default '',
  vendeur_email text not null,
  vendeur_tel text not null default '',
  vendeur_type text not null default 'particulier' check (vendeur_type in ('particulier','pro')),
  type_bateau text not null default 'voilier' check (type_bateau in ('voilier','catamaran','moteur','semi-rigide','peniche','autre')),
  marque text not null default '',
  modele text not null default '',
  annee text not null default '',
  longueur_m numeric,
  largeur_m numeric,
  tirant_eau_m numeric,
  materiau text not null default '',
  motorisation text not null default '',
  heures_moteur int,
  carburant text not null default '',
  couchages int,
  pavillon text not null default '',
  hin text not null default '',
  prix_eur numeric,
  tva_payee boolean,
  port text not null default '',
  zone text not null default '',
  description text not null default '',
  equipements jsonb not null default '[]'::jsonb,
  photos jsonb not null default '[]'::jsonb,
  bateau_dossier_id bigint,
  statut text not null default 'a_valider' check (statut in ('a_valider','publiee','vendue','refusee','archivee')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table skipper_annonces enable row level security;

create table if not exists skipper_messages (
  id bigserial primary key,
  annonce_id bigint not null references skipper_annonces(id) on delete cascade,
  expediteur text not null check (expediteur in ('acheteur','vendeur')),
  acheteur_email text not null default '',
  acheteur_prenom text not null default '',
  contenu text not null,
  lu boolean not null default false,
  created_at timestamptz not null default now()
);
alter table skipper_messages enable row level security;

create table if not exists skipper_avis (
  id bigserial primary key,
  annonce_id bigint references skipper_annonces(id) on delete set null,
  cible text not null check (cible in ('acheteur','vendeur')),
  auteur_email text not null default '',
  note int not null check (note between 1 and 5),
  commentaire text not null default '',
  created_at timestamptz not null default now()
);
alter table skipper_avis enable row level security;

create index if not exists skipper_annonces_statut_idx on skipper_annonces(statut);
create index if not exists skipper_annonces_dossier_idx on skipper_annonces(bateau_dossier_id);
create index if not exists skipper_messages_annonce_idx on skipper_messages(annonce_id);
create index if not exists skipper_avis_annonce_idx on skipper_avis(annonce_id);

comment on table skipper_annonces is 'SKIPPER — annonces bateaux (acheteurs↔vendeurs). Nouvelle annonce = statut a_valider (garde-fou Bruno). Public = statut publiee uniquement.';

-- Bucket photos public
insert into storage.buckets (id, name, public) values ('skipper','skipper', true)
on conflict (id) do nothing;

-- ============================================================
-- SKIPPER v2 (migration skipper_v2_vendeur_transactions) — copie repo
-- Tableau vendeur (accès par token) + séquestre/réservations.
-- ============================================================
alter table skipper_annonces add column if not exists vendeur_token text;
update skipper_annonces set vendeur_token = encode(gen_random_bytes(12),'hex') where vendeur_token is null;
create index if not exists skipper_annonces_vtoken_idx on skipper_annonces(vendeur_token);
create index if not exists skipper_annonces_vemail_idx on skipper_annonces(lower(vendeur_email));

-- Réservations / séquestre : a_valider par défaut (garde-fou Bruno, Bible §6).
-- Aucun débit réel sans activation Stripe + validation.
create table if not exists skipper_transactions (
  id bigserial primary key,
  annonce_id bigint not null references skipper_annonces(id) on delete cascade,
  acheteur_prenom text not null default '',
  acheteur_email text not null,
  montant_acompte numeric,
  devise text not null default 'EUR',
  statut text not null default 'a_valider'
    check (statut in ('a_valider','en_sequestre','liberee','remboursee','annulee','refusee')),
  note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table skipper_transactions enable row level security;
create index if not exists skipper_transactions_annonce_idx on skipper_transactions(annonce_id);
create index if not exists skipper_transactions_statut_idx on skipper_transactions(statut);
