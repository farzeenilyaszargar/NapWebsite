import Link from "next/link";
import { blogPosts } from "../lib/seo";

export default function NapReadingLinks({ current }: { current: string }) {
  return (
    <nav className="nap-reading-links" aria-label="Further reading">
      <span className="nap-blog-label">KEEP EXPLORING</span>
      <div>{blogPosts.filter((page) => page.path !== current).map((page) => (
        <Link key={page.path} href={page.path} className="nap-inline-link">{page.headline}</Link>
      ))}</div>
    </nav>
  );
}
