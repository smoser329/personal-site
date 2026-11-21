"use client";
import { useState } from "react";
import { SKILLS, WIN_SKILL } from "../data";
import { costOf, skillBps, type GameState } from "../engine";
import { fmt } from "../format";

export default function SkillList({ state, onBuy }: { state: GameState; onBuy: (id: string, n: number) => void }) {
  const [qty, setQty] = useState<1 | 10>(1);
  const visible = SKILLS.filter((k) => state.revealed.includes(k.id));
  const hidden = SKILLS.length - visible.length;

  return (
    <section className="rounded-3xl border border-line bg-panel/60">
      <header className="flex items-center justify-between px-5 py-4 border-b border-line">
        <div>
          <h2 className="font-medium text-fg">Skills</h2>
          <p className="font-mono text-[11px] text-dim">Automation that fixes bugs for you</p>
        </div>
        <div className="flex rounded-full border border-line p-0.5 font-mono text-xs" role="group" aria-label="Buy quantity">
          {([1, 10] as const).map((q) => (
            <button
              key={q}
              onClick={() => setQty(q)}
              aria-pressed={qty === q}
              className={`px-3 py-1 rounded-full transition-colors ${qty === q ? "bg-fg text-ink" : "text-mute hover:text-fg"}`}
            >
              ×{q}
            </button>
          ))}
        </div>
      </header>
      <ul className="divide-y divide-line">
        {visible.map((k, i) => {
          const owned = state.owned[k.id] ?? 0;
          const price = costOf(k, owned, qty);
          const affordable = state.bugs >= price;
          const isWin = k.id === WIN_SKILL;
          const producing = skillBps(state, k);
          return (
            <li key={k.id}>
              <button
                onClick={() => onBuy(k.id, qty)}
                disabled={!affordable}
                className={`w-full text-left px-5 py-3.5 grid grid-cols-[28px_1fr_auto] gap-x-3 items-center transition-colors ${
                  affordable ? "hover:bg-panel-2 cursor-pointer" : "opacity-45 cursor-not-allowed"
                }`}
              >
                <span className="font-mono text-[11px] text-dim">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className={`font-medium truncate ${isWin ? "text-amber" : "text-fg"}`}>{k.name}</span>
                    {isWin && owned === 0 && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-amber border border-amber/30 rounded-full px-1.5">
                        goal
                      </span>
                    )}
                  </span>
                  <span className="block font-mono text-[11px] text-mute truncate">
                    <span className="text-dim">$ </span>
                    {k.flavor}
                  </span>
                  <span className="block font-mono text-[11px] text-dim mt-0.5">
                    {fmt(k.bps, 1)}/s each
                    {owned > 0 && <> · making {fmt(producing, 1)}/s</>}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-display text-xl font-semibold text-fg leading-none">{owned}</span>
                  <span className={`block font-mono text-xs mt-1 ${affordable ? "text-amber" : "text-mute"}`}>
                    {fmt(price)}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
        {hidden > 0 && (
          <li className="px-5 py-3.5 font-mono text-[11px] text-dim">
            ??? · {hidden} more skill{hidden > 1 ? "s" : ""} to discover
          </li>
        )}
      </ul>
    </section>
  );
}
