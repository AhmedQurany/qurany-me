import { ImageResponse } from "next/og";

export const alt = "Ahmed Qurany — Creative Experience Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#F7F4EF",
          color: "#171411",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#5E5852" }}>
          AHMED QURANY — CREATIVE EXPERIENCE ARCHITECT
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
          <span>One designer who sees the whole system —</span>
          <span style={{ color: "#B5482E" }}>strategy, interface, and build.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#5E5852", borderTop: "2px solid #171411", paddingTop: 24 }}>
          <span>11+ years · 500+ projects</span>
          <span>qurany.me</span>
        </div>
      </div>
    ),
    size,
  );
}
