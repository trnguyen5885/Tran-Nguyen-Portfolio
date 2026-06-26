import { ImageResponse } from "next/og";

export const alt = "Nguyen Tran Trung Nguyen — Mobile Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f4f2ec", color: "#171715", padding: "72px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
        <strong>NGUYEN TRAN TRUNG NGUYEN.</strong><span>Portfolio / 2026</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ color: "#56705a", fontSize: 28, marginBottom: 24 }}>MOBILE ENGINEER</div>
        <div style={{ fontSize: 76, lineHeight: 1.05, fontWeight: 600, maxWidth: 940 }}>Reliable mobile products, built for real value.</div>
      </div>
    </div>,
    size,
  );
}
