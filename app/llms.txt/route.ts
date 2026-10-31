import { site } from "../lib/seo";

export const dynamic = "force-static";

export function GET() {
  return new Response(`# Nap

> Nap is a native Mac workspace for AI coding agents. It brings projects, agent conversations, and code-change review into one interface.

Official website: ${site.url}
Availability: waitlist-only. The website does not offer a public installer or promise a release date.
Platform: macOS. No Windows or Linux download is offered.
Agents shown on the site: Claude Code, Codex, Cursor.
Nap is the workspace, not a foundation model. Provider accounts, subscriptions, and usage limits still apply. Pricing and minimum system requirements are not announced here.

## Product and access
- [Nap](${site.url}/): Product information and real app screenshots.
- [Waitlist](${site.url}/waitlist): Name and email signup for availability updates; not immediate access.
- [Official download status](${site.url}/blogs/nap-download): Availability and installation checks.

## Guides
- [Agentic development environments](${site.url}/blogs/nap-agentic-development-environment): Nap, agents, and the surrounding workflow.
- [Parallel coding agents](${site.url}/blogs/parallel-coding-agents): A general workflow guide, not a claim that Nap automatically orchestrates parallel sessions or Git worktrees.
- [All guides](${site.url}/blogs)

## Updates
- [Nap on X](https://x.com/nap_cx)
`, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
