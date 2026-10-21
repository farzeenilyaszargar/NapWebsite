type Props = { eager?: boolean; sizes: string; alt: string };

// Lossless, build-time variants retain screenshot detail without on-demand resizing.
export default function NapProductImage({ eager = false, sizes, alt }: Props) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet="/nap-agent-workspace-480-58903382.webp 480w, /nap-agent-workspace-828-f77c9a81.webp 828w, /nap-agent-workspace-1448-f57bf9cc.webp 1448w, /nap-agent-workspace-2560-746e5d8b.webp 2560w, /nap-agent-workspace-5306-059ac310.webp 5306w"
        sizes={sizes}
      />
      <img
        src="/nap-agent-workspace-1448-f57bf9cc.webp"
        alt={alt}
        width={5306}
        height={3449}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
