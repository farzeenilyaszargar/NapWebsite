import Link from "next/link";
import { blogPosts, pages } from "../lib/seo";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function NapFooter() {
  return (
    <footer className="nap-site-footer">
      <div className="nap-footer-main">
        <p className="nap-footer-about">Nap is a native Mac app for AI coding agents.</p>
        <nav className="nap-footer-links" aria-label="Footer">
          <div>
            <p className="nap-footer-heading">Product</p>
            <Link href={pages.waitlist.path}>Download for Mac</Link>
            <Link href="/#how-it-works">How it works</Link>
          </div>
          <div>
            <p className="nap-footer-heading">Guides</p>
            {blogPosts.map((post) => <Link key={post.path} href={post.path}>{post.headline.split(":")[0]}</Link>)}
            <Link href={pages.blogs.path}>All guides</Link>
          </div>
          <div>
            <p className="nap-footer-heading">Follow</p>
            <a className="nap-footer-social" href="https://x.com/nap_cx" {...external}>X / @nap_cx</a>
          </div>
        </nav>
      </div>
      <div className="nap-footer-bottom">
        <span className="nap-footer-copyright">© 2026 Nap</span>
        <span>Made for macOS</span>
      </div>
    </footer>
  );
}
