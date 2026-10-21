# Nap Website

Nap is a native app for building with coding agents: open a project, choose an agent, chat, and review code changes in the app. This repository contains the dark product website, UI preview, liquid cursor interaction, and blog articles.

## Pages

- `/` — Product landing page.
- `/waitlist` — Name and email signup, saved to Supabase.
- `/about` — Factual product overview and coding workflow.
- `/blogs` — Blog listing.
- `/blogs/hello-nap` — Why We Started.
- `/blogs/why` — Why This?

The former documentation and application pages remain removed. Public pages work without Supabase; waitlist submissions require `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the server environment. The existing `wishlist_saves` table is defined in `supabase/migrations/20260824170000_create_wishlist_saves.sql`. Duplicate emails are ignored without modifying existing signups. Missing configuration or storage failures return an error instead of a false confirmation. No confirmation email is sent by this form.

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
- Download button: `app/components/nap-download.tsx`
- Liquid interaction: `app/components/liquid-field.tsx`
- Site styles: `app/contrast.css`
- Blog pages: `app/blogs/`
- Static assets: `public/`
- SEO configuration: `app/lib/seo.ts`
- Crawler routes: `app/sitemap.ts` and `app/robots.ts`
- Domain launch checklist: `docs/seo-launch.md`

The download button links to the existing GitHub release asset. Release and installation verification are currently deferred.

Images are served from content-versioned WebP assets. The cursor effect draws native canvas contours in trail-sized surfaces, avoiding SVG blur/threshold filters. It pauses for hidden tabs, reduced motion, and touch-only devices, releases surfaces after the trail expires, and follows the display refresh rate up to 120 Hz. Canvas backing stores are capped at 2048 pixels per side and approximately two megapixels per layer. Sustained slow frames reduce the particle count and refresh rate; continued severe slowdown disables the decorative effect for that mount. Unsupported blending/Path2D, blocked canvases, failed optional chunk loads, and drawing errors fall back to the normal page. Lost canvas contexts pause the effect until restored.

Internal links use prefetched client navigation. Product screenshots use build-time responsive WebP variants, avoiding on-demand image resizing. Content-versioned WebP files have immutable year-long caching. The homepage screenshot loads eagerly; article screenshots and logos load lazily. Agent logos use native lazy-loaded images, so they add no image-component hydration code. The decorative cursor module downloads only after eligible mouse/pen movement, never during idle page loading; data-saving connections skip it. The favicon keeps all nine original resolutions with lossless PNG compression inside its ICO container.

Run `npm test` for liquid contour, image-outline clipping, animation lifecycle, input-mode, and cleanup regression checks. These checks do not replace real-device testing across Safari, Chrome, Edge, and Firefox. No universal browser/device guarantee is implied; the native cursor and all content remain usable when the decoration is unavailable.

SEO metadata, social cards, publisher entities, and breadcrumb markup are centralized in `app/lib/seo.ts`. Run `npm run check:seo` after a production build to check the actual rendered pages and crawler files. Optional Google/Bing ownership verification tokens are described in `.env.example`; account verification and sitemap submission still happen in the search providers' consoles. See `docs/seo-launch.md` for the remaining external steps.

The About page supplies a readable product definition for people and retrieval agents. Article bylines and related-reading links connect it to the existing blog posts. The rendered SEO checker also verifies that every sitemap page is reachable from the homepage and that the About definition matches its app schema. Unknown product details remain unpublished until confirmed.
