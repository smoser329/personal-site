"use client";
import dynamic from "next/dynamic";

const SnakeGame = dynamic(() => import("./SnakeGame"), { ssr: false });

export default function Games() {
  return (
    <section id="games" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sky-500 font-medium text-sm tracking-widest uppercase mb-3">Games</p>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Play something</h2>
        <p className="text-stone-500 mb-12 max-w-xl">
          Because every good personal site needs a game. Snake is live — a snowboarding game is on the way.
        </p>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="font-semibold text-stone-900 mb-1">Snake</h3>
            <p className="text-stone-500 text-sm mb-5">Arrow keys or WASD · swipe on mobile</p>
            <SnakeGame />
          </div>
          <div className="p-8 rounded-xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="text-5xl mb-4">🏂</div>
            <h3 className="font-semibold text-stone-900 mb-2">Snowboard Run</h3>
            <p className="text-stone-500 text-sm mb-4">
              A side-scrolling snowboarding game inspired by the classic Club Penguin sled run.
            </p>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-600">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
