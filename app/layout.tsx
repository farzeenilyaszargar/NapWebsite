import { site, pages, pageMetadata, siteSchema, indexing } from "./lib/seo";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import StructuredData from "./components/structured-data";
import "./globals.css";
import "./halftone.css";
import "./oniki.css";

const sans = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });

export const metadata: Metadata = {
  ...pageMetadata(pages.home),
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  robots: indexing,
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`oniki h-full antialiased ${sans.variable}`}
    >
      <body className="min-h-full flex flex-col"><StructuredData data={siteSchema()} />{children}</body>
    </html>
  );
}
