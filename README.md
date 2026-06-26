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
- `/[locale]/showcase` — Project case studies and local demo videos.

Legacy About, Contact, Projects, and project-detail URLs redirect to the matching Home section or Showcase anchor.

## Update the content

1. Edit `src/content/profile.ts` to update contact links, experience, education, or skills.
2. Add project metadata in `src/content/projects.ts` and matching `en.mdx` and `vi.mdx` files under `src/content/projects/<slug>/`.
3. Add project covers/posters to `public/images/` and MP4/WebM demos to `public/videos/`.
4. Replace `public/nguyen-tran-trung-nguyen-cv.pdf` and update `resumeUrl` in the profile if you want to publish a newer version of the résumé.
5. Set `NEXT_PUBLIC_SITE_URL` to the production domain before deployment.

All profile and project metadata is validated with Zod during import/build. A new project requires one metadata registry entry and one MDX file per locale; UI components do not need to change.

Local videos use `controls`, `playsInline`, `preload="metadata"`, and no autoplay. For demos with narration, add English and Vietnamese `.vtt` tracks and configure `demoVideo.captions`; use `null` only for silent videos.

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
