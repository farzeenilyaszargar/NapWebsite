import { FolderOpen, MessagesSquare, GitCompareArrows } from "lucide-react";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapProductImage from "./components/nap-product-image";
import NapHeroVideo from "./components/nap-hero-video";
import NapDreamImage from "./components/nap-dream-image";
import NapDownloadCta from "./components/nap-download-cta";
import NapHeader from "./components/nap-header";
import NapFooter from "./components/nap-footer";
import "./contrast.css";
import styles from "./home-brand.module.css";

export const metadata = pageMetadata(pages.home);

const features = [
  { name: "projects", icon: FolderOpen, title: "Run parallel agents", description: "Keep your tasks and conversations with the codebase they belong to. Pick up the right thread without searching through terminal windows.", alt: "Nap project spaces and conversations organized in the sidebar." },
  { name: "conversation", icon: MessagesSquare, title: "Agent handoff", description: "Give your agent a task, follow its progress, and ask a follow-up. Your project and the conversation stay in the same workspace.", alt: "An agent conversation in Nap with its response and code-change summary." },
  { name: "review", icon: GitCompareArrows, title: "Thread communication", description: "Keep changed files and review controls in view. Inspect the result, ask for another pass, and decide what to keep before you commit.", alt: "Nap code review with changed files, line counts, and an integrated terminal." },
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
            <li><img className={styles.cursorLogo} src="/cursor-logo-8bc30dd7.webp" alt="Cursor" width={16} height={16} /></li>
          </ul>
        </div>
        <h1 id="nap-title"><strong>Your coding agents, all together.</strong> Nap brings Claude Code, Codex, and Cursor into one native Mac app.</h1>
        <div className={styles.heroActions}>
          <NapDownloadCta location="hero" />
        </div>
      </section>

      <figure className={styles.workspace} id="workspace">
        <NapDreamImage scene="botanical" className={styles.workspaceArt} eager sizes="(max-width: 1280px) 94vw, 1160px" />
        <NapHeroVideo />
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
