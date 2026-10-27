import type { MetadataRoute } from "next";
import { site, isIndexable } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: ["OAI-SearchBot", "ChatGPT-User"], allow: "/", disallow: "/api/" },
    ],
    sitemap: isIndexable ? `${site.url}/sitemap.xml` : undefined,
  };
}
