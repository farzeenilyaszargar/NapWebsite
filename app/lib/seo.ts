import type { Metadata } from "next";
import { productQuestions } from "./product";

export const pageTitle = (label: string) => `Nap | ${label}`;
export const isIndexable = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
const brandKeywords = ["Nap", "Nap Code", "nap.cx"];

export const site = {
  name: "Nap",
  alternateName: "Nap Code",
  url: "https://www.nap.cx",
  title: pageTitle("The Interface For All Your Agents"),
  description: "Nap is a native AI coding app for Mac. Bring your coding agents into one workspace to open projects, chat with agents, and review code changes.",
  image: "/opengraph-image",
  logo: "/nap-icon-256-625b4c17.png",
};

export const pages = {
  home: {
    path: "/", title: pageTitle("AI Coding Agents for Mac & Download Updates"),
    description: "Nap is a native Mac app for Claude Code, Codex, and Cursor. Bring your AI coding agents together and join the waitlist for Nap download updates.",
    keywords: ["nap download", "download nap", "nap agents", "nap codes", "nap code download", "nap for mac", "nap macos download", "nap AI coding agents", "AI coding app for Mac", "AI coding workspace", "coding agent interface", "agentic coding", "Claude Code", "Codex", "Cursor"],
  },
  blogs: {
    path: "/blogs", title: pageTitle("Blogs"),
    description: "Read the Nap blog: the ideas behind a native AI coding workspace for Mac, working with coding agents, and turning conversations into code changes.",
    keywords: ["Nap blog", "AI coding agents", "native Mac app", "coding workspace"],
  },
  story: {
    path: "/blogs/hello-nap", title: pageTitle("Why We Started"),
    description: "Why we are building Nap around the work after the prompt: following coding agents, reading code changes, and deciding what belongs in your project.",
    keywords: ["Nap story", "AI coding workflow", "coding agent workspace", "Mac development app"],
  },
  why: {
    path: "/blogs/why", title: pageTitle("Why This?"),
    description: "What Nap does: open a project, work with a coding agent, and review its changes in one native Mac app. An honest look at the workflow and current availability.",
    keywords: ["how Nap works", "AI coding app", "coding agent interface", "Claude Code workspace", "Codex workspace"],
  },
  apply: {
    path: "/apply", title: pageTitle("Apply"),
    description: "Applications to join the Nap team are closed at the moment. Visit Nap for product news and updates.",
    keywords: ["Nap team", "apply to Nap", "build with Nap"],
  },
  waitlist: {
    path: "/waitlist", title: pageTitle("Waitlist"),
    description: "Join the Nap waitlist for availability and product updates. Bring your coding agents and ideas together in one native AI coding workspace for Mac.",
    keywords: ["Nap waitlist", "Nap Code early access", "AI coding app for Mac"],
  },

};

type Page = (typeof pages)[keyof typeof pages];
const absolute = (path: string) => new URL(path, site.url).toString();
const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;
const authorId = `${site.url}/#author`;
const author = { "@type": "Person", "@id": authorId, name: "@farilyaz", url: "https://x.com/farilyaz", sameAs: ["https://x.com/farilyaz"] };

export const indexing: Metadata["robots"] = {
  index: isIndexable,
  follow: true,
  googleBot: { index: isIndexable, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
};

export function pageMetadata(page: Page, article = false): Metadata {
  return {
    title: { absolute: page.title },
    description: page.description,
    ...(article ? { authors: [{ name: "@farilyaz", url: "https://x.com/farilyaz" }] } : {}),
    keywords: [...brandKeywords, ...page.keywords],
    alternates: { canonical: page.path },
    openGraph: {
      type: article ? "article" : "website",
      title: page.title,
      description: page.description,
      url: page.path,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: site.image, width: 1200, height: 630, type: "image/png", alt: "Nap — Your agents. All together. Native AI coding app for Mac." }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@nap_cx",
      creator: article ? "@farilyaz" : "@nap_cx",
      title: page.title,
      description: page.description,
      images: [{ url: site.image, alt: "Nap — Native AI coding app for Mac" }],
    },
  };
}

// Shared entity definitions make each page understandable on its own, including
// articles reached directly from search. Only published facts belong here.
export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": organizationId, name: site.name, alternateName: site.alternateName, url: site.url, logo: { "@type": "ImageObject", url: absolute(site.logo), width: 256, height: 256 }, sameAs: ["https://x.com/nap_cx"] },
      author,
      { "@type": "WebSite", "@id": websiteId, name: site.name, alternateName: [site.alternateName, "nap.cx"], url: site.url, description: site.description, publisher: { "@id": organizationId }, inLanguage: "en" },
    ],
  };
}

