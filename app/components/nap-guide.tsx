import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { articleSchema, pages } from "../lib/seo";
import NapHeader from "./nap-header";
import NapFooter from "./nap-footer";
import NapReadingLinks from "./nap-reading-links";
import NapWaitlistCta from "./nap-waitlist-cta";
import StructuredData from "./structured-data";
import "../contrast.css";
import styles from "../blogs/blog.module.css";

type Guide = typeof pages.parallel | typeof pages.ade | typeof pages.download;

export default function NapGuide({ page, contents, children }: { page: Guide; contents: readonly { id: string; label: string }[]; children: ReactNode }) {
  return (
    <main className={`contrast-page nap-article-page ${styles.guide}`}>
      <StructuredData data={articleSchema(page)} />
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <Link className={styles.backLink} href={pages.blogs.path}><ArrowLeft size={14} aria-hidden="true" />All guides</Link>
          <div className={styles.byline}><span>{page.category}</span><span>By <a href="https://x.com/farilyaz" className="nap-inline-link" target="_blank" rel="noopener noreferrer">@farilyaz</a></span><time dateTime={page.published}>{new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(page.published))}</time><span>{page.readingMinutes} min read</span></div>
          <h1>{page.headline}</h1>
          <nav className={styles.contents} aria-label="On this page">
            <span>On this page</span>
            <ul>{contents.map(({ id, label }) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
          </nav>
          {children}
          <aside className="nap-guide-access" aria-labelledby="guide-access-title">
            <h2 id="guide-access-title">Get early access to Nap.</h2>
            <p>Join the Mac waitlist for availability updates.</p>
            <NapWaitlistCta location="guide" />
          </aside>
          <NapReadingLinks current={page.path} />
        </article>
      </section>
      <NapFooter />
    </main>
  );
}
