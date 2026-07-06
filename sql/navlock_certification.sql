-- NAVLYS — NAVLOCK : double verrou CERTIFIÉ serveur (empreinte/visage + phrase secrète)
-- Gravé le 2026-07-06 (ordre de Bruno : "au moindre doute sur l'identité → blocage
-- immédiat + double vérification certifiée : notre phrase secrète + empreinte/visage").
--
-- Rien de sensible n'est stocké en clair :
--   - la clé publique WebAuthn (empreinte/visage) certifie l'appareil ;
--   - la phrase secrète n'existe qu'en HACHÉ (SHA-256 salé), jamais en clair.
-- Tout l'accès passe par le service_role (RLS actif, aucune policy publique).

create table if not exists public.core_navlock (
  user_id           text primary key,              -- e-mail (ou id anonyme stable)
  cred_id           text,                           -- identifiant du credential WebAuthn (base64url)
  public_key        text,                           -- clé publique COSE (base64)
  counter           bigint default 0,               -- compteur anti-rejeu
  transports        jsonb  default '[]'::jsonb,
  phrase_hash       text,                           -- SHA-256( salt + phrase normalisée )
  phrase_salt       text,
  pending_challenge text,                           -- défi serveur en cours (base64url)
  pending_kind      text,                           -- 'reg' | 'auth'
  pending_at        timestamptz,
  trusted_devices   jsonb  default '[]'::jsonb,      -- [{sig, ip, at}] appareils certifiés
  created_at        timestamptz default now(),
  updated_at        timestamptz default now(),
  last_cert_at      timestamptz
);

create table if not exists public.core_navlock_events (
  id          bigint generated always as identity primary key,
  user_id     text,
  type        text,        -- register | certify | doubt | block | reset | token
  ok          boolean,
  detail      text,
  ip          text,
  ua          text,
  device_sig  text,
  risk        int default 0,
  created_at  timestamptz default now()
);
create index if not exists idx_navlock_events_user on public.core_navlock_events(user_id, created_at desc);

alter table public.core_navlock        enable row level security;
alter table public.core_navlock_events enable row level security;
-- Aucune policy publique : seul le service_role (fonction serveur) y touche.

-- Doctrine gravée
insert into public.navlys_memoire (type, titre, contenu)
values ('doctrine', 'NAVLOCK — double verrou certifié',
  'NAVLOCK (2026-07-06) : identité certifiée par DOUBLE preuve — phrase secrète dite '
  || 'à voix haute (hachée SHA-256, jamais en clair) + empreinte/visage WebAuthn vérifiés '
  || 'CÔTÉ SERVEUR. Au moindre doute (appareil/IP inconnus) → blocage immédiat + '
  || 're-certification obligatoire + incident journalisé. Le coffre s''ouvre sur un jeton '
  || 'signé serveur, jamais sur un drapeau navigateur.')
on conflict do nothing;
