import { site, pages, pageMetadata, siteSchema, indexing } from "./lib/seo";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fustat, Instrument_Serif } from "next/font/google";
import StructuredData from "./components/structured-data";
import "./globals.css";
import "./halftone.css";
import "./potato.css";

const sans = Fustat({ subsets: ["latin"], display: "swap", variable: "--font-fustat" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", display: "swap", variable: "--font-instrument" });

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
      className={`potato h-full antialiased ${sans.variable} ${serif.variable}`}
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
