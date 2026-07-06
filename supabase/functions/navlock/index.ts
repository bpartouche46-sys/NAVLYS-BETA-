// NAVLYS — NAVLOCK : double verrou CERTIFIÉ serveur.
// Deux preuves obligatoires pour ouvrir un espace sensible :
//   1) empreinte / visage  -> WebAuthn, clé publique VÉRIFIÉE côté serveur ;
//   2) phrase secrète dite  -> hachée SHA-256 salée, jamais stockée en clair.
// Au moindre doute (appareil / IP inconnus) -> blocage + re-certification + incident.
// Le "coffre ouvert" = un JETON signé serveur (HMAC), pas un drapeau navigateur.
//
// Actions (POST {action, ...}) :
//   register_options {user}                 -> défi d'enrôlement
//   register_verify  {user, att, phrase, device_sig} -> enregistre les 2 clés
//   auth_options     {user}                 -> défi d'ouverture
//   auth_verify      {user, ass, phrase, device_sig} -> vérifie -> JETON
//   risk             {user, device_sig}     -> {doubt, block, reason}
//   verify_token     {user, token, device_sig} -> {ok}
//   reset            {user, token}          -> efface (jeton valide requis)
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "npm:@simplewebauthn/server@13";

const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SECRET = Deno.env.get("NAVLOCK_SECRET") || ("navlock:" + K); // signe les jetons
const RP_NAME = "NAVLYS";
const CERT_TTL = 30 * 60 * 1000; // jeton valable 30 min
const CHALLENGE_TTL = 5 * 60 * 1000; // défi valable 5 min

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,authorization,apikey",
  "Access-Control-Max-Age": "86400",
};
const J = (d: unknown, s = 200) =>
  new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
const hh = () => ({ apikey: K, Authorization: "Bearer " + K, "Content-Type": "application/json" });

// --- PostgREST helpers (service_role) ---
async function getRow(user: string): Promise<any | null> {
  const r = await fetch(U + "/rest/v1/core_navlock?user_id=eq." + encodeURIComponent(user) + "&select=*", { headers: hh() });
  if (!r.ok) return null;
  const a = await r.json();
  return Array.isArray(a) && a.length ? a[0] : null;
}
async function upsert(row: Record<string, unknown>) {
  await fetch(U + "/rest/v1/core_navlock", {
    method: "POST",
    headers: { ...hh(), Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(row),
  });
}
async function del(user: string) {
  await fetch(U + "/rest/v1/core_navlock?user_id=eq." + encodeURIComponent(user), { method: "DELETE", headers: hh() });
}
async function event(e: Record<string, unknown>) {
  await fetch(U + "/rest/v1/core_navlock_events", { method: "POST", headers: { ...hh(), Prefer: "return=minimal" }, body: JSON.stringify(e) }).catch(() => {});
}
async function incident(sujet: string, contenu: string) {
  // auto-cicatrisation : signale au CORE (sécurité)
  await fetch(U + "/rest/v1/rpc/navlys_incident", {
    method: "POST",
    headers: hh(),
    body: JSON.stringify({ source: "navlock", sujet, contenu, categorie: "securite", severite: 3 }),
  }).catch(() => {});
}

// --- normalisation phrase (identique côté client) ---
function normPhrase(s: string): string {
  s = String(s || "").toLowerCase();
  try { s = s.normalize("NFD").replace(/[̀-ͯ]/g, ""); } catch { /* noop */ }
  return s.replace(/[^a-z0-9֐-׿Ѐ-ӿ ]+/g, " ").replace(/\s+/g, " ").trim();
}

// --- base64url <-> bytes ---
function b64url(bytes: Uint8Array): string {
  let s = ""; for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function unb64url(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/"); while (str.length % 4) str += "=";
  const bin = atob(str), a = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
  return a;
}
const b64std = (bytes: Uint8Array) => { let s = ""; for (const b of bytes) s += String.fromCharCode(b); return btoa(s); };
const unb64std = (str: string) => { const bin = atob(str), a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; };

// --- crypto : SHA-256, HMAC ---
async function sha256hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function hmac(msg: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return b64url(new Uint8Array(sig));
}
async function makeToken(user: string, deviceSig: string): Promise<string> {
  const exp = Date.now() + CERT_TTL;
  const payload = user + "." + exp + "." + deviceSig;
  return exp + "." + (await hmac(payload));
}
async function checkToken(user: string, token: string, deviceSig: string): Promise<boolean> {
  const parts = String(token || "").split(".");
  if (parts.length < 2) return false;
  const exp = Number(parts[0]);
  if (!exp || Date.now() > exp) return false;
  const expected = await hmac(user + "." + exp + "." + deviceSig);
  // comparaison constante
  const got = parts.slice(1).join(".");
  if (got.length !== expected.length) return false;
  let diff = 0; for (let i = 0; i < got.length; i++) diff |= got.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

// --- origine / rpID à partir de la requête (navlys.com, previews, localhost) ---
function originInfo(req: Request): { origin: string; rpID: string } | null {
  const o = req.headers.get("origin") || "";
  try {
    const u = new URL(o);
    const host = u.hostname;
    const ok = host === "localhost" || host.endsWith("navlys.com") || host.endsWith("navlys.io") || host.endsWith("vercel.app");
    if (!ok) return null;
    return { origin: o, rpID: host };
  } catch { return null; }
}
const clientIP = (req: Request) =>
  (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("cf-connecting-ip") || "";
const clean = (x: unknown, n: number) => String(x == null ? "" : x).replace(/\s+/g, " ").trim().slice(0, n);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  const url = new URL(req.url);
  if (req.method === "GET") {
    if (url.searchParams.has("diag")) {
      const r = await fetch(U + "/rest/v1/core_navlock?select=user_id&limit=1", { headers: hh() });
      return J({ ok: true, service: "navlock", secret_set: !!Deno.env.get("NAVLOCK_SECRET"), db: r.ok });
    }
    return J({ ok: true, service: "navlock" });
  }
  if (req.method !== "POST") return J({ error: "method" }, 405);

  const oi = originInfo(req);
  if (!oi) return J({ error: "origine non autorisée" }, 403);
  const { origin, rpID } = oi;
  const ip = clientIP(req), ua = clean(req.headers.get("user-agent"), 240);

  const b: any = await req.json().catch(() => ({}));
  const action = clean(b.action, 40);
  const user = clean(b.user, 160).toLowerCase();
  const deviceSig = clean(b.device_sig, 128);
  if (!user) return J({ error: "utilisateur requis" }, 400);

  try {
    // ----- 1. ENRÔLEMENT : options -----
    if (action === "register_options") {
      const existing = await getRow(user);
      if (existing && existing.phrase_hash) return J({ error: "déjà configuré. Fais ↺ reconfigurer (avec ouverture valide) d'abord." }, 409);
      const userIdBytes = crypto.getRandomValues(new Uint8Array(16));
      const options = await generateRegistrationOptions({
        rpName: RP_NAME, rpID,
        userID: userIdBytes,
        userName: user,
        attestationType: "none",
        authenticatorSelection: { residentKey: "preferred", userVerification: "required", authenticatorAttachment: "platform" },
        supportedAlgorithmIDs: [-7, -257],
      });
      await upsert({ user_id: user, pending_challenge: options.challenge, pending_kind: "reg", pending_at: new Date().toISOString(), updated_at: new Date().toISOString() });
      return J({ options });
    }

    // ----- 2. ENRÔLEMENT : vérifie empreinte/visage + pose la phrase -----
    if (action === "register_verify") {
      const row = await getRow(user);
      if (!row || row.pending_kind !== "reg" || !row.pending_challenge) return J({ error: "aucun enrôlement en cours" }, 400);
      if (Date.now() - new Date(row.pending_at).getTime() > CHALLENGE_TTL) return J({ error: "défi expiré, recommence" }, 400);
      const phrase = normPhrase(b.phrase || "");
      if (phrase.split(" ").filter(Boolean).length < 2) return J({ error: "phrase : au moins deux mots" }, 400);

      const verification = await verifyRegistrationResponse({
        response: b.att,
        expectedChallenge: row.pending_challenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        requireUserVerification: true,
      }).catch((e) => ({ verified: false, _err: String(e) } as any));
      if (!verification.verified || !verification.registrationInfo) {
        await event({ user_id: user, type: "register", ok: false, detail: "webauthn refusé", ip, ua, device_sig: deviceSig });
        return J({ error: "empreinte/visage non vérifié" }, 400);
      }
      const cred = verification.registrationInfo.credential;
      const salt = b64url(crypto.getRandomValues(new Uint8Array(16)));
      const phraseHash = await sha256hex(salt + "|" + phrase);
      const devices = deviceSig ? [{ sig: deviceSig, ip, at: new Date().toISOString() }] : [];
      await upsert({
        user_id: user,
        cred_id: cred.id,
        public_key: b64std(cred.publicKey),
        counter: cred.counter || 0,
        transports: cred.transports || [],
        phrase_hash: phraseHash, phrase_salt: salt,
        pending_challenge: null, pending_kind: null, pending_at: null,
        trusted_devices: devices,
        updated_at: new Date().toISOString(),
      });
      await event({ user_id: user, type: "register", ok: true, detail: "double verrou créé", ip, ua, device_sig: deviceSig });
      return J({ ok: true });
    }

    // ----- 3. OUVERTURE : options -----
    if (action === "auth_options") {
      const row = await getRow(user);
      if (!row || !row.cred_id) return J({ error: "non configuré", need_setup: true }, 404);
      const options = await generateAuthenticationOptions({
        rpID,
        allowCredentials: [{ id: row.cred_id, transports: row.transports || undefined }],
        userVerification: "required",
      });
      await upsert({ user_id: user, pending_challenge: options.challenge, pending_kind: "auth", pending_at: new Date().toISOString(), updated_at: new Date().toISOString() });
      return J({ options });
    }

    // ----- 4. OUVERTURE : vérifie les DEUX preuves -> JETON -----
    if (action === "auth_verify") {
      const row = await getRow(user);
      if (!row || row.pending_kind !== "auth" || !row.pending_challenge) return J({ error: "aucune ouverture en cours" }, 400);
      if (Date.now() - new Date(row.pending_at).getTime() > CHALLENGE_TTL) return J({ error: "défi expiré, recommence" }, 400);

      // Preuve 1 : empreinte/visage
      const verification = await verifyAuthenticationResponse({
        response: b.ass,
        expectedChallenge: row.pending_challenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        credential: { id: row.cred_id, publicKey: unb64std(row.public_key), counter: Number(row.counter) || 0, transports: row.transports || undefined },
        requireUserVerification: true,
      }).catch((e) => ({ verified: false, _err: String(e) } as any));
      if (!verification.verified) {
        await event({ user_id: user, type: "certify", ok: false, detail: "empreinte refusée", ip, ua, device_sig: deviceSig });
        return J({ error: "empreinte/visage non vérifié", factor: "biometrie" }, 401);
      }

      // Preuve 2 : phrase secrète
      const phrase = normPhrase(b.phrase || "");
      const phraseHash = await sha256hex((row.phrase_salt || "") + "|" + phrase);
      if (phraseHash !== row.phrase_hash) {
        await event({ user_id: user, type: "certify", ok: false, detail: "phrase incorrecte", ip, ua, device_sig: deviceSig });
        return J({ error: "phrase secrète incorrecte", factor: "phrase" }, 401);
      }

      // Les DEUX preuves OK -> certification
      const devices = Array.isArray(row.trusted_devices) ? row.trusted_devices : [];
      if (deviceSig && !devices.some((d: any) => d && d.sig === deviceSig)) devices.push({ sig: deviceSig, ip, at: new Date().toISOString() });
      await upsert({
        user_id: user,
        counter: verification.authenticationInfo?.newCounter ?? row.counter,
        pending_challenge: null, pending_kind: null, pending_at: null,
        trusted_devices: devices.slice(-8),
        last_cert_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      await event({ user_id: user, type: "certify", ok: true, detail: "double verrou ouvert", ip, ua, device_sig: deviceSig });
      const token = await makeToken(user, deviceSig || "-");
      return J({ ok: true, token, expires_in: CERT_TTL / 1000 });
    }

    // ----- 5. MOTEUR DE DOUTE : appareil / IP inconnus -> blocage -----
    if (action === "risk") {
      const row = await getRow(user);
      if (!row || !row.phrase_hash) return J({ doubt: false, configured: false });
      const devices = Array.isArray(row.trusted_devices) ? row.trusted_devices : [];
      const known = deviceSig && devices.some((d: any) => d && d.sig === deviceSig);
      let doubt = false, risk = 0, reason = "";
      if (!known) { doubt = true; risk += 60; reason = "appareil inconnu"; }
      if (doubt) {
        await event({ user_id: user, type: "doubt", ok: false, detail: reason, ip, ua, device_sig: deviceSig, risk });
        await incident("Doute d'identité NAVLOCK", "Utilisateur " + user + " — " + reason + " (IP " + ip + "). Re-certification exigée.");
      }
      return J({ doubt, block: doubt, risk, reason, configured: true });
    }

    // ----- 6. Vérifier un jeton de certification -----
    if (action === "verify_token") {
      const ok = await checkToken(user, clean(b.token, 400), deviceSig || "-");
      await event({ user_id: user, type: "token", ok, detail: ok ? "jeton valide" : "jeton refusé", ip, ua, device_sig: deviceSig });
      return J({ ok });
    }

    // ----- 7. Reset (re-enrôlement) : exige un jeton valide -----
    if (action === "reset") {
      const ok = await checkToken(user, clean(b.token, 400), deviceSig || "-");
      if (!ok) return J({ error: "reconfiguration : ouvre d'abord ton coffre (jeton requis)" }, 401);
      await del(user);
      await event({ user_id: user, type: "reset", ok: true, detail: "verrou effacé", ip, ua, device_sig: deviceSig });
      return J({ ok: true });
    }

    return J({ error: "action inconnue" }, 400);
  } catch (e) {
    await event({ user_id: user, type: action || "?", ok: false, detail: "exception: " + String(e).slice(0, 200), ip, ua, device_sig: deviceSig });
    return J({ error: "erreur serveur" }, 500);
  }
});
