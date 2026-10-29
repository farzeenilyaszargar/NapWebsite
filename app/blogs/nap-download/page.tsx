import Link from "next/link";
import NapGuide from "../../components/nap-guide";
import { pages, pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata(pages.download, true);

const contents = [
  { id: "request-access", label: "Request early access" },
  { id: "macos-availability", label: "Mac download status" },
  { id: "installation-checks", label: "Installation checks" },
  { id: "windows-linux", label: "Windows and Linux" },
];

export default function NapDownloadPost() {
  return (
    <NapGuide page={pages.download} contents={contents}>
      <p>Looking to download Nap? As of October 30, 2026, Nap is waitlist-only. The official route is <Link className="nap-inline-link" href={pages.waitlist.path}>joining the Nap waitlist</Link> for availability and product updates. This page does not provide a public installer or promise an access date.</p>
      <p>Nap is the native Mac app at <Link className="nap-inline-link" href={pages.home.path}>nap.cx</Link> that brings AI coding agents into one workspace. If you found another product with the same name, check the domain and product description before signing up or installing anything.</p>

      <h2>What is the Nap app?</h2>
      <p>Nap brings project conversations, agent selection, and code-change review into one Mac interface. The agent choices shown on the official site are Claude Code, Codex, and Cursor. Nap is the workspace around those tools, not a new foundation model.</p>
      <p>For a fuller explanation, read <Link className="nap-inline-link" href={pages.ade.path}>Nap and the agentic development environment</Link>. It describes the difference between an app, an agent, and the review process around generated changes.</p>

      <h2 id="request-access">How do I request early access?</h2>
      <p>Open the <Link className="nap-inline-link" href={pages.waitlist.path}>official waitlist form</Link>, enter your name and an email address you can access, and submit it. Wait for the on-page confirmation before assuming the request was saved. If the form reports an error, correct the details or try again rather than repeatedly submitting.</p>
      <p>Joining the waitlist records your interest. It is not a purchase, an immediate download, or a guarantee of an invitation by a particular date. You do not need to supply an agent API key to this form.</p>

      <h2 id="macos-availability">Is there a public macOS installer?</h2>
      <p>Not through the current public website. Older links, cached pages, or third-party listings may describe a different availability state. Start from nap.cx for current information rather than assuming an old release link is still the supported installation route.</p>
      <p>Minimum macOS versions, supported hardware, and installation instructions should be checked against the build offered when access becomes available. This guide does not invent requirements for an unreleased public build.</p>

      <h2 id="installation-checks">What should I check before installing an agent app?</h2>
      <p>Verify that the download comes from the developer&apos;s official distribution route. Inspect the publisher and the permissions the app requests. If a message unexpectedly asks for credentials, payment, or a security override, verify it independently before continuing.</p>
      <p>macOS checks software downloaded outside the App Store using protections including Developer ID and notarization. Read <a className="nap-inline-link" href="https://support.apple.com/en-us/102445">Apple&apos;s guide to safely opening apps</a> if you encounter a warning. This is general installation advice, not a claim that a particular Nap build has been notarized.</p>
      <p>Before giving any coding agent access to a repository, understand its file and command permissions. Keep credentials out of prompts and use a project you can safely inspect and recover. An agent interface should make review easier; it does not remove the need to review.</p>

      <h2>Does Nap include the agents&apos; subscriptions?</h2>
      <p>Do not assume that access to Nap includes a provider subscription, unlimited model usage, or API credits. Authentication, billing, and usage limits depend on the selected provider and the supported integration. Check the terms that apply when you receive access.</p>

      <h2 id="windows-linux">Can I download Nap for Windows or Linux?</h2>
      <p>The product currently described on this site is a native Mac app. There is no public Windows or Linux download offered here, and this article makes no release-timing promise for either platform.</p>

      <h2>Where should I look for updates?</h2>
      <p>Use the <Link className="nap-inline-link" href={pages.home.path}>Nap homepage</Link>, the <Link className="nap-inline-link" href={pages.blogs.path}>Nap blog</Link>, and <a className="nap-inline-link" href="https://x.com/nap_cx">@nap_cx on X</a>. For availability updates, <Link className="nap-inline-link" href={pages.waitlist.path}>join the waitlist</Link> with an address you check.</p>
    </NapGuide>
  );
}
