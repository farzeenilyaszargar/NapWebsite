import NapFooter from "../../components/nap-footer";
import StructuredData from "../../components/structured-data";
import { pages, pageMetadata, articleSchema } from "../../lib/seo";
import NapReadingLinks from "../../components/nap-reading-links";
import NapHeader from "../../components/nap-header";
import "../../contrast.css";

export const metadata = pageMetadata(pages.story, true);

export default function WhyWeStartedPost() {
  return (
    <main className="contrast-page nap-article-page">
      <StructuredData data={articleSchema(pages.story)} />
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <span className="nap-blog-label">By <a href="https://x.com/farilyaz" className="nap-inline-link" target="_blank" rel="noopener noreferrer">@farilyaz</a> · 2 Min Read</span>
          <h1><span className="nap-halftone-text">Why</span> We Started</h1>
          <p>An agent says it is done. Four files changed. It ran a few commands and wrote a paragraph explaining how everything works now. I still have to open the changes and see what actually happened.</p>
          <p>I think that part gets very little attention. We talk a lot about what an agent can produce. But someone has to sit there, read it, ask another question and decide whether the change belongs in their project.</p>
          <p>That is the part I wanted to work on with Nap.</p>

          <h2>The work after the prompt</h2>
          <p>The prompt is usually the easy part. Fix this bug. Add this feature. Explain this file. Then the agent starts working and the request becomes a conversation.</p>
          <p>It might have understood the wrong thing. It might have changed more than you wanted. Or it might have done exactly what you asked, and what you asked turns out to be a bad idea. You find that out by looking at the work.</p>
          <p>I wanted the conversation and the changes next to each other. A project I could open, a task I could return to, and a diff I could read before moving on. Very ordinary things. I think they matter a lot when you spend hours doing them.</p>

          <h2>Why build an app around this?</h2>
          <p>There are already good tools for working with coding agents. People use them every day and get real work done. The existence of those tools is a reasonable question to ask us.</p>
          <p>For me, the reason to build Nap is quite specific. I want a native Mac app where choosing an agent, following a conversation and reviewing its changes feel like parts of the same task. I have opinions about how that should work, and building it is how I get to test those opinions.</p>
          <p>If opening a changed file takes me away from the conversation I was reading, that is something to fix. If I come back to a project and have to work out which task I was in, that is something to fix too. These are small decisions, but they are most of the experience.</p>

          <h2>We have to earn the spot</h2>
          <p>Putting several agents in one app is easy to explain on a website. If all Nap does is put another window between you and your agent, you should close it.</p>
          <p>Nap has to answer it in use. Can you follow the work? Can you understand what changed? Can you come back tomorrow and carry on? That is what we are building towards.</p>
          <p>We are taking names on the waitlist for now. I would rather be clear about that than write as if we have already figured everything out.</p>
          <NapReadingLinks current={pages.story.path} />
        </article>
      </section>
      <NapFooter />
    </main>
  );
}
