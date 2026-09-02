# CLAUDE.md

Guidance for Claude Code (and future contributors) working in this repository.

## What this is

Personal portfolio site for Etienne Senigout, deployed to GitHub Pages at
`hpn4.github.io`. Single-page React app, client-side routed, no backend.

Goal (as of Sept 2026): move away from the current "space / rotating orbits"
visual theme — it reads as a student side-project rather than a professional
portfolio — toward something that signals seriousness to recruiters,
specifically for **DevOps-oriented** roles. Content will later be populated
from the owner's GitHub projects (via the GitHub API, using the token in
`.token` — **never read or print `.token` directly**; it is gitignored and
must stay out of context, commits, and logs).

## Stack

- **React 19** + **TypeScript** + **Vite 7**
- **react-router-dom v7** (`BrowserRouter`, client-side routes only)
- No CSS framework — plain CSS files colocated with components (`Foo.tsx` + `Foo.css`)
- No state management library, no test framework configured yet
- Deployed via `gh-pages` npm package to GitHub Pages (`npm run deploy`)
- Font: custom `Astro` font (`public/fonts/astro.ttf`) + Google Font `Nunito`

## Structure

```
src/
  App.tsx              Router setup, mounts StarsBackground + Routes
  main.tsx             Entry point
  index.css            Global styles / font-face
  components/
    StarsBackground.tsx  Canvas starfield + blue halo, fixed full-page bg (z-index -1)
    BackCircle.tsx       "Back" nav widget used on sub-pages (orbits + link)
    BackCircle.css
    EnergyBall.tsx        Canvas particle-link effect (currently unused/hidden, display:none)
    Projects.tsx          Reusable project-page building blocks: Banner, Section, Paragraph
    Projects.css
    ZoomableImage.tsx     Click-to-zoom image component
    ZoomableImage.css
    text/
      ButtonText.tsx      Underline-on-hover text button
      ButtonText.css
  home/
    HomePage.tsx          Landing page: HomeCircle + nav menu (About/Projects/Notes/Skills/Research)
    HomePage.css
    HomeCircle.tsx         SVG orbiting-circles animation with name+role centered in it
    HomeCircle.css         @keyframes rotate, .orbit-group(.reverse)
    MenuHome.tsx
  projects/
    ProjectsPage.tsx       Grid/list of project thumbnails, links to /project/:id
    ProjectsPage.css
    Tinyx.tsx              Project detail page (uses Banner/Section/Paragraph + ZoomableImage)
    Inde.tsx               Project detail page ("ButterflyKiller")
    CaseAI.tsx             Project detail page
public/
  fonts/astro.ttf
  logo/                  Tech stack icons used by <TechIcon> in Projects.tsx (local fallback)
  projects/<name>/*.png  Screenshots referenced by each project detail page
  timeloop-visitor.png   Favicon
```

### Routing (`src/App.tsx`)

```
/                    HomePage
/projects            ProjectsPage
/project/tinyx       Tinyx
/project/inde        Inde
/project/caseai      CaseAI
```

### Current visual theme (the thing being reworked)

- Black background, animated canvas starfield (`StarsBackground.tsx`) with a
  pulsing blue radial halo bottom-right.
- Name/role/back-navigation rendered inside hand-drawn SVG "orbit" rings that
  rotate via CSS animation (`HomeCircle.tsx`, `BackCircle.tsx`, shared
  `.orbit-group` keyframes in `HomeCircle.css`).
- Accent color `#3477eb` (blue) used for role text and the `EnergyBall` particle effect.
- `Astro` display font for headings/titles, `Nunito`/system sans for body.

Project detail pages (`Tinyx.tsx`, `Inde.tsx`, `CaseAI.tsx`) already have a
reasonably clean, reusable structure via `Banner` / `Section` / `Paragraph`
in `components/Projects.tsx` — a redesign should keep/extend this pattern
rather than rewriting each project page from scratch.

### Known rough edges

- Sizing/layout logic uses `window.innerWidth`/`innerHeight` read directly in
  render (`HomeCircle.tsx`, `BackCircle.tsx`) rather than CSS/relative units
  — makes resize behavior janky and SSR-unfriendly (not that this app is SSR'd).
  A redesign is a good opportunity to replace this with CSS-driven layout.
  - `Etienne SENIGOUT` / role text is hardcoded as a prop default in `HomeCircle.tsx`.
- Nav items `About`, `Skills`, `Research` in `HomePage.tsx` are rendered but
  not wired to any route or anchor yet.
- `EnergyBall.tsx` is dead code (`display: none` is set, then overridden by
  a duplicate `display: none` in the same style object — not currently mounted anywhere).
- `.token` at repo root holds a GitHub PAT for pulling repo data into the
  portfolio later. It's gitignored. **Do not read, cat, print, or embed its
  contents under any circumstance** — treat it as opaque even when
  implementing the GitHub-import feature; use it only via env var injection
  into whatever script/build step needs it, never inline it in code or logs.

## Commands

```bash
npm run dev       # vite dev server
npm run build     # tsc -b && vite build
npm run lint      # eslint .
npm run preview   # preview production build locally
npm run deploy    # build + publish dist/ to gh-pages branch
```

No test suite is configured. There is no `.nvmrc`; the flake pins the Node
version instead (see below).

## Dev environment (Nix)

A `flake.nix` is provided so Claude Code (and anyone else) gets a
reproducible Node/npm toolchain without touching the host system:

```bash
nix develop        # drops into a shell with node + npm on PATH
```

If direnv is available, `direnv allow` will auto-load it via `.envrc`.

## Conventions to follow when editing

- Keep the `ComponentName.tsx` + `ComponentName.css` colocation pattern.
- Prefer CSS (flexbox/grid/clamp/vw-vh) over JS-computed pixel positions for
  new layout work — don't propagate the `window.innerWidth` pattern.
- Reusable project-page primitives live in `components/Projects.tsx`
  (`Banner`, `Section`, `Paragraph`) — extend these rather than duplicating
  markup across `Tinyx.tsx` / `Inde.tsx` / `CaseAI.tsx`.
- This is a static site with no secrets baked into the client bundle —
  anything used in a Vite build is public. Keep the GitHub token server-side
  / build-time only (e.g. a build script run with the token in an env var,
  never `import`-ed or fetched from client code).
