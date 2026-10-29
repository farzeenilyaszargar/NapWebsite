// Share one initialization promise while keeping the SDK outside the initial bundle.
let client: Promise<typeof import("posthog-js")["default"]> | undefined;

function yieldBeforeInitialization() {
  const scheduler = (globalThis as typeof globalThis & {
    scheduler?: { postTask: (callback: () => void, options: { priority: "background" }) => Promise<void> };
  }).scheduler;
  if (scheduler?.postTask) return scheduler.postTask(() => {}, { priority: "background" });
  return new Promise<void>((resolve) => setTimeout(resolve, 0));
}

export function initializeAnalytics() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || !host) return undefined;
  client ??= import("posthog-js").then(async ({ default: posthog }) => {
    // SDK evaluation and initialization must not become one uninterrupted task.
    await yieldBeforeInitialization();
    posthog.init(key, {
      api_host: host,
      defaults: "2026-01-30",
      capture_exceptions: true,
      session_recording: { maskAllInputs: true },
      disable_surveys: true,
      capture_heatmaps: false,
      autocapture: {
        dom_event_allowlist: ["click"],
        element_allowlist: ["a", "button"],
      },
    });
    return posthog;
  });
  return client;
}

export async function captureWaitlistSignup() {
  try { (await initializeAnalytics())?.capture("waitlist_joined"); } catch { /* Signup already succeeded. */ }
}

export async function captureClientException(error: Error) {
  try { (await initializeAnalytics())?.captureException(error); } catch { /* Preserve the error UI. */ }
}
