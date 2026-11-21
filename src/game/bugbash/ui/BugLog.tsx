import type { LogEntry } from "../useGame";

const toneClass: Record<LogEntry["tone"], string> = {
  info: "text-mute",
  buy: "text-sage",
  alert: "text-rose",
  win: "text-amber",
};

const tonePrefix: Record<LogEntry["tone"], string> = {
  info: "[info]",
  buy: "[ ok ]",
  alert: "[ p1 ]",
  win: "[done]",
};

export default function BugLog({ log }: { log: LogEntry[] }) {
  return (
    <section className="rounded-3xl border border-line bg-ink overflow-hidden">
      <header className="flex items-center gap-2 px-4 py-3 border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
        <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
        <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
        <span className="ml-2 font-mono text-[11px] text-dim">~/tickets $ tail -f fixes.log</span>
      </header>
      <ol className="h-48 overflow-hidden px-4 py-3 space-y-1.5 font-mono text-[11.5px] leading-relaxed [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" aria-live="polite">
        {log.map((e) => (
          <li key={e.id} className={toneClass[e.tone]}>
            <span className="text-dim mr-2">{tonePrefix[e.tone]}</span>
            {e.text}
          </li>
        ))}
      </ol>
    </section>
  );
}
