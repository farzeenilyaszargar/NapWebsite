import { macDownloadUrl } from "../lib/releases";
import images from "../lib/image-assets.json";

type Props = { compact?: boolean; appearance?: "dark" | "light"; location: "header" | "hero" | "closing" | "guide" };

export default function NapDownloadCta({ compact = false, appearance = "dark", location }: Props) {
  return (
    <a href={macDownloadUrl} className={`nap-mac-download${compact ? " nap-nav-download" : ""}${appearance === "light" ? " nap-mac-download-light" : ""}`} data-download-location={location} aria-label="Download Nap for macOS">
      <span>{compact ? "Download" : "Download for macOS"}</span>
      <img src={images["apple-mark.svg"].src} width={15} height={18} alt="" aria-hidden="true" />
    </a>
  );
}
