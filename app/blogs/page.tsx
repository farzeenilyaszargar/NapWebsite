import NapFooter from "../components/nap-footer";
import StructuredData from "../components/structured-data";
import { pages, pageMetadata, blogSchema, blogPosts } from "../lib/seo";
import Link from "next/link";
import NapHeader from "../components/nap-header";
import NapDreamImage from "../components/nap-dream-image";
import NapProductImage from "../components/nap-product-image";
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
                <div className={`${styles.postImage} ${post.path === pages.ade.path ? styles.productImage : ""}`}>
                  {post.path === pages.ade.path ? <NapProductImage alt="Nap's native workspace with an agent conversation and code review." sizes="(max-width: 700px) 90vw, 370px" /> : <NapDreamImage scene={post.path === pages.vision.path ? "alpine" : "botanical"} sizes="(max-width: 700px) 90vw, 370px" />}
                </div>
                <div className={styles.postCopy}>
                  <div className={styles.meta}><span>{post.category}</span><span>{post.readingMinutes} min read</span></div>
                  <h2>{post.headline}</h2>
                  <p>{post.description}</p>
                  <div className={styles.postEnd}><time dateTime={post.published}>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(post.published))}</time><ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></div>
                </div>
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
