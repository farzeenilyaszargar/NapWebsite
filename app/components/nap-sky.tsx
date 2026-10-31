import { preload } from "react-dom";

const artwork = {
  sky: {
    avif: "/nap-halftone-sky-480-fdd27222.avif 480w, /nap-halftone-sky-960-479bb3e9.avif 960w, /nap-halftone-sky-1199-23f10e94.avif 1199w",
    webp: "/nap-halftone-sky-480-1ab8450e.webp 480w, /nap-halftone-sky-960-a0ef29ff.webp 960w, /nap-halftone-sky-1199-facfaae3.webp 1199w",
    src: "/nap-halftone-sky-1199-facfaae3.webp", preload: "/nap-halftone-sky-1199-23f10e94.avif", width: 1199, height: 522,
  },
  clouds: {
    avif: "/nap-cloud-hero-480-b17e8817.avif 480w, /nap-cloud-hero-1024-0747aa3e.avif 1024w",
    webp: "/nap-cloud-hero-480-4cf95a6e.webp 480w, /nap-cloud-hero-1024-a32e5ec2.webp 1024w",
    src: "/nap-cloud-hero-1024-a32e5ec2.webp", preload: "/nap-cloud-hero-1024-0747aa3e.avif", width: 1024, height: 579,
  },
} as const;

export default function NapSky({ className, eager = false, variant = "sky" }: { className: string; eager?: boolean; variant?: keyof typeof artwork }) {
  const asset = artwork[variant];
  if (eager) preload(asset.preload, { as: "image", type: "image/avif", imageSrcSet: asset.avif, imageSizes: "100vw", fetchPriority: "high" });
  return (
    <picture className={className}>
      <source srcSet={asset.avif} sizes="100vw" type="image/avif" />
      <source srcSet={asset.webp} sizes="100vw" type="image/webp" />
      <img src={asset.src} alt="" width={asset.width} height={asset.height} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" />
    </picture>
  );
}
