import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NapWaitlistCta({ location }: { location?: "hero" | "closing" | "guide" }) {
  return <Link className="nap-download nap-waitlist-cta" data-cta-location={location} href="/waitlist">Join the Mac waitlist<ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" /></Link>;
}
