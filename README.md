# Nook

A local-first browser start page designed to be calm, fast, and opinionated.
Prioritizes zero setup, zero accounts, and zero backend dependencies.

## Features (MVP)
* **Local-First:** All data stored in `localStorage`. No database, no auth.
* **Search Hub:** Central input with Engine Switching (`Tab`) and Bang redirects (e.g., `!yt`, `!gh`).
* **Design System:** Built on the Rose Pine Moon palette with CSS variables.
* **Shortcuts:** Fully editable grid.
* **Privacy:** No tracking, no analytics.

## Tech Stack
* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* Zustand (State Management)

## Local Development
1.  Clone repo: `git clone https://github.com/tandukuda/nook.git`
2.  Install: `npm install`
3.  Run: `npm run dev`
4.  Open `http://localhost:3000`

## Deployment (Vercel)
1.  Push to GitHub.
2.  Import project to Vercel.
3.  Deploy (No environment variables required).

## License
MIT
