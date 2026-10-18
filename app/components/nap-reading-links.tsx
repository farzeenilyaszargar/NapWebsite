import Link from "next/link";
import { pages } from "../lib/seo";

const reading = [
  { page: pages.about, label: "About Nap" },
  { page: pages.story, label: "Why We Started" },
  { page: pages.why, label: "Why This?" },
];

export default function NapReadingLinks({ current }: { current: string }) {
  return (
    <nav className="nap-reading-links" aria-label="Further reading">
      <span className="nap-blog-label">KEEP EXPLORING</span>
      <div>{reading.filter(({ page }) => page.path !== current).map(({ page, label }) => (
        <Link key={page.path} href={page.path} className="nap-inline-link">{label}</Link>
      ))}</div>
    </nav>
  );
}
