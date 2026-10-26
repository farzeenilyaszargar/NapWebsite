# Performance and SEO maintenance

## 2026-10-27 changes

- Load PostHog through one shared dynamic import during browser idle time, rather
  than importing the SDK before hydration. Confirmed signup and error capture
  use the same initialization promise.
- Limit automatic capture to link/button clicks, excluding input/change events.
  Disable surveys and heatmaps; retain pageviews and confirmed signup events.
- Remove the unused Space Grotesk font. The active design already uses system
  sans-serif overrides, so no replacement download is needed.
- Align blog author metadata and structured data with the visible @farilyaz
  bylines; remove unpublished agent names from keywords.
- Add relevant product wording in the existing workflow introduction, update the
  social image to the light palette, and exclude API endpoints from crawling.

## Measurements

Compared the previous production homepage (1925cbc) to the optimized production
build. Summed gzip sizes of JavaScript files referenced by the server-rendered
HTML; this measures initial script payload, not total session JavaScript.

- Before: 286,373 bytes across 11 initial scripts.
- After: 182,403 bytes across 10 initial scripts (about 36% less).
- Removed font download: 22,320 bytes.

A mobile viewport with Chrome CPU throttled 4x exercised blog navigation,
waitlist navigation, typing, and a mocked successful signup. Of 29 recorded Event
Timing entries, the longest duration was 64 ms and none exceeded 200 ms.
Third-party ingestion was intercepted for QA. This is a lab sample, not a
field INP measurement or a guarantee across visitors and devices.

Verified PostHog pageviews, navigation pageviews, and waitlist_joined using
intercepted ingestion with compressed batch decoding. No real test signup or
analytics conversion was written. Build, SEO checks, and the 19 existing tests
pass; route layouts also pass desktop/mobile checks in Chromium, WebKit, and
Firefox. Track real-user INP after deployment to assess the field result.
