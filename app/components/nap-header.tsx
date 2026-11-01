import Link from "next/link";
import NapDownloadCta from "./nap-download-cta";

export default function NapHeader({ showDownload = true }: { showDownload?: boolean }) {
  return (
    <header className="nap-header">
      <Link href="/" className="nap-wordmark" aria-label="Nap home"><img className="nap-wordmark-mark" src="/nap-ghost-header.png" width={20} height={23} alt="" aria-hidden="true" /></Link>
      <nav className="nap-nav" aria-label="Main navigation">
        <Link className="nap-docs" href="/blogs">Blogs</Link>
        {showDownload && <NapDownloadCta compact location="header" />}
      </nav>
    </header>
  );
}
