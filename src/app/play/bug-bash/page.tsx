import type { Metadata } from "next";
import Link from "next/link";
import GameLoader from "./GameLoader";

export const metadata: Metadata = {
  title: "Bug Bash — Samuel Moser",
  description:
    "A test-engineer clicker game. Fix bugs by hand, then automate: bash, scripts, tests, static analysis, CI/CD, monitoring and AI. Win in about five minutes.",
};

export default function BugBashPage() {
  return (
    <div className="min-h-screen bg-ink">
      <header className="border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/#games" className="group inline-flex items-center gap-2 text-sm text-mute hover:text-fg transition-colors">
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            Samuel Moser
          </Link>
          <span className="font-mono text-[11px] text-dim">autosaves in this browser</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">Play · Clicker</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold tracking-tight text-fg">Bug Bash</h1>
          </div>
          <p className="text-fg-2 text-sm max-w-md leading-relaxed">
            Start by fixing bugs by hand. Spend them learning bash, scripts, test suites, CI/CD, monitoring and AI until the bugs fix
            themselves. Deploy an <span className="text-amber">AI agent swarm</span> to win.
          </p>
        </div>
        <GameLoader />
      </main>
    </div>
  );
}
