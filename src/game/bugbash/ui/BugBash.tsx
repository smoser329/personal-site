"use client";
import { useEffect, useRef, useState } from "react";
import { FRENZY_MULT } from "../data";
import { bpsOf, clickPower, frenzyActive } from "../engine";
import { fmt, fmtTime } from "../format";
import { useGame } from "../useGame";
import BugButton from "./BugButton";
import BugLog from "./BugLog";
import IncidentBanner from "./IncidentBanner";
import SkillList from "./SkillList";
import Upgrades from "./Upgrades";

export default function BugBash() {
  const { state, log, actions } = useGame();
  const bps = bpsOf(state);
  const showWin = state.wonAt !== null && !state.winSeen;

  return (
    <>
      <IncidentBanner incident={state.incident} now={state.t} onResolve={actions.resolveIncident} />

      <div className="grid lg:grid-cols-[1fr_1.15fr_0.95fr] gap-5 items-start">
        {/* Column 1: count, click, log */}
        <div className="space-y-5">
          <section className="rounded-3xl border border-line bg-panel/60 px-6 pt-6 pb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Bugs fixed</p>
            <p className="mt-1 font-display text-5xl font-semibold tracking-tight text-fg tabular-nums">
              {fmt(Math.floor(state.bugs))}
            </p>
            <p className="mt-1 font-mono text-xs text-mute">
              <span className={frenzyActive(state) ? "text-amber" : "text-fg-2"}>{fmt(bps, 1)}</span> per second
              {frenzyActive(state) && (
                <span className="ml-2 text-amber">
                  · {FRENZY_MULT}× boost {Math.ceil(state.frenzyUntil - state.t)}s
                </span>
              )}
            </p>
            <div className="mt-8">
              <BugButton perClick={clickPower(state)} onClick={actions.click} />
            </div>
          </section>
          <BugLog log={log} />
        </div>

        {/* Column 2: skills */}
        <SkillList state={state} onBuy={actions.buySkill} />

        {/* Column 3: upgrades, stats */}
        <div className="space-y-5">
          <Upgrades state={state} onBuy={actions.buyUpgrade} />
          <Stats state={state} bps={bps} onReset={actions.reset} />
        </div>
      </div>

      {showWin && <Victory state={state} onKeepPlaying={actions.dismissWin} onNewRun={actions.reset} />}
    </>
  );
}

function Stats({ state, bps, onReset }: { state: ReturnType<typeof useGame>["state"]; bps: number; onReset: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const rows: [string, string][] = [
    ["Lifetime bugs", fmt(Math.floor(state.totalBugs))],
    ["Per second", fmt(bps, 1)],
    ["Clicks", fmt(state.clicks)],
    ["Fixed by hand", fmt(Math.floor(state.clickBugs))],
    ["Time played", fmtTime(state.t)],
    ["Best time", state.best !== null ? fmtTime(state.best) : "—"],
  ];

  return (
    <section className="rounded-3xl border border-line bg-panel/60">
      <header className="px-5 py-4 border-b border-line">
        <h2 className="font-medium text-fg">Stats</h2>
      </header>
      <dl className="px-5 py-2 divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between py-2 text-sm">
            <dt className="text-mute">{k}</dt>
            <dd className="font-mono text-fg-2 tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="px-5 pb-5 pt-2">
        <button
          onClick={() => {
            if (confirming) {
              clearTimeout(timer.current);
              setConfirming(false);
              onReset();
            } else {
              setConfirming(true);
              timer.current = setTimeout(() => setConfirming(false), 3000);
            }
          }}
          className={`w-full rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
            confirming ? "border-rose text-rose" : "border-line text-dim hover:text-fg-2 hover:border-line-2"
          }`}
        >
          {confirming ? "Click again to wipe this run" : "Start a new run"}
        </button>
      </div>
    </section>
  );
}

function Victory({
  state,
  onKeepPlaying,
  onNewRun,
}: {
  state: ReturnType<typeof useGame>["state"];
  onKeepPlaying: () => void;
  onNewRun: () => void;
}) {
  const time = state.wonAt ?? 0;
  const isBest = state.best !== null && Math.abs(state.best - time) < 0.001;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/80 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="bugbash-win">
      <div className="relative w-full max-w-md rounded-3xl border border-line-2 bg-panel p-8 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber/15 blur-[80px]" />
        <p className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Ticket queue: 0 open</p>
        <h2 id="bugbash-win" className="relative mt-3 font-display text-4xl font-semibold tracking-tight text-fg leading-[1.05]">
          You automated
          <br />
          <span className="text-mute">yourself out of a job.</span>
        </h2>
        <p className="relative mt-4 text-fg-2 leading-relaxed">
          From fixing bugs by hand to an AI agent swarm in{" "}
          <span className="text-fg font-medium">{fmtTime(time)}</span>
          {isBest ? " — a new best time." : state.best !== null ? `. Best: ${fmtTime(state.best)}.` : "."}
        </p>
        <dl className="relative mt-6 grid grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden text-sm">
          <div className="bg-panel p-4">
            <dt className="text-mute text-xs">Clicks</dt>
            <dd className="font-mono text-fg">{fmt(state.clicks)}</dd>
          </div>
          <div className="bg-panel p-4">
            <dt className="text-mute text-xs">Lifetime bugs</dt>
            <dd className="font-mono text-fg">{fmt(Math.floor(state.totalBugs))}</dd>
          </div>
        </dl>
        <div className="relative mt-7 flex flex-wrap gap-3">
          <button onClick={onNewRun} className="px-5 py-2.5 rounded-full bg-amber text-ink text-sm font-semibold hover:bg-fg transition-colors">
            Beat your time
          </button>
          <button onClick={onKeepPlaying} className="px-5 py-2.5 rounded-full border border-line-2 text-fg text-sm hover:bg-panel-2 transition-colors">
            Keep playing
          </button>
        </div>
      </div>
    </div>
  );
}
