const DATA_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTM9KAs7vjq6efmyltasWErfYKZYRbCbRId-Fp7CLbD55_oXQzsVu07pAFcm1G1T9iz8HrFHpvA2wms/pub?gid=0&single=true&output=csv";
const ANALYTICS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTM9KAs7vjq6efmyltasWErfYKZYRbCbRId-Fp7CLbD55_oXQzsVu07pAFcm1G1T9iz8HrFHpvA2wms/pub?gid=804484002&single=true&output=csv";

async function proxyCSV(csvUrl, header) {
  try {
    const resp = await fetch(csvUrl, { headers: { "User-Agent": "SmartDefenseRadar/1.0" } });
    if (!resp.ok) return new Response(JSON.stringify({ error: "Upstream error", status: resp.status }), { status: 502, headers: { "Content-Type": "application/json" } });
    let body = await resp.text();
    if (header && !body.trimStart().startsWith(header.split(",")[0])) {
      body = header + "\n" + body;
    }
    return new Response(body, {
      headers: { "Content-Type": "text/csv; charset=utf-8", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Cache-Control": "public, max-age=60" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Proxy failed", detail: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/data") return proxyCSV(DATA_CSV_URL, "Title,Source,Content,Result");
    if (url.pathname === "/api/analytics") return proxyCSV(ANALYTICS_CSV_URL, "TimeStamp,VisitorID,SessionCount,UserAgent,ScreenSize,Referrer");

    // Serve static assets for all other routes
    return env.ASSETS.fetch(request);
  }
};
