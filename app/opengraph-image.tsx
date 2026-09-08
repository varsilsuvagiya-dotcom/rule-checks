import { ImageResponse } from "next/og";

export const alt = "Broken Fixture Co — Website Auditing Software";
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2952e3 0%, #1d3aa8 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -1 }}>
          Broken Fixture Co
        </div>
        <div style={{ fontSize: 32, marginTop: 24, opacity: 0.9 }}>
          Website Auditing Software
        </div>
      </div>
    ),
    { ...size }
  );
}
