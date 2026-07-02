const DATA_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTM9KAs7vjq6efmyltasWErfYKZYRbCbRId-Fp7CLbD55_oXQzsVu07pAFcm1G1T9iz8HrFHpvA2wms/pub?gid=0&single=true&output=csv";

const RSS_SOURCES = [
  (ch) => `https://rsshub.app/telegram/channel/${ch}`,
  (ch) => `https://rsshub.rssforever.com/telegram/channel/${ch}`,
];

async function fetchRSS(channel) {
  for (const src of RSS_SOURCES) {
    try {
      const resp = await fetch(src(channel), {
        headers: { "User-Agent": "SmartDefenseRadar/1.0" },
        redirect: "follow"
      });
      if (resp.ok) {
        const text = await resp.text();
        if (text.includes("<item>") || text.includes("<entry>")) {
          return new Response(text, {
            headers: {
              "Content-Type": "application/rss+xml; charset=utf-8",
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "public, max-age=300"
            }
          });
        }
      }
    } catch (e) { /* try next source */ }
  }
  return new Response(JSON.stringify({ error: "All RSS sources failed for channel: " + channel }), {
    status: 502,
    headers: { "Content-Type": "application/json" }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS proxy for Google Sheets CSV
    if (url.pathname === "/api/data") {
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
        const CSV_HEADER = "Title,Source,Content,Result";
        const needsHeader = !body.trimStart().startsWith("Title");
        const csv = needsHeader ? CSV_HEADER + "\n" + body : body;
        return new Response(csv, {
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

    // RSS proxy for Telegram channels
    if (url.pathname === "/api/rss") {
      const channel = url.searchParams.get("channel");
      if (!channel) {
        return new Response(JSON.stringify({ error: "Missing ?channel= parameter" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      return fetchRSS(channel);
    }

    // Serve static assets for all other routes
    return env.ASSETS.fetch(request);
  }
};
