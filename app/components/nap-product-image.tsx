import { preload } from "react-dom";
import images from "../lib/image-assets.json";

type Props = { eager?: boolean; sizes: string; alt: string };

const srcSet = ([480, 828, 1448, 2560, 5183] as const)
  .map(width => `${images[`nap-task-workspace-${width}.webp`].src} ${width}w`).join(", ");
const fallback = images["nap-task-workspace-1448.webp"].src;

// Lossless, build-time variants retain screenshot detail without on-demand resizing.
export default function NapProductImage({ eager = false, sizes, alt }: Props) {
  if (eager) {
    preload(fallback, {
      as: "image",
      type: "image/webp",
      imageSrcSet: srcSet,
      imageSizes: sizes,
      fetchPriority: "high",
    });
  }

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={srcSet}
        sizes={sizes}
      />
      <img
        src={fallback}
        alt={alt}
        width={5183}
        height={3369}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
