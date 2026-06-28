-- ════════════════════════════════════════════════════════════════════════════
-- 🧭 NAVLYS APP CLIENT — SCHÉMA SUPABASE BACKEND BETA v1.0
-- COPIE DE RÉFÉRENCE rapatriée du Drive « navlys juin vrac md » le 2026-06-25.
-- ⚠️ Extraction via connecteur (peut différer à l'octet près) → RE-VÉRIFIER
--    l'original du Drive avant de l'exécuter dans le SQL Editor Supabase.
-- Verrouillé : 28 mai 2026 · Cible : Beta · Multi-tenant strict (RLS partout)
-- Référence : _CARTOGRAPHE_M3_PROFILS_UTILISATEURS_NAVLYS.md
-- USAGE : 1) projet Supabase (eu-west-3 Frankfurt) 2) coller dans SQL Editor → Run
--         3) Auth provider (email magic link) 4) tester avec user fictif.
-- ⚠️ G1 : aucune clé API ici. Les SERVICE_ROLE_KEY restent côté serveur Next.js.
-- ════════════════════════════════════════════════════════════════════════════

-- 0. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. TABLE users — extension de auth.users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  locale TEXT NOT NULL DEFAULT 'fr' CHECK (locale IN ('fr','en')),
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  accepted_g1 BOOLEAN NOT NULL DEFAULT FALSE,
  accepted_g1_at TIMESTAMPTZ,
  accepted_terms BOOLEAN NOT NULL DEFAULT FALSE,
  subscription_tier TEXT NOT NULL DEFAULT 'demo'
    CHECK (subscription_tier IN ('demo','monthly','annual','navbio_solo','navbio_couple','navbio_premium','navbio_cinema','navbio_pro')),
  subscription_renews_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_subscription ON public.users(subscription_tier) WHERE deleted_at IS NULL;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_select_self" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_self" ON public.users FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- 2. TABLE profiles_user — profil Cartographe M3 attribué
CREATE TABLE IF NOT EXISTS public.profiles_user (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  profil_id SMALLINT NOT NULL CHECK (profil_id BETWEEN 1 AND 7),
  profil_nom TEXT NOT NULL,
  degre_interne TEXT NOT NULL CHECK (degre_interne IN ('defensive','balanced','aggressive')),
  allocation_pct JSONB NOT NULL, -- {"prudent":30,"balanced":60,"tactique":10}
  cadence TEXT NOT NULL,
  strategies_actives JSONB NOT NULL DEFAULT '[]'::JSONB,
  univers_actifs JSONB NOT NULL DEFAULT '[]'::JSONB,
  interdits JSONB NOT NULL DEFAULT '[]'::JSONB,
  alertes_psycho JSONB NOT NULL DEFAULT '[]'::JSONB,
  perf_honnete JSONB NOT NULL, -- {cagr_min,cagr_max,vol,proba_perte_20,...}
  questionnaire_raw JSONB NOT NULL, -- snapshot 12 réponses (chiffré au repos)
  questionnaire_hash TEXT NOT NULL, -- SHA-256
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '6 months',
  UNIQUE (user_id, is_active) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX idx_profiles_user_active ON public.profiles_user(user_id) WHERE is_active = TRUE;
CREATE INDEX idx_profiles_user_profil ON public.profiles_user(profil_id);
CREATE INDEX idx_profiles_user_expires ON public.profiles_user(expires_at) WHERE is_active = TRUE;
ALTER TABLE public.profiles_user ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_user_select_self" ON public.profiles_user FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "profiles_user_insert_self" ON public.profiles_user FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "profiles_user_update_self" ON public.profiles_user FOR UPDATE USING (auth.uid() = user_id);

-- 3. TABLE routines
CREATE TABLE IF NOT EXISTS public.routines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES public.profiles_user(id) ON DELETE CASCADE,
  cadence_type TEXT NOT NULL CHECK (cadence_type IN ('quotidienne','hebdo','mensuelle','trimestrielle','annuelle')),
  titre TEXT NOT NULL,
  description TEXT,
  duree_minutes SMALLINT NOT NULL CHECK (duree_minutes BETWEEN 0 AND 480),
  derniere_action_at TIMESTAMPTZ,
  prochaine_action_at TIMESTAMPTZ,
  actif BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_routines_user_active ON public.routines(user_id, actif);
CREATE INDEX idx_routines_prochaine ON public.routines(prochaine_action_at) WHERE actif = TRUE;
ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "routines_all_self" ON public.routines FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 4. TABLE cap_reve_objectifs — onboarding « Mon Cap Rêvé »
CREATE TABLE IF NOT EXISTS public.cap_reve_objectifs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  cap_choisi TEXT NOT NULL CHECK (cap_choisi IN ('securiser','grandir','projet_court','retraite','apprendre')),
  horizon_annees SMALLINT CHECK (horizon_annees BETWEEN 0 AND 60),
  description_libre TEXT,
  capital_cible_eur NUMERIC(14,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_cap_reve_user ON public.cap_reve_objectifs(user_id);
ALTER TABLE public.cap_reve_objectifs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cap_reve_all_self" ON public.cap_reve_objectifs FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 5. TABLE paper_trades — paper trading (Profil 7 « Navigateur Curieux »)
CREATE TABLE IF NOT EXISTS public.paper_trades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('buy','sell','short','cover')),
  quantite NUMERIC(18,8) NOT NULL CHECK (quantite > 0),
  prix_entree NUMERIC(14,4) NOT NULL,
  prix_sortie NUMERIC(14,4),
  pnl_eur NUMERIC(14,2),
  pnl_pct NUMERIC(8,4),
  strategie TEXT, -- 'donchian','stat-arb','manuelle','plus_2pct_jour_pedagogique',...
  statut TEXT NOT NULL DEFAULT 'open' CHECK (statut IN ('open','closed','cancelled')),
  notes TEXT,
  opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  closed_at TIMESTAMPTZ,
  CONSTRAINT paper_trades_pnl_coherent CHECK (
    (statut = 'closed' AND prix_sortie IS NOT NULL AND closed_at IS NOT NULL)
    OR (statut <> 'closed')
  )
);
CREATE INDEX idx_paper_trades_user_open ON public.paper_trades(user_id) WHERE statut = 'open';
CREATE INDEX idx_paper_trades_user_symbol ON public.paper_trades(user_id, symbol);
CREATE INDEX idx_paper_trades_opened ON public.paper_trades(opened_at DESC);
ALTER TABLE public.paper_trades ENABLE ROW LEVEL SECURITY;
CREATE POLICY "paper_trades_all_self" ON public.paper_trades FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 6. TABLE cartographe_publications (lecture publique)
CREATE TABLE IF NOT EXISTS public.cartographe_publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title_fr TEXT NOT NULL,
  title_en TEXT,
  summary_fr TEXT NOT NULL,
  summary_en TEXT,
  body_md_fr TEXT NOT NULL,
  body_md_en TEXT,
  category TEXT NOT NULL, -- 'mission','rapport','verdict','carte','laboratoire'
  mission_ref TEXT, -- 'M1','M2','M3','M4'
  verdict TEXT, -- 'validee','invalidee','en_cours','informationnelle'
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  publie BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_carto_pub_slug ON public.cartographe_publications(slug);
CREATE INDEX idx_carto_pub_published ON public.cartographe_publications(published_at DESC) WHERE publie = TRUE;
CREATE INDEX idx_carto_pub_category ON public.cartographe_publications(category) WHERE publie = TRUE;
ALTER TABLE public.cartographe_publications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "carto_pub_select_published" ON public.cartographe_publications FOR SELECT USING (publie = TRUE);
-- Insert/update réservés au service_role (jamais via client).