function breadcrumbSchema(page: Page) {
  const items = [{ name: "Nap", item: absolute("/") }];
  if (page.path.startsWith("/blogs")) items.push({ name: "Blogs", item: absolute(pages.blogs.path) });
  if (page === pages.story || page === pages.why) items.push({ name: page === pages.story ? "Why We Started" : "Why This?", item: absolute(page.path) });
  if (page === pages.apply) items.push({ name: "Apply", item: absolute(page.path) });
  if (page === pages.waitlist) items.push({ name: "Waitlist", item: absolute(page.path) });
  return {
    "@type": "BreadcrumbList", "@id": `${absolute(page.path)}#breadcrumbs`,
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
  };
}

function webPageSchema(page: Page, type = "WebPage") {
  return {
    "@type": type, "@id": `${absolute(page.path)}#webpage`, url: absolute(page.path),
    name: page.title, description: page.description, inLanguage: "en",
    isPartOf: { "@id": websiteId }, publisher: { "@id": organizationId },
    ...(page.path !== "/" ? { breadcrumb: { "@id": `${absolute(page.path)}#breadcrumbs` } } : {}),
  };
}

function softwareSchema() {
  return { "@type": "SoftwareApplication", "@id": `${site.url}/#app`, name: site.name, alternateName: site.alternateName, url: site.url, applicationCategory: "DeveloperApplication", applicationSubCategory: "AI coding agent workspace", operatingSystem: "macOS", description: site.description, image: absolute(site.image), screenshot: absolute("/nap-agent-workspace-5306-059ac310.webp"), publisher: { "@id": organizationId }, featureList: ["Native coding agent interface", "Project conversations", "Agent selection", "Code change review"], potentialAction: { "@type": "JoinAction", name: "Join the Nap waitlist", target: absolute(pages.waitlist.path) } };
}

export function homeSchema() {
  const appId = `${site.url}/#app`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...webPageSchema(pages.home), mainEntity: { "@id": appId }, about: { "@id": appId }, hasPart: { "@id": `${site.url}/#nap-questions` } },
      softwareSchema(),
      {
        "@type": "FAQPage", "@id": `${site.url}/#nap-questions`, url: `${site.url}/#nap-questions`,
        name: "Nap download and early access questions", about: { "@id": appId },
        isPartOf: { "@id": `${site.url}/#webpage` },
        mainEntity: productQuestions.map(({ id, question, answer }) => ({
          "@type": "Question", "@id": `${site.url}/#${id}`, name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}

export function blogSchema() {
  const blogId = `${site.url}/blogs#blog`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...webPageSchema(pages.blogs, "CollectionPage"), mainEntity: { "@id": blogId } },
      breadcrumbSchema(pages.blogs),
      { "@type": "Blog", "@id": blogId, name: "Nap Blog", url: absolute(pages.blogs.path), description: pages.blogs.description, inLanguage: "en", publisher: { "@id": organizationId },
        blogPost: [pages.story, pages.why].map((page) => ({ "@type": "BlogPosting", "@id": `${absolute(page.path)}#article`, url: absolute(page.path), headline: page === pages.story ? "Why We Started" : "Why This?" })),
      },
    ],
  };
}

export function articleSchema(page: typeof pages.story | typeof pages.why) {
  const articleId = `${absolute(page.path)}#article`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...webPageSchema(page), mainEntity: { "@id": articleId } },
      breadcrumbSchema(page),
      { "@type": "BlogPosting", "@id": articleId,
        headline: page === pages.story ? "Why We Started" : "Why This?",
        description: page.description, url: absolute(page.path),
        image: { "@type": "ImageObject", url: absolute(site.image), width: 1200, height: 630 },
        mainEntityOfPage: { "@id": `${absolute(page.path)}#webpage` },
        author: { "@id": authorId }, publisher: { "@id": organizationId },
        isPartOf: { "@id": `${site.url}/blogs#blog` }, about: { "@id": `${site.url}/#app` }, inLanguage: "en",
      },
    ],
  };
}

export function waitlistSchema() {
  return { "@context": "https://schema.org", "@graph": [webPageSchema(pages.waitlist), breadcrumbSchema(pages.waitlist)] };
}

export function applySchema() {
  return { "@context": "https://schema.org", "@graph": [webPageSchema(pages.apply), breadcrumbSchema(pages.apply)] };
}
