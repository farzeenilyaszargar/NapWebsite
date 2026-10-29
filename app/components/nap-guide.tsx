import type { ReactNode } from "react";
import { articleSchema, pages } from "../lib/seo";
import NapHeader from "./nap-header";
import NapFooter from "./nap-footer";
import NapReadingLinks from "./nap-reading-links";
import StructuredData from "./structured-data";
import "../contrast.css";

type Guide = typeof pages.parallel | typeof pages.ade | typeof pages.download;

export default function NapGuide({ page, children }: { page: Guide; children: ReactNode }) {
  return (
    <main className="contrast-page nap-article-page">
      <StructuredData data={articleSchema(page)} />
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <span className="nap-blog-label">By <a href="https://x.com/farilyaz" className="nap-inline-link" target="_blank" rel="noopener noreferrer">@farilyaz</a> · <time dateTime={page.published}>October 30, 2026</time></span>
          <h1>{page.headline}</h1>
          {children}
          <NapReadingLinks current={page.path} />
        </article>
      </section>
      <NapFooter />
    </main>
  );
}
