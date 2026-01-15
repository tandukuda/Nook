# Nook

A local-first browser start page designed to be calm, fast, and opinionated.
Prioritizes zero setup, zero accounts, and zero backend dependencies.

## ✨ Features (MVP)

### 🔍 **Search Hub**
* Central search input with engine switching
* **Bang redirects** for instant navigation (e.g., `!yt cats` → YouTube search)
* Tab/Shift+Tab to cycle through search engines
* Built-in engines: Google, YouTube, DuckDuckGo, Brave, GitHub, Reddit, Wikipedia

### 🚀 **Smart Shortcuts**
* Visual grid of your favorite sites
* Drag-and-drop reordering
* Custom icons (emoji support)
* One-click editing

### 🎨 **Customization**
* Rose Pine Moon color palette (customizable)
* Theme overrides for background and accent colors
* Toggle visibility of widgets
* 12h/24h time format
* Optional seconds display

### 🌤️ **Live Weather**
* Current temperature for your location
* Powered by Open-Meteo (no API key needed)
* 30-minute caching for performance
* Offline detection with last-known data

### 🔒 **Privacy First**
* **100% local** - all data stored in `localStorage`
* No tracking, no analytics, no telemetry
* No database, no authentication
* Works completely offline (except weather)

---

## 🎯 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Cycle search engines (forward) |
| `Shift+Tab` | Cycle search engines (backward) |
| `Enter` | Submit search |
| `Escape` | Clear input (or blur if empty) |
| `Cmd/Ctrl + ,` | Open settings |
| Any letter | Auto-focus search input |

---

## 🎬 Bang Syntax Examples

Bangs let you search specific sites instantly:

```
!yt cats           → Search YouTube for "cats"
!gh react          → Search GitHub for "react"
!r programming     → Search Reddit for "programming"
!w albert einstein → Search Wikipedia
!yt                → Go directly to YouTube
```

Available bangs:
- `!yt` - YouTube
- `!gh` - GitHub  
- `!r` - Reddit
- `!w` - Wikipedia

You can add custom bangs in Settings!

---

## 🛠️ Tech Stack

* **Next.js 14** (App Router)
* **TypeScript**
* **Tailwind CSS**
* **Zustand** (State Management)
* **Lucide Icons**

---

## 🚀 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tandukuda/nook.git
   cd nook
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy (zero configuration needed)
4. Set as your browser's homepage

### Other Platforms

Nook is a static Next.js app and works on:
- Netlify
- Cloudflare Pages
- GitHub Pages (with `next export`)
- Any static hosting

**Build command:**
```bash
npm run build
```

---

## 🗺️ Roadmap

### ✅ Completed (v1.0)
- [x] Search hub with bang redirects
- [x] Shortcuts with drag-and-drop
- [x] Weather widget with caching
- [x] Clock with customizable format
- [x] Settings panel
- [x] Keyboard-first navigation
- [x] Theme customization

### 🔮 Planned Features
- [ ] Bookmark import (Chrome/Firefox)
- [ ] Time-based greetings
- [ ] Custom location for weather
- [ ] Export/import settings
- [ ] Additional widgets (notes, calendar)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

Copyright (c) 2026 tandukuda

---

## 🙏 Credits

* **Design Inspiration:** Rose Pine theme
* **Icons:** Lucide React
* **Weather Data:** Open-Meteo API

---

## 💡 Philosophy

Nook is built on three principles:

1. **Local-first:** Your data stays on your device
2. **Calm technology:** No notifications, no distractions
3. **Power + simplicity:** Advanced features that stay out of your way

This is a **launch surface**, not a dashboard. Get where you need to go, then get out of the way.

---

**Made with ☕ by [tandukuda](https://github.com/tandukuda)**
