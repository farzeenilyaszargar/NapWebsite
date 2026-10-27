# PostHog

`instrumentation-client.ts` waits for the page load event, then schedules initialization during browser idle time so analytics do not compete with visible images.
`app/lib/analytics.ts` dynamically loads the SDK and shares one initialization
promise across routes, confirmed signups, and exception capture. This keeps the
SDK out of the initial page JavaScript. The browser SDK handles pageviews,
client-side navigation, link/button clicks, and exceptions. Session-recording
inputs are masked. Heatmaps and surveys are disabled; form typing is excluded
from automatic capture to reduce interaction-handler work.

## Configuration

Set these public project values locally in `.env.local` and in the hosting
provider before building:

- `NEXT_PUBLIC_POSTHOG_KEY`: the project token from PostHog project settings.
- `NEXT_PUBLIC_POSTHOG_HOST`: the project ingestion host.

These are browser configuration values, not personal API keys. Never put a
PostHog personal API key in a `NEXT_PUBLIC_` variable. Local environment files
remain ignored by Git. Missing configuration leaves the website usable.

## Events and logs

- `waitlist_joined`: captured after `/api/waitlist` confirms success. Includes
  successful duplicate submissions, because the endpoint deliberately gives the
  same response to existing signups. No name or email is added to this event.
- `waitlist_signup_processed`: server log with a `signup_created` boolean.
- `waitlist_signup_storage_rejected`: server log with the storage HTTP status.
- `waitlist_signup_storage_failed`: server log for storage exceptions.

Server logs use a dedicated OpenTelemetry logger and flush after the response.
They contain no submitted name, email, storage response body, or service key.
Logging failures do not change the signup response. The global error boundary
also reports root-layout errors through PostHog's exception API.

## Project

[Analytics dashboard](https://us.posthog.com/project/647356/dashboard/2262826)

[Wizard setup report](https://us.posthog.com/project/647356/notebooks/8e2f824fee4a)

To verify, open the deployed site, navigate to another page, and check recent
pageviews in PostHog. A confirmed waitlist submission emits `waitlist_joined`.
Browser QA can intercept PostHog ingestion and mock `/api/waitlist` to verify
these events without creating real signups or polluting the analytics project.
