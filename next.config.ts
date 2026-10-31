import type { NextConfig } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const nextConfig: NextConfig = {
  experimental: {
    // Small stylesheets arrive with HTML instead of blocking first paint on another request.
    inlineCss: true,
  },
  async redirects() {
    const legacyHostRedirects = ["nap-code.com", "www.nap-code.com"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://www.nap.cx/:path*",
      permanent: true,
    }));
    return [
      ...legacyHostRedirects,
      ...["/blogs/hello-nap", "/blogs/why"].map((source) => ({
        source,
        destination: "/blogs/nap-agentic-development-environment",
        permanent: true,
      })),
    ];
  },
  async headers() {
    // Only content-versioned files get immutable caching; HTML stays revalidatable.
    return readdirSync(join(process.cwd(), "public"))
      .filter((file) => /-[a-f0-9]{8}\.(?:avif|webp|png)$/.test(file))
      .map((file) => ({
        source: `/${file}`,
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      }));
  },
};

export default nextConfig;
