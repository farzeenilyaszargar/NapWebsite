import { preload } from "react-dom";

const scenes = {
  botanical: {
    src: "/nap-dream-anemones-1536-ab420473.webp",
    srcSet: "/nap-dream-anemones-720-2ff6d6ce.webp 720w, /nap-dream-anemones-1536-ab420473.webp 1536w",
    width: 1536, height: 1024,
  },
  mist: {
    src: "/nap-dream-mist-2172-917aa1b3.webp",
    srcSet: "/nap-dream-mist-720-04c129b1.webp 720w, /nap-dream-mist-1448-9bcd2038.webp 1448w, /nap-dream-mist-2172-917aa1b3.webp 2172w",
    width: 2172, height: 724,
  },
} as const;

export default function NapDreamImage({ scene, className, eager = false, sizes = "100vw" }: { scene: keyof typeof scenes; className?: string; eager?: boolean; sizes?: string }) {
  const asset = scenes[scene];
  if (eager) {
    preload(asset.src, { as: "image", type: "image/webp", imageSrcSet: asset.srcSet, imageSizes: sizes, fetchPriority: "high" });
  }
  return <img className={className} src={asset.src} srcSet={asset.srcSet} sizes={sizes} width={asset.width} height={asset.height} alt="" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "low"} decoding="async" />;
}
