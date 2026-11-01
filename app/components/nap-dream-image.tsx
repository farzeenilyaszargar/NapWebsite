const scenes = {
  botanical: {
    src: "/nap-dream-botanical-1536-b496e896.webp",
    srcSet: "/nap-dream-botanical-720-4c1f23a1.webp 720w, /nap-dream-botanical-1536-b496e896.webp 1536w",
    width: 1536, height: 1024,
  },
  alpine: {
    src: "/nap-dream-alpine-2172-d5db7d39.webp",
    srcSet: "/nap-dream-alpine-720-132f5ed0.webp 720w, /nap-dream-alpine-1448-1102d2ee.webp 1448w, /nap-dream-alpine-2172-d5db7d39.webp 2172w",
    width: 2172, height: 724,
  },
} as const;

export default function NapDreamImage({ scene, className, eager = false, sizes = "100vw" }: { scene: keyof typeof scenes; className: string; eager?: boolean; sizes?: string }) {
  const asset = scenes[scene];
  return <img className={className} src={asset.src} srcSet={asset.srcSet} sizes={sizes} width={asset.width} height={asset.height} alt="" loading={eager ? "eager" : "lazy"} decoding="async" />;
}
