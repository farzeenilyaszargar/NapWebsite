import Link from "next/link";
import NapGuide from "../../components/nap-guide";
import { pages, pageMetadata } from "../../lib/seo";
import { macDownloadUrl, macReleasesUrl } from "../../lib/releases";

export const metadata = pageMetadata(pages.download, true);

const contents = [
  { id: "download", label: "Official download" },
  { id: "install", label: "Install on your Mac" },
  { id: "first-project", label: "Your first project" },
  { id: "other-platforms", label: "Other platforms" },
];

export default function NapDownloadPost() {
  return (
    <NapGuide page={pages.download} contents={contents}>
      <p>Nap for macOS is available to download. Get the app from the <a className="nap-inline-link" href={macDownloadUrl}>official latest-release download</a>, then open a project and work with your coding agents in one native Mac workspace. You do not need to join a waitlist before using the download link.</p>
      <p>Nap brings Claude Code, Codex, and Cursor into one interface for project conversations and code review. Nap is the workspace around those agents, not a new AI model. Your provider still determines authentication, subscriptions, and usage limits.</p>

      <h2 id="download">Where do I download Nap?</h2>
      <p>Use the Download for macOS button on <Link className="nap-inline-link" href={pages.home.path}>nap.cx</Link> or the link in this guide. Both point to the same GitHub latest-release asset, so you do not need to find an old version number or choose a third-party mirror. The download follows the repository&apos;s latest published release.</p>
      <p>The repository and installer retain an earlier name: the file is currently called <code>NotNap-macos.dmg</code>. The official link is under <code>farzeenilyaszargar/NotNap</code> on GitHub. You can inspect the <a className="nap-inline-link" href={macReleasesUrl}>release page</a> before downloading if you want to check the file, release notes, or publisher.</p>

      <h2 id="install">How do I install Nap on a Mac?</h2>
      <p>Download the disk image, open it in Finder, and follow the installation instructions included with that build. Keep the original file until you have checked that the app opens successfully. Consult the release notes for supported hardware, macOS requirements, and changes in the build you are installing.</p>
      <p>A download link is not a reason to ignore a macOS security warning. Verify the source and publisher before opening downloaded software. If macOS blocks an app, read <a className="nap-inline-link" href="https://support.apple.com/en-us/102445">Apple&apos;s guide to safely opening apps</a> rather than disabling system protections or running a command copied from an unrelated page.</p>
      <p>This guide does not assert that every Nap build is signed or notarized. Check the actual file and its release information when those properties matter to your environment, especially on a managed work computer.</p>

      <h2 id="first-project">What should I do with my first project?</h2>
      <p>Start with a codebase you know and a small, bounded task. Choose an agent, describe the change or question, and read the response. A bug explanation, a focused test, or a small UI adjustment is easier to assess than an open-ended rewrite of an unfamiliar repository.</p>
      <p>Keep a recoverable starting point in version control. Review the changed files and run the checks appropriate to the task. Ask a follow-up when the agent&apos;s explanation does not match the diff. The point of the workspace is to keep the conversation and evidence close together, not to remove your responsibility for accepting changes.</p>
      <p>Read the <Link className="nap-inline-link" href={pages.ade.path}>Nap workspace guide</Link> for the distinction between an agent and the app around it. The <Link className="nap-inline-link" href={pages.parallel.path}>parallel coding agents guide</Link> covers task boundaries and Git worktrees without assuming that Nap automatically creates or merges them.</p>

      <h2>Do I need an agent account?</h2>
      <p>Check the requirements of the provider you choose. Access to the Nap app should not be confused with provider subscriptions, model credits, or unlimited usage. Review authentication and permissions in the integration you use, and never paste private keys into a website&apos;s updates form.</p>

      <h2 id="other-platforms">What about Windows and Linux?</h2>
      <p>The download offered here is for macOS. This website does not offer a public Windows or Linux installer or promise a release date for either platform. You can <Link className="nap-inline-link" href={pages.waitlist.path}>join the updates list</Link> for product and platform news.</p>
      <p>For current product information, return to the <Link className="nap-inline-link" href={pages.home.path}>Nap homepage</Link> or follow <a className="nap-inline-link" href="https://x.com/nap_cx">Nap on X</a>. Use the official website and release page when checking availability rather than relying on an older cached article or an unaffiliated download listing.</p>
    </NapGuide>
  );
}