-- 7. TABLE audit_log
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  payload JSONB,
  ip_hash TEXT,
  user_agent_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_audit_log_user ON public.audit_log(user_id, created_at DESC);
CREATE INDEX idx_audit_log_action ON public.audit_log(action, created_at DESC);
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit_log_select_self" ON public.audit_log FOR SELECT USING (auth.uid() = user_id);

-- 8. FONCTIONS UTILITAIRES
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_cap_reve_updated_at BEFORE UPDATE ON public.cap_reve_objectifs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_carto_pub_updated_at BEFORE UPDATE ON public.cartographe_publications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.deactivate_old_profiles()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = TRUE THEN
    UPDATE public.profiles_user SET is_active = FALSE
    WHERE user_id = NEW.user_id AND id <> NEW.id AND is_active = TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_profiles_user_deactivate_old AFTER INSERT OR UPDATE ON public.profiles_user FOR EACH ROW EXECUTE FUNCTION public.deactivate_old_profiles();

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, locale)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'locale','fr'))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE TRIGGER trg_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

-- 9. VUE dashboard (hérite du RLS des tables sources)
CREATE OR REPLACE VIEW public.v_user_dashboard AS
SELECT
  u.id AS user_id, u.display_name, u.locale, u.subscription_tier,
  p.profil_id, p.profil_nom, p.degre_interne, p.allocation_pct, p.cadence,
  p.expires_at AS requestionnaire_due_at,
  (SELECT COUNT(*) FROM public.paper_trades pt WHERE pt.user_id = u.id AND pt.statut = 'open') AS paper_trades_open,
  (SELECT COUNT(*) FROM public.routines r WHERE r.user_id = u.id AND r.actif = TRUE AND r.prochaine_action_at <= NOW()) AS routines_due
FROM public.users u
LEFT JOIN public.profiles_user p ON p.user_id = u.id AND p.is_active = TRUE
WHERE u.deleted_at IS NULL;

-- 10. SEEDS (cartographe_publications de référence) — voir l'original Drive pour le body_md complet.
--     Missions clés : M2 « +2 %/jour » = INVALIDÉE (Sharpe OOS -5,49, DD -95,2 %) ;
--     M3 « 7 profils NAVLYS » = informationnelle.

-- FIN — 🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL
