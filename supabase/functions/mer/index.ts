// NAVLYS — La mer de Césarée (relais interne pour /mer).
// GET -> { ok, heures:[{t, vague, vent, raf, dir}] } — 3 jours, heure d'Israël.
// Source : Open-Meteo (marine + forecast). Sert de plan B si l'appel direct
// depuis le navigateur est bloqué (réseau d'entreprise, etc.).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "authorization,apikey,content-type",
};
function J(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=900", ...CORS } });
}
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  const LAT = 32.5, LON = 34.88, TZ = "Asia%2FJerusalem";
  try {
    const [rm, rv] = await Promise.all([
      fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${LAT}&longitude=${LON}&hourly=wave_height&timezone=${TZ}&forecast_days=3`),
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&hourly=wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=${TZ}&forecast_days=3&wind_speed_unit=kmh`),
    ]);
    const m: any = await rm.json(), v: any = await rv.json();
    const times: string[] = (m.hourly && m.hourly.time) || (v.hourly && v.hourly.time) || [];
    const heures = times.map((t: string, i: number) => ({
      t,
      vague: m.hourly?.wave_height?.[i] ?? null,
      vent: v.hourly?.wind_speed_10m?.[i] ?? null,
      raf: v.hourly?.wind_gusts_10m?.[i] ?? null,
      dir: v.hourly?.wind_direction_10m?.[i] ?? null,
    }));
    return J({ ok: true, heures, source: "open-meteo" });
  } catch (e) {
    return J({ ok: false, error: String(e).slice(0, 200) }, 200);
  }
});
