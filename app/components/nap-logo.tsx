// The ghost mark in solid ink for light pages (125×138 source).
export const ghostLogo = "/nap-ghost-ink-ecec456a.webp";

export default function NapLogo({ height = 22, className = "nap-logo-mark" }: { height?: number; className?: string }) {
  return <img className={className} src={ghostLogo} width={Math.round((height * 125) / 138)} height={height} alt="" decoding="async" />;
}
