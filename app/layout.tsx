import { site, pages, pageMetadata, siteSchema, indexing } from "./lib/seo";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Instrument_Sans, IBM_Plex_Mono, Bricolage_Grotesque } from "next/font/google";
import StructuredData from "./components/structured-data";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans-nap" });
// Technical details: specs, file names, diff stats.
// Poster headlines, set with the width and optical-size axes.
const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz", "wdth"], variable: "--font-display-nap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono-nap" });

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
  themeColor: "#f4efe6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <head>
        <Script id="x-conversion-pixel" strategy="lazyOnload">{`
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','rhsuk');
        `}</Script>
      </head>
      <body className="min-h-full flex flex-col"><StructuredData data={siteSchema()} />{children}</body>
    </html>
  );
}
