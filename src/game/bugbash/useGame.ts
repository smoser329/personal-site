"use client";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { LOG_LINES, SKILLS, UPGRADES } from "./data";
import {
  applyOffline,
  buySkill,
  buyUpgrade,
  click,
  newGame,
  parseSave,
  resolveIncident,
  tick,
  type GameState,
  type IncidentReward,
} from "./engine";
import { fmt } from "./format";

const SAVE_KEY = "bugbash-save-v1";
const SAVE_EVERY_MS = 10_000;
const TICK_SECONDS = 0.1; // UI refresh ~10x per second
const MAX_FRAME_SECONDS = 1; // longer gaps (hidden tab) go through offline credit instead

// Randomness is drawn outside the reducer and passed in, so the reducer stays pure.
const fromList = (nums: number[]) => {
  let i = 0;
  return () => nums[i++ % nums.length];
};

type Action =
  | { type: "click" }
  | { type: "tick"; dt: number; r: number[] }
  | { type: "buySkill"; id: string; n: number }
  | { type: "buyUpgrade"; id: string }
  | { type: "incident"; r: number[] }
  | { type: "offline"; seconds: number }
  | { type: "dismissWin" }
  | { type: "replace"; state: GameState };

function reducer(s: GameState, a: Action): GameState {
  switch (a.type) {
    case "click":
      return click(s).state;
    case "tick":
      return tick(s, a.dt, fromList(a.r));
    case "buySkill":
      return buySkill(s, a.id, a.n);
    case "buyUpgrade":
      return buyUpgrade(s, a.id);
    case "incident":
      return resolveIncident(s, fromList(a.r)).state;
    case "offline":
      return applyOffline(s, a.seconds).state;
    case "dismissWin":
      return { ...s, winSeen: true };
    case "replace":
      return a.state;
  }
}

function readSave(): { state: GameState; awaySeconds: number } {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { state: unknown; savedAt: number };
      const state = parseSave(parsed.state);
      if (state) return { state, awaySeconds: Math.max(0, (Date.now() - (parsed.savedAt ?? Date.now())) / 1000) };
    }
  } catch {
    // Private mode, blocked storage or a corrupt save: start fresh.
  }
  return { state: newGame(), awaySeconds: 0 };
}

function writeSave(state: GameState) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ state, savedAt: Date.now() }));
  } catch {
    // Storage unavailable; the game still works, it just won't persist.
  }
}

export type LogEntry = { id: number; text: string; tone: "info" | "buy" | "alert" | "win" };

export function useGame() {
  // Runs once: this component only renders in the browser (loaded with ssr: false).
  const [boot] = useState(() => {
    const { state, awaySeconds } = readSave();
    const { state: credited, gained } = applyOffline(state, awaySeconds);
    return { state: credited, offlineGained: gained, awaySeconds };
  });
  const [state, dispatch] = useReducer(reducer, boot.state);
  const stateRef = useRef(state);
  const logId = useRef(0);
  const [log, setLog] = useState<LogEntry[]>(() =>
    boot.offlineGained >= 1
      ? [{ id: 0, tone: "info", text: `While you were away, your automation fixed ${fmt(boot.offlineGained)} bugs.` }]
      : [{ id: 0, tone: "info", text: "New ticket queue loaded. Time to start fixing bugs by hand." }]
  );

  const pushLog = useCallback((text: string, tone: LogEntry["tone"] = "info") => {
    logId.current += 1;
    const id = logId.current;
    setLog((l) => [{ id, text, tone }, ...l].slice(0, 40));
  }, []);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Game loop: accumulate frame time, advance in 0.1s steps.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const frame = (now: number) => {
      acc += Math.min((now - last) / 1000, MAX_FRAME_SECONDS);
      last = now;
      if (acc >= TICK_SECONDS) {
        dispatch({ type: "tick", dt: acc, r: [Math.random(), Math.random()] });
        acc = 0;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Saving, plus away-time credit when a hidden tab comes back.
  useEffect(() => {
    let hiddenAt = 0;
    const save = () => writeSave(stateRef.current);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        hiddenAt = Date.now();
        save();
      } else if (hiddenAt) {
        const seconds = (Date.now() - hiddenAt) / 1000;
        hiddenAt = 0;
        if (seconds > 5) {
          const gained = applyOffline(stateRef.current, seconds).gained;
          dispatch({ type: "offline", seconds });
          if (gained >= 1) pushLog(`While you were away, your automation fixed ${fmt(gained)} bugs.`);
        }
      }
    };
    const interval = setInterval(save, SAVE_EVERY_MS);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", save);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", save);
      save();
    };
  }, [pushLog]);

  // Ambient flavor lines in the log.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        if (stateRef.current.totalBugs > 0) pushLog(LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)]);
        schedule();
      }, 4000 + Math.random() * 4000);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [pushLog]);

  const actions = {
    click: () => {
      const { state: after, gained } = click(stateRef.current);
      stateRef.current = after; // keep rapid clicks between renders in sync
      dispatch({ type: "click" });
      return gained;
    },
    buySkill: (id: string, n: number) => {
      const before = stateRef.current;
      const after = buySkill(before, id, n);
      if (after === before) return;
      stateRef.current = after;
      dispatch({ type: "buySkill", id, n });
      const skill = SKILLS.find((k) => k.id === id)!;
      const firstTime = (before.owned[id] ?? 0) === 0;
      if (after.wonAt !== null && before.wonAt === null) {
        pushLog(`Deployed an ${skill.name}. The agents now fix bugs faster than anyone can write them.`, "win");
      } else {
        pushLog(firstTime ? `Learned ${skill.name}.` : `Bought ${n}× ${skill.name}.`, "buy");
      }
    },
    buyUpgrade: (id: string) => {
      const before = stateRef.current;
      const after = buyUpgrade(before, id);
      if (after === before) return;
      stateRef.current = after;
      dispatch({ type: "buyUpgrade", id });
      pushLog(`Upgrade: ${UPGRADES.find((u) => u.id === id)!.name}.`, "buy");
    },
    resolveIncident: (): IncidentReward | null => {
      const r = [Math.random(), Math.random()];
      const { state: after, reward } = resolveIncident(stateRef.current, fromList(r));
      if (!reward) return null;
      stateRef.current = after;
      dispatch({ type: "incident", r });
      pushLog(
        reward.kind === "lump"
          ? `Incident resolved. Root cause fix closed ${fmt(reward.amount)} related bugs.`
          : `Incident resolved. War-room focus: ${reward.seconds}s of boosted output.`,
        "alert"
      );
      return reward;
    },
    dismissWin: () => dispatch({ type: "dismissWin" }),
    reset: () => {
      const fresh = newGame(Math.random, stateRef.current.best);
      stateRef.current = fresh;
      dispatch({ type: "replace", state: fresh });
      writeSave(fresh);
      logId.current += 1;
      setLog([{ id: logId.current, tone: "info", text: "New run started. Back to fixing bugs by hand." }]);
    },
  };

  return { state, log, actions };
}
