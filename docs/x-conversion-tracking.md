# X tracking

`instrumentation-client.ts` initializes the base pixel `rhsuk` once after page
load and during browser idle time. Client navigation does not install a second
copy.

The waitlist's server-side conversion integration has been removed.
`X_PIXEL_TOKEN` and `X_WAITLIST_EVENT_ID` are no longer used by the website.
