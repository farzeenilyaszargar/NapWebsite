import { codingAgents } from "./lib/agents";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapProductImage from "./components/nap-product-image";
import NapWaitlistCta from "./components/nap-waitlist-cta";
import NapHeader from "./components/nap-header";
import NapFooter from "./components/nap-footer";
import RisoSky from "./components/riso-sky";
import "./contrast.css";
import styles from "./home-brand.module.css";

export const metadata = pageMetadata(pages.home);

const agentNames = codingAgents.map(({ name }) => name).join(", ").replace(/, ([^,]*)$/, ", and $1");

const features = [
  { title: "A space for every project", body: "Each codebase keeps its own conversations, so you can pick up any task exactly where you left off." },
  { title: "The agent you prefer", body: `Work with ${agentNames} from one composer, in one native interface.` },
  { title: "Review, then commit", body: "Every answer shows the files an agent touched, line by line. Ask a follow-up or commit when it’s right." },
];

export default function Home() {
  return (
    <main className={`contrast-page ${styles.page}`}>
      <StructuredData data={homeSchema()} />
      <NapHeader />

      <section className={styles.hero} aria-labelledby="nap-title">
        <h1 id="nap-title">Your agents.<br />All together.</h1>
        <p>Nap is a native Mac app for AI coding agents. Open a project, pick an agent, and review every change it makes.</p>
        <NapWaitlistCta />
        <small>Early access for macOS. Download opens the waitlist.</small>
      </section>

      <div className={styles.stage}>
        <RisoSky className={styles.sky} />
        <figure className={styles.product}>
          <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 1240px) 84vw, 1040px" />
        </figure>
      </div>

      <section className={styles.agents} aria-labelledby="agents-title">
        <h2 id="agents-title">Works with</h2>
        <ul>{codingAgents.map(({ name, logo }) => <li key={name}><img src={logo} alt="" width={26} height={26} loading="lazy" decoding="async" />{name}</li>)}</ul>
      </section>

      <section className={styles.features} aria-labelledby="features-title">
        <h2 id="features-title">From prompt to commit, in one window.</h2>
        <ol className={styles.featureList}>
          {features.map(({ title, body }, index) => (
            <li key={title}>
              <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <RisoSky className={styles.sky} warmth={1.25} seed={7} />
        <div className={styles.ctaCard}>
          <h2 id="cta-title">Try Nap on your Mac.</h2>
          <NapWaitlistCta />
        </div>
      </section>

      <NapFooter />
    </main>
  );
}
