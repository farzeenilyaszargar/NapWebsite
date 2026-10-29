import { codingAgents } from "./lib/agents";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapProductImage from "./components/nap-product-image";
import NapWaitlistCta from "./components/nap-waitlist-cta";
import NapHeader from "./components/nap-header";
import NapFooter from "./components/nap-footer";
import "./contrast.css";
import styles from "./home-brand.module.css";

export const metadata = pageMetadata(pages.home);

const agentNames = codingAgents.map(({ name }) => name).join(", ").replace(/, ([^,]*)$/, ", and $1");
const ditherGlow = "/nap-dither-glow-48a1f1a4.png";

const steps = [
  { title: "Open your project", body: "Add a codebase as a space. Its conversations stay with it, so you can pick up any task where you left off." },
  { title: "Choose your agent", body: `Ask ${agentNames} to build, fix, or explain your code, all in the same native interface.` },
  { title: "Review, then commit", body: "See which files changed and by how much. Review the diff, ask a follow-up, or commit when you’re ready." },
];

export default function Home() {
  return (
    <main className={`contrast-page ${styles.page}`}>
      <StructuredData data={homeSchema()} />
      <NapHeader />
      <section className={styles.hero} aria-labelledby="nap-title">
        <img className={styles.glow} src={ditherGlow} width={320} height={180} alt="" aria-hidden="true" />
        <p className="nap-mono-label">Nap for macOS — Early access</p>
        <h1 id="nap-title">Your agents.<br />All together.</h1>
        <p className={styles.lede}>Nap is a native Mac app for AI coding agents. Work with {agentNames} in one workspace, keep each project’s conversations together, and review every change before you commit.</p>
        <div className={styles.actions}>
          <NapWaitlistCta />
          <a className={styles.secondary} href="#how-it-works">How it works</a>
        </div>
        <p className={styles.note}>Early access · Download opens the waitlist</p>
      </section>

      <figure className={styles.product}>
        <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 1240px) 90vw, 1120px" />
      </figure>

      <section className={styles.agents} aria-labelledby="agents-title">
        <h2 id="agents-title" className="nap-mono-label">Works with the agents you already use</h2>
        <ul>{codingAgents.map(({ name, logo }) => <li key={name}><img src={logo} alt="" width={22} height={22} loading="lazy" decoding="async" />{name}</li>)}</ul>
      </section>

      <section id="how-it-works" className={styles.how} aria-labelledby="how-title">
        <h2 id="how-title">One workspace<br />for every agent.</h2>
        <ol>
          {steps.map(({ title, body }, index) => (
            <li key={title}>
              <span className="nap-mono-label">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <img className={styles.glow} src={ditherGlow} width={320} height={180} alt="" aria-hidden="true" loading="lazy" />
        <h2 id="cta-title">Try Nap on your Mac.</h2>
        <p>Join early access and be among the first to download.</p>
        <NapWaitlistCta />
      </section>

      <NapFooter />
    </main>
  );
}
