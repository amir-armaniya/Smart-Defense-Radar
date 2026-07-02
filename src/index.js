const DATA_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTM9KAs7vjq6efmyltasWErfYKZYRbCbRId-Fp7CLbD55_oXQzsVu07pAFcm1G1T9iz8HrFHpvA2wms/pub?gid=0&single=true&output=csv";

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === "/api/data") {
      try {
        const resp = await fetch(DATA_CSV_URL, {
          headers: { "User-Agent": "SmartDefenseRadar/1.0" }
        });
        if (!resp.ok) {
          return new Response(JSON.stringify({ error: "Upstream error", status: resp.status }), {
            status: 502,
            headers: { "Content-Type": "application/json" }
          });
        }
        const body = await resp.text();
        return new Response(body, {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Cache-Control": "public, max-age=60"
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "Proxy failed", detail: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Serve static assets for all other routes
    return env.ASSETS.fetch(request);
  }
};
