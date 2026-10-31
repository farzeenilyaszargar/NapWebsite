import NapFooter from "../components/nap-footer";
import StructuredData from "../components/structured-data";
import { pages, pageMetadata, blogSchema, blogPosts } from "../lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NapHeader from "../components/nap-header";
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
            <h1>Nap <span className="nap-halftone-text">Blog.</span></h1>
            <p>Practical guides to coding agents, parallel workflows,<br />and getting started with Nap.</p>
          </div>
          {blogPosts.map((post) => (
            <article className={styles.post} key={post.path}>
              <Link className={styles.postLink} href={post.path}>
                <div className={styles.postCopy}>
                  <div className={styles.meta}><span>{post.category}</span><span>{post.readingMinutes} min read</span><time dateTime={post.published}>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(post.published))}</time></div>
                  <h2>{post.headline}</h2>
                  <p>{post.description}</p>
                </div>
                <span className={styles.arrow} aria-hidden="true"><ArrowRight size={21} strokeWidth={1.5} /></span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <NapFooter />
    </main>
  );
}
