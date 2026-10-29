import { codingAgents } from "./lib/agents";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapProductImage from "./components/nap-product-image";
import NapWaitlistCta from "./components/nap-waitlist-cta";
import NapHeader from "./components/nap-header";
import NapFooter from "./components/nap-footer";
import NapLogo from "./components/nap-logo";
import "./contrast.css";
import styles from "./home-brand.module.css";

export const metadata = pageMetadata(pages.home);

const agentNames = codingAgents.map(({ name }) => name).join(", ").replace(/, ([^,]*)$/, ", and $1");

export default function Home() {
  return (
    <main className={`contrast-page ${styles.page}`}>
      <StructuredData data={homeSchema()} />
      <NapHeader />
      <section className={styles.hero} aria-labelledby="nap-title">
        <div className={styles.ghost} aria-hidden="true"><NapLogo size={80} className={styles.ghostMark} eager /></div>
        <h1 id="nap-title">Your agents.<br />All together.</h1>
        <p className={styles.lede}>One native Mac app for {agentNames}.</p>
        <NapWaitlistCta />
        <p className={styles.note}>Early access · Join the waitlist to get it first</p>
      </section>
      <figure className={styles.product}>
        <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 1200px) 92vw, 1080px" />
      </figure>
      <NapFooter />
    </main>
  );
}
