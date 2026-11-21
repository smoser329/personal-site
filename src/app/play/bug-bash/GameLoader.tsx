"use client";
import dynamic from "next/dynamic";

// Client-only: the game reads localStorage on start and runs a requestAnimationFrame loop.
const BugBash = dynamic(() => import("@/game/bugbash/ui/BugBash"), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] rounded-3xl border border-line bg-panel/40 grid place-items-center font-mono text-xs text-dim">
      Booting ticket queue…
    </div>
  ),
});

export default function GameLoader() {
  return <BugBash />;
}
