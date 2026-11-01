import NapFooter from "../components/nap-footer";
import StructuredData from "../components/structured-data";
import { pages, pageMetadata, blogSchema, blogPosts } from "../lib/seo";
import Link from "next/link";
import NapHeader from "../components/nap-header";
import { ArrowUpRight } from "lucide-react";
import "../contrast.css";
import styles from "./blog.module.css";

export const metadata = pageMetadata(pages.blogs);

export default function BlogsPage() {
  return (
    <main className={`contrast-page nap-article-page ${styles.indexPage}`}>
      <StructuredData data={blogSchema()} />
      <NapHeader />
      <section className="nap-hero">
        <div className="nap-blog-index">
          <div className="nap-blog-intro">
            <h1>Ideas behind the interface.</h1>
            <p>Notes on building Nap, working with agents, and what comes next.</p>
          </div>
          <div className={styles.posts}>
          {blogPosts.map((post) => (
            <article className={styles.post} key={post.path}>
              <Link className={styles.postLink} href={post.path}>
                <div className={styles.postCopy}>
                  <div className={styles.meta}><time dateTime={post.published}>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(post.published))}</time><span>{post.readingMinutes} min read</span></div>
                  <h2>{post.headline}</h2>
                  <p>{post.description}</p>
                </div>
                <ArrowUpRight className={styles.postArrow} size={17} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </article>
          ))}
          </div>
        </div>
      </section>
      <NapFooter />
    </main>
  );
}
