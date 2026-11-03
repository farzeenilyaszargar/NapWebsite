# Performance audit: 4 November 2026

## Scope

Optimize loading without changing visible copy, blogs, layout, typography, or image resolution. Baseline: commit `400b3fd`. The homepage title remains `Nap | The Interface For All Your Agents`.

## Changes

- Losslessly compress the header logo: 36,496 to 21,634 bytes (40.7% smaller). The parallel-agents screenshot also saves 336 bytes. Already-efficient image encodings are retained when recompression would be larger.
- Give screenshots, article crops, logos, PWA icons, and the Apple SVG content-hashed URLs with one-year immutable caching. Original URLs remain available for compatibility.
- Preload the actual homepage LCP background with matching responsive image selection. Below-fold decorative images retain lazy loading and low fetch priority.
- Avoid prefetching the current page from the home and blog-index navigation.
- Reuse the load/idle analytics scheduler for the existing X pixel instead of shipping the generic script component. Tracking ID and conversion behavior remain unchanged.
- Add a reproducible `npm run optimize:images` pipeline and tests for dimensions, visible pixels, file size, and cache-safe filenames.
- Update Next.js and its ESLint configuration to 16.4.5 and Sharp to 0.35.5. Production dependency audit reports zero known vulnerabilities. The full development dependency audit still reports 16 moderate and 3 high findings; broad toolchain changes are outside this performance pass.

## Verification

- Production build, TypeScript, SEO checks, and all 46 tests pass.
- All 16 full-page comparisons (eight routes at 390px and 1440px) have identical text, titles, geometry, and screenshot pixels versus the baseline. No horizontal overflow or browser page errors.
- 40 responsive page checks pass across 320, 390, 768, 1440, and 1920px, including the 404 page.
- All three download actions and waitlist validation, failure, retry, and success paths pass with mocked endpoints. No real form submissions were made. The homepage also works without JavaScript.
- Focused ESLint has no errors. Native-image advisory warnings remain: these components deliberately use prebuilt responsive, lossless assets.
- All 13 generated asset URLs return the expected immutable cache header. A same-context repeat homepage visit transfers zero bytes for every requested image and font. HTML remains revalidatable.

Cold mobile resource bytes, with third-party traffic blocked consistently in both measurements:

| Route | Before | After | Saved |
| --- | ---: | ---: | ---: |
| `/` | 1,136,471 | 1,109,792 | 26,679 |
| `/blogs` | 788,589 | 764,442 | 24,147 |
| `/blogs/parallel-coding-agents` | 838,884 | 821,975 | 16,909 |
| `/blogs/nap-agentic-development-environment` | 900,112 | 883,539 | 16,573 |
| `/blogs/why-we-made-nap` | 794,280 | 777,707 | 16,573 |
| `/waitlist` | 759,588 | 743,011 | 16,577 |
| `/apply` | 758,516 | 741,943 | 16,573 |
| `/signing-test` | 758,516 | 741,943 | 16,573 |

These are browser resource-body totals after scrolling the page, not initial viewport size or production network timings. HTML is not included in these totals. No changes to visible content explain the savings.

Lighthouse mobile lab results vary with third-party work and simulated throttling. The homepage measured 91 before; post-change runs ranged from 90 to 97, with LCP around 2.6-3.4 seconds. Do not treat the best run as a guaranteed improvement or a real-user Core Web Vitals result. The text-led routes generally score 97-100 with approximately 0.8-1.0 second LCP. Local TBT is not field INP.

The final Next.js 16.4.5 run scored 90 on the homepage (FCP 835ms, LCP 3,448ms, TBT 132ms); all seven other tested routes scored 100, with LCP 781-843ms. The homepage's visual background remains the main LCP opportunity. This pass proves smaller transfers and correct caching, not a consistent homepage LCP improvement.

## Remaining optimizations

1. **Background photography:** the large photos dominate homepage bytes. Same-resolution lossy AVIF and additional responsive sizes could help, but alter pixel values. Lossless AVIF candidates were larger than the existing WebP files. This pass does not apply a quality tradeoff without approval.
2. **Analytics cost:** PostHog and X still load after the page settles. Narrowing SDK features, sampling, or removing integrations could reduce CPU/network work further, but requires a tracking decision. No integrations were silently removed.
3. **Production measurements:** collect mobile p75 LCP, INP, and CLS after deployment, grouped by route and device. Use repeated lab runs and field data before claiming a sustained improvement.
4. **CDN verification:** confirm deployed hashed-asset cache headers and monitor cache hit rates. HTML, forms, and release manifests must not receive immutable asset caching.
5. **Original assets:** old filenames remain intentionally available. Removing unused originals later can reduce repository/deployment storage, but does not reduce page transfers because pages no longer request them.
6. **Development tooling:** review the remaining development-only dependency advisories separately, with compatibility tests instead of a forced audit upgrade.
