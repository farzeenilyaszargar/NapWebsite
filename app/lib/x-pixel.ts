type Pixel = ((...args: unknown[]) => void) & {
  exe?: (...args: unknown[]) => void;
  queue: unknown[][];
  version: string;
};

declare global { interface Window { twq?: Pixel } }

let initialized = false;

export function initializeXPixel() {
  if (initialized || typeof window === "undefined") return;
  if (!window.twq) {
    const pixel = ((...args: unknown[]) => {
      if (pixel.exe) pixel.exe(...args);
      else pixel.queue.push(args);
    }) as Pixel;
    pixel.queue = [];
    pixel.version = "1.1";
    window.twq = pixel;
    const script = document.createElement("script");
    script.id = "nap-x-pixel-sdk";
    script.async = true;
    script.src = "https://static.ads-twitter.com/uwt.js";
    document.head.appendChild(script);
  }
  window.twq("config", "rhsuk");
  initialized = true;
}
