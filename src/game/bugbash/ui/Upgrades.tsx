"use client";
import { availableUpgrades, type GameState } from "../engine";
import { fmt } from "../format";
import { UPGRADES } from "../data";

export default function Upgrades({ state, onBuy }: { state: GameState; onBuy: (id: string) => void }) {
  const list = availableUpgrades(state);
  return (
    <section className="rounded-3xl border border-line bg-panel/60">
      <header className="flex items-baseline justify-between px-5 py-4 border-b border-line">
        <h2 className="font-medium text-fg">Upgrades</h2>
        <span className="font-mono text-[11px] text-dim">
          {state.upgrades.length}/{UPGRADES.length} bought
        </span>
      </header>
      {list.length === 0 ? (
        <p className="px-5 py-5 font-mono text-xs text-dim">Nothing new yet. Keep fixing bugs.</p>
      ) : (
        <ul className="divide-y divide-line max-h-[440px] overflow-y-auto">
          {list.map((u) => {
            const affordable = state.bugs >= u.cost;
            return (
              <li key={u.id}>
                <button
                  onClick={() => onBuy(u.id)}
                  disabled={!affordable}
                  className={`w-full text-left px-5 py-3 grid grid-cols-[36px_1fr_auto] gap-3 items-center transition-colors ${
                    affordable ? "hover:bg-panel-2 cursor-pointer" : "opacity-45 cursor-not-allowed"
                  }`}
                >
                  <span className="w-9 h-9 rounded-xl border border-line-2 grid place-items-center font-mono text-xs text-fg-2">
                    {u.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-fg truncate">{u.name}</span>
                    <span className="block text-xs text-mute leading-snug">{u.desc}</span>
                  </span>
                  <span className={`font-mono text-xs ${affordable ? "text-amber" : "text-mute"}`}>{fmt(u.cost)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
