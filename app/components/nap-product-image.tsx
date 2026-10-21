type Props = { eager?: boolean; sizes: string; alt: string };

// Lossless, build-time variants retain screenshot detail without on-demand resizing.
export default function NapProductImage({ eager = false, sizes, alt }: Props) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet="/nap-coding-workspace-480-95f017cd.webp 480w, /nap-coding-workspace-828-d5875163.webp 828w, /nap-coding-workspace-1448-2e73eecc.webp 1448w"
        sizes={sizes}
      />
      <img
        src="/nap-coding-workspace-1448-2e73eecc.webp"
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
