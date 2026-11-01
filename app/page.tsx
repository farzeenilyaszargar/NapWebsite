import { FolderOpen, MessagesSquare, GitCompareArrows } from "lucide-react";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapProductImage from "./components/nap-product-image";
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
      <NapHeader />

      <section className={styles.intro} aria-labelledby="nap-title">
        <h1 id="nap-title"><strong>Your coding agents, all together.</strong> Nap brings Claude Code, Codex, and Cursor into one native Mac app, so you can follow the conversation and review the changes without switching apps.</h1>
        <div className={styles.onboard}>
          <span>Onboard Your Agents</span>
          <ul aria-label="Supported agents">
            <li><img src="/codex-logo-3366e2d2.webp" alt="Codex" width={25} height={25} /></li>
            <li><img src="/anthropic-mark.svg" alt="Anthropic" width={25} height={25} /></li>
            <li><img src="/cursor-logo-8bc30dd7.webp" alt="Cursor" width={25} height={25} /></li>
          </ul>
        </div>
        <NapDownloadCta location="hero" />
      </section>

      <figure className={styles.workspace} id="workspace">
        <NapProductImage eager alt="Nap for Mac, with project spaces, an agent conversation, code review, and a terminal in one native workspace." sizes="(max-width: 700px) 94vw, (max-width: 1280px) 90vw, 1120px" />
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
              <NapProductImage alt={alt} sizes="(max-width: 700px) 170vw, 1600px" />
            </figure>
          </article>
        ))}
      </section>

      <section className={styles.closing} aria-labelledby="try-nap-title">
        <img className={styles.closingArt} src="/nap-halftone-arch.webp" alt="" width={2172} height={724} loading="lazy" decoding="async" />
        <div className={styles.closingCopy}>
          <h2 id="try-nap-title">Try Nap.</h2>
          <NapDownloadCta location="closing" appearance="light" />
        </div>
      </section>
      <NapFooter />
    </main>
  );
}
