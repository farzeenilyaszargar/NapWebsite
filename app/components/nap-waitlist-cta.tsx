import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NapWaitlistCta() {
  return <Link className="nap-download nap-waitlist-cta" href="/waitlist">Join the waitlist<ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" /></Link>;
}
