import type { Metadata } from "next";
import PlainShell from "../components/plain-shell";
import WaitlistForm from "../waitlist/waitlist-form";

export const metadata: Metadata = {
  title: { absolute: "Nap | Wishlist" },
  description: "A small form for your next big idea. Join the Nap wishlist and hear when our native Mac coding workspace is ready to try.",
  alternates: { canonical: "/wishlist" },
  openGraph: { title: "Nap | Wishlist", url: "/wishlist" },
  twitter: { title: "Nap | Wishlist" },
};

export default function WishlistPage() {
  return <PlainShell><div className="wishlist-content"><WaitlistForm /></div></PlainShell>;
}
