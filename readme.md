# Smart Civil Defense Radar (Crisis Management System)

A serverless, real-time situational awareness dashboard designed for civil defense and emergency triage in low-bandwidth environments.

> **Live Demo:** https://smart-defense-radar.optemos67.workers.dev/
>
> **Note:** The user interface is localized in **Persian (Farsi)** for the Civil Defense exhibition in Iran.

## Architecture

```
Telegram @khozkhabar → n8n Cloud (RSS poll/hr) → OpenRouter AI → Google Sheets → CF Workers
Visitors → ActivePieces webhook → Google Sheets (analytics tab) → analytics.html
```

### Components
| Layer | Technology | Purpose |
|---|---|---|
| **Data Source** | Telegram @khozkhabar | Crisis reports from Khuzestan |
| **Backend** | n8n Cloud (free tier) | RSS monitoring + AI analysis |
| **AI** | OpenRouter (Gemini Flash) | Extract priority, topic, location from posts |
| **Database** | Google Sheets (Published CSV) | Zero-latency structured storage |
| **CORS Proxy** | Cloudflare Worker (`/api/data`) | Reliable CSV fetching |
| **Frontend** | HTML5 + Tailwind + Leaflet.js | Client-side dashboard |
| **Analytics** | ActivePieces webhook | Visitor tracking |
| **Hosting** | Cloudflare Workers | Serverless static hosting |

## Features
- **Serverless:** No backend code to maintain.
- **Offline-First:** Static HTML/JS frontend on Cloudflare.
- **AI-Powered:** Automatic crisis report analysis via OpenRouter/Gemini.
- **Live Updates:** Dashboard refreshes every 60 seconds.
- **Micro-Frontend:** Extremely lightweight (<500KB) for 2G networks.
- **Self-Hosted CORS:** No dependency on third-party CORS proxies.

## Tech Stack
- **Frontend:** HTML5, Tailwind CSS, Leaflet.js, PapaParse
- **Backend:** n8n Cloud (workflow automation)
- **AI:** OpenRouter API (Google Gemini Flash)
- **Database:** Google Sheets (Published CSV)
- **Hosting:** Cloudflare Workers

## n8n Workflow Setup
See `n8n-workflows/SETUP-GUIDE.md` for step-by-step instructions.

1. Sign up at https://app.n8n.cloud (free)
2. Import `n8n-workflows/tg-monitor-workflow.json`
3. Add OpenRouter + Google Sheets credentials
4. Activate the workflow

---
*Status: Production | Role: Product Architect*

<div dir="rtl">

## درباره سامانه (نسخه فارسی)

**رادار هوشمند پدافند غیرعامل**
یک سامانه مدیریت بحران و آگاهی وضعیت که برای شرایط اضطراری و قطعی اینترنت طراحی شده است.

**معماری:**
۱. **جمع‌آوری:** کانال تلگرام @khozkhabar هر ساعت چک می‌شود.
۲. **پردازش:** هوش مصنوعی (OpenRouter/Gemini) اولویت، موضوع و محله را استخراج می‌کند.
۳. **پایگاه داده:** گوگل شیت (به عنوان دیتابیس سریع و همیشه آنلاین).
۴. **نمایش:** نسخه سبک و کلاینت‌ساید روی نقشه.
۵. **میزبانی:** Cloudflare Workers (سرورلس).

**ویژگی‌ها:**
* بدون نیاز به نگهداری سرور (Serverless).
* مقاوم در برابر قطعی اینترنت (Offline-First).
* تحلیل خودکار با هوش مصنوعی.
* هزینه نگهداری: ۰ تومان.

</div>
