# Megha Saha — Portfolio

Personal portfolio site for Megha Saha, a UI/UX designer and MCA candidate
(Storage & Cloud Computing) at JAIN University, Bengaluru. Built with
React + Vite.

**Live:** https://meghasaha.vercel.app

## Features

- Full-viewport video hero with separate dark/light clips, graceful fallback
  if the light-mode clip isn't available
- Light/dark theme toggle (persisted in `localStorage`), with theme-aware
  glass/blur, nav chrome, and hero scrim/text contrast
- Scroll-spy navigation that highlights the section actually in view
- Rotating role text in the hero ("UI/UX Designer" / "Cloud Computing" /
  "Web Development")
- Rotating inspirational quotes in the About section
- Content sections built from her resume: About, Skills, Experience,
  Projects, Education, Contact
- Downloadable resume (PDF) linked from the nav
- **Sage** — an AI chat widget (Gemini-backed serverless function) that
  answers visitor questions about Megha, launched via an animated
  voice-reactive orb

## Tech stack

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) 5
- Plain CSS (custom properties for theming, no framework)
- [ogl](https://github.com/oframe/ogl) for the WebGL orb shader
- Vercel serverless function (`api/chat.js`) calling the Gemini API

## Getting started

```bash
npm install
npm run dev       # start the Vite dev server (frontend only)
npm run build      # production build to dist/
npm run preview    # preview the production build locally
```

To run the chat feature locally you need the Vercel CLI and a
`GEMINI_API_KEY` environment variable set in the linked Vercel project
(`vercel env add GEMINI_API_KEY development`), then:

```bash
vercel dev         # serves the frontend AND /api/chat together
```

## Project structure

```
api/chat.js          serverless function — calls Gemini, returns Sage's reply
public/              static assets (hero videos, resume PDF, photo, favicon)
src/
  components/         one component + its CSS per section (Hero, About, ...)
  styles/globals.css  design tokens, reset, shared utility classes
  theme.jsx           light/dark theme context
  App.jsx             assembles the page
```

## Deployment

Deployed on [Vercel](https://vercel.com). Framework preset: **Vite**.
Build command: `npm run build`. Output directory: `dist`.
Requires a `GEMINI_API_KEY` environment variable set in the Vercel project
for the Sage chat widget to work.
