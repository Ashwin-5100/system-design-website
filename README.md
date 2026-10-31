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
