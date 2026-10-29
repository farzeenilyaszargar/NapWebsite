import { srcSet } from "./nap-product-image";

// Crop rectangles are in the 1448×941 coordinate frame of the workspace screenshot.
const FRAME = { width: 1448, height: 941 };

type Props = { x: number; y: number; width: number; height: number; maxWidth: number; className?: string };

// Shows one region of the real product screenshot, so features use the app rather than mockups.
export default function NapFeatureShot({ x, y, width, height, maxWidth, className }: Props) {
  const scale = FRAME.width / width;
  return (
    <div className={className} style={{ aspectRatio: `${width} / ${height}`, overflow: "hidden" }} aria-hidden="true">
      <picture>
        <source type="image/webp" srcSet={srcSet} sizes={`calc(${scale.toFixed(3)} * min(90vw, ${maxWidth}px))`} />
        <img
          src="/nap-agent-workspace-1448-f57bf9cc.webp"
          alt=""
          width={5306}
          height={3449}
          loading="lazy"
          decoding="async"
          style={{
            display: "block",
            maxWidth: "none",
            width: `${scale * 100}%`,
            height: "auto",
            transform: `translate(${(-x / FRAME.width) * 100}%, ${(-y / FRAME.height) * 100}%)`,
          }}
        />
      </picture>
    </div>
  );
}
