# Smart Civil Defense Radar (Crisis Management System)

A serverless, real-time situational awareness dashboard designed for civil defense and emergency triage in low-bandwidth environments.

> **Live Demo:** https://smart-defense-radar.amirarmaniya.workers.dev/
>
> **Note:** The user interface is localized in **Persian (Farsi)** for the Civil Defense exhibition in Iran.

## Architecture

```
Telegram @khozkhabar → ActivePieces (RSS → AI → Google Sheets) → Cloudflare Worker → Frontend
Visitors → ActivePieces webhook → Google Sheets (analytics tab) → analytics.html
```

### Components

| Layer | Technology | Purpose |
|---|---|---|
| **Data Source** | Telegram @khozkhabar | Crisis reports from Khuzestan |
| **Automation** | ActivePieces (Cloud) | RSS monitoring + AI analysis + data pipeline |
| **AI** | OpenRouter (Gemini Flash) | Extract priority, topic, location from posts |
| **Database** | Google Sheets (Published CSV) | Zero-latency structured storage |
| **CORS Proxy** | Cloudflare Worker (`/api/data`, `/api/analytics`) | Reliable CSV fetching without 3rd-party proxies |
| **Frontend** | HTML5 + Tailwind + Leaflet.js | Client-side dashboard |
| **Analytics** | ActivePieces webhook | Visitor tracking |
| **Hosting** | Cloudflare Workers | Serverless static hosting |

### Endpoints

| Endpoint | Purpose |
|---|---|
| `/` | Main dashboard |
| `/analytics` | Analytics dashboard |
| `/api/data` | Proxied Google Sheets CSV (crisis reports) |
| `/api/analytics` | Proxied Google Sheets CSV (visitor analytics) |

## Features
- **Serverless:** No backend code to maintain.
- **Offline-First:** Static HTML/JS frontend on Cloudflare.
- **AI-Powered:** Automatic crisis report analysis via OpenRouter/Gemini.
- **Live Updates:** Dashboard refreshes every 60 seconds.
- **Micro-Frontend:** Extremely lightweight (<500KB) for 2G networks.
- **Self-Hosted CORS:** No dependency on third-party CORS proxies (corsproxy.io, allorigins).
- **Analytics:** Real-time visitor tracking with device/OS/country breakdown.

## Tech Stack
- **Frontend:** HTML5, Tailwind CSS, Leaflet.js, PapaParse
- **Automation:** ActivePieces Cloud
- **AI:** OpenRouter API (Google Gemini Flash)
- **Database:** Google Sheets (Published CSV)
- **Hosting:** Cloudflare Workers

## Project Structure

```
Smart-Defense-Radar/
├── index.html          # Main dashboard
├── analytics.html      # Analytics dashboard
├── data.csv            # Offline fallback data
├── src/
│   └── index.js        # Cloudflare Worker (CORS proxy + static assets)
├── assets/
│   ├── tailwind.js
│   ├── papaparse.js
│   ├── leaflet.js
│   └── leaflet.css
├── wrangler.jsonc      # Cloudflare Workers config
├── n8n-workflows/      # n8n workflow exports (reference)
│   ├── tg-monitor-workflow.json
│   └── SETUP-GUIDE.md
└── readme.md
```

## Deployment

### Cloudflare Workers
```bash
npx wrangler deploy
```

### GitHub
```bash
git push origin main
```

## How It Works

1. **Data Collection:** ActivePieces monitors `@khozkhabar` Telegram channel via RSS
2. **AI Analysis:** Each post is analyzed by OpenRouter/Gemini to extract:
   - Topic (امدادی, زیرساخت, شهری, etc.)
   - Priority (High/Medium/Low)
   - Recommended action
   - Location
3. **Storage:** Structured data is written to Google Sheets
4. **Display:** Frontend fetches CSV from Worker proxy and renders on interactive map
5. **Analytics:** Visitor data tracked via ActivePieces webhook

---
*Status: Production | Role: Product Architect*

<div dir="rtl">

## درباره سامانه (نسخه فارسی)

**رادار هوشمند پدافند غیرعامل**
یک سامانه مدیریت بحران و آگاهی وضعیت که برای شرایط اضطراری و قطعی اینترنت طراحی شده است.

**معماری:**
۱. **جمع‌آوری:** کانال تلگرام @khozkhabar از طریق RSS مانیتور می‌شود.
۲. **پردازش:** هوش مصنوعی (OpenRouter/Gemini) اولویت، موضوع و محله را استخراج می‌کند.
۳. **پایگاه داده:** گوگل شیت (به عنوان دیتابیس سریع و همیشه آنلاین).
۴. **نمایش:** نسخه سبک و کلاینت‌ساید روی نقشه تعاملی.
۵. **میزبانی:** Cloudflare Workers (سرورلس).

**ویژگی‌ها:**
* بدون نیاز به نگهداری سرور (Serverless).
* مقاوم در برابر قطعی اینترنت (Offline-First).
* تحلیل خودکار با هوش مصنوعی.
* داشبورد تحلیل رفتار کاربران.
* هزینه نگهداری: ۰ تومان.

</div>
