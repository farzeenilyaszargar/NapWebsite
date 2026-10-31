import Link from "next/link";

export default function NapFooter() {
  return (
    <footer className="nap-site-footer nap-section">
      <div className="nap-footer-main">
        <div className="nap-footer-brand"><Link href="/" aria-label="Nap home">nap.</Link><p>A little space for what comes next.</p></div>
        <nav aria-label="Footer navigation"><Link href="/blogs">Field notes</Link><Link href="/waitlist">Early access</Link><a href="https://x.com/nap_cx" target="_blank" rel="noopener noreferrer">Find us on X &#8599;</a></nav>
      </div>
      <div className="nap-footer-bottom">
        <span className="nap-footer-copyright">© 2026 NAP</span>
        <span>Made for the way your mind works.</span>
        <a className="nap-footer-social" href="#top">Back to top &uarr;</a>
      </div>
    </footer>
  );
}
