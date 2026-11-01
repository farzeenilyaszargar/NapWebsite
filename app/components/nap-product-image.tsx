import { preload } from "react-dom";

type Props = { eager?: boolean; sizes: string; alt: string };

const srcSet = "/nap-task-workspace-480.webp 480w, /nap-task-workspace-828.webp 828w, /nap-task-workspace-1448.webp 1448w, /nap-task-workspace-2560.webp 2560w, /nap-task-workspace-5183.webp 5183w";

// Lossless, build-time variants retain screenshot detail without on-demand resizing.
export default function NapProductImage({ eager = false, sizes, alt }: Props) {
  if (eager) {
    preload("/nap-task-workspace-1448.webp", {
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
        src="/nap-task-workspace-1448.webp"
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
