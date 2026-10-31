import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nap: one native Mac app for your coding agents. Join the early-access waitlist.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function SocialImage() {
  const sky = await readFile(join(process.cwd(), "assets/nap-social-sky.jpg"));
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#fff", color: "#17191d", fontFamily: "sans-serif", position: "relative" }}>
      <div style={{ display: "flex", padding: "38px 55px", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 39, fontWeight: 700 }}>nap.</span>
        <span style={{ fontSize: 18, color: "#626771" }}>nap.cx</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 12, fontSize: 66, fontWeight: 600, lineHeight: 1.06 }}><span>One app for your</span><span>coding agents.</span></div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24, fontSize: 20, color: "#626771" }}>Claude Code, Codex, and Cursor. Together on Mac.</div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}><span style={{ background: "#17191d", borderRadius: 5, color: "#fff", padding: "12px 21px", fontSize: 17 }}>Join the Mac waitlist</span></div>
      {/* The source artwork is user-supplied; only its encoding changes. */}
      <img src={`data:image/jpeg;base64,${sky.toString("base64")}`} width={1200} height={160} alt="" style={{ position: "absolute", bottom: 0, width: "100%", objectFit: "cover" }} />
    </div>,
    size,
  );
}
