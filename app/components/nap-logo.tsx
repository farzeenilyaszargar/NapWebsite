// A 14×16 pixel-art ghost, drawn at whole-number scales so every pixel stays square.
export const ghostLogo = "/nap-ghost-pixel-9b0ef05c.png";

export default function NapLogo({ scale = 2, className = "nap-logo-mark" }: { scale?: number; className?: string }) {
  return <img className={className} src={ghostLogo} width={14 * scale} height={16 * scale} alt="" decoding="async" />;
}
