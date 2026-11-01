const screenshots = {
  parallel: { width: 1000, height: 1488, alt: "Nap's project sidebar with multiple task threads grouped under sndbx, GTX, and fx.", caption: "Project spaces keep individual task threads together in the sidebar." },
  conversation: { width: 1440, height: 1133, alt: "A Codex security-review conversation in Nap, showing the task request and command activity.", caption: "The request, agent response, and command activity stay in the same conversation." },
  queue: { width: 1440, height: 461, alt: "Nap's queued follow-up tasks above the composer and selected agent controls.", caption: "Queued follow-ups and the composer keep the next step close to the current task." },
};

export default function NapArticleScreenshot({ detail }: { detail: keyof typeof screenshots }) {
  const image = screenshots[detail];
  return (
    <figure className={`nap-article-image${detail === "parallel" ? " nap-article-sidebar" : ""}`}>
      <img src={`/nap-blog-${detail}.webp`} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" />
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}
