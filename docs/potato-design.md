# Potato: clear product, lower friction

## Brief and availability

White overall, the supplied blue halftone-cloud artwork, a transparent navigation bar, clean typography and iconography, and a clear conversion path. The owner explicitly confirmed that Nap remains **waitlist-only**. The present conversion is a saved waitlist signup, not an immediate download. No download is linked or advertised as available. The approved title remains **Nap | The Interface For All Your Agents**.

The `potato` branch starts from `dreamcore`; neither `main` nor `dreamcore` is changed. No customer logos, user counts, endorsements, pricing, security certifications, or unsupported product capabilities are invented.

## Research

Reviewed the current primary websites on November 1, 2026. These are observations, not proof that any particular pattern improves conversion:

- [Waku](https://waku.sh/): a literal product category, supported agents, native-app proof, and a compact path to its primary action. Nap adopts the clarity, not its implementation or privacy claims.
- [T3 Code](https://t3.codes/): immediate product explanation, visible app UI, a direct primary action, and independently linked proof. Nap uses its own screenshot and has no unverified testimonial strip.
- [Conductor](https://www.conductor.build/): the agent workflow is shown concretely, with repeated access points after meaningful information. Its cloud/team features are not Nap claims.
- [Paradev](https://paradev.com/) (the current destination associated with Superset): connects a clear category to an inspectable workspace and detailed workflows. Nap keeps the information hierarchy simpler rather than reproducing the many demos and navigation destinations.

All copied text, competitors' screenshots, testimonials, and customer logos are excluded. The supplied art and existing Nap assets are enough to establish a distinctive visual identity without taking another product's materials.

## Design and conversion

- Fustat for clear product copy and controls; Instrument Serif for restrained heading accents. Fonts stay self-hosted through Next. Fixed responsive type sizes; zero letter spacing.
- White surfaces, charcoal controls, muted neutral text, and the blue artwork as the main color. No gradients, blur, animated hero, decorative cards, or dependency-heavy animation.
- Literal category headline, agent names, Mac platform, availability, and a prominent waitlist action precede the actual app screenshot.
- One secondary hero link scrolls to the workspace instead of sending the visitor into another funnel.
- Three keyboard-accessible tabs inspect projects, conversations, and code review using crops of the real screenshot, not simulated product claims. The tab strip has stable dimensions, manual pointer activation, and Arrow/Home/End keyboard navigation.
- Colored agent logos, five practical answers, and a repeated signup action. No fake countdowns, inflated counters, or unsupported scarcity.
- Header, guides, waitlist, closed application page, error page, and footer share the same light typography and controls. Guides end with a clear signup action rather than requiring a scroll back to the navigation. The mobile header retains the existing no-waitlist-button preference.
- The form uses the existing server API, native validation, timeout, retry, honeypot, duplicate handling, and Supabase persistence. A successful save alone displays confirmation. No live test signup is required.
- Existing PostHog autocapture remains available for link clicks. `data-cta-location` distinguishes hero and closing actions. Actual signup events are still emitted only after a successful API response. Backend conversion deduplication is unchanged.

## Assets

User source: `image-1.png` attached to this goal (1199 x 522). No generative editing was used. AVIF encodings at 480, 960, and 1199 pixels, with WebP fallbacks, are in `public/nap-halftone-sky-*`; a JPEG encoding in `assets/nap-social-sky.jpg` supplies the social card. The original supplied image remains untouched. Content hashes allow immutable caching. At 960px the AVIF is approximately 58 KB versus the 147 KB WebP fallback. The hero art and screenshot have matching responsive preload hints. The unused regular Instrument Serif font is not downloaded; the design uses its italic face.

The hero retains `NapProductImage` and its responsive, lossless screenshot variants. The source ghost silhouette is preserved and rendered in black with CSS; agent colors are retained. Arrows and workflow controls use Lucide icons.

## Search and answer discovery

The original title, canonicals, sitemap, publisher entities, article routes, and crawler access are preserved. The homepage description is written for people, not repeated keyword variants. The formerly hidden, white-on-white keyword block is removed; factual product information is in visible copy and accessible native details. [Google's spam policies](https://developers.google.com/search/docs/essentials/spam-policies#hidden-text-and-link-abuse) identify hidden text used to manipulate search as abuse.

The visible questions and FAQ structured data share one source. Software schema continues to describe a Mac app with a JoinAction and no public download URL, invented ratings, or pricing. The social card matches the new artwork and availability. `/llms.txt` is a concise, public factual reference; it is not a ranking factor or a promise of AI recommendations. [Google's AI-feature guidance](https://developers.google.com/search/docs/appearance/ai-features) emphasizes ordinary crawlability and useful content, not special AI files.

## Measure after deployment

Track homepage visits to waitlist clicks, form starts, and confirmed signup saves. Compare by device and landing source. Use real field Core Web Vitals and Search Console queries after deployment. A design review cannot prove the best possible conversion rate or a ranking position; validate copy and layout against actual traffic. When downloads resume, update the action, visible availability, product schema, guide, and this reference together only after checking a supported installer and platform requirements.

## Verification

- Production build and 25 existing tests pass; rendered SEO checks cover all seven canonical page routes, FAQ agreement, availability claims, sitemap, and robots rules.
- Browser audit covers 320, 390, 768, 1440, and 1920px widths across eight page types, including 404. It checks overflow, headings, fonts, media, first-viewport product visibility, stable tab geometry, keyboard controls, FAQ state, signup links, and no-JavaScript product content.
- The waitlist API is intercepted for browser QA: invalid email is stopped, a mocked failure preserves fields, retry succeeds, confirmation gets focus, and the return link works. No real test signup is inserted.
- A cold-cache local Chromium test at 390px/DPR2, 1.6 Mbps, 150ms latency, and 4x CPU slowdown reported FCP approximately 0.49 seconds, LCP 1.77 seconds, and CLS 0 after responsive AVIF/preload/font changes. The pre-optimization run was approximately 0.64s FCP and 3.47s LCP. These are individual local lab observations with external analytics blocked, not field performance, a Lighthouse score, or a production guarantee.
