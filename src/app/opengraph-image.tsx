import { ImageResponse } from "next/og";

export const alt = "SPEEDCRAFT // High-Performance Creative Studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "56px 64px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(#d4d4d8 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
            opacity: 0.5,
          }}
        />

        {/* Ambient Top Glow */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "25%",
            width: "550px",
            height: "350px",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(16, 185, 129, 0.08) 50%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "999px",
                backgroundColor: "#06b6d4",
              }}
            />
            <span
              style={{
                fontSize: "24px",
                fontWeight: 900,
                letterSpacing: "-0.5px",
                color: "#09090b",
              }}
            >
              SPEEDCRAFT.
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#ecfdf5",
                border: "1.5px solid #a7f3d0",
                padding: "8px 16px",
                borderRadius: "999px",
                color: "#065f46",
                fontSize: "13px",
                fontWeight: 800,
                letterSpacing: "0.5px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  backgroundColor: "#10b981",
                }}
              />
              100/100 CORE WEB VITALS
            </div>

            <div
              style={{
                backgroundColor: "#f4f4f5",
                border: "1px solid #e4e4e7",
                padding: "8px 16px",
                borderRadius: "999px",
                color: "#52525b",
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "monospace",
              }}
            >
              0.28S FIRST PAINT
            </div>
          </div>
        </div>

        {/* Center Main Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            marginTop: "16px",
            marginBottom: "16px",
          }}
        >
          <h1
            style={{
              fontSize: "66px",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-2.5px",
              color: "#09090b",
              margin: 0,
            }}
          >
            Stop Losing Customers to a
          </h1>
          <h1
            style={{
              fontSize: "66px",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-2.5px",
              color: "#0891b2",
              margin: 0,
            }}
          >
            Slow Website.
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#52525b",
              marginTop: "18px",
              marginBottom: 0,
              lineHeight: 1.4,
              maxWidth: "880px",
            }}
          >
            Hand-coded Next.js web experiences for local businesses and clinical practices. Guaranteed 100/100 PageSpeed with sub-300ms edge rendering.
          </p>
        </div>

        {/* Bottom Telemetry Cards */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            position: "relative",
            paddingTop: "24px",
            borderTop: "1px solid #e4e4e7",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff",
              border: "1px solid #e4e4e7",
              padding: "14px 20px",
              borderRadius: "14px",
              flex: 1,
            }}
          >
            <span style={{ fontSize: "11px", color: "#71717a", fontWeight: 700, letterSpacing: "1px" }}>
              LIGHTHOUSE
            </span>
            <span style={{ fontSize: "22px", color: "#10b981", fontWeight: 900 }}>
              100/100 Score
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff",
              border: "1px solid #e4e4e7",
              padding: "14px 20px",
              borderRadius: "14px",
              flex: 1,
            }}
          >
            <span style={{ fontSize: "11px", color: "#71717a", fontWeight: 700, letterSpacing: "1px" }}>
              LATENCY
            </span>
            <span style={{ fontSize: "22px", color: "#0891b2", fontWeight: 900 }}>
              0.28s Load
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff",
              border: "1px solid #e4e4e7",
              padding: "14px 20px",
              borderRadius: "14px",
              flex: 1,
            }}
          >
            <span style={{ fontSize: "11px", color: "#71717a", fontWeight: 700, letterSpacing: "1px" }}>
              SECURITY
            </span>
            <span style={{ fontSize: "22px", color: "#09090b", fontWeight: 900 }}>
              0 SQL Database
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff",
              border: "1px solid #e4e4e7",
              padding: "14px 20px",
              borderRadius: "14px",
              flex: 1,
            }}
          >
            <span style={{ fontSize: "11px", color: "#71717a", fontWeight: 700, letterSpacing: "1px" }}>
              CONVERSION
            </span>
            <span style={{ fontSize: "22px", color: "#0891b2", fontWeight: 900 }}>
              +185% Lead Lift
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
