# Nap search setup

The canonical production origin is `https://www.nap.cx`. The apex `https://nap.cx` redirects to it. Shared metadata and entity definitions live in `app/lib/seo.ts`.

## Search positioning

- Brand: Nap, Nap Code, nap.cx.
- Homepage: native AI coding app for Mac, AI coding workspace, coding agent interface, agentic coding.
- Blog listing: Nap blog and practical coding-agent guides, organized by topic.
- Parallel coding agents: task ownership, Git worktrees, and integration checks.
- Agentic development environment: what Nap is, agent selection, conversations, and review.
- Download guide: the official Mac product and waitlist-only availability.
- Agent names appear where the published content discusses them: Claude Code, Codex, and Cursor.

Each page has a focused keyword list and a unique description. Google does not use the meta keywords tag for ranking; the visible content, crawlability, relevance, and useful information matter. Titles follow `Nap | …`. The homepage title is `Nap | The Interface For All Your Agents`. Preserve this owner-approved title; SEO work must not replace it without explicit approval.

## Implemented

- Static, crawlable HTML with one primary heading per page and navigable internal links.
- Page-specific titles, descriptions, canonical URLs, Open Graph cards, and Twitter cards.
- Shared Organization and WebSite entities on every page, including the existing Nap logo and official X profile.
- Homepage WebPage and SoftwareApplication entities; blog CollectionPage, Blog, BreadcrumbList, WebPage, and BlogPosting entities.
- Blog author references resolve to the visible founder byline, publisher references resolve to Nap, and each article's subject resolves to its SoftwareApplication entity. Article markup includes a branded preview image and the visible publication date.
- No invented prices, ratings, publication dates, system requirements, or availability claims. The app entity describes Nap; it does not claim eligibility for Google's software-app rich result, which requires additional real product data.
- Production robots.txt permits crawling and points to the sitemap, which includes the seven current canonical pages. Article lastmod values come from recorded publication dates, not deployment time.
- Vercel preview/development builds use noindex metadata and publish an empty sitemap without advertising it in robots.txt. Crawling stays allowed so crawlers can read noindex. Outside Vercel, configure equivalent preview protections at the host.
- Missing URLs return HTTP 404 with noindex and no homepage canonical.
- Responsive cached images, intrinsic dimensions, native lazy-loaded logos, deferred decorative JavaScript, and a compressed favicon.
- A 1200×630 branded social image at `/opengraph-image`, plus a PNG organization/touch icon exported from the existing favicon.
- Viewport scaling remains accessible; the browser can zoom the page.

## Product content and AI retrieval

- The ADE guide provides a concise definition of Nap, its Mac platform, the published agent list, and the project/conversation/review workflow.
- The three guides address distinct questions instead of duplicating minor keyword variations. Server-rendered topic links support direct navigation to relevant article sections.
- The retired founder-story URLs redirect permanently to the ADE guide. No deleted article remains in schema, the index, or the sitemap.
- Article bylines identify the author; back links and related reading connect the guide cluster.
- The homepage keeps its existing hero design and navigation. No extra SEO copy or FAQ is added to it.
- Pricing, minimum macOS versions, account/API-key requirements, privacy guarantees, and release availability remain unspecified until confirmed. Do not infer them from agent/provider names or a download link.
- These improvements provide useful source material for search and agents. They do not guarantee citations, rankings, or changes to a model's pretrained knowledge. No special crawler directives or AI text files are required for Google AI search eligibility.

## Search setup and external actions

1. Verify the current Search Console property and inspect the three guide URLs after deployment. Submit the current sitemap; indexing is not guaranteed.
2. For URL-prefix verification instead, set `GOOGLE_SITE_VERIFICATION` in the production build environment to the **content value** supplied by Google. Redeploy, then finish verification in Search Console. A token in the environment alone does not complete ownership verification.
3. Optional: verify ownership in Bing Webmaster Tools or import a verified Search Console property. Optional meta verification uses `BING_SITE_VERIFICATION`, also followed by a redeploy.
4. Run Google's Rich Results Test and Search Console URL Inspection on the deployed URLs. Indexing, rich results, and rankings are not guaranteed.
5. Review hosting/firewall bot settings. Do not block search or user-directed retrieval crawlers if you want AI search visibility. Training-crawler access is a separate policy choice. No crawler-specific restrictions are added by this app.
6. If the old `nap-code.com` domain was indexed, keep its redirects live and use the appropriate Search Console site-move flow. The application redirects old hosts to www.nap.cx while preserving paths. Keep apex-to-www redirection in hosting settings to avoid loops.
7. Publish confirmed pricing, requirements, release status, and privacy information when ready. Link accurate public product profiles back to the canonical site and keep all descriptions consistent. The ADE guide is the current factual product reference; the navbar is unchanged.

Do not add fake review schema, invisible keyword blocks, automatic deployment dates as sitemap lastmod values, or duplicate pages targeting minor keyword variations. `llms.txt` is optional and is not required for Google Search or its AI features.

## Checks

```sh
npm run build
npm run check:seo
npm test
```

`check:seo` reads the built HTML and crawler files. It checks metadata consistency, canonical URLs, structured data, publisher identity, breadcrumb paths, heading counts, image dimensions/assets, visible product facts, internal-link reachability, 404 exclusion, and sitemap coverage. To verify preview behavior, build and run the checker with `VERCEL_ENV=preview` set for both commands, then rebuild normally for production.

## References

- https://developers.google.com/search/docs/crawling-indexing/special-tags
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- https://developers.google.com/search/docs/appearance/structured-data/software-app
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
