# Backend Setup Guide — Smart Defense Radar

## Current Backend: ActivePieces Cloud

The production backend uses **ActivePieces** for data pipeline automation. The n8n workflow below is kept as a reference alternative.

### ActivePieces Setup (Production)

1. Sign up at https://activepieces.com (free tier)
2. Create a new flow with **RSS Trigger** pointing to `https://tg.i-c-a.su/rss/khozkhabar`
3. Add **OpenRouter** piece for AI analysis
4. Add **Google Sheets** piece to write results
5. Activate the flow

### Analytics Webhook

ActivePieces webhook URL for visitor tracking:
```
https://cloud.activepieces.com/api/v1/webhooks/w8NAUJhlhnTagon6awYuo
```

This is called from `index.html` on page load.

---

## n8n Alternative (Reference)

> **Note:** n8n Cloud was tested but RSS sources (rsshub.app, tg.i-c-a.su) are blocked by Cloudflare from n8n's servers. The workflow is kept for reference if a self-hosted n8n instance is available.

### n8n Cloud Setup

1. Sign up at https://app.n8n.cloud (free, 2,000 executions/month)
2. Import `tg-monitor-workflow.json`
3. Add credentials:
   - **OpenRouter API** (Header Auth: `Authorization: Bearer sk-or-...`)
   - **Google Sheets OAuth2**
4. Activate the workflow

### Execution Budget
- 24 executions/day × 30 days = ~720/month
- Well within n8n Cloud free tier (2,000/month)

### Known Issue
RSS feeds from `rsshub.app` and `tg.i-c-a.su` return Cloudflare challenge pages when accessed from n8n Cloud servers. Use ActivePieces or a self-hosted n8n instance instead.

---

## Cloudflare Worker Proxy

The Worker (`src/index.js`) provides two proxy endpoints:

### `/api/data`
Proxies the main Google Sheets CSV (crisis reports).
- Auto-prepends CSV header if missing
- Returns with CORS headers

### `/api/analytics`
Proxies the analytics Google Sheets CSV.
- Auto-prepends CSV header if missing
- Returns with CORS headers

### Deploy
```bash
npx wrangler deploy
```

---

## Google Sheets Structure

### Sheet 1 (gid=0): Crisis Reports
| Column | Description |
|---|---|
| Title | Post title/headline |
| Source | Telegram post URL |
| Content | Full post content |
| Result | AI analysis (topic, priority, action, location) |

### Sheet 2 (gid=804484002): Analytics
| Column | Description |
|---|---|
| TimeStamp | Visit timestamp |
| IP | Visitor IP |
| Country | Country code |
| Is Mobile | Mobile device flag |
| Referrer | Referrer URL |
| OS | Operating system |
| Browser | Browser info |
| Screen | Screen resolution |
| VisitorID | Unique visitor ID |
| SessionCount | Number of sessions |
