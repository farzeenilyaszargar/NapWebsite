import { macDownloadUrl } from "../lib/releases";

type Props = { compact?: boolean; appearance?: "dark" | "light"; location: "header" | "hero" | "closing" | "guide" };

export default function NapDownloadCta({ compact = false, appearance = "dark", location }: Props) {
  return (
    <a href={macDownloadUrl} className={`nap-mac-download${compact ? " nap-nav-download" : ""}${appearance === "light" ? " nap-mac-download-light" : ""}`} data-download-location={location} aria-label="Download Nap for macOS">
      <img src="/apple-mark.svg" width={15} height={18} alt="" aria-hidden="true" />
      <span>{compact ? "Download" : "Download for macOS"}</span>
    </a>
  );
}
