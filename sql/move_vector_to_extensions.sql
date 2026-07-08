-- NAVLYS — Security Advisor : régler le warning "extension_in_public" pour pgvector.
-- Appliqué en base le 2026-07-07 (migration move_vector_to_extensions_schema).
--
-- pgvector est relocatable (extrelocatable=true) et `extensions` est déjà dans le
-- search_path de la base → colonnes et index vector restent valides après déplacement.
-- MAIS 3 fonctions RAG ont un search_path durci (public, pg_temp) SANS `extensions` :
-- sans le patch, le type/opérateurs vector ne se résolvent plus → recherche cassée.
--
-- pg_net N'EST PAS traité ici : extrelocatable=false et le système tourne 24/7 sur
-- net.* (santé, cockpit, core-tick). Le déplacer imposerait un drop/recreate qui
-- casserait tout et effacerait net._http_response. Warning d'hygiène sans surface
-- d'attaque (ses fonctions vivent dans le schéma `net`, pas `public`) → on le garde.

alter extension vector set schema extensions;

alter function public.match_knowledge(query_embedding extensions.vector, match_count integer)
  set search_path = public, extensions, pg_temp;
alter function public.match_navlys_memoire(query_embedding extensions.vector, match_count integer, min_similarity double precision)
  set search_path = public, extensions, pg_temp;
alter function public.match_navlys_rag(query_embedding extensions.vector, match_count integer)
  set search_path = public, extensions, pg_temp;
