import type { MetadataRoute } from "next";
import { site } from "./lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f4efe6",
    theme_color: "#f4efe6",
    icons: [
      { src: "/nap-icon-192-fd534a28.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/nap-icon-512-8adc24c1.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
