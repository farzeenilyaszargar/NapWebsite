import { preload } from "react-dom";

const avifSources = "/nap-halftone-sky-480-fdd27222.avif 480w, /nap-halftone-sky-960-479bb3e9.avif 960w, /nap-halftone-sky-1199-23f10e94.avif 1199w";

export default function NapSky({ className, eager = false }: { className: string; eager?: boolean }) {
  if (eager) preload("/nap-halftone-sky-1199-23f10e94.avif", { as: "image", type: "image/avif", imageSrcSet: avifSources, imageSizes: "100vw", fetchPriority: "high" });
  return (
    <picture className={className}>
      <source srcSet={avifSources} sizes="100vw" type="image/avif" />
      <source srcSet="/nap-halftone-sky-480-1ab8450e.webp 480w, /nap-halftone-sky-960-a0ef29ff.webp 960w, /nap-halftone-sky-1199-facfaae3.webp 1199w" sizes="100vw" type="image/webp" />
      <img src="/nap-halftone-sky-1199-facfaae3.webp" alt="" width={1199} height={522} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" />
    </picture>
  );
}
