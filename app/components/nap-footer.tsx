import { ArrowUpRight } from "lucide-react";

export default function NapFooter() {
  return (
    <footer className="nap-site-footer nap-section">
      <div className="nap-footer-bottom">
        <span className="nap-footer-copyright">© 2026 NAP</span>
        <div className="nap-footer-links"><a href="https://x.com/nap_cx" target="_blank" rel="noopener noreferrer">Follow Nap <ArrowUpRight size={13} aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
