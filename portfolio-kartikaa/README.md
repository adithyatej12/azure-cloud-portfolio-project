# Kartikaa Natarajan — Portfolio

A dark, editorial cloud-engineer portfolio with a hand-drawn/sketchbook visual
layer (custom SVG doodles, handwritten annotations, stroke-draw animations).
Built with React + Vite, plain CSS (component-scoped files, CSS variables for
theming), and no heavy animation libraries.

All resume content (education, experience, projects, skills, publication,
contact links) lives in `src/data/*.js`, separate from the presentational
components, so it's easy to update later without touching markup.

Each project has its own dedicated case-study page at `/projects/:slug`
(e.g. `/projects/resume-screener`), reached by clicking "View case study" on
a project card. Routing is handled by a small dependency-free router in
`src/router/Router.jsx` (History API + `pushState`/`popstate` — no
react-router-dom is installed). If you later add `react-router-dom` to the
project, that file is the only thing that needs to change; `Link`,
`useNavigate`, and `useLocation` already mirror its API.

## 1. Run it locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
cd kartikaa-portfolio
npm install
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`). Open it in
your browser — the dev server hot-reloads as you edit files.

To build a production bundle:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally to sanity-check it
```

## 2. Project case-study pages

`src/pages/ProjectDetail.jsx` is a single reusable page that reads its
content from `src/data/projects.js` based on the `slug` in the URL. To add
or update a project:

1. Add the architecture diagram and any screenshots to
   `src/assets/projects/project-XX/`.
2. In `src/data/projects.js`, import those images and fill in the project's
   `slug`, `title`, `description`, `services`, `purpose`, `whatBuilt`,
   `workflow`, `implementationDetails`, `architectureImage`, and
   `screenshots` (each with a `src` and short `caption`).
3. `ProjectCard.jsx` and `ProjectDetail.jsx` pick this up automatically —
   no markup changes needed for a new project, as long as it's in the
   `projects` array.

There is intentionally no GitHub section on these pages — repos aren't
published yet. Add one back in `ProjectDetail.jsx` once real repo URLs
exist.

## 3. Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. Install the deploy helper: `npm install --save-dev gh-pages`.
3. In `vite.config.js`, set `base: '/your-repo-name/'` (skip this if you're
   using a custom domain or a `username.github.io` repo).
4. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
5. Run `npm run deploy`.
6. In your repo's Settings → Pages, set the source to the `gh-pages` branch.
7. Since project pages are client-side routes (`/projects/:slug`), GitHub
   Pages needs a SPA-fallback trick (a `404.html` that redirects to
   `index.html`) for direct/deep links and refreshes to work. Search
   "spa-github-pages" for the standard snippet if you plan to share direct
   project links.

## 4. Deploy to AWS S3 + CloudFront

1. Build the site: `npm run build` (produces `dist/`).
2. Create an S3 bucket (e.g. `kartikaa-portfolio`), and either:
   - enable **Static website hosting** on the bucket directly, or
   - keep the bucket private and serve it through CloudFront using an
     Origin Access Control (recommended for HTTPS + caching).
3. Upload the contents of `dist/` to the bucket:
   ```bash
   aws s3 sync dist/ s3://kartikaa-portfolio --delete
   ```
4. Create a CloudFront distribution with the S3 bucket as its origin.
   - Set the default root object to `index.html`.
   - Add a custom error response mapping `403`/`404` → `/index.html` with a
     `200` status. **This is required** for the project detail routes
     (`/projects/resume-screener`, etc.) — without it, a direct link or a
     page refresh on a project page will 404 at the S3/CloudFront level
     before React ever loads.
5. (Optional) Point a Route 53 record / your domain at the CloudFront
   distribution and attach an ACM certificate for HTTPS.
6. After future updates, re-run the `aws s3 sync` command and create a
   CloudFront invalidation (`aws cloudfront create-invalidation --distribution-id <id> --paths "/*"`)
   so visitors see the latest build.

## Project structure

```
src/
  components/   Navbar, Hero, About, Skills, Projects, ProjectCard,
                Experience, Publication, Contact, Footer,
                Doodles (SVG library), MarginNote, Reveal
  pages/        Home (the single-page sections), ProjectDetail
                (reusable case-study page + its CSS)
  router/       Router.jsx — dependency-free client-side router
  data/         projects.js, experience.js, skills.js
  hooks/        useScrollReveal, useReducedMotion
  styles/       variables.css (design tokens), global.css
```

## Notes

- All content is sourced directly from the resume/project reports provided
  — no fabricated metrics, certifications, or repo URLs.
- Animations respect `prefers-reduced-motion` throughout.
- The layout is tested down to a 320px viewport with no horizontal scroll.
