import Link from "next/link";
import { pages } from "../lib/seo";

export default function NapFooter() {
  return (
    <footer className="nap-site-footer">
      <span className="nap-footer-copyright">© 2026 Nap</span>
      <nav aria-label="Footer">
        <Link href={pages.blogs.path}>Blog</Link>
        <a className="nap-footer-social" href="https://x.com/nap_cx" target="_blank" rel="noopener noreferrer">X</a>
      </nav>
    </footer>
  );
}
