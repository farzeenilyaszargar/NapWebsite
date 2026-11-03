import { FolderOpen, MessagesSquare, GitCompareArrows, ArrowRight } from "lucide-react";
import Link from "next/link";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapProductImage from "./components/nap-product-image";
import NapDreamImage from "./components/nap-dream-image";
import NapDownloadCta from "./components/nap-download-cta";
import NapHeader from "./components/nap-header";
import NapFooter from "./components/nap-footer";
import "./contrast.css";
import styles from "./home-brand.module.css";

export const metadata = pageMetadata(pages.home);

const features = [
  { name: "projects", icon: FolderOpen, title: "A home for every project.", description: "Keep your tasks and conversations with the codebase they belong to. Pick up the right thread without searching through terminal windows.", alt: "Nap project spaces and conversations organized in the sidebar." },
  { name: "conversation", icon: MessagesSquare, title: "The conversation stays with the work.", description: "Give your agent a task, follow its progress, and ask a follow-up. Your project and the conversation stay in the same workspace.", alt: "An agent conversation in Nap with its response and code-change summary." },
  { name: "review", icon: GitCompareArrows, title: "See the changes. Make the call.", description: "Keep changed files and review controls in view. Inspect the result, ask for another pass, and decide what to keep before you commit.", alt: "Nap code review with changed files, line counts, and an integrated terminal." },
];

export default function Home() {
  return (
    <main className={`contrast-page ${styles.page}`}>
      <StructuredData data={homeSchema()} />
      <NapHeader activePage="home" />

      <section className={styles.intro} aria-labelledby="nap-title">
        <div className={styles.onboard}>
          <span>Onboard Your Agents</span>
          <ul aria-label="Supported agents">
            <li><img src="/codex-logo-3366e2d2.webp" alt="Codex" width={16} height={16} /></li>
            <li><img src="/claude-code-logo-5a6c64a5.webp" alt="Claude Code" width={16} height={16} /></li>
            <li><img src="/cursor-logo-8bc30dd7.webp" alt="Cursor" width={16} height={16} /></li>
          </ul>
        </div>
        <h1 id="nap-title"><strong>Your coding agents, all together.</strong> Nap brings Claude Code, Codex, and Cursor into one native Mac app.</h1>
        <p className={styles.productEssay} aria-hidden="true">
          Nap is a native Mac app that brings your AI coding agents into one interface. Instead of moving between separate terminal windows and disconnected conversations, developers can keep their projects, agent sessions, and code review together. Nap brings Claude Code, Codex, and Cursor into a focused workspace for building software. The idea is simple: keep the tools you already use, while giving the work a clearer home. Whether you are exploring a repository, asking an agent to implement a change, or reviewing its output, Nap keeps the conversation close to the code and the project it belongs to each day.
          {" "}
          If you are searching for Nap download, download Nap, or Nap for macOS, the main Nap website is the starting point. The Download for macOS button links to the Mac build through the latest GitHub release download address. You can also join the waitlist through the website. Nap is presented here as a Mac app, so availability on other operating systems should not be assumed. For the current build and release information, follow the download and release links rather than relying on an old version number copied into another website. The product and its supported workflows can change over time.
          {" "}
          Nap agents refers to the coding agents you bring into Nap, not a promise that Nap replaces their underlying models or provider accounts. Claude Code, Codex, and Cursor each have their own capabilities and requirements. Nap provides a shared interface around agent work, helping developers follow tasks and return to the right conversation. Projects have a place in the sidebar, conversations stay associated with the work, and changed files can be inspected before deciding what to keep. A useful coding workspace should make agent activity easier to understand without turning every request into another collection of windows to manage manually.
          {" "}
          Developers researching Nap parallel agents or parallel coding agents are often trying to organize several pieces of work without losing context. Parallel development requires attention to project boundaries, overlapping changes, and review. More simultaneous tasks do not automatically mean better results. Clear task descriptions, isolated changes where appropriate, and human inspection remain important. The Nap blog discusses parallel coding workflows and the idea of an agentic development environment, sometimes called an ADE. These articles explain practical concepts around coding agents and project organization, while the app screenshots show the actual Nap interface rather than an invented dashboard or performance claim.
          {" "}
          Searches such as Nap app, Nap agent, Nap ADE, and Nap codes can lead to questions about what the product does today and where it might go next. Nap focuses on bringing coding agents together in a native Mac experience. Its blog also describes a longer vision that includes possible cloud workflows, clearly distinguished from currently available functionality. Start with a project, give your preferred agent a bounded task, follow the conversation, and inspect the result. Visit the Nap website for the Mac download, read the product articles for context, or join the waitlist to express interest in future availability.
        </p>
        <div className={styles.heroActions}>
          <NapDownloadCta location="hero" />
          <Link className={styles.waitlistLink} href={pages.waitlist.path}><span>Join the waitlist</span><ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" /></Link>
        </div>
      </section>

      <figure className={styles.workspace} id="workspace">
        <NapDreamImage scene="botanical" className={styles.workspaceArt} eager sizes="(max-width: 1280px) 94vw, 1160px" />
        <NapProductImage eager alt="Nap for Mac with project task threads, a Codex conversation, queued follow-ups, and a file browser in one workspace." sizes="(max-width: 700px) 86vw, (max-width: 1280px) 83vw, 1040px" />
      </figure>

      <section className={styles.features} id="features" aria-label="Inside Nap">
        {features.map(({ name, icon: Icon, title, description, alt }) => (
          <article className={`${styles.feature} ${styles[name]}`} key={name}>
            <div className={styles.featureCopy}>
              <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <figure className={styles.featureMedia}>
              <NapDreamImage scene={name === "conversation" ? "alpine" : "botanical"} className={styles.featureArt} sizes="(max-width: 700px) 90vw, 760px" />
              <div className={styles.featureCrop}><NapProductImage alt={alt} sizes="(max-width: 700px) 170vw, 1300px" /></div>
            </figure>
          </article>
        ))}
      </section>

      <section className={styles.closing} aria-labelledby="try-nap-title">
        <NapDreamImage scene="alpine" className={styles.closingArt} />
        <div className={styles.closingCopy}>
          <h2 id="try-nap-title">Try Nap.</h2>
          <NapDownloadCta location="closing" />
        </div>
        <div className={styles.closingFooter}><NapFooter /></div>
      </section>
    </main>
  );
}
