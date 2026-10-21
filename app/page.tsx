import Link from "next/link";
import { codingAgents } from "./lib/agents";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import WorkflowIcon from "./components/workflow-icon";
import NapProductImage from "./components/nap-product-image";
import NapWaitlistCta from "./components/nap-waitlist-cta";
import NapHeader from "./components/nap-header";
import DeferredLiquidField from "./components/deferred-liquid-field";
import "./contrast.css";

export const metadata = pageMetadata(pages.home);

export default function Home() {
  return (
    <main className="contrast-page nap-home-page">
      <StructuredData data={homeSchema()} />
      <NapHeader />

      <section className="nap-hero" aria-labelledby="nap-title">
        <div className="nap-copy">
          <p className="nap-eyebrow">A LITTLE LESS FRICTION</p>
          <h1 id="nap-title"><span>YOUR AGENTS.</span><span>ALL TOGETHER.</span></h1>
          <div className="nap-hero-bottom">
          <p className="nap-description">Nap brings your coding agents together in one workspace, giving your biggest ideas room to become real.</p>
          <div className="nap-action">
            <NapWaitlistCta />
            <p className="nap-download-note">Your next good idea starts here.</p>
          </div>
          </div>
        </div>
      </section>

      <figure className="nap-full-width-product">
        <NapProductImage eager alt="Nap’s native coding workspace with project sessions and an AI agent reviewing a Python project." sizes="(max-width: 700px) 90vw, 92vw" />
      </figure>
      <section className="nap-agents nap-section" aria-labelledby="agents-title">
        <h2 id="agents-title" className="nap-section-label">WORK WITH YOUR CODING AGENTS, RIGHT INSIDE NAP.</h2>
        <ul>
          {codingAgents.map(({ name, logo }) => (
            // Agent names are adjacent text; empty alt avoids duplicate announcements.
            <li key={name} data-agent={name}><img src={logo} alt="" width={36} height={36} loading="lazy" decoding="async" className={name === "OpenCode" || name === "Grok Bot" ? "nap-agent-logo-small" : name === "Codex" || name === "Claude Code" ? "nap-agent-logo-original" : undefined} /><span>{name}</span></li>
          ))}
        </ul>
      </section>


      <section className="nap-workflow nap-section" aria-labelledby="workflow-title">
        <div className="nap-section-heading"><h2 id="workflow-title">Less setup.<br />More getting somewhere.</h2><p><Link href={pages.about.path} className="nap-inline-link">A native AI coding workspace for Mac.</Link><br />Open a project. Choose an agent. Start building.</p></div>
        <div className="nap-workflow-steps">
          <article><WorkflowIcon kind="project" /><h3>Open your project.</h3><p>Bring an existing project into Nap and start with what you want to change: a bug to fix, a feature to build, or a question about the code. Keep that work connected to the project and its conversation.</p></article>
          <article><WorkflowIcon kind="agent" /><h3>Choose your agent.</h3><p>Choose the coding agent you want to work with, then describe your goal in the conversation. Nap gives your agents a shared native interface on Mac, so you can focus on the task while keeping a familiar place to work.</p></article>
          <article><WorkflowIcon kind="work" /><h3>Review and keep going.</h3><p>Follow the agent’s response and review the code changes before deciding what comes next. Ask a follow-up question, refine the approach, or continue building. Your project, conversation, and review stay together in the same app.</p></article>
        </div>
      </section>




      <section className="nap-closing" aria-labelledby="closing-title">
        <p className="nap-section-label">YOUR NEXT GOOD IDEA STARTS HERE.</p>
        <h2 id="closing-title">GET INTO<br />YOUR FLOW.</h2>
        <NapWaitlistCta />
      </section>
      <footer className="nap-site-footer nap-section">
        <div className="nap-footer-bottom">
          <span className="nap-footer-copyright">© 2026 NAP</span>
          <a className="nap-footer-social" href="https://x.com/nap_cx" target="_blank" rel="noopener noreferrer">Follow us on X</a>
        </div>
      </footer>
      <DeferredLiquidField />
    </main>
  );
}
