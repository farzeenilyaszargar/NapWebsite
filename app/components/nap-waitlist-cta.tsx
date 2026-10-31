import Link from "next/link";

// Downloads open through the waitlist until a public build ships. `primary` draws the
// thick default-button ring of a classic Mac dialog.
export default function NapWaitlistCta({ label = "Download for Mac", primary = true }: { label?: string; primary?: boolean }) {
  return <Link className={`nap-download nap-waitlist-cta${primary ? " nap-download-default" : ""}`} href="/waitlist">{label}</Link>;
}
