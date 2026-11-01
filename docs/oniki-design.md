# Oniki design

## Branch and direction

Created directly from `main` (`4b7ad5d`), not from `potato`. The owner's requirements are a centered product paragraph, Onboard Your Agents with Codex/Anthropic/Cursor logos, a direct download, three large feature boxes, a scenic Try Nap section, and a footer containing only copyright and the X link.

Reviewed [Keiki](https://onkeiki.com/) and [Cursor](https://cursor.com/) on November 1, 2026. Keiki informs the single-size paragraph and quiet action hierarchy; Cursor informs the large product-led feature panels. Nap copy, code, actual app screenshots, and brand identity remain its own. Competitor testimonials, assets, product capabilities, and pricing are not copied.

The refined visual system uses Geist, white surfaces, navy typography, compact blue controls with 12px corners, small Lucide icons, and original grainy dreamcore photography. The Nap ghost is smaller, and Apple marks sit to the right of download labels. No gradient hero, inflated counters, invented endorsements, fake interactive app controls, or hidden keyword block is included. Download controls are native anchors and require no client-side event handler to work.

Rendered Keiki reference measurements included Geist, a 36px/45px hero at roughly 520px wide, and rounded compact controls. Nap retains the requested centered paragraph container rather than copying Keiki's split hero. The shortened paragraph is justified, 26px desktop and 20px mobile (19px on narrow phones), with natural font kerning and zero CSS letter spacing. Controls are black. The reference's saturated blue/coral film palette informs the original photos, not a copied layout or brand.

The homepage ends inside the alpine image: Try Nap and its download control are vertically and horizontally centered, while copyright and X remain anchored to its bottom edge. There is no separate footer band on the homepage; other routes retain the shared footer. The closing panorama is focused, with no CSS blur; decorative backgrounds behind app imagery retain their soft-focus treatment. Product screenshots and brand marks stay sharp for readability.

## Public download

The owner explicitly confirmed enabling the public macOS download. `app/lib/releases.ts` holds the stable latest-release asset URL:

https://github.com/farzeenilyaszargar/NotNap/releases/latest/download/NotNap-macos.dmg

Verification: the GitHub latest-release API lists `v0.0.4-notnap.3` and its `NotNap-macos.dmg` asset. A HEAD request following redirects reaches HTTP 200 with an attachment header, 16,016,277 bytes. No installer is executed or mounted during website verification. The stable download URL retains the legacy file/repository name. No code-signing, notarization, minimum OS, pricing, automatic-update, or performance guarantee is invented.

Navigation uses Blogs. The index shares the homepage's original photography, Geist typography, navy palette, and restrained spacing. Article pages omit the All guides link. Why We Made This App replaces the download article; the old URL permanently redirects to it and is absent from internal links and the sitemap. Cloud workspaces, remote continuity, and collaboration are explicitly described as aspirations, not available capabilities or commitments.

Metadata, software schema, guide content, and primary actions all describe the same public Mac download. The previous signup form remains an updates list; its API, duplicate handling, server credentials, and Supabase table are unchanged.

## Assets

- App screenshots: existing responsive `nap-agent-workspace-*` WebPs, with real project/conversation/review crops in feature panels. Screenshot text is product imagery, not a live UI or an independently verified performance claim.
- Ghost: the user-supplied Group 595 source from the existing `potato` assets, copied unchanged into this branch and rendered black with CSS.
- Botanical backdrop: original generated vintage-film flower photograph with orange flowers, ivory petals, dark foliage, cobalt sky, warm light leak, shallow focus, and print grain. Saved as `public/nap-dream-botanical-{720,1536}-*.webp`. Used behind the hero and two feature crops; CSS blur is decorative only.
- Alpine footer: original generated panorama of an alpine lake, left-side village, evergreen slopes, coral alpenglow, cobalt water, and warm reflected windows. A second image-generation edit retained that composition while using Keiki's footer only as a palette/texture reference. No competitor image is shipped. Saved as `public/nap-dream-alpine-{720,1448,2172}-*.webp`; the full scene appears in the footer and a blurred detail behind one feature.
- Both scenes were generated with the built-in image-generation tool, then encoded to responsive WebPs at quality 88 with content-versioned filenames. `app/components/nap-dream-image.tsx` centralizes their source sets. Actual Nap app imagery is never blurred.
- Codex, Claude Code, and Cursor: existing supplied site logos. The Claude Code mark is restored unchanged, rather than substituted with an Anthropic monogram.
- Apple mark: [Wikimedia Commons asset](https://commons.wikimedia.org/wiki/File:Apple_logo_black.svg). Only its viewport metadata is normalized; the path is unchanged. Used to identify macOS, not as Nap's own brand.
- UI icons: Lucide React. Apple is the actual brand mark rather than an emoji or generic fruit icon.

Third-party marks identify platforms/providers and remain their respective owners' marks.

## Verification scope

Run `npm run build`, `npm test`, and `npm run check:seo`. Browser QA covers the actual rendered pages and native download-link behavior, responsive screenshots/media, all three panels, Apple marks, the minimal footer, and no overflow. The download endpoint is checked with HEAD; browser click tests may substitute an attachment response so tests do not repeatedly retrieve installers. Those mocks do not verify that an installed app works on a Mac. Real release testing and conversion measurement remain separate from website testing.

Completed checks: production build; all 25 tests; rendered SEO checks on seven canonical routes; 40 browser page checks across 320, 390, 768, 1440, and 1920px viewports; no broken rendered images or horizontal overflow; native attachment events for header/hero/closing downloads; product content and download links without JavaScript; mocked updates-form invalid email, failure, retry, success, and focused confirmation. No browser page errors were recorded. Targeted ESLint has no errors; native optimized-image elements retain the framework's advisory image warnings.
