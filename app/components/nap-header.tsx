import Link from "next/link";
import NapDownloadCta from "./nap-download-cta";
import images from "../lib/image-assets.json";

export default function NapHeader({ showDownload = true, activePage }: { showDownload?: boolean; activePage?: "home" | "blogs" }) {
  return (
    <header className="nap-header">
      <Link href="/" prefetch={activePage === "home" ? false : undefined} className="nap-wordmark" aria-label="Nap home"><img className="nap-wordmark-mark" src={images["nap-ghost-header.png"].src} width={20} height={23} alt="" aria-hidden="true" /></Link>
      <nav className="nap-nav" aria-label="Main navigation">
        <Link className="nap-docs" href="/blogs" prefetch={activePage === "blogs" ? false : undefined}>Blogs</Link>
        {showDownload && <NapDownloadCta compact location="header" />}
      </nav>
    </header>
  );
}
