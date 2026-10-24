import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nap",
    short_name: "Nap",
    description: "Your coding agents. One interface.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/nap-icon-192-fd534a28.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/nap-icon-512-8adc24c1.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
