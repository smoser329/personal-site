// Pure game math. No React, no DOM, no Date.now() — time and randomness are passed in.
import {
  COST_GROWTH,
  FRENZY_MULT,
  FRENZY_SECONDS,
  INCIDENT_MAX_GAP,
  INCIDENT_MIN_GAP,
  INCIDENT_TITLES,
  INCIDENT_WINDOW,
  OFFLINE_CAP_SECONDS,
  OFFLINE_RATE,
  SKILLS,
  UPGRADES,
  WIN_SKILL,
  type Requirement,
  type Skill,
  type Upgrade,
} from "./data";

export type Incident = { title: string; expiresAt: number };

export type GameState = {
  version: 1;
  bugs: number; // spendable
  totalBugs: number; // lifetime, never decreases
  clicks: number;
  clickBugs: number; // lifetime bugs from clicking
  owned: Record<string, number>;
  upgrades: string[];
  revealed: string[]; // skills shown in the shop
  t: number; // seconds of play time
  frenzyUntil: number; // play-time second when the incident boost ends
  incident: Incident | null;
  nextIncidentAt: number;
  wonAt: number | null; // play-time second the win skill was first bought
  winSeen: boolean; // victory screen dismissed
  best: number | null; // fastest win in seconds, carried across new runs
};

export type Rng = () => number;

export function newGame(rng: Rng = Math.random, best: number | null = null): GameState {
  return {
    version: 1,
    bugs: 0,
    totalBugs: 0,
    clicks: 0,
    clickBugs: 0,
    owned: {},
    upgrades: [],
    revealed: [SKILLS[0].id],
    t: 0,
    frenzyUntil: 0,
    incident: null,
    nextIncidentAt: nextGap(rng),
    wonAt: null,
    winSeen: false,
    best,
  };
}

function nextGap(rng: Rng) {
  return INCIDENT_MIN_GAP + rng() * (INCIDENT_MAX_GAP - INCIDENT_MIN_GAP);
}

const has = (s: GameState, id: string) => s.upgrades.includes(id);
const ownedOf = (s: GameState, id: string) => s.owned[id] ?? 0;
const effects = (s: GameState) => UPGRADES.filter((u) => has(s, u.id)).map((u) => u.effect);

/** Cost of buying `n` copies of a skill when `owned` are already owned (geometric series). */
export function costOf(skill: Skill, owned: number, n = 1): number {
  const first = skill.cost * COST_GROWTH ** owned;
  return Math.ceil((first * (COST_GROWTH ** n - 1)) / (COST_GROWTH - 1));
}

/** Most copies affordable with the current bank, capped at `limit`. */
export function maxAffordable(s: GameState, skill: Skill, limit: number): number {
  let n = 0;
  while (n < limit && costOf(skill, ownedOf(s, skill.id), n + 1) <= s.bugs) n++;
  return n;
}

export function skillMult(s: GameState, skillId: string): number {
  return effects(s).reduce((m, e) => (e.type === "skillMult" && e.skill === skillId ? m * e.mult : m), 1);
}

export function globalMult(s: GameState): number {
  return 1 + effects(s).reduce((p, e) => (e.type === "globalPct" ? p + e.pct : p), 0);
}

export const frenzyActive = (s: GameState) => s.t < s.frenzyUntil;

/** Bugs per second from one skill (all copies), before frenzy. */
export function skillBps(s: GameState, skill: Skill): number {
  return ownedOf(s, skill.id) * skill.bps * skillMult(s, skill.id) * globalMult(s);
}

/** Total automatic bugs per second, including an active frenzy. */
export function bpsOf(s: GameState): number {
  const base = SKILLS.reduce((sum, sk) => sum + skillBps(s, sk), 0);
  return frenzyActive(s) ? base * FRENZY_MULT : base;
}

export function clickPower(s: GameState): number {
  let add = 1;
  let mult = 1;
  let pct = 0;
  for (const e of effects(s)) {
    if (e.type === "clickAdd") add += e.amount;
    if (e.type === "clickMult") mult *= e.mult;
    if (e.type === "clickBpsPct") pct += e.pct;
  }
  return add * mult + bpsOf(s) * pct;
}

function meets(s: GameState, r: Requirement): boolean {
  return "skill" in r ? ownedOf(s, r.skill) >= r.owned : s.totalBugs >= r.totalBugs;
}

/** Upgrades that are unlocked but not bought, cheapest first. */
export function availableUpgrades(s: GameState): Upgrade[] {
  return UPGRADES.filter((u) => !has(s, u.id) && meets(s, u.requires)).sort((a, b) => a.cost - b.cost);
}

function earn(s: GameState, amount: number): GameState {
  return { ...s, bugs: s.bugs + amount, totalBugs: s.totalBugs + amount };
}

