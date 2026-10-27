import { initializeAnalytics } from "./app/lib/analytics";

// Let visible content and images finish loading before fetching the background SDK.
const start = () => { void initializeAnalytics()?.catch(() => {}); };
const schedule = () => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(start, { timeout: 1500 });
  } else {
    setTimeout(start, 0);
  }
};

if (document.readyState === "complete") schedule();
else window.addEventListener("load", schedule, { once: true });
