import { ImageResponse } from "next/og";

// The link-preview image shown when the site is shared. Next.js adds the
// og:image tag for it to every page automatically.
export const runtime = "edge";
export const alt = "Evalative — independent property evaluations";
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
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(160deg, #242424 0%, #111111 100%)",
          color: "#F5F4EF",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#D4AF37", textTransform: "uppercase" }}>
          Independent property evaluations
        </div>
        <div style={{ display: "flex", fontSize: 116, fontWeight: 600, marginTop: 20 }}>Evalative</div>
        <div style={{ display: "flex", width: 96, height: 3, background: "#D4AF37", marginTop: 28 }} />
        <div style={{ display: "flex", fontSize: 36, lineHeight: 1.35, marginTop: 36, maxWidth: 900, color: "#D8D6CC" }}>
          Data-driven verdicts on renovating, selling, renting, or buying — with no agent or lender commissions.
        </div>
      </div>
    ),
    { ...size }
  );
}