/** Reveal any skill whose price is within reach (half its cost, or the next tier after an owned one). */
function reveal(s: GameState): GameState {
  const add = SKILLS.filter((sk) => !s.revealed.includes(sk.id) && s.bugs >= sk.cost / 2).map((sk) => sk.id);
  return add.length ? { ...s, revealed: [...s.revealed, ...add] } : s;
}

export function click(s: GameState): { state: GameState; gained: number } {
  const gained = clickPower(s);
  const next = earn(s, gained);
  return { state: reveal({ ...next, clicks: s.clicks + 1, clickBugs: s.clickBugs + gained }), gained };
}

export function buySkill(s: GameState, skillId: string, n = 1): GameState {
  const skill = SKILLS.find((k) => k.id === skillId);
  if (!skill || n < 1) return s;
  const price = costOf(skill, ownedOf(s, skillId), n);
  if (price > s.bugs) return s;
  const justWon = s.wonAt === null && skillId === WIN_SKILL;
  const wonAt = justWon ? s.t : s.wonAt;
  const best = justWon && (s.best === null || s.t < s.best) ? s.t : s.best;
  return { ...s, bugs: s.bugs - price, owned: { ...s.owned, [skillId]: ownedOf(s, skillId) + n }, wonAt, best };
}

export function buyUpgrade(s: GameState, upgradeId: string): GameState {
  const u = availableUpgrades(s).find((x) => x.id === upgradeId);
  if (!u || u.cost > s.bugs) return s;
  return { ...s, bugs: s.bugs - u.cost, upgrades: [...s.upgrades, u.id] };
}

/** Advance the game by dt seconds of play. */
export function tick(s: GameState, dt: number, rng: Rng = Math.random): GameState {
  if (dt <= 0) return s;
  // Split at the frenzy boundary so the boost isn't applied past its end.
  let next = s;
  let remaining = dt;
  if (frenzyActive(next) && next.t + remaining > next.frenzyUntil) {
    const part = next.frenzyUntil - next.t;
    next = { ...earn(next, bpsOf(next) * part), t: next.frenzyUntil };
    remaining -= part;
  }
  next = { ...earn(next, bpsOf(next) * remaining), t: next.t + remaining };

  if (next.incident && next.t >= next.incident.expiresAt) {
    next = { ...next, incident: null, nextIncidentAt: next.t + nextGap(rng) };
  } else if (!next.incident && next.t >= next.nextIncidentAt) {
    const title = INCIDENT_TITLES[Math.floor(rng() * INCIDENT_TITLES.length)];
    next = { ...next, incident: { title, expiresAt: next.t + INCIDENT_WINDOW } };
  }
  return reveal(next);
}

export type IncidentReward = { kind: "lump"; amount: number } | { kind: "frenzy"; seconds: number };

/** Resolve a clicked incident: either a lump of bugs or a temporary output boost. */
export function resolveIncident(s: GameState, rng: Rng = Math.random): { state: GameState; reward: IncidentReward | null } {
  if (!s.incident) return { state: s, reward: null };
  const cleared = { ...s, incident: null, nextIncidentAt: s.t + nextGap(rng) };
  if (rng() < 0.5) {
    const amount = Math.max(13, Math.min(s.bugs * 0.15, bpsOf(s) * 60)) + 13;
    return { state: reveal(earn(cleared, amount)), reward: { kind: "lump", amount } };
  }
  return { state: { ...cleared, frenzyUntil: s.t + FRENZY_SECONDS }, reward: { kind: "frenzy", seconds: FRENZY_SECONDS } };
}

/** Credit progress made while the tab was closed. Does not advance play time or events. */
export function applyOffline(s: GameState, secondsAway: number): { state: GameState; gained: number } {
  const secs = Math.min(Math.max(0, secondsAway), OFFLINE_CAP_SECONDS);
  const base = { ...s, frenzyUntil: Math.min(s.frenzyUntil, s.t) }; // no frenzy while away
  const gained = bpsOf(base) * secs * OFFLINE_RATE;
  return { state: reveal(earn(base, gained)), gained };
}

/** Validate a parsed save; returns null if it isn't a usable v1 save. */
export function parseSave(raw: unknown): GameState | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Partial<GameState>;
  if (r.version !== 1 || typeof r.bugs !== "number" || !Number.isFinite(r.bugs)) return null;
  const fresh = newGame();
  return {
    ...fresh,
    ...r,
    owned: { ...(r.owned ?? {}) },
    upgrades: Array.isArray(r.upgrades) ? r.upgrades : [],
    revealed: Array.isArray(r.revealed) && r.revealed.length ? r.revealed : fresh.revealed,
    incident: null,
    wonAt: typeof r.wonAt === "number" ? r.wonAt : null,
    winSeen: r.winSeen === true,
    best: typeof r.best === "number" ? r.best : null,
  } as GameState;
}
