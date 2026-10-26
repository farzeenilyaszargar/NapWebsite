import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (key && host) {
  try {
    posthog.init(key, {
      api_host: host,
      defaults: "2026-01-30",
      capture_exceptions: true,
      session_recording: { maskAllInputs: true },
    });
  } catch {
    // Analytics availability must not prevent the site from loading.
  }
}
