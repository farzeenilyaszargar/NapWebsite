# Nap Website

Nap is a native app for building with coding agents: open a project, choose an agent, chat, and review code changes in the app. This repository contains the light product website, UI preview, liquid cursor interaction, and blog articles.

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
- Download CTA (opens the waitlist): `app/components/nap-waitlist-cta.tsx`
- Ghost logo in ink: `app/components/nap-logo.tsx` (`public/nap-ghost-ink-*.webp`)
- Classic Mac OS look: `app/components/mac-window.tsx` (System 7 windows with striped title bars, draggable by the title bar with a mouse), `app/components/menu-clock.tsx` (local time in the menu bar), 1-bit ghost icons in `public/nap-ghost-menu-*.png` and `public/nap-ghost-icon-*.png`, and pixel icons from `pixelarticons` (MIT). The desktop pattern and arrow cursor are inline SVG in `app/contrast.css`.
- Type: Pixelify Sans (menus, title bars, buttons, headlines), Instrument Sans (body), and IBM Plex Mono (code), loaded in `app/layout.tsx`; icons from `lucide-react`
- Shared footer: `app/components/nap-footer.tsx`
- Liquid interaction: `app/components/liquid-field.tsx`
- Site styles: `app/contrast.css`
- Blog pages: `app/blogs/`
- Static assets: `public/`
- SEO configuration: `app/lib/seo.ts`
- Crawler routes: `app/sitemap.ts` and `app/robots.ts`
- Domain launch checklist: `docs/seo-launch.md`
- Search and AI discovery guide: `docs/search-discovery.md`

The homepage leads to the download: a 1-bit System 7 desktop: the headline and "Download for Mac" in a window, a Finder-style "Works with" window, the app screenshot in its own window, three feature windows, and a closing alert dialog with the download button. The header has only the Blogs link; the footer is one line with the copyright and "Find Us On X". Entrance and scroll-reveal motion is CSS-only and switches off with reduced motion. Until a public build exists, the button and the header's Download link open `/waitlist`, and the note under the button says so. Release and installation verification remain deferred.

Images are served from content-versioned WebP assets. The cursor effect draws native canvas contours in trail-sized surfaces, avoiding SVG blur/threshold filters. It pauses for hidden tabs, reduced motion, and touch-only devices, releases surfaces after the trail expires, and follows the display refresh rate up to 120 Hz. Canvas backing stores are capped at 2048 pixels per side and approximately two megapixels per layer. Sustained slow frames reduce the particle count and refresh rate; continued severe slowdown disables the decorative effect for that mount. Unsupported blending/Path2D, blocked canvases, failed optional chunk loads, and drawing errors fall back to the normal page. Lost canvas contexts pause the effect until restored.

Internal links use prefetched client navigation. Product screenshots use build-time responsive WebP variants, avoiding on-demand image resizing. Content-versioned WebP files have immutable year-long caching. The homepage screenshot is preloaded with the same responsive sizes as the rendered image; article screenshots and logos load lazily. Agent logos use native lazy-loaded images, so they add no image-component hydration code. The decorative cursor module downloads only after eligible mouse/pen movement, never during idle page loading; data-saving connections skip it. The supplied Nap icon is available as a multi-resolution ICO (16–256px), a browser PNG, a 180px Apple touch icon, and 192px/512px app icons in the web manifest. All versions are generated from the same artwork.

All routes use Next.js's experimental CSS inlining to avoid blocking stylesheet requests on first visits. Analytics initialization waits for page load and browser idle time; the X pixel uses `lazyOnload`. Explicit signup and error events still initialize analytics on demand. Inline styles increase HTML size and do not benefit from separate stylesheet caching on repeat full-page visits.

Run `npm test` for liquid contour, image-outline clipping, animation lifecycle, input-mode, and cleanup regression checks. These checks do not replace real-device testing across Safari, Chrome, Edge, and Firefox. No universal browser/device guarantee is implied; the native cursor and all content remain usable when the decoration is unavailable.

SEO metadata, social cards, publisher entities, and breadcrumb markup are centralized in `app/lib/seo.ts`. Run `npm run check:seo` after a production build to check the actual rendered pages and crawler files. Optional Google/Bing ownership verification tokens are described in `.env.example`; account verification and sitemap submission still happen in the search providers' consoles. See `docs/seo-launch.md` for the remaining external steps.

SEO work preserves the approved homepage design. Product information remains in the existing workflow copy and articles. The rendered SEO checker verifies metadata, structured product facts, crawler rules, and that every public content page is reachable from the homepage, with an explicit exception for the standalone `/apply` page. Unknown product details remain unpublished until confirmed.

## Mobile layout

Phones and tablets use responsive spacing, stacked content and forms, and larger reading text. The Download button is available on desktop, phones, and tablets and opens the waitlist. The 404 home button also stays visible. The liquid renderer is requested only on a viewport wider than 900px with a fine primary pointer and hover support; switching out of that mode unmounts it and removes its pointer activation listener. Touch input, reduced motion, and data-saving mode never activate it.
