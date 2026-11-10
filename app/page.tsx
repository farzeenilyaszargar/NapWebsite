import { FolderOpen, MessagesSquare, GitCompareArrows } from "lucide-react";
import { preload } from "react-dom";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapLoopVideo from "./components/nap-loop-video";
import { heroMedia } from "./lib/hero-media";
import NapDreamImage from "./components/nap-dream-image";
import NapDownloadCta from "./components/nap-download-cta";
import NapHeader from "./components/nap-header";
import NapFooter from "./components/nap-footer";
import "./contrast.css";
import styles from "./home-brand.module.css";

export const metadata = pageMetadata(pages.home);

const features = [
  { name: "projects", icon: FolderOpen, title: "Run parallel agents", description: "Keep your tasks and conversations with the codebase they belong to. Pick up the right thread without searching through terminal windows.", video: { src: "/nap-feature-parallel-52c3081c.mp4", poster: "/nap-feature-parallel-3ce83461.webp" } },
  { name: "conversation", icon: MessagesSquare, title: "Agent handoff", description: "Give your agent a task, follow its progress, and ask a follow-up. Your project and the conversation stay in the same workspace.", video: { src: "/nap-feature-handoff-0a249ae9.mp4", poster: "/nap-feature-handoff-ad61e9cf.webp" } },
  { name: "review", icon: GitCompareArrows, title: "Thread communication", description: "Keep changed files and review controls in view. Inspect the result, ask for another pass, and decide what to keep before you commit.", video: { src: "/nap-feature-threads-80a56068.mp4", poster: "/nap-feature-threads-f5aae1af.webp" } },
];

export default function Home() {
  preload(heroMedia.poster, { as: "image", type: "image/webp", fetchPriority: "high" });
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
        <NapLoopVideo {...heroMedia} label="Nap workspace demo showing coding agents working in project threads" />
      </figure>

      <section className={styles.features} id="features" aria-label="Inside Nap">
        {features.map(({ name, icon: Icon, title, description, video }) => (
          <article className={`${styles.feature} ${styles[name]}`} key={name}>
            <div className={styles.featureCopy}>
              <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <figure className={styles.featureMedia}>
              <NapDreamImage scene={name === "conversation" ? "alpine" : "botanical"} className={styles.featureArt} sizes="(max-width: 700px) 90vw, 760px" />
              <div className={styles.featureCrop}><NapLoopVideo {...video} label={title + " demo in Nap"} pauseOffscreen /></div>
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
