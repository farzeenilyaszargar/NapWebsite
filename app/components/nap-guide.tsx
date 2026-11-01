import type { ReactNode } from "react";
import { articleSchema, pages } from "../lib/seo";
import NapHeader from "./nap-header";
import NapFooter from "./nap-footer";
import NapReadingLinks from "./nap-reading-links";
import NapDownloadCta from "./nap-download-cta";
import StructuredData from "./structured-data";
import "../contrast.css";
import styles from "../blogs/blog.module.css";

type Guide = typeof pages.parallel | typeof pages.ade | typeof pages.vision;

export default function NapGuide({ page, children }: { page: Guide; children: ReactNode }) {
  return (
    <main className={`contrast-page nap-article-page ${styles.guide}`}>
      <StructuredData data={articleSchema(page)} />
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <div className={styles.byline}><span>{page.category}</span><span>By <a href="https://x.com/farilyaz" className="nap-inline-link" target="_blank" rel="noopener noreferrer">@farilyaz</a></span><time dateTime={page.published}>{new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(page.published))}</time><span>{page.readingMinutes} min read</span></div>
          <h1>{page.headline}</h1>
          {children}
          <div className="nap-guide-download"><NapDownloadCta location="guide" /></div>
          <NapReadingLinks current={page.path} />
        </article>
      </section>
      <NapFooter />
    </main>
  );
}
