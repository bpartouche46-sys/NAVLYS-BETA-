#!/usr/bin/env bash
#
# ============================================================================
#  NAVLYS — Synchronisation AUTOMATIQUE du core Hetzner depuis GitHub
# ============================================================================
#  But : que le serveur core NAVLYS se mette à jour TOUT SEUL à partir de
#  GitHub, sans que personne ait à toucher l'ancien (ni même le nouveau) PC.
#
#  Principe : GitHub = source unique de vérité.
#    Nouveau PC  --(git push)-->  GitHub  --(ce script en cron)-->  core Hetzner
#
#  CE SCRIPT NE DÉTRUIT RIEN par défaut :
#    - s'il détecte des modifications LOCALES non commitées sur le core,
#      il s'ARRÊTE et prévient (au lieu d'écraser) ;
#    - sinon il avance la copie locale jusqu'au dernier commit de la branche.
#
#  Installation (sur le serveur, par Bruno en SSH) :
#     1) cloner le dépôt une fois :   git clone <URL> /opt/navlys/NAVLYS-BETA-
#     2) copier ce script :           cp scripts/sync-core.sh /opt/navlys/sync-core.sh
#     3) le rendre exécutable :       chmod +x /opt/navlys/sync-core.sh
#     4) le tester à la main :        REPO_DIR=/opt/navlys/NAVLYS-BETA- /opt/navlys/sync-core.sh
#     5) l'automatiser (cron, toutes les 5 min) :
#          crontab -e
#          */5 * * * * REPO_DIR=/opt/navlys/NAVLYS-BETA- /opt/navlys/sync-core.sh >> /var/log/navlys-sync.log 2>&1
#
#  Variables :
#     REPO_DIR   chemin du dépôt sur le serveur (obligatoire)
#     BRANCH     branche à suivre (défaut : main)
#     POST_HOOK  commande à lancer SI quelque chose a changé (ex: redémarrage)
#                ex:  POST_HOOK="systemctl restart navlys-core"
#     FORCE      1 = écraser les modifs locales (reset --hard). À éviter. Défaut: 0.
# ============================================================================

set -euo pipefail

REPO_DIR="${REPO_DIR:-}"
BRANCH="${BRANCH:-main}"
POST_HOOK="${POST_HOOK:-}"
FORCE="${FORCE:-0}"

ts() { date +'%Y-%m-%d %H:%M:%S'; }
log() { echo "[$(ts)] $*"; }

if [[ -z "${REPO_DIR}" ]]; then
  echo "✖ REPO_DIR n'est pas défini. Ex: REPO_DIR=/opt/navlys/NAVLYS-BETA- $0" >&2
  exit 2
fi
if [[ ! -d "${REPO_DIR}/.git" ]]; then
  echo "✖ ${REPO_DIR} n'est pas un dépôt git (pas de .git). Cloner d'abord." >&2
  exit 2
fi

cd "${REPO_DIR}"

log "Sync core ← GitHub (branche ${BRANCH}) dans ${REPO_DIR}"

# 1) Récupérer l'état distant sans rien appliquer encore
git fetch --quiet origin "${BRANCH}"

LOCAL="$(git rev-parse @ 2>/dev/null || echo none)"
REMOTE="$(git rev-parse "origin/${BRANCH}" 2>/dev/null || echo none)"

if [[ "${REMOTE}" == "none" ]]; then
  log "✖ Branche origin/${BRANCH} introuvable. Rien fait."
  exit 1
fi

# 2) Déjà à jour ?
if [[ "${LOCAL}" == "${REMOTE}" ]]; then
  log "✓ Déjà à jour (${LOCAL:0:8}). Rien à faire."
  exit 0
fi

# 3) Garde-fou : des modifications locales non commitées ?
if ! git diff --quiet || ! git diff --cached --quiet; then
  if [[ "${FORCE}" == "1" ]]; then
    log "⚠ Modifs locales détectées + FORCE=1 → reset --hard origin/${BRANCH} (écrasement)."
    git reset --hard "origin/${BRANCH}"
  else
    log "✖ Modifs LOCALES non commitées sur le core → ARRÊT (pas d'écrasement)."
    log "  Le core doit rester une COPIE de GitHub. Commns à régler :"
    log "  - soit annuler ces modifs locales (git checkout -- .),"
    log "  - soit relancer avec FORCE=1 si tu acceptes de les perdre."
    exit 1
  fi
else
  # 4) Cas normal : avancer proprement (fast-forward) vers le dernier commit
  log "↻ Mise à jour ${LOCAL:0:8} → ${REMOTE:0:8}"
  git merge --ff-only "origin/${BRANCH}"
fi

# 5) Hook post-mise-à-jour (ex: redémarrer un service) seulement si on a bougé
if [[ -n "${POST_HOOK}" ]]; then
  log "▶ POST_HOOK : ${POST_HOOK}"
  bash -c "${POST_HOOK}"
fi

log "✓ Sync terminé sur $(git rev-parse --short @)."
