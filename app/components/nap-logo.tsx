// Transparent ghost mark, trimmed to 125×138.
export const ghostLogo = "/nap-ghost-932c82ae.webp";

export default function NapLogo({ size = 26, className = "nap-logo-mark", eager = false }: { size?: number; className?: string; eager?: boolean }) {
  return <img className={className} src={ghostLogo} width={Math.round((size * 125) / 138)} height={size} alt="" decoding="async" loading={eager ? "eager" : "lazy"} />;
}
