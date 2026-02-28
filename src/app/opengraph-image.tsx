import { ImageResponse } from "next/og";

export const alt = "APIWIT.EXE — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const kanitBold = fetch(
    new URL(
      "https://fonts.gstatic.com/s/kanit/v15/nKKZ-Go6G5tXcraVGwCKd6xBDFs.woff",
    ),
  ).then((res) => res.arrayBuffer());

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
          background: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,45,45,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,45,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* accent glow */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,45,45,0.15) 0%, transparent 70%)",
            top: -100,
            right: -100,
            display: "flex",
          }}
        />

        {/* corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 40,
            height: 40,
            borderTop: "2px solid #ff2d2d",
            borderLeft: "2px solid #ff2d2d",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 40,
            height: 40,
            borderTop: "2px solid #ff2d2d",
            borderRight: "2px solid #ff2d2d",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 40,
            height: 40,
            borderBottom: "2px solid #ff2d2d",
            borderLeft: "2px solid #ff2d2d",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 40,
            height: 40,
            borderBottom: "2px solid #ff2d2d",
            borderRight: "2px solid #ff2d2d",
            display: "flex",
          }}
        />

        {/* title */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontFamily: "Kanit",
            fontWeight: 700,
            color: "#ff2d2d",
            letterSpacing: "-2px",
          }}
        >
          APIWIT.EXE
        </div>

        {/* divider */}
        <div
          style={{
            display: "flex",
            width: 120,
            height: 2,
            background: "#ff2d2d",
            marginTop: 20,
            marginBottom: 20,
          }}
        />

        {/* subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#888888",
            fontFamily: "Kanit",
          }}
        >
          Frontend Developer & Creative Coder
        </div>

        {/* tech tags */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 32,
          }}
        >
          {["React", "Next.js", "TypeScript", "GSAP"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "6px 16px",
                border: "1px solid rgba(255,45,45,0.3)",
                color: "#ededed",
                fontSize: 16,
                fontFamily: "Kanit",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* bottom url */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            display: "flex",
            fontSize: 16,
            color: "#555555",
            fontFamily: "Kanit",
          }}
        >
          apiwit.xyz
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Kanit",
          data: await kanitBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
