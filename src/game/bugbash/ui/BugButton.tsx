"use client";
import { useRef, useState } from "react";
import { fmt } from "../format";

type Floater = { id: number; x: number; y: number; text: string };

export default function BugButton({ perClick, onClick }: { perClick: number; onClick: () => number }) {
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const nextId = useRef(0);

  const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const gained = onClick();
    const rect = e.currentTarget.getBoundingClientRect();
    // Keyboard activation has no pointer position; float from the center.
    const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2;
    nextId.current += 1;
    const id = nextId.current;
    setFloaters((f) => [...f.slice(-14), { id, x, y, text: `+${fmt(gained, 1)}` }]);
    setTimeout(() => setFloaters((f) => f.filter((p) => p.id !== id)), 900);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handle}
        className="group relative w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-line-2 bg-panel grid place-items-center select-none touch-manipulation transition-[transform,border-color,box-shadow] duration-75 hover:border-amber/60 hover:shadow-[0_0_60px_-10px_rgb(243_168_59/0.35)] active:scale-[0.96]"
        aria-label={`Fix a bug by hand (+${fmt(perClick, 1)})`}
      >
        <span className="absolute inset-3 rounded-full border border-dashed border-line" />
        <BugIcon />
        {floaters.map((f) => (
          <span
            key={f.id}
            className="bugbash-float pointer-events-none absolute font-mono text-sm font-semibold text-amber"
            style={{ left: f.x, top: f.y }}
          >
            {f.text}
          </span>
        ))}
      </button>
      <p className="mt-5 font-mono text-xs text-mute">
        Fix bug by hand · <span className="text-fg-2">+{fmt(perClick, 1)}</span> per click
      </p>
    </div>
  );
}

function BugIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-24 h-24 sm:w-28 sm:h-28 text-fg transition-transform group-active:rotate-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      aria-hidden
    >
      {/* antennae */}
      <path d="M26 15 21 8M38 15 43 8" />
      {/* head + body */}
      <path d="M24 20a8 7 0 0 1 16 0" />
      <rect x="19" y="20" width="26" height="32" rx="13" />
      <path d="M32 24v26" />
      {/* legs */}
      <path d="M19 28h-8M19 37h-9M19 46h-8M45 28h8M45 37h9M45 46h8" />
      {/* the bug fix: an amber check */}
      <path d="m24 37 5 5 11-11" className="text-amber" stroke="currentColor" strokeWidth={4} />
    </svg>
  );
}
