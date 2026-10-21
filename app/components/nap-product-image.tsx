type Props = { eager?: boolean; sizes: string; alt: string };

// Build-time variants avoid a cold image-optimizer request on the first visit.
export default function NapProductImage({ eager = false, sizes, alt }: Props) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet="/nap-coding-workspace-480-36495261.webp 480w, /nap-coding-workspace-828-4a87e8f8.webp 828w, /nap-coding-workspace-1448-6553c27d.webp 1448w"
        sizes={sizes}
      />
      <img
        src="/nap-coding-workspace-1448-6553c27d.webp"
        alt={alt}
        width={1448}
        height={1086}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
