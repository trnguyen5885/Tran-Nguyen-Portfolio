# Nguyen Tran Trung Nguyen — Mobile Engineer Portfolio

A bilingual two-page portfolio for a Mobile Engineer, featuring professional experience, skills, education, and MDX case studies for VietABank ezSHOP and MyVNG. The site includes accessible editorial motion, dark mode, SEO metadata, and automated tests.

## Start locally

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`; the root redirects to `/en` or `/vi` based on the visitor's preferred language.

## Site structure

- `/[locale]` — Home, about, skills, experience, education, and contact.
- `/[locale]/showcase` — Project case studies and selected local technical demos.

Legacy About, Contact, Projects, and project-detail URLs redirect to the matching Home section or Showcase anchor.

## Update the content

1. Edit `src/content/profile.ts` to update contact links, experience, education, or skills.
2. Add project metadata in `src/content/projects.ts` and matching `en.mdx` and `vi.mdx` files under `src/content/projects/<slug>/`. Set `kind` to `"product"` for product case studies or `"technical-demo"` for standalone technical showcases.
3. Add project covers/posters to `public/images/` and MP4/WebM technical demos to `public/videos/` when you have shareable assets.
4. Replace `public/nguyen-tran-trung-nguyen-cv.pdf` and update `resumeUrl` in the profile if you want to publish a newer version of the résumé.
5. Set `NEXT_PUBLIC_SITE_URL` to the production domain before deployment.

All profile and project metadata is validated with Zod during import/build. A new project requires one metadata registry entry and one MDX file per locale; `cover` can stay `null` until you have a real asset, and UI components do not need to change.

Local videos use `controls`, `playsInline`, `preload="metadata"`, and no autoplay. When a recording is meant to showcase a reusable module or SDK instead of the whole product, set a specific `demoVideo.title` for that artifact. For demos with narration, add English and Vietnamese `.vtt` tracks and configure `demoVideo.captions`; use `null` only for silent videos.

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

GitHub Actions runs linting, type checks, unit tests, and a production build for pushes and pull requests targeting `main`.

## Deployment

Import the repository into Vercel, set `NEXT_PUBLIC_SITE_URL`, and deploy with the default Next.js settings. No database or server-side secret is required.
