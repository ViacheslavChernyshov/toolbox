# 🌐 Toolbox Website & Landing Page

Official high-performance, multilingual showcase website for the **Toolbox** Telegram Bot.

---

## ⚡ Features

- **Cyber-Swiss-Army Station Design**: High-tech slate/graphite palette with glowing neon accents, ambient mesh canvas, and fluid micro-animations.
- **10 Fully Supported Languages (i18n)**:
  - 🇷🇺 Русский (`ru`)
  - 🇬🇧 English (`en`)
  - 🇺🇦 Українська (`uk`)
  - 🇩🇪 Deutsch (`de`)
  - 🇪🇸 Español (`es`)
  - 🇮🇹 Italiano (`it`)
  - 🇵🇹 Português (`pt`)
  - 🇮🇩 Bahasa Indonesia (`id`)
  - 🇻🇳 Tiếng Việt (`vi`)
  - 🇮🇷 فارسی (`fa` with full RTL layout support)
- **Interactive Bot Simulator**: Test link extractions (TikTok no-watermark, YouTube 4K, Reels), Whisper AI voice notes, video compression, and format conversions in the browser.
- **Interactive Before/After Compression Slider**: Visual split-view of two-pass H.265 compression efficiency.
- **1,700+ Supported Platforms Radar**: Filter by video, music, social, cloud, and live search.
- **Blog & Changelog Feed**: Announce updates, new releases, and patches.
- **Zero Build Dependencies**: Pure HTML5, Vanilla CSS3, and Modular Vanilla JS. Blazing fast (100/100 Lighthouse) and instantly deployable to **GitHub Pages**.

---

## 🚀 Local Preview

To test locally, run any HTTP server in this directory:

```bash
# Python 3
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

## 📦 Deploying to GitHub Pages

1. Initialize git in this directory and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: initial Toolbox website with 10 languages"
   git branch -M main
   ```
2. Connect to your GitHub repository:
   ```bash
   git remote add origin https://github.com/ViacheslavChernyshov/Toolbox.git
   git push -u origin main
   ```
3. In GitHub repo **Settings -> Pages**:
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)`
   - Save. Your site is live!
