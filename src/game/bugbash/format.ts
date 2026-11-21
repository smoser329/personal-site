const UNITS = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];

/** 950 → "950", 1234 → "1.23K", 5_600_000 → "5.60M". Small fractional rates keep one decimal. */
export function fmt(n: number, decimalsUnder1000 = 0): string {
  if (!Number.isFinite(n)) return "∞";
  const abs = Math.abs(n);
  if (abs < 1000) return n.toFixed(abs < 10 ? decimalsUnder1000 : 0).replace(/\.0+$/, "");
  const tier = Math.min(Math.floor(Math.log10(abs) / 3), UNITS.length - 1);
  const scaled = n / 1000 ** tier;
  return `${scaled.toFixed(scaled >= 100 ? 1 : 2)}${UNITS[tier]}`;
}

export function fmtTime(seconds: number): string {
  const s = Math.floor(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${s % 60}s`;
  return `${s}s`;
}
