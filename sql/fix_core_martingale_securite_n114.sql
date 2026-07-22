-- NAVLYS — Correctif sécurité #401 (règle n°114) — APPLIQUÉ EN BASE le 2026-07-22
-- (migration fix_core_martingale_securite_n114). Copie repo = reflet de la base.
--
-- Trouvé par get_advisors(security) pendant l'audit P0 SKIPPER : 4 fonctions
-- SECURITY DEFINER du ledger financier core_martingale étaient exécutables par
-- anon/authenticated via /rest/v1/rpc — même motif que l'ex-navlys_bateau_publier.
-- Aucun front ne les appelle (seul le cron interne, en postgres) → REVOKE sûr.
revoke execute on function public.core_martingale_ingest()        from anon, authenticated, public;
revoke execute on function public.core_martingale_status()        from anon, authenticated, public;
revoke execute on function public.get_core_martingale(integer)    from anon, authenticated, public;
revoke execute on function public.verify_core_martingale()        from anon, authenticated, public;
revoke execute on function public.core_martingale_seal()          from anon, authenticated, public;
revoke execute on function public.core_martingale_block_mut()     from anon, authenticated, public;
-- search_path figé (advisor function_search_path_mutable) :
alter function public.core_martingale_seal()      set search_path = public, extensions;
alter function public.core_martingale_block_mut() set search_path = public, extensions;
-- Vérif : get_advisors(security) repassé propre (0 SECURITY DEFINER exposé, 0 search_path mutable).
