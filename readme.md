# 🛡️ Smart Civil Defense Radar (Crisis Management System)

A serverless, real-time situational awareness dashboard designed for civil defense and emergency triage in low-bandwidth environments.

> 🔗 **Live Demo:** https://smart-defense-radar.optemos67.workers.dev/
>
> ⚠️ **Note:** The user interface is localized in **Persian (Farsi)** for the Civil Defense exhibition in Iran.

## 🎯 The Challenge
In disaster zones (earthquakes, floods, conflict), traditional centralized servers often fail or suffer from high latency. Commanders need a way to visualize incoming reports instantly without complex infrastructure.

## 💡 The Solution
I architected a **"Zero-Infrastructure"** stack that relies on distributed cloud services to ensure 99.9% availability with $0 maintenance cost.

### Architecture Flow:
1.  **Data Ingestion (Hybrid):**
    * **Automated:** Monitoring Telegram channels via RSS -> **AI Analysis** (using OpenRouter/Gemini) to extract location & priority.
    * **Manual:** Field reports via Google Forms.
2.  **Processing (Logic):** `Activepieces` (No-Code) orchestrates the data flow, cleanses inputs, and structures the alerts.
3.  **Storage:** Real-time sync to **Google Sheets** (acting as a high-speed database).
4.  **Visualization:** Client-side rendering using `Leaflet.js` & `PapaParse`.

## 🚀 Key Features
- **Serverless:** No backend code to maintain.
- **Offline-First:** Static HTML/JS frontend hosted on Cloudflare/GitHub Pages.
- **Live Updates:** Dashboard updates automatically as soon as data hits the sheet.
- **Micro-Frontend:** Extremely lightweight (<500KB) for 2G networks.

## 🛠 Tech Stack
- **Frontend:** HTML5, Tailwind CSS, Leaflet.js
- **Automation:** Activepieces
- **Database:** Database: Google Sheets (Published CSV) - Zero Latency

---
*Status: Live Prototype | Role: Product Architect*

<div dir="rtl">

## 🇮🇷 درباره سامانه (نسخه فارسی)

**رادار هوشمند پدافند غیرعامل (Smart Civil Defense Radar)**
یک سامانه مدیریت بحران و آگاهی وضعیت (Situational Awareness) که برای شرایط اضطراری و قطعی اینترنت طراحی شده است.

**چالش:** در زمان بحران (زلزله، سیل، جنگ)، سرورهای متمرکز از دسترس خارج می‌شوند یا کند هستند. فرماندهان نیاز به دیدن لحظه‌ای گزارش‌ها روی نقشه دارند.

**راهکار:** معماری "بدون زیرساخت" (Zero-Infrastructure).
۱. **جمع‌آوری:** گزارش‌ها از طریق فرم‌ها یا ربات‌ها جمع‌آوری می‌شوند.
۲. **پردازش:** اتوماسیون Activepieces داده‌ها را تمیز می‌کند.
۳. **پایگاه داده:** گوگل شیت (به عنوان دیتابیس سریع و همیشه آنلاین).
۴. **نمایش:** نسخه سبک و کلاینت‌ساید روی نقشه آفلاین.

**ویژگی‌ها:**
* بدون نیاز به نگهداری سرور (Serverless).
* مقاوم در برابر قطعی اینترنت (Offline-First).
* هزینه نگهداری: ۰ تومان.

</div>
