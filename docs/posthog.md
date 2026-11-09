# PostHog

`instrumentation-client.ts` waits for the page load event, then schedules initialization during browser idle time so analytics do not compete with visible images.
`app/lib/analytics.ts` dynamically loads the SDK and shares one initialization
promise across routes and exception capture. This keeps the
SDK out of the initial page JavaScript.
After SDK evaluation, initialization yields to a separate background-priority
task (or a timer on browsers without the Scheduler API), allowing pending input
and rendering to run between these two pieces of work.
The browser SDK handles pageviews,
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

The global error boundary reports root-layout errors through PostHog's
exception API. The retired waitlist no longer emits signup events or server logs.

## Project

[Analytics dashboard](https://us.posthog.com/project/647356/dashboard/2262826)

[Wizard setup report](https://us.posthog.com/project/647356/notebooks/8e2f824fee4a)

To verify, open the deployed site, navigate to another page, and check recent
pageviews in PostHog. Browser QA can intercept PostHog ingestion to verify events
without polluting the analytics project.
