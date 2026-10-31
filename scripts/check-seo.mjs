import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Validate what crawlers receive, rather than only the metadata source objects.
const root = resolve(import.meta.dirname, "..");
const output = resolve(root, ".next/server/app");
const origin = "https://www.nap.cx";
const preview = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";
const routes = [
  ["index", "/", "Nap | The Interface For All Your Agents"],
  ["blogs", "/blogs", "Nap | Blog: Coding Agent Guides & Workflows"],
  ["blogs/parallel-coding-agents", "/blogs/parallel-coding-agents", "Nap | Parallel Coding Agents: A Practical Workflow Guide"],
  ["blogs/nap-agentic-development-environment", "/blogs/nap-agentic-development-environment", "Nap | Agentic Development Environment for Mac"],
  ["blogs/nap-download", "/blogs/nap-download", "Nap | Download & Early Access for the Mac App"],
  ["waitlist", "/waitlist", "Nap | Waitlist"],
  ["apply", "/apply", "Nap | Apply"],
];
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
}
const descriptions = new Set();
const linkGraph = new Map();
for (const [file, path, title] of routes) {
  const html = readFileSync(resolve(output, `${file}.html`), "utf8");
  const internal = [...html.matchAll(/<a\b[^>]*>/g)]
    .map(([tag]) => attributes(tag).href).filter(Boolean)
    .map((href) => new URL(href, origin + path))
    .filter((url) => url.origin === origin).map((url) => url.pathname);
  linkGraph.set(path, internal);
  const anchorTargets = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(anchorTargets.has(target), `${path}: jump link #${target} has a target`);
  }
  const titles = [...html.matchAll(/<title>(.*?)<\/title>/g)];
  assert.equal(titles.length, 1, `${path}: one title`);
  assert.equal(decode(titles[0][1]), title);
  const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const get = (key) => meta.find((item) => item.name === key || item.property === key)?.content;
  assert.ok(get("description")?.length >= 70 && get("description").length <= 180, `${path}: useful description`);
  assert.ok(!descriptions.has(get("description")), `${path}: unique description`);
  descriptions.add(get("description"));
  assert.equal(get("og:title"), title);
  assert.equal(get("twitter:title"), title);
  assert.equal(get("og:description"), get("description"));
  assert.equal(new URL(get("og:url")).href, origin + path);
  assert.ok(get("og:image")?.startsWith(origin + "/opengraph-image"));
  assert.ok(get("keywords")?.startsWith("Nap,Nap Code,nap.cx,"));
  assert.equal(get("robots")?.includes("noindex"), preview);
  const canonicals = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).filter((item) => item.rel === "canonical");
  assert.deepEqual(canonicals.map((item) => new URL(item.href).href), [origin + path]);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: one primary heading`);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
  const entities = graphs.flatMap((graph) => graph["@graph"] ?? [graph]);
  assert.ok(entities.some((entity) => entity["@type"] === "Organization" && entity.logo?.url.startsWith(origin)), `${path}: publisher identity and logo`);
  assert.ok(entities.some((entity) => entity["@type"] === "WebSite"));
  assert.ok(entities.some((entity) => entity["@id"] === `${origin}${path}#webpage`));
  if (path === "/") {
    assert.ok(!entities.some((entity) => entity["@type"] === "FAQPage"), "no FAQ markup for content absent from the approved layout");
    const app = entities.find((entity) => entity["@type"] === "SoftwareApplication");
    assert.equal(app.operatingSystem, "macOS");
    assert.equal(app.downloadUrl, undefined, "no public download claim while downloads are paused");
    assert.equal(app.potentialAction.target, `${origin}/waitlist`);
  }
  if (path !== "/") {
    const breadcrumb = entities.find((entity) => entity["@type"] === "BreadcrumbList");
    assert.equal(breadcrumb.itemListElement.at(-1).item, origin + path);
  }
  if (path.startsWith("/blogs/")) {
    const article = entities.find((entity) => entity["@type"] === "BlogPosting");
    const heading = decode(html.match(/<h1\b[^>]*>(.*?)<\/h1>/s)[1].replace(/<[^>]*>/g, ""));
    assert.equal(article.headline, heading, `${path}: schema matches the visible article title`);
    assert.ok(article.image.url.startsWith(origin));
    assert.equal(article.author["@id"], `${origin}/#author`);
    assert.ok(entities.some((entity) => entity["@id"] === article.author["@id"] && entity["@type"] === "Person" && entity.url === "https://x.com/farilyaz"));
    assert.ok(internal.includes("/"), "article publisher homepage is reachable");
    assert.ok(entities.some((entity) => entity["@id"] === article.about["@id"] && entity["@type"] === "SoftwareApplication"), "article subject resolves to the actual Nap app");
    if (article.datePublished) {
      assert.ok(html.includes(`<time dateTime="${article.datePublished}">`), `${path}: publication date is visible`);
      assert.equal(get("article:published_time"), article.datePublished);
      const body = html.match(/<article\b[^>]*>(.*?)<\/article>/s)[1];
      assert.ok(body.includes('href="/waitlist"'), `${path}: article includes an accurate early-access action`);
      assert.ok(body.replace(/<[^>]*>/g, " ").split(/\s+/).length >= 450, `${path}: substantive guide content`);
    }
  }
  if (path === "/blogs") {
    const blog = entities.find((entity) => entity["@type"] === "Blog");
    assert.deepEqual(blog.blogPost.map((post) => new URL(post.url).pathname).sort(), routes.filter(([, route]) => route.startsWith("/blogs/")).map(([, route]) => route).sort(), "blog schema includes every published article");
  }
  for (const entity of entities) {
    assert.equal(entity.aggregateRating, undefined, "no invented ratings");
    assert.equal(entity.offers, undefined, "no unconfirmed pricing");
  }
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => attributes(tag));
  for (const image of images) {
    assert.ok(Object.hasOwn(image, "alt"), `${path}: every image has an alt attribute (empty is valid for decorative images)`);
    assert.ok(image.width && image.height, `${path}: images reserve layout space`);
    if (image.src?.startsWith("/")) assert.ok(existsSync(resolve(root, "public", image.src.slice(1))), `${path}: image exists`);
  }
  console.log(`✓ ${path}: metadata, canonical, social cards, structured data, headings, and images`);
}
assert.ok(!existsSync(resolve(root, "app/about/page.tsx")), "About page has been removed");
for (const removed of ["blogs/hello-nap", "blogs/why"]) {
  assert.ok(!existsSync(resolve(root, `app/${removed}/page.tsx`)), `${removed}: old post is removed`);
  assert.ok(!existsSync(resolve(output, `${removed}.html`)), `${removed}: no old content is built`);
  const redirect = JSON.parse(readFileSync(resolve(root, ".next/routes-manifest.json"), "utf8")).redirects.find((rule) => rule.source === `/${removed}`);
  assert.equal(redirect?.destination, "/blogs/nap-agentic-development-environment");
  assert.equal(redirect.statusCode, 308);
}
const knownPages = new Set(routes.map(([, path]) => path));
for (const [path, links] of linkGraph) for (const link of links) {
  assert.ok(knownPages.has(link), `${path}: internal content link ${link} resolves to a known page`);
}
const reached = new Set();
const queue = ["/"];
while (queue.length) {
  const path = queue.shift();
  if (reached.has(path)) continue;
  reached.add(path);
  queue.push(...(linkGraph.get(path) ?? []));
}
// The application page is deliberately shared by direct URL, outside site navigation.
assert.ok(!linkGraph.get("/").includes("/apply"), "the homepage must not link to the application page");
assert.ok(!reached.has("/apply"), "the application page stays outside the homepage navigation flow");
for (const path of knownPages) {
  if (path !== "/apply") assert.ok(reached.has(path), `${path}: content page is reachable from the homepage`);
}
console.log("✓ Content pages are reachable; /apply stays standalone; no broken internal links");
const missing = readFileSync(resolve(output, "_not-found.html"), "utf8");
assert.ok(missing.includes('content="noindex'));
assert.ok(!missing.includes('rel="canonical"'), "404 must not canonicalize to the homepage");
const sitemap = readFileSync(resolve(output, "sitemap.xml.body"), "utf8");
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual([...locations].sort(), preview ? [] : routes.map(([, path]) => origin + path).sort());
const robots = readFileSync(resolve(output, "robots.txt.body"), "utf8");
assert.ok(robots.includes("Allow: /"));
for (const bot of ["OAI-SearchBot", "ChatGPT-User"]) {
  const group = robots.split(/\n\s*\n/).find((group) => group.includes(`User-Agent: ${bot}`));
  assert.ok(group?.includes("Allow: /"), `${bot}: public content is crawlable`);
  assert.ok(group.includes("Disallow: /api/"), `${bot}: API paths stay excluded`);
}
assert.equal(robots.includes(`Sitemap: ${origin}/sitemap.xml`), !preview);
console.log("✓ 404 noindex, sitemap coverage, and crawler access");
