"use client";
import dynamic from "next/dynamic";
import SectionHeader from "./SectionHeader";

const SnakeGame = dynamic(() => import("./SnakeGame"), { ssr: false });

export default function Games() {
  return (
    <section id="games" className="py-28 border-t border-line">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          index="06"
          label="Play"
          title="Play something"
          intro="Because every good personal site needs a game. Snake is live — a snowboarding game is on the way."
        />
        <div className="grid md:grid-cols-[auto_1fr] gap-6 items-stretch">
          <div className="rounded-3xl border border-line bg-panel p-5 md:p-6">
            <div className="flex items-center justify-between mb-5 px-1">
              <h3 className="font-medium text-fg">Snake</h3>
              <span className="font-mono text-[11px] text-dim">Arrows / WASD · swipe</span>
            </div>
            <SnakeGame />
          </div>
          <div className="rounded-3xl border border-dashed border-line-2 p-8 flex flex-col justify-between min-h-[320px] bg-grid">
            <span className="self-start font-mono text-[11px] uppercase tracking-wider text-amber border border-amber/30 bg-amber-soft rounded-full px-3 py-1">
              In development
            </span>
            <div>
              <div className="text-4xl mb-4" aria-hidden>
                🏂
              </div>
              <h3 className="font-display text-2xl font-semibold text-fg mb-2">Snowboard Run</h3>
              <p className="text-mute text-sm leading-relaxed max-w-sm">
                A side-scrolling snowboarding game inspired by the classic Club Penguin sled run.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
