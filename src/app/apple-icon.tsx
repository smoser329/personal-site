import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same monogram as app/icon.svg; iOS adds its own rounded corners, so the tile is square.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b0c0e" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <g fill="none" stroke="#ece7de" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 21.5A7 7 0 1 0 16 32A7 7 0 1 1 10 42.5" />
            <path d="M30 46V18L39 33L48 18V46" />
          </g>
          <circle cx="55" cy="45" r="3.5" fill="#f3a83b" />
        </svg>
      </div>
    ),
    size
  );
}
