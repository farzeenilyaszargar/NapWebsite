import NapHeader from "../components/nap-header";
import NapFooter from "../components/nap-footer";
import type { Metadata } from "next";
import WaitlistForm from "./waitlist-form";
import "../contrast.css";
import "./waitlist.css";

export const metadata: Metadata = {
  title: { absolute: "Nap | Wishlist" },
  description: "Sign up for Nap product news and platform updates.",
  alternates: { canonical: "/waitlist" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function WaitlistPage() {
  return (
    <main className="contrast-page nap-waitlist-page">
      <NapHeader showDownload={false} />
      <WaitlistForm />
      <NapFooter />
    </main>
  );
}
