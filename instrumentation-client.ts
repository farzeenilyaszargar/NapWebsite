import { initializeAnalytics } from "./app/lib/analytics";
import { initializeXPixel } from "./app/lib/x-pixel";

// Let visible content and images finish loading before fetching the background SDK.
const start = () => {
  try { initializeXPixel(); } catch { /* Tracking must not interfere with the page. */ }
  void initializeAnalytics()?.catch(() => {});
};
const schedule = () => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(start, { timeout: 1500 });
  } else {
    setTimeout(start, 0);
  }
};

if (document.readyState === "complete") schedule();
else window.addEventListener("load", schedule, { once: true });
