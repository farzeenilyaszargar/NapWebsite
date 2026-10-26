import { initializeAnalytics } from "./app/lib/analytics";

// Let the first render and hydration run before loading optional analytics.
const start = () => { void initializeAnalytics()?.catch(() => {}); };
if ("requestIdleCallback" in window) {
  window.requestIdleCallback(start, { timeout: 1500 });
} else {
  setTimeout(start, 0);
}
