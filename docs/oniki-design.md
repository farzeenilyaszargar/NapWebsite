# Oniki design

## Branch and direction

Created directly from `main` (`4b7ad5d`), not from `potato`. The owner's requirements are a centered product paragraph, Onboard Your Agents with Codex/Anthropic/Cursor logos, a direct download, three large feature boxes, a scenic Try Nap section, and a footer containing only copyright and the X link.

Reviewed [Keiki](https://onkeiki.com/) and [Cursor](https://cursor.com/) on November 1, 2026. Keiki informs the single-size paragraph and quiet action hierarchy; Cursor informs the large product-led feature panels. Nap copy, code, actual app screenshots, and brand identity remain its own. Competitor testimonials, assets, product capabilities, and pricing are not copied.

The visual system uses Fustat, white surfaces, near-black controls, neutral feature panels, small Lucide icons, and an existing original halftone coastal arch in the closing section. No gradient hero, inflated counters, invented endorsements, fake interactive app controls, or hidden keyword block is included. Download controls are native anchors and require no client-side event handler to work.

## Public download

The owner explicitly confirmed enabling the public macOS download. `app/lib/releases.ts` holds the stable latest-release asset URL:

https://github.com/farzeenilyaszargar/NotNap/releases/latest/download/NotNap-macos.dmg

Verification: the GitHub latest-release API lists `v0.0.4-notnap.3` and its `NotNap-macos.dmg` asset. A HEAD request following redirects reaches HTTP 200 with an attachment header, 16,016,277 bytes. No installer is executed or mounted during website verification. The guide explains the legacy file/repository name and links to Apple's installation-safety reference. No code-signing, notarization, minimum OS, pricing, automatic-update, or performance guarantee is invented.

Metadata, software schema, guide content, and primary actions all describe the same public Mac download. The previous signup form remains an updates list; its API, duplicate handling, server credentials, and Supabase table are unchanged.

## Assets

- App screenshots: existing responsive `nap-agent-workspace-*` WebPs, with real project/conversation/review crops in feature panels. Screenshot text is product imagery, not a live UI or an independently verified performance claim.
- Ghost: the user-supplied Group 595 source from the existing `potato` assets, copied unchanged into this branch and rendered black with CSS.
- Coastal arch: the existing original `nap-halftone-arch.webp` from the prior design, copied unchanged. It was generated for Nap, not taken from a competitor's site.
- Codex and Cursor: existing supplied site logos.
- Anthropic monogram: [Simple Icons primary repository](https://github.com/simple-icons/simple-icons/blob/develop/icons/anthropic.svg). Used to identify the provider, not to imply endorsement.
- Apple mark: [Wikimedia Commons asset](https://commons.wikimedia.org/wiki/File:Apple_logo_black.svg). Only its viewport metadata is normalized; the path is unchanged. Used to identify macOS, not as Nap's own brand.
- UI icons: Lucide React. Apple is the actual brand mark rather than an emoji or generic fruit icon.

Third-party marks identify platforms/providers and remain their respective owners' marks.

## Verification scope

Run `npm run build`, `npm test`, and `npm run check:seo`. Browser QA covers the actual rendered pages and native download-link behavior, responsive screenshots/media, all three panels, Apple marks, the minimal footer, and no overflow. The download endpoint is checked with HEAD; browser click tests may substitute an attachment response so tests do not repeatedly retrieve installers. Those mocks do not verify that an installed app works on a Mac. Real release testing and conversion measurement remain separate from website testing.

Completed checks: production build; all 25 tests; rendered SEO checks on seven canonical routes; 40 browser page checks across 320, 390, 768, 1440, and 1920px viewports; no broken rendered images or horizontal overflow; native attachment events for header/hero/closing downloads; product content and download links without JavaScript; mocked updates-form invalid email, failure, retry, success, and focused confirmation. No browser page errors were recorded. Targeted ESLint has no errors; native optimized-image elements retain the framework's advisory image warnings.
