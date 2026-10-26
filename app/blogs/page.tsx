import NapFooter from "../components/nap-footer";
import StructuredData from "../components/structured-data";
import { pages, pageMetadata, blogSchema } from "../lib/seo";
import Link from "next/link";
import NapHeader from "../components/nap-header";
import "../contrast.css";

export const metadata = pageMetadata(pages.blogs);

export default function BlogsPage() {
  return (
    <main className="contrast-page nap-article-page">
      <StructuredData data={blogSchema()} />
      <NapHeader />
      <section className="nap-hero">
        <div className="nap-blog-index">
          <div className="nap-blog-intro">
            <h1><span className="nap-halftone-text">Blogs.</span></h1>
            <p>Notes on what we’re building.<br />And why it matters to us.</p>
          </div>
          <Link className="nap-blog-row" href="/blogs/hello-nap">
            <span className="nap-blog-number">01</span>
            <h2>Why We Started</h2>
            <p>The agent says it is done. You still have to decide what to keep. Why we are building Nap around that part.</p>
          </Link>
          <Link className="nap-blog-row" href="/blogs/why">
            <span className="nap-blog-number">02</span>
            <h2>Why This?</h2>
            <p>What Nap does, what the interface is responsible for, and why a confident answer still needs a review.</p>
          </Link>
        </div>
      </section>
      <NapFooter />
    </main>
  );
}
