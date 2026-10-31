import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export default function NapFooter() {
  return (
    <footer className="nap-site-footer nap-section">
      <div className="nap-footer-main">
        <Link href="/" className="nap-wordmark" aria-label="Nap home"><span className="nap-wordmark-mark" aria-hidden="true" /></Link>
        <p>Your coding agents. One native Mac app.</p>
      </div>
      <div className="nap-footer-bottom">
        <span className="nap-footer-copyright">© 2026 NAP</span>
        <div className="nap-footer-links"><a href="https://x.com/nap_cx" target="_blank" rel="noopener noreferrer">Follow Nap <ArrowUpRight size={13} aria-hidden="true" /></a><a className="nap-footer-social" href="#top">Back to top <ArrowUp size={13} aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
