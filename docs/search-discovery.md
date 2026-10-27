# Search and AI discovery

The canonical product website is https://www.nap.cx/. The homepage is the main destination for Nap, Nap Code, coding-agent, and Nap-download searches. Downloads remain paused and access is through the waitlist. Do not publish a download URL, price, release date, endorsement, review, or rating unless it is real and current.

## Implemented

- A descriptive homepage title and description name the product category, Mac platform, and download updates.
- The existing homepage workflow copy and product articles are rendered on the server and readable without JavaScript. SEO changes must preserve the approved visible design unless a design change is explicitly requested.
- Organization, website, software, article, and breadcrumb entities use consistent canonical identifiers. Structured data describes the visible product, without unconfirmed offers or ratings.
- Robots rules allow public pages for general crawlers, OAI-SearchBot, and ChatGPT-User while excluding API paths. GPTBot's existing training policy is unchanged; search access and training are independent.
- Canonicals, social cards, the sitemap, server rendering, responsive images, and first-paint optimizations apply alongside the product content.
- `npm run check:seo` validates generated production HTML, product claims, internal discovery, canonicals, sitemap coverage, and crawler rules.

## Owner setup after deployment

1. Verify the `nap.cx` domain property in Google Search Console. The existing `GOOGLE_SITE_VERIFICATION` environment variable supports an HTML verification token if that method is used instead of DNS.
2. Submit https://www.nap.cx/sitemap.xml and use URL Inspection to request indexing of the homepage and genuine product articles. Submission requests discovery; it does not guarantee indexing or placement.
3. Verify the site in Bing Webmaster Tools and submit the same sitemap. `BING_SITE_VERIFICATION` supports its HTML verification token.
4. Check CDN/firewall rules and logs for real crawler access. OpenAI recommends allowing OAI-SearchBot and its published IP ranges. A successful request using a crawler user agent alone does not prove all real crawler IPs are allowed.
5. Watch homepage impressions and clicks for Nap, Nap download, download Nap, Nap agents, and related searches in Search Console. Review actual referral traffic and signups before drawing conclusions about AI visibility.
6. Publish real product walkthroughs, working examples, and release information as they become available. Earn independent coverage through the product itself; on-site metadata cannot manufacture reputation or endorsements.

## Limits

Keyword meta tags do not affect Google rankings. FAQ markup does not promise FAQ rich results, ranking improvements, or chatbot citations. Google does not require special AI files or special schema for its AI features. There is no documented switch that makes ChatGPT recommend a product, and enabling training crawlers does not guarantee recommendations.

Keep factual availability consistent across the homepage description, product schema, waitlist, and articles when downloads resume. Do not create near-duplicate pages for each spelling of a search query.

## Official references

- [OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- [Google AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google AI features and website eligibility](https://developers.google.com/search/docs/appearance/ai-features)
- [Google-supported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags)
