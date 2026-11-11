import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nap.cx"),
  title: "Nap | The Interface For All Your Agents",
  description: "Your coding agents. One native Mac interface.",
  applicationName: "Nap",
  openGraph: {
    title: "Nap | The Interface For All Your Agents",
    description: "Your coding agents. One native Mac interface.",
    url: "/",
    siteName: "Nap",
    type: "website",
  },
  twitter: { card: "summary", title: "Nap | The Interface For All Your Agents" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
