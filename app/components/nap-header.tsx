import Link from "next/link";
import NapLogo from "./nap-logo";

export default function NapHeader() {
  return (
    <header className="nap-header">
      <div className="nap-header-inner">
        <Link href="/" className="nap-logo" aria-label="Nap home"><NapLogo /><span aria-hidden="true">nap</span></Link>
        <nav className="nap-nav" aria-label="Main navigation">
          <Link className="nap-docs" href="/blogs">Blogs</Link>
        </nav>
      </div>
    </header>
  );
}
