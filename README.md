# Nap Website

## Potato design branch

The `potato` branch uses a white, conversion-focused design with the supplied blue halftone clouds. Fustat and Instrument Serif are self-hosted through `next/font`. The actual app screenshot, colored agent logos, and ghost silhouette remain in use. `app/potato.css` supplies the shared light theme; `app/home-brand.module.css` defines the homepage. The hero explains the product, the keyboard-accessible workspace tabs show real screenshot details, and practical questions address availability before the closing action. See `docs/potato-design.md` for research, asset provenance, design decisions, and measurement limits. The prior dark design is preserved on `dreamcore`.

The owner confirmed that access remains waitlist-only. The primary action is **Join the Mac waitlist**, not a public download. The approved page title and existing Supabase signup API remain unchanged. The hidden keyword block is removed; search-facing content is visible and factual. FAQ markup shares its source with the displayed questions, and `/llms.txt` provides a concise factual product reference without promising AI rankings.

Nap is a native app for building with coding agents: open a project, choose an agent, chat, and review code changes in the app. The page has no animation framework or decorative cursor runtime. Most content is server-rendered; the workspace tabs and waitlist form are small interactive components.

## Pages

- `/` — Product landing page.
- `/apply` — Applications-closed page, shared by direct URL only; no homepage or navigation link.
- `/waitlist` — Name and email signup, saved to Supabase.
- `/blogs` — Topic-based guide index with reading times and publication dates.
- `/blogs/parallel-coding-agents` — Parallel task ownership, Git worktrees, and integration.
- `/blogs/nap-agentic-development-environment` — What Nap is and how to evaluate its workflow.
- `/blogs/nap-download` — Official availability, early access, and installation checks.

The retired `/blogs/hello-nap` and `/blogs/why` URLs permanently redirect to the product-workflow guide. They are excluded from the blog index, article schema, and sitemap. Articles have server-rendered topic jump links and related reading; no client-side table-of-contents library is needed.

The former documentation pages remain removed. Public pages work without Supabase; waitlist submissions require `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the server environment. The existing `wishlist_saves` table is defined in `supabase/migrations/20260824170000_create_wishlist_saves.sql`. Duplicate emails are ignored without modifying existing signups. Missing configuration or storage failures return an error instead of a false confirmation. No confirmation email is sent by the waitlist form. Team applications are currently closed. `/api/apply` returns HTTP 410 and does not save submissions. The historical Supabase application migrations remain available for a future reopening.

## Development

```bash
npm install
npm run dev -- --port 3000
```

Open [localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm run start
```

## Source

- Homepage: `app/page.tsx`
- Shared navigation: `app/components/nap-header.tsx`
- Waitlist CTA: `app/components/nap-waitlist-cta.tsx`
- Workspace preview: `app/components/nap-workflow-preview.tsx`
- Shared theme: `app/potato.css`
- Homepage composition: `app/home-brand.module.css`
- Blog pages: `app/blogs/`
- Static assets: `public/`
- SEO configuration: `app/lib/seo.ts`
- Crawler routes: `app/sitemap.ts` and `app/robots.ts`
- Domain launch checklist: `docs/seo-launch.md`
- Search and AI discovery guide: `docs/search-discovery.md`
- Product reference: `app/llms.txt/route.ts`

The homepage hero and closing CTA both link to `/waitlist`. Downloads are paused; release and installation verification remain deferred.

Images use content-versioned files. The supplied cloud image has responsive 480px, 960px, and 1199px AVIF encodings with WebP fallbacks and matching responsive preload hints. Only the used italic Instrument Serif face is loaded alongside Fustat. The unchanged source silhouette is rendered in black through CSS. Legacy liquid-renderer files and tests remain in the repository for the older branches but are not used by this design.

Internal links use prefetched client navigation. Product screenshots use build-time responsive WebP variants, avoiding on-demand image resizing. Content-versioned WebP files have immutable year-long caching. The homepage screenshot is preloaded with matching responsive sizes; article screenshots and logos load lazily. The app icon and web manifest remain available. The social preview uses the same blue halftone artwork and accurate waitlist wording.

All routes use Next.js's experimental CSS inlining to avoid blocking stylesheet requests on first visits. Analytics initialization waits for page load and browser idle time; the X pixel uses `lazyOnload`. Explicit signup and error events still initialize analytics on demand. Inline styles increase HTML size and do not benefit from separate stylesheet caching on repeat full-page visits.

Run `npm test` for waitlist validation, persistence, analytics loading, conversion deduplication, closed applications, and retained legacy renderer tests. Browser QA additionally checks tab keyboard navigation, FAQ expansion, mobile overflow, and mocked waitlist validation/error/retry/success. These checks do not replace real-device testing across Safari, Chrome, Edge, and Firefox.

SEO metadata, social cards, publisher entities, and breadcrumb markup are centralized in `app/lib/seo.ts`. Run `npm run check:seo` after a production build to check the actual rendered pages and crawler files. Optional Google/Bing ownership verification tokens are described in `.env.example`; account verification and sitemap submission still happen in the search providers' consoles. See `docs/seo-launch.md` for the remaining external steps.

The rendered SEO checker verifies metadata, visible FAQ/schema agreement, structured product facts, crawler rules, and that every public content page is reachable from the homepage, with an explicit exception for the standalone `/apply` page. Unknown product details remain unpublished until confirmed.

## Mobile layout

Phones and tablets use responsive spacing and type, stable workspace tabs, and native form fields at 16px to avoid input-focus zoom. Waitlist actions remain in the main hero and closing section; the mobile header keeps only the logo and Guides link. There are no download buttons. The 404 home button remains available. Browser zoom is not disabled.
