import { ImageResponse } from "next/og";

export const alt = "APIWIT.EXE — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [kanitBold, kanitRegular] = await Promise.all([
    fetch(
      "https://github.com/google/fonts/raw/main/ofl/kanit/Kanit-Bold.ttf",
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://github.com/google/fonts/raw/main/ofl/kanit/Kanit-Regular.ttf",
    ).then((r) => r.arrayBuffer()),
  ]);

  const mono = "Consolas, monospace";
  const R = "#ff2d2d";
  const CYAN = "#00f0ff";

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
          background: "#050508",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* deep background gradient layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(255,45,45,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 50% 50% at 75% 20%, rgba(0,240,255,0.04) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(5,5,8,0) 0%, rgba(255,45,45,0.03) 50%, rgba(5,5,8,0) 100%)",
          }}
        />

        {/* perspective grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,45,45,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,45,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* diagonal circuit lines */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: -200,
            width: 1600,
            height: 630,
            display: "flex",
            backgroundImage:
              "linear-gradient(135deg, transparent 48.5%, rgba(255,45,45,0.03) 48.5%, rgba(255,45,45,0.03) 49%, transparent 49%, transparent 51%, rgba(255,45,45,0.03) 51%, rgba(255,45,45,0.03) 51.5%, transparent 51.5%)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* scanlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)",
          }}
        />

        {/* glow orbs */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,45,45,0.1) 0%, rgba(255,45,45,0.03) 40%, transparent 65%)",
            top: -120,
            right: -80,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 60%)",
            bottom: -80,
            left: -60,
            display: "flex",
          }}
        />

        {/* HUD corners */}
        {[
          { top: 24, left: 24, bT: true, bL: true },
          { top: 24, right: 24, bT: true, bR: true },
          { bottom: 24, left: 24, bB: true, bL: true },
          { bottom: 24, right: 24, bB: true, bR: true },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 28,
              height: 28,
              ...(c.top !== undefined ? { top: c.top } : {}),
              ...(c.bottom !== undefined ? { bottom: c.bottom } : {}),
              ...(c.left !== undefined ? { left: c.left } : {}),
              ...(c.right !== undefined ? { right: c.right } : {}),
              borderTop: c.bT ? `2px solid rgba(255,45,45,0.5)` : "none",
              borderBottom: c.bB ? `2px solid rgba(255,45,45,0.5)` : "none",
              borderLeft: c.bL ? `2px solid rgba(255,45,45,0.5)` : "none",
              borderRight: c.bR ? `2px solid rgba(255,45,45,0.5)` : "none",
              display: "flex",
            }}
          />
        ))}

        {/* HUD top data */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 66,
            display: "flex",
            gap: 20,
            fontFamily: mono,
            fontSize: 10,
            color: "rgba(255,45,45,0.35)",
          }}
        >
          <div style={{ display: "flex" }}>SYS://v2.0</div>
          <div style={{ display: "flex", color: "rgba(0,240,255,0.25)" }}>
            ■ ONLINE
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 66,
            display: "flex",
            gap: 20,
            fontFamily: mono,
            fontSize: 10,
            color: "rgba(255,45,45,0.35)",
          }}
        >
          <div style={{ display: "flex" }}>BANGKOK.TH</div>
          <div style={{ display: "flex" }}>12ms</div>
        </div>

        {/* top/bottom accent lines */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 24,
            right: 24,
            height: 1,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(255,45,45,0.25), rgba(255,45,45,0.06) 20%, transparent 40%, transparent 60%, rgba(255,45,45,0.06) 80%, rgba(255,45,45,0.25))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 24,
            right: 24,
            height: 1,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(255,45,45,0.25), rgba(255,45,45,0.06) 20%, transparent 40%, transparent 60%, rgba(255,45,45,0.06) 80%, rgba(255,45,45,0.25))",
          }}
        />

        {/* center data bars - left side decoration */}
        <div
          style={{
            position: "absolute",
            left: 50,
            top: 250,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {[60, 40, 75, 30, 55, 45].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 2,
                background: `rgba(255,45,45,${0.08 + i * 0.02})`,
                display: "flex",
              }}
            />
          ))}
        </div>
        {/* right side decoration */}
        <div
          style={{
            position: "absolute",
            right: 50,
            top: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 6,
          }}
        >
          {[45, 70, 35, 60, 40, 50].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 2,
                background: `rgba(0,240,255,${0.06 + i * 0.015})`,
                display: "flex",
              }}
            />
          ))}
        </div>

        {/* ===== CENTER CONTENT ===== */}

        {/* title glow backdrop */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 120,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,45,45,0.12) 0%, transparent 70%)",
            top: 200,
            display: "flex",
          }}
        />

        {/* chevron decorators above title */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 12,
            fontSize: 10,
            fontFamily: mono,
            color: "rgba(255,45,45,0.3)",
          }}
        >
          <div style={{ display: "flex" }}>{"◇"}</div>
          <div style={{ display: "flex" }}>{"◇"}</div>
          <div style={{ display: "flex" }}>{"◆"}</div>
          <div style={{ display: "flex" }}>{"◇"}</div>
          <div style={{ display: "flex" }}>{"◇"}</div>
        </div>

        {/* glitch title stack */}
        <div style={{ display: "flex", position: "relative" }}>
          {/* cyan offset (chromatic aberration) */}
          <div
            style={{
              position: "absolute",
              fontSize: 82,
              fontFamily: "Kanit",
              fontWeight: 700,
              color: "rgba(0,240,255,0.12)",
              letterSpacing: "-2px",
              left: -4,
              top: 3,
              display: "flex",
            }}
          >
            APIWIT.EXE
          </div>
          {/* red offset */}
          <div
            style={{
              position: "absolute",
              fontSize: 82,
              fontFamily: "Kanit",
              fontWeight: 700,
              color: "rgba(255,45,45,0.1)",
              letterSpacing: "-2px",
              left: 4,
              top: -3,
              display: "flex",
            }}
          >
            APIWIT.EXE
          </div>
          {/* main title */}
          <div
            style={{
              fontSize: 82,
              fontFamily: "Kanit",
              fontWeight: 700,
              color: R,
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            APIWIT.EXE
          </div>
        </div>

        {/* subtitle line with brackets */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 6,
          }}
        >
          <div
            style={{
              width: 50,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${R})`,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 13,
              fontFamily: mono,
              color: "rgba(255,45,45,0.5)",
              letterSpacing: "4px",
              display: "flex",
            }}
          >
            {"["}
          </div>
          <div
            style={{
              fontSize: 20,
              fontFamily: "Kanit",
              fontWeight: 400,
              color: "#ededed",
              letterSpacing: "6px",
              display: "flex",
            }}
          >
            FRONTEND DEVELOPER
          </div>
          <div
            style={{
              fontSize: 13,
              fontFamily: mono,
              color: "rgba(255,45,45,0.5)",
              letterSpacing: "4px",
              display: "flex",
            }}
          >
            {"]"}
          </div>
          <div
            style={{
              width: 50,
              height: 1,
              background: `linear-gradient(90deg, ${R}, transparent)`,
              display: "flex",
            }}
          />
        </div>

        {/* terminal description */}
        <div
          style={{
            display: "flex",
            fontFamily: mono,
            fontSize: 13,
            color: "#444",
            marginTop: 14,
            gap: 6,
          }}
        >
          <span style={{ color: CYAN, opacity: 0.5 }}>{">"}</span>
          <span style={{ display: "flex" }}>
            creative_coder // interactive web experiences
          </span>
        </div>

        {/* tech tags */}
        <div style={{ display: "flex", gap: 8, marginTop: 28 }}>
          {["REACT", "NEXT.JS", "TYPESCRIPT", "GSAP", "TAILWIND"].map(
            (tag, i) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "4px 12px",
                  border: `1px solid rgba(255,45,45,${0.15 + i * 0.04})`,
                  background: "rgba(255,45,45,0.03)",
                  color: `rgba(255,45,45,${0.5 + i * 0.08})`,
                  fontSize: 11,
                  fontFamily: mono,
                  letterSpacing: "2px",
                }}
              >
                {tag}
              </div>
            ),
          )}
        </div>

        {/* bottom HUD */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 66,
            right: 66,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: mono,
            fontSize: 10,
            color: "#333",
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ display: "flex" }}>■ apiwit.xyz</div>
            <div style={{ display: "flex" }}>■ github/axonapiwit</div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: R,
                display: "flex",
              }}
            />
            <div style={{ display: "flex", color: "rgba(255,45,45,0.4)" }}>
              NEURAL_LINK::ACTIVE
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Kanit", data: kanitBold, weight: 700, style: "normal" },
        { name: "Kanit", data: kanitRegular, weight: 400, style: "normal" },
      ],
    },
  );
}
