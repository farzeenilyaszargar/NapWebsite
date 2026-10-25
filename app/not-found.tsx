import Link from "next/link";
import type { Metadata } from "next";
import { pageTitle } from "./lib/seo";
import NapHeader from "./components/nap-header";
import "./contrast.css";
import "./not-found.css";

export const metadata: Metadata = {
  title: { absolute: pageTitle("Page Not Found") },
  description: "Page not found. Head back home to explore Nap.",
  keywords: [],
  alternates: { canonical: null },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <main className="contrast-page nap-not-found">
      <NapHeader />
      <section className="nap-lost" aria-labelledby="lost-title">
        <h1 className="nap-lost-code" aria-label="404 — Page not found">
          404
        </h1>
        <h2 id="lost-title">Page not found.</h2>
        <p className="nap-lost-description">The page you’re looking for isn’t here.</p>
        <Link href="/" className="nap-download nap-lost-home">Back to home</Link>
      </section>
    </main>
  );
}
