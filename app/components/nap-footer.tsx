import Link from "next/link";
import { blogPosts, pages } from "../lib/seo";
import NapLogo from "./nap-logo";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function NapFooter() {
  return (
    <footer className="nap-site-footer">
      <div className="nap-footer-main">
        <div className="nap-footer-brand">
          <Link href="/" className="nap-logo" aria-label="Nap home"><NapLogo /><span aria-hidden="true">nap</span></Link>
          <p>A native Mac app for AI coding agents.</p>
        </div>
        <nav className="nap-footer-links" aria-label="Footer">
          <div>
            <p className="nap-footer-heading">Product</p>
            <Link href={pages.waitlist.path}>Download for Mac</Link>
            <Link href="/#features">Features</Link>
            <Link href="/#agents">Supported agents</Link>
          </div>
          <div>
            <p className="nap-footer-heading">Guides</p>
            {blogPosts.map((post) => <Link key={post.path} href={post.path}>{post.headline.split(":")[0]}</Link>)}
            <Link href={pages.blogs.path}>All guides</Link>
          </div>
          <div>
            <p className="nap-footer-heading">Company</p>
            <a className="nap-footer-social" href="https://x.com/nap_cx" {...external}>X (Twitter)</a>
          </div>
        </nav>
      </div>
      <div className="nap-footer-bottom">
        <span className="nap-footer-copyright">© 2026 Nap</span>
        <span>nap.cx</span>
      </div>
    </footer>
  );
}
