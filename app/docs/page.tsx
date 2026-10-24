import type { Metadata } from "next";
import Link from "next/link";
import PlainShell from "../components/plain-shell";
import { docPages } from "./content";

export const metadata: Metadata = {
  title: "Docs",
  description: "Notes on Nap projects, agents, sessions, and local development.",
  alternates: { canonical: "/docs" },
};

export default function DocsPage() {
  return (
    <PlainShell>
      <h1>the reading material.</h1>
      <p>Nap docs. No sidebar maze required.</p>
      <p><small>These are early development notes. Downloads are paused while we prepare the next build.</small></p>
      <p><Link className="back-link" href="/">← back to nap</Link></p>
      <ul className="docs-index">
        {docPages.map((page) => <li key={page.id}><a href={`#${page.id}`}>{page.title}</a></li>)}
      </ul>
      {docPages.map((page) => (
        <details id={page.id} key={page.id}>
          <summary>{page.title}</summary>
          <p>{page.summary}</p>
          {page.topics.map((topic) => (
            <section key={topic.title}>
              <h3>{topic.title}</h3>
              <p>{topic.body}</p>
              {topic.items ? <ul>{topic.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              {topic.code ? <pre><code>{topic.code.join("\n")}</code></pre> : null}
            </section>
          ))}
        </details>
      ))}
      <p><Link href="/wishlist">join the wishlist</Link></p>
    </PlainShell>
  );
}
