# ScalePrep (system design website)

Next.js app for the system design interview course. Planning docs live in the sibling folder [`../system-design-website-plan/`](../system-design-website-plan/).

## Run locally (required before every commit)

```bash
cd /Users/ashwin/Desktop/hissab/system-design-website
npm install
npm run lint
npm run build
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or pass `-- --port 3456`).

## Hosted site

Pushes to `main` publish a static export to GitHub Pages:

https://ashwin-5100.github.io/system-design-website/

Local `npm run dev` and `npm run build` stay on the root path. The Pages build sets `GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/system-design-website`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build (CI / pre-commit check) |
| `npm run lint` | ESLint |
| `npm run start` | Serve production build |

## MVP routes

- `/` — landing  
- `/learn` — roadmap  
- `/learn/[slug]` — lessons  
- `/practice` — placeholder  
