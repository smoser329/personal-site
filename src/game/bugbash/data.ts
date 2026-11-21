// All game content lives here. Balancing or adding a tier = editing these lists.

export type Skill = {
  id: string;
  name: string;
  cost: number; // base cost of the first copy
  bps: number; // bugs fixed per second, per copy
  flavor: string; // terminal-style one-liner shown in the shop
  verb: string; // used in the log: "<verb> 12 bugs"
};

export const SKILLS: Skill[] = [
  { id: "bash", name: "Bash one-liners", cost: 15, bps: 0.5, flavor: 'grep -r "TODO" .', verb: "grep'd" },
  { id: "shell", name: "Shell scripts", cost: 75, bps: 3, flavor: "0 3 * * * ./cleanup.sh", verb: "cron'd away" },
  { id: "python", name: "Python scripts", cost: 400, bps: 18, flavor: "python parse_logs.py --since 1d", verb: "parsed out" },
  { id: "etl", name: "ETL pipelines", cost: 2_000, bps: 110, flavor: "extract → transform → load → repeat", verb: "deduplicated" },
  { id: "testauto", name: "Test automation", cost: 10_000, bps: 650, flavor: "pytest -n auto  # 1,204 passed", verb: "caught" },
  { id: "mvp", name: "MVP apps", cost: 50_000, bps: 4_000, flavor: "ship it, then iterate", verb: "shipped fixes for" },
  { id: "fullstack", name: "Full-stack web apps", cost: 250_000, bps: 24_000, flavor: "Next.js ↔ .NET ↔ Postgres", verb: "refactored away" },
  { id: "cicd", name: "CI/CD & DevSecOps", cost: 1_200_000, bps: 140_000, flavor: "pipeline blocked merge: 0 vulns", verb: "blocked" },
  { id: "ai", name: "AI-assisted coding", cost: 6_000_000, bps: 850_000, flavor: "> fix the flaky test in auth/", verb: "pair-fixed" },
  { id: "swarm", name: "AI agent swarm", cost: 30_000_000, bps: 5_000_000, flavor: "agents: 48 running · 0 waiting on you", verb: "auto-resolved" },
];

export type Effect =
  | { type: "skillMult"; skill: string; mult: number }
  | { type: "clickAdd"; amount: number }
  | { type: "clickMult"; mult: number }
  | { type: "clickBpsPct"; pct: number } // clicks also earn pct of current BPS
  | { type: "globalPct"; pct: number }; // +pct to all automatic output

export type Requirement = { skill: string; owned: number } | { totalBugs: number };

export type Upgrade = {
  id: string;
  name: string;
  desc: string;
  icon: string; // short glyph shown on the tile
  cost: number;
  requires: Requirement;
  effect: Effect;
};

// Two doubling upgrades per skill: at 1 owned and at 10 owned.
// Each one is a real practice that makes that kind of automation find or fix more bugs.
type Named = { name: string; why: string };
const SKILL_UPGRADES: Record<string, [Named, Named]> = {
  bash: [
    { name: "Learn grep and pipes", why: "Search every log and file for the error in one line." },
    { name: "Master awk and sed", why: "Parse and patch broken config across hundreds of files at once." },
  ],
  shell: [
    { name: "set -euo pipefail", why: "Scripts stop on the first error instead of hiding it." },
    { name: "Scheduled health checks", why: "Cron jobs catch failing services before users notice." },
  ],
  python: [
    { name: "Unit tests", why: "Every fix gets a test, so the bug can't come back." },
    { name: "Type hints", why: "The type checker flags whole classes of bugs before runtime." },
  ],
  etl: [
    { name: "Data validation rules", why: "Bad records get rejected at the door instead of breaking reports." },
    { name: "Automated reconciliation", why: "Nightly source-vs-target diffs surface missing and duplicate rows." },
  ],
  testauto: [
    { name: "Nightly regression suite", why: "Every feature is retested every night, so regressions surface by morning." },
    { name: "Parallel test runners", why: "Hours of tests finish in minutes, so you run them on every change." },
  ],
  mvp: [
    { name: "In-app bug reporting", why: "Users file bugs with screenshots and logs attached." },
    { name: "Error tracking", why: "Crashes are grouped and reported with a stack trace automatically." },
  ],
  fullstack: [
    { name: "Type-safe API layer", why: "Frontend and backend can't drift out of sync without a compile error." },
    { name: "Observability dashboards", why: "Traces show exactly which service and line broke." },
  ],
  cicd: [
    { name: "Shift-left security scans", why: "Vulnerabilities fail the build instead of reaching production." },
    { name: "Automatic rollbacks", why: "A bad deploy reverts itself in seconds." },
  ],
  ai: [
    { name: "AI code review", why: "Every pull request gets a reviewer that has read the whole codebase." },
    { name: "AI-written tests", why: "Edge cases you'd never think of get covered." },
  ],
  swarm: [
    { name: "Agent orchestration", why: "Agents split the backlog and work it in parallel." },
    { name: "Self-healing pipelines", why: "Failures are diagnosed, patched and redeployed with no human." },
  ],
};

