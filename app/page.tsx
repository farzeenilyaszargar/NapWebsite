import { codingAgents } from "./lib/agents";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapProductImage from "./components/nap-product-image";
import NapWaitlistCta from "./components/nap-waitlist-cta";
import NapHeader from "./components/nap-header";
import NapFooter from "./components/nap-footer";
import "./contrast.css";
import styles from "./home-brand.module.css";
import Link from "next/link";

export const metadata = pageMetadata(pages.home);

export default function Home() {
  return (
    <main className={`contrast-page ${styles.page}`}>
      <StructuredData data={homeSchema()} />
      <NapHeader />
      <section className={styles.hero} aria-labelledby="nap-title">
        <div className={styles.sculpture} aria-hidden="true"><img src="/dreamcore-sculpture-457bf4df.webp" width={1152} height={2048} alt="" decoding="async" fetchPriority="low" /></div>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}><span className={styles.statusDot} /> A LITTLE LESS NOISE. A LITTLE MORE NAP.</p>
          <h1 id="nap-title">A home for your<br /><em>coding agents.</em></h1>
          <p className={styles.intro}>Your favourite agents. Your next big idea.<br />One native Mac app to bring it all together.</p>
          <div className={styles.heroActions}><NapWaitlistCta /><span>For macOS <span aria-hidden="true">·</span> Early access</span></div>
          <a className={styles.explore} href="#workspace">A place to get lost in your work <span aria-hidden="true">&darr;</span></a>
        </div>
      </section>

      <figure className={styles.workspace} id="workspace">
        <figcaption><span>YOUR SPACE TO MAKE SOMETHING</span><span>THE NAP WORKSPACE <span aria-hidden="true">&#8599;</span></span></figcaption>
        <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 1320px) 90vw, 1180px" />
        <div className={styles.workspaceFoot}><span>Less switching. More being here.</span><span>MACOS / NATIVE / YOURS</span></div>
      </figure>

      <section className={styles.agents} aria-labelledby="agents-title">
        <h2 id="agents-title">Familiar minds. New possibilities.</h2>
        <ul>{codingAgents.map(({ name, logo }) => <li key={name}><img src={logo} alt="" width={24} height={24} loading="lazy" decoding="async" /><span>{name}</span></li>)}</ul>
      </section>

      <section className={styles.workflow} aria-labelledby="workflow-title">
        <div className={styles.workflowIntro}>
          <div><p className={styles.eyebrow}>THOUGHTFULLY OUT OF YOUR WAY</p><h2 id="workflow-title">Stay in the flow.<br /><em>Not in twelve tabs.</em></h2></div>
          <p>Good work needs a little breathing room. Nap keeps your projects, conversations, and code changes in the same place. So you can spend less time finding your way back, and more time making something worth coming back to.</p>
        </div>
        <div className={styles.steps}>
          <article>
            <span className={styles.topic}>YOUR PROJECTS</span><h3>Pick up the thread.</h3><p>Open your codebase and keep the conversation with it. The context stays close, even when your mind wanders.</p>
          </article>
          <article>
            <span className={styles.topic}>YOUR AGENTS</span><h3>Bring your good company.</h3><p>Work with Claude Code, Codex, or Cursor. Familiar agents, without a different world around each one.</p>
          </article>
          <article>
            <span className={styles.topic}>YOUR CALL</span><h3>Make it something yours.</h3><p>Read the changes, ask another question, and decide what to keep. You are still the one with the idea.</p>
          </article>
        </div>
        <Link className={styles.readMore} href="/blogs/nap-agentic-development-environment">A closer look at the way Nap works <span aria-hidden="true">&#8599;</span></Link>
      </section>

      <section className={styles.closing} aria-labelledby="try-nap-title">
        <img className={styles.bloom} src="/dreamcore-bloom-feaed1c0.webp" width={1080} height={1350} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className={styles.closingInner}><p className={styles.eyebrow}>SOMETHING GOOD IS TAKING SHAPE</p><h2 id="try-nap-title">Your next good idea.<br /><em>In good company.</em></h2><p>Make a little room for Nap.</p><NapWaitlistCta /></div>
      </section>
      <NapFooter />
      <div className={styles.productReference} aria-hidden="true">
        Nap is a native Mac app that brings AI coding agents, project conversations, and code changes into one interface. Built for developers who want a clearer way to work with agents, Nap keeps the task and its results together. Open your codebase, choose an agent, describe what you need, and review what changed before deciding what comes next.

        The Nap app brings Claude Code, Codex, and Cursor into a shared workspace experience. These are the coding agents; Nap is the interface around their work. Rather than introducing another foundation model, Nap focuses on the everyday steps that surround agentic coding: understanding project context, following a conversation, asking useful questions, and inspecting the resulting changes.

        A coding task rarely finishes with a single prompt. You might ask an agent to investigate a bug, explain an unfamiliar module, or build a feature. Its first response is the beginning of the review, not proof that everything works. Nap brings the conversation and code review closer together so you can question assumptions, inspect files, and continue the task with context.

        This approach fits the idea of an agentic development environment, or ADE: a workspace organised around delegating development tasks and supervising the outcome. Nap gives that workflow a native Mac interface. It is designed around your projects and preferred agents, with the developer responsible for accepting changes, checking behaviour, and deciding whether the result belongs in the codebase.

        For developers exploring parallel coding agents, the Nap blog explains how to divide tasks, separate working directories with Git worktrees, and review changes before integration. Parallel agent workflows need clear ownership and sensible boundaries. Separate branches do not automatically isolate files, and successful merges do not guarantee correct behaviour. These guides explain the workflow without assuming that Nap automatically provisions worktrees or orchestrates concurrent sessions.

        The website also provides a practical guide to agentic development environments, explaining the difference between an app, an agent, and an IDE. Together, these resources help developers evaluate coding tools through concrete tasks rather than promises. The focus is on understanding what an agent did, verifying its output, and building a workflow that remains manageable as projects and conversations grow. Start with a bounded task, inspect the diff, and test the behaviour that matters.

        Looking for the official Nap download or wondering how to download Nap for Mac? Nap is currently available through the waitlist, not a public installer on this website. Visit nap.cx for official product information and join the Nap waitlist with your name and email address. Signing up requests availability updates; it does not promise immediate access or a release date.

        Explore the Nap website to see the app, read the coding agent guides, and follow product updates. Provider authentication, subscriptions, usage limits, and platform requirements should be verified against the integration and build you receive. Whether you are learning about AI coding agents or evaluating a new Mac development workspace, Nap offers a straightforward starting point: your agents, your project, and the changes you need to understand.
      </div>
    </main>
  );
}
