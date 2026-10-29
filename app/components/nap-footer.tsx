import Link from "next/link";
import { blogPosts, pages } from "../lib/seo";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function NapFooter() {
  return (
    <footer className="nap-site-footer nap-section">
      <div className="nap-footer-main">
        <div className="nap-footer-brand">
          <Link href="/" className="nap-wordmark" aria-label="Nap home">nap<span className="nap-wordmark-mark" aria-hidden="true" /></Link>
          <p>Your coding agents, together in one native Mac app.</p>
        </div>
        <nav className="nap-footer-links" aria-label="Footer">
          <div>
            <p className="nap-footer-heading">Product</p>
            <Link href={pages.waitlist.path}>Join the waitlist</Link>
            <Link href="/#features">Features</Link>
            <Link href="/#faq">FAQ</Link>
          </div>
          <div>
            <p className="nap-footer-heading">Guides</p>
            {blogPosts.map((post) => <Link key={post.path} href={post.path}>{post.headline.split(":")[0]}</Link>)}
            <Link href={pages.blogs.path}>All guides</Link>
          </div>
          <div>
            <p className="nap-footer-heading">Follow</p>
            <a className="nap-footer-social" href="https://x.com/nap_cx" {...external}>Nap on X</a>
            <a href="https://x.com/farilyaz" {...external}>@farilyaz</a>
          </div>
        </nav>
      </div>
      <div className="nap-footer-bottom">
        <span className="nap-footer-copyright">© 2026 NAP</span>
        <span>Built for macOS</span>
      </div>
    </footer>
  );
}
