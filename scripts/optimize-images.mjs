import { readFile, writeFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve, extname, basename } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const sources = [
  "apple-mark.svg",
  "nap-ghost-header.png", "nap-ghost-icon-192.png", "nap-ghost-icon-256.png", "nap-ghost-icon-512.png",
  ...[480, 828, 1448, 2560, 5183].map(width => `nap-task-workspace-${width}.webp`),
  ...["parallel", "conversation", "queue"].map(detail => `nap-blog-${detail}.webp`),
];
const manifest = {};
for (const source of sources) {
  const path = resolve(root, "public", source);
  const original = await readFile(path);
  const metadata = await sharp(original).metadata();
  const format = source === "nap-ghost-header.png" ? "webp" : metadata.format;
  const candidate = format === "svg" ? original : format === "png"
    ? await sharp(original).png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer()
    : await sharp(original).webp({ lossless: true, effort: 6 }).toBuffer();
  let output = original;
  let extension = extname(source);
  if (candidate.length < original.length) {
    const before = await sharp(original).ensureAlpha().raw().toBuffer();
    const after = await sharp(candidate).ensureAlpha().raw().toBuffer();
    const candidateMetadata = await sharp(candidate).metadata();
    if (metadata.width !== candidateMetadata.width || metadata.height !== candidateMetadata.height || before.length !== after.length) {
      throw new Error(`${source}: dimensions changed`);
    }
    // WebP may clear RGB underneath fully transparent pixels, which cannot affect rendering.
    for (let i = 0; i < before.length; i += 4) {
      if (before[i + 3] !== after[i + 3] || (before[i + 3] > 0 &&
        (before[i] !== after[i] || before[i + 1] !== after[i + 1] || before[i + 2] !== after[i + 2]))) {
        throw new Error(`${source}: visible pixels changed`);
      }
    }
    output = candidate;
    extension = `.${format}`;
  }
  const hash = createHash("sha256").update(output).digest("hex").slice(0, 8);
  const filename = `${basename(source, extname(source))}-${hash}${extension}`;
  await writeFile(resolve(root, "public", filename), output);
  manifest[source] = { src: `/${filename}`, width: metadata.width, height: metadata.height,
    bytes: output.length, originalBytes: (await stat(path)).size };
  console.log(`${source}: ${original.length} -> ${output.length} bytes (${metadata.width}x${metadata.height}, lossless)`);
}
await writeFile(resolve(root, "app/lib/image-assets.json"), JSON.stringify(manifest, null, 2) + "\n");