const skillUpgrades: Upgrade[] = SKILLS.flatMap((s, i) => {
  const [a, b] = SKILL_UPGRADES[s.id];
  const icon = String(i + 1).padStart(2, "0");
  return [
    {
      id: `${s.id}-1`,
      name: a.name,
      desc: `${a.why} ${s.name} ×2.`,
      icon,
      cost: s.cost * 10,
      requires: { skill: s.id, owned: 1 },
      effect: { type: "skillMult", skill: s.id, mult: 2 },
    },
    {
      id: `${s.id}-2`,
      name: b.name,
      desc: `${b.why} ${s.name} ×2.`,
      icon,
      cost: s.cost * 100,
      requires: { skill: s.id, owned: 10 },
      effect: { type: "skillMult", skill: s.id, mult: 2 },
    },
  ] satisfies Upgrade[];
});

export const UPGRADES: Upgrade[] = [
  {
    id: "shortcuts",
    name: "Keyboard shortcuts",
    desc: "Jump to the broken line without touching the mouse. +1 bug per click.",
    icon: "⌘",
    cost: 50,
    requires: { totalBugs: 25 },
    effect: { type: "clickAdd", amount: 1 },
  },
  {
    id: "breakpoints",
    name: "Breakpoints",
    desc: "Pause the code and inspect it instead of guessing. Clicks ×2.",
    icon: "●",
    cost: 200,
    requires: { totalBugs: 100 },
    effect: { type: "clickMult", mult: 2 },
  },
  {
    id: "duck",
    name: "Rubber duck",
    desc: "Explaining the bug out loud reveals the fix. Clicks ×2.",
    icon: "🦆",
    cost: 2_000,
    requires: { totalBugs: 1_000 },
    effect: { type: "clickMult", mult: 2 },
  },
  {
    id: "stacktrace",
    name: "Read the stack trace",
    desc: "The answer was in the error all along. Clicks also fix 1% of your bugs per second.",
    icon: "≡",
    cost: 10_000,
    requires: { totalBugs: 5_000 },
    effect: { type: "clickBpsPct", pct: 0.01 },
  },
  {
    id: "repro",
    name: "Reproduce before fixing",
    desc: "No more fixing the wrong thing. Clicks also fix another 1% of your bugs per second.",
    icon: "↻",
    cost: 200_000,
    requires: { totalBugs: 100_000 },
    effect: { type: "clickBpsPct", pct: 0.01 },
  },
  {
    id: "codereview",
    name: "Code review",
    desc: "A second pair of eyes catches bugs before merge. +10% to all automatic fixing.",
    icon: "✓",
    cost: 8_000,
    requires: { totalBugs: 4_000 },
    effect: { type: "globalPct", pct: 0.1 },
  },
  {
    id: "pairing",
    name: "Pair programming",
    desc: "Two people, one keyboard, half the bugs. +10% to all automatic fixing.",
    icon: "⇄",
    cost: 150_000,
    requires: { totalBugs: 75_000 },
    effect: { type: "globalPct", pct: 0.1 },
  },
  {
    id: "triage",
    name: "Bug triage",
    desc: "Fix the bugs that matter first, close the duplicates. +10% to all automatic fixing.",
    icon: "◎",
    cost: 2_500_000,
    requires: { totalBugs: 1_200_000 },
    effect: { type: "globalPct", pct: 0.1 },
  },
  ...skillUpgrades,
];

// Random flavor lines for the log.
export const LOG_LINES = [
  "Fixed off-by-one in the date picker",
  "Closed 'works on my machine' as cannot reproduce",
  "Removed console.log('here 2')",
  "Fixed timezone bug. It was always timezones",
  "Escaped an apostrophe in a SQL query. Please",
  "Renamed variable `data2` to `customerOrders`",
  "Bumped a dependency, broke three others",
  "Fixed the flaky test by deleting the sleep(5000)",
  "Found the bug in the code you wrote last year",
  "Null check added. Null check removed. Null check added",
  "Cleared the cache. It worked",
  "Merged on Friday. Bold",
  "Fixed CSS centering on the first try (no one believes you)",
  "Turned it off and on again",
  "Converted tabs to spaces, made an enemy",
  "Wrote a regex. Now there are two problems",
  "Closed a ticket older than the intern",
  "Added a missing await",
  "Found a typo in a variable name shipped in 2019",
  "Rolled back. Rolled forward. Rolled back",
];

export const INCIDENT_TITLES = [
  "PROD DOWN: checkout returns 500",
  "P1: login page is a blank white screen",
  "SEV-1: memory leak in the payments service",
  "Pager alert: disk 100% on db-primary",
  "Customer escalation: data export is empty",
];

// Owning the first copy of this skill wins the game.
export const WIN_SKILL = "swarm";

// Tunables
export const COST_GROWTH = 1.15;
export const INCIDENT_MIN_GAP = 45; // seconds of play time
export const INCIDENT_MAX_GAP = 90;
export const INCIDENT_WINDOW = 12; // seconds to click it
export const FRENZY_MULT = 3;
export const FRENZY_SECONDS = 20;
export const OFFLINE_RATE = 0.5;
export const OFFLINE_CAP_SECONDS = 8 * 60 * 60;
