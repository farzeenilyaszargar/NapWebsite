import NapFooter from "../../components/nap-footer";
import StructuredData from "../../components/structured-data";
import { pages, pageMetadata, articleSchema } from "../../lib/seo";
import NapReadingLinks from "../../components/nap-reading-links";
import NapHeader from "../../components/nap-header";
import "../../contrast.css";

export const metadata = pageMetadata(pages.why, true);

export default function WhyPost() {
  return (
    <main className="contrast-page nap-article-page">
      <StructuredData data={articleSchema(pages.why)} />
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <span className="nap-blog-label">By <a href="https://x.com/farilyaz" className="nap-inline-link" target="_blank" rel="noopener noreferrer">@farilyaz</a> · 2 Min Read</span>
          <h1><span className="nap-halftone-text">Why</span> This?</h1>
          <p>Here is what Nap is. A native Mac app where you open a project, choose a coding agent, give it a task and review what it changed.</p>
          <p>The intelligence comes from the agent you choose. Our job is to make the work around it easy to follow. That is the product.</p>

          <h2>Take an actual task</h2>
          <p>Say a button in your app does nothing when you click it. You open the project in Nap and ask an agent to find out why.</p>
          <p>It looks through the code, runs commands and responds. You can follow the conversation and open the changed files for review. Maybe the fix makes sense. Maybe it has touched a file that has nothing to do with the button. Either way, you have something concrete to look at before you continue.</p>
          <p>Then you ask the next question. Why was that file changed? What happens if the request fails? Can we do this with a smaller change? A lot of useful work happens in those follow-ups.</p>

          <h2>The interface has a job</h2>
          <p>I want the app to make it obvious which project I am in, which agent I am working with and what that agent has done. Those are basic questions. Having to keep answering them yourself gets tiring.</p>
          <p>Nap puts project spaces on the left, the conversation in the middle and code changes beside it. There is a terminal for the commands you need to see. You can look at the response and the diff together, then decide what to ask for next.</p>
          <p>The agent choices we show are Codex, Claude Code and Cursor. People have preferences here. Choosing one should not mean learning the whole surrounding app again.</p>

          <h2>A response still needs a review</h2>
          <p>An agent can be very confident about a change that breaks something else. It can pass a test and miss the behaviour you actually care about. A clean-looking diff can still be wrong.</p>
          <p>So I think seeing the work matters. Read the explanation. Open the files. Run the app. Ask another question when the answer seems strange. Nap gives those steps a place in the same workspace.</p>

          <h2>Where we are</h2>
          <p>Nap is being built for Mac, and access is through the waitlist for now. The website shows the app, but a screenshot only tells you so much.</p>
          <p>The useful test will be a real project and a task you need to finish. If Nap makes that session easier to follow, there is a reason to use it. That is what we want to get right.</p>
          <NapReadingLinks current={pages.why.path} />
        </article>
      </section>
      <NapFooter />
    </main>
  );
}
