import Link from "next/link";

export default function NapFooter() {
  return (
    <footer className="nap-site-footer nap-section">
      <div className="nap-footer-main">
        <Link href="/" className="nap-wordmark" aria-label="Nap home"><span className="nap-wordmark-mark" aria-hidden="true" /></Link>
      </div>
      <div className="nap-footer-bottom">
        <span className="nap-footer-copyright">© 2026 NAP</span>
        <a className="nap-footer-social" href="#top">Back to top &uarr;</a>
      </div>
    </footer>
  );
}
